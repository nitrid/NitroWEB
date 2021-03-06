//1.0.1
var fs = require('fs');
var config = require('./config.json');
var express = require('express');
var app = express();
var WebTCP = require('./www/js/lib/webtcp/server/webtcp.js').WebTCP

var server = new WebTCP();
server.listen(9999, "176.236.62.130");

app.use('/',express.static(__dirname + "/www/"));

let http = app.listen(config.port);
let io = require('socket.io')(http);
var dbengine = require('./sql/dbengine')(config,io);
//******** LOG **********************************************************************/
var trueLog = console.log;
console.log = function(msg)
{
    let BufferDate = new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString().padStart(2, '0') + new Date().getDate().toString().padStart(2, '0');
    
    if(!fs.existsSync(__dirname +"/log/"))
    {
        fs.mkdirSync(__dirname +"/log/");
    }

    fs.appendFile(__dirname +"/log/" + BufferDate + ".log", msg + '\r\n', function(err) 
    {
        if(err) 
        {
            return trueLog(err);
        }
    });  
    fs.appendFile(__dirname + "/log/" + BufferDate + ".log",'------------------------------------------------------------------------------------------------------\r\n', function(err) 
    {
        if(err) 
        {
            return trueLog(err);
        }
    }); 

    trueLog(msg);
}
process.on('uncaughtException', function(err) {
    console.log(err.stack);
});
//******************************************************************************* */