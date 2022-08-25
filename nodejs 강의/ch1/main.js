const http = require('http');
const fs = require('fs')
const qs = require('querystring')
const url = require('url')
function template(title , script){
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>웹 서버 실행</title>
    </head>
    <body>
        <h1> <a href="/"> ${title}</a> </h1>
        <ul>
            <li> <a href="/?id=html"> html </a>  </li>
            <li> <a href="/?id=css"> css </a>  </li>
        </ul>
        <p>${script} </p>
        
    </body>
    </html>
    `
}

var app = http.createServer(function(request , response){
    _url = url.parse(request.url, true)
    if(_url.path != '/favicon.ico'){
        var title = _url.query.id
        if(_url.path == "/") {
            var title = "web"
            var script = '파일에 대한 설명'
        }
        else if(fs.existsSync(`./data/${title}`)){
            var script = fs.readFileSync(`./data/${title}`)
        }
        response.writeHead(200);
        response.end(template(title , script));
    }
})

app.listen(80)