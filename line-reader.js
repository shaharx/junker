var fs = require('fs'),
    readline = require('readline'),
    instream = fs.createReadStream('all-packages-only'),
    outstream = new (require('stream'))(),
    rl = readline.createInterface(instream, outstream);
    exec = require('child_process').exec
    // npmInstallCommand = 'npm i'

rl.on('line', function (line) {
    var arr = line.split(' ')
    var npmInstallCommand = `npm i ${arr[0]}`
    exec(npmInstallCommand, (err, stdout, stderr)=>{
    //    if(err){console.log(err)}
    //    if(stderr){console.log(stderr)}
    //    console.log(stdout);
    })
});

rl.on('close', function (line) {
    // console.log(npmInstallCommand)
});
