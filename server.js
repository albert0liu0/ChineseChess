var http=require('http')
var url=require('url')
var fs=require('fs')
var path=require('path')
var ws=require('ws')
var numPlayer=0
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
                if(numPlayer<2){
                    res.writeHead(200,{'Content-Type':'text/html'})
                }
                else{
                    res.writeHead(503,{'Content-Type':'text/html'})
                    res.end()
                }
            }
            fs.createReadStream(pathname).pipe(res)
            return
        }
        res.writeHead(404,{'Content-Type':'text/html'})
        res.end()
        return 
    })
})
srv.listen('8080')
const wsServer=new ws.Server({server:srv})
wsServer.broadcast=function(data){
    wss.clients.forEach(function(client) {
        if(client.readyState===ws.OPEN){
            client.send(data)
        }
    })
}
wsServer.on('connection',function(socket){
    socket.send(''+numPlayer)
    numPlayer++
})
