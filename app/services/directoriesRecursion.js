let getFiles = (dir, filelist, prefix) => {
  var fs = fs || require("fs"),
    files = fs.readdirSync(dir);
  filelist = filelist || [];
  prefix = prefix || "";
  files.forEach(function(file) {
    if (fs.statSync(dir + "/" + file).isDirectory()) {
      filelist = getFiles(dir + "/" + file, filelist, prefix + file + "/");
    } else {
      filelist.push(prefix + file);
    }
  });
  return filelist;
};

module.exports = getFiles;
