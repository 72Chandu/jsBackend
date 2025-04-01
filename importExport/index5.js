const oper=require('./operator');//operator file act as a module so we ascess it by require
console.log(oper);//{ add: [Function: add], sub: [Function: sub], name: 'chandu' }
console.log(oper.add1(5,6));//11
console.log(oper.sub1(10,6));//4
console.log(oper.name1);//chandu

//methode 2 to acess the operato.js propery
const {add1,sub1,name1}=require('./operator');//dstructuring of object
console.log(add1(5,6));//11
console.log(sub1(10,6));//4
console.log(name1);//chandu