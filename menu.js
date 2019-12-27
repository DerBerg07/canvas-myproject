let currentShape;
let dropmenuNode = document.getElementById('menu');
let dropMenuAddNode = document.getElementById('menu-add');
let dropMenuCancelLine = document.getElementById('menu-cancel');
let dragging = false;
let firstCircle;
let lineArr = [];
let findCurLayer = function () {
    let trueLayer;
    app.convaLayers.forEach(function (layer, index) {
        if (layer.visible() == true) {

            trueLayer = index;
        }

    })
    return trueLayer;
};





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
    dropMenuCancelLine.style.display = 'none';
    currentShape.getParent().destroy();
    stage.batchDraw();
});



document.getElementById('canceleLine').addEventListener('click', () => {
    dropMenuCancelLine.style.display = 'none';

    if(currentShape.getClassName() === 'Line' && linedrag === false){
        console.log(mainArr[findCurLayer()].childCircles);
        let LineCircles = [];
       convaLayers[findCurLayer()].getChildren().forEach(group => {
           group.getChildren(function (node) {
               return node.getClassName() === 'Circle';
           }).forEach(circle => {
               if(circle){
                   console.log(currentShape.points());
                   if((currentShape.points()[0] === circle.x() && currentShape.points()[1] === circle.y()) || (currentShape.points()[2] === circle.x() && currentShape.points()[3] === circle.y()) ){
                       LineCircles.push(circle);

                   }
               }
           });
        });


       // circle.childrenCirclesID.splice(circle.childrenCirclesID.indexOf(idDel), 1);
        console.log(LineCircles);

        mainArr[findCurLayer()].childCircles.forEach(circle => {
                if(circle.ID === LineCircles[0].id()){
                    console.log("1");
                    circle.childrenCirclesID.forEach(id => {
                        if(id === LineCircles[1].id()){
                            console.log("2");
                            console.log(circle);
                            circle.childrenCirclesID.splice(circle.childrenCirclesID.indexOf(id), 1);
                            console.log(circle);
                        }

                    })
                }else if(circle.ID === LineCircles[1].id()){
                    console.log("11");
                    circle.childrenCirclesID.forEach(id => {
                        if(id === LineCircles[0].id()){
                            console.log("22");
                            console.log(circle);
                            circle.childrenCirclesID.splice(circle.childrenCirclesID.indexOf(id), 1);
                            console.log(circle);
                        }

                    })
                }


            });
        currentShape.remove();
        stage.batchDraw();
        return;

    }

    console.log("work");
    lineArr[lineArr.length - 1].remove();
    lineArr.splice([lineArr.length - 1], 1);
    linedrag = false;
    firstCircle = null;
    stage.batchDraw();

})



document.getElementById('line-button').addEventListener('click', () => {

    linedrag = true;

    firstCircle = currentShape;

    lineArr.push(
        new Konva.Line({
            stroke: "red",
            strokeWidth: 2/(findCurLayer() + 1),
            lineCap: 'round',
            lineJoin: 'round'

        })
    );
    convaLayers[findCurLayer()].add(lineArr[lineArr.length - 1]);

    stage.on('mousemove', function () {

        if(linedrag){
            lineArr[lineArr.length - 1].moveToBottom();
            lineArr[lineArr.length - 1].points([firstCircle.x(), firstCircle.y(), (stage.getPointerPosition().x - stage.x())/newScaleGlobal,(stage.getPointerPosition().y - stage.y())/newScaleGlobal]);

            stage.batchDraw();
        };

    });

    stage.on('click', function (e) {

        console.log(e.target);
        if(firstCircle && (e.target instanceof Konva.Circle || e.target instanceof Konva.Text) ){
            linedrag = false;
            let Shape;
            if (e.target.getClassName() === 'Text') {
                Shape = e.target.getParent().getChildren(function (node) {
                    return node.getClassName() === 'Circle';
                })[0];

            }else {
                Shape = e.target;
            }

                lineArr[lineArr.length - 1].points([firstCircle.x(), firstCircle.y(),Shape.x(),Shape.y()]);


            lineArr[lineArr.length - 1].moveToBottom();
            mainArr[findCurLayer()].childCircles.find(circle => circle.ID === firstCircle.id()).childrenCirclesID.push(Shape.id());
            firstCircle = null;


            stage.batchDraw();
        }
    })




    dropMenuAddNode.style.display = 'none';
    dropmenuNode.style.display = 'none';
    dropMenuCancelLine.style.display = 'none';

});





document.getElementById('colour-button').addEventListener('click', () => {
    let colour = document.getElementById('colour').value;
    currentShape.fill(colour);
    dropMenuAddNode.style.display = 'none';
    dropmenuNode.style.display = 'none';
    dropMenuCancelLine.style.display = 'none';
    stage.batchDraw();
})


