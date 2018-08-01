
export const getFileList = (rootPath) => {
  return readFile(rootPath);
}

const readFile = (rootPath, order = -1) => {
  const fileMap = [];
  var files = fs.readdirSync(rootPath);

  files.forEach((fileName, index) => {
    const newName = path.join(rootPath, fileName);
    const stas = fs.statSync(newName);
    if (stas.isFile()) {
      fileMap.push({
        title: fileName,
        key: newName
      });
    } else if (stas.isDirectory()) {
      fileMap.push({
        title: fileName,
        key: newName,
        children: readFile(newName, index)
      });
    }
  });

  return fileMap;
}
