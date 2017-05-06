lineWidth=1
blockWidth=64
chessWidth=60
chessFont=chessWidth/1.6
chessLineWidth=1
chessGap=6
boardPadding=64
chuHanSize=48
function rotate(ctx,ang,x,y){
    ctx.setTransform(
        Math.cos(ang),Math.sin(ang),-Math.sin(ang),Math.cos(ang),
        2*x,2*y
    )
}
function move(ctx,x,y){
    ctx.setTransform(
        1,1,1,1,
        x,y
    )
}
function zoom(ctx,size,x,y){
    ctx.setTransform(
        size,0,0,size,
        x*(1-size),y*(1-size)
    )
}
function reset(ctx){
    ctx.setTransform(
        1,0,0,1,
        0,0
    )
}
