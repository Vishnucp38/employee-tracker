const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    description:{type:String, required:true},
    done:{type:Boolean, required:false}
});

module.exports = mongoose.model('Todo',TodoSchema);
