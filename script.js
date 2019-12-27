'use strict';

let nativeSize = {
    x: 1200,
    y: 700
}


let currentVisibleLayer;

let stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
    draggable: true,

});


document.getElementById("container").appendChild(document.getElementById("menu"));
document.getElementById("container").appendChild(document.getElementById("menu-cancel"));
document.getElementById("container").appendChild(document.getElementById("menu-add"));
document.getElementById("container").appendChild(document.getElementById("layer-menu"));

let convaLayers = [];


//обавляем слои,

console.log(stage.dragDistance());

stage.dragBoundFunc(function(pos){
let ogranichenie = 300;
    var ogranich_x = [];
    var ogranich_y = [];
    mainArr[findCurLayer()].childCircles.forEach(function (circle) {
        if(ogranich_x[0]){
            if(circle.posX > ogranich_x[0]){
                ogranich_x[0] = circle.posX;
            }
        }else{
            ogranich_x[0] = circle.posX;

        }

        if(ogranich_x[1]){
            if(circle.posX < ogranich_x[1]){
                ogranich_x[1] = circle.posX;
            }
        }else{
            ogranich_x[1] = circle.posX;

        }


        if(ogranich_y[0]){
            if(circle.posY > ogranich_y[0]){
                ogranich_y[0] = circle.posY;
            }
        }else{
            ogranich_y[0] = circle.posY;

        }

        if(ogranich_y[1]){
            if(circle.posY < ogranich_y[1]){
                ogranich_y[1] = circle.posY;
            }
        }else{
            ogranich_y[1] = circle.posY;

        }

    })


    var newY;
    var newX;
    if(pos.x <(0 + ogranichenie - ogranich_x[0])){

        newX =  (0 + ogranichenie - ogranich_x[0])
    }else if(pos.x >(width - ogranichenie - ogranich_x[1] )){


        newX =  (width- ogranichenie - ogranich_x[1]);
    }else{

        newX = pos.x

    };
    console.log(newX);
    if(pos.y <(0 + ogranichenie - ogranich_y[0])){

        newY =  ( 0 + ogranichenie - ogranich_y[0])
    }else if(pos.y >(height - 100 - ogranich_y[1] )){
        newY = (height - 100 - ogranich_y[1]);
    }else{
        newY = pos.y
    };
    console.log(newY);
    console.log();
    return {

        x: newX ,
        y: newY

    };
})



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
            x: circle.posX,
            y: circle.posY,
            text: circle.ID.toString(),
            fontSize: 30,
            fontFamily: 'Calibri',
            fill: 'black'
        })


        Text.x(Text.x() - Text.width() / 2);
        Text.y(Text.y() - Text.height() / 2);

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

function layerVisability(newScale) {

    let parent;
    let child;

    if (newScale > 3) {

        console.log(stage.x());

        convaLayers[currentVisibleLayer].visible(false);
        currentVisibleLayer++;
        convaLayers[currentVisibleLayer].visible(true);


        let distance = stage.width();

        mainArr[currentVisibleLayer - 1].childCircles.forEach(function (circle) {
            if ((Math.abs((stage.getPointerPosition().y - stage.y()) / newScaleGlobal - circle.posY) + Math.abs((stage.getPointerPosition().x - stage.x()) / newScaleGlobal - circle.posX)) < distance) {
                distance = Math.abs((stage.getPointerPosition().y - stage.y()) / newScaleGlobal - circle.posY) + Math.abs((stage.getPointerPosition().x - stage.x()) / newScaleGlobal - circle.posX);
                parent = circle;
                child = circle.childNextID;
            }
        });

        console.log(parent);

        if (child !== null) {
            console.log(currentVisibleLayer + " Layer");
            console.log(mainArr[currentVisibleLayer].childCircles.find(circle => circle.ID == child) + " circle");
            console.log(child);
            console.log("going");
            stage.x((stage.getPointerPosition().x - mainArr[currentVisibleLayer].childCircles.find(circle => circle.ID === child).posX));
            stage.y((stage.getPointerPosition().y - mainArr[currentVisibleLayer].childCircles.find(circle => circle.ID === child).posY));

        }


        stage.scale({x: 1, y: 1});
        newScaleGlobal = 1;

    }

    if (newScale < 1) {

        convaLayers[currentVisibleLayer].visible(false);
        currentVisibleLayer--;
        convaLayers[currentVisibleLayer].visible(true);

        let distance = stage.width();

        mainArr[currentVisibleLayer + 1].childCircles.forEach(function (circle) {
            if ((Math.abs((stage.getPointerPosition().y - stage.y()) / newScaleGlobal - circle.posY) + Math.abs((stage.getPointerPosition().x - stage.x()) / newScaleGlobal - circle.posX)) < distance) {
                distance = Math.abs((stage.getPointerPosition().y - stage.y()) / newScaleGlobal - circle.posY) + Math.abs((stage.getPointerPosition().x - stage.x()) / newScaleGlobal - circle.posX);
                parent = circle;

                if(mainArr[currentVisibleLayer].childCircles.find(circle => circle.childNextID === parent.ID)){
                    child = mainArr[currentVisibleLayer].childCircles.find(circle => circle.childNextID === parent.ID).ID;
                }else {child = null;}

            }
        });

        stage.scale({x: 3, y: 3})
        newScaleGlobal = 3;
        if (child !== null) {
            stage.x(((stage.getPointerPosition().x - mainArr[currentVisibleLayer].childCircles.find(circle => circle.ID === child).posX*3)));
            stage.y(((stage.getPointerPosition().y - mainArr[currentVisibleLayer].childCircles.find(circle => circle.ID === child).posY*3)));
        }
    }

    document.getElementById('currentLayer').innerText = "Layer" + (findCurLayer() + 1);


}

//скейл колесиком
var scaleBy = 0.6;

stage.on('wheel', e => {
    e.evt.preventDefault();
    var oldScale = stage.scaleX();

    var mousePointTo = {
        x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
        y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
    };

    var newScale =
        e.evt.deltaY > 0 ? oldScale - scaleBy : oldScale + scaleBy;

    if (newScale < 1 && !convaLayers[findCurLayer() - 1]) {
        console.log("vihod");
        return;
    }

    if (newScale > 3 && !convaLayers[findCurLayer() + 1]) {
        console.log("vihod");
        return;
    }



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




