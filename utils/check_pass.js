const bcrypt = require("bcrypt")
const files = require("./readfile")
const crypto = require('crypto');

let saltRounds = 10;

async function encrypt(clearPass){
    let salt = await bcrypt.genSalt(saltRounds).catch(err => console.error(err.message));
    let hash = bcrypt.hash(clearPass, salt);
    console.log("pass_hash[" + hash +"]")
    return hash;
    
}

async function compare(clearPass, user){
    if(user != 'user') return false;

    let hash = await encrypt(clearPass);
    console.log(hash)
    let storedhash = files.readFileDirectly("pass");
    let result = await bcrypt.compare(clearPass, storedhash)
    return result;
}

function gen_token(){
    let uuid = crypto.randomUUID();
    return uuid
}

module.exports = {
    compare,
    gen_token
};