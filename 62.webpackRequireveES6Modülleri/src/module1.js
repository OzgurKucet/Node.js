/*
module.exports.test1 = function test1() {
    console.log("Test1");
}

module.exports.test2 = function test2() {
    console.log("Test2");
}
*/



/*
module.exports = {
    name:"Mustafa",
    test1:function () {
        console.log("Test1");
    },
    person:{
        name:"Ozgur",
        mail:"ozgurkucet@hotmail.com"
    }
}

 */



//ES6 modülleri


export const name = "Mustafa";
export function test() {
    console.log("Test Fonksyonu");
}

export class Person {
    static Test(){
        console.log("Person Test");
    }
}

export const employee = {
    name:"mustafa",
    salary:4000
}

export default class Deneme {
    static deneme(){
        console.log("Default Deneme");
    }
}


