var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var OSinfo = require('./modules/OSinfo');

var emitter = new EventEmitter();
emitter.on('beforeCommand', function(instruction) {
    console.log('You wrote: ' + instruction + ' trying to run command.')
});
emitter.on('afterCommand', function() {
    console.log('Finished command');
});

fs.readdir('./', 'utf-8', function(err, files) {
    console.log('List plików w katalogu:'.yellow);
    console.log(files);
    fs.writeFile('./txt.txt', files, function(err) {
        if (err) throw err;
        console.log('Zapisano w pliku txt.txt!'.red);
    });
});

process.stdin.setEncoding('utf-8');

process.stdin.on('readable', function() {
    var input = process.stdin.read(); //odczyt co uzytkownik podal na wejsciu
    process.stdout.write('Echo: ' + input);

    if(input !== null) {
        var instruction = input.trim();
        emitter.emit('beforeCommand', instruction);
        switch (instruction) {
            case "/lang":
                process.stdout.write(process.env.LANG);
                break;
            case "/ver":
                process.stdout.write(process.versions.node);
                break;
            case "/hello":
                process.stdout.write('Hello world!');
                break;
            case "/info":
                OSinfo.print();
                break;
            case "/exit":
                process.stdout.write('Quitting app!\n');
                process.exit();
                break;
            default:
                process.stderr.write('Wrong instruction!\n');
                break;
        };
        emitter.emit('afterCommand');
    }
});