//测试用
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
    console.log(progress);
});

function setup(loader, res){
    console.log('加载完成');
}