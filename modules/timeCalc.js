function timeCalc(time) {
    var hours = Math.floor(time / 3600);
    time %= 3600;
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    var x = '';

    switch (true) {
        case (hours>=1):
            x = hours + 'h';
        case (minutes>=1):
            x = x + minutes + 'm';
        default:
            x = x + seconds + 's';
    };
    return x;
};

exports.print = timeCalc;