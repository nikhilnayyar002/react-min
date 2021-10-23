const fs = require("fs")

const types = []

try {
  const data = fs.readFileSync('.czrc', "utf8")
  const obj = JSON.parse(data)
  for (let type in obj.types) {
    types.push({
      "type": type,
      "section": `${obj.types[type]._addIcon ? `${obj.types[type]._icon} ` : ""}${obj.types[type].description}`,
      "hidden": obj.types[type]._hidden
    })
  }
} catch (err) {
  console.error(err)
}

module.exports = {
  "releaseCommitMessageFormat": "release: {{currentTag}}",
  "types": types,
  "bumpFiles": [
    {
      "filename": "readme.md",
      "updater": "std-ver-readme-bump.js"
    }
  ]
}