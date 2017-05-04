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
                let thisPosition=coordinateToPosition(game.chessCoordinate[i])
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
		for(let i in game.chesses){
                        let thisPosition=coordinateToPosition(game.chessCoordinate[i])
			if(
                                (thisPosition[0]-p[0])*(thisPosition[0]-p[0])+
				(thisPosition[1]-p[1])*(thisPosition[1]-p[1])<
				chessWidth*chessWidth/4
			){
				return game.chesses[i]
			}
		}
	}
	this.div.addEventListener('mousedown',mousedown)
	function mousedown(event){
		var position_div=[game.div.offsetLeft,game.div.offsetTop]
		var position_mouse=[event.clientX-position_div[0],event.clientY-position_div[1]]
		var chessChoosen=positionToChess(position_mouse)
		if(chessChoosen){
			game.div.appendChild(chessChoosen.div)
			console.log(chessChoosen)
			var distance=[chessChoosen.position[0]-position_mouse[0],chessChoosen.position[1]-position_mouse[1]]
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
			chessChoosen.position=[event.clientX-game.div.offsetLeft+distance[0],event.clientY-game.div.offsetTop+distance[1]]
		}
	}
}
