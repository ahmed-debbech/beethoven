var fs = require('fs');

function readFileDirectly(path){
    return fs.readFileSync(path, {encoding: 'utf-8'})
}
function writeFileDirectly(path, content){
    fs.writeFileSync(path, content);
}

module.exports = {
    readFileDirectly,
    writeFileDirectly
}