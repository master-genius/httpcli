const httpcli = require('../httpcli');

httpcli.download('http://localhost:5678/download', {
    dir : process.env.HOME+'/downloads/'
});
