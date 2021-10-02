const fs = require("fs")
const execSync = require('child_process').execSync;

const configFileName = "wm-config.js"

const myArgs = process.argv.slice(2);
if (!myArgs[0]) return

const data = fs.readFileSync(configFileName, "utf8");

// **************************************************************
const enableFeatSassArg = "enable-feat-sass"
const disableFeatSassArg = "disable-feat-sass"
const enableFeatTypescriptArg = "enable-feat-typescript"
const disableFeatTypescriptArg = "disable-feat-typescript"
const updateFeatAllArg = "update-feat-all"

// **************************************************************

if ([enableFeatSassArg, disableFeatSassArg].includes(myArgs[0])) {
    const enableSass = myArgs[0] === enableFeatSassArg
    setOptionInConfig(data, enableSass, getSass(), "true", "false")
    enableSass ? installSass(true) : installSass(false)
}
else if ([enableFeatTypescriptArg, disableFeatTypescriptArg].includes(myArgs[0])) {
    const enableTypescript = myArgs[0] === enableFeatTypescriptArg
    setOptionInConfig(data, enableTypescript, getTypescript(), "true", "false")
    enableTypescript ? installTypescript(true) : installTypescript(false)
}
else if (myArgs[0] === updateFeatAllArg) {
    if (getTypescript()[1] === "true") {
        console.log("Updating Typescript ...")
        installTypescript(true)
    }
    if (getSass()[1] === "true"){ 
        console.log("Updating Sass ...")
        installTypescript(true)
    }
}
else {
    throw "invalid option passed"
}

// **************************************************************

function setOptionInConfig(data, setValue, arr, trueVal, falseVal) {
    const [line, currentValue] = arr
    const newLine = line.replace(currentValue, setValue ? trueVal : falseVal)
    const newData = data.replace(line, newLine)

    fs.writeFileSync(configFileName, newData, "utf8")
}
function getCommonNpmInstall(install, deps) {
    execSync(`npm ${install ? "i" : "un"} --save-dev --save-exact ${install ? deps : deps.replace(/@[^a-zA-Z\s]+/g, "")}`, { stdio: 'inherit' })
}

function getTypescript() {
    const arr = /const\s+typescript\s+=\s+(true|false)/.exec(data)
    if (arr === null)
        throw "typescript option not found. Config is broken."
    else
        return arr.slice(0, 2)
}
function getSass() {
    const arr = /const\s+sass\s+=\s+(true|false)/.exec(data)
    if (arr === null)
        throw "sass option not found. Config is broken."
    else
        return arr.slice(0, 2)
}

// **************************************************************

function installSass(install) {
    getCommonNpmInstall(install, "sass-loader@12.1.0 sass@1.42.1")
}
function installTypescript(install) {
    getCommonNpmInstall(install,
        "@types/react@17.0.26 @types/react-dom@17.0.9"
        + " @babel/preset-typescript@7.15.0"
        + " @typescript-eslint/eslint-plugin@4.32.0 @typescript-eslint/parser@4.32.0"
        + " typescript@4.4.3"
    )
}