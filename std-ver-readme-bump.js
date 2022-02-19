const versionRegex = /!\[version\]\([A-Za-z:/.\-_]*([\d.]*)[A-Za-z:/.-]*\)/;

module.exports.readVersion = function (contents) {
  const [, oldVersion] = versionRegex.exec(contents);
  return oldVersion;
};

module.exports.writeVersion = function (contents, newVersion) {
  const [oldString, oldVersion] = versionRegex.exec(contents);
  const newString = oldString.replace(oldVersion, newVersion);
  return contents.replace(oldString, newString);
};
