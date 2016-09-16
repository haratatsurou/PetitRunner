//
// ### SmileBoom Petit Developer：Gadget Template Script ###
//
//   クラス名：ground
// 親クラス名：Sbt.Gadget
//
// コンテキストメニュー（右クリックで開くメニュー）でタッチや描画用のメソッドが追加できます。
//

//
// ### 定数 ###
//

//
// ### コンストラクタ ###
//
var ground = function() {};

//
// ### 継承 ###
//
ground.prototype = new Sbt.Gadget();

var speed;
var pos; 

//
// ### 初期化処理 ###
//
ground.prototype.doInitialize = function() {
	if(this.canvas.createTile){
		this.canvas.createTile(this);
	}
	
};

//
// ### 毎フレームごとの処理 ###

ground.prototype.doUpdate = function() {
    // 継承元GadgetのdoUpdate()呼び出し
    Sbt.Gadget.prototype.doUpdate.call(this);
	speed=Sbt.global.speed;
    pos=Sbt.global.pos;
    
    this.location[0] -= speed ; 
    
    if (this.location[0] <=-pos) {
    	//一番後ろに配置
        this.location[0] = this.location[0]+this.width*7;
        Sbt.global.score++;
        
    }
    Sbt.global.barpos=this.location[0] ;
    // ※この下にプログラムを追加してください
};

// ※この下に独自処理を追加できます