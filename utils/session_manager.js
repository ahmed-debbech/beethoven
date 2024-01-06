let session = ""

function isAvailable(ses){
    if(session == "" ) return false;
    if(session == ses){
        return true;
    }
    return false;
}
function addSession(ses){
    session = ses
}
module.exports ={
    isAvailable,
    addSession
}