//
// ### SmileBoom Petit Developer：Gadget Template Script ###
//
//   クラス名：player
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
var player = function() {
};

//
// ### 継承 ###
//
player.prototype = new Sbt.Gadget();

//
// ### 初期化処理 ###
//
player.prototype.doInitialize = function() {
	this.setAnimation("default");
};

//
// ### 毎フレームごとの処理 ###
//
player.prototype.doUpdate = function() {
	// 継承元GadgetのdoUpdate()呼び出し
	Sbt.Gadget.prototype.doUpdate.call( this );
		if(this.animation.id=="default"){
			return;
	}
		if (this.animation.isEnd) {
			if(this.animation.id=="jump_up"){
				this.setAnimation("jump_down");
			}else{
				this.setAnimation("default");
			}
	}

	// ※この下にプログラムを追加してください
};

player.prototype.doMouseUp = function( location, id ) {
	if(this.animation.id=="default"){
		this.setAnimation("jump_up");
	}
	else if(this.animation.id=="jump_up"){
		this.setAnimation("doublejump");
	}
	
	return true; // true：以降のCanvas/Gadgetは処理されません
};
