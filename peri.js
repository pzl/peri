var usb = require('usb'),
    child = require('child_process'),
    peri = {
            idVendor:0x04f2,
            idProduct:0x1121
            },
    keymods = [
            { mask: 0x80, key: 'Super_R'},
            { mask: 0x40, key: 'Alt_R'},
            { mask: 0x02, key: 'Shift_L'},
            { mask: 0x01, key: 'Ctrl'},
            { mask: 0x08, key: 'Super_L'},
            { mask: 0x20, key: 'Shift_R'}
        ],
    mediakeys = {
        0xb6: { key: 'rewind', xdo: 173, keycode: '' },
        0xcd: { key: 'play/pause', xdo: 172, keycode: '' },
        0xb5: { key: 'ffwd', xdo: 171, keycode: '' },
        0x24: { key: 'back', xdo: 166, keycode: '' },
        0x23: { key: 'www', xdo: 180, keycode: '' },
        0x25: { key: 'forward', xdo: 167, keycode: '' },
        0xe9: { key: 'louder', xdo: 123, keycode: '' },
        0xe2: { key: 'mute', xdo: 121, keycode: '' },
        0x9c: { key: 'ChUp', xdo: 410, keycode: '' },
        0xea: { key: 'quieter', xdo: 122, keycode: '' },
        0x8a: { key: 'mail', xdo: 163, keycode: '' },
        0x9d: { key: 'ChDown', xdo: 411, keycode: '' },
        0x04: { key: 'keyb', xdo: 23, keycode: '' }
    },
    stdkeys = {
        0x04: { key: 'a', xdo: 'a', keycode: '' },
        0x05: { key: 'b', xdo: 'b', keycode: '' },
        0x06: { key: 'c', xdo: 'c', keycode: '' },
        0x07: { key: 'd', xdo: 'd', keycode: '' },
        0x08: { key: 'e', xdo: 'e', keycode: '' },
        0x09: { key: 'f', xdo: 'f', keycode: '' },
        0x0a: { key: 'g', xdo: 'g', keycode: '' },
        0x0b: { key: 'h', xdo: 'h', keycode: '' },
        0x0c: { key: 'i', xdo: 'i', keycode: '' },
        0x0d: { key: 'j', xdo: 'j', keycode: '' },
        0x0e: { key: 'k', xdo: 'k', keycode: '' },
        0x0f: { key: 'l', xdo: 'l', keycode: '' },
        0x10: { key: 'm', xdo: 'm', keycode: '' },
        0x11: { key: 'n', xdo: 'n', keycode: '' },
        0x12: { key: 'o', xdo: 'o', keycode: '' },
        0x13: { key: 'p', xdo: 'p', keycode: '' },
        0x14: { key: 'q', xdo: 'q', keycode: '' },
        0x15: { key: 'r', xdo: 'r', keycode: '' },
        0x16: { key: 's', xdo: 's', keycode: '' },
        0x17: { key: 't', xdo: 't', keycode: '' },
        0x18: { key: 'u', xdo: 'u', keycode: '' },
        0x19: { key: 'v', xdo: 'v', keycode: '' },
        0x1a: { key: 'w', xdo: 'w', keycode: '' },
        0x1b: { key: 'x', xdo: 'x', keycode: '' },
        0x1c: { key: 'y', xdo: 'y', keycode: '' },
        0x1d: { key: 'z', xdo: 'z', keycode: '' },
        0x1e: { key: '1', xdo: '1', keycode: '' },
        0x1f: { key: '2', xdo: '2', keycode: '' },
        0x20: { key: '3', xdo: '3', keycode: '' },
        0x21: { key: '4', xdo: '4', keycode: '' },
        0x22: { key: '5', xdo: '5', keycode: '' },
        0x23: { key: '6', xdo: '6', keycode: '' },
        0x24: { key: '7', xdo: '7', keycode: '' },
        0x25: { key: '8', xdo: '8', keycode: '' },
        0x26: { key: '9', xdo: '9', keycode: '' },
        0x27: { key: '0', xdo: '0', keycode: '' },
        0x28: { key: 'Return', xdo: 'Return', keycode: '' },
        0x29: { key: 'Escape', xdo: 'Escape', keycode: '' },
        0x2a: { key: 'BackSpace', xdo: 'BackSpace', keycode: '' },
        0x2b: { key: 'Tab', xdo: 'Tab', keycode: '' },
        0x2c: { key: 'space', xdo: 'space', keycode: '' },
        0x2d: { key: '-', xdo: 'minus', keycode: '' },
        0x2e: { key: '=', xdo: 'equal', keycode: '' },
        0x2f: { key: '[', xdo: 34, keycode: 34 },//[
        0x30: { key: ']', xdo: 35, keycode: 35 }, //]
        0x31: { key: "\\", xdo: 51, keycode: 51 },
        0x32: { key: '???', xdo: '???', keycode: '' },
        0x33: { key: ';', xdo: 'semicolon', keycode: 47 },
        0x34: { key: "'", xdo: 48, keycode: 48},
        0x35: { key: '`', xdo: 'grave', keycode: 49 },
        0x36: { key: ',', xdo: 'comma', keycode: '' },
        0x37: { key: '.', xdo: 'period', keycode: '' },
        0x38: { key: '/', xdo: 'slash', keycode: '' },
        0x39: { key: 'caps', xdo: 66, keycode: 66 },
        0x3a: { key: 'F1', xdo: 'F1', keycode: '' },
        0x3b: { key: 'F2', xdo: 'F2', keycode: '' },
        0x3c: { key: 'F3', xdo: 'F3', keycode: '' },
        0x3d: { key: 'F4', xdo: 'F4', keycode: '' },
        0x3e: { key: 'F5', xdo: 'F5', keycode: '' },
        0x3f: { key: 'F6', xdo: 'F6', keycode: '' },
        0x40: { key: 'F7', xdo: 'F7', keycode: '' },
        0x41: { key: "F8", xdo: "F8", keycode: '' },
        0x42: { key: 'F9', xdo: 'F9', keycode: '' },
        0x43: { key: 'F10', xdo: 'F10', keycode: '' },
        0x44: { key: "F11", xdo: "F11", keycode: '' },
        0x45: { key: 'F12', xdo: 'F12', keycode: '' },
        0x46: { key: 'PrtSc', xdo: 'PrtSc', keycode: '' },
        0x47: { key: 'SclLock', xdo: 'SclLock', keycode: '' },
        0x48: { key: 'Pause\\Bk', xdo: 'Pause\\Bk', keycode: '' },
        0x49: { key: 'Ins', xdo: 'Ins', keycode: '' },
        0x4a: { key: 'Home', xdo: 'Home', keycode: '' },
        0x4b: { key: 'PgUp', xdo: 'PgUp', keycode: '' },
        0x4c: { key: 'Del', xdo: 119, keycode: '' },
        0x4d: { key: 'End', xdo: 'End', keycode: '' },
        0x4e: { key: 'PgDn', xdo: 'PgDn', keycode: '' },
        0x4f: { key: 'Right', xdo: 'Right', keycode: '' },
        0x50: { key: 'Left', xdo: 'Left', keycode: '' },
        0x51: { key: "Down", xdo: "Down", keycode: '' },
        0x52: { key: 'Up', xdo: 'Up', keycode: '' },
        0x53: { key: 'NmLock', xdo: 'NmLock', keycode: '' },
        0x54: { key: "KP_/", xdo: 106, keycode: '' },
        0x55: { key: 'KP_*', xdo: 63, keycode: '' },
        0x56: { key: 'KP_-', xdo: 82, keycode: '' },
        0x57: { key: 'KP_+', xdo: 86, keycode: '' },
        0x58: { key: 'KP_Enter', xdo: 'KP_Enter', keycode: '' },
        0x59: { key: 'KP_1', xdo: 'KP_1', keycode: '' },
        0x5a: { key: 'KP_2', xdo: 'KP_2', keycode: '' },
        0x5b: { key: 'KP_3', xdo: 'KP_3', keycode: '' },
        0x5c: { key: 'KP_4', xdo: 'KP_4', keycode: '' },
        0x5d: { key: 'KP_5', xdo: 'KP_5', keycode: '' },
        0x5e: { key: 'KP_6', xdo: 'KP_6', keycode: '' },
        0x5f: { key: 'KP_7', xdo: 'KP_7', keycode: '' },
        0x60: { key: 'KP_8', xdo: 'KP_8', keycode: '' },
        0x61: { key: "KP_9", xdo: "KP_9", keycode: '' },
        0x62: { key: 'KP_0', xdo: 'KP_0', keycode: '' },
        0x63: { key: 'KP_.', xdo: 'KP_.', keycode: '' },
        0x64: { key: "???2", xdo: "???2", keycode: '' },
        0x65: { key: 'Win', xdo: 'Win', keycode: '' },
        0x68: { key: 'F13', xdo: 'F13', keycode: '' },
        0x69: { key: 'F14', xdo: 'F14', keycode: '' },
        0x6a: { key: 'F15', xdo: 'F15', keycode: '' },
        0x6b: { key: 'F16', xdo: 'F16', keycode: '' },
        0x6c: { key: 'F17', xdo: 'F17', keycode: '' },
        0x6d: { key: 'F18', xdo: 'F18', keycode: '' },
        0x6e: { key: 'F19', xdo: 'F19', keycode: '' },
        0x6f: { key: 'F20', xdo: 'F20', keycode: '' },
        0x70: { key: 'F21', xdo: 'F21', keycode: '' },
        0x71: { key: 'F22', xdo: 'F22', keycode: '' },
        0x72: { key: 'F23', xdo: 'F23', keycode: '' },
        0x73: { key: 'F24', xdo: 'F24', keycode: '' },
        0x75: { key: 'Help', xdo: 'Help', keycode: '' },
        0x7a: { key: 'Undo', xdo: 'Undo', keycode: '' },
        0x7b: { key: 'Cut', xdo: 'Cut', keycode: '' },
        0x7c: { key: 'Copy', xdo: 'Copy', keycode: '' },
        0x7d: { key: 'Paste', xdo: 'Paste', keycode: '' },
        0x7f: { key: 'Mute', xdo: 'Mute', keycode: '' },
        0x80: { key: 'VolUp', xdo: 'VolUp', keycode: '' },
        0x81: { key: 'VolDn', xdo: 'VolDn', keycode: '' },
        0x87: { key: '???3', xdo: '???3', keycode: '' },
        0x88: { key: 'katakana?', xdo: 'katakana?', keycode: '' },
        0x89: { key: '???4', xdo: '???4', keycode: '' },
        0x8a: { key: 'kanji?', xdo: 'kanji?', keycode: '' },
        0x8b: { key: 'hiragana?', xdo: 'hiragana?', keycode: '' },
        0x8c: { key: 'furigana?', xdo: 'furigana?', keycode: '' }
    },
    held=[],
    mousedown = 0;


