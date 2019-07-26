/*** 工具函数开始 ***/
//随机数生成
function rd(min,max) {
    return Math.floor(Math.random()*(max-min)+min);
};
/*** 工具函数结束 ***/


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
    // {name:'p1_01',url:'./images/p1_01.png'},
    // {name:'p1_02',url:'./images/p1_02.png'},
    // {name:'p1_03',url:'./images/p1_03.png'},
    // {name:'p1_04',url:'./images/p1_04.png'},
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
    {name:'p4_04',url:'./images/p4_04.png'},
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
    {name:'p5_01',url:'./images/p5_01.png'},
    {name:'p5_02',url:'./images/p5_02.png'},
    {name:'p5_03',url:'./images/p5_03.png'},
    {name:'p5_black_car',url:'./images/p5_black_car.png'},
    {name:'p5_red_car',url:'./images/p5_red_car.png'},
    {name:'p5_white_car',url:'./images/p5_white_car.png'},
    {name:'p5_yellow_car',url:'./images/p5_yellow_car.png'},
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


//碰撞函数
var bump = new Bump(PIXI);

var global={
    winWidth: $(window).width(), //屏幕宽
    winHeight: $(window).height(), //屏幕高

    gamePlay: false,//控制游戏，开启【true】还是关闭【false】
    gameLaneSpeed: 5,//赛道速度
    gameBarrieMaxSpeed: 10,//障碍物最快速度
    gameScoreBonus: 10,//撞击金币之后的加成倍数
    gameCountdown: 3,//启动的倒计时
    gameActiveColorCar: 1, //1：黄色汽车, 2：白色汽车, 3：红色汽车, 4：黑色汽车
    gameResScore:0,//总的得分分数
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
        console.log('黄色汽车');
        p3_02.position.set(p302PositionArr[0].x, p302PositionArr[0].y);
        global.gameActiveColorCar = 1;
    }); 
    //白色汽车
    var p3_white_car = new PIXI.Sprite.from(res.p3_white_car.texture);
    p3_white_car.position.set(p3CarPositionArr[1].x, p3CarPositionArr[1].y);
    p3_white_car.interactive = true;
    p3_white_car.on('tap', function(){
        console.log('白色汽车');
        p3_02.position.set(p302PositionArr[1].x, p302PositionArr[1].y);
        global.gameActiveColorCar = 2;
    }); 
    //红色汽车
    var p3_red_car = new PIXI.Sprite.from(res.p3_red_car.texture);
    p3_red_car.position.set(p3CarPositionArr[2].x, p3CarPositionArr[2].y);
    p3_red_car.interactive = true;
    p3_red_car.on('tap', function(){
        console.log('红色汽车');
        p3_02.position.set(p302PositionArr[2].x, p302PositionArr[2].y);
        global.gameActiveColorCar = 3;
    }); 
    //黑色汽车
    var p3_black_car = new PIXI.Sprite.from(res.p3_black_car.texture);
    p3_black_car.position.set(p3CarPositionArr[3].x, p3CarPositionArr[3].y);
    p3_black_car.interactive = true;
    p3_black_car.on('tap', function(){
        console.log('黑色汽车');
        p3_02.position.set(p302PositionArr[3].x, p302PositionArr[3].y);
        global.gameActiveColorCar = 4;
    }); 
    
    p3_car_group.addChild(p3_yellow_car, p3_white_car, p3_red_car, p3_black_car, p3_02);

    //【确定汽车】按钮
    var p3_04 = new PIXI.Sprite.from(res.p3_04.texture);
    p3_04.interactive = true;
    p3_04.position.set((app.view.width-p3_04.width)/2, p3._height-100);

    
    var randomLane=0;//随机车道
    //开始游戏的逻辑
    var gameStart = function(){
        console.log('game start');
        //游戏主界面呈现
        p3.visible = false;
        p4.visible = true;

        //倒计时图标显示出来
        p4CountdownGroup.visible = true;
        //圆圈图标显示
        p4_04.rotation = 0;
        p4_04.pivot.set(154, 154)
        clearInterval(timer1);
        var timer1 = setInterval(()=>{
            p4_04.rotation-=1;
        },20)

        var cdTime = global.gameCountdown;
        clearInterval(timer2);
        var timer2 = setInterval(()=>{

            if(cdTime>0){
                cdTime-=1;
                p4CountdownText.text = cdTime==0?'Go':cdTime;
                p4CountdownText.position.set((p4_04.width-p4CountdownText.width)/2, (p4_04.height-p4CountdownText.height)/2);
            }else{
                //关闭倒计时
                p4CountdownGroup.visible = false;
                //游戏开关打开
                global.gamePlay = true;
                clearInterval(timer1);
                clearInterval(timer2);
            }
        },1000);


        //选中的汽车在赛道上呈现：1：黄色汽车, 2：白色汽车, 3：红色汽车, 4：黑色汽车
        trackCar[`car${global.gameActiveColorCar}`].visible = true;
        //使汽车走到随机的车道上，但不会走到应急车道中
        randomLane=rd(1,5);
        trackCar[`car${global.gameActiveColorCar}`].x=p4CarInTrackArr[randomLane].x;
    }

    //游戏开始按钮
    p3_04.on('tap', function(){
        gameStart();
    });

    //内容添加到页面中
    p3.addChild(p3_01, p3_car_group, p3_04);
    app.stage.addChild(p3);
    /**** p3页 end ****/


    /**** p4页 start ****/
    var p4 = new PIXI.Container();
    p4.visible = false;
    p4.width = 750;
    p4.height = global.winHeight;
    //顶部内容
    var p4TopGroup = new PIXI.Container();
    p4TopGroup.width = 750;
    p4TopGroup.height = 100;

    //背景
    var p4_01 = new PIXI.Sprite.from(res.p4_01.texture);

    //总得分
    var p4TotalScoreText1 = new PIXI.Text('总得分: ',{
        fontFamily:'zkkl',
        fontSize: 30,
    });
    p4TotalScoreText1.position.set(275, 33);
    var p4TotalScoreText2 = new PIXI.Text('0',{
        fontFamily:'zkkl',
        fontSize: 30,
    });
    p4TotalScoreText2.position.set(275+p4TotalScoreText1.width, 33);

    //赛道、障碍物及汽车
    var p4LaneGroup = new PIXI.Container();
    p4LaneGroup.position.set(0, 100);
    //赛道
    var p4_lane1 = new PIXI.Sprite.from(res.p4_lane.texture);
    p4_lane1.position.set(0, 0);
    var p4_lane2 = new PIXI.Sprite.from(res.p4_lane.texture);
    p4_lane2.position.set(0, -p4_lane1.height);

    //障碍物在赛道中的位置数组
    var p4BarrieInTrackArr=[
        {x:150, y:-150},//第一条道
        {x:275, y:-150},//第二条道
        {x:400, y:-150},//第三条道
        {x:525, y:-150},//第四条道
    ];
    //赛道中的障碍物（包括金币）
    var trackBarrie={};
    trackBarrie['barrier1'] = new PIXI.Sprite(res.p4_barrier_1.texture);
    trackBarrie['barrier1'].position.set(150, -150);
    trackBarrie['barrier2'] = new PIXI.Sprite(res.p4_barrier_2.texture);
    trackBarrie['barrier2'].position.set(275, -150);
    trackBarrie['barrier3'] = new PIXI.Sprite(res.p4_barrier_3.texture);
    trackBarrie['barrier3'].position.set(400, -150);
    trackBarrie['barrier4'] = new PIXI.Sprite(res.p4_barrier_4.texture);
    trackBarrie['barrier4'].position.set(525, -150);
    
    //汽车在赛道中的位置数组
    var p4CarInTrackArr=[
        {x:15, y:980},//应急车道左道
        {x:140, y:980},//第一条道
        {x:270, y:980},//第二条道
        {x:400, y:980},//第三条道
        {x:520, y:980},//第四条道
        {x:645, y:980},//应急车道右道
    ];
    //赛道中的汽车
    var trackCar={};
    trackCar['car1'] = new PIXI.Sprite(res.p4_yellow_car.texture);
    trackCar['car1'].visible = false;
    trackCar['car1'].position.set(520, 980);

    trackCar['car2'] = new PIXI.Sprite(res.p4_white_car.texture);
    trackCar['car2'].visible = false;
    trackCar['car2'].position.set(400, 980);

    trackCar['car3'] = new PIXI.Sprite(res.p4_red_car.texture);
    trackCar['car3'].visible = false;
    trackCar['car3'].position.set(275, 980);

    trackCar['car4'] = new PIXI.Sprite(res.p4_black_car.texture);
    trackCar['car4'].visible = false;
    trackCar['car4'].position.set(145, 980);

    p4LaneGroup.addChild(p4_lane1, 
                        p4_lane2, 
                        trackBarrie['barrier1'], 
                        trackBarrie['barrier2'], 
                        trackBarrie['barrier3'], 
                        trackBarrie['barrier4'],
                        trackCar['car1'],
                        trackCar['car2'],
                        trackCar['car3'],
                        trackCar['car4']);

    //操作区
    var p4ToolGroup = new PIXI.Container();
    p4ToolGroup.width=750;
    p4ToolGroup.height=150;
    p4ToolGroup.position.set(0, app.view.height-p4ToolGroup._height);
    //背景
    var p4ToolBg = new PIXI.Graphics();
    p4ToolBg.beginFill(0xff9500);
    p4ToolBg.drawRect(0,0,750,150);
    p4ToolBg.endFill();
    //左右按钮
    var p4LeftBtn = new PIXI.Sprite.from(res.p4_left_btn.texture);
    p4LeftBtn.interactive = true;
    p4LeftBtn.position.set(22, 22);
    p4LeftBtn.on('tap', function(){
        console.log('向左');
        randomLane-=1;
        //不超出赛道
        if( randomLane<0 ){
            randomLane=0;
        }
        //汽车跑到了应急车道上了
        if( randomLane==0 ){
            isEmergencyLane=true;
        }else{
            isEmergencyLane=false;            
        }
        trackCar[`car${global.gameActiveColorCar}`].x=p4CarInTrackArr[randomLane].x;
    });
    var p4RightBtn = new PIXI.Sprite.from(res.p4_right_btn.texture);
    p4RightBtn.interactive = true;
    p4RightBtn.on('tap', function(){
        console.log('向右');
        randomLane+=1;
        //不超出赛道
        if( randomLane>p4CarInTrackArr.length-1 ){
            randomLane=p4CarInTrackArr.length-1;
        }
        //汽车跑到了应急车道上了
        if( randomLane==p4CarInTrackArr.length-1 ){
            isEmergencyLane=true;
        }else{
            isEmergencyLane=false;            
        }
        trackCar[`car${global.gameActiveColorCar}`].x=p4CarInTrackArr[randomLane].x;
    });
    p4RightBtn.position.set(488, 22);
    p4ToolGroup.addChild(p4ToolBg, p4LeftBtn, p4RightBtn);


    //倒计时
    var p4CountdownGroup = new PIXI.Container();
    p4CountdownGroup.visible = false;
    var p4_04 = new PIXI.Sprite.from(res.p4_04.texture);
    p4_04.position.set(150,150);
    var p4CountdownText = new PIXI.Text(global.gameCountdown ,{
        fontFamily: 'zkkl',
        fontSize: 150,
        fill: 0x000000,
        fontWeight: 'bold'
    });
    p4CountdownText.position.set((p4_04.width-p4CountdownText.width)/2, (p4_04.height-p4CountdownText.height)/2);
    p4CountdownGroup.position.set((app.view.width-p4_04.width)/2, (app.view.height-p4_04.height)/2);
    p4CountdownGroup.addChild(p4_04, p4CountdownText);

    //添加到页面
    p4TopGroup.addChild(p4_01, p4TotalScoreText1, p4TotalScoreText2, p4CountdownGroup);
    p4.addChild(p4TopGroup, p4LaneGroup, p4ToolGroup);

    //层排序
    p4TopGroup.zIndex = p4ToolGroup.zIndex = 2;
    p4LaneGroup.zIndex = 1;
    p4.sortableChildren = true;

    app.stage.addChild(p4);

    //游戏进度开关
    var gameScore=0;
    var isEmergencyLane=false;
    //四个道中的障碍物随机速度
    var barrieRdArr={
        rd1: rd(global.gameLaneSpeed, global.gameBarrieMaxSpeed),
        rd2: rd(global.gameLaneSpeed, global.gameBarrieMaxSpeed),
        rd3: rd(global.gameLaneSpeed, global.gameBarrieMaxSpeed),
        rd4: rd(global.gameLaneSpeed, global.gameBarrieMaxSpeed)
    }
    
    //游戏结束执行函数
    var gameOver=function(){
        //暂停游戏
        global.gamePlay = false;
        // //左右按钮不可点击
        // p4RightBtn.interactive = p4LeftBtn.interactive = false;
        //页面切换
        p4.visible = false;
        p5.visible = true;
        
        //文案显示
        var resColorCar='';
        switch(global.gameActiveColorCar){
            case 1:
                resColorCar='黄色';
            break;
            case 2:
                resColorCar='白色';
            break;
            case 3:
                resColorCar='红色';
            break;
            case 4:
                resColorCar='黑色';
            break;
        }
        p5Text1.text=`本局游戏中，您用${resColorCar}汽车获得`;
        resCar['car1'].visible = resCar['car2'].visible = resCar['car3'].visible = resCar['car4'].visible = false;
        resCar[`car${global.gameActiveColorCar}`].visible = true;
        //得分显示
        p5Text2.text = global.gameResScore;
        p5Text2.position.set((app.view.width-p5Text2.width)/2-30, 260);
        p5Text3.position.set((app.view.width-p5Text2.width)/2-30+p5Text2.width, 260);
    }   

    //定时器
    app.ticker.add(()=>{
        //游戏是否开启
        if( global.gamePlay ){

            //赛道动起来
            p4_lane1.y+=global.gameLaneSpeed;
            p4_lane2.y+=global.gameLaneSpeed;
            if(p4_lane1.y>=p4_lane1.height){
                p4_lane1.y=0;
            }
            if(p4_lane2.y>=0){
                p4_lane2.y=-p4_lane1.height;
            }

            //总的分数相加
            if(isEmergencyLane){
                gameScore-=1;
            }else{
                gameScore+=1;
            }
            if(gameScore<0){
                gameScore=0;
            }
            //得分显示
            p4TotalScoreText2.text=global.gameResScore=gameScore;
            //障碍物动起来
            trackBarrie['barrier1'].y+=barrieRdArr.rd1;
            trackBarrie['barrier2'].y+=barrieRdArr.rd2;
            trackBarrie['barrier3'].y+=barrieRdArr.rd3;
            trackBarrie['barrier4'].y+=barrieRdArr.rd4;
            //超出了赛道，那么从另外一条道中从新开始
            if(trackBarrie['barrier1'].y>=1200){
                var rdNum = rd(0,4);
                trackBarrie['barrier1'].position.set(p4BarrieInTrackArr[rdNum].x, p4BarrieInTrackArr[rdNum].y );
                barrieRdArr.rd1 = rd(global.gameLaneSpeed, global.gameBarrieMaxSpeed);
            }
            if(trackBarrie['barrier2'].y>=1200){
                var rdNum = rd(0,4);
                trackBarrie['barrier2'].position.set(p4BarrieInTrackArr[rdNum].x, p4BarrieInTrackArr[rdNum].y );
                barrieRdArr.rd2 = rd(global.gameLaneSpeed, global.gameBarrieMaxSpeed);
            }
            if(trackBarrie['barrier3'].y>=1300){
                var rdNum = rd(0,4);
                trackBarrie['barrier3'].position.set(p4BarrieInTrackArr[rdNum].x, p4BarrieInTrackArr[rdNum].y );
                barrieRdArr.rd3 = rd(global.gameLaneSpeed, global.gameBarrieMaxSpeed);
            }
            if(trackBarrie['barrier4'].y>=1200){
                var rdNum = rd(0,4);
                trackBarrie['barrier4'].position.set(p4BarrieInTrackArr[rdNum].x, p4BarrieInTrackArr[rdNum].y );
                barrieRdArr.rd4 = rd(global.gameLaneSpeed, global.gameBarrieMaxSpeed);
                trackBarrie['barrier4'].visible = true;
            }
        
            //汽车碰撞
            var carBarrier1 = bump.hit(trackCar[`car${global.gameActiveColorCar}`], trackBarrie['barrier1'], true);
            var carBarrier2 = bump.hit(trackCar[`car${global.gameActiveColorCar}`], trackBarrie['barrier2'], true);
            var carBarrier3 = bump.hit(trackCar[`car${global.gameActiveColorCar}`], trackBarrie['barrier3'], true);
            //carBarrier4 是金币
            var carBarrier4 = bump.hit(trackCar[`car${global.gameActiveColorCar}`], trackBarrie['barrier4']);
            if( carBarrier1 || carBarrier2 || carBarrier3 ){
                console.log('game over');
                //游戏结束
                gameOver();
            }else if( carBarrier4 ){
                console.log('得到金币');
                trackBarrie['barrier4'].visible = false;
                gameScore+=global.gameScoreBonus;
            }
            
        }
    });
    /**** p4页 end ****/


    /**** p5页 start ****/
    var p5 = new PIXI.Container();
    p5.visible = false;
    p5.width = 750;
    p5.height = 1160;
    p5.position.set(0, (app.view.height-p5._height)/2);
    //标题
    var p5_01 = new PIXI.Sprite.from(res.p5_01.texture);
    p5_01.position.set((app.view.width-p5_01.width)/2, 0);
    //【再来一局】按钮
    var p5_02 = new PIXI.Sprite.from(res.p5_02.texture);
    p5_02.position.set((app.view.width-p5_02.width)/2, p5._height-p5_02.height);
    p5_02.interactive=true;
    p5_02.on('tap', function(){
        p5.visible = false;
        //信息重置
        console.log('再来一局');
    });
    //光辉
    var p5_03 = new PIXI.Sprite.from(res.p5_03.texture);
    p5_03.position.set(118, 430);
    //文案1
    var p5Text1 = new PIXI.Text('本局游戏中，您用黄色汽车获得',{
            fontFamily: 'zkkl',
            fontSize: 40,
            fill: 0x000000
        });
    p5Text1.position.set((app.view.width-p5Text1.width)/2, 180);
    //得分
    var p5Text2 = new PIXI.Text('88888',{
        fontFamily: 'zkkl',
        fontSize: 70,
        fill: 0xff1a1a,
        fontWeight:'bold',
        dropShadow: true,
        dropShadowColor: '#cc9732',
        dropShadowBlur: 0,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
    });
    p5Text2.position.set((app.view.width-p5Text2.width)/2-30, 260);
    //【分】字
    var p5Text3 = new PIXI.Text('分',{
        fontFamily: 'zkkl',
        fontSize: 70,
        fill: 0x000000,
        fontWeight:'bold',
        dropShadow: true,
        dropShadowColor: '#cc9732',
        dropShadowBlur: 0,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
    });
    p5Text3.position.set((app.view.width-p5Text2.width)/2-30+p5Text2.width, 260);
    //得分汽车
    var resCar={};
    resCar['car1'] = new PIXI.Sprite.from(res.p5_yellow_car.texture);
    resCar['car1'].position.set((app.view.width-resCar['car1'].width)/2, 540);

    resCar['car2'] = new PIXI.Sprite.from(res.p5_white_car.texture);
    resCar['car2'].position.set((app.view.width-resCar['car2'].width)/2, 540);

    resCar['car3'] = new PIXI.Sprite.from(res.p5_red_car.texture);
    resCar['car3'].position.set((app.view.width-resCar['car3'].width)/2, 540);

    resCar['car4'] = new PIXI.Sprite.from(res.p5_black_car.texture);
    resCar['car4'].position.set((app.view.width-resCar['car4'].width)/2, 540);

    //先隐藏结果汽车
    resCar['car1'].visible = resCar['car2'].visible = resCar['car3'].visible = resCar['car4'].visible = false;

    //添加到页面中
    p5.addChild(
        p5_01, 
        p5_02, 
        p5_03, 
        p5Text1, 
        p5Text2,
        p5Text3,
        resCar['car1'],
        resCar['car2'],
        resCar['car3'],
        resCar['car4']
    );
    app.stage.addChild(p5);
    /**** p5页 end ****/


    //游戏开始函数
    gameStart();
}
