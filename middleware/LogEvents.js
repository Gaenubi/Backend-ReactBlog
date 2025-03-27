const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const LogEvents = async (message, file) => {
    dateTime = format(new Date(), 'yyyy/MM/dd\tHH:mm:ss');
    logItem = `\n${dateTime}\t${uuid()}\t${message}`;
    console.log(logItem);
    try{
        if (!fs.existsSync(path.join('..','./logs'))){
            await fsPromises.mkdir(path.join('..','./logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..','logs', file), logItem);
    } catch (err){
        console.error(err);
    }
}

const Logger = (req, res, next) => {
    LogEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.url}`);
    next();
}
    module.exports = { Logger, LogEvents };