peri.device = usb.findByIds(peri.idVendor,peri.idProduct)
peri.device.open();
(function(){
    for (var i=0; i<3; i++){
        console.log('setting up interface '+i);
        setup(peri.device,i);
    }
})();

function keyboard(d){
    var pressed = [],
        holding=[];

    if (d.length == 8){
        var i,g,y,z;
        //main keyboard


        if (d[7]) {
            //too many keys, goes 01010101..
            return;
        }
        //console.log("---\nevent start")
        //console.log("held: "+held)

        //modifier keys (shift,ctrl..)
        for (i=0; i<keymods.length; i++){
            if (d[0] & keymods[i].mask){
                //if (held.indexOf(keymods[i].key) == -1){
                //    held.push(keymods[i].key);
                //}
                pressed.push(keymods[i].key);
            }
        }
        //if (pressed.length){
        //    console.log("modifier keys detected: "+pressed)
        //}
        //qwerty keys
        for (i=2; i<7; i++){
            if (d[i]){
                if (stdkeys.hasOwnProperty(d[i])){
                    //if (held.indexOf(stdkeys[d[i]].xdo) == -1){
                    //    held.push(stdkeys[d[i]].xdo);
                    //}
                    pressed.push(stdkeys[d[i]].xdo);
                } else {
                    console.log('missing keymap: '+d[i]);
                }
            }
        }
        //console.log("all keys detected: "+pressed)
        //nothing being held, nothing pressed now
        if (!held.length && !pressed.length){
            return;
        }

        //clear the union of held and pressed now
        //console.log('pre-loop; pressed: '+pressed+'; held: '+held)
        for (i=0; i<pressed.length; i++){
            //console.log("testing if "+pressed[i]+" was already held down (in: ["+held+"])")
            g = held.indexOf(pressed[i]);
            if (g != -1){
                //console.log('yes, was held, ignoring (g='+g+')');
                holding.push(held.splice(g,1)[0]);
                pressed.splice(i,1);
            } else {
                //console.log('nope, new key (g='+g+')')
            }
        }


        if (held.length){
            child.spawn('xdotool',['keyup','--delay','60',held.join('+')]);
            //console.log('keyup: '+held);
        }
        if (pressed.length){
            child.spawn('xdotool',['keydown','--delay','60',pressed.join('+')]);
            //console.log('keydown: '+pressed);
        }

        //console.log("holding: "+holding+"\npressed: "+pressed+"\nnew held: "+holding.concat(pressed))

        held = holding.concat(pressed);
        //console.log("end packet\n------\n")
        //console.log(held)
        //console.log(mods.join('-')+' '+keys.join('+'));
    } else if (d.length == 3){
        //d = d.slice(1); //first byte, pretty unimportant
        //console.log(d);
        if (mediakeys.hasOwnProperty(d[1])){
            child.spawn('xdotool',['key',mediakeys[d[1]].xdo]);
            console.log(mediakeys[d[1]]);
        }
    } else {
        //what
    }
}

