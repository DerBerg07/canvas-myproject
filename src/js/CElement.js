class CElement {
    constructor(props) {
        this.props = props;
        this.elementObject;
        this.Text = this.addText();
        this.Shape = this.addShape();
        this.drawElement();
    }

    drawElement(){
        this.elementObject = new PIXI.Container();
        this.elementObject.addChild(this.Shape, this.Text);
        this.setPosition(100,    this.props.id * 100)
    }

    addText(){
        let Text = new PIXI.Text(this.props.name, TextStyle);
        Text.anchor.set(0, 0.5);
        return Text;
    };

    setTextPosition(height, logoWidth){
        this.Text.y  = height/2;
        this.Text.x  = logoWidth + 20;
    }

    addShape(){
        let height = this.Text.height + 50;
        let logoShapeWidth = 50;
        let width = this.Text.width  + logoShapeWidth +30;

        let Shape = new PIXI.Graphics();



        Shape.beginFill(0xffffff);
        Shape.bezierCurveTo(0, 0,  -30, height/2,  0, height);
        Shape.lineTo(width, height);
        Shape.bezierCurveTo(width, height,  width + 30, height/2,  width, 0);
        Shape.endFill();

        Shape.beginFill(0x99ffff);
        Shape.bezierCurveTo(0, 0,  -30, height/2,  0, height);
        Shape.lineTo(logoShapeWidth, height);
        Shape.bezierCurveTo(logoShapeWidth, height,  logoShapeWidth + 30, height/2,  logoShapeWidth, 0);
        Shape.endFill();



        this.setTextPosition(height, logoShapeWidth);
        return Shape

    }

    setPosition(x,y){
        this.elementObject.x = x;
        this.elementObject.y = y;
    }

}