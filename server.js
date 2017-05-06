var http=require('http')
var url=require('url')
var fs=require('fs')
var path=require('path')
var srv=http.createServer(function(req,res){
    var pathname=url.parse(req.url).pathname
    pathname='.'+pathname
    fs.stat(pathname,function(err,stats){
        if(err){
            res.writeHead(404,{'Content-Type':'text/html'})
            console.log(err)
            return
        }
        if(stats.isFile()){
            if(path.extname(pathname)==='.css'){
                res.writeHead(200,{'Content-Type':'text/css'})
            }
            if(path.extname(pathname)==='.js'){
                res.writeHead(200,{'Content-Type':'text/javascript'})
            }
            if(path.extname(pathname)==='.html'){
                res.writeHead(200,{'Content-Type':'text/html'})
            }
            fs.createReadStream(pathname).pipe(res)
            return
        }
        res.writeHead(404,{'Content-Type':'text/html'})
        return 
    })
})
srv.listen('8080')
