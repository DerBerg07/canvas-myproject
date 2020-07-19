class CApp {
    constructor(app) {
        this.app = app;
        this.loadedData = LOADER.resources.data.data;
        this.currentLayer = 0;
        this.layers = [];
        this.controller = new CController(this.app, this.layers, this.currentLayer);

        this.drawController();
        this.createLayers();
    }


    createLayers(){
        for(let id in this.loadedData.layer){
            this.layers.push(new CLayer({
                id: id,
                elements: this.loadedData.layer[id]
            }))
        };


        this.drawLayer();
    }

    drawController(){
        this.app.stage.addChild(this.controller.Controller_container);
    }

    drawLayer(){
        this.app.stage.addChild(this.layers[0].Layer);
    }




}