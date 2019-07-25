//搭建舞台
var app = new PIXI.Application({
    width: 750,
    height: 1440,
    backgroundColor:0xffbd3e
});
$('#app').append(app.view);

//资源加载
app.loader
.add([
    {name:'zkkl',url:'./fonts/zkkl.ttf'},
    {name:'p1_01',url:'./images/p1_01.png'},
    {name:'p1_02',url:'./images/p1_02.png'},
    {name:'p1_03',url:'./images/p1_03.png'},
    {name:'p1_04',url:'./images/p1_04.png'},
    {name:'p2_01',url:'./images/p2_01.png'},
    {name:'p2_02',url:'./images/p2_02.png'},
    {name:'p2_03',url:'./images/p2_03.png'},
    {name:'p3_01',url:'./images/p3_01.png'},
    {name:'p3_02',url:'./images/p3_02.png'},
    {name:'p3_03',url:'./images/p3_03.png'},
    {name:'p3_04',url:'./images/p3_04.png'},
    {name:'p3_black_car',url:'./images/p3_black_car.png'},
    {name:'p3_red_car',url:'./images/p3_red_car.png'},
    {name:'p3_white_car',url:'./images/p3_white_car.png'},
    {name:'p3_yellow_car',url:'./images/p3_yellow_car.png'},
    {name:'p4_01',url:'./images/p4_01.png'},
    {name:'p4_02',url:'./images/p4_02.png'},
    {name:'p4_03',url:'./images/p4_03.png'},
    {name:'p4_barrier_1',url:'./images/p4_barrier_1.png'},
    {name:'p4_barrier_2',url:'./images/p4_barrier_2.png'},
    {name:'p4_barrier_3',url:'./images/p4_barrier_3.png'},
    {name:'p4_barrier_4',url:'./images/p4_barrier_4.png'},
    {name:'p4_black_car',url:'./images/p4_black_car.png'},
    {name:'p4_red_car',url:'./images/p4_red_car.png'},
    {name:'p4_white_car',url:'./images/p4_white_car.png'},
    {name:'p4_yellow_car',url:'./images/p4_yellow_car.png'},
    {name:'p4_lane',url:'./images/p4_lane.png'},
    {name:'p4_left_btn',url:'./images/p4_left_btn.png'},
    {name:'p4_right_btn',url:'./images/p4_right_btn.png'},
])
.load(setup)
.on('progress',(loader, res)=>{
    var progress = parseInt(loader.progress);
    // console.log(progress);
    //百分比加载
    p1_load_text.text = progress+'%';
    p1_load_text.position.set((app.view.width-p1_load_text.width)/2, 168);
    //加载完成时显示开始游戏按钮
    if(progress>=100){
        p1_02.visible = true;
    }
});


var global={
    winWidth: $(window).width(), //屏幕宽
    winHeight: $(window).height(), //屏幕高
    activeCar: 1, //1：黄色汽车, 2：白色汽车, 3：红色汽车, 4：黑色汽车
    play: true,//控制游戏进度开关
    laneSpeed: 1,//赛道速度
}

/**** p1页 start ****/
var p1 = new PIXI.Container();
p1.visible = false;
p1.width = 750;
p1.height = 1160;
p1.position.set(0, (app.view.height-p1._height)/2);

//标题
var p1_01 = new PIXI.Sprite.from('./images/p1_01.png');
p1_01.position.set((p1._width-473)/2, 0);
//加载文字
var p1_load_text = new PIXI.Text('0%',{
    fontFamily: 'zkkl',
    fontSize: 36,
    fill: 0xffffff
});
p1_load_text.position.set((app.view.width-p1_load_text.width)/2, 168);

//开始按钮
var p1_02 = new PIXI.Sprite.from('./images/p1_02.png');
p1_02.interactive = true;
p1_02.position.set((app.view.width-244)/2, p1._height-100);
p1_02.visible = false;
p1_02.on('tap', function(ev){
    p1.visible = false;
});

//赛道图
var p1_03 = new PIXI.Sprite.from('./images/p1_03.png');
p1_03.position.set(0, 220);

//赛道汽车图
var p1_04 = new PIXI.Sprite.from('./images/p1_04.png');
p1_04.position.set(0, 450);

//内容添加到页面中
p1.addChild(p1_01, p1_02, p1_03, p1_04, p1_load_text);
app.stage.addChild(p1);
/**** p1页 end ****/


