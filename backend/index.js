const {start} = require('./server');

start({
    port:8000,
    callback:()=> console.log(" Listning on port 8000")
})