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
])
.load(setup)
.on('progress',(loader, res)=>{
    var progress = loader.progress;
    console.log(progress);
    //字体加载
    p1_load_text.text = progress+'%';
    p1_load_text.position.set((app.view.width-p1_load_text.width)/2, 168);
});

//屏幕宽高
var winWidth = $(window).width(),
    winHeight = $(window).height();

//首页视图
var p1 = new PIXI.Container();
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

console.log(p1_load_text.width);


p1.addChild(p1_01, p1_load_text);
app.stage.addChild(p1);


//逻辑执行函数
function setup(loader, res){

}
