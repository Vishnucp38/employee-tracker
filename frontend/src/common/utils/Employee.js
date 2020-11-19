let Employee = (function () {
    const setName =(name)=> {
        window.localStorage.setItem("name",name);
    }

    const getName=()=> {
        return window.localStorage.getItem("name");
    }

    const setEmployeeId=(employeeId) => {
        window.localStorage.setItem("employeeId",employeeId);
    }

    const getEmployeeId=() =>{
        return window.localStorage.getItem("employeeId");
    }

    const setToken=(token) =>{
        window.localStorage.setItem("token",token);
    }

    const getToken=() => {
        return window.localStorage.getItem("token");
    }

    return {
        getName: getName,
        setName: setName,
        setEmployeeId: setEmployeeId,
        getEmployeeId: getEmployeeId,
        setToken: setToken,
        getToken: getToken,
    }

})();

export default Employee;