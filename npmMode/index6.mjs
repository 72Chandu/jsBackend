// const chalk=require("chalk");//this modules will include after installing its modules in this file
// console.log(chalk.blue("ye blue me dekhega in terminal"));

//NOTE  : The typescript is now outdated so now everyone should use "import chalk from 'chalk' "instead  of "const 
//chalk=require('chalk') " and everyone should change the extension of the file to ".mjs"  from ".js" ;
import chalk from "chalk";
console.log(chalk.blue("ye blue  dekhega in terminal"));
console.log(chalk.blue.bold("ye blue me dekhega in terminal"));
console.log(chalk.blue.underline("maja aaya"));


import res from "validator";//after installing the validator dependances you should must include in your main file
const b=res.isEmail("chndufefe.com");
const b1=res.isEmail("chndufefe.com");// no @
console.log(b? chalk.green.inverse(b):chalk.red.inverse(b));//true-> in green
console.log(b1? chalk.green.inverse(b1):chalk.red.inverse(b1));//false-> in red
