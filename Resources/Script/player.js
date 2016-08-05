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
var player = function() {};

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
    Sbt.Gadget.prototype.doUpdate.call(this);
    if (this.animation.id == "default") {
        return;
    }
    if (this.animation.isEnd) {
        if (this.animation.id == "jump_up") {
            this.setAnimation("jump_down");
        } else {
            this.setAnimation("default");
        }
    }
    this.Landing();

    // ※この下にプログラムを追加してください
};

player.prototype.doMouseUp = function(location, id) {
    if (this.animation.id == "default") {
        this.setAnimation("jump_up");
    } else if (this.animation.id == "jump_up") {
        this.setAnimation("doublejump");
    }

    return true; // true：以降のCanvas/Gadgetは処理されません
};

//着地の判定をとる関数
player.prototype.Landing = function() {
    // var hit = this.animation.findAnimation("default");
    // if (hit == null) return;

    // var playerLeft = this.location[0] + hit.drawOffset[0] - hit.width / 2;
    var playerTop = this.location[1] - this.height / 2;
    // var playerRight = playerLeft + hit.width;
    var playerBottom = playerTop + this.height;

    var Tiles = this.canvas.arrayTiles;

    for (var i = Tiles.length - 1; i >= 0; i--) {
        var tile = this.Tiles[i];

        var tileTop = tile.location[0] - tile.height / 2;
        var tileButtom = tileTop + tile.height;
        if (playerBottom === tileTop) {
            alert("やったぜ");
        }
    }

};