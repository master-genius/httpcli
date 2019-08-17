const hli = require('../httpcli.js');

hli.download('http://localhost:5678/download')
.then(data => {
    console.log(data);
}, err => {
    throw err; 
})
.catch(err => {
    console.log(err);
});
