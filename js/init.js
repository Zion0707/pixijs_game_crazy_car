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
    {name:'zkkl',url:'../fonts/zkkl.ttf'},
    {name:'p1_01',url:'../images/p1_01.png'},
    {name:'p1_02',url:'../images/p1_02.png'},
    {name:'p1_03',url:'../images/p1_03.png'},
    {name:'p1_04',url:'../images/p1_04.png'},
    {name:'p2_01',url:'../images/p2_01.png'},
    {name:'p2_02',url:'../images/p2_02.png'},
    {name:'p2_03',url:'../images/p2_03.png'},
])
.load(setup)
.on('progress',(loader, res)=>{
    var progress = parseInt(loader.progress);
    console.log(progress);

    //百分比加载
    p1_load_text.text = progress+'%';
    p1_load_text.position.set((app.view.width-p1_load_text.width)/2, 168);
    //加载完成时显示开始游戏按钮
    if(progress>=100){
        p1_02.visible = true;
    }
});

//屏幕宽高
var winWidth = $(window).width(),
    winHeight = $(window).height();

/**** p1页 start ****/
var p1 = new PIXI.Container();
p1.visible = false;
p1.width = 750;
p1.height = 1160;
p1.position.set(0, (app.view.height-p1._height)/2);

//标题
var p1_01 = new PIXI.Sprite.from('../images/p1_01.png');
p1_01.position.set((p1._width-473)/2, 0);
//加载文字
var p1_load_text = new PIXI.Text('0%',{
    fontFamily: 'zkkl',
    fontSize: 36,
    fill: 0xffffff
});
p1_load_text.position.set((app.view.width-p1_load_text.width)/2, 168);

//开始按钮
var p1_02 = new PIXI.Sprite.from('../images/p1_02.png');
p1_02.interactive = true;
p1_02.position.set((app.view.width-244)/2, p1._height-100);
p1_02.visible = false;
p1_02.on('tap', function(ev){
    p1.visible = false;
});

//赛道图
var p1_03 = new PIXI.Sprite.from('../images/p1_03.png');
p1_03.position.set(0, 220);

//赛道汽车图
var p1_04 = new PIXI.Sprite.from('../images/p1_04.png');
p1_04.position.set(0, 450);

//内容添加到页面中
p1.addChild(p1_01, p1_02, p1_03, p1_04, p1_load_text);
app.stage.addChild(p1);
/**** p1页 end ****/


//逻辑执行函数
function setup(loader, res){
    /**** p2页 start ****/
    var p2 = new PIXI.Container();
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
}
