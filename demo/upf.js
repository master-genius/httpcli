const hcli = require('../httpcli');

hcli.upload('https://localhost:2021/upload', {
    method: 'PUT',
    files : {
        file : [
            //'/home/wy/c/a.c',
            //'/home/wy/c/daet.c',

            '/home/wy/music/common/与尔同途.mp3'
        ]
    }
}).then(d => {
    console.log(d);
}, err => {
    console.log(err);
});
