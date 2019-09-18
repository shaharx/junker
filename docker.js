const fs = require('fs')
const dockerCLI = require('docker-cli-js')
const Docker = dockerCLI.Docker;
const png = require('project-name-generator')

var limit = process.argv[2]
var index = 0

var inter = setInterval(()=>{
    index++
    junk()
    if(index >= limit){
        clearInterval(inter)
        console.log('interval cleared')
    }
}, 2000)

async function junk() {
    const base = 'FROM alpine'
    const salt = png().dashed
    const path = `${salt}/Dockerfile`
    const repository = 'shaharx-docker-junk.jfrog.io'
    const tag = `${repository}/${salt}`

    var Dockerfile = base
    for (i = 0; i < 10; i++) {
        Dockerfile += '\n' + `RUN echo "${getRandomInt(10000)}" > image_salt_` + getRandomInt(600)
    }
    Dockerfile += '\n' + 'CMD ["/bin/sh"]'
    fs.mkdirSync(salt)
    fs.writeFileSync(path, Dockerfile)

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    var docker = new Docker()

    docker.command(`build -t ${tag} ${salt}`, (err, data) => {
        // console.log('data = ', data)
        fs.unlinkSync(path)
        fs.rmdirSync(salt)
        docker.command(`push ${tag}`, (err, data) => {
            docker.command(`rmi ${tag}`, (err, data) => {
                // console.log(data)
            })
        })

    })
}