var textOfColorType=[
	'帥仕相俥傌炮兵',
	'將士象車馬包卒'
]
function Chess(color,type){
    var chess=this
    this.color=color
    this.type=type
    this.div=canvas()
    function canvas(upsideDown){
        var canvas=document.createElement('canvas')
        var context=canvas.getContext('2d')
        var radius=lineWidth+chessWidth/2
        canvas.width=radius*2
        canvas.height=radius*2
        context.strokeStyle=(color==1)?'black':'red'
        context.lineWidth=chessLineWidth*2
        context.beginPath()
        context.arc(radius,radius,radius-lineWidth,0,Math.PI*2)
        context.fillStyle='white'
        context.fill()
        context.stroke()
        context.lineWidth=chessLineWidth
        context.beginPath()
        context.arc(radius,radius,radius-lineWidth-chessGap,0,Math.PI*2)
        context.fillStyle=(color==1)?'black':'red'
        context.font='bold '+chessFont+'px Ukai'
        context.textAlign='center'
        context.textBaseline='middle'
        context.fillText(
                textOfColorType[color][type],
                radius,radius
        )
        if(upsideDown)
            context.rotate(Math.PI)
        context.stroke()
        return canvas
    }
}

