var selfPlayer
var game
function Game(player){
    var currentPlayer=0
    game=this
    this.board=new Board
    this.div=document.createElement('div')
    this.div.style.lineHeight=0
    this.div.width='100%'
    this.div.style.position='relative'
    this.div.appendChild(this.board.div)
    this.chesses=[
        new Chess(0,0),
        new Chess(0,1), new Chess(0,1),
        new Chess(0,2), new Chess(0,2),
        new Chess(0,3), new Chess(0,3),
        new Chess(0,4), new Chess(0,4),
        new Chess(0,5), new Chess(0,5),
        new Chess(0,6), new Chess(0,6),
        new Chess(0,6), new Chess(0,6), new Chess(0,6),
        new Chess(1,0),
        new Chess(1,1), new Chess(1,1),
        new Chess(1,2), new Chess(1,2),
        new Chess(1,3), new Chess(1,3),
        new Chess(1,4), new Chess(1,4),
        new Chess(1,5), new Chess(1,5),
        new Chess(1,6), new Chess(1,6),
        new Chess(1,6), new Chess(1,6), new Chess(1,6)
    ]
    this.chessCoordinate=[]
    for(let i=0;i<32;i++){
        if(player===0)
            this.chessCoordinate[i]=chessCoordinate[(16+i)%32]
        else
            this.chessCoordinate[i]=chessCoordinate[i]
    }
    for(let i in this.chesses){
        var chessDiv=this.chesses[i].div
        if(selfPlayer!==this.chesses[i].color){
            chessDiv.style.webkitTransform='rotate(180deg)'
            console.log('!')
        }
        this.div.appendChild(chessDiv)
        this.chesses[i].div.style.position='absolute'
        this.chesses[i].coordinate=game.chessCoordinate[i]
        this.chesses[i].index=i
        let thisPosition=coordinateToPosition(this.chesses[i].coordinate)
        this.chesses[i].div.style.left=thisPosition[0]-chessWidth/2+'px'
        this.chesses[i].div.style.top=thisPosition[1]-chessWidth/2+'px'
    }
    function coordinateToPosition(c){
        return [
            boardPadding+c[0]*blockWidth,
            boardPadding+c[1]*blockWidth
        ]
    }
    function positionToCoordinate(p){
        return [
            Math.round((p[0]-boardPadding)/blockWidth),
            Math.round((p[1]-boardPadding)/blockWidth)
        ]
    }
    function positionToChess(p){
        for(let c of game.chesses){
            let thisPosition=coordinateToPosition(c.coordinate)
            if(
                (thisPosition[0]-p[0])*(thisPosition[0]-p[0])+
                (thisPosition[1]-p[1])*(thisPosition[1]-p[1])<
                chessWidth*chessWidth/4
            ){
                return c
            }
        }
    }
    function coordinateToChess(p){
        for(let c of game.chesses){
            if( p[0]==c.coordinate[0]&&p[1]==c.coordinate[1])return c
        }
    }
    this.div.addEventListener('mousedown',mousedown)
    function mousedown(event){
        if(selfPlayer!==currentPlayer)return false
        var body=document.body
        var positionMouseInitial=[
            event.clientX+body.scrollLeft-game.div.offsetLeft,
            event.clientY+body.scrollTop-game.div.offsetTop
        ]
        var positionMouse=positionMouseInitial
        var chessChoosen=positionToChess(positionMouse)
        if(chessChoosen){
            if(chessChoosen.color!==selfPlayer)return false
            game.div.appendChild(chessChoosen.div)
            console.log(chessChoosen)
            var positionChoosen=coordinateToPosition(chessChoosen.coordinate)
            var distance=[positionChoosen[0]-positionMouse[0],positionChoosen[1]-positionMouse[1]]
            addEventListener('mousemove',mousemoveFunction)
            addEventListener('mouseup',mouseupFunction)
        }
        function mousemoveFunction(event){
            chessChoosen.div.style.left=event.clientX+body.scrollLeft-game.div.offsetLeft+distance[0]-chessWidth/2+'px'
            chessChoosen.div.style.top=event.clientY+body.scrollTop-game.div.offsetTop+distance[1]-chessWidth/2+'px'
        }
        function mouseupFunction(event){
            removeEventListener('mousemove',mousemoveFunction)
            removeEventListener('mouseup',mouseupFunction)
            var choosenPosition=[
                event.clientX+body.scrollLeft-game.div.offsetLeft+distance[0],
                event.clientY+body.scrollTop-game.div.offsetTop+distance[1]
            ]
            var coordinateDestination=positionToCoordinate(choosenPosition)
            if(legalMove(chessChoosen,chessChoosen.coordinate,coordinateDestination)){
               selfMove(chessChoosen,coordinateDestination)
            }
            else{
                moveBack(chessChoosen)
            }
        }
    }

    function eliminate(c){
        c.coordinate=[-100,-100]
        game.div.removeChild(c.div)
    }
    function move(c,cd){
        var chessDestination=coordinateToChess(cd)
        if(chessDestination)
            eliminate(chessDestination)
        c.coordinate=cd
        var pd=coordinateToPosition(cd)
        c.div.style.left=pd[0]-chessWidth/2+'px'
        c.div.style.top=pd[1]-chessWidth/2+'px'
    }
    function moveBack(c){
        var cc=coordinateToPosition(c.coordinate)
        c.div.style.left=cc[0]-chessWidth/2+'px'
        c.div.style.top=cc[1]-chessWidth/2+'px'
    }
    function selfMove(c,cd){
        socket.send(c.coordinate[0]+' '+c.coordinate[1]+' '+cd[0]+' '+cd[1])
        currentPlayer=1-selfPlayer
        move(c,cd)
    }
    
    this.opponent=function(event){
        console.log('!')
        console.log(event.data)
        var data=event.data.split(' ')
        var cs=data.slice(0,2)
        var cd=data.slice(2,4)
        cs[0]=8-cs[0]
        cs[1]=9-cs[1]
        cd[0]=8-cd[0]
        cd[1]=9-cd[1]
        var c=coordinateToChess(cs)
        move(c,cd)
        currentPlayer=selfPlayer
    }

    function legalMove(c,cs,cd){
        var chessDestination=coordinateToChess(cd)
        var checkEliminate=false
        if(chessDestination){
            var colorDestination=chessDestination.color
            if(colorDestination===c.color)return false
            checkEliminate=true
        }
        if(cd[0]<0||cd[0]>8||cd[1]<0||cd[1]>9)return false
        return true
    }
}
