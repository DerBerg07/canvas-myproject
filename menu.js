



let currentShape;


let dropmenuNode = document.getElementById('menu');

document.getElementById('delete-button').addEventListener('click', () => {
    currentShape.destroy();
    console.log(currentShape);
    stage.batchDraw();
});






window.addEventListener('click', () => {

    dropmenuNode.style.display = 'none';
})
stage.on('wheel', e => {dropmenuNode.style.display = 'none';})







stage.on('contextmenu', function(e) {
    // prevent default behavior
    e.evt.preventDefault();
    if (e.target === stage) {
        // if we are on empty place of the stage we will do nothing
        return;
    }


    currentShape = e.target;

    console.log(currentShape);
    // show menu
    dropmenuNode.style.display = 'initial';
    var containerRect = stage.container().getBoundingClientRect();
    dropmenuNode.style.top = containerRect.top + stage.getPointerPosition().y + 4 +'px';
    dropmenuNode.style.left = containerRect.left + stage.getPointerPosition().x + 4 + 'px';
});