import {Request} from "./requests";
import {employee} from "../../62.webpackRequireveES6Modülleri/src/module1";
import {Ui} from "./ui";

//Elementleri seçme
const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeeList = document.getElementById("employees");//ekleneceği yer çalışanların
const updateEmployeeButton = document.getElementById("update");

const request = new Request("http://localhost:3000/employees");
const ui = new Ui();

let updateState = null;

eventListeners();

function eventListeners() {
    document.addEventListener("DOMContentLoaded",getAllEmployees);
    form.addEventListener("submit",addEmployee);
    employeeList.addEventListener("click",updateOrDelete);
    updateEmployeeButton.addEventListener("click",updateEmployee);
}


function getAllEmployees() {
    request.get()
        .then(employees => {
            ui.addAllEmployeeToUi(employees);
        })
        .catch(err => console.log(err));
}

function addEmployee(e) {

    const employeeName = nameInput.value.trim();
    const employeeDepartment = departmentInput.value.trim();
    const employeeSalary = salaryInput.value.trim();

    if (employeeName === "" || employeeDepartment === "" || employeeSalary === ""){
        alert("Lütfen tüm alanları doldurun");
    }
    else {
        request.post({name:employeeName,department:employeeDepartment,salary:Number(employeeSalary)})
            .then(employee => {
                ui.addEmployeeToUi(employee);
            })
            .catch(err=> console.log(err));
    }

    ui.clearInputs();
    e.preventDefault();
}

function updateOrDelete(e) {

    //console.log(e.target); // nereye basılmışsa orayı gösterir...

    if (e.target.id === "delete-employee"){
        //silme
        deleteEmployee(e.target);
    }
    else if (e.target.id ==="update-employee"){
        //Güncelleme
        updateEmployeeController(e.target.parentElement.parentElement); //Tüm tr yi aldık
    }
}

function deleteEmployee(targetEmployee) { //Silme butonumuz geldi burdan parent yaparak id bulmamız gerekiyor.
    const id = targetEmployee.parentElement.previousElementSibling.previousElementSibling.textContent;
    request.delete(id)
        .then(message => {
            ui.deleteEmployeeFromUI(targetEmployee.parentElement.parentElement);
        })
        .catch(err=>console.log(err));
}

function updateEmployeeController(targetEmployee) {
    ui.toggleUpdateButton(targetEmployee);

    if (updateState == null){
        updateState = {
            updateId : targetEmployee.children[3].textContent,
            updateParent : targetEmployee
        }
    }
    else {
        updateState = null;
    }
}

function updateEmployee() {
    if (updateState){
        //Güncelleme işlemi
        const data = {name:nameInput.value.trim(),department:departmentInput.value.trim(),salary:Number(salaryInput.value.trim())}
        request.put(updateState.updateId,data)
            .then(updatedEmployee => {
                ui.updateEmployeeOnUI(updatedEmployee,updateState.updateParent);
            })
            .catch(err => console.log(err));
    }
}

/*
request.get()
    .then(employees => console.log(employees))
    .catch(err => console.log(err));
*/
/*
request.post({name:"Serhat Say",department:"Pazarlama",salary:4000})
.then(employee => console.log(employee))
.catch(err => console.log(err));

 */

/*
request.put(1,{name:"Mehmet Say",department:"Bilişim",salary:5000})
    .then(employee => console.log(employee))
    .catch(err => console.log(err));
*/

/*
request.delete(3)
    .then(massage => console.log(massage))
    .catch(err => console.log(err));
*/
