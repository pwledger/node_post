const fs = require('fs')

var filenames = fs.readdirSync(`./data`)
filenames.forEach(a => { 
    console.log(a)
    var b = fs.readFileSync(`./data/${a}`, 'utf-8')
    console.log(b)
})
