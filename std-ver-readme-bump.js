const re = /!\[version\]\([A-Za-z:/.-]*([\d.]*)[A-Za-z:/.-]*\)/;

module.exports.readVersion = function (contents) {
  const [, oldVersion] = re.exec(contents);
  return oldVersion;
};

module.exports.writeVersion = function (contents, newVersion) {
  const [oldString, oldVersion] = re.exec(contents);
  const newString = oldString.replace(oldVersion, newVersion);
  return contents.replace(oldString, newString);
};
