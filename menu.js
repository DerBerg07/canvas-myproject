let currentShape;
let dropmenuNode = document.getElementById('menu');
let dropMenuAddNode = document.getElementById('menu-add');
let dragging = false;

let findCurLayer = function () {
    let trueLayer;
    convaLayers.forEach(function (layer, index) {
        if (layer.visible() == true) {

            trueLayer = index;
        }

    })
    return trueLayer;
};


console.log(convaLayers[0].getChildren());


stage.on('click', e => {


    dropMenuAddNode.style.display = 'none';
    dropmenuNode.style.display = 'none';
})


document.getElementById('delete-button').addEventListener('click', () => {

    if (currentShape.getClassName() === 'Circle') {


        let curLayet = currentShape.getLayer();


        let lines = curLayet.getChildren(function (node) {

            return node.getClassName() === 'Line';
        });

        lines.forEach(function (line) {


            if ((line.points()[0] === currentShape.getX()) || (line.points()[2] === currentShape.getX())) {
                if ((line.points()[1] === currentShape.getY()) || (line.points()[3] === currentShape.getY())) {
                    line.destroy();
                }
            }

        })

    }


    mainArr[findCurLayer()].childCircles.splice(mainArr[findCurLayer()].childCircles.indexOf(mainArr[findCurLayer()].childCircles.find(circle => circle.ID === currentShape.id())), 1);
    dropMenuAddNode.style.display = 'none';
    dropmenuNode.style.display = 'none';
    currentShape.destroy();
    stage.batchDraw();
});


document.getElementById('colour-button').addEventListener('click', () => {
    let colour = document.getElementById('colour').value;

    currentShape.fill('#' + colour);
    dropMenuAddNode.style.display = 'none';
    dropmenuNode.style.display = 'none';
    stage.batchDraw();
})


//adding element
document.getElementById('add-button').addEventListener('click', () => {


    dropMenuAddNode.style.display = 'none';
    dropmenuNode.style.display = 'none';

    let maxID = -1;

    mainArr[findCurLayer()].childCircles.forEach(function (circle) {

            if (circle.ID > maxID) {
                maxID = circle.ID;
            }

        }
    );


    let circle = new Konva.Circle({
        id: maxID,
        x: (stage.getPointerPosition().x - stage.x()) / newScaleGlobal,
        y: (stage.getPointerPosition().y - stage.y()) / newScaleGlobal,
        radius: 20,
        fill: '#929229'
    });


    //newScaleGlobal
    convaLayers.forEach(function (layer, index) {
        if (layer.visible() == true) {
            circle.radius(circle.radius() / (index + 1));
            layer.add(circle);
        }

    })


    currentShape = circle;
    circle.startDrag();


    circle.on('dragend', function (e) {
        mainArr[findCurLayer()].childCircles.push({
            ID: maxID + 1,
            posX: circle.x(),
            posY: circle.y(),
            layer: findCurLayer(),
            childrenCirclesID: []
        })
    })

})


stage.on('drop', function (e) {
    console.log("das");
})


window.addEventListener('click', () => {

})
stage.on('wheel', e => {

})


stage.on('contextmenu', function (e) {
    // prevent default behavior
    e.evt.preventDefault();
    if (e.target === stage) {
        // if we are on empty place of the stage we will do nothing
        dropMenuAddNode.style.display = 'initial';
        var containerRect = stage.container().getBoundingClientRect();
        dropMenuAddNode.style.top = containerRect.top + stage.getPointerPosition().y + 4 + 'px';
        dropMenuAddNode.style.left = containerRect.left + stage.getPointerPosition().x + 4 + 'px';
        return;
    }


    currentShape = e.target;


    // show menu
    dropmenuNode.style.display = 'initial';
    var containerRect = stage.container().getBoundingClientRect();
    dropmenuNode.style.top = containerRect.top + stage.getPointerPosition().y + 4 + 'px';
    dropmenuNode.style.left = containerRect.left + stage.getPointerPosition().x + 4 + 'px';
});