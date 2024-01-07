var files = require("./readfile")

function getServices(){
    let data = files.readFileDirectly("micros")
    let arr = []
    arr = data.split('\n')
    let b = {
        path : arr[0],
        services : null
    }
    let g = []
    for(let i=1; i<=arr.length-1; i++){
        g.push({
            id : arr[i].split(':')[0],
            name : arr[i].split(':')[1]
        })
    }
    b.services = g
    return b
}
function getPath(){
    let data = files.readFileDirectly("micros")
    return data.split('\n')[0]

}
module.exports = {
    getServices,
    getPath
}