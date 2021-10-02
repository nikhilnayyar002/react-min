const fs = require("fs")
const execSync = require('child_process').execSync;

const configFileName = "wm-config.js"

const myArgs = process.argv.slice(2);
if (!myArgs[0]) return

const configFileStr = fs.readFileSync(configFileName, "utf8");

// **************************************************************
const enableFeatSassArg = "enable-feat-sass"
const disableFeatSassArg = "disable-feat-sass"
const enableFeatTypescriptArg = "enable-feat-typescript"
const disableFeatTypescriptArg = "disable-feat-typescript"
const updateFeatAllArg = "update-feat-all"

// **************************************************************

const sassDeps = {
    "sass-loader": "12.1.0",
    "sass": "1.42.1",
}
const typescriptDeps = {
    "@types/react": "17.0.26",
    "@types/react-dom": "17.0.9",
    "@babel/preset-typescript": "7.15.0",
    "@typescript-eslint/eslint-plugin": "4.32.0",
    "@typescript-eslint/parser": "4.32.0",
    "typescript": "4.4.3",
}

// **************************************************************
function returnDepsStringForNpmInstall(deps) {
    return Object.keys(deps).join(" ")
}
function returnDepsStringForNpmInstallWithVersion(deps) {
    return Object.keys(deps).map(v => `${v}@${deps[v]}`).join(" ")
}

function setOptionInConfig(setValue, arr, trueVal, falseVal) {
    const [line, currentValue] = arr
    const newLine = line.replace(currentValue, setValue ? trueVal : falseVal)
    const newConfigFileStr = configFileStr.replace(line, newLine)

    fs.writeFileSync(configFileName, newConfigFileStr, "utf8")
}

function npmInstall(install, deps) {
    const str = install ? returnDepsStringForNpmInstallWithVersion(deps) : returnDepsStringForNpmInstall(deps)
    execSync(`npm ${install ? "i" : "un"} --save-dev --save-exact ${str}`, { stdio: 'inherit' })
}

function getBooleanOption(name) {
    const arr = new RegExp(`const\\s+${name}\\s+=\\s+(true|false)`).exec(configFileStr)
    if (arr === null)
        throw `${name} option not found. Config is broken.`
    else
        return arr.slice(0, 2)
}

// **************************************************************

function getTypescript() {
    return getBooleanOption("typescript")
}
function getSass() {
    return getBooleanOption("sass")
}
function installSass(install) {
    npmInstall(install, sassDeps)
}
function installTypescript(install) {
    npmInstall(install, typescriptDeps)
}

// **************************************************************

if ([enableFeatSassArg, disableFeatSassArg].includes(myArgs[0])) {
    const enableSass = myArgs[0] === enableFeatSassArg
    setOptionInConfig(enableSass, getSass(), "true", "false")
    enableSass ? installSass(true) : installSass(false)
}
else if ([enableFeatTypescriptArg, disableFeatTypescriptArg].includes(myArgs[0])) {
    const enableTypescript = myArgs[0] === enableFeatTypescriptArg
    setOptionInConfig(enableTypescript, getTypescript(), "true", "false")
    enableTypescript ? installTypescript(true) : installTypescript(false)
}
else if (myArgs[0] === updateFeatAllArg) {
    const updateList = {}

    const packageJson = fs.readFileSync('package.json', "utf8")
    const devDependencies = JSON.parse(packageJson).devDependencies
    if (!devDependencies) return

    if (getTypescript()[1] === "true")
        for (let type in typescriptDeps)
            if (devDependencies[type] && devDependencies[type] != typescriptDeps[type])
                updateList[type] = typescriptDeps[type]

    if (getSass()[1] === "true")
        for (let type in sassDeps)
            if (devDependencies[type] && devDependencies[type] != sassDeps[type])
                updateList[type] = sassDeps[type]

    if (Object.keys(updateList).length)
        npmInstall(true, updateList)
}
else {
    throw "invalid option passed"
}