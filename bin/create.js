const path = require('path');
const fs = require('fs');
const Handlebars = require('handlebars');

const args = process.argv.splice(2);
const jsList = [];
const cssList = [];

const prefix = args.length === 0 || args[0] === 'dev' ? 'http://localhost:8000/' : './';

fs.readdir(path.resolve(__dirname, '../dist'), function(err, files) {
  files.forEach(function(name) {
    if (name.indexOf('\.js') > -1) {
      jsList.push({
        link: prefix + name
      });
    }
    if (name.indexOf('\.css') > -1) {
      cssList.push({
        link: prefix + name
      });
    }
  });

  fs.readFile(path.resolve(__dirname, '../src/index.html'),'utf-8', function(err,data){
    var template = Handlebars.compile(data);
    var result = template({
      jsList, cssList
    });
    fs.writeFile('dist/index.html', result, 'utf-8', function() {});
  });

});
