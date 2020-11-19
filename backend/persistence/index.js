const mongoose = require('mongoose');

mongoose.Promise= global.Promise;

( async ()=>{
    await mongoose.connect("mongodb://localhost:27017/test",{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:false
    })
})();

module.exports = {
    employee:require('./repository/employee.repository'),
    task:require('./repository/task.repository')
}