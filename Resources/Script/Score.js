//
// ### SmileBoom Petit Developer：Canvas Script ###
//
//   クラス名：Score
// 親クラス名：Sbt.Canvas
//
// コンテキストメニュー（右クリックで開くメニュー）でタッチや描画用のメソッドが追加できます。
//

//
// ### 定数 ###
//

//
// ### コンストラクタ ###
//
var Score = function() {};

//
// ### 継承 ###
//
Score.prototype = new Sbt.Canvas();

//
// ### 初期化処理 ###
//
Score.prototype.doInitialize = function() {
    // [event setup start] Gadgetのイベント初期化([event setup end]まで編集・削除禁止)
    // [event setup end]

    // ※Gadget初期化前に必要な処理はこの下に追加してください

    // Canvasに配置されている全てのGadget初期化
    Sbt.Canvas.prototype.doInitialize.call(this);
    this.scoreText = this.findGadget("score");
    // ※Gadget初期化後に必要な処理はこの下に追加してください
};

//
// ### 毎フレームごとの処理 ###
//
Score.prototype.doUpdate = function() {
    // 継承元CanvasのdoUpdate()呼び出し
    Sbt.Canvas.prototype.doUpdate.call(this);
    this.scoreText.setText("スコア\n" + parseInt(Sbt.global.score).toString());
    // ※この下にプログラムを追加してください
};

// [event function] Gadgetのイベントメソッドを追加(この行の編集・削除禁止)

// ※この下に独自処理を追加できます