function mouse(d){
    var leftbtn = 0x01,
        rightbtn = 0x02,
        click = d[0],
        y;

    d = d.slice(1);
    var x =  d[0],
        xdir = d[1] & 0x0f;
    
    d = d.slice(1);
    var ydir = d[1] & 0xf0;

    y = d[0] >> 4;

    if (d[1] & 0x0f){
        y = d[1] & 0x0f;
        y <<= 4;
        y += (d[0] & 0xf0) >> 4;
    }

    if (x){
        if (xdir){
            x = x-256;
        }
        //console.log('X: '+x+'; direction: '+xdir)
    }
    if (y){
        if (ydir){
            y = y-256;
        }
        //console.log('Y: '+y+'; direction: '+ydir)
    }

    child.spawn('xdotool',['mousemove_relative','--',x,y]);

    if (click){
        if (click & leftbtn && !(mousedown & leftbtn)){
            child.spawn('xdotool',['mousedown',1]);
        }
        if (click & rightbtn && !(mousedown & rightbtn)){
            child.spawn('xdotool',['mousedown',3]);
        }

    } else if (mousedown){
        child.spawn('xdotool',['mouseup',1,'mouseup',3]);
    }

    mousedown = click;

}

//printout packet data
function loggy(d){
    console.log(d.toString('hex'));
}
        
