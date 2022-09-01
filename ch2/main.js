const http = require('http');
const fs = require('fs')
const qs = require('querystring')
const url = require('url')
function template(list , title , script){
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
            ${list}
        </ul>
        <p>${script} </p>
        <form action="http://localhost/create" method="post">
           <p> 파일 명 : <input type="text" name="filename"> </p>
           <p> 저장할 데이터 : <input type="text" name="filedata"></p>
            <button>send server</button>
        </form>
    </body>
    </html>
    `
}

var app = http.createServer(function(request , response){
    _url = url.parse(request.url, true)
    var list = ""
    if(_url.path != '/favicon.ico'){
        // data 목록 가져와서 링크로 표현하기
        var fn = fs.readdirSync(`./data`)
        fn.forEach(a => {
            list += `<li> <a href="/?id=${a}"> ${a} </a>  </li>`
        })

        // url 주소가 home 일 떄 경로 
        var title = _url.query.id
        if(_url.path == "/") {
            var title = "web"
            var script = '파일에 대한 설명'
        }

        // 파일이 있을때 데이터 가져오기
        else if(fs.existsSync(`./data/${title}`)){
            var script = fs.readFileSync(`./data/${title}`)
        }

        // post 동작이 될 떄 data 폴더에 파일 저장하기
        else if(_url.path == "/create"){
            var title = "web"
            var script = '파일에 대한 설명'
            var body = ""
            request.on("data" , function(data){
                body += data
                console.log(body)
            })
            request.on("end", function(){
                var post = qs.parse(body)
                var filename = post.filename
                var filedata = post.filedata
                fs.writeFileSync(`./data/${filename}`, `${filedata}`);
            })
        }


        response.writeHead(200);
        response.end(template(list,title , script));
    }
})

app.listen(80)