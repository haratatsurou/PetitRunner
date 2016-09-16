//
// ### SmileBoom Petit Developer：Canvas Script ###
//
//   クラス名：Result
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
var Result = function() {
};

//
// ### 継承 ###
//
Result.prototype = new Sbt.Canvas();

//
// ### 初期化処理 ###
//
Result.prototype.doInitialize = function() {
	// [event setup start] Gadgetのイベント初期化([event setup end]まで編集・削除禁止)
	// [event setup end]
	
	// ※Gadget初期化前に必要な処理はこの下に追加してください
	
	// Canvasに配置されている全てのGadget初期化
	Sbt.Canvas.prototype.doInitialize.call( this );
	
	// ※Gadget初期化後に必要な処理はこの下に追加してください
};

//
// ### 毎フレームごとの処理 ###
//
Result.prototype.doUpdate = function() {
	// 継承元CanvasのdoUpdate()呼び出し
	Sbt.Canvas.prototype.doUpdate.call( this );
	
	// ※この下にプログラムを追加してください
};
player.prototype.doTap = function(location, id) {
		this.app.changeCanvas("Main1");
    return true; // true：以降のCanvas/Gadgetは処理されません
};