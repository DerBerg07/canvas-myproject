let LOADER = new PIXI.Loader();

window.onload = ()=>{
    const container = document.getElementById("app");
    const  app = new PIXI.Application({
        width: container.clientWidth,
        height: container.clientHeight,
        backgroundColor: 0xFFD47F
    });

    container.appendChild(app.view);
    const loader = LOADER;

    loader.add("data", "data/data.json").add("icon_translation","sprite/translation.png");
    loader.load();
    loader.onComplete.add(() => {
        const application = new CApp(app);
    });

    app.stage.hitArea = new PIXI.Rectangle(0,0, container.clientWidth, container.clientHeight);

    let layer = new PIXI.Container();
    app.stage.interactive = true;



    app.stage.addChild(layer);


    //
    // app.stage
    //     .on('mousedown', onDragStart)
    //     .on('touchstart', onDragStart)
    //     .on('mouseup', onDragEnd)
    //     .on('mouseupoutside', onDragEnd)
    //     .on('touchend', onDragEnd)
    //     .on('touchendoutside', onDragEnd)
    //     .on('mousemove', onDragMove)
    //     .on('touchmove', onDragMove);
    //
    //
    //
    // function  onDragStart(event){
    //     layer.data = event.data;
    //     layer.touchPos= {x:event.data.global.x - layer.x, y:event.data.global.y - layer.y};
    //     layer.dragging = true;
    //     console.log(layer.touchPos);
    // }
    // function  onDragEnd(event){
    //   layer.data = null;
    //     layer.dragging = false;
    //     layer.touchPos = null;
    // }
    // function  onDragMove(event){
    //     if(layer.dragging){
    //
    //         let newPos = event.data.global;
    //         console.log(newPos.x);
    //         console.log(layer.touchPos.x);
    //         console.log(newPos.x - layer.touchPos.x);
    //         layer.x = newPos.x - layer.touchPos.x ;
    //         layer.y = newPos.y - layer.touchPos.y;
    //     }
    //
    // }
};

