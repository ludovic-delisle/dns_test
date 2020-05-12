var keyPressed=[];

document.addEventListener('keydown', function(key_pressed) {
    keyPressed[key_pressed.key] = true;
})
document.addEventListener('keyup', function(key_pressed) {
    keyPressed[key_pressed.key] = false;

})


function event(){
    if (keyPressed['a']) {
        move(-1, 0)
    }
    if (keyPressed['w']) {
        move(0, 1)
    }
    if (keyPressed['d']) {
        move(1, 0)
    }
    if (keyPressed['s']) {
        move(0, -1)
    }


}