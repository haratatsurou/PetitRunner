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

var player = function () { };

//
// ### 継承 ###
//
player.prototype = new Sbt.Gadget();

//
// ### 初期化処理 ###
//
player.prototype.doInitialize = function () {
    this.setAnimation("default");
};

//
// ### 毎フレームごとの処理 ###
//
var i = 0;
var flag = false;
var downflag = false;
var up = 7;
var gravity = -9.8;
var playerBottom;
var defpos_y;
player.prototype.doUpdate = function () {
    // 継承元GadgetのdoUpdate()呼び出し    
    Sbt.Gadget.prototype.doUpdate.call(this);
    // if (this.animation.isEnd) {
    //     if (this.animation.id == "jump_up") {
    //         this.setAnimation("jump_down");
    //     } else {
    //         this.setAnimation("default");
    //     }
    // }
   
    if (flag) {
        i++;
        this.location[1] +=( 0.5 * gravity * i)-10;
        if (i === 5) {
            downflag = true;

        }

    }
    if (downflag) {
    
        flag = false;
        i--;
        this.location[1]-= 0.25 * 9.8 * i;
        if ( this.Landing(this.location[1])) {
            downflag = false;
            this.location[1]=defpos_y;
            i=0;
            return;
        }
    }
   
    if (this.animation.id === "default") {
        return;
    }


    // ※この下にプログラムを追加してください
};

player.prototype.doMouseUp = function (location, id) {
    // if (this.animation.id == "default") {
    //     this.setAnimation("jump_up");
    // } else if (this.animation.id == "jump_up") {
    //     this.setAnimation("doublejump");
    // }
    if ( this.Landing(this.location[1])) {
    	defpos_y=this.location[1];
    flag = true;
    
    	
        }

    return true; // true：以降のCanvas/Gadgetは処理されません
};

//着地の判定をとる関数
player.prototype.Landing = function (playerX) {

    var Tiles = this.canvas.arrayTiles;
    var playerTop = playerX - this.height / 2;
   playerBottom = parseInt(playerTop + this.height);
    
    for (var i = Tiles.length - 1; i >= 0; --i) {
        var hoge = Tiles[i];

        var tileTop = hoge.location[1] - hoge.height / 2;
        var tileButtom = tileTop + hoge.height;
        //  console.log(tileTop + ":tile:" + playerBottom);
        if (playerBottom >= tileTop) {
           return true;
        }
    }
    return false;

};