function createGameDiv(game,div,color){
	var board=new Board()
	div.appendChild(board.div)
	for(c of game.chesses){
		board.div.appendChild(c.createCanvas,color)
		if(
