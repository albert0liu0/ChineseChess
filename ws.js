var socket
console.log('!')
window.addEventListener('load',function(event){
    socket=new WebSocket('ws://localhost:8080')
    socket.onmessage=function createDiv(event){
        console.log(event.data)
        selfPlayer=(+event.data)
        game=new Game(+(event.data))
        document.body.appendChild(game.div)
        console.log(game)
        console.log(game.opponent)
        socket.onmessage=game.opponent
    }
})
