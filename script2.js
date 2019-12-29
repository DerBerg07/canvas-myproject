'use strict';
window.onload = function () {

    let app = {
        container: '',
        currentVisibleLayer: 0,
        stage: '',
        convaLayers: [],
        layerCount: 0,
        scaleBy: 0.6,
        currentShape: '',
        dropmenuNode: document.getElementById('menu'),
        dropMenuAddNode: document.getElementById('menu-add'),
        dropMenuCancelLine: document.getElementById('menu-cancel'),
        dragging: false,
        firstCircle: '',
        lineArr: [],

        nativeSize: {},
        init: function (mainArr) {
            this.stage = new Konva.Stage({
                container: 'container',
                width: width,
                height: height,
                draggable: true
            });
            this.container = document.getElementById("container");
            this.container.appendChild(document.getElementById("menu"));
            this.container.appendChild(document.getElementById("menu-cancel"));
            this.container.appendChild(document.getElementById("menu-add"));
            this.container.appendChild(document.getElementById("layer-menu"));
            this.nativeSize = {
                x: 1200,
                y: 700
            };

            this.setLeyers();
            this.addLayersToStage();
            this.currentVisibleLayer = 0;

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
                        });

                        app.convaLayers[index].add(lineDraw);
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
                    });


                    Text.x(Text.x() - Text.width() / 2);
                    Text.y(Text.y() - Text.height() / 2);

                    group.add(CircleDraw);
                    group.add(Text);

                    app.convaLayers[index].add(group);
                    group.moveToTop();

                });
                app.convaLayers[index].draw();
                app.stage.batchDraw();
            });

            this.stage.on('mousemove', function () {
                var mousePos = app.stage.getPointerPosition();
                var x = mousePos.x;
                var y = mousePos.y;

            });
            this.container.querySelector('#layres-count').innerText = 'Layers Count - ' + app.convaLayers.length;
            this.stage.on('wheel', e => {
                e.evt.preventDefault();
                var oldScale = app.stage.scaleX();

                var mousePointTo = {
                    x: app.stage.getPointerPosition().x / oldScale - app.stage.x() / oldScale,
                    y: app.stage.getPointerPosition().y / oldScale - app.stage.y() / oldScale
                };

                var newScale =
                    e.evt.deltaY > 0 ? oldScale - app.scaleBy : oldScale + app.scaleBy;

                if (newScale < 1 && !app.convaLayers[app.findCurLayer() - 1]) {
                    console.log("vihod");
                    return;
                }

                if (newScale > 3 && !app.convaLayers[app.findCurLayer() + 1]) {
                    console.log("vihod");
                    return;
                }


                this.stage.scale({x: newScale, y: newScale});

                var newPos = {
                    x:
                    -(mousePointTo.x - this.stage.getPointerPosition().x / newScale) *
                    newScale,
                    y:
                    -(mousePointTo.y - this.stage.getPointerPosition().y / newScale) *
                    newScale
                };


                this.stage.position(newPos);
                this.stage.batchDraw();

                newScaleGlobal = newScale;
                newPosGlobal = newPos;
                this.layerVisability(newScale, oldScale, e.evt.deltaY);

            });
            this.stage.on('click', e => {
                app.dropMenuAddNode.style.display = 'none';
                app.dropmenuNode.style.display = 'none';
            });
            this.stage.on('contextmenu', function (e) {
                e.evt.preventDefault();
                if (linedrag === true) {

                    dropMenuCancelLine.style.display = 'initial';
                    var containerRect = app.stage.container().getBoundingClientRect();
                    dropMenuCancelLine.style.top = containerRect.top + app.stage.getPointerPosition().y + 4 + 'px';
                    dropMenuCancelLine.style.left = containerRect.left + app.stage.getPointerPosition().x + 4 + 'px';
                    return;

                }


                // prevent default behavior

                if (e.target === app.stage) {
                    // if we are on empty place of the stage we will do nothing
                    app.dropMenuAddNode.style.display = 'initial';
                    var containerRect = app.stage.container().getBoundingClientRect();
                    app.dropMenuAddNode.style.top = containerRect.top + app.stage.getPointerPosition().y + 4 + 'px';
                    app.dropMenuAddNode.style.left = containerRect.left + app.stage.getPointerPosition().x + 4 + 'px';
                    console.log("empty");
                    return;
                }


                if (e.target.getClassName() === 'Text') {
                    console.log("oleggg");
                    currentShape = e.target.getParent().getChildren(function (node) {
                        return node.getClassName() === 'Circle';
                    })[0];
                } else {
                    currentShape = e.target;
                    dropMenuCancelLine.style.display = 'initial';
                    var containerRect = app.stage.container().getBoundingClientRect();
                    dropMenuCancelLine.style.top = containerRect.top + app.stage.getPointerPosition().y + 4 + 'px';
                    dropMenuCancelLine.style.left = containerRect.left + app.stage.getPointerPosition().x + 4 + 'px';
                    return;
                }

                if (e.target.getClassName() === 'Line') {
                    console.log("lineFOUND");
                    currentShape = e.target;

                }

                // show menu
                dropmenuNode.style.display = 'initial';
                var containerRect = stage.container().getBoundingClientRect();
                dropmenuNode.style.top = containerRect.top + stage.getPointerPosition().y + 4 + 'px';
                dropmenuNode.style.left = containerRect.left + stage.getPointerPosition().x + 4 + 'px';
            });


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
                let container = document.getElementById('container');
                container.classList.toggle('fullscreen');

            })


            document.getElementById('connect').addEventListener('click', () => {
                if (mainArr[app.findCurLayer() + 1].childCircles[Number(document.getElementById('connect_id').value)]) {
                    mainArr[app.findCurLayer()].childCircles[currentShape.id()].childNextID = Number(document.getElementById('connect_id').value);
                    alert("connected");
                }

            });
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


                mainArr[app.findCurLayer()].childCircles.splice(mainArr[app.findCurLayer()].childCircles.indexOf(mainArr[app.findCurLayer()].childCircles.find(circle => circle.ID === currentShape.id())), 1);
                app.dropMenuAddNode.style.display = 'none';
                app.dropmenuNode.style.display = 'none';
                app.dropMenuCancelLine.style.display = 'none';
                currentShape.getParent().destroy();
                stage.batchDraw();
            });

            document.getElementById('canceleLine').addEventListener('click', () => {
                dropMenuCancelLine.style.display = 'none';

                if (currentShape.getClassName() === 'Line' && linedrag === false) {
                    let LineCircles = [];
                    convaLayers[findCurLayer()].getChildren().forEach(group => {
                        group.getChildren(function (node) {
                            return node.getClassName() === 'Circle';
                        }).forEach(circle => {
                            if (circle) {
                                console.log(currentShape.points());
                                if ((currentShape.points()[0] === circle.x() && currentShape.points()[1] === circle.y()) || (currentShape.points()[2] === circle.x() && currentShape.points()[3] === circle.y())) {
                                    LineCircles.push(circle);

                                }
                            }
                        });
                    });


                    // circle.childrenCirclesID.splice(circle.childrenCirclesID.indexOf(idDel), 1);
                    console.log(LineCircles);

                    mainArr[app.findCurLayer()].childCircles.forEach(circle => {
                        if (circle.ID === LineCircles[0].id()) {
                            console.log("1");
                            circle.childrenCirclesID.forEach(id => {
                                if (id === LineCircles[1].id()) {
                                    console.log("2");
                                    console.log(circle);
                                    circle.childrenCirclesID.splice(circle.childrenCirclesID.indexOf(id), 1);
                                    console.log(circle);
                                }

                            })
                        } else if (circle.ID === LineCircles[1].id()) {
                            console.log("11");
                            circle.childrenCirclesID.forEach(id => {
                                if (id === LineCircles[0].id()) {
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
                        strokeWidth: 2 / (findCurLayer() + 1),
                        lineCap: 'round',
                        lineJoin: 'round'

                    })
                );
                convaLayers[findCurLayer()].add(lineArr[lineArr.length - 1]);

                stage.on('mousemove', function () {

                    if (linedrag) {
                        lineArr[lineArr.length - 1].moveToBottom();
                        lineArr[lineArr.length - 1].points([firstCircle.x(), firstCircle.y(), (stage.getPointerPosition().x - stage.x()) / newScaleGlobal, (stage.getPointerPosition().y - stage.y()) / newScaleGlobal]);

                        stage.batchDraw();
                    }
                    ;

                });

                stage.on('click', function (e) {

                    console.log(e.target);
                    if (firstCircle && (e.target instanceof Konva.Circle || e.target instanceof Konva.Text)) {
                        linedrag = false;
                        let Shape;
                        if (e.target.getClassName() === 'Text') {
                            Shape = e.target.getParent().getChildren(function (node) {
                                return node.getClassName() === 'Circle';
                            })[0];

                        } else {
                            Shape = e.target;
                        }

                        lineArr[lineArr.length - 1].points([firstCircle.x(), firstCircle.y(), Shape.x(), Shape.y()]);


                        lineArr[lineArr.length - 1].moveToBottom();
                        mainArr[app.findCurLayer()].childCircles.find(circle => circle.ID === firstCircle.id()).childrenCirclesID.push(Shape.id());
                        firstCircle = null;


                        stage.batchDraw();
                    }
                })


                app.dropMenuAddNode.style.display = 'none';
                app.dropmenuNode.style.display = 'none';
                app.dropMenuCancelLine.style.display = 'none';

            });

            document.getElementById('colour-button').addEventListener('click', () => {
                let colour = document.getElementById('colour').value;
                currentShape.fill(colour);
                app.dropMenuAddNode.style.display = 'none';
                app.dropmenuNode.style.display = 'none';
                app.dropMenuCancelLine.style.display = 'none';
                app.stage.batchDraw();
            })


//adding element
            document.getElementById('add-button').addEventListener('click', () => {

                let group = new Konva.Group();
                app.dropMenuAddNode.style.display = 'none';
                app.dropmenuNode.style.display = 'none';
                app.dropMenuCancelLine.style.display = 'none';

                let maxID = -1;

                mainArr[app.findCurLayer()].childCircles.forEach(function (circle) {

                        if (circle.ID > maxID) {
                            maxID = circle.ID;
                        }

                    }
                );


                let circle = new Konva.Circle({
                    id: maxID + 1,
                    x: (stage.getPointerPosition().x - stage.x()) / newScaleGlobal,
                    y: (stage.getPointerPosition().y - stage.y()) / newScaleGlobal,
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

                    mainArr[app.findCurLayer()].childCircles.push({
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
                        text: circle.id().toString(),
                        fontSize: 30,
                        fontFamily: 'Calibri',
                        fill: 'black'
                    })

                    Text.x(Text.x() - Text.width() / 2);
                    Text.y(Text.y() - Text.height() / 2);
                    group.add(Text);

                    stage.batchDraw();
                })

            })
        },

        setLeyers: function () {
            this.stage.dragBoundFunc(function (pos) {
                let ogranichenie = 300;
                var ogranich_x = [];
                var ogranich_y = [];
                console.log(mainArr[this.findCurLayer()]);
                mainArr[this.findCurLayer()].childCircles.forEach(function (circle) {
                    if (ogranich_x[0]) {
                        if (circle.posX > ogranich_x[0]) {
                            ogranich_x[0] = circle.posX;
                        }
                    } else {
                        ogranich_x[0] = circle.posX;

                    }

                    if (ogranich_x[1]) {
                        if (circle.posX < ogranich_x[1]) {
                            ogranich_x[1] = circle.posX;
                        }
                    } else {
                        ogranich_x[1] = circle.posX;

                    }


                    if (ogranich_y[0]) {
                        if (circle.posY > ogranich_y[0]) {
                            ogranich_y[0] = circle.posY;
                        }
                    } else {
                        ogranich_y[0] = circle.posY;

                    }

                    if (ogranich_y[1]) {
                        if (circle.posY < ogranich_y[1]) {
                            ogranich_y[1] = circle.posY;
                        }
                    } else {
                        ogranich_y[1] = circle.posY;

                    }

                });


                var newY;
                var newX;
                if (pos.x < (0 + ogranichenie - ogranich_x[0])) {

                    newX = (0 + ogranichenie - ogranich_x[0])
                } else if (pos.x > (width - ogranichenie - ogranich_x[1])) {


                    newX = (width - ogranichenie - ogranich_x[1]);
                } else {

                    newX = pos.x

                }

                if (pos.y < (0 + ogranichenie - ogranich_y[0])) {

                    newY = (0 + ogranichenie - ogranich_y[0])
                } else if (pos.y > (height - 100 - ogranich_y[1])) {
                    newY = (height - 100 - ogranich_y[1]);
                } else {
                    newY = pos.y
                }

                return {

                    x: newX,
                    y: newY

                };
            })
        },
        addLayersToStage: function () {
            for (let i = 0; i < mainArr.length; i++) {
                this.convaLayers[i] = new Konva.Layer();
                this.convaLayers[i].visible(false);

                this.stage.add(this.convaLayers[i]);

            }
        },
        layerVisability: function (newScale) {
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

                        if (mainArr[currentVisibleLayer].childCircles.find(circle => circle.childNextID === parent.ID)) {
                            child = mainArr[currentVisibleLayer].childCircles.find(circle => circle.childNextID === parent.ID).ID;
                        } else {
                            child = null;
                        }

                    }
                });

                stage.scale({x: 3, y: 3})
                newScaleGlobal = 3;
                if (child !== null) {
                    stage.x(((stage.getPointerPosition().x - mainArr[currentVisibleLayer].childCircles.find(circle => circle.ID === child).posX * 3)));
                    stage.y(((stage.getPointerPosition().y - mainArr[currentVisibleLayer].childCircles.find(circle => circle.ID === child).posY * 3)));
                }
            }

            document.getElementById('currentLayer').innerText = "Layer" + (this.findCurLayer() + 1);


        },
        findCurLayer: function () {
            let trueLayer;
            app.convaLayers.forEach(function (layer, index) {
                if (layer.visible() == true) {

                    trueLayer = index;
                }

            })
            return trueLayer;
        },
    };


    app.init(mainArr);
// let layres_c= document.getElementById('layres-count');
//     console.log(layres_c);


};