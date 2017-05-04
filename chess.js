var textOfColorType=[
	'將士象車馬包卒',
	'帥仕相俥傌炮兵'
]
function Chess(color,type){
	var chess=this
	this.color=color
	this.type=type
        this.div=canvas()
        this.position=[0,0]
	function canvas(){
		var canvas=document.createElement('canvas')
		var context=canvas.getContext('2d')
		var radius=lineWidth+chessWidth/2
		canvas.width=radius*2
		canvas.height=radius*2
		context.strokeStyle=(color==0)?'black':'red'
		context.lineWidth=chessLineWidth*2
		context.beginPath()
		context.arc(radius,radius,radius-lineWidth,0,Math.PI*2)
		context.fillStyle='white'
		context.fill()
		context.stroke()
		context.lineWidth=chessLineWidth
		context.beginPath()
		context.arc(radius,radius,radius-lineWidth-chessGap,0,Math.PI*2)
		context.fillStyle=(color==0)?'black':'red'
		context.font='bold '+chessFont+'px Ukai'
		context.textAlign='center'
		context.textBaseline='middle'
		context.fillText(
			textOfColorType[color][type],
			radius,radius
		)
		context.stroke()
		return canvas
	}
}

