const add=(a,b)=>{
   return a+b;
};
const sub=(a,b)=>{
    return a-b;
 };
const name="chandu";
module.exports.add1=add;// now add is acesseable to other file
module.exports.sub1=sub;
module.exports.name1=name;

//methode 2 to give the acess of operator.js file to other file
//module.exports={add1,sub1,name1};
