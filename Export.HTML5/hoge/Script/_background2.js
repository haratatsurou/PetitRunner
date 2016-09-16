//
// ### SmileBoom Petit Developer：Gadget Template Script ###
//
//   クラス名：_background2
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
var _background2 = function() {
};

//
// ### 継承 ###
//
_background2.prototype = new Sbt.Gadget();

//
// ### 初期化処理 ###
//
_background2.prototype.doInitialize = function() {
};

//
// ### 毎フレームごとの処理 ###
//
var speed;
var pos;
_background2.prototype.doUpdate = function() {
	// 継承元GadgetのdoUpdate()呼び出し
	Sbt.Gadget.prototype.doUpdate.call( this );
	speed=Sbt.global.speed/4;
    pos=this.width;
    
    this.location[0] -= speed ; 
    
    if (this.location[0] <=-pos) {
    	//一番後ろに配置
        this.location[0] = this.location[0]+this.width*3;
    	
        
    }
	// ※この下にプログラムを追加してください
};

// ※この下に独自処理を追加できます