//set up an interface of a device
function setup(device,face){
    var end = device.interface(face).endpoints[0].address,
        fn = keyboard;
    if (face == 2){
        fn = mouse;
    }

    device.interface(face).detachKernelDriver();
    device.interface(face).claim();
    device.interface(face).endpoint(end).on('data',fn);
    device.interface(face).endpoint(end).on('end',function(d){
        console.log('stream on  interface '+face+' ended. ');
    });
    device.interface(face).endpoint(end).startStream(3,10);
}

//clean up just an interface of a device
function teardown(device,face,cb){
    var end=device.interface(face).endpoints[0].address;
    device.interface(face).endpoint(end).stopStream();
    device.interface(face).release(function(e){
        if (e){
            console.log('problem releasing device on interface '+face+': '+e);
        } else {
            console.log('released interface '+face);
        }
    });
    setTimeout(function(){
        device.interface(face).attachKernelDriver();
        cb();
    },1000);
}

//tidy up the device when closing
function cleanup(cb){
    teardown(peri.device,0,function(){
        teardown(peri.device,1,function(){
            teardown(peri.device,2,function(){
                setTimeout(function(){
                    peri.device.close();
                    cb();
                },1000);
            });
        });
    });
}

//keeps the process running
process.stdin.resume();

//see if we can catch an error and cleanup before crashing horribly
process.on('uncaughtException',function(e){
    console.log('uncaught exception, cleaning up');
    console.log(e);
    cleanup(function(){
        process.exit();
    });
});

//catch ctrl-C and perform cleanup (reattaching kernel driver to device)
process.on('SIGINT',function(){
    console.log('sigint caught, cleaning up')
    cleanup(function(){
        process.exit();
    });
});

process.on("exit", function(){
    console.log('exiting');
});
