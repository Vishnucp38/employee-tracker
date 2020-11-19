const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    employeeId:{type:String, required:true},
    project:{type:String, required:true},
    task:{type:String, required:true},
    description:{type:String, required:true},
    comments:{type:String, required:true},
    status:{type:String, required:true},
    date:{type:Date, required:true},
});

module.exports = mongoose.model('Task',TaskSchema);
