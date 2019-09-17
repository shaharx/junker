const fs = require('fs')
const { spawn } = require('child_process')
const png = require('project-name-generator')

const tata = process.cwd()
// console.log(process.argv[2])
for (var i = 0; i < process.argv[2]; i++) {
    createNpmPackage()
}

function createNpmPackage() {
    var uniqueName = png().dashed
    var pkgPath = `${process.cwd()}/tests/${uniqueName}`
    fs.mkdirSync(pkgPath, { recursive: true })
    console.log('Created: ' + pkgPath )
    var noOfFiles = getRandomInt(10)
    noOfFiles = noOfFiles == 0 ? 1 : noOfFiles
    for (var i = 0; i <  noOfFiles ; i++) {
        fs.writeFileSync(`${pkgPath}/${png().dashed}.js`, `console.log('Hello, i am ${png({ words: getRandomInt(100) }).spaced}')`)
    }
    fs.writeFileSync(`${pkgPath}/init_and_publish.sh`, `cd ${pkgPath}\nnpm init -y\nnpm publish\nrm -rf ${pkgPath}`)
    var ls = spawn('sh', [`${pkgPath}/init_and_publish.sh`]);

    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`)
    });

    ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

