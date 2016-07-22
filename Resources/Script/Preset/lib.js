//
// ### SmileBoom Petit Developer：Main Script ###
//
//   クラス名：lib
//
//   ■起動時の初期化及び全体のアップデート制御用ライブラリ
//
//   このクラスのインスタンスには Sbt.global.lib でアクセスできます
//


//
// ### 定数 ###
//

//
// ### コンストラクタ ###
//
var lib = function(app) {
	this.app = app;
};

//
// ### 初期化処理 ###
//
lib.prototype.doInitialize = function() {
	// ※起動時に必要な初期化処理はこの下に追加してください

	// 最初の Canvas を指定する場合は、下の行のコメント指定（//）を削除して「Canvas名」を最初に起動したい Canvas の名前に置き換えて下さい
	//Sbt.startCanvasId = "Canvas名";
};

//
// ### 毎フレームごとの一番最初に実行したい処理 ###
//
lib.prototype.beginUpdate = function() {
	// ※この下にプログラムを追加してください
};

//
// ### 毎フレームごとの一番最後に実行したい処理 ###
//
lib.prototype.endUpdate = function() {
	// ※この下にプログラムを追加してください
};

//
// ### 毎フレームごとの描画処理 ###
//
// draw2d：Sbt.Draw2Dオブジェクト
//
lib.prototype.doDraw = function(draw2d) {
	// ※この下にプログラムを追加してください
};
