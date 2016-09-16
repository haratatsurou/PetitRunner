//
// ### SmileBoom Petit Developer：Gadget Template Script ###
//
//   クラス名：bar2
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
var bar2 = function() {
};

//
// ### 継承 ###
//
bar2.prototype = new Sbt.Gadget();

//
// ### 初期化処理 ###
//
bar2.prototype.doInitialize = function() {
if(this.canvas.createBar){
		this.canvas.createBar(this);
	}
};

//
// ### 毎フレームごとの処理 ###
//
bar2.prototype.doUpdate = function() {
	// 継承元GadgetのdoUpdate()呼び出し
	Sbt.Gadget.prototype.doUpdate.call( this );
	//this.instanceBar();
};


// ※この下に独自処理を追加できます
