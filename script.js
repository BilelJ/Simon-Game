var audio = [new Audio('simonSound1.mp3'), new Audio('simonSound2.mp3'), new Audio('simonSound3.mp3'), new Audio('simonSound4.mp3')];
var song = new Array;
var error = new Audio('error.mp3');
var strict = false;
var gameOn = false;
var gameSpeed = 1000;
var speedUpLevels =[5,9,13];
//Fix to prevent sounds skipping when gameSpeed increase
audio.forEach(function(track){
	track.playbackRate = 1.3;
});

function rnd() {
    return number = Math.floor(Math.random() * 4);
}

//Game length set to 20 tracks
function getSong() {
    for (var i = 0; i < 20; i++) {
        song[i] = rnd();
    }
}

function playSound(i) {
    audio[i].play();
}

track = 0;

function playBack(level) {
    //Check if gameSpeed increase is allowed in current level
    if ((speedUpLevels.includes(level+1)) && gameSpeed > 550) {
        gameSpeed -= 150;
    }
    $('#start').off('click');
    $('#lvl').val(level + 1);
    gameOn = true;
    $('#user').val("");
    var interval = setInterval(function() {
        playSound(song[track]);
        $('#box' + song[track - 1]).removeClass('box' + song[track - 1]);
        $('#box' + song[track]).addClass('box' + song[track]);
        if (track == level) {
            clearInterval(interval);
            game(level);
            track = 0
        } else {
            track++;
        }
    }, gameSpeed);
    $('.box').off('click');
}

function game(level) {
        $('#start').click(function() {
            switchOnOff();
        }); //Activate the switch button
        var timer = setTimeout(function() { //timer to start playing

            error.play();
            if (!strict) {
                playBack(level);
            } else {
                level = 0;
                playBack(level);
            }
        }, 5000);
        var playbackTimer = setTimeout(function() {
            $('#box' + song[level]).removeClass('box' + song[level]);
        }, 1000);
        var n = 0;
        $('#simon').val(song.slice(0, level + 1).join("").toString(""));
        $('#user').val("");
        $('.green').click(function() {
            audio[0].play();
            $('#user').val($('#user').val() + "0");
        });
        $('.red').click(function() {
            audio[1].play();
            $('#user').val($('#user').val() + "1");
        });
        $('.blue').click(function() {
            audio[2].play();
            $('#user').val($('#user').val() + "2");
        });
        $('.yellow').click(function() {
            audio[3].play();
            $('#user').val($('#user').val() + "3");
        });
        $('.box').click(function() {
            clearTimeout(timer);
            if ($('#simon').val()[n] != $('#user').val()[n]) {
                clearTimeout(timer);
                error.play();
                if (!strict) {
                    playBack(level);
                } else {
                    level = 0;
                    playBack(level);
                }
            } else { /*Do N*/ }
            if ($('#user').val() == $('#simon').val()) {
                if (level == 19) {
                    alert('Victory, start again');
                    switchOnOff();
                    switchOnOff();
                } else {
                    level++;
                    playBack(level);
                }
            }
            n++;
        });
        window.timer = timer;
        window.playbackTimer = playbackTimer;
    }
    //Start Button
$('#start').click(function() {
    switchOnOff();
});
//Strict Mode
$('#strict').click(function() {
    if (!strict) {
        $('#strict').addClass('strictOn');
        strict = true;
    } else {
        $('#strict').removeClass('strictOn');
        strict = false;
    }
});

function switchOnOff() {
    if (gameOn == false) {
        getSong();
        level = 0;
        playBack(level);
        $('#start').addClass('startOn');
    } else {
        clearTimeout(window.timer);
        clearTimeout(window.playbackTimer);
        gameOn = false;
        $('#lvl').val('');
        $('#start').removeClass("startOn");
        $('.box').off('click');
        clearInterval(1);
    }
}