let currentShape;


let dropmenuNode = document.getElementById('menu');
let dropMenuAddNode = document.getElementById('menu-add');
//deleting elements
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
    console.log(currentShape);

    circleArr.splice(circleArr.indexOf(circleArr.find(circle => circle.ID === currentShape.id())), 1);
    console.log(circleArr);
    currentShape.destroy();
    stage.batchDraw();
});


//adding element
document.getElementById('add-button').addEventListener('click', () => {
    console.log(stage.x());
    console.log(newPosGlobal);
    let circle = new Konva.Circle({
        x: (stage.getPointerPosition().x - stage.x() )/ newScaleGlobal,
        y: (stage.getPointerPosition().y - stage.y())/ newScaleGlobal,
        radius: 20,
        fill: "red"
    });
    //newScaleGlobal
    layer1.add(circle);
    circle.startDrag();


})







window.addEventListener('click', () => {
    dropMenuAddNode.style.display = 'none';
    dropmenuNode.style.display = 'none';
})
stage.on('wheel', e => {
    dropmenuNode.style.display = 'none';
    dropMenuAddNode.style.display = 'none';
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