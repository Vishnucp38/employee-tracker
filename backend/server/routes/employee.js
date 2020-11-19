const { Router } = require('express');
const { employee, task} = require('../../persistence');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { withJWTAuthMiddleware } = require("express-kun");

const router = Router();
const SECRET_KEY="Vizz123456"
const protectedRouter = withJWTAuthMiddleware(router, SECRET_KEY);

router.post('/createEmployee', async (req, res) => {
    const emp = await employee.createEmployee(req.body)
    return res.send(emp);
});

router.get('/findEmployeeByEmail/:email', async (req, res) => {
    const emp = await employee.findEmployeeByEmail(req.params);
    console.log("params -- >",emp)
    return res.json({emp});
});

router.post('/login', async (req, res) => {
    const {password}=req.body
    const emp = await employee.findEmployeeByEmail(req.body)
    if (!emp) {
        res.status(401).json({
            message: "Unauthenticated"
        });
        return;
    }
    if (bcrypt.compareSync(password, emp.password)) {
        const token = jwt.sign({ emp }, SECRET_KEY, {
            expiresIn: "24h"
        });
        employee.updateLogedInDate(emp._id);
        res.json({
            emp,
            token,
            message: "loged user successfully"
        });
    } else {
        res.status(401).json({
            message: "Unauthenticated"
        });
    }
});

protectedRouter.post('/createTask', async (req, res) => {
    const tsk = await task.createTask(req.body)
    return res.send(tsk);
});

protectedRouter.get('/findAllTasks', async (req, res) => res.send(await task.findAllTasks()));

protectedRouter.post('/findTasksByFilter', async (req, res)=>{
    res.send(await task.findTasksByFilter(req.body))
});


module.exports = router;