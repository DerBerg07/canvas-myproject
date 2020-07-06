window.onload = ()=>{
    const container = document.getElementById("app");
    const  app = new PIXI.Application({
        width: container.clientWidth,
        height: container.clientHeight,
        backgroundColor: 0xFFD47F
    });

    container.appendChild(app.view);

    const loader = app.loader;

    loader.add("data", "data/data.json");
    loader.load();
    loader.onComplete.add(() => {
    });

    app.stage.hitArea = new PIXI.Rectangle(0,0, container.clientWidth, container.clientHeight);

    let layer = new PIXI.Container();
    app.stage.interactive = true;
    const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
    });

    for(let i = 0; i < 3000; i++){
        let cont = new PIXI.Container();
        let graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF);
        graphics.drawRect(0, 0, 100, 100);
        graphics.endFill();
        graphics.beginFill(0xFF9999);
        graphics.drawRect(0, 0, 30, 30);
        graphics.endFill();

        const richText = new PIXI.Text('Rich', style);

        cont.addChild(graphics, richText);
        cont.x = Math.random()*20000;
        cont.y = Math.random()*20000;

        layer.addChild(cont);
    }

    app.stage.addChild(layer);



    app.stage
        .on('mousedown', onDragStart)
        .on('touchstart', onDragStart)
        .on('mouseup', onDragEnd)
        .on('mouseupoutside', onDragEnd)
        .on('touchend', onDragEnd)
        .on('touchendoutside', onDragEnd)
        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove);



    function  onDragStart(event){
        layer.data = event.data;
        layer.touchPos= {x:event.data.global.x - layer.x, y:event.data.global.y - layer.y};
        layer.dragging = true;
        console.log(layer.touchPos);
    }
    function  onDragEnd(event){
      layer.data = null;
        layer.dragging = false;
        layer.touchPos = null;
    }
    function  onDragMove(event){
        if(layer.dragging){

            let newPos = event.data.global;
            console.log(newPos.x);
            console.log(layer.touchPos.x);
            console.log(newPos.x - layer.touchPos.x);
            layer.x = newPos.x - layer.touchPos.x ;
            layer.y = newPos.y - layer.touchPos.y;
        }

    }
};