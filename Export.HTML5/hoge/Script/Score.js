
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
     this.timerText = this.findGadget("time");
    // ※Gadget初期化後に必要な処理はこの下に追加してください
};

//
// ### 毎フレームごとの処理 ###
//
Score.prototype.doUpdate = function() {
    // 継承元CanvasのdoUpdate()呼び出し
    Sbt.Canvas.prototype.doUpdate.call(this);
    this.scoreText.setText("スコア\n" + parseInt(Sbt.global.score).toString());
    var frame = this.app.frameRate;
    this.timerText.setText("残り時間\n" +  Math.floor( (Sbt.global.timer + frame- 1) / frame ).toString() );
    // ※この下にプログラムを追加してください
};