//adding element
document.getElementById('add-button').addEventListener('click', () => {

let group = new Konva.Group();
    dropMenuAddNode.style.display = 'none';
    dropmenuNode.style.display = 'none';
    dropMenuCancelLine.style.display = 'none';

    let maxID = -1;

    mainArr[findCurLayer()].childCircles.forEach(function (circle) {

            if (circle.ID > maxID) {
                maxID = circle.ID;
            }

        }
    );


    let circle = new Konva.Circle({
        id: maxID + 1,
        x: (stage.getPointerPosition().x - stage.x())/newScaleGlobal,
        y: (stage.getPointerPosition().y - stage.y())/newScaleGlobal,
        radius: 20,
        fill: '#929229'
    });





    app.convaLayers.forEach(function (layer, index) {
        if (layer.visible() == true) {
            console.log(layer);

            group.add(circle);
            layer.add(group);

        }

    });


    currentShape = circle;
    circle.startDrag();


    circle.on('dragend', function (e) {

        mainArr[findCurLayer()].childCircles.push({
            ID: maxID + 1,
            posX: circle.x(),
            posY: circle.y(),
            layer: findCurLayer(),
            childrenCirclesID: [],
            childNextID: null
        })

        console.log(circle.id() + "кружальце");
        let Text = new Konva.Text({
            x: circle.x(),
            y: circle.y(),
            text:  circle.id().toString(),
            fontSize: 30,
            fontFamily: 'Calibri',
            fill: 'black'
        })

        Text.x(Text.x() - Text.width()/2);
        Text.y(Text.y() - Text.height()/2);
        group.add(Text);

        stage.batchDraw();
    })

})












document.getElementById('add-layer').addEventListener('click', () => {

        convaLayers.push(new Konva.Layer);
    mainArr.push({childCircles: []})
    stage.add(convaLayers[(mainArr.length - 1)]);

    console.log(convaLayers.length);
    document.getElementById('layres-count').innerText = 'Layers Count - ' + convaLayers.length;

});


document.getElementById('add-full').addEventListener('click', () => {


        if (document.getElementById("container").requestFullscreen) {
            document.getElementById("container").requestFullscreen();
        } else if (document.getElementById("container").mozRequestFullScreen) { /* Firefox */
            document.getElementById("container").mozRequestFullScreen();
        } else if (document.getElementById("container").webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            document.getElementById("container").webkitRequestFullscreen();
        } else if (document.getElementById("container").msRequestFullscreen) { /* IE/Edge */
            document.getElementById("container").msRequestFullscreen();
        }



    document.getElementById("container").addEventListener("fullscreenchange", function (event) {
            if (document.fullscreenElement) {
                width = window.innerWidth;
                height = document.getElementById("container").offsetHeight;
                console.log(width);
                stage.width(width);
                stage.height(height);
            } else {
                width = document.getElementById("container").offsetWidth;
                height = document.getElementById("container").offsetHeight;
                stage.width(width);
                stage.height(height);
            }
        });





});


document.getElementById('add-full-window').addEventListener('click', () => {

    console.log(document.getElementById('container').style.getPropertyValue('position'));
    let container =document.getElementById('container');
    container.classList.toggle('fullscreen');
    // if(document.getElementById('container').style.getPropertyValue("position") !== 'fixed'){
    //     // document.getElementById('container').style.position = 'fixed';
    //     document.getElementById('container').style.width = '100%';
    //     document.getElementById('container').style.height = '100%';
    //     width = window.innerWidth;
    //     height = document.getElementById("container").offsetHeight;
    //     console.log(width);
    //     stage.width(width);
    //     stage.height(height);
    //     console.log("full window +");
    // }else{
    //     // document.getElementById('container').style.position = 'absolute';
    //     document.getElementById('container').style.width = nativeSize.x + 'px';
    //     document.getElementById('container').style.height = nativeSize.y + 'px';
    //     width = document.getElementById("container").offsetWidth;
    //     height = document.getElementById("container").offsetHeight;
    //     console.log(width);
    //     stage.width(width);
    //     stage.height(height);
    //     console.log("full window - ");
    // }



})






document.getElementById('connect').addEventListener('click', () => {
   if(mainArr[findCurLayer() + 1].childCircles[Number(document.getElementById('connect_id').value)]){
       mainArr[findCurLayer()].childCircles[currentShape.id()].childNextID = Number(document.getElementById('connect_id').value);
       alert("connected");

       console.log(mainArr[findCurLayer() + 1].childCircles[document.getElementById('connect_id').value].posX);
   }

});

