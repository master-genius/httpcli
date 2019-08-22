const httpcli = require('../httpcli.js');

var hli = new httpcli();

for(let i=0; i<600; i++) {
    hli.get('https://localhost:2021/')
    .then(data => {
        console.log(data);
    }, err => {
        throw err; 
    })
    .catch(err => {
        console.log(err);
    });

    hli.post('https://localhost:2021/p', {
        body : {user : 'brave'}
    })
    .then(data => {
        console.log(data);
    }, err => {
        throw err; 
    })
    .catch(err => {
        console.log(err);
    });
}

