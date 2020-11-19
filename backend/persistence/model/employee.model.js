const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const setPassword=(value) =>{
  return bcrypt.hashSync(value, 10);
}

const EmployeeSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:String, required:true},
    designation:{type:String, required:true},
    password:{type:String, required:true, set: setPassword},
    last_logedin:{type:Date}
});

module.exports = mongoose.model('Employee',EmployeeSchema);
