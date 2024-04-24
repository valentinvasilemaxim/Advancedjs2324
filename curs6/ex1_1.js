console.log (proces.argv);

var sum = 0;
for(i=2; i< proces.argv.lenght; i++){
    sum += Number(proces.argv[i]);
}
console.log (sum);