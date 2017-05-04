function Board(){
	var board=this
	this.canvasWidth=boardPadding+8*blockWidth+boardPadding
	this.canvasHeight=boardPadding+9*blockWidth+boardPadding
	this.div=document.createElement('div')
	this.div.style.boardPadding=this.chessWidth+'px'
	this.div.appendChild(canvas())
	function canvas(){
		var canvas=document.createElement('canvas')
		canvas.width=board.canvasWidth
		canvas.height=board.canvasHeight
		var context=canvas.getContext('2d')
		draw()
		return canvas
		function draw(){
			context.beginPath()
			rotate(context,Math.PI,boardPadding+4*blockWidth,boardPadding+4.5*blockWidth)
			drawHalfBoard(boardPadding,boardPadding);
			reset(context)
			drawHalfBoard(boardPadding,boardPadding);
			drawBorder()
			context.stroke()
		}
		function drawHalfBoard(x,y){
			for(let i=x+blockWidth;i<=x+7*blockWidth;i+=blockWidth){
				context.moveTo(i,y)
				context.lineTo(i,y+4*blockWidth)
			}
			for(let i=y+blockWidth;i<=y+4*blockWidth;i+=blockWidth){
				context.moveTo(x,i)
				context.lineTo(x+8*blockWidth,i)
			}
			context.moveTo(x+3*blockWidth,y)
			context.lineTo(x+5*blockWidth,y+2*blockWidth)
			context.moveTo(x+5*blockWidth,y)
			context.lineTo(x+3*blockWidth,y+2*blockWidth)
			var crossPosition=[
				[1,2],[7,2],
				[0,3],[2,3],[4,3],[6,3],[8,3]
			]
			for(p of crossPosition)
				drawCross(boardPadding+p[0]*blockWidth,boardPadding+p[1]*blockWidth)
		}
		function drawCross(x,y){
			var l=blockWidth/5
			var d=blockWidth/16
			var quadrant=[1,-1]
			for(i of quadrant)for(j of quadrant){
				if((x+i*d-boardPadding)<8*blockWidth&&(x+i*d-boardPadding)>0){
					context.moveTo(x+i*d,y+j*d)
					context.lineTo(x+i*d,y+j*(d+l))
					context.moveTo(x+i*d,y+j*d)
					context.lineTo(x+i*(d+l),y+j*d)
				}
			}
		}
		function drawBorder(){
			var d=blockWidth/16
			context.strokeRect(boardPadding,boardPadding,8*blockWidth,9*blockWidth)
			context.strokeRect(
				boardPadding-d,boardPadding-d,
				d+8*blockWidth+d,d+9*blockWidth+d
			)
		}
	}

}
