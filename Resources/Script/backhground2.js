//
// ### SmileBoom Petit Developer：Gadget Template Script ###
//
//   クラス名：backhground2
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
var backhground2 = function() {};

//
// ### 継承 ###
//
backhground2.prototype = new Sbt.Gadget();

//
// ### 初期化処理 ###
//
backhground2.prototype.doInitialize = function() {
    this.location[1] = -461;
    this.canvas.resultImage = this;
};
backhground2.prototype.doMouseDown = function(location, id) {
    // ゲーム画面に Canvas を切り替える
    if (Sbt.global.MODE_END === 2) {
        this.app.changeCanvas("Main");
        Sbt.global.MODE_END = 0;
    }
    return true; // true：以降のCanvas/Gadgetは処理されません

};