//逻辑执行函数
function setup(loader, res){
    /**** p2页 start ****/
    var p2 = new PIXI.Container();
    p2.visible = false;
    p2.width = 750;
    p2.height = 1160;
    p2.position.set(0, (app.view.height-p2._height)/2);

    //规则标题
    var p2_01 = new PIXI.Sprite.from(res.p2_01.texture);
    p2_01.position.set((app.view.width-p2_01.width)/2, 30);

    //规则内容
    var p2_02 = new PIXI.Sprite.from(res.p2_02.texture);
    p2_02.position.set((app.view.width-p2_02.width)/2, 120);

    //【我知道了】按钮
    var p2_03 = new PIXI.Sprite.from(res.p2_03.texture);
    p2_03.interactive = true;
    p2_03.position.set((app.view.width-p2_03.width)/2, p2._height-100);
    p2_03.on('tap', function(){
        p2.visible = false;
    });
    
    //内容添加到页面中
    p2.addChild(p2_01, p2_02, p2_03);
    app.stage.addChild(p2);
    /**** p2页 end ****/


    /**** p3页 start ****/
    var p3 = new PIXI.Container();
    p3.visible = false;
    p3.width = 750;
    p3.height = 1160;
    p3.position.set(0, (app.view.height-p3._height)/2);

    //选择标题
    var p3_01 = new PIXI.Sprite.from(res.p3_01.texture);
    p3_01.position.set((app.view.width-p3_01.width)/2, 40);

    //汽车组
    var p3_car_group = new PIXI.Container();
    p3_car_group.width=p3_car_group.height=750;
    p3_car_group.position.set(0,(p3._height-p3_car_group._height)/2);

    //选择汽车标志
    var p3_02 = new PIXI.Sprite.from(res.p3_02.texture);
    var p302PositionArr=[
        {x:210,y:20},
        {x:495,y:20},
        {x:210,y:380},
        {x:495,y:380},
    ];
    p3_02.position.set(p302PositionArr[0].x, p302PositionArr[0].y);

    var p3CarPositionArr=[
        {x:155,y:82},
        {x:440,y:82},
        {x:155,y:440},
        {x:440,y:440},
    ];
    //黄色汽车
    var p3_yellow_car = new PIXI.Sprite.from(res.p3_yellow_car.texture);
    p3_yellow_car.position.set(p3CarPositionArr[0].x, p3CarPositionArr[0].y);
    p3_yellow_car.interactive = true;
    p3_yellow_car.on('tap', function(){
        console.log('yc');
        p3_02.position.set(p302PositionArr[0].x, p302PositionArr[0].y);
        global.activeCar = 1;
    }); 
    //白色汽车
    var p3_white_car = new PIXI.Sprite.from(res.p3_white_car.texture);
    p3_white_car.position.set(p3CarPositionArr[1].x, p3CarPositionArr[1].y);
    p3_white_car.interactive = true;
    p3_white_car.on('tap', function(){
        console.log('wc');
        p3_02.position.set(p302PositionArr[1].x, p302PositionArr[1].y);
        global.activeCar = 2;
    }); 
    //红色汽车
    var p3_red_car = new PIXI.Sprite.from(res.p3_red_car.texture);
    p3_red_car.position.set(p3CarPositionArr[2].x, p3CarPositionArr[2].y);
    p3_red_car.interactive = true;
    p3_red_car.on('tap', function(){
        console.log('rc');
        p3_02.position.set(p302PositionArr[2].x, p302PositionArr[2].y);
        global.activeCar = 3;
    }); 
    //黑色汽车
    var p3_black_car = new PIXI.Sprite.from(res.p3_black_car.texture);
    p3_black_car.position.set(p3CarPositionArr[3].x, p3CarPositionArr[3].y);
    p3_black_car.interactive = true;
    p3_black_car.on('tap', function(){
        console.log('bc');
        p3_02.position.set(p302PositionArr[3].x, p302PositionArr[3].y);
        global.activeCar = 4;
    }); 
    
    p3_car_group.addChild(p3_yellow_car, p3_white_car, p3_red_car, p3_black_car, p3_02);

    //【确定汽车】按钮
    var p3_04 = new PIXI.Sprite.from(res.p3_04.texture);
    p3_04.interactive = true;
    p3_04.position.set((app.view.width-p3_04.width)/2, p3._height-100);
    p3_04.on('tap', function(){
        p3.visible = false;
        console.log(global);
    });

    //内容添加到页面中
    p3.addChild(p3_01, p3_car_group, p3_04);
    app.stage.addChild(p3);
    /**** p3页 end ****/


    /**** p4页 start ****/
    var p4 = new PIXI.Container();
    // p4.visible = false;
    p4.width = 750;
    p4.height = global.winHeight;
    //顶部内容
    var p4TopGroup = new PIXI.Container();
    p4TopGroup.width = 750;
    p4TopGroup.height = 100;

    //背景
    var p4_01 = new PIXI.Sprite.from(res.p4_01.texture);

    //血条
    var p4_t_blood_text = new PIXI.Text('生命值',{
        fontFamily:'zkkl',
        fontSize: 30,
    });
    p4_t_blood_text.position.set(30, 33);
    var p4BloodGroup = new PIXI.Container();
    p4BloodGroup.position.set(137, 33);
    var p4_t_blood_b = new PIXI.Sprite(res.p4_03.texture);
    p4_t_blood_b.position.set(0, 0);
    var p4_t_blood_t = new PIXI.Sprite(res.p4_02.texture);
    p4_t_blood_t.position.set(0, 0);
    p4BloodGroup.addChild(p4_t_blood_b, p4_t_blood_t);
    //总得分
    var p4TotalScore = new PIXI.Text('总得分: 0',{
        fontFamily:'zkkl',
        fontSize: 30,
    });
    p4TotalScore.position.set(275, 33);

    //赛道、障碍物及汽车
    var p4LaneGroup = new PIXI.Container();
    p4LaneGroup.position.set(0, 100);
    //赛道
    var p4_lane1 = new PIXI.Sprite.from(res.p4_lane.texture);
    p4_lane1.position.set(0, 0);
    var p4_lane2 = new PIXI.Sprite.from(res.p4_lane.texture);
    p4_lane2.position.set(0, -1170);

    //障碍物（包括金币）
    var p4_barrier_1 = new PIXI.Sprite(res.p4_barrier_1.texture);
    p4_barrier_1.position.set(150, 50);
    var p4_barrier_2 = new PIXI.Sprite(res.p4_barrier_2.texture);
    p4_barrier_2.position.set(275, 50);
    var p4_barrier_3 = new PIXI.Sprite(res.p4_barrier_3.texture);
    p4_barrier_3.position.set(400, 50);
    var p4_barrier_4 = new PIXI.Sprite(res.p4_barrier_4.texture);
    p4_barrier_4.position.set(515, 50);
    
    //赛道汽车
    var p4_black_car = new PIXI.Sprite(res.p4_black_car.texture);
    p4_black_car.position.set(145, 980);
    var p4_red_car = new PIXI.Sprite(res.p4_red_car.texture);
    p4_red_car.position.set(275, 980);
    var p4_white_car = new PIXI.Sprite(res.p4_white_car.texture);
    p4_white_car.position.set(400, 980);
    var p4_yellow_car = new PIXI.Sprite(res.p4_yellow_car.texture);
    p4_yellow_car.position.set(520, 980);
    p4LaneGroup.addChild(p4_lane1, p4_lane2, p4_barrier_1, p4_barrier_2, p4_barrier_3, p4_barrier_4, p4_black_car, p4_red_car, p4_white_car, p4_yellow_car);

    //操作区
    var p4ToolGroup = new PIXI.Container();
    p4ToolGroup.width=750;
    p4ToolGroup.height=149;
    p4ToolGroup.position.set(0, app.view.height-p4ToolGroup._height);
    //背景
    var p4ToolBg = new PIXI.Graphics();
    p4ToolBg.beginFill(0xff9500);
    p4ToolBg.drawRect(0,0,750,149);
    p4ToolBg.endFill();
    //左右按钮
    var p4LeftBtn = new PIXI.Sprite.from(res.p4_left_btn.texture);
    p4LeftBtn.interactive = true;
    p4LeftBtn.position.set(22, 22);
    p4LeftBtn.on('tap', function(){
        console.log('向左');
    });
    var p4RightBtn = new PIXI.Sprite.from(res.p4_right_btn.texture);
    p4RightBtn.interactive = true;
    p4RightBtn.on('tap', function(){
        console.log('向右');
    });
    p4RightBtn.position.set(488, 22);
    p4ToolGroup.addChild(p4ToolBg, p4LeftBtn, p4RightBtn);
    //添加到页面
    p4TopGroup.addChild(p4_01, p4_t_blood_text, p4BloodGroup, p4TotalScore);
    p4.addChild(p4TopGroup, p4LaneGroup, p4ToolGroup);

    //层排序
    p4TopGroup.zIndex = 9;
    p4LaneGroup.zIndex=1;
    p4.sortableChildren = true;

    app.stage.addChild(p4);

    //游戏进度开关
    app.ticker.add(()=>{
        if(global.play){
            console.log(1);
            //赛道动起来
            p4_lane1.y+=global.laneSpeed;
            p4_lane2.y+=global.laneSpeed;
            if(p4_lane1.y>=1170){
                p4_lane1.y=0;
            }
            if(p4_lane2.y>=0){
                p4_lane2.y=-1170;
            }
        }
    });

    /**** p4页 end ****/
}
