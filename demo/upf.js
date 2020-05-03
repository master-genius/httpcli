const hcli = require('../httpcli');

hcli.upload('https://localhost:2021/upload', {
    method: 'PUT',
    files : {
        file : [
            //'/home/wy/c/a.c',
            //'/home/wy/c/daet.c',

            '/media/wy/MasterData/Videos/Movies/义盖云天.mkv'
        ]
    }
}).then(d => {
    console.log(d);
}, err => {
    console.log(err);
});
