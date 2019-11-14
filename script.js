let  width = window.innerWidth;
let  height = window.innerHeight;
let circleArrX = [[width/2,height/5],[width/3,height/4], [(width/3)*2,height/3], [width/4,height/2], [width/5,height/3*2] , [width/5*2,height/3*2]];
let scale = 1;
let circleObjArr = [];
let stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
    draggable: true,
});

let layer1 = new Konva.Layer();

var group1= new Konva.Group({
    x: 120,
    y: 40,
});

stage.add(layer1);
//рисуем линии пока-что вручную
function drawLines(arrayOfCircles) {
    var redLine1 = new Konva.Line({
        points: [arrayOfCircles[0][0], arrayOfCircles[0][1], arrayOfCircles[1][0], arrayOfCircles[1][1]],
        stroke: 'red',
        strokeWidth: 15,
        lineCap: 'round',
        lineJoin: 'round'
    });
    group1.add(redLine1);
    var redLine2 = new Konva.Line({
        points: [arrayOfCircles[0][0], arrayOfCircles[0][1], arrayOfCircles[2][0], arrayOfCircles[2][1]],
        stroke: 'red',
        strokeWidth: 15,
        lineCap: 'round',
        lineJoin: 'round'
    });
    group1.add(redLine2);
    var redLine3 = new Konva.Line({
        points: [arrayOfCircles[1][0], arrayOfCircles[1][1], arrayOfCircles[3][0], arrayOfCircles[3][1]],
        stroke: 'red',
        strokeWidth: 15,
        lineCap: 'round',
        lineJoin: 'round'
    });
    group1.add(redLine3);
    var redLine4 = new Konva.Line({
        points: [arrayOfCircles[3][0], arrayOfCircles[3][1], arrayOfCircles[4][0], arrayOfCircles[4][1]],
        stroke: 'red',
        strokeWidth: 15,
        lineCap: 'round',
        lineJoin: 'round'
    });
    group1.add(redLine4);
    var redLine5 = new Konva.Line({
            points: [arrayOfCircles[3][0], arrayOfCircles[3][1], arrayOfCircles[5][0], arrayOfCircles[5][1]],
        stroke: 'red',
        strokeWidth: 15,
        lineCap: 'round',
        lineJoin: 'round'
    });
    group1.add(redLine5);

}
drawLines(circleArrX);
//заполняем группу
colour1 = "#F08080";
colour2 = "#F00";

for( let i = 0; i < circleArrX.length; i++){

    let box = new Konva.Circle({
        x:  circleArrX[i][0],
        y: circleArrX[i][1],
        radius: 100,
        fill: colour1

    });


    group1.add(box);
}






console.log(group1);
layer1.add(group1);
layer1.draw();























//скейл колесиком
var scaleBy = 1.03;
stage.on('wheel', e => {
    e.evt.preventDefault();
    var oldScale = stage.scaleX();

    var mousePointTo = {
        x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
        y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
    };

    var newScale =
        e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
    stage.scale({ x: newScale, y: newScale });

    var newPos = {
        x:
            -(mousePointTo.x - stage.getPointerPosition().x / newScale) *
            newScale,
        y:
            -(mousePointTo.y - stage.getPointerPosition().y / newScale) *
            newScale
    };
    stage.position(newPos);
    stage.batchDraw();
    console.log(newScale);

    if(newScale > 1.4){
        group1.getChildren(function(node){
            return node.getClassName() === 'Circle';
        }).forEach(circle => circle.fill(colour2));
        layer1.draw();
    }else {
        group1.getChildren(function(node){
            return node.getClassName() === 'Circle';
        }).forEach(circle => circle.fill(colour1));
        layer1.draw();
    }
});


