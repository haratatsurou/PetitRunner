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

//
// ### 初期化処理 ###
//
ground.prototype.doInitialize = function() {};

//
// ### 毎フレームごとの処理 ###
//
ground.prototype.doUpdate = function() {
    // 継承元GadgetのdoUpdate()呼び出し
    Sbt.Gadget.prototype.doUpdate.call(this);
    this.location[0] -= 6;
    if (this.location[0] < -184) {
        this.location[0] = 1150;
    }
    // ※この下にプログラムを追加してください
};

// ※この下に独自処理を追加できます