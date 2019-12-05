'use strict';
let width = document.getElementById("container").offsetWidth;
let height = document.getElementById("container").offsetHeight;
let newPosGlobal = {x: 0, y: 0};
let newScaleGlobal = 1;

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
    for (let i = 0; i < mainArr.length; i++) {
        convaLayers[i] = new Konva.Layer();
        convaLayers[i].visible(false);

        stage.add(convaLayers[i]);

    }
}

addLayersToStage();


mainArr.forEach(function (layer, index) {

    layer.childCircles.forEach(function (circle) {

        let group = new Konva.Group();

        circle.childrenCirclesID.forEach(function (ID) {
            let lineDraw = new Konva.Line({
                points: [mainArr[index].childCircles.find(circle => circle.ID === ID).posX, mainArr[index].childCircles.find(circle => circle.ID === ID).posY, circle.posX, circle.posY],
                stroke: "red",
                strokeWidth: 2,
                lineCap: 'round',
                lineJoin: 'round'
            })

            convaLayers[index].add(lineDraw);
            lineDraw.moveToBottom();
        });


        let CircleDraw = new Konva.Circle({
            id: circle.ID,
            x: circle.posX,
            y: circle.posY,
            radius: 20,
            fill: "red"
        });


        let Text = new Konva.Text({
            x: circle.posX ,
            y: circle.posY ,
            text: circle.ID.toString(),
            fontSize: 30,
            fontFamily: 'Calibri',
            fill: 'black'
        })


        Text.x(Text.x()- Text.width()/2 );
        Text.y(Text.y()- Text.height()/2 );

        group.add(CircleDraw);
        group.add(Text);

        convaLayers[index].add(group);
        group.moveToTop();

    })
    convaLayers[index].draw();
    stage.batchDraw();
});


convaLayers[0].visible(true);
currentVisibleLayer = 0;


stage.on('mousemove', function () {
    var mousePos = stage.getPointerPosition();
    var x = mousePos.x;
    var y = mousePos.y;

});

document.getElementById('layres-count').innerText = 'Layers Count - ' + convaLayers.length;

function layerVisability(newScale, oldScale, delta) {


    let parent;
    let child;

    if (newScale > 3) {

        convaLayers[currentVisibleLayer].visible(false);
        currentVisibleLayer++;
        convaLayers[currentVisibleLayer].visible(true);


        let distance = stage.width();


        mainArr[currentVisibleLayer - 1].childCircles.forEach(function (circle) {
            if ((Math.abs((stage.getPointerPosition().y - stage.y()) / newScaleGlobal - circle.posY) + Math.abs((stage.getPointerPosition().x - stage.x()) / newScaleGlobal - circle.posX)) < distance) {
                distance = Math.abs((stage.getPointerPosition().y - stage.y()) / newScaleGlobal - circle.posY) + Math.abs((stage.getPointerPosition().x - stage.x()) / newScaleGlobal - circle.posX);
                parent = circle.ID;
                child = circle.childNextID;
            }
        });
        console.log(child);

        if(child !== null){
            console.log(currentVisibleLayer + " Layer");
            console.log(mainArr[currentVisibleLayer].childCircles.find(circle => circle.ID == child)+ " circle");
            console.log(child);
            console.log("going");
            console.log(stage.width());
            stage.x((stage.width()/2 - mainArr[currentVisibleLayer].childCircles.find(circle => circle.ID === child).posX));
            stage.y( (0 - mainArr[currentVisibleLayer].childCircles.find(circle => circle.ID === child).posY) + 100);

        };











        stage.scale({x: 1, y: 1});
        newScaleGlobal = 1;






    }



    if (newScale < 1) {






        convaLayers[currentVisibleLayer].visible(false);
        currentVisibleLayer--;
        convaLayers[currentVisibleLayer].visible(true);
        stage.scale({x: 3, y: 3})
        newScaleGlobal = 3;
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
    console.log(newScale < 0.1);
    console.log(!convaLayers[findCurLayer() - 1]);

    if(newScale < 1 && !convaLayers[findCurLayer() - 1]){
        console.log("vihod");
        return;
    };
    if(newScale > 3 && !convaLayers[findCurLayer() + 1]){
        console.log("vihod");
        return;
    };


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

    newScaleGlobal = newScale;
    newPosGlobal = newPos;
    layerVisability(newScale, oldScale, e.evt.deltaY);

});




