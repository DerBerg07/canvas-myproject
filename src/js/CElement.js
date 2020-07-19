class CElement {
    constructor(props) {
        this.props = props;
        this.elementObject;
        this.Logo = this.addLogo();
        this.Text = this.addText();
        this.Shape = this.addShape();

        this.drawElement();
    }


    drawElement(){
        this.elementObject = new PIXI.Container();
        this.elementObject.addChild(this.Shape, this.Text, this.Logo);
        this.setPosition(100,    this.props.id * 100)
    }

    addText(){
        let Text = new PIXI.Text(this.props.name, TextStyle);
        Text.anchor.set(0, 0.5);
        return Text;
    };



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
        this.setIconPosition(height, logoShapeWidth);
        return Shape

    }

    addLogo(){
        let icon =  new PIXI.Sprite.from(LOADER.resources.icon_translation.texture);
        icon.height = 45;
        icon.width = 45;
        icon.anchor.set(0.5);

        return icon;

    }


    setIconPosition(height, logoWidth){
        this.Logo.y  = height/2;
        this.Logo.x  = logoWidth/2;
    }

    setTextPosition(height, logoWidth){
        this.Text.y  = height/2;
        this.Text.x  = logoWidth + 20;
    }

    setPosition(x,y){
        this.elementObject.x = x;
        this.elementObject.y = y;
    }

}