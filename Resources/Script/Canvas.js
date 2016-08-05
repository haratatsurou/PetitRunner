//
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
var Canvas = function() {};

//
// ### 継承 ###
//
Canvas.prototype = new Sbt.Canvas();

//
// ### 初期化処理 ###
//
Canvas.prototype.doInitialize = function() {
    // [event setup start] Gadgetのイベント初期化([event setup end]まで編集・削除禁止)
    // [event setup end]

    // ※Gadget初期化前に必要な処理はこの下に追加してください

    // Canvasに配置されている全てのGadget初期化
    Sbt.Canvas.prototype.doInitialize.call(this);

    // ※Gadget初期化後に必要な処理はこの下に追加してください
    Sbt.global.score = 0;
    this.arrayTiles = [];
};

//
// ### 毎フレームごとの処理 ###
//
Canvas.prototype.doUpdate = function() {
    // 継承元CanvasのdoUpdate()呼び出し
    Sbt.Canvas.prototype.doUpdate.call(this);

    // ※この下にプログラムを追加してください
};

Canvas.prototype.hall = function(index) {

    this.arrayTiles.splice(index, 1);
};
Canvas.prototype.createTile = function(gadget) {
    this.arrayTiles.push(gadget);
};