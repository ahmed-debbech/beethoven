var fs = require('fs');

function readFileDirectly(path){
    return fs.readFileSync(path, {encoding: 'utf-8'})
}

module.exports = {
    readFileDirectly
}