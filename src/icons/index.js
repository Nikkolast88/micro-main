const fs = require('fs');
const path = require('path');
const root = path.join(__dirname);
const dataArr = {
  data: [],
  child: {},
};
const readDirSync = (path, target, position) => {
  const pa = fs.readdirSync(path);
  pa.forEach((ele) => {
    const info = fs.statSync(path + '/' + ele);
    if (info.isDirectory()) {
      target.child[ele] = {
        data: [],
        child: {},
      };
      addr = position + '/';
      if (addr === '/') {
        addr = '';
      }
      readDirSync(path + '/' + ele, target.child[ele], addr + ele);
    } else {
      if (ele.indexOf('.svg') != -1) {
        target.data.push({
          name: ele.split('.')[0],
          path: position + '/' + ele,
          filename: ele,
        });
        console.log(position + '/' + ele);
      }
    }
  });
};
let text = '';
text += '\n # SVG目录\n';
const writeFile = (dataArr) => {
  if (dataArr.data.length > 0) {
    dataArr.data.forEach((item, index) => {
      if ((index + 1) % 5 === 0) {
        text += `| <img src="${item.path}" width="36" height="36"><br><b>${item.name}<b/> |\n`;
      } else {
        text += `| <img src="${item.path}" width="36" height="36"><br><b>${item.name}<b/> `;
      }
    });
  }
  Object.keys(dataArr.child).forEach((key) => {
    text += `\n ## ${key}\n`;
    text += '|  |  |  |  |  |\n';
    text += '| :----:| :----: | :----: | :----: | :----: |\n';
    writeFile(dataArr.child[key]);
  });
};
readDirSync(root, dataArr, '');
writeFile(dataArr, text);
let file = path.join(__dirname, 'ICONS.md');
fs.writeFile(file, text, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log('文件创建成功~' + file);
  }
});
