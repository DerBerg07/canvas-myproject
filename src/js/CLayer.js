class CLayer {
    constructor(props) {
        this.id  = props.id;
        this.elementsData = props.elements;
        this.elements  = [];
        this.Layer = new PIXI.Container();


        this.createElements();

    };


    createElements(){
        this.elementsData.forEach((element) => {
            this.elements.push(new CElement(element));
        })


    }

    drawElements(){
        this.elements.forEach((element)=>{
            this.Layer.addChild(element.elementObject)
        });

    }

}