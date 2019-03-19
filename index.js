var fs = require('fs');
var StatMode = require('stat-mode');
var EventEmitter = require('events').EventEmitter;
var OSinfo = require('./modules/OSinfo');

var emitter = new EventEmitter();
emitter.on('beforeCommand', function(instruction) {
    console.log('You wrote: ' + instruction + ' trying to run command.')
});
emitter.on('afterCommand', function() {
    console.log('Finished command');
});

//odczyt uprawnien pliku
// fs.stat('./cat.jpg', function(err, stats) {
//     var statMode = new StatMode(stats);
//     console.log(statMode.toString());
// });

//wypisanie w konsoli zawartosci pliku, kodowanie utf-8
// fs.readFile('./txt.txt', 'utf-8', function(err, data) {
//     console.log(data);
// });

//zapisanie tekstu w pliku
// fs.writeFile('./txt.txt', 'But the ball is sadly small', function(err) {
//     if (err) throw err;
//     console.log('Saved!');
// });

// fs.readFile('./txt.txt', 'utf-8', function(err, data) {
//     console.log('Dane przed zapisem!'.blue);
//     console.log(data);
//     //appendFile różnie od writeFile fakt że dodaje treść do pliku a nie ją nadpisuje
//     fs.appendFile('./txt.txt', '\nA tak wyglądają po zapisie!', function(err) {
//         if (err) throw err;
//         console.log('Zapisano!'.red);
//         fs.readFile('./txt.txt', 'utf-8', function(err, data) {
//             console.log('Dane po zapisie'.green);
//             console.log(data);
//         });
//     });
// });

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