'use strict';
let width = document.getElementById("container").offsetWidth;
let height = document.getElementById("container").offsetHeight;
let newPosGlobal = {x: 0, y: 0};
let newScaleGlobal = 1;
let scale = 1;
let circleObjArr = [];
let currentVisibleLayer;

let stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
    draggable: true,

});


document.getElementById("container").appendChild(document.getElementById("menu"));
document.getElementById("container").appendChild(document.getElementById("menu-add"));
document.getElementById("container").appendChild(document.getElementById("layer-menu"));

let convaLayers = [];

//обавляем слои,

function addLayersToStage() {
    for(let i = 0; i < mainArr.length; i++){
        convaLayers[i] = new Konva.Layer();
        convaLayers[i].visible(false);

        stage.add(convaLayers[i]);

    }
}
addLayersToStage();



console.log(stage.getChildren());


mainArr.forEach(function (layer, index) {

    layer.childCircles.forEach(function (circle) {


        circle.childrenCirclesID.forEach(function (ID) {
            let lineDraw = new Konva.Line({
                points: [mainArr[index].childCircles.find(circle => circle.ID === ID).posX, mainArr[index].childCircles.find(circle => circle.ID === ID).posY, circle.posX, circle.posY],
                stroke: "red",
                strokeWidth: 2/(index + 1),
                lineCap: 'round',
                lineJoin: 'round'
            })

            convaLayers[index].add(lineDraw);
            lineDraw.moveToBottom();
        });

        console.log(circle.ID);

        let CircleDraw = new Konva.Circle({
            id: circle.ID,
            x: circle.posX,
            y: circle.posY,
            radius: 20/(index + 1),
            fill: "red"
        });

        convaLayers[index].add(CircleDraw);
        CircleDraw.moveToTop();


        // ДОБАВЛЕНИЕ НАДПИСИ НАД КРУЖКАМИ
        let circleNumber = new Konva.Text({

                x: circle.posX,
                y: circle.posY,
                text: circle.ID,
                fontSize: 30,
                fontFamily: 'Calibri',
                fill: 'black'

        })

        CircleDraw.add(circleNumber);
        circleNumber.moveToTop();

    })
    convaLayers[index].draw();
    stage.batchDraw();
});


convaLayers[0].visible(true);
currentVisibleLayer = 0;





function layerVisability(newScale, oldScale, delta) {
    console.log((newScale % 1));
    console.log((oldScale % 1));
    console.log(delta);

    if(newScale % 1 < oldScale % 1 && delta < 0){
        console.log("oleg");
        convaLayers[currentVisibleLayer].visible(false);
        currentVisibleLayer++;
        convaLayers[currentVisibleLayer].visible(true);
    }

    if(newScale % 1 > oldScale% 1 && delta > 0  ){
        console.log("dima");
        convaLayers[currentVisibleLayer].visible(false);
        currentVisibleLayer--;
        convaLayers[currentVisibleLayer].visible(true);

    }

    document.getElementById('currentLayer').innerText = "Layer" + (findCurLayer() + 1);




}

//скейл колесиком
var scaleBy = 0.05;

stage.on('wheel', e => {
    e.evt.preventDefault();
    var oldScale = stage.scaleX();

    var mousePointTo = {
        x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
        y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
    };

    var newScale =
        e.evt.deltaY > 0 ? oldScale - scaleBy : oldScale + scaleBy;

    stage.scale({x: newScale, y: newScale});

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

    newScaleGlobal  =newScale;
    newPosGlobal = newPos;
    layerVisability(newScale, oldScale, e.evt.deltaY);
});




