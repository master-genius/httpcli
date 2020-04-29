const hcli = require('../httpcli.js');

for(let i=0; i<2000; i++) {
    hcli.get('https://localhost:2021/test')
    .then(data => {
        console.log(data.toString());
    }, err => {
        throw err; 
    })
    .catch(err => {
        console.log(err);
    });

    hcli.post('https://localhost:2021/p', {
        body : {user : 'brave'}
    })
    .then(data => {
        console.log(data.toString());
    }, err => {
        throw err; 
    })
    .catch(err => {
        console.log(err);
    });
}
