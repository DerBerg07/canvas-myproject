class CElement {
    constructor(props) {
        this.props = props;
        this.elementObject;
        this.Text;
        this.Shape;

        this.drawElement();
    }

    drawElement(){
        this.elementObject = new PIXI.Container();

        this.addShape();
        this.addText();
    }

    addText(){
        this.Text = new PIXI.Text(this.props.name, TextStyle);
        console.log(this.props.name);
        console.log(this.Text.height);

    };

    addShape(){
        this.Shape = new PIXI.Graphics();

    }

}