//
// ### SmileBoom Petit Developer：Gadget Template Script ###
//
//   クラス名：assist2
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
var assist2 = function() {
};
assist2.prototype = new Sbt.Gadget();
assist2.prototype.doInitialize = function() {
    if (this.canvas.createBar) {
        this.canvas.createBar(this);
    }
};
assist2.prototype = new Sbt.Gadget();

//
// ### 初期化処理 ###
//
assist2.prototype.doInitialize = function() {
};

//
// ### 毎フレームごとの処理 ###
//
assist2.prototype.doUpdate = function() {
	// 継承元GadgetのdoUpdate()呼び出し
	Sbt.Gadget.prototype.doUpdate.call( this );
	
	// ※この下にプログラムを追加してください
};

assist2.prototype.doTap = function(locatoin) {
};
//敵との判定をとる関数(設置型)
assist2.prototype.MouseCollision = function(mousepos) {

};