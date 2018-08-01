export const changeFile = (unCheckList, checkList) => {

  // 要给这个列表的所有文件添加前缀（原来没有前缀）
  unCheckList.forEach(item => {
    if (item.indexOf('json') < 0) return;
    let paths = item.split('/');
    let name = paths.pop();
    paths = paths.join('/') + '/';
    let newName = name;

    if (name[0] === '_') {
      name = name.slice(1);
    } else {
      newName = '_' + newName;
    }

    const stat = fs.statSync(paths + name);
    if (stat && stat.isFile()) {
      fs.renameSync(paths + name, paths + newName);
    }
  });

  // 要给这个列表的所有文件去除前缀
  // item 是 source
  // target 是目标
  checkList.forEach(item => {
    if (item.indexOf('json') < 0) return;
    let paths = item.split('/');
    let name = paths.pop();
    paths = paths.join('/') + '/';
    let newName = name;

    if (name[0] !== '_') {
      name = '_' + name;
    } else {
      newName = name.slice(1);
    }

    const stat = fs.statSync(paths + name);
    if (stat && stat.isFile()) {
      fs.renameSync(paths + name, paths + newName);
    }
  });
}

let checkedList = [];
export const getFileList = (rootPath) => {
  checkedList = [];
  return {
    fileList: readFile(rootPath),
    checkedList
  }
}

const readFile = (rootPath, order = -1) => {
  const fileMap = [];
  var files = fs.readdirSync(rootPath);

  files.forEach((fileName, index) => {
    const newName = path.join(rootPath, fileName);
    const stas = fs.statSync(newName);
    if (stas.isFile()) {
      if (fileName[0] !== '_') {
        checkedList.push(newName);
      } else {
        fileName = fileName.slice(1);  // _不会暴露给使用者
      }
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
