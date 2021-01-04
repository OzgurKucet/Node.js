//CommonJs Modülleri

const app = require("./module1");

//console.log(app.name);

//console.log(app.person.mail);

//app.test1();
//app();


//import {test,Person,employee} from "./module1"; //hepsini tek tek yazmaya gerek yok
import * as module1 from "./module1";
/*
Person.Test();
test();
console.log(employee.salary);
*/

console.log(module1);
console.log(module1.employee.salary);
module1.Person.Test();

import Deneme from "./module1"; //{} bu yapıyı kullanmadan direk eriştik default dediğimiz için

Deneme.deneme();


