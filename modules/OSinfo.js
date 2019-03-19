var os = require('os');
var color = require('colors');
var timeCalc = require('./timeCalc');

function getOSinfo() {
    var type = os.type();
    var release = os.release();
    var cpu = os.cpus()[0].model;
    var uptime = os.uptime();
    var user = os.userInfo();

    if (type === 'Darwin') {
        type = 'OSX';
    } else if (type === 'Windows_NT') {
        type = 'Windows';
    }

    console.log('System: '.red, type);
    console.log('Release: '.green, release);
    console.log('CPU: '.blue, cpu);
    console.log(timeCalc.print(uptime));
    console.log('User name: '.yellow, user.username);
    console.log('Home dir: '.rainbow, user.homedir);
}

exports.print = getOSinfo;