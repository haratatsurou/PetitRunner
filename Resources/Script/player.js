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
var i = 0;
var downflag = false;
var up = 7;
var gravity = -9.8;
var playerBottom;
var defpos_y;
var flag = false;
var Deathcounter=0;
var doublejumpflag=false;
player.prototype.doUpdate = function() {
    // 継承元GadgetのdoUpdate()呼び出し    
    Sbt.Gadget.prototype.doUpdate.call(this);
    if( this.EnemyCollision()){
    	Deathcounter++;
    	if(Deathcounter==3){
    	//alert("死亡");
    	Deathcounter=0;
    	}
    	return;
    }else{
    if (flag) {
        i++;
        //敵との距離を判別(スコア加算)
       // this.addPoint();
        this.location[1] += (0.5 * gravity * i) - 10;
        if (i === 5) {
            downflag = true;
        }
    }   
    if (doublejumpflag) {
    	 downflag = false;
    	 flag=false;
        i++;
        this.location[1] += (0.5 * gravity * i) - 10;
        if (i === 4) {
            downflag = true;
        }
    }  
    //着地するまで操作不能に
    if (downflag) {

        flag = false;
         doublejumpflag = false;
        i--;
        this.location[1] -= 0.25 * 9.8 * i;
        if (this.Landing(this.location[1])) {
            downflag = false;
            this.location[1] = defpos_y;
            i = 0;
            return;
        }
    }
  
    if (this.animation.id === "default") {
        return;
    }
    }
    // ※この下にプログラムを追加してください
};

var jumpcount=0;
player.prototype.doMouseDown = function( location, id ) {
	   //着地しているときジャンプ可能にする
    if (this.Landing(this.location[1])) {
        defpos_y = this.location[1];
        flag = true;
        this.canvas.resource.playSe( "jump" );
        jumpcount=0;
    }
    jumpcount++;
    //ダブルジャンプ
    if (jumpcount==2) {
        doublejumpflag = true;
        this.canvas.resource.playSe( "jump" );
        i=0;

    }
    console.log("hoge");
     return true; // true：以降のCanvas/Gadgetは処理されません
	
};
//着地の判定をとる関数
player.prototype.Landing = function(playerX) {

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
//敵との判定をとる関数
player.prototype.EnemyCollision = function() {

    var Enemys = this.canvas.arrayhoge;
    var playerLeft =parseInt(this.location[0] - this.width / 2); 
    var playerTop = parseInt(this.location[1]  - this.height / 2);
    var playerRight = parseInt(playerLeft + this.width);
    var playerBottom = parseInt(playerTop + this.height);
    
        var EnemyLeft = Enemys[0].location[0] -  Enemys[0].width / 2;
        var EnemyRight = EnemyLeft +  Enemys[0].width;
        if ((playerLeft < EnemyRight) && (playerRight > EnemyLeft)) {
            var EnemyTop =  Enemys[0].location[1] -  Enemys[0].height / 2;
            var EnemyBottom = EnemyTop +  Enemys[0].height;
            if ( (playerTop < EnemyBottom)&&(playerBottom > EnemyTop)) {
            	//console.log("playerLeft="+playerLeft+"playerTop="+playerTop+"playerRight="+playerRight+"playerBottom="+playerBottom);
            	//console.log("EnemyLeft="+EnemyLeft+"EnemyTop="+EnemyTop+"EnemyRigth="+EnemyRight+"EnemyBottom="+EnemyBottom);
                return true;
            }
    }
    return false;

};