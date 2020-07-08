class CApp {
    constructor(app) {
        this.app = app;
        this.loadedData = this.app.loader.resources.data.data;
        this.currentLayer = 1;
        this.layers = [];

        this.createLayers();
    }


    createLayers(){
        for(let id in this.loadedData.layer){
            this.layers.push(new CLayer({
                id: id,
                elements: this.loadedData.layer[id]
            }))
        };
    }




}