const { exec } = require('child_process');
var dash = require("../utils/dash")
var files = require('../utils/readfile')

function actionMatches(action){
    if((action == "restart")
    || (action == "state") 
    || (action == "stop")
    || (action == "rebuild")
    || (action == "start")
    ) return true;

    return false;
}
async function receive(serviceId, action){
    if(actionMatches(action) == false) return null
    return await execute(serviceId, action);
}

function scriptsMapper(action){
    let scriptName = ""
    switch(action){
        case "restart":
            scriptName = "restart.sh" 
            break;
        case "state":
            scriptName =  "state.sh"
            break;
        case "stop":
            scriptName = "stop.sh"
            break;
        case "start":
            scriptName = "start.sh"
            break;    
        case "rebuild":
            scriptName = "rebuild.sh"
            break;
    }
    return scriptName;
}

async function execute(serviceId, action){
    let path = dash.getPath();
    files.writeFileDirectly(path + "/buffer", "")
    let scriptName = scriptsMapper(action)
    let cmd = 'sh ' + path +"/" + serviceId+"/" + scriptName  + " >> " +path+"/buffer";
    console.log(cmd)

    var yourscript = await exec(cmd,
    (error, stdout, stderr) => {
        console.log("stdout: " + stdout);
        console.log("stderr: " + stderr);
        if (error !== null) {
            console.log(`exec error: ${error}`);
        }
    });

}

module.exports = {
    receive
}