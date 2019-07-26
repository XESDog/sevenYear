let {Application, Graphics} = PIXI;
let {Point, Vector2, Matrix} = sevenYear;

function createApp() {
    let app = new Application({width: 800, height: 600, autoDensity: true, resolution: 2});
    let bg = drawRect(0, 0, 800, 600, null, 0x333333);
    app.stage.addChild(bg);
    app.stage.interactive = true;
    return app;
}

function createStageEvent(stage, callback) {
    let sp = null;
    let target = null;
    let mt = new Matrix();
    let original = null;//原始数据

    stage.on('pointerdown', (e) => {
        sp = e.data.global.clone();
        target = e.target;

        if (Object.entries(view).find(v => target === v[1])) {
            if (target.interactive) {
                stage.on('pointermove', cb);
                original = cloneObj(target.data);
            }
        }
    });
    stage.on('pointerup', (e) => {
        stage.off('pointermove', cb);
    });

    function cb(e) {
        let mp = e.data.global;
        mt.identity();
        mt.translate(mp.x - sp.x, mp.y - sp.y);
        if (target) {
            let p = null;
            let data = target.data;

            switch (data.type) {
                case 'point':
                    p = mt.apply(original);
                    data.x = p.x;
                    data.y = p.y;
                    break;
                case 'polygon':
                    let i = 0;
                    while (i < original.points.length) {
                        p = mt.apply({x: original.points[i], y: original.points[i + 1]});
                        data.points[i] = p.x;
                        data.points[i + 1] = p.y;
                        i += 2;
                    }
                    break;
            }

            if (callback) callback();
        }
    }
}

function draw(stage, data) {
    let element = null;
    let view = {}
    for (let key in data) {
        element = data[key];
        switch (element.type) {
            case 'point':
                view[key] = drawCircle(element);
                break;
            case 'polygon':
                view[key] = drawPolygon(element.points)
                break;
        }
        view[key].data = element;//数据挂载到显示对象上面
        stage.addChild(view[key]);
    }
    return view;
}

function drawRect(x, y, w, h, context = null, fillColor = 0xffffff, interactive = true) {
    if (!context) context = new Graphics();
    context.beginFill(fillColor);
    context.drawRect(x, y, w, h);
    context.endFill();

    context.interactive = interactive;

    return context;
}

function drawPolygon(points, context = null, fillColor = POLYGON_FILL_COLOR, interactive = true) {
    if (!context) context = new Graphics();
    context.clear();
    context.lineStyle(1, POLYGON_STROKE_COLOR, 1);
    context.beginFill(fillColor)
    context.moveTo(points[0], points[1]);
    let i = 2;
    while (i < points.length) {
        context.lineTo(points[i], points[i + 1])
        i = i + 2;
    }
    context.lineTo(points[0], points[1])
    context.endFill();
    context.cursor = 'pointer';
    context.interactive = interactive;

    return context;
}

function drawCircle(p, context = null, interactive = true) {
    if (!context) context = new Graphics();
    context.clear();
    context.lineStyle(1, POINT_STROKE_COLOR, 1);
    context.beginFill(POINT_FILL_COLOR, 0.2);
    context.drawCircle(p.x, p.y, 8);
    context.endFill();

    context.moveTo(p.x, p.y);
    context.lineTo(p.x+8, p.y);

    context.cursor = interactive ? 'pointer' : "";
    context.interactive = interactive;

    return context;
}

function drawLine(p1, p2, context = null) {
    if (!context) context = new Graphics();
    context.clear();
    context.lineStyle(1, LINE_STROKE_COLOR, 1);
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);

    return context;
}

function cloneObj(obj) {
    let str;
    let newObj = obj.constructor === Array ? [] : {};
    if (typeof obj !== 'object') {
        return;
    } else if (window.JSON) {
        str = JSON.stringify(obj);
        newObj = JSON.parse(str);
    } else {
        for (let i in obj) {
            newObj[i] = typeof obj[i] === 'object' ?
                cloneObj(obj[i]) : obj[i];
        }
    }
    return newObj;
}