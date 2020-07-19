class CController {
    constructor(app, layers, curLayer) {
        this.app = app;

        this.Controller_container = new PIXI.Container();
        this.Controller_container.interactive = true;

        this.hitArea = this.createHitArea();

        this.layers = layers;
        console.log(this.currentLayer = curLayer);;

        this.startDragPoint;
        this.startLayerPoint;
        this.Dragging = false;

        this.init();
    }

    init(){
    this.addHitArea();
    this.addDragEvents();
    }

    createHitArea(){
        return new PIXI.Rectangle(0,0, this.app.view.width, this.app.view.height);
    }

    addHitArea(){
        console.log(this.hitArea);
        this.Controller_container.hitArea = this.hitArea;
    }

    addDragEvents(){
        this.Controller_container.on('mousedown', (e)=>{
            this.Dragging = true;
            this.startDragPoint =  Object.assign({},e.data.global);
            this.startLayerPoint = {
                x:this.layers[this.currentLayer].Layer.position.x,
                y:this.layers[this.currentLayer].Layer.position.y,
            };


        });

        this.Controller_container.on('mousemove', (e)=>{
            if(this.Dragging){
                console.log(this.startLayerPoint);
                this.layers[this.currentLayer].Layer.x = this.startLayerPoint.x + (e.data.global.x - this.startDragPoint.x);
                this.layers[this.currentLayer].Layer.y = this.startLayerPoint.y + (e.data.global.y - this.startDragPoint.y);
            }
        });

        this.Controller_container.on('mouseup', ()=>{
            this.Dragging = false;
        });

        this.Controller_container.on('mouseover', ()=>{
            this.Dragging = false;
        });


    }



}