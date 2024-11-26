//m-1
const searchingfunction =require('./searching');
console.log(searchingfunction);//{ ls: [Function: search], bs: [Function: search] }
console.log(searchingfunction.ls([3,4,6,2,7,8], 7))

//m-2
const {ls,bs} =require('./searching');// if you not want to implement bs then you can remove it 
console.log(bs([3,4,6,2,7,8], 7));

//m-3
const {ls:linearsearch} =require('./searching');// if you not want to implement bs then you can remove it 
console.log(linearsearch([3,4,6,2,7,8], 7));
