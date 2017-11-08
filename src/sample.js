const fs = require('fs');


const data = fs.readFileSync('sample.txt', 'utf8');
console.log(data);
