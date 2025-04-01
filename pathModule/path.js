const path=require('path');
console.log(path.dirname('D:/createfileWithCmd/pathModule/path.js'));//copy the path of (path.js)->change the \ to /
//D:/createfileWithCmd/pathModule
console.log(path.extname('D:/createfileWithCmd/pathModule/path.js'));//.js
console.log(path.basename('D:/createfileWithCmd/pathModule/path.js'));//path.js
const mypath=path.parse('D:/createfileWithCmd/pathModule/path.js');
console.log(mypath)//{ root: 'D:/', dir: 'D:/createfileWithCmd/pathModule', base: 'path.js', ext: '.js', name: 'path'}
console.log(mypath.name);//path smillary we can excess any thing
console.log(mypath.dir);
