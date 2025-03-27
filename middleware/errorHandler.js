const { LogEvents } = require('./LogEvents');

const errorHandler = (err, req, res, next) => {
    console.error(err);
    LogEvents(`${err.name}\t${err.message}`, 'errLog.txt');
}

module.exports = errorHandler;