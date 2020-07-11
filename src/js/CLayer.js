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
        });

        console.log(this.elements);
        this.drawElements();

    }

    drawElements(){
        this.elements.forEach((element)=>{
            this.Layer.addChild(element.elementObject);
        });

    }

}