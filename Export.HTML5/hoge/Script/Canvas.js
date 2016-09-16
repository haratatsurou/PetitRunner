﻿//
// ### SmileBoom Petit Developer：Canvas Script ###
//
//   クラス名：Canvas
// 親クラス名：Sbt.Canvas
//
// コンテキストメニュー（右クリックで開くメニュー）でタッチや描画用のメソッドが追加できます。
//

//
// ### 定数 ###
//
var MODE_START = 0; //ゲームスタート 
var MODE_MAIN = 1; // ゲームメイン 
var MODE_END = 2; // ゲーム終了
//
// ### コンストラクタ ###
//   
var Canvas = function () { };

//
// ### 継承 ###
//
Canvas.prototype = new Sbt.Canvas();

//
// ### 初期化処理 ###
//
Canvas.prototype.doInitialize = function () {
    // [event setup start] Gadgetのイベント初期化([event setup end]まで編集・削除禁止)
    // [event setup end]

    // ※Gadget初期化前に必要な処理はこの下に追加してください
    Sbt.global.score = 1;
    Sbt.global.speed=10;
    Sbt.global.pos=200;
     Sbt.global.barpos=0;
     Sbt.global.scale=0.1;
    this.arrayTiles = []; //床を格納した配列
    this.arrayBar=[];// 障害物を格納した配列
    this.arrayhoge=[];
    // Canvasに配置されている全てのGadget初期化
    Sbt.Canvas.prototype.doInitialize.call(this);
    this.resource.playBgm("bgm");
    
    for(var i=0;i<3;i++){
    	this.arrayhoge.push(this.SelectBar());
    }
};

//
// ### 毎フレームごとの処理 ###
//
Canvas.prototype.doUpdate = function () {
    // 継承元CanvasのdoUpdate()呼び出し
    Sbt.Canvas.prototype.doUpdate.call(this);
    
    // ※この下にプログラムを追加してください
    
    if(Sbt.global.speed<50){
        Sbt.global.speed+=0.01;
    	Sbt.global.scale+=0.001;
    }
  var  speed=Sbt.global.speed;
  var  pos=Sbt.global.pos;
    
    this.arrayhoge[0].location[0] -= speed ; 
      this.arrayhoge[1].location[0] -= speed ; 
    if(this.arrayhoge[0].location[0] <=-pos/2){
    	    	this.arrayhoge[0].destroy();
    }
    
    if (this.arrayhoge[1].location[0] <=-pos/2) {

    	this.arrayhoge[1].destroy();
    	this.arrayhoge.shift(); //先頭の要素排除
    	this.arrayhoge.splice(1);
    	this.arrayhoge.push(this.SelectBar()); //末尾に新しい要素追加
    	this.arrayhoge.push(this.SetBar()); //末尾に新しい要素追加
    }    

};

Canvas.prototype.hall = function (index) {

    this.arrayTiles.splice(index, 1);
};
Canvas.prototype.createTile = function (gadget) {
    this.arrayTiles.push(gadget);
};
Canvas.prototype.createBar = function (gadget) {
    this.arrayBar.push(gadget);
};
//どのタイプのバーを使うか
Canvas.prototype.SelectBar = function() {
	var Tiles = this.canvas.arrayBar;
	var random=Math.floor(Math.random()*Tiles.length);
	var selectbar=Tiles[random];
	var x=selectbar.location[0];
	var y=selectbar.location[1];
	var z=selectbar.location[2];
	var barLayer=this.findLayer("Layer5"); //ゲームオブジェクトの検索
	
	//オブジェクトをLayer5に生成
	var gadget=barLayer.createGadget(selectbar.id,[this.width+selectbar.width,y,z],selectbar.id,selectbar.id,"Animation");
	return gadget;
};
//バーの配置幅
Canvas.prototype.SetBar = function() {
		var Tiles = this.canvas.arrayBar;
	var random=Math.floor(Math.random()*Tiles.length);
	var selectbar=Tiles[random];
	var x=selectbar.location[0]*(Math.random()* ( ( 5 + 1 ) - 1 )  + 1);
	var y=selectbar.location[1];
	var z=selectbar.location[2];
	var barLayer=this.findLayer("Layer5"); //ゲームオブジェクトの検索
	console.log(this.arrayhoge);
	//オブジェクトをLayer5に生成
	var gadget=barLayer.createGadget(selectbar.id,[this.width+selectbar+10,y,z],selectbar.id,selectbar.id,"Animation");
	return gadget;
};