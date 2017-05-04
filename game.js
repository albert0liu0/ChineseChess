function Game(){
	var game=this
	this.board=new Board
	this.div=document.createElement('div')
	this.div.style.lineHeight=0
	this.div.width='100%'
	this.div.style.position='relative'
	this.div.appendChild(this.board.div)
	this.chesses=[
		new Chess(0,0),
		new Chess(0,1),
		new Chess(0,1),
		new Chess(0,2),
		new Chess(0,2),
		new Chess(0,3),
		new Chess(0,3),
		new Chess(0,4),
		new Chess(0,4),
		new Chess(0,5),
		new Chess(0,5),
		new Chess(0,6),
		new Chess(0,6),
		new Chess(0,6),
		new Chess(0,6),
		new Chess(0,6),
		new Chess(1,0),
		new Chess(1,1),
		new Chess(1,1),
		new Chess(1,2),
		new Chess(1,2),
		new Chess(1,3),
		new Chess(1,3),
		new Chess(1,4),
		new Chess(1,4),
		new Chess(1,5),
		new Chess(1,5),
		new Chess(1,6),
		new Chess(1,6),
		new Chess(1,6),
		new Chess(1,6),
		new Chess(1,6)
	]
	this.chessCoordinate=chessCoordinate.slice(0)
	for(let i in this.chesses){
		this.div.appendChild(this.chesses[i].div)
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
	this.div.addEventListener('mousedown',mousedown)
	function mousedown(event){
		var position_div=[game.div.offsetLeft,game.div.offsetTop]
		var position_mouse=[event.clientX-position_div[0],event.clientY-position_div[1]]
		var chessChoosen=positionToChess(position_mouse)
		if(chessChoosen){
			game.div.appendChild(chessChoosen.div)
			console.log(chessChoosen)
                        var positionChoosen=coordinateToPosition(chessChoosen.coordinate)
			var distance=[positionChoosen[0]-position_mouse[0],positionChoosen[1]-position_mouse[1]]
			addEventListener('mousemove',mousemoveFunction)
			addEventListener('mouseup',mouseupFunction)
		}
		function mousemoveFunction(event){
			chessChoosen.div.style.left=event.clientX-game.div.offsetLeft+distance[0]-chessWidth/2+'px'
			chessChoosen.div.style.top=event.clientY-game.div.offsetTop+distance[1]-chessWidth/2+'px'
		}
		function mouseupFunction(event){
			removeEventListener('mousemove',mousemoveFunction)
			removeEventListener('mouseup',mouseupFunction)
			var choosenPosition=[event.clientX-game.div.offsetLeft+distance[0],event.clientY-game.div.offsetTop+distance[1]]
                        chessChoosen.coordinate=positionToCoordinate(choosenPosition)
                        choosenPosition=coordinateToPosition(chessChoosen.coordinate)
                        chessChoosen.div.style.left=choosenPosition[0]-chessWidth/2+'px'
                        chessChoosen.div.style.top=choosenPosition[1]-chessWidth/2+'px'
		}
	}
        function legalMove(c,cs,cd){
                var ps=coordinateToPosition(cs)
                var pd=coordinateToPosition(cd)
        }
}
