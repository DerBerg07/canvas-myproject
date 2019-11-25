let width = document.getElementById("container").offsetWidth;
let height = document.getElementById("container").offsetHeight;
let newPosGlobal = {x: 0, y: 0};
let newScaleGlobal = 1;
let scale = 1;
let circleObjArr = [];
console.log(width);

let stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
    draggable: true,

});

let layer1 = new Konva.Layer();
let layer2 = new Konva.Layer();
let layer3 = new Konva.Layer();

stage.add(layer1);
stage.add(layer2);
stage.add(layer3);
layer2.visible(false);
layer3.visible(false);


circleArr.forEach(function (circle) {

        //line draw

        circle.childrenCirclesID.forEach(function (ID) {
            let lineDraw = new Konva.Line({

                points: [circleArr.find(circle => circle.ID == ID).posX, circleArr.find(circle => circle.ID == ID).posY, circle.posX, circle.posY],
                stroke: circle.layer == 1 ? "red" : "green",
                strokeWidth: circle.layer == 1 ? 2 : 0.7,
                lineCap: 'round',
                lineJoin: 'round'
            })

            switch (circle.layer) {
                case 1:
                    layer1.add(lineDraw);
                    break;
                case 2:
                    layer2.add(lineDraw);
                    break;
                case 3:
                    layer3.add(lineDraw);
                    break;
            }
            ;

        })


//circle draw
        let CircleDraw = new Konva.Circle({
            id: circle.ID,
            x: circle.posX,
            y: circle.posY,
            radius: circle.layer == 1 ? 20 : 7,
            fill: circle.layer == 1 ? "red" : "green"
        });

        console.log(circle.ID);
        console.log(CircleDraw.id());
        switch (circle.layer) {
            case 1:
                layer1.add(CircleDraw);
                break;
            case 2:
                layer2.add(CircleDraw);
                break;
            case 3:
                layer3.add(CircleDraw);
                break;
        }
        ;


    }
)


layer1.draw();
layer2.draw();
layer3.draw();

function layerVisability(newScale) {
    if (newScale > 3) {

        layer1.visible(false);
        layer2.visible(true);

    } else if (newScale < 3) {
        layer2.visible(false);
        layer1.visible(true);
    }

    console.log(layer1.isVisible());
}

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
    console.log(newScale);
    newScaleGlobal  =newScale;
    newPosGlobal = newPos;
    layerVisability(newScale);
});




