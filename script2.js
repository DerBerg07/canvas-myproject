'use strict';
let qqq =123;
let app = {
    container: '',
    currentVisibleLayer: 0,
    stage: '',
    convaLayers: [],
    newScaleGlobal: 1,
    layerCount: 0,
    scaleBy: 0.6,
    currentShape: '',
    dropmenuNode: document.getElementById('menu'),
    dropMenuAddNode: document.getElementById('menu-add'),
    dropMenuCancelLine: document.getElementById('menu-cancel'),
    linedrag: false,
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
        this.convaLayers[0].visible(true);
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

            app.newScaleGlobal = newScale;
            app.newPosGlobal = newPos;
            this.layerVisability(newScale);

        });
        this.stage.on('click', e => {
            app.dropMenuAddNode.style.display = 'none';
            app.dropmenuNode.style.display = 'none';
            app.dropMenuCancelLine.style.display = 'none';
        });
        this.stage.on('contextmenu', function (e) {

            e.evt.preventDefault();

            if (app.linedrag === true) {
                app.dropMenuCancelLine.style.display = 'initial';
                var containerRect = app.stage.container().getBoundingClientRect();
                app.dropMenuCancelLine.style.top = containerRect.top + app.stage.getPointerPosition().y + 4 + 'px';
                app.dropMenuCancelLine.style.left = containerRect.left + app.stage.getPointerPosition().x + 4 + 'px';
                return;
            }


            // prevent default behavior

            if (e.target === app.stage && app.linedrag === false) {
                // if we are on empty place of the stage we will do nothing
                app.dropMenuAddNode.style.display = 'initial';
                var containerRect = app.stage.container().getBoundingClientRect();
                app.dropMenuAddNode.style.top = containerRect.top + app.stage.getPointerPosition().y + 4 + 'px';
                app.dropMenuAddNode.style.left = containerRect.left + app.stage.getPointerPosition().x + 4 + 'px';

                return;
            }


            if (e.target.getClassName() === 'Text' || e.target.getClassName() === 'Circle') {
                app.currentShape = e.target.getParent().getChildren(function (node) {
                    return node.getClassName() === 'Circle';
                })[0];

            } else {

                app.currentShape = e.target;
                app.dropMenuCancelLine.style.display = 'initial';
                var containerRect = app.stage.container().getBoundingClientRect();
                app.dropMenuCancelLine.style.top = containerRect.top + app.stage.getPointerPosition().y + 4 + 'px';
                app.dropMenuCancelLine.style.left = containerRect.left + app.stage.getPointerPosition().x + 4 + 'px';
                return;
            }


            // show menu
            app.dropmenuNode.style.display = 'initial';
            var containerRect = app.stage.container().getBoundingClientRect();
            app.dropmenuNode.style.top = containerRect.top + app.stage.getPointerPosition().y + 4 + 'px';
            app.dropmenuNode.style.left = containerRect.left + app.stage.getPointerPosition().x + 4 + 'px';
        });


        document.getElementById('add-layer').addEventListener('click', () => {

            app.convaLayers.push(new Konva.Layer);
            mainArr.push({childCircles: []});
            app.stage.add(app.convaLayers[(mainArr.length - 1)]);

            console.log(app.convaLayers.length);
            document.getElementById('layres-count').innerText = 'Layers Count - ' + app.convaLayers.length;

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
                    app.stage.width(width);
                    app.stage.height(height);
                } else {
                    width = document.getElementById("container").offsetWidth;
                    height = document.getElementById("container").offsetHeight;
                    app.stage.width(width);
                    app.stage.height(height);
                }
            });
        });


        document.getElementById('add-full-window').addEventListener('click', () => {

            console.log(document.getElementById('container').style.getPropertyValue('position'));
            let container = document.getElementById('container');
            container.classList.toggle('fullscreen');

        });


        document.getElementById('connect').addEventListener('click', () => {
            if (mainArr[app.findCurLayer() + 1].childCircles[Number(document.getElementById('connect_id').value)]) {
                mainArr[app.findCurLayer()].childCircles[this.currentShape.id()].childNextID = Number(document.getElementById('connect_id').value);
                alert("connected");
            }

        });
        document.getElementById('delete-button').addEventListener('click', () => {

            if (app.currentShape.getClassName() === 'Circle') {


                let curLayet = this.currentShape.getLayer();


                let lines = curLayet.getChildren(function (node) {

                    return node.getClassName() === 'Line';
                });

                lines.forEach(function (line) {


                    if ((line.points()[0] === app.currentShape.getX()) || (line.points()[2] === app.currentShape.getX())) {
                        if ((line.points()[1] === app.currentShape.getY()) || (line.points()[3] === app.currentShape.getY())) {
                            line.destroy();
                        }
                    }

                })

            }


            mainArr[app.findCurLayer()].childCircles.splice(mainArr[app.findCurLayer()].childCircles.indexOf(mainArr[app.findCurLayer()].childCircles.find(circle => circle.ID === this.currentShape.id())), 1);
            app.dropMenuAddNode.style.display = 'none';
            app.dropmenuNode.style.display = 'none';
            app.dropMenuCancelLine.style.display = 'none';
            this.currentShape.getParent().destroy();
            app.stage.batchDraw();
        });

        document.getElementById('canceleLine').addEventListener('click', () => {
            app.dropMenuCancelLine.style.display = 'none';

            if (this.currentShape.getClassName() === 'Line' && this.linedrag === false) {
                let LineCircles = [];
                app.convaLayers[app.findCurLayer()].getChildren().forEach(group => {
                    group.getChildren(function (node) {
                        return node.getClassName() === 'Circle';
                    }).forEach(circle => {
                        if (circle) {
                            console.log(app.currentShape.points());
                            if ((app.currentShape.points()[0] === circle.x() && app.currentShape.points()[1] === circle.y()) || (app.currentShape.points()[2] === circle.x() && app.currentShape.points()[3] === circle.y())) {
                                LineCircles.push(circle);

                            }
                        }
                    });
                });




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
                app.currentShape.remove();
                app.stage.batchDraw();
                return;

            }


            app.lineArr[app.lineArr.length - 1].remove();
            app.lineArr.splice([app.lineArr.length - 1], 1);
            app.linedrag = false;
            app.firstCircle = null;
            app.stage.batchDraw();

        })

        document.getElementById('line-button').addEventListener('click', () => {

            app.linedrag = true;

            app.firstCircle = this.currentShape;

            app.lineArr.push(
                new Konva.Line({
                    stroke: "red",
                    strokeWidth: 2 / (app.findCurLayer() + 1),
                    lineCap: 'round',
                    lineJoin: 'round'

                })
            );
            app.convaLayers[app.findCurLayer()].add(app.lineArr[app.lineArr.length - 1]);

            app.stage.on('mousemove', function () {

                if (app.linedrag) {
                    app.lineArr[app.lineArr.length - 1].moveToBottom();
                    app.lineArr[app.lineArr.length - 1].points([app.firstCircle.x(), app.firstCircle.y(), (app.stage.getPointerPosition().x - app.stage.x()) / app.newScaleGlobal, (app.stage.getPointerPosition().y - app.stage.y()) / app.newScaleGlobal]);

                    app.stage.batchDraw();
                }
                ;

            });

            app.stage.on('click', function (e) {


                if (app.firstCircle && (e.target instanceof Konva.Circle || e.target instanceof Konva.Text)) {
                    app.linedrag = false;
                    let Shape;
                    if (e.target.getClassName() === 'Text') {
                        Shape = e.target.getParent().getChildren(function (node) {
                            return node.getClassName() === 'Circle';
                        })[0];

                    } else {
                        Shape = e.target;
                    }

                    app.lineArr[app.lineArr.length - 1].points([app.firstCircle.x(), app.firstCircle.y(), Shape.x(), Shape.y()]);


                    app.lineArr[app.lineArr.length - 1].moveToBottom();
                    mainArr[app.findCurLayer()].childCircles.find(circle => circle.ID === app.firstCircle.id()).childrenCirclesID.push(Shape.id());
                    app.firstCircle = null;


                    app.stage.batchDraw();
                }
            })


            app.dropMenuAddNode.style.display = 'none';
            app.dropmenuNode.style.display = 'none';
            app.dropMenuCancelLine.style.display = 'none';

        });

        document.getElementById('colour-button').addEventListener('click', () => {
            let colour = document.getElementById('colour').value;
            app.currentShape.fill(colour);
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
                x: (this.stage.getPointerPosition().x - this.stage.x()) / app.newScaleGlobal,
                y: (this.stage.getPointerPosition().y - this.stage.y()) / app.newScaleGlobal,
                radius: 20,
                fill: '#929229'
            });


            app.convaLayers.forEach(function (layer, index) {
                if (layer.visible() === true) {


                    group.add(circle);
                    layer.add(group);

                }

            });


            this.currentShape = circle;
            circle.startDrag();


            circle.on('dragend', function (e) {

                mainArr[app.findCurLayer()].childCircles.push({
                    ID: maxID + 1,
                    posX: circle.x(),
                    posY: circle.y(),
                    layer: app.findCurLayer(),
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

                app.stage.batchDraw();
            })

        })
    },

    setLeyers: function () {
        this.stage.dragBoundFunc(function (pos) {
            let ogranichenie = 300;
            var ogranich_x = [];
            var ogranich_y = [];
            mainArr[app.findCurLayer()].childCircles.forEach(function (circle) {
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
            if (pos.x < (ogranichenie - ogranich_x[0])) {

                newX = (ogranichenie - ogranich_x[0])
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



            this.convaLayers[this.currentVisibleLayer].visible(false);
            this.currentVisibleLayer++;
            this.convaLayers[this.currentVisibleLayer].visible(true);


            let distance = this.stage.width();

            mainArr[this.currentVisibleLayer - 1].childCircles.forEach(function (circle) {
                console.log(app.newScaleGlobal);
                if ((Math.abs((app.stage.getPointerPosition().y - app.stage.y()) / app.newScaleGlobal - circle.posY) + Math.abs((app.stage.getPointerPosition().x - app.stage.x()) / app.newScaleGlobal - circle.posX)) < distance) {
                    distance = Math.abs((app.stage.getPointerPosition().y - app.stage.y()) / app.newScaleGlobal - circle.posY) + Math.abs((app.stage.getPointerPosition().x - app.stage.x()) / app.newScaleGlobal - circle.posX);
                    parent = circle;
                    child = circle.childNextID;
                    console.log(child);
                }
            });



            if (child || child === 0){
                console.log(app.currentVisibleLayer + " Layer");
                console.log(mainArr[app.currentVisibleLayer].childCircles.find(circle => circle.ID == child) + " circle");
                console.log(child);
                console.log("going");
                this.stage.x((this.stage.getPointerPosition().x - mainArr[this.currentVisibleLayer].childCircles.find(circle => circle.ID === child).posX));
                this.stage.y((this.stage.getPointerPosition().y - mainArr[this.currentVisibleLayer].childCircles.find(circle => circle.ID === child).posY));

            }else {
                this.stage.x(0);
                this.stage.y(0);

            }

            child = null;
            this.stage.scale({x: 1, y: 1});
            this.newScaleGlobal = 1;

        }

        if (newScale < 1) {

            app.convaLayers[app.currentVisibleLayer].visible(false);
            app.currentVisibleLayer--;


            let distance = app.stage.width();

            mainArr[app.currentVisibleLayer + 1].childCircles.forEach(function (circle) {
                console.log(circle);

                if ((Math.abs((app.stage.getPointerPosition().y - app.stage.y()) / app.newScaleGlobal - circle.posY) + Math.abs((app.stage.getPointerPosition().x - app.stage.x()) / app.newScaleGlobal - circle.posX)) < distance) {
                    distance = Math.abs((app.stage.getPointerPosition().y - app.stage.y()) / app.newScaleGlobal - circle.posY) + Math.abs((app. stage.getPointerPosition().x - app.stage.x()) / app.newScaleGlobal - circle.posX);
                    parent = circle;

                    if (mainArr[app.currentVisibleLayer].childCircles.find(circle => circle.childNextID === parent.ID)) {
                        child = mainArr[app.currentVisibleLayer].childCircles.find(circle => circle.childNextID === parent.ID).ID;
                    } else {
                        child = null;
                    }

                }
            });


            if (child || child === 0) {
                this.stage.x(((this.stage.getPointerPosition().x - mainArr[this.currentVisibleLayer].childCircles.find(circle => circle.ID === child).posX * 3)));
                this.stage.y(((this.stage.getPointerPosition().y - mainArr[this .currentVisibleLayer].childCircles.find(circle => circle.ID === child).posY * 3)));
            }else {
                this.stage.x(0);
                this.stage.y(0);

            }
            child = null;

            this.stage.scale({x: 3, y: 3})
            this.newScaleGlobal = 3;
            app.convaLayers[app.currentVisibleLayer].visible(true);
        }

        document.getElementById('currentLayer').innerText = "Layer" + (this.findCurLayer() + 1);


    },
    findCurLayer: function () {
        let trueLayer;
        app.convaLayers.forEach(function (layer, index) {
            if (layer.visible() == true) {

                trueLayer = index;
            }

        });
        return trueLayer;
    },
};
$( document ).ready(function() {
// let qqq =123;



    app.init(mainArr);
// let layres_c= document.getElementById('layres-count');
//     console.log(layres_c);


});