const Task = require('../model/task.model');

const createTask = async (params) => {
    const task = new Task(params);
    return task.save();
}

const findAllTasks = async ()=> Task.find({});

const findTasksByFilter = async (params)=>{
    const {employeeId , date} = params;
    let query={};
    if(date){
        let start = new Date(date);
        start.setHours(0,0,0,0);
        let end = new Date(date);
        end.setHours(23,59,59,999);
        query={employeeId:employeeId, date:{$gte:start, $lte:end}};
    }else{
        query={employeeId:employeeId};
    }
    
    return Task.find(query);
}

module.exports = {
    createTask, findAllTasks, findTasksByFilter
}