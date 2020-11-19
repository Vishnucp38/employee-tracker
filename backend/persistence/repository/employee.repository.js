const Employee = require('../model/employee.model');

const createEmployee = async (params) => {
    const { name, email, phone, designation, password } = params;
    const employee = new Employee({ name, email, phone, designation, password });
    return employee.save();
}

const findEmployeeByEmail = async (params) =>{
    const {email} =params;
    return Employee.findOne({email})
}

const updateLogedInDate = async(id)=>{
    return Employee.updateOne({_id:id},{$set:{last_logedin:new Date()}});
}

module.exports = {
    createEmployee, findEmployeeByEmail, updateLogedInDate
}