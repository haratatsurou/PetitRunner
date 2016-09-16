/**
* @fileOverview SmileBoom Tools library Ver. 1.2.8
*
* @license
* Copyright (C)2012-2013 SmileBoom Co.Ltd.
* Released under the MIT license. See http://info.petitdeveloper.com/pub/sbt_js/license/
*/

/**
* sbt.js エントリポイント 
* @namespace Sbt ライブラリ
*/
if (typeof Sbt == 'undefined') {
	/**  @namespace */
	Sbt = {};
}

(function() {
	"use strict";

	/**
	* 汎用デバッグログ関数 
	* @function
	* @param {string} msg 出力メッセージ 
	*/
	Sbt.debugLog = function(msg) {
		if (typeof window.console == "object") {
			console.log(msg);
		}
	}

	/**
	* DEG → RAD 変換用
	* @type Number
	* @const
	*/
	Sbt.DEGTORAD = Math.PI / 180;

	/**
	* RAD → DEG 変換用
	* @type Number
	* @const
	*/
	Sbt.RADTODEG = 180 / Math.PI;

	// 描画優先度 
	/**
	* 絶対優先度の下限 
	* @type Number
	* @const
	*/
	Sbt.DRAWPRIORITY_MIN = 1;
	/**
	* 絶対優先度の上限 
	* @type Number
	* @const
	*/
	Sbt.DRAWPRIORITY_MAX = 65534;
	/**
	* 背景描画の描画優先度 
	* @type Number
	* @const
	*/
	Sbt.DRAWPRIORITY_BACKGROUND = 0;
	/**
	* 最前面の描画優先度（フェード描画用） 
	* @type Number
	* @const
	*/
	Sbt.DRAWPRIORITY_FRONT = 65535;
	/**
	* メインキャンバスの描画優先度 
	* @type Number
	* @const
	*/
	Sbt.DRAWPRIORITY_CANVAS = 16384;
	/**
	* サブキャンバスの描画優先度 
	* @type Number
	* @const
	*/
	Sbt.DRAWPRIORITY_SUBCANVAS = 49151;

	// OSのタイプ
	/**
	* 不明な OS
	* @type Number
	* @const
	*/
	Sbt.OSTYPE_UNKNOWN = 0;
	/**
	* Native Player
	* @type Number
	* @const
	*/
	Sbt.OSTYPE_NATIVE = 1;
	/**
	* Windows
	* @type Number
	* @const
	*/
	Sbt.OSTYPE_WINDOWS = 2;
	/**
	* Macintosh
	* @type Number
	* @const
	*/
	Sbt.OSTYPE_MAC = 3;
	/**
	* iPhone
	* @type Number
	* @const
	*/
	Sbt.OSTYPE_IPHONE = 4;
	/**
	* iPad
	* @type Number
	* @const
	*/
	Sbt.OSTYPE_IPAD = 5;
	/**
	* android
	* @type Number
	* @const
	*/
	Sbt.OSTYPE_ANDROID = 6;
	/**
	* Wii U
	* @type Number
	* @const
	*/
	Sbt.OSTYPE_WIIU = 7;
	/**
	* Windows Phone
	* @type Number
	* @const
	*/
	Sbt.OSTYPE_WINDOWSPHONE = 8;

	/**
	* OS の種類
	* @type Number
	*/
	Sbt.osType = Sbt.OSTYPE_UNKNOWN;

	// ブラウザのタイプ
	/**
	* 不明なブラウザ
	* @type Number
	* @const
	*/
	Sbt.BROWSERTYPE_UNKNOWN = 0;
	/**
	* Firefox
	* @type Number
	* @const
	*/
	Sbt.BROWSERTYPE_NATIVE = 1;
	/**
	* Firefox
	* @type Number
	* @const
	*/
	Sbt.BROWSERTYPE_FIREFOX = 2;
	/**
	* Chrome
	* @type Number
	* @const
	*/
	Sbt.BROWSERTYPE_CHROME = 3;
	/**
	* Internet Explorer
	* @type Number
	* @const
	*/
	Sbt.BROWSERTYPE_IE = 4;
	/**
	* Safari
	* @type Number
	* @const
	*/
	Sbt.BROWSERTYPE_SAFARI = 5;
	/**
	* Opera
	* @type Number
	* @const
	*/
	Sbt.BROWSERTYPE_OPERA = 6;           //
	/**
	* NintendoBrowser
	* @type Number
	* @const
	*/
	Sbt.BROWSERTYPE_NINTENDOBROWSER = 7;

	/**
	* ブラウザ の種類
	* @type Number
	*/
	Sbt.browserType = Sbt.BROWSERTYPE_UNKNOWN;

	// 描画モード 
	/**
	* 通常描画 
	* @type String
	* @const
	*/
	Sbt.COMPOSITEMODE_NORMAL = "source-over";
	/**
	* 加算描画 
	* @type String
	* @const
	*/
	Sbt.COMPOSITEMODE_ADD = "lighter";

	/**
	* 白色 
	* @const
	*/
	Sbt.COLOR_WHITE = [255, 255, 255, 255];

	/**
	* 黒色 
	* @const
	*/
	Sbt.COLOR_BLACK = [0, 0, 0, 255];

	// OS/ブラウザの自動判定 
	(function() {
		var appVersion = navigator.appVersion.toLowerCase();
		var userAgent = navigator.userAgent.toLowerCase();

		if (window.wiiu)
			Sbt.osType = Sbt.OSTYPE_WIIU;
		else if (appVersion.indexOf("windows phone") >= 0)
			Sbt.osType = Sbt.OSTYPE_WINDOWSPHONE;
		else if (appVersion.indexOf("windows") >= 0)
			Sbt.osType = Sbt.OSTYPE_WINDOWS;
		else if (appVersion.indexOf("mac") >= 0)
			Sbt.osType = Sbt.OSTYPE_MAC;
		if (userAgent.indexOf("ipad") >= 0)
			Sbt.osType = Sbt.OSTYPE_IPAD;
		else if (userAgent.indexOf("iphone") >= 0)
			Sbt.osType = Sbt.OSTYPE_IPHONE;
		else if (userAgent.indexOf("android") >= 0)
			Sbt.osType = Sbt.OSTYPE_ANDROID;

		if (userAgent.indexOf("msie") >= 0)
			Sbt.browserType = Sbt.BROWSERTYPE_IE;
		else if (userAgent.indexOf("opera") >= 0)
			Sbt.browserType = Sbt.BROWSERTYPE_OPERA;
		else if (userAgent.indexOf("firefox") >= 0)
			Sbt.browserType = Sbt.BROWSERTYPE_FIREFOX;
		else if (appVersion.indexOf("chrome") >= 0)
			Sbt.browserType = Sbt.BROWSERTYPE_CHROME;
		else if (appVersion.indexOf("safari") >= 0)
			Sbt.browserType = Sbt.BROWSERTYPE_SAFARI;
		else if (userAgent.indexOf("nintendobrowser") >= 0)
			Sbt.browserType = Sbt.BROWSERTYPE_NINTENDOBROWSER;
	})();

	// キー定義
	/**
	* ←キー
	* @type Number
	* @const
	*/
	Sbt.SBTKEY_LEFT = 37;
	/**
	* ↑キー
	* @type Number
	* @const
	*/
	Sbt.SBTKEY_UP = 38;
	/**
	* →キー
	* @type Number
	* @const
	*/
	Sbt.SBTKEY_RIGHT = 39;
	/**
	* ↓キー
	* @type Number
	* @const
	*/
	Sbt.SBTKEY_DOWN = 40;
	/**
	* スペースキー
	* @type Number
	* @const
	*/
	Sbt.SBTKEY_SPACE = 32;
	/**
	* Zキー
	* @type Number
	* @const
	*/
	Sbt.SBTKEY_ENTER = 90;
	/**
	* Xキー
	* @type Number
	* @const
	*/
	Sbt.SBTKEY_RETURN = 88;

	/**
	* 言語の種類
	* @type string
	*/
	Sbt.language = (navigator.browserLanguage || navigator.language || navigator.userLanguage || navigator.systemLanguage);

	/**
	* @const
	* @private
	*/
	var SPEED_FLICK = 4;
	/**
	* @const
	* @private
	*/
	var RANGE_FLICK = 16;
	/**
	* @const
	* @private
	*/
	var TIME_FLICK = 1000;
	/**
	* @const
	* @private
	*/
	var TIME_TAP = 500;

	/**
	* 日本語環境かどうかを判定するショートカット 
	* @private
	*/
	var isJa = (Sbt.language.substr(0, 2) == "ja");

	/**
	* アプリケーション間でのデータやり取り用の変数プレースホルダ 
	* @type Object
	*/
	Sbt.global = {};

	/**
	* X/Y/Zの各方向の傾き加速度（m/s^2）
	* @type x, y, z
	*/
	Sbt.acceleration = { x: 0, y: 0, z: 0 };

	/**
	* X/Y/Zの各方向の重力加速度（m/s^2）
	* @type x, y, z
	*/
	Sbt.gravity = { x: 0, y: 0, z: 0 };

	/**
	* X/Y/Zの各方向の回転加速度（deg/s）
	* @type x, y, z
	*/
	Sbt.gyro = { x: 0, y: 0, z: 0 };

	/**
	* X/Y/Zの各方向の傾き（X:-90～90, Y:-180,～180, Z:0～360）
	* @type x, y, z
	*/
	Sbt.tilt = { x: 0, y: 0, z: 0 };

	/**
	* 最初の Canvas の名前
	*/
	Sbt.startCanvasId = null;

	/**
	* 線形補間
	* @function
	* @param {!Array.<number>|number} src1 開始パラメータ
	* @param {!Array.<number>|number} src2 終了パラメータ
	* @param {number} t 補間係数（0.0～1.0）
	* @return {Array.<number>|number} 補間後のパラメータ
	*/
	Sbt.lerp = function(src1, src2, t) {
		var it = 1.0 - t;

		if ((src1 instanceof Array) && (src2 instanceof Array)) {
			var result = new Array(src1.length);
			var cnt = src1.length;

			for (var i = 0; i < cnt; i++) {
				if (src1[i] != src2[i])
					result[i] = src1[i] * it + src2[i] * t;
				else
					result[i] = src1[i];
			}

			return result;
		}

		if (src1 != src2)
			return src1 * it + src2 * t;
		else
			return src1;
	};

	// 文字列を行毎に分割
	function divideText(text) {
		var texts = [];

		var line = "";

		for (var i in text) {
			var c = text[i];

			switch (c) {
				case "\r":
					break;
				case "\n":
					texts.push(line);

					line = "";
					break;
				default:
					line += c;
					break;
			}
		}

		if (line.length > 0)
			texts.push(line);

		return texts;
	};

	function createNotFoundMessage(category, id) {
		if (isJa)
			return "sbt.js：指定された " + category + "'" + id + "'は存在しません。";
		else
			return "sbt.js：" + category + " '" + id + "' does not exist.";
	};

	/**
	* 2D用アフィン変換
	* @constructor
	*/
	Sbt.Affine2D = function() {
		var hx, hy;
		switch (arguments.length) {
			case 1:
				this.m11 = arguments[0].m11;
				this.m21 = arguments[0].m21;
				this.m31 = arguments[0].m31;
				this.m12 = arguments[0].m12;
				this.m22 = arguments[0].m22;
				this.m32 = arguments[0].m32;
				break;
			case 7:
				this.scale(arguments[5], arguments[6]);
				if (arguments[4] != 0) {
					this.multiplyRotate(arguments[4]);
					this.multiplyTranslate(arguments[0], arguments[1]);
					hx = this.m11 * arguments[2] + this.m21 * arguments[3];
					hy = this.m12 * arguments[2] + this.m22 * arguments[3];
					this.multiplyTranslate(-hx, -hy);
				}
				else {
					this.multiplyTranslate(arguments[0] - this.m11 * arguments[2], arguments[1] - this.m22 * arguments[3]);
				}
				break;
			case 8:
				this.scale(arguments[6], arguments[7]);
				if (arguments[5] != 0) {
					this.multiplyRotate(arguments[5]);
					this.multiplyTranslate(arguments[1], arguments[2]);
					hx = this.m11 * arguments[3] + this.m21 * arguments[4];
					hy = this.m12 * arguments[3] + this.m22 * arguments[4];
					this.multiplyTranslate(-hx, -hy);
				}
				else {
					this.multiplyTranslate(arguments[1] - this.m11 * arguments[3], arguments[2] - this.m11 * arguments[4]);
				}
				this.multiplyLeft(arguments[0]);
				break;
			default:
				this.m11 = 1;
				this.m21 = 0;
				this.m31 = 0;
				this.m12 = 0;
				this.m22 = 1;
				this.m32 = 0;
				break;
		}
	};

	/**
	* 単位行列の初期化
	*/
	Sbt.Affine2D.prototype.identity = function() {
		this.m11 = 1;
		this.m21 = 0;
		this.m31 = 0;
		this.m12 = 0;
		this.m22 = 1;
		this.m32 = 0;
	};

	/**
	* 逆行列の取得
	* @return {Sbt.Affine2D} 逆行列
	*/
	Sbt.Affine2D.prototype.Invert = function() {
		var affine = new Sbt.Affine2D();

		affine.m11 = this.m11;
		affine.m12 = this.m12;
		affine.m21 = this.m21;
		affine.m22 = this.m22;
		affine.m31 = this.m31;
		affine.m32 = this.m32;

		var s = (this.m11 * this.m22 - this.m12 * this.m21);

		if (s == 0.0)
			return affine;

		affine.m11 = this.m22 / s;
		affine.m12 = -this.m12 / s;
		affine.m21 = -this.m21 / s;
		affine.m22 = this.m11 / s;
		affine.m31 = (this.m21 * this.m32 - this.m22 * this.m31) / s;
		affine.m32 = (this.m31 * this.m12 - this.m32 * this.m11) / s;

		return affine;
	};

	/**
	* 回転行列の作成 
	* @param {number} rad 回転角 
	*/
	Sbt.Affine2D.prototype.rotate = function(rad) {
		var s = Math.sin(rad), c = Math.cos(rad);
		this.m11 = c;
		this.m21 = -s;
		this.m31 = 0;
		this.m12 = s;
		this.m22 = c;
		this.m32 = 0;
	};

	/**
	* 回転成分を追加 
	* @param {number} rad 回転角 
	*/
	Sbt.Affine2D.prototype.multiplyRotate = function(rad) {
		if (rad != 0) {
			var s = Math.sin(rad), c = Math.cos(rad);
			var m11 = this.m11, m21 = this.m21, m31 = this.m31, m12 = this.m12, m22 = this.m22, m32 = this.m32;
			this.m11 = c * m11 - s * m12;
			this.m21 = c * m21 - s * m22;
			this.m31 = c * m31 - s * m32;
			this.m12 = c * m12 + s * m11;
			this.m22 = c * m22 + s * m21;
			this.m32 = c * m32 + s * m31;
		}
	};

	/**
	* 平行行列の作成 
	* @param {number} x
	* @param {number} y
	*/
	Sbt.Affine2D.prototype.translate = function(x, y) {
		this.m11 = 1;
		this.m21 = 0;
		this.m31 = x;
		this.m12 = 0;
		this.m22 = 1;
		this.m32 = y;
	};

	/**
	* 平行移動成分を追加 
	* @param {number} x
	* @param {number} y
	*/
	Sbt.Affine2D.prototype.multiplyTranslate = function(x, y) {
		this.m31 += x;
		this.m32 += y;
	};

	/**
	* スケール行列の作成 
	* @param {number} x
	* @param {number} y
	*/
	Sbt.Affine2D.prototype.scale = function(x, y) {
		this.m11 = x;
		this.m21 = 0;
		this.m31 = 0;
		this.m12 = 0;
		this.m22 = y;
		this.m32 = 0;
	};

	/**
	* スケール成分の追加 
	* @param {number} x
	* @param {number} y
	*/
	Sbt.Affine2D.prototype.multiplyScale = function(x, y) {
		if (x != 1) {
			this.m11 *= x;
			this.m21 *= x;
			this.m31 *= x;
		}
		if (y != 1) {
			this.m12 *= y;
			this.m22 *= y;
			this.m32 *= y;
		}
	};

	/**
	* 行列の乗算
	* @param {Sbt.Affine2D} mtx 乗算行列
	*/
	Sbt.Affine2D.prototype.multiply = function(mtx) {
		var _11, _21, _31, _12, _22, _32;

		_11 = this.m11 * mtx.m11 + this.m21 * mtx.m12;
		_21 = this.m11 * mtx.m21 + this.m21 * mtx.m22;
		_31 = this.m11 * mtx.m31 + this.m21 * mtx.m32 + this.m31;
		_12 = this.m12 * mtx.m11 + this.m22 * mtx.m12;
		_22 = this.m12 * mtx.m21 + this.m22 * mtx.m22;
		_32 = this.m12 * mtx.m31 + this.m22 * mtx.m32 + this.m32;

		this.m11 = _11;
		this.m21 = _21;
		this.m31 = _31;
		this.m12 = _12;
		this.m22 = _22;
		this.m32 = _32;
	};

	/**
	* 行列を左から掛ける 
	* @param {Sbt.Affine2D} mtx 乗算行列
	*/
	Sbt.Affine2D.prototype.multiplyLeft = function(mtx) {
		var _11, _21, _31, _12, _22, _32;

		_11 = mtx.m11 * this.m11 + mtx.m21 * this.m12;
		_21 = mtx.m11 * this.m21 + mtx.m21 * this.m22;
		_31 = mtx.m11 * this.m31 + mtx.m21 * this.m32 + mtx.m31;
		_12 = mtx.m12 * this.m11 + mtx.m22 * this.m12;
		_22 = mtx.m12 * this.m21 + mtx.m22 * this.m22;
		_32 = mtx.m12 * this.m31 + mtx.m22 * this.m32 + mtx.m32;

		this.m11 = _11;
		this.m21 = _21;
		this.m31 = _31;
		this.m12 = _12;
		this.m22 = _22;
		this.m32 = _32;
	};

	/**
	* 変換座標の取得
	* @param {number} x X座標
	* @param {number} y Y座標
	* @return {Array.<number>} 変換ベクトル（[Xベクトル, Yベクトル]）
	*/
	Sbt.Affine2D.prototype.transform = function(x, y) {
		return [this.m11 * x + this.m21 * y + this.m31, this.m12 * x + this.m22 * y + this.m32];
	};

	/**
	* 変換座標の取得
	* @param {number} x X座標
	* @param {number} y Y座標
	* @return {number} 変換後のX座標
	*/
	Sbt.Affine2D.prototype.getTransformX = function(x, y) {
		return this.m11 * x + this.m21 * y + this.m31;
	};

	/**
	* 変換座標の取得
	* @param {number} x X座標
	* @param {number} y Y座標
	* @return {number} 変換後のY座標
	*/
	Sbt.Affine2D.prototype.getTransformY = function(x, y) {
		return this.m12 * x + this.m22 * y + this.m32;
	};

	/**
	* 変換ベクトルの取得
	* @param {number} x Xベクトル
	* @param {number} y Yベクトル
	* @return {Array.<number>} 変換ベクトル（[Xベクトル, Yベクトル]）
	*/
	Sbt.Affine2D.prototype.transformVec = function(x, y) {
		return [this.m11 * x + this.m21 * y, this.m12 * x + this.m22 * y];
	};

	/**
	* 変換ベクトルの取得
	* @param {number} x Xベクトル
	* @param {number} y Yベクトル
	* @return {number} 変換後のXベクトル
	*/
	Sbt.Affine2D.prototype.getTransformXVec = function(x, y) {
		return this.m11 * x + this.m21 * y;
	};

	/**
	* 変換ベクトルの取得
	* @param {number} x Xベクトル
	* @param {number} y Yベクトル
	* @return {number} 変換後のYベクトル
	*/
	Sbt.Affine2D.prototype.getTransformYVec = function(x, y) {
		return this.m12 * x + this.m22 * y;
	};

	/**
	* 描画機能 
	* @constructor 
	*/
	Sbt.Draw2D = function(app) {
		this.app = app;
		this.html5Canvas = app.html5Canvas;

		/**
		* コンテキスト
		* @type CanvasRenderingContext2D
		*/
		this.context = app.context;

		this.fillcolorCache = -1;
		this.fillalphaCache = -1;
		this.compositeCache = Sbt.COMPOSITEMODE_NORMAL;
		this.drawableList = [];
	};

	Sbt.Draw2D.prototype.processDraw = function(clearColor) {
		var context = this.context;
		var html5Canvas = this.html5Canvas;
		context.save();
		context.textBaseline = "top";
		this.resetEnvironment();
		if (!clearColor || clearColor[3] == 0) {
			context.clearRect(0, 0, html5Canvas.width, html5Canvas.height);
		} else {
			this.setFillStyle(clearColor);
			context.fillRect(0, 0, html5Canvas.width, html5Canvas.height);
		}

		var drawable_list = this.drawableList;
		var cnt = drawable_list.length;
		var prevClippingLayer = null;

		for (var i = 0; i < cnt; i++) {
			var target = drawable_list[i].target;
			var clippingLayer;

			if (target) {
				var layer = target.parent;

				if (layer)
					clippingLayer = layer.clippingLayer;
				else
					clippingLayer = null;
			}
			else
				clippingLayer = null;

			if (prevClippingLayer != clippingLayer) {
				context.restore();

				context.save();

				if (clippingLayer) {
					context.beginPath();
					context.rect(clippingLayer.worldLocation[0], clippingLayer.worldLocation[1], clippingLayer.width, clippingLayer.height);
					context.clip();
				}

				prevClippingLayer = clippingLayer;
			}

			drawable_list[i].doDraw(this);
		}

		if (prevClippingLayer) {
			context.restore();

			context.save();
		}

		var trialImage = this.app.trialImage;
		if (trialImage) {
			if (trialImage && trialImage.width > 0) {
				this.setEnvironment(Sbt.COLOR_WHITE, Sbt.COMPOSITEMODE_NORMAL);
				context.drawImage(trialImage, html5Canvas.width - trialImage.width, html5Canvas.height - trialImage.height);
			}
		}

		this.context.restore();
	};

	Sbt.Draw2D.prototype.clearDrawList = function() {
		this.drawableList.length = 0;
	};

	/**
	* 描画リストに登録する 
	* @private
	* @param {Object} drawable
	*/
	Sbt.Draw2D.prototype.addDrawable = function(drawable) {
		var ary = this.drawableList;
		var mid;
		var lo = 0;
		var hi = ary.length;
		var x = drawable.drawPriority;
		while (lo < hi) {
			mid = Math.floor((lo + hi) / 2);
			if (x < ary[mid].drawPriority)
				hi = mid;
			else
				lo = mid + 1;
		}
		ary.splice(lo, 0, drawable);
	};

	/**
	* キャッシュを利用し高速に、context.fillStyle を指定した輝度に設定します
	* @function
	* @param {Array.<number>} color_rgba 設定する輝度
	*/
	Sbt.Draw2D.prototype.setFillStyle = function(color_rgba) {
		var context = this.context;
		if (color_rgba instanceof Array) {
			var r = Math.floor(color_rgba[0]);
			var g = Math.floor(color_rgba[1]);
			var b = Math.floor(color_rgba[2]);
			var c = (b << 16) | (g << 8) | r;
			var a = (color_rgba.length == 4) ? (color_rgba[3] / 255) : 1.0;
			if (c != this.fillcolorCache) {
				context.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
				this.fillcolorCache = c;
			}
			if (a != this.fillalphaCache) {
				context.globalAlpha = a;
				this.fillalphaCache = a;
			}
		} else {
			context.globalAlpha = 1;
			context.fillStyle = color_rgba;
			this.fillcolorCache = -1;
			this.fillalphaCache = -1;
		}
	};

	/**
	* context.fillStyle を指定した輝度に設定し、キャッシュをリセットします
	* @function
	* @param {Array.<number>} color_rgba 設定する輝度
	*/
	Sbt.Draw2D.prototype.resetFillStyle = function(color_rgba) {
		var context = this.context;
		if (color_rgba instanceof Array) {
			var c = (color_rgba[2] << 16) | (color_rgba[1] << 8) | color_rgba[0];
			var a = (color_rgba.length == 4) ? (color_rgba[3] / 255) : 1.0;
			context.fillStyle = 'rgb(' + color_rgba[0] + ',' + color_rgba[1] + ',' + color_rgba[2] + ')';
			this.fillcolorCache = c;
			context.globalAlpha = a;
			this.fillalphaCache = a;
		} else {
			context.globalAlpha = 1;
			context.fillStyle = color_rgba;
			this.fillcolorCache = -1;
			this.fillalphaCache = -1;
		}
	};

	/**
	* キャッシュを利用して高速に描画モードを設定します 
	* @function
	* @param {String} mode 設定する描画モード 
	*/
	Sbt.Draw2D.prototype.setCompositeMode = function(mode) {
		if (this.compositeCache != mode) {
			this.context.globalCompositeOperation = mode;
			this.compositeCache = mode;
		}
	};

	/**
	* 描画モードを設定し、キャッシュをリセットします。 
	* @function
	* @param {String} mode 設定する描画モード 
	*/
	Sbt.Draw2D.prototype.resetCompositeMode = function(mode) {
		this.context.globalCompositeOperation = mode;
		this.compositeCache = mode;
	};

	/**
	* 描画前のコンテキスト設定
	* @oaram {Array.<number>} drawColor 描画色 
	* @param {String} mode 描画モード 
	* @param {Sbt.Affine2D=} affine 描画行列 
	* @param {Array.<number>=} 描画オフセット 
	*/
	Sbt.Draw2D.prototype.setEnvironment = function(drawColor, compositeMode, affine, offset) {
		var context = this.context;

		if (!affine) {
			context.setTransform(1, 0, 0, 1, 0, 0);
		} else {
			var ofsx, ofsy;
			if (offset) {
				ofsx = offset[0];
				ofsy = offset[1];
			} else {
				ofsx = 0;
				ofsy = 0;
			}
			context.setTransform(affine.m11, affine.m12, affine.m21, affine.m22, affine.m31 + ofsx, affine.m32 + ofsy);
		}

		if (drawColor instanceof Array) {
			var r = Math.floor(drawColor[0]);
			var g = Math.floor(drawColor[1]);
			var b = Math.floor(drawColor[2]);
			var c = (b << 16) | (g << 8) | r;
			var a = (drawColor.length == 4) ? (drawColor[3] / 255) : 1.0;
			if (c != this.fillcolorCache) {
				context.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
				this.fillcolorCache = c;
			}
			if (a != this.fillalphaCache) {
				context.globalAlpha = a;
				this.fillalphaCache = a;
			}
		} else {
			context.globalAlpha = 1;
			context.fillStyle = drawColor;
			this.fillcolorCache = -1;
			this.fillalphaCache = -1;
		}

		if (this.compositeCache != compositeMode) {
			this.context.globalCompositeOperation = compositeMode;
			this.compositeCache = compositeMode;
		}
	};

	/**
	* コンテキスト設定初期化 
	*/
	Sbt.Draw2D.prototype.resetEnvironment = function() {
		var context = this.context;
		this.fillcolorCache = -1;
		this.fillalphaCache = -1;
		context.globalCompositeOperation = this.compositeCache = Sbt.COMPOSITEMODE_NORMAL;
		context.setTransform(1, 0, 0, 1, 0, 0);
	};

	/** @const */var ANGLE90 = 90 * Math.PI / 180;
	/** @const */var ANGLE180 = 180 * Math.PI / 180;
	/** @const */var ANGLE270 = 270 * Math.PI / 180;

	/**
	* 角の丸まった矩形を描画する 
	* @function
	* @param {number}  left	   左上X座標 
	* @param {number}  top	   左上Y座標 
	* @param {number}  width   高さ 
	* @param {number}  height  幅 
	* @param {number=}  round   角丸の半径。0もしくは省略で通常の矩形 
	*/
	Sbt.Draw2D.prototype.fillRoundRect = function(left, top, width, height, round) {
		var context = this.context;

		if (!round) {
			context.fillRect(left, top, width, height);
		} else {
			context.beginPath();
			context.arc(left + width - round, top + round, round, ANGLE270, 0, false);
			context.arc(left + width - round, top + height - round, round, 0, ANGLE90, false);
			context.arc(left + round, top + height - round, round, ANGLE90, ANGLE180, false);
			context.arc(left + round, top + round, round, ANGLE180, ANGLE270, false);
			context.closePath();

			context.fill();
		}
	};

	/**
	* @const
	* @private
	*/
	var FONTTYPE_WEB = 0;

	/**
	* @const
	* @private
	*/
	var FONTTYPE_BROWSER = 1;

	/**
	* @const
	* @private
	*/
	var FONTTYPE_IMAGE = 2;

	/**
	* @const
	* @private
	*/
	var CHECK_TEXT_WEBFONT = "8W８Ｗ";

	var audioContext = null;

	/**
	* @private
	* イメージ管理 
	* @constructor
	* @param {Number} width
	* @param {Number} height
	* @param {String} src
	* @param? {String} id
	*/
	Sbt.Image = function(width, height, src, id) {
		this.width = width;
		this.height = height;
		this.src = src;
		this.id = (id) ? id : src;
		this.loaded = false;
		this.error = false;
		this.image = new Image();

		var self = this;
		this.image.onload = function() {
			self.loaded = true;
			Sbt.debugLog("sbt.js : image " + self.id + " loaded");
			if (self.onLoad) {
				self.onLoad(true);
				self.onLoad = null;
			}
		}
		this.image.onerror = function() {
			self.loaded = true;
			self.error = false;
			Sbt.debugLog("sbt.js : image " + self.id + " failed to load");
			if (self.onLoad) {
				self.onLoad(false);
				self.onLoad = null;
			}
		}
	}

	/**
	* 画像読み込みを開始する 
	* @param? {Function} callback
	*/
	Sbt.Image.prototype.load = function(callback) {
		if (this.loaded || this.image.src != "") {
			if (callback)
				callback(true);
			return;
		}
		this.onLoad = callback;
		this.image.src = this.src;
		this.src = this.image.src;
	}

	/**
	* Imageオブジェクトを解放する 
	*/
	Sbt.Image.prototype.unload = function() {
		if (!this.loaded)
			return;
		this.image.src = "";
		this.loaded = false;
		this.error = false;
	}

	/**
	* リソース管理
	* @constructor
	* @param {Sbt.App} app
	* @param {Object} sbtdata
	* @param {string} url プロジェクトのURL
	*/
	Sbt.Resource = function(app, sbtdata, url) {
		this.initialize(app, sbtdata, url);
	};

	Sbt.Resource.getExtension = function(inFilePath) {
		var token = inFilePath.split(".");
		return token[token.length - 1];
	}

	var WEB_AUDIO_API_VOLUME_RATIO = 0.5;

	/**
	* @private
	* WebAudioAPIを用いたSoundクラス
	*/
	var WebAudioAPISound = function(wave, isBgm) {
		this.buffer = null;

		this.volume = wave.Volume * WEB_AUDIO_API_VOLUME_RATIO;
		this.isLoop = wave.Loop != 1;

		this.wave = wave;
		this.playFailed = false;

		/**
		* @private
		*/
		this.load = function() {
			var sound = this;

			var source = this.wave.sources[0];
			var xhr = new XMLHttpRequest();
			xhr.open("GET", source, true);
			xhr.responseType = "arraybuffer";

			xhr.send();

			xhr.onload = function() {
				audioContext.decodeAudioData(
					xhr.response,
					function(resultBuffer) {
						wave.loaded = true;
						sound.buffer = resultBuffer;
					},
					function(errorMessage) {
						wave.loaded = true;
						alert("sbt.js：" + errorMessage);
					}
				);
			};
		};

		/**
		* @private
		*/
		this.play = function(playFailed, masterVolume, volume, pitch, panpot) {
			this.playFailed = (playFailed != undefined && playFailed == true) || (this.buffer == null);
			if (this.playFailed) {
				return;
			}

			this.source = audioContext.createBufferSource();
			try {
				this.source.buffer = this.buffer;
			}
			catch (e) {
			}

			this.source.start = this.source.start || this.source.noteOn;
			this.source.stop = this.source.stop || this.source.noteOff;

			this.gain = audioContext.createGain();
			this.gain.connect(audioContext.destination);
			this.panner = audioContext.createPanner();
			this.panner.connect(this.gain);

			this.source.loop = this.isLoop;
			this.source.connect(this.panner);

			this.source.start(0);

			this.setVolume(masterVolume, volume);
			this.setPitch(pitch);
			this.setPanpot(panpot);
		};

		/**
		* @private
		*/
		this.pause = function() {
			this.stop();
		};

		/**
		* @private
		*/
		this.stop = function() {
			if (!this.playFailed)
				this.source.stop(0);
		};

		/**
		* @private
		*/
		this.refresh = function() {
		};

		/**
		* @private
		*/
		this.setVolume = function(masterVolume, volume) {
			if (!this.source)
				return;

			if (volume == undefined)
				volume = this.volume;
			else
				this.volume = volume;

			this.gain.gain.value = volume * masterVolume;
		};

		/**
		* @private
		*/
		this.setPitch = function(pitch) {
			if (!this.source)
				return;

			if (pitch == undefined)
				pitch = 0;
			else if (pitch < -4800)
				pitch = -4800;
			else if (pitch > 4800)
				pitch = 4800;

			this.source.playbackRate.value = Math.pow(2, pitch / 12 / 100);
		};

		/**
		* @private
		*/
		this.setPanpot = function(pan) {
			if (!this.source)
				return;

			if (pan == undefined)
				pan = 0;
			else if (pan < -1)
				pan = -1;
			else if (pan > 1)
				pan = 1;

			this.panner.setPosition(pan * 10, 0, -0.5);
		};
	};

	/**
	* @private
	* Audioタグを用いたSoundクラス
	*/
	var AudioTagSound = function(wave, isBgm) {
		this.audio = new Audio();

		this.volume = wave.Volume;

		this.audio.autoplay = false;

		if (isBgm) {
			this.audio.preload = "metadata";
		}
		else {
			this.audio.preload = "auto";

			this.audio.addEventListener('loadeddata',
				function() {
					wave.loaded = true;
				},
				true
			);
		}

		for (var i in wave.sources) {
			var src = document.createElement("Source");

			src.src = wave.sources[i];

			this.audio.appendChild(src);
		}

		var audioTag = this.audio;
		if (wave.Loop != 1) {
			this.audio.addEventListener("ended",
				function() {
					audioTag.currentTime = 0;
					audioTag.play();
				},
				true
			);
		}

		this.load = function(isIE) {
			if (isIE) {
				this.audio.load();
			}
			else {
				this.audio.play();
				this.audio.pause();
			}
		};

		this.play = function(playFailed, masterVolume, volume, pitch, panpot) {
			this.playFailed = (playFailed != undefined && playFailed == true);
			if (this.playFailed) {
				return;
			}

			this.setVolume(masterVolume, volume);
			this.setPitch(pitch);
			this.setPanpot(panpot);

			this.audio.play();
		};

		this.pause = function() {
			this.audio.pause();
		};

		this.stop = function() {
			this.audio.stop();
		};

		this.refresh = function(isAndroidChrome) {
			var sourceAudio = this.audio;

			if (isAndroidChrome) {
				if (sourceAudio.src != "") {
					this.audio = new Audio(sourceAudio.src);
					this.audio.volume = sourceAudio.volume;
					this.audio.preload = sourceAudio.preload;
				}
			}
			else if (sourceAudio.currentSrc != "") {
				this.audio = new Audio(sourceAudio.currentSrc);
				this.audio.volume = sourceAudio.volume;
				this.audio.preload = sourceAudio.preload;
			}
		};

		this.setVolume = function(masterVolume, volume) {
			if (volume == undefined)
				volume = this.volume;
			else
				this.volume = volume;

			this.audio.volume = volume * masterVolume;
		};

		this.setPitch = function(pitch) {
		};

		this.setPanpot = function(pan) {
		};
	};

	/**
	* @private
	* @param {Sbt.App} app
	* @param {Object} sbtdata
	* @param {string} url プロジェクトのURL
	*/
	Sbt.Resource.prototype.initialize = function(app, sbtdata, url) {
		var i, res, resDic;

		this.app = app;
		this.url = url;

		// Image の初期化
		this.imageDic = {};

		resDic = sbtdata["ImageDic"];

		if (resDic) {
			for (i in resDic) {
				res = resDic[i];

				if (res["Key"] && res["Value"]) {
					this.imageDic[res["Key"]] = new Sbt.Image(res["Value"]["Width"], res["Value"]["Height"], url + res["Value"]["Src"], res["Key"]);
				}
			}
		}

		// Text の初期化
		this.textDic = {};

		resDic = sbtdata["TextDic"];

		if (resDic) {
			for (i in resDic) {
				res = resDic[i];

				if (res["Key"] && res["Value"])
					this.textDic[res["Key"]] = res["Value"];
			}
		}

		// Font の初期化
		this.fontDic = {};

		resDic = sbtdata["FontDic"];

		if (resDic) {
			for (i in resDic) {
				res = resDic[i];

				if (res["Key"] && res["Value"]) {
					var font = res["Value"];

					font.loaded = (font["FontType"] != FONTTYPE_WEB);

					if (!font.loaded)
						font.checkSize = app.context.measureText(CHECK_TEXT_WEBFONT);

					font.arrangementParamDic = [];

					for (var j in font["ArrangementDic"]) {
						var arrangement = font["ArrangementDic"][j];

						font.arrangementParamDic[arrangement["Key"]] = arrangement["Value"];
					}

					this.fontDic[res["Key"]] = font;
				}
			}
		}

		// オーディオの初期化

		if (window.webkitAudioContext != undefined) {
			if (!audioContext) {
				audioContext = new window.webkitAudioContext();
				audioContext.createGain = audioContext.createGain || audioContext.createGainNode;
			}

			Sbt.Sound = WebAudioAPISound;

			Sbt.debugLog("sbt.js：use webkit audio context");
		}
		else if (window.AudioContext != undefined) {
			if (!audioContext) {
				audioContext = new window.AudioContext();
				audioContext.createGain = audioContext.createGain || audioContext.createGainNode;
			}

			Sbt.Sound = WebAudioAPISound;

			Sbt.debugLog("sbt.js：use audio context");
		}
		else {
			Sbt.Sound = AudioTagSound;

			Sbt.debugLog("sbt.js：use html5 audio tag");
		}

		this.seDic = {};

		this.initializeWave(this.seDic, sbtdata["SEDic"], false);

		this.bgmDic = {};

		this.initializeWave(this.bgmDic, sbtdata["BGMDic"], true);

		/**
		* SE のマスターボリューム
		* @type Number
		*/
		this.seMasterVolume = 1;

		/**
		* BGM のマスターボリューム
		* @type Number
		*/
		this.bgmMasterVolume = 1;

		/**
		* SE のミュート
		* @type Number
		*/
		this.seMute = false;

		/**
		* BGM のミュート
		* @type Number
		*/
		this.bgmMute = false;

		this.loadingAudioList = [];

		switch (Sbt.osType) {
			case Sbt.OSTYPE_ANDROID:
				// android は後で読み込ませる
				this.wavePreload = false;
				this.firstTouchAfter = false;
				break;
			case Sbt.OSTYPE_WIIU:
				// Wii U は Audio 未対応
				this.wavePreload = true;
				break;
			case Sbt.OSTYPE_IPHONE:
			case Sbt.OSTYPE_IPAD:
				// iOS は最初のタッチの後に再生開始する
				this.firstTouchAfter = false;
				// breakしない
			default:
				// PC等では最初に SE/BGM を読み込ませる
				this.loadWave(this.seDic);
				this.loadWave(this.bgmDic);
				this.wavePreload = true;
				break;
		}

		this.playingBgm = null;

		if (sbtdata["TrialImageSrc"]) {
			this.trialImage = new Image();
			this.trialImage.src = sbtdata["TrialImageSrc"];
		}
	};

	/**
	* @private
	* @param {Object} waveDic
	* @param {Object} resDic
	*/
	Sbt.Resource.prototype.initializeWave = function(waveDic, resDic, isBgm) {
		if (!resDic)
			return;

		for (var i in resDic) {
			var res = resDic[i];
			var key = res["Key"];
			var value = res["Value"];

			if (key && value) {
				var srcs = value["Srcs"];
				var sources = [];

				for (var i in srcs)
					sources[i] = this.url + srcs[i];

				waveDic[key] = {
					Volume: value["Volume"],
					Loop: value["Loop"],
					sources: sources
				};
				var wave = waveDic[key];
				wave.sound = new Sbt.Sound(wave, isBgm);
			}
		}
	};

	Sbt.Resource.prototype.loadWave = function(waveDic) {
		var isIE = Sbt.browserType == Sbt.BROWSERTYPE_IE;

		for (var i in waveDic) {
			if (audioContext)
				this.loadingAudioList.push(waveDic[i]);

			waveDic[i].sound.load(isIE);
		}
	};

	/**
	* Image の検索
	* @param {string} id Image の名前
	* @return {Object} Image
	*/
	Sbt.Resource.prototype.findImage = function(id) {
		var res = this.imageDic[id];

		if (!res)
			Sbt.debugLog(createNotFoundMessage("Image", id));

		return res;
	};

	/**
	* Text の検索
	* @param {string} id Text の名前
	* @return {Object} Text
	*/
	Sbt.Resource.prototype.findText = function(id) {
		var res = this.textDic[id];

		if (res) {
			var texts = res.Texts;
			var text = "";

			if (texts.length == 1)
				text = texts[0];
			else if (texts.length > 0) {
				for (var i in texts)
					text += texts[i] + "\n";
			}

			res.text = text;
		}
		else
			Sbt.debugLog(createNotFoundMessage("Text", id));

		return res;
	};

	/**
	* Font の検索
	* @param {string} id Font の名前
	* @return {Object} Font
	*/
	Sbt.Resource.prototype.findFont = function(id) {
		var res = this.fontDic[id];

		if (!res)
			Sbt.debugLog(createNotFoundMessage("Font", id));

		return res;
	};

	/**
	* SE の検索
	* @param {string} id SE の名前
	* @return {Object} SE
	*/
	Sbt.Resource.prototype.findSe = function(id) {
		var res = this.seDic[id];

		if (!res)
			Sbt.debugLog(createNotFoundMessage("SE", id));

		return res;
	};

	/**
	* BGM の検索
	* @param {string} id BGM の名前
	* @return {Object} BGM
	*/
	Sbt.Resource.prototype.findBgm = function(id) {
		var res = this.bgmDic[id];

		if (!res)
			Sbt.debugLog(createNotFoundMessage("BGM", id));

		return res;
	};

	/**
	* Image の読み込みと取得
	* @param {string} id 名前
	* @return {Object} Image
	*/
	Sbt.Resource.prototype.getImage = function(id) {
		var image = this.findImage(id);

		if (image) {
			if (!image.loaded)
				image.load();

			return image;
		}

		return null;
	};

	/**
	* SE のマスターボリュームの変更
	* @param {Number} volume ボリューム
	*/
	Sbt.Resource.prototype.setSeMasterVolume = function(volume) {
		if (volume < 0)
			this.seMasterVolume = 0;
		else if (volume > 1)
			this.seMasterVolume = 1;
		else
			this.seMasterVolume = volume;
	};

	/**
	* BGM のマスターボリュームの変更
	* @param {Number} volume ボリューム
	*/
	Sbt.Resource.prototype.setBgmMasterVolume = function(volume) {
		if (volume < 0)
			this.bgmMasterVolume = 0;
		else if (volume > 1)
			this.bgmMasterVolume = 1;
		else
			this.bgmMasterVolume = volume;

		var playingBgm = this.playingBgm;

		if (playingBgm)
			playingBgm.setVolume(this.bgmMasterVolume);
	};

	/**
	* SE のミュートの変更
	* @param {boolean} mute ミュート
	*/
	Sbt.Resource.prototype.setSeMute = function(mute) {
		this.seMute = mute;
	};

	/**
	* BGM のミュートの変更
	* @param {boolean} mute ミュート
	*/
	Sbt.Resource.prototype.setBgmMute = function(mute) {
		this.bgmMute = mute;

		var playingBgm = this.playingBgm;

		if (playingBgm)
			playingBgm.pause();
	};

	/**
	* @private
	* @param {Object} sound
	* @param {Number} masterVolume
	* @param {Number} volume
	* @param {Number} pitch
	* @param {Number} panpot
	* @return {Object} Audio
	*/
	Sbt.Resource.prototype.playWave = function(sound, masterVolume, volume, pitch, panpot) {
		if (sound) {
			// iOSの場合、再生権限が無いまま再生しようとするとその後一切音が出なくなるのでその対策
			sound.play(this.firstTouchAfter == false, masterVolume, volume, pitch, panpot);
		}

		return sound;
	};

	/**
	* SE のロード
	* @param {string} id 名前
	*/
	Sbt.Resource.prototype.loadSe = function(id) {
		var se = this.findSe(id);

		if (!se)
			return;

		se.sound.load(Sbt.browserType == Sbt.BROWSERTYPE_IE);
	};

	/**
	* SE の再生
	* @param {string} id 名前
	* @param {Number} [volume] ボリューム（省略時：1）
	* @param {Number} [pitch] ピッチ（省略時：1）
	* @param {Number} [panpot] パン（省略時：0）
	*/
	Sbt.Resource.prototype.playSe = function(id, volume, pitch, panpot) {
		if (this.seMute)
			return;

		var se = this.findSe(id);

		if (!se)
			return null;

		var playAudio = this.playWave(se.sound, this.seMasterVolume, volume, pitch, panpot);
		se.sound.refresh(Sbt.osType == Sbt.OSTYPE_ANDROID && Sbt.browserType == Sbt.BROWSERTYPE_CHROME);

		return playAudio;
	};

	/**
	* ループ再生中の SE の停止
	* @param {string} id 名前
	*/
	Sbt.Resource.prototype.stopLoopSe = function(id) {
		var se = this.findSe(id);

		if (!se || wave.Loop == 1)
			return;

		if (se.sound)
			se.sound.pause();
	};

	/**
	* BGM のロード
	* @param {string} id 名前
	*/
	Sbt.Resource.prototype.loadBgm = function(id) {
		var bgm = this.findBgm(id);

		if (!bgm)
			return;

		bgm.sound.load(Sbt.browserType == Sbt.BROWSERTYPE_IE);
	};

	/**
	* BGM の再生
	* @param {string} id 名前
	*/
	Sbt.Resource.prototype.playBgm = function(id) {
		if (this.playingBgm)
			this.playingBgm.pause();

		if (this.bgmMute)
			return;

		var bgm = this.findBgm(id);

		if (bgm)
			this.playingBgm = this.playWave(bgm.sound, this.bgmMasterVolume);
		else
			this.playingBgm = null;

		return this.playingBgm;
	};

	/**
	* BGM の停止
	*/
	Sbt.Resource.prototype.stopBgm = function() {
		if (!this.playingBgm)
			return;

		this.playingBgm.pause();
		this.playingBgm = null;
	};

	/**
	* SE のボリュームの変更
	* @param {string} id 名前
	* @param {Number} volume ボリューム
	*/
	Sbt.Resource.prototype.setSeVolume = function(id, volume) {
		var se = this.findSe(id);

		if (!se)
			return;

		se.sound.setVolume(this.seMasterVolume, volume);
	};

	/**
	* SE のピッチの変更
	* @param {string} id 名前
	* @param {Number} [pitch] ピッチ（省略時：0）
	*/
	Sbt.Resource.prototype.setSePitch = function(id, pitch) {
		var se = this.findSe(id);

		if (!se)
			return;

		se.sound.setPitch(pitch);
	};

	/**
	* SE のパンの変更
	* @param {string} id 名前
	* @param {Number} [panpot] パン（省略時：0）
	*/
	Sbt.Resource.prototype.setSePanpot = function(id, panpot) {
		var se = this.findSe(id);

		if (!se)
			return;

		se.sound.setPanpot(panpot);
	};

	/**
	* Text の文字列を指定した文字列に変更
	* @param {string} id 名前
	* @param {string} text 文字列
	*/
	Sbt.Resource.prototype.setText = function(id, text) {
		var res = this.findText(id);

		if (!res)
			return;

		res.Texts = divideText(text);
	};

	/**
	* Text の文字列を指定した Text の文字列に変更
	* @param {string} srcid 名前
	* @param {string} dstid 変更元の Text の名前
	*/
	Sbt.Resource.prototype.setTextFromResource = function(srcid, dstid) {
		var dstres = this.findText(dstid);

		if (dstres)
			this.setText(srcid, dstres.text);
	};

	/**
	* @private
	* @param {Sbt.Animation} parent
	* @param {Sbt.Gadget} target
	* @param {String} id
	* @param {Number} type
	* @param {Object} settingParam
	* @param {Array.<Object>} frameList
	* @return {Sbt.Animation}
	*/
	function createAnimation(parent, target, id, type, settingParam, frameList) {
		if (!parent)
			parent = null;

		var animation = new Sbt.Animation(parent, target, id, { "Setting": { "Type": type, "Param": settingParam, "ReturnTop": false, "LoopType": LOOPTYPE_NONE }, "FrameList": frameList, "ChildDic": {} });

		if (parent) {
			var root = parent.getRootAnimation();

			parent.childList.push(animation);

			if (id)
				root.childDic[id] = animation;

			if (root == target.animation)
				animation.restart();
		}
		else if (id)
			target.animationDic[id] = animation;

		return animation;
	};

	/**
	* @private
	* @param {Sbt.Animation} parent
	* @param {Sbt.Gadget} target
	* @param {String} id
	* @param {String} imageId
	* @param {Number} left
	* @param {Number} top
	* @param {Number} width
	* @param {Number} height
	* @param {Number} a
	* @param {Array.<number>} offset
	* @param {Array.<number>} center
	* @return {Sbt.Animation} Animation
	*/
	function createImageAnimation(parent, target, id, imageId, x, y, width, height, a, offset, center) {
		var settingParam = {};

		settingParam["ImageName"] = imageId;

		if (!(offset instanceof Array))
			offset = [0, 0];
		if (!a && a != 0)
			a = 255;
		if (!(center instanceof Array))
			center = [width / 2, height / 2];

		var frameList = [{ "PatternRect": { "x": x, "y": y, "width": width, "height": height }, "Offset": offset, "Center": [-center[0], -center[1]], "Color": [255, 255, 255, a]}];

		return createAnimation(parent, target, id, DRAWTYPE_IMAGE, settingParam, frameList);
	};

	/**
	* @private
	* @param {Sbt.Animation} parent
	* @param {Sbt.Gadget} target
	* @param {String} id
	* @param {Number} width
	* @param {Number} height
	* @param {Array.<number>} color
	* @param {Boolean} roundCorner
	* @param {Number} roundSize
	* @param {Array.<number>} offset
	* @param {Array.<number>} center
	* @return {Sbt.Animation} Animation
	*/
	function createBoxAnimation(parent, target, id, width, height, color, roundCorner, roundSize, offset, center) {
		var settingParam = {};

		settingParam["Width"] = width;
		settingParam["Height"] = height;
		settingParam["RoundSize"] = (roundCorner) ? roundSize : 0;

		if (!(color instanceof Array))
			color = [255, 255, 255, 255];
		if (!(center instanceof Array))
			center = [width / 2, height / 2];

		var frameList = [{ "Offset": offset, "Center": [-center[0], -center[1]], "Color": color}];

		return createAnimation(parent, target, id, DRAWTYPE_BOX, settingParam, frameList);
	};

	/**
	* @private
	* @param {Sbt.Animation} parent
	* @param {Sbt.Gadget} target
	* @param {String} id
	* @param {String} textId
	* @param {String} fontId
	* @param {Number} fontSize
	* @param {Number} width
	* @param {Number} height
	* @param {Array.<number>} color
	* @param {Boolean} autoReturn
	* @param {Sbt.ALIGNTYPE_*}
	* @param {Array.<number>} offset
	* @param {Array.<number>} center
	* @return {Sbt.Animation} Animation
	*/
	function createTextAnimation(parent, target, id, textId, fontId, fontSize, width, height, color, autoReturn, textAlign, offset, center) {
		var settingParam = {};

		settingParam["TextName"] = textId;
		settingParam["FontName"] = fontId;
		settingParam["FontSize"] = fontSize;
		settingParam["Width"] = width;
		settingParam["Height"] = height;
		settingParam["AutoReturn"] = autoReturn;

		if (textAlign)
			settingParam["AlignType"] = textAlign;
		else
			settingParam["AlignType"] = Sbt.ALIGNTYPE_LEFTTOP;
		if (!(color instanceof Array))
			color = [255, 255, 255, 255];
		if (!(center instanceof Array))
			center = [width / 2, height / 2];

		var frameList = [{ "Offset": offset, "Center": [-center[0], -center[1]], "Color": color}];

		return createAnimation(parent, target, id, DRAWTYPE_TEXT, settingParam, frameList);
	};

	/**
	* Animation
	* @constructor
	* @param {Sbt.Animation} parent
	* @param {Sbt.Node} target
	* @param {string} id
	* @param {Object} param
	*/
	Sbt.Animation = function(parent, target, id, param) {
		this.initialize(parent, target, id, param);
	};

	/**
	* @const
	* @private
	*/
	var DRAWTYPE_NODE = 0;
	/**
	* @const
	* @private
	*/
	var DRAWTYPE_IMAGE = 1;
	/**
	* @const
	* @private
	*/
	var DRAWTYPE_BOX = 2;
	/**
	* @const
	* @private
	*/
	var DRAWTYPE_TEXT = 3;

	/**
	* @const
	* @private
	*/
	var LOOPTYPE_NONE = 0;
	/**
	* @const
	* @private
	*/
	var LOOPTYPE_COUNT = 1;
	/**
	* @const
	* @private
	*/
	var LOOPTYPE_INFINITY = 2;

	/**
	* @const
	* @private
	*/
	var DRAWCOMPOSITETYPE_ALPHA = 0;
	/**
	* @const
	* @private
	*/
	var DRAWCOMPOSITETYPE_ADD = 1;

	/**
	* @private
	* @param {Sbt.Animation} parent
	* @param {Sbt.Node} target
	* @param {string} id
	* @param {Object} param
	*/
	Sbt.Animation.prototype.initialize = function(parent, target, id, param) {
		/**
		* 名前
		* @type string
		*/
		this.id = id;
		this.parent = parent;
		this.target = target;
		this.drawNext = null; // アニメ内での描画順の制御用

		this.affine = new Sbt.Affine2D();

		/**
		* 描画時の表示優先度
		* @type Number
		*/
		this.drawPriority = 0;
		/**
		* 描画時の中心点
		* @type [x, y]
		*/
		this.drawCenter = [0, 0];
		/**
		* 描画時の角度Z
		* @type Number
		*/
		this.drawRotation = 0;
		/**
		* 描画時のスケール
		* @type [x, y]
		*/
		this.drawScale = [1, 1];
		/**
		* 描画時のオフセット
		* @type [x, y]
		*/
		this.drawOffset = [0, 0];
		/**
		* 描画時の輝度
		* @type [r, g, b, a]
		*/
		this.drawColor = [255, 255, 255, 255];
		/**
		* 描画モード 
		* @type String
		*/
		this.compositeMode = Sbt.COMPOSITEMODE_NORMAL;

		this.param = param;
		this.currentFrame = null;
		this.lerpFrame = null;
		this.time = 0;
		this.reverse = false;
		/**
		* 一時停止中
		* @type boolean
		*/
		this.isPause = false;
		this.nextStop = false;
		/**
		* 停止中
		* @type boolean
		*/
		this.isEnd = false;
		/**
		* 最終フレーム
		* @type boolean
		*/
		this.isLastFrame = false;

		if (!parent)
			this.childDic = [];

		this.childList = [];

		if (!param)
			return;

		var setting = param["Setting"];
		var settingParam = setting["Param"];
		var resource = this.target.canvas.resource;
		var imageItem;
		var image;

		this.type = setting["Type"];

		if (setting["DrawCompositeType"] == DRAWCOMPOSITETYPE_ADD)
			this.compositeMode = Sbt.COMPOSITEMODE_ADD;

		switch (this.type) {
			case DRAWTYPE_IMAGE:
				{
					imageItem = resource.getImage(settingParam["ImageName"]);
					var width, height;

					if (imageItem) {
						image = imageItem.image;
						width = imageItem.width;
						height = imageItem.height;

						this.target.canvas.addUseImage(imageItem);
					}
					else {
						image = null;
						width = 0;
						height = 0;
					}

					this.baseWidth = width;
					this.baseHeight = height;
					this.image = image;
				}
				break;
			case DRAWTYPE_BOX:
				{
					this.width = settingParam["Width"];
					this.height = settingParam["Height"];
				}
				break;
			case DRAWTYPE_TEXT:
				{
					this.textRes = resource.findText(settingParam["TextName"]);
					this.font = resource.findFont(settingParam["FontName"]);

					this.texts = [];
					this.columnSpace = settingParam["ColumnSpace"];
					this.lineSpace = settingParam["LineSpace"];
					this.adjustX = settingParam["AdjustX"];
					this.adjustY = settingParam["AdjustY"];

					if (this.textRes)
						this.texts = this.textRes.Texts;

					this.imageFontHeight = 0;

					if (this.font) {
						if (this.font["FontType"] == FONTTYPE_IMAGE) {
							this.fontName = null;
							imageItem = resource.getImage(this.font["ImageName"]);
							this.imageFontHeight = this.font["BaseRect"]["height"];

							this.target.canvas.addUseImage(imageItem);
							this.image = imageItem.image;
						}
						else
							this.fontName = "'" + this.font["FontName"] + "'";
					}
					else
						this.fontName = "sans-serif";

					this.fontSize = settingParam["FontSize"];

					this.width = settingParam["Width"];
					this.height = settingParam["Height"];
					this.textSize = { width: 0, height: 0 };
					this.autoReturn = settingParam["AutoReturn"];

					this.initializeText();
				}
				break;
			default:
				this.width = 0;
				this.height = 0;
				break;
		}

		var frameList = param["FrameList"];

		for (var i in frameList) {
			var frame = frameList[i];
			var patternRect = frame["PatternRect"];

			if (this.type == DRAWTYPE_IMAGE) {
				frame.x = patternRect["x"];
				frame.y = patternRect["y"];
			}

			frame.w = patternRect["width"];
			frame.h = patternRect["height"];

			if (!frame["Offset"])
				frame["Offset"] = [0, 0];
			if (!frame["Priority"])
				frame["Priority"] = 0;
			if (!frame["Center"])
				frame["Center"] = [0, 0];
			if (!frame["Scale"])
				frame["Scale"] = [1, 1];
			if (!frame["Rotation"])
				frame["Rotation"] = 0;
			if (!frame["Color"])
				frame["Color"] = [255, 255, 255, 255];
		}

		var root = this.getRootAnimation();
		var childDic = param["ChildDic"];

		for (var i in childDic) {
			var childId = childDic[i]["Key"];
			var child = new Sbt.Animation(this, target, childId, childDic[i]["Value"]);

			this.childList[i] = child;

			root.childDic[childId] = child;
		}
	};

	/**
	* @private
	*/
	Sbt.Animation.prototype.getRootAnimation = function() {
		var root = this.parent;

		while (root) {
			if (!root.parent)
				return root;

			root = root.parent;
		}

		return this;
	};

	/**
	* サイズの変更
	* @param {Number} width 幅
	* @param {Number} height 高さ
	*/
	Sbt.Animation.prototype.setSize = function(width, height) {
		this.width = width;
		this.height = height;
	};

	/**
	* 階層内の子 Animation の検索
	* @param {string} id 子 Animation の名前
	* @return {Sbt.Animation} 子 Animation
	*/
	Sbt.Animation.prototype.findAnimation = function(id) {
		if (!id)
			return null;

		if (!this.childDic)
			return null;

		var res = this.childDic[id];

		if (!res)
			Sbt.debugLog(createNotFoundMessage("Animation", id));

		return res;
	};

	/**
	* Animation 内の表示文字列の表示幅計測 
	* @function
	* @param {Object} context HTML5 コンテキスト 
	*/
	Sbt.Animation.prototype.measureString = function(context) {
		var width = 0;
		var fontHeight = this.fontSize;
		var fontScale;

		// Web フォントが読み込み前なら、値は仮の値を示す
		this.isTempSize = !this.font.loaded;

		if (this.fontName)
			context.font = fontHeight + "px " + this.fontName;
		else
			fontScale = fontHeight / this.imageFontHeight;

		fontHeight += this.lineSpace;

		var top = false;

		switch (this.param["Setting"]["Param"]["AlignType"]) {
			case Sbt.ALIGNTYPE_LEFTTOP:
			case Sbt.ALIGNTYPE_TOP:
			case Sbt.ALIGNTYPE_RIGHTTOP:
				top = true;
				break;
		}

		var autoReturn = this.autoReturn;
		var baseRect = this.font["BaseRect"];
		var fixed = this.font["FixedFont"];

		var y = 0;

		for (var i in this.texts) {
			var text = this.texts[i];
			var lineWidth;

			if (!autoReturn && (this.fontName || fixed)) {
				if (this.fontName)
					lineWidth = context.measureText(text).width;
				else
					lineWidth = text.length * baseRect["width"] * fontScale;

				lineWidth += this.columnSpace * text.length;
			}
			else {
				lineWidth = 0;

				var j;

				for (j in text) {
					var c = text[j];
					var w = 0;

					if (this.fontName) {
						w = context.measureText(c).width;

						switch (c) {
							case " ":
							case "　":
								break;
							default:
								if (autoReturn && lineWidth != 0 && lineWidth + w - this.columnSpace >= this.width) {
									lineWidth -= this.columnSpace;

									if (lineWidth > width)
										width = lineWidth;

									lineWidth = 0;
									y += fontHeight;
								}
								break;
						}
					}
					else {
						switch (c) {
							case " ":
								if (fixed)
									w = baseRect["width"];
								else
									w = this.font["SpaceWidth"];

								w *= fontScale;
								break;
							case "　":
								if (fixed)
									w = baseRect["width"];
								else
									w = this.font["DoubleSpaceWidth"];

								w *= fontScale;
								break;
							default:
								var arrangement = this.font.arrangementParamDic[c];

								if (arrangement) {
									if (fixed)
										w = baseRect["width"];
									else
										w = arrangement["Rect"]["width"];
								}

								w *= fontScale;

								if (autoReturn && lineWidth != 0 && lineWidth + w - this.columnSpace >= this.width) {
									lineWidth -= this.columnSpace;

									if (lineWidth > width)
										width = lineWidth;

									lineWidth = 0;
									y += fontHeight;
								}
								break;
						}
					}

					lineWidth += w;

					if (autoReturn && lineWidth >= this.width) {
						if (lineWidth > width)
							width = lineWidth;

						lineWidth = 0;
						y += fontHeight;
					}

					lineWidth += this.columnSpace;
				}
			}

			lineWidth -= this.columnSpace;

			if (lineWidth != 0 || text.length == 0) {
				y += fontHeight;

				if (lineWidth > width)
					width = lineWidth;
			}
		}

		this.textSize.width = width;
		this.textSize.height = y - this.lineSpace;
	};

	Sbt.Animation.prototype.initializeText = function() {
		this.measureString(this.target.canvas.context);
	};

	/**
	* @private
	* @param {string} text
	*/
	Sbt.Animation.prototype.setText = function(text) {
		this.texts = divideText(text);

		this.measureString(this.target.canvas.context);
	};

	/**
	* @private
	* @param {Array.<number>} center
	*/
	Sbt.Animation.prototype.setDrawCenter = function(center) {
		this.drawCenter[0] = center[0];
		this.drawCenter[1] = center[1];
	};

	/**
	* @private
	* @param {number} rotation
	*/
	Sbt.Animation.prototype.setDrawRotation = function(rotation) {
		this.drawRotation = rotation;
	};

	/**
	* @private
	* @param {Array.<number>} scale
	*/
	Sbt.Animation.prototype.setDrawScale = function(scale) {
		this.drawScale[0] = scale[0];
		this.drawScale[1] = scale[1];
	};

	/**
	* @private
	* @param {Array.<number>} offset
	*/
	Sbt.Animation.prototype.setDrawOffset = function(offset) {
		this.drawOffset[0] = offset[0];
		this.drawOffset[1] = offset[1];
	};

	/**
	* @private
	* @param {Array.<number>} color
	*/
	Sbt.Animation.prototype.setDrawColor = function(color) {
		var c = this.drawColor;
		c[0] = color[0];
		c[1] = color[1];
		c[2] = color[2];
		c[3] = color[3];
	};

	/**
	* @private
	* @param {Array.<number>} color
	*/
	Sbt.Animation.prototype.multiplyDrawColor = function(color) {
		var c = this.drawColor;
		c[0] *= color[0] / 255;
		c[1] *= color[1] / 255;
		c[2] *= color[2] / 255;
		c[3] *= color[3] / 255;
	};

	Sbt.Animation.prototype.applyAnimation = function() {
		var curFrame = this.currentFrame;

		if (!curFrame)
			return;

		var affine = this.affine;

		var lerpFrame = this.lerpFrame;
		var offset, center, rotation, scale, color, w, h;
		var curRot = curFrame["Rotation"];
		var curCenter = curFrame["Center"];
		var curW = curFrame.w;
		var curH = curFrame.h;

		if (lerpFrame && curFrame["Linear"] && curFrame["Time"] > 0) {
			// 線形補完対象のパラメータは補完する
			var rate = this.time / curFrame["Time"];

			if (this.reverse)
				rate = 1 - rate;

			offset = Sbt.lerp(curFrame["Offset"], lerpFrame["Offset"], rate);
			center = Sbt.lerp(curCenter, lerpFrame["Center"], rate);

			rotation = (lerpFrame["Rotation"] - curRot) * rate + curRot;

			while (rotation < 0)
				rotation += 2 * Math.PI;
			while (rotation >= 2 * Math.PI)
				rotation -= 2 * Math.PI;

			scale = Sbt.lerp(curFrame["Scale"], lerpFrame["Scale"], rate);
			color = Sbt.lerp(curFrame["Color"], lerpFrame["Color"], rate);

			if (this.type == DRAWTYPE_IMAGE) {
				w = curW;
				h = curH;
			}
			else {
				w = Sbt.lerp(curFrame.w, lerpFrame.w, rate);
				h = Sbt.lerp(curFrame.h, lerpFrame.h, rate);
			}

			this.drawPriority += Sbt.lerp(curFrame["Priority"], lerpFrame["Priority"], rate);
		}
		else {
			offset = curFrame["Offset"];
			center = curCenter;
			rotation = curRot;
			scale = curFrame["Scale"];
			color = curFrame["Color"];
			w = curW;
			h = curH;

			this.drawPriority += curFrame["Priority"];
		}

		this.width = w;
		this.height = h;

		var hw = w / 2;
		var hh = h / 2;
		affine.translate(-hw, -hh);

		if (curFrame["UseHorzReverse"])
			affine.multiplyScale(-1, 1);
		if (curFrame["UseVertReverse"])
			affine.multiplyScale(1, -1);

		affine.multiplyTranslate(hw + center[0], hh + center[1]);
		affine.multiplyScale(scale[0], scale[1]);
		affine.multiplyRotate(rotation);

		affine.multiplyTranslate(offset[0], offset[1]);

		this.multiplyDrawColor(color);

		this.setDrawCenter(center);
		this.setDrawScale(scale);
		this.setDrawRotation(rotation);
		this.setDrawOffset(offset);

		var parent = this.parent;
		var linkOffset = offset;

		while (parent) {
			scale = parent.drawScale;
			offset = parent.drawOffset;

			affine.multiplyScale(scale[0], scale[1]);
			affine.multiplyRotate(parent.drawRotation);
			affine.multiplyTranslate(offset[0], offset[1]);

			linkOffset = offset;

			parent = parent.parent;
		}

		var target = this.target;

		affine.multiplyTranslate(-linkOffset[0], -linkOffset[1]);
		affine.multiplyScale(target.base_scale[0], target.base_scale[1]);
		affine.multiplyRotate(target.base_rotation * Sbt.DEGTORAD);
		affine.multiplyTranslate(linkOffset[0], linkOffset[1]);
	};

	Sbt.Animation.prototype.reset = function() {
		this.resume();
		this.affine.identity();
		this.setDrawColor([255, 255, 255, 255]);
	};

	Sbt.Animation.prototype.initializeAnimation = function() {
		this.reset();

		if (this.param) {
			var frameList = this.param["FrameList"];

			this.currentFrame = frameList[0];
			this.frameCount = frameList.length;
			this.loopCount = this.param["Setting"]["LoopCount"];
			this.nextFrameIdx = (this.frameCount < 2) ? 0 : 1;
			this.lerpFrame = frameList[this.nextFrameIdx];
		}
		else {
			this.currentFrame = null;
			this.currentFrameImage = null;
			this.frameCount = 0;
			this.loopCount = 0;
			this.nextFrameIdx = 0;
			this.lerpFrame = null;
			this.nextFrameImage = null;
		}

		this.time = 0;
		this.reverse = false;
		this.nextStop = false;
		this.isEnd = false;
		this.isLastFrame = false;

		this.setDrawColor(this.target.base_color);

		this.applyAnimation();

		for (var i in this.childList)
			this.childList[i].initializeAnimation();
	};

	Sbt.Animation.prototype.updateAnimation = function() {
		var parent = this.parent;

		if (parent)
			this.drawPriority = parent.drawPriority;
		else
			this.drawPriority = this.target.drawPriority;

		this.setDrawColor(this.target.base_color);

		if (!this.currentFrame)
			return false;

		if (this.isPause || this.isEnd) {
			this.applyAnimation();

			return true;
		}

		if (this.time == 0) {
			var seId = this.currentFrame["SEName"];

			if (seId)
				this.target.app.resource.playSe(seId);
		}

		this.time++;

		var time = this.currentFrame["Time"];
		var param = this.param;
		var setting = param["Setting"];
		var returnTop = setting["ReturnTop"];

		if (this.time <= time) {
			// まだフレーム更新時期ではないので終了
			this.applyAnimation();

			if (this.time == time) {
				if (this.frameCount < 2)
					this.isLastFrame = true;
				else if (returnTop) {
					if (this.reverse)
						this.isLastFrame = (this.nextFrameIdx < 0);
				}
				else
					this.isLastFrame = (this.nextFrameIdx + 1 >= this.frameCount);
			}

			return true;
		}

		this.isLastFrame = false;

		if (this.nextStop) {
			this.nextStop = false;
			this.isEnd = true;

			this.applyAnimation();

			return true;
		}

		var frameList = param["FrameList"];
		var prevCurrentFrame = this.currentFrame;

		// 準備
		do {
			var lerpFrameIdx = null;
			var loopStop = false;

			this.currentFrame = frameList[(this.nextFrameIdx < 0) ? 0 : this.nextFrameIdx];

			// 次フレームを探す
			if (returnTop) {
				// 往復再生 
				if (this.reverse) {
					// 逆転再生
					this.nextFrameIdx--;

					if (this.nextFrameIdx < -1) { // 始点まで戻った?
						// ループ確認
						this.reverse = false;

						this.nextFrameIdx = (this.frameCount < 2) ? 0 : 1;

						// ループ処理
						switch (setting["LoopType"]) {
							case LOOPTYPE_NONE:
								loopStop = true;
								break;
							case LOOPTYPE_COUNT:
								this.loopCount--;
								loopStop = (this.loopCount <= 0);
								break;
							case LOOPTYPE_INFINITY:
								break;
						}

						if (loopStop) {
							this.isEnd = true;
							this.lerpFrame = null;

							this.applyAnimation();

							return true;
						}
					}
					else
						lerpFrameIdx = this.nextFrameIdx + 2;
				}
				else {
					// 順路再生
					this.nextFrameIdx++;

					if (this.nextFrameIdx >= this.frameCount) {
						// 逆転開始
						lerpFrameIdx = this.frameCount - 1;
						this.nextFrameIdx = lerpFrameIdx - 1; // 最後のフレームを２回使わない

						this.currentFrame = frameList[lerpFrameIdx];

						this.reverse = true;
					}
				}
			}
			else {
				// 通常再生(末端まで行ったら先頭に戻る)
				this.nextFrameIdx++;

				if (this.nextFrameIdx >= this.frameCount) {
					// 先頭に戻す 
					this.nextFrameIdx = 0;

					// ループ処理
					switch (setting["LoopType"]) {
						case LOOPTYPE_NONE:
							loopStop = true;
							break;
						case LOOPTYPE_COUNT:
							this.loopCount--;

							loopStop = (this.loopCount <= 0);
							break;
						case LOOPTYPE_INFINITY:
							break;
					}

					if (loopStop) {
						if (this.frameCount > 0) {
							this.nextFrameIdx = this.frameCount - 1;

							if (this.frameCount == 1) {
								this.isEnd = true;
								this.lerpFrame = null;

								this.applyAnimation();

								return true;
							}
						}

						this.nextStop = true;
					}
				}
			}

			if (!lerpFrameIdx)
				lerpFrameIdx = this.nextFrameIdx;

			this.lerpFrame = frameList[lerpFrameIdx];
		} while (!this.nextStop && this.currentFrame["Time"] == 0 && prevCurrentFrame != this.currentFrame);

		this.time = 0;

		if (prevCurrentFrame != this.currentFrame) {
			this.updateAnimation();
		}
		else {
			this.applyAnimation();
		}

		return true;
	};

	Sbt.Animation.prototype.update = function() {
		this.updateAnimation();

		var childList = this.childList;
		var cnt = childList.length;
		for (var i = 0; i < cnt; i++)
			childList[i].update();
	};

	Sbt.Animation.prototype.addToDrawList = function(draw2d) {
		if (!this.currentFrame)
			return;

		draw2d.addDrawable(this);

		var childList = this.childList;
		var cnt = childList.length;
		for (var i = 0; i < cnt; i++)
			childList[i].addToDrawList(draw2d);
	};

	/**
	* 描画前のコンテキストの初期化
	* @param {Sbt.Draw2D} draw2d Sbt.Draw2Dオブジェクト
	*/
	Sbt.Animation.prototype.setDrawEnvironment = function(draw2d) {
		draw2d.setEnvironment(this.drawColor, this.compositeMode, this.affine, this.target.worldLocation);
	};

	/**
	* @private
	* @param {Sbt.Draw2D} draw2d
	*/
	Sbt.Animation.prototype.doDraw = function(draw2d) {
		if (!this.param)
			return;

		var drawScale = this.drawScale;
		var context = draw2d.context;

		if (this.drawColor[3] == 0 || drawScale[0] <= 0 || drawScale[1] <= 0)
			return;

		this.setDrawEnvironment(draw2d);

		switch (this.type) {
			case DRAWTYPE_IMAGE:
				this.drawImage(context);
				break;
			case DRAWTYPE_TEXT:
				var image;

				if (!this.fontName) {
					image = this.image;

					if (!image || image.width == 0 || image.height == 0)
						break;
				}

				context.save();
				this.drawText(context);
				context.restore();
				break;
			case DRAWTYPE_BOX:
				draw2d.fillRoundRect(0, 0, this.width, this.height, this.param["Setting"]["Param"]["RoundSize"]);
				break;
		}
	};

	/**
	* @private
	* @param {Object} context
	*/
	Sbt.Animation.prototype.drawImage = function(context) {
		if (!this.image)
			return;

		var frame = this.currentFrame;
		var iw = frame.w;
		var ih = frame.h;

		if (iw == 0 || ih == 0)
			return;

		context.drawImage(this.image, frame.x, frame.y, iw, ih, 0, 0, iw, ih);
	};

	/**
	* @private
	* @param {Object} context
	*/
	Sbt.Animation.prototype.drawText = function(context) {
		var font = this.font;
		var param = this.param["Setting"]["Param"];
		var autoReturn = this.autoReturn;

		if (autoReturn) {
			context.beginPath();
			context.rect(0, 0, this.width, this.height);
			context.clip();
		}

		var fontHeight = this.fontSize;
		var fontScale;

		if (this.fontName) {
			// 仮のサイズで、Font が読み込み済みなら、改めて長さをはかる
			if (this.isTempSize && font.loaded)
				this.measureString(context);
			else
				context.font = fontHeight + "px " + this.fontName;
		}
		else
			fontScale = fontHeight / this.imageFontHeight;

		fontHeight += this.lineSpace;

		var x = this.adjustX;

		switch (param["AlignType"]) {
			case Sbt.ALIGNTYPE_TOP:
			case Sbt.ALIGNTYPE_CENTER:
			case Sbt.ALIGNTYPE_BOTTOM:
				x += (this.width - this.textSize.width) / 2;
				break;
			case Sbt.ALIGNTYPE_RIGHTTOP:
			case Sbt.ALIGNTYPE_RIGHT:
			case Sbt.ALIGNTYPE_RIGHTBOTTOM:
				x += this.width - this.textSize.width;
				break;
		}

		var y = this.adjustY;
		var top = false;

		switch (param["AlignType"]) {
			case Sbt.ALIGNTYPE_LEFTTOP:
			case Sbt.ALIGNTYPE_TOP:
			case Sbt.ALIGNTYPE_RIGHTTOP:
				top = true;
				break;
			case Sbt.ALIGNTYPE_LEFT:
			case Sbt.ALIGNTYPE_CENTER:
			case Sbt.ALIGNTYPE_RIGHT:
				y += (this.height - this.textSize.height) / 2;
				break;
			case Sbt.ALIGNTYPE_LEFTBOTTOM:
			case Sbt.ALIGNTYPE_BOTTOM:
			case Sbt.ALIGNTYPE_RIGHTBOTTOM:
				y += this.height - this.textSize.height;
				break;
		}

		var i;
		var blockSize = font["BlockSize"];
		var baseRect = font["BaseRect"];
		var fixed = font["FixedFont"];

		for (i in this.texts) {
			if (y > this.height)
				return;

			var text = this.texts[i];
			var drawX = x;

			if (!autoReturn && this.columnSpace == 0 && this.fontName) {
				context.fillText(text, drawX, y);

				y += fontHeight;
			}
			else {
				for (var j in text) {
					var c = text[j];
					var w;

					if (this.fontName) {
						w = context.measureText(c).width;

						switch (c) {
							case " ":
							case "　":
								break;
							default:
								if (autoReturn && drawX != x && drawX + w - this.columnSpace > this.width) {
									drawX = x;
									y += fontHeight;

									if (y > this.height)
										return;
								}

								context.fillText(c, drawX, y);
								break;
						}
					}
					else {
						var rect = { drawX: 0, y: 0, width: 0, height: 0 };
						var arrangement;
						var image = this.image;

						if (image) {
							switch (c) {
								case " ":
									if (fixed)
										w = baseRect["width"];
									else
										w = font["SpaceWidth"];

									w *= fontScale;
									break;
								case "　":
									if (fixed)
										w = baseRect["width"];
									else
										w = font["DoubleSpaceWidth"];

									w *= fontScale;
									break;
								default:
									arrangement = font.arrangementParamDic[c];

									if (arrangement) {
										rect.drawX = arrangement["Block"]["x"] * blockSize.width;
										rect.y = arrangement["Block"]["y"] * blockSize.height + baseRect["y"];

										if (fixed) {
											rect.drawX += baseRect["x"];
											rect.width = baseRect["width"];
										}
										else {
											rect.drawX += arrangement["Rect"]["x"];
											rect.width = arrangement["Rect"]["width"];
										}
									}

									w = rect.width * fontScale;

									if (autoReturn && drawX != x && drawX + w - this.columnSpace > this.width) {
										drawX = x;
										y += fontHeight;

										if (y > this.height)
											return;
									}

									context.drawImage(image, rect.drawX, rect.y, rect.width, baseRect["height"], drawX, y, rect.width * fontScale, baseRect["height"] * fontScale);
									break;
							}
						}
					}

					drawX += w + this.columnSpace;

					if (autoReturn && drawX >= this.width) {
						drawX = x;
						y += fontHeight;

						if (y > this.height)
							return;
					}
				}

				if (drawX != x || text.length == 0)
					y += fontHeight;
			}
		}
	};

	/**
	* Animation のリスタート
	*/
	Sbt.Animation.prototype.restart = function() {
		this.initializeAnimation();

		if (!this.parent)
			this.target.updateDrawParam();
	};

	/**
	* @private
	* @param {Boolean} pause
	* @param {Boolean} skipChild
	*/
	Sbt.Animation.prototype.setPause = function(pause, skipChild) {
		this.isPause = pause;

		if (skipChild)
			return;

		var childList = this.childList;
		var cnt = childList.length;

		for (var i = 0; i < cnt; i++)
			childList[i].setPause(pause, false);
	};

	/**
	* Animation の一時停止
	* @param {Boolean} [skipChild] 子 Animation は対象としないか？（省略時：false）
	*/
	Sbt.Animation.prototype.pause = function(skipChild) {
		this.setPause(true, skipChild);
	};

	/**
	* Animation の再開
	* @param {Boolean} [skipChild] 子 Animation は対象としないか？（省略時：false）
	*/
	Sbt.Animation.prototype.resume = function(skipChild) {
		this.setPause(false, skipChild);
	};

	/**
	* Animation の画像の URL を指定しての変更
	* @param {string} src 変更する画像のURL
	* @param {Function} [callback] 読み込み終了時のコールバック（省略時：null）
	* @example
	* animation.setImageFromURL( "htto://～",
	* 	function( success ) {
	* 		if ( success )
	* 			Sbt.debugLog( "success" );
	* 		else
	* 			Sbt.debugLog( "failed" );
	* 	}
	* );
	*/
	Sbt.Animation.prototype.setImageFromURL = function(src, callback) {
		if (!this.param && this.type == DRAWTYPE_IMAGE)
			return;

		var image = new Image();

		if (callback) {
			image.onload = function() { callback(true); }
			image.onerror = function() { callback(false); }
		}

		image.src = src;

		this.image = image;
	};

	/**
	* Animation の画像の Image を指定しての変更
	* @param {string} id 変更する Image の名前
	*/
	Sbt.Animation.prototype.setImageFromResource = function(id) {
		if (!this.param && this.type == DRAWTYPE_IMAGE)
			return;

		var imageItem = this.resource.getImage(id);

		if (!imageItem)
			return;

		this.image = imageItem.image;
	};

	/**
	* Image Animation の作成
	* @param {String} id 作成する Animation の名前
	* @param {String} imageId 表示する Image の名前
	* @param {Number} left Image の X 座標
	* @param {Number} top Image の Y 座標
	* @param {Number} width Image の幅
	* @param {Number} height Image の高さ
	* @param {Number} [a] α値（省略時：255）
	* @param {Array.<number>} [offset] オフセットの配列（省略時：[0, 0]）
	* @param {Array.<number>} [center] 中心点の配列（省略時：[width / 2, height / 2]）
	* @return {Sbt.Animation} Animation
	*/
	Sbt.Animation.prototype.createImageAnimation = function(id, imageId, x, y, width, height, a, offset, center) {
		return createImageAnimation(this, this.target, id, imageId, x, y, width, height, a, offset, center);
	};

	/**
	* Box Animation の作成
	* @param {String} id 作成する Animation の名前
	* @param {Number} width Box の幅
	* @param {Number} height Box の高さ
	* @param {Array.<number>} [color] 輝度の配列（省略時：[255, 255, 255, 255]）
	* @param {Boolean} [roundCorner] 角を丸めるか？（省略時：false）
	* @param {Number} [roundSize] 角丸のサイズ（省略時：0）
	* @param {Array.<number>} [offset] オフセットの配列（省略時：[0, 0]）
	* @param {Array.<number>} [center] 中心点の配列（省略時：[width / 2, height / 2]）
	* @return {Sbt.Animation} Animation
	*/
	Sbt.Animation.prototype.createBoxAnimation = function(id, width, height, color, roundCorner, roundSize, offset, center) {
		return createBoxAnimation(this, this.target, id, width, height, color, roundCorner, roundSize, offset, center);
	};

	/**
	* Text Animation の作成
	* @param {String} id 作成する Animation の名前
	* @param {String} textId Text の名前
	* @param {String} fontId Font の名前
	* @param {Number} fontSize Font のサイズ
	* @param {Number} width Text の幅
	* @param {Number} height Text の高さ
	* @param {Array.<number>} [color] 輝度の配列（省略時：[255, 255, 255, 255]）
	* @param {Boolean} [autoReturn] 自動改行するか？（省略時：false）
	* @param {Sbt.ALIGNTYPE_*} [textAlign] Text の揃え方（省略時：Sbt.ALIGNTYPE_LEFTTOP）
	* @param {Array.<number>} [offset] オフセットの配列（省略時：[0, 0]）
	* @param {Array.<number>} [center] 中心点の配列（省略時：[width / 2, height / 2]）
	* @return {Sbt.Animation} Animation
	*/
	Sbt.Animation.prototype.createTextAnimation = function(id, textId, fontId, fontSize, width, height, color, autoReturn, textAlign, offset, center) {
		return createTextAnimation(this, this.target, id, textId, fontId, fontSize, width, height, color, autoReturn, textAlign, offset, center);
	};

	/**
	* 表示物の基底クラス
	* @constructor
	*/
	Sbt.Node = function() {
	};

	/**
	* @private
	* @param {string} id
	* @param {Sbt.Node} parent
	* @param {Object=} param
	* @param {Array.<number>=} location
	*/
	Sbt.Node.prototype._initialize = function(id, parent, param, location) {
		/**
		* 名前
		* @type string
		*/
		this.id = id;
		this.parent = parent;

		/**
		* Sbt.App のインスタンス
		* @type Sbt.App
		*/
		this.app = null;

		if (parent) {
			this.canvas = parent.canvas;

			if (!this.canvas)
				this.canvas = parent;

			if (this.canvas)
				this.app = this.canvas.app;
		}

		this.siblingsPrev = null;
		this.siblingsNext = null;

		/**
		* 角度
		* @type number
		*/
		this.base_rotation = 0;
		this.rotation = 0;
		/**
		* スケール
		* @type [x, y]
		*/
		this.base_scale = [1, 1];
		this.scale = [1, 1];
		/**
		* 輝度
		* @type [r, g, b, a]
		*/
		this.base_color = [255, 255, 255, 255];

		if (param) {
			if (!location)
				location = param["Location"];

			if (param["Rotation"])
				this.setBaseRotation(param["Rotation"]);

			if (param["Scale"])
				this.setBaseScale(param["Scale"]);

			if (param["Color"])
				this.setBaseColor(param["Color"]);
		}

		/**
		* 位置（parent がある場合は相対位置）
		* @type [x, y, z]
		*/
		this.location = (location) ? [location[0], location[1], location[2]] : [0, 0, 0];

		/**
		* Canvas 上の位置
		* @type [x, y, z]
		*/
		this.worldLocation = [0, 0, 0];

		/**
		* 描画優先度。数字が大きいほど手前に書く 
		* @type Number
		*/
		this.drawPriority = 0;

		this.param = param;

		this.visible = true;

		this.hasKeyEventHandler = false;
		this.hasMouseEventHandler = false;
		this.hasTouchEventHandler = false;
	};

	/**
	* @private
	*/
	Sbt.Node.prototype.processInitialize = function() {
		this.keyEventListenerNext = null;
		this.mouseEventListenerNext = null;

		// ベースとなる Gadget の初期化処理
		if (this.doInitialize) {
			this.doInitialize();
		}

		// イベントハンドラ情報をここで作る 
		this.updateEventHandlingFlag();
	};

	Sbt.Node.prototype.processUpdate = function() {
		// ベースとなる Gadget のアップデート処理
		if (this.doUpdate)
			this.doUpdate();
	};

	Sbt.Node.prototype.processKeyDown = function(keyCode) {
		// ベースとなる Gadget のキーダウン処理
		return (this.doKeyDown && this.doKeyDown(keyCode))
	};

	Sbt.Node.prototype.processKeyUp = function(keyCode) {
		// ベースとなる Gadget のキーアップ処理
		return (this.doKeyUp && this.doKeyUp(keyCode))
	};

	Sbt.Node.prototype.processMouseDown = function(location, touchId) {
		// ベースとなる Gadget のマウスダウン処理
		return (this.doMouseDown && this.doMouseDown(location, touchId))
	};

	Sbt.Node.prototype.processMouseMove = function(location, touchId) {
		// ベースとなる Gadget のマウス移動処理
		return (this.doMouseMove && this.doMouseMove(location, touchId))
	};

	Sbt.Node.prototype.processMouseUp = function(location, touchId) {
		// ベースとなる Gadget のマウスアップ処理
		return (this.doMouseUp && this.doMouseUp(location, touchId))
	};

	Sbt.Node.prototype.processFlick = function(location, touchId) {
		// ベースとなる Gadget のフリック処理
		return (this.doFlick && this.doFlick(location, touchId))
	};

	Sbt.Node.prototype.processTap = function(location, touchId) {
		// ベースとなる Gadget のタップ処理
		return (this.doTap && this.doTap(location))
	};

	Sbt.Node.prototype.processDoubleClick = function(location) {
		// ベースとなる Gadget のダブルクリック処理
		return (this.doDoubleClick && this.doDoubleClick(location))
	};

	Sbt.Node.prototype.doUpdate = function() {
		var worldLocation = this.worldLocation;
		var location = this.location;

		for (var i = 0; i < 3; i++)
			worldLocation[i] = location[i];

		var parent = this.parent;

		if (!parent || !parent.worldLocation)
			return;

		for (var i = 0; i < 3; i++)
			worldLocation[i] += parent.worldLocation[i];
		this.drawPriority = worldLocation[2];
	};

	/**
	* @private
	* 自分にイベントハンドラが定義されているかどうかをチェック
	*/
	Sbt.Node.prototype.hasEventHandler = function(event) {
		// 自分がハンドリングしている？
		return (this["do" + event] || this["ap" + event] || this["on" + event]);
	}

	/**
	* @private
	// イベントハンドラ所持フラグを更新する 
	*/
	Sbt.Node.prototype.updateEventHandlingFlag = function() {
		this.hasKeyEventHandler =
			(this.hasEventHandler("KeyDown") ||
			 this.hasEventHandler("KeyUp"));
		this.hasMouseEventHandler =
			(this.hasEventHandler("MouseDown") ||
			 this.hasEventHandler("MouseMove") ||
			 this.hasEventHandler("MouseUp") ||
			 this.hasEventHandler("DoubleClick"));
		this.hasTouchEventHandler =
			(this.hasEventHandler("Flick") ||
			 this.hasEventHandler("Tap"));

		if (!this.canvas.app.useGesture)
			this.canvas.app.useGesture = this.hasTouchEventHandler;
	};

	/**
	* イベントハンドラの設定
	* @param {string} name イベント名
	* @param {Function} callback コールバック
	*/
	Sbt.Node.prototype.setEventHandler = function(name, callback) {
		this[name] = callback;
		this.updateEventHandlingFlag();
	};

	/**
	* インスタンスの破棄
	*/
	Sbt.Node.prototype.destroy = function() {
		var prev = this.siblingsPrev;
		var next = this.siblingsNext;

		if (prev)
			prev.siblingsNext = next;
		else
			this.parent.firstUpdateGadget = next;

		if (next)
			next.siblingsPrev = prev;
		else
			this.parent.lastUpdateGadget = prev;

		this.canvas.removeLayout(this);
	};

	/**
	* 表示状態の取得
	* @return {boolean} true=表示中, false=非表示
	*/
	Sbt.Node.prototype.isVisible = function() {
		if (!this.visible)
			return false;

		var parent = this.parent;

		return (!parent || parent.isVisible());
	};

	/**
	* 表示状態の設定
	* @param {boolean} visible true=表示, false=非表示
	*/
	Sbt.Node.prototype.setVisible = function(visible) {
		this.visible = visible;
	};

	/**
	* 輝度の設定
	* @param {number|Array.<number>} a α値 or 輝度の配列
	* @param {number=} [r] R値（省略時：a がα値の時は変更しません）
	* @param {number=} [g] G値（省略時：a がα値の際は変更しません）
	* @param {number=} [b] B値（省略時：a がα値の際は変更しません）
	*/
	Sbt.Node.prototype.setBaseColor = function(a, r, g, b) {
		var baseColor = this.base_color;
		if (typeof (a) == "number") {
			baseColor[3] = a;
			if (r || r == 0)
				baseColor[0] = r;
			if (g || g == 0)
				baseColor[1] = g;
			if (b || b == 0)
				baseColor[2] = b;
		} else if (a instanceof Array) {
			for (var i = 0; i < a.length; i++)
				baseColor[i] = a[i];
		}
	};

	/**
	* 位置の設定
	* @param {number|Array.<number>} x X座標 or 位置の配列
	* @param {number=} [y] Y座標（省略時：x がX座標の時は変更しません）
	* @param {number=} [z] Z座標（省略時：x がX座標の時は変更しません）
	*/
	Sbt.Node.prototype.setLocation = function(x, y, z) {
		var location = this.location;
		if (typeof (x) == "number") {
			location[0] = x;
			if (y || y == 0)
				location[1] = y;
			if (z || z == 0)
				location[2] = z;
		} else if (x instanceof Array) {
			var i;

			for (i = 0; i < x.length && i < 3; i++)
				location[i] = x[i];
		}
	};

	/**
	* 位置の加算
	* @param {number|Array.<number>} x X座標 or 位置の配列
	* @param {number=} [y] Y座標（省略時：x がX座標の時は変更しません）
	* @param {number=} [z] Z座標（省略時：x がX座標の時は変更しません）
	*/
	Sbt.Node.prototype.addLocation = function(x, y, z) {
		var location = this.location;
		if (typeof (x) == "number") {
			location[0] += x;
			if (y || y == 0)
				location[1] += y;
			if (z || z == 0)
				location[2] += z;
		} else if (x instanceof Array) {
			for (var i = 0; i < x.length && i < 3; i++)
				location[i] += x[i];
		}
	};

	/**
	* 角度の設定
	* @param {number} rotation 角度
	*/
	Sbt.Node.prototype.setBaseRotation = function(rotation) {
		this.base_rotation = rotation;
	};

	/**
	* 角度の加算
	* @param {number} rotation 角度
	*/
	Sbt.Node.prototype.addBaseRotation = function(rotation) {
		this.base_rotation += rotation;
	};

	/**
	* スケールの設定
	* @param {number|Array.<number>} x Xスケール or スケールの配列
	* @param {number=} [y] Yスケール（省略時：x）
	*/
	Sbt.Node.prototype.setBaseScale = function(x, y) {
		var baseScale = this.base_scale;
		if (typeof (x) == "number") {
			baseScale[0] = x;
			if (y || y == 0)
				baseScale[1] = y;
			else
				baseScale[1] = x;
		} else if (x instanceof Array) {
			baseScale[0] = x[0];
			baseScale[1] = x[1];
		}
		var cnt = baseScale.length;
		for (var i = 0; i < cnt; i++) {
			if (baseScale[i] < 0)
				baseScale[i] = 0;
		}
	};

	Sbt.Node.prototype.initializeChild = function() {
		var gadget = this.firstUpdateGadget;

		while (gadget) {
			gadget.processInitialize();

			gadget = gadget.siblingsNext;
		}
	};

	Sbt.Node.prototype.updateChild = function() {
		var gadget = this.firstUpdateGadget;

		while (gadget) {
			gadget.processUpdate();

			gadget = gadget.siblingsNext;
		}
	};

	Sbt.Node.prototype.addToDrawList = function(draw2d) {
		if (this.visible) {
			var animation = this.animation;
			if (animation)
				animation.addToDrawList(draw2d);
			if (this.doDraw)
				draw2d.addDrawable(this);
		}
	};

	Sbt.Node.prototype.addChildToDrawList = function(draw2d) {
		if (this.visible) {
			var gadget = this.firstUpdateGadget;

			while (gadget) {
				gadget.addToDrawList(draw2d);
				gadget.addChildToDrawList(draw2d);

				gadget = gadget.siblingsNext;
			}
		}
	};

	Sbt.Node.prototype.isGadget = function() {
		return false;
	};

	Sbt.Node.prototype.isLayer = function() {
		return false;
	};

	/**
	* Gadget
	* @constructor
	* @extends Sbt.Node
	*/
	Sbt.Gadget = function() {
	};

	/**
	* 左寄せ・上寄せ
	* @type Number
	* @const
	*/
	Sbt.ALIGNTYPE_LEFTTOP = 0;
	/**
	* 左右中央・上寄せ
	* @type Number
	* @const
	*/
	Sbt.ALIGNTYPE_TOP = 1;
	/**
	* 右寄せ・上寄せ
	* @type Number
	* @const
	*/
	Sbt.ALIGNTYPE_RIGHTTOP = 2;
	/**
	* 左寄せ・上下中央
	* @type Number
	* @const
	*/
	Sbt.ALIGNTYPE_LEFT = 3;
	/**
	* 左右中央・上下中央
	* @type Number
	* @const
	*/
	Sbt.ALIGNTYPE_CENTER = 4;
	/**
	* 右寄せ・上下中央
	* @type Number
	* @const
	*/
	Sbt.ALIGNTYPE_RIGHT = 5;
	/**
	* 左寄せ・下寄せ
	* @type Number
	* @const
	*/
	Sbt.ALIGNTYPE_LEFTBOTTOM = 6;
	/**
	* 左右中央・下寄せ
	* @type Number
	* @const
	*/
	Sbt.ALIGNTYPE_BOTTOM = 7;
	/**
	* 右寄せ・下寄せ
	* @type Number
	* @const
	*/
	Sbt.ALIGNTYPE_RIGHTBOTTOM = 8;

	Sbt.Gadget.prototype = new Sbt.Node();

	/**
	* @private
	* @param {string} id
	* @param {Sbt.Node} parent
	* @param {Object} param
	* @param {Array.<number>} location
	* @param {Object} template
	* @param {Object} animationDic
	* @param {string=} initAnimationId
	*/
	Sbt.Gadget.prototype._initialize = function(id, parent, param, location, template, animationDic, initAnimationId) {
		/**
		* 親のキャンバス
		* @type Sbt.Canvas
		*/
		this.canvas = null;

		Sbt.Node.prototype._initialize.call(this, id, parent, param, location);

		var i;

		this.animationDic = {};
		/**
		* 現在の Animation
		* @type Sbt.Animation
		*/
		this.animation = null;
		this.firstAnimationId = null;

		/**
		* 現在の幅
		* @type number
		*/
		this.width = 0;
		/**
		* 現在の高さ
		* @type number
		*/
		this.height = 0;

		if (animationDic && animationDic.length > 0) {
			for (i in animationDic) {
				var animationId = animationDic[i]["Key"];
				var animation = new Sbt.Animation(null, this, animationId, animationDic[i]["Value"]);

				this.animationDic[animationId] = animation;

				if (!this.firstAnimationId)
					this.firstAnimationId = animationId;
			}

			this.setAnimation(initAnimationId);
		}

		/**
		* 動作中
		* @type boolean
		*/
		this.active = false;

		this.activeMarginLeft = 0;
		this.activeMarginTop = 0;
		this.activeMarginRight = 0;
		this.activeMarginBottom = 0;

		if (template) {
			this.setActive(template["ActiveStart"]);

			this.activeMarginLeft = template["ActiveMarginLeft"];
			this.activeMarginTop = template["ActiveMarginTop"];
			this.activeMarginRight = template["ActiveMarginRight"];
			this.activeMarginBottom = template["ActiveMarginBottom"];
		}
	};

	Sbt.Gadget.prototype.setParam = function(param) {
		for (var i = 1; i <= 8; i++) {
			var paramId = "param" + i;

			if (param[paramId])
				this[paramId] = param[paramId];
		}
	};

	Sbt.Gadget.prototype.processKeyDown = function(keyCode) {
		// ユーザー定義のキーダウン処理
		if (this.onKeyDown && this.onKeyDown(this, keyCode))
			return true;

		return Sbt.Node.prototype.processKeyDown.call(this, keyCode);
	};

	Sbt.Gadget.prototype.processKeyUp = function(keyCode) {
		// ユーザー定義のキーアップ処理
		if (this.onKeyUp && this.onKeyUp(this, keyCode))
			return true;

		return Sbt.Node.prototype.processKeyUp.call(this, keyCode);
	};

	Sbt.Gadget.prototype.processMouseDown = function(location, touchId) {
		// ユーザー定義のマウスダウン処理
		if (this.onMouseDown && this.onMouseDown.call(this.canvas, this, location, touchId))
			return true;

		return Sbt.Node.prototype.processMouseDown.call(this, location, touchId);
	};

	Sbt.Gadget.prototype.processMouseMove = function(location, touchId) {
		// ユーザー定義のマウス移動処理
		if (this.onMouseMove && this.onMouseMove.call(this.canvas, this, location, touchId))
			return true;

		return Sbt.Node.prototype.processMouseMove.call(this, location, touchId);
	};

	Sbt.Gadget.prototype.processMouseUp = function(location, touchId) {
		// ユーザー定義のマウスアップ処理
		if (this.onMouseUp && this.onMouseUp.call(this.canvas, this, location, touchId))
			return true;

		return Sbt.Node.prototype.processMouseUp.call(this, location, touchId);
	};

	Sbt.Gadget.prototype.processFlick = function(location, touchId) {
		// ユーザー定義のフリック処理
		if (this.onFlick && this.onFlick.call(this.canvas, this, location, touchId))
			return true;

		return Sbt.Node.prototype.processFlick.call(this, location, touchId);
	};

	Sbt.Gadget.prototype.processTap = function(location, touchId) {
		// ユーザー定義のタップ処理
		if (this.onTap && this.onTap.call(this.canvas, this, location, touchId))
			return true;

		return Sbt.Node.prototype.processTap.call(this, location, touchId);
	};

	Sbt.Gadget.prototype.processDoubleClick = function(location) {
		// ユーザー定義のダブルクリック処理
		if (this.onDoubleClick && this.onDoubleClick.call(this.canvas, this, location))
			return true;

		return Sbt.Node.prototype.processDoubleClick.call(this, location);
	};

	Sbt.Gadget.prototype.doUpdate = function() {
		Sbt.Node.prototype.doUpdate.call(this);

		if (!this.active) {
			if (!this.isInActiveArea())
				return;

			this.setActive(true);
		}

		var animation = this.animation;

		if (!animation)
			return;

		animation.update();
		this.updateDrawParam();

		if (this.isVisible()) {
			var draw2d = this.canvas.draw2d;
			this.canvas.addLayoutGadget(this);
			animation.addToDrawList(draw2d);
			if (this.doDraw)
				draw2d.addDrawable(this);
		}
	};

	Sbt.Gadget.prototype.updateDrawParam = function() {
		var animation = this.animation;

		this.rotation = this.base_rotation + animation.drawRotation * Sbt.RADTODEG;

		var scale = this.scale;
		var base_scale = this.base_scale;
		scale[0] = base_scale[0] * animation.drawScale[0];
		scale[1] = base_scale[1] * animation.drawScale[1];

		this.width = animation.width * scale[0];
		this.height = animation.height * scale[1];
	};

	Sbt.Gadget.prototype.getDrawRotation = function() {
		if (this.animation)
			return this.animation.drawRotation;
		else
			return 0;
	};

	/**
	* 動作可能範囲にいるかどうかをチェック
	* @return {boolean} true=動作できる, false=動作できない
	*/
	Sbt.Gadget.prototype.isInActiveArea = function() {
		var width = this.width;
		var height = this.height;
		var worldLocation = this.worldLocation;
		var html5Canvas = this.canvas.html5Canvas;
		var left = worldLocation[0] - this.activeMarginLeft - width / 2;
		var top = worldLocation[1] - this.activeMarginTop - height / 2;
		var right = left + width + this.activeMarginRight;
		var bottom = top + height + this.activeMarginBottom;

		return (0 <= right && left <= html5Canvas.width && 0 <= bottom && top <= html5Canvas.height);
	};

	/**
	* 動作状態の設定
	* @param {boolean} active true=動作中, false=待機中
	*/
	Sbt.Gadget.prototype.setActive = function(active) {
		this.active = active;
	};

	/**
	* Animation の検索
	* @param {string} id Animation の名前
	* @return {Sbt.Animation} Animation
	*/
	Sbt.Gadget.prototype.findAnimation = function(id) {
		return this.animationDic[id];
	};

	/**
	* Animation の変更
	* @param {string=} id 変更する Animation の名前
	*/
	Sbt.Gadget.prototype.setAnimation = function(id) {
		if (!id)
			id = this.firstAnimationId;

		var animation = this.findAnimation(id);

		if (!animation)
			throw createNotFoundMessage("Animation", id);

		this.animation = animation;
		this.animation.restart();
	};

	/**
	* Image Animation の作成
	* @param {String} id 作成する Animation の名前
	* @param {String} imageId 表示する Image の名前
	* @param {Number} left Image の X 座標
	* @param {Number} top Image の Y 座標
	* @param {Number} width Image の幅
	* @param {Number} height Image の高さ
	* @param {Number} [a] α値（省略時：255）
	* @param {Array.<number>} [offset] オフセットの配列（省略時：[0, 0]）
	* @param {Array.<number>} [center] 中心点の配列（省略時：[width / 2, height / 2]）
	* @return {Sbt.Animation} Animation
	*/
	Sbt.Gadget.prototype.createImageAnimation = function(id, imageId, x, y, width, height, a, offset, center) {
		return createImageAnimation(null, this, id, imageId, x, y, width, height, a, offset, center);
	};

	/**
	* Box Animation の作成
	* @param {String} id 作成する Animation の名前
	* @param {Number} width Box の幅
	* @param {Number} height Box の高さ
	* @param {Array.<number>} [color] 輝度の配列（省略時：[255, 255, 255, 255]）
	* @param {Boolean} [roundCorner] 角を丸めるか？（省略時：false）
	* @param {Number} [roundSize] 角丸のサイズ（省略時：0）
	* @param {Array.<number>} [offset] オフセットの配列（省略時：[0, 0]）
	* @param {Array.<number>} [center] 中心点の配列（省略時：[width / 2, height / 2]）
	* @return {Sbt.Animation} Animation
	*/
	Sbt.Gadget.prototype.createBoxAnimation = function(id, width, height, color, roundCorner, roundSize, offset, center) {
		return createBoxAnimation(null, this, id, width, height, color, roundCorner, roundSize, offset, center);
	};

	/**
	* Text Animation の作成
	* @param {String} id 作成する Animation の名前
	* @param {String} textId Text の名前
	* @param {String} fontId Font の名前
	* @param {Number} fontSize Font のサイズ
	* @param {Number} width Text の幅
	* @param {Number} height Text の高さ
	* @param {Array.<number>} [color] 輝度の配列（省略時：[255, 255, 255, 255]）
	* @param {Boolean} [autoReturn] 自動改行するか？（省略時：false）
	* @param {Sbt.ALIGNTYPE_*} [textAlign] Text の揃え方（省略時：Sbt.ALIGNTYPE_LEFTTOP）
	* @param {Array.<number>} [offset] オフセットの配列（省略時：[0, 0]）
	* @param {Array.<number>} [center] 中心点の配列（省略時：[width / 2, height / 2]）
	* @return {Sbt.Animation} Animation
	*/
	Sbt.Gadget.prototype.createTextAnimation = function(id, textId, fontId, fontSize, width, height, color, autoReturn, textAlign, offset, center) {
		return createTextAnimation(null, this, id, textId, fontId, fontSize, width, height, color, autoReturn, textAlign, offset, center);
	};

	/**
	* @param {Sbt.Animation} animation
	* @param {string} text
	*/
	Sbt.Gadget.prototype.setAnimationText = function(animation, text) {
		if (animation.type == DRAWTYPE_TEXT) {
			animation.setText(text);

			return true;
		}
		else {
			var childList = animation.childList;
			var cnt = childList.length;

			for (var i = 0; i < cnt; i++) {
				if (this.setAnimationText(childList[i], text))
					return true;
			}

			return false;
		}
	};

	/**
	* 最初に見つかった Animation の文字列の変更
	* @param {string} text 文字列
	*/
	Sbt.Gadget.prototype.setText = function(text) {
		this.setAnimationText(this.animation, text);
	};

	/**
	* 描画前のコンテキストの初期化
	* @param {Sbt.Draw2D} draw2d Sbt.Draw2Dオブジェクト
	*/
	Sbt.Gadget.prototype.setDrawEnvironment = function(draw2d) {
		var animation = this.animation;

		if (!animation)
			return;

		animation.setDrawEnvironment(draw2d);
	};

	Sbt.Gadget.prototype.isGadget = function() {
		return true;
	};

	/**
	* Layer
	* @constructor
	* @extends Sbt.Node
	*/
	Sbt.Layer = function() {
	};

	Sbt.Layer.prototype = new Sbt.Node();

	/**
	* @private
	* @param {string} id
	* @param {Sbt.Node} parent
	* @param {Object=} param
	*/
	Sbt.Layer.prototype._initialize = function(id, parent, param) {
		if (!param)
			param = {};

		Sbt.Node.prototype._initialize.call(this, id, parent, param);

		/**
		* 現在の幅
		* @type number
		*/
		this.width = param["Width"];

		/**
		* 現在の高さ
		* @type number
		*/
		this.height = param["Height"];

		/**
		* クリッピングするか？
		* @type Boolean
		*/
		this.clipping = param["Clipping"];

		this.firstUpdateGadget = null;
		this.lastUpdateGadget = null;

		if (!param["LayoutDic"])
			return;

		var prevGadget;

		for (var i in param["LayoutDic"]) {
			var layoutDic = param["LayoutDic"][i];

			prevGadget = this.createNode(layoutDic["Key"], layoutDic["Value"], prevGadget);
		}
	};

	Sbt.Layer.prototype.doInitialize = function() {
		this.initializeChild();
	};

	Sbt.Layer.prototype.doUpdate = function() {
		Sbt.Node.prototype.doUpdate.call(this);

		if (this.clipping)
			this.clippingLayer = this;
		else if (this.parent && (this.canvas != this.parent))
			this.clippingLayer = this.parent.clippingLayer;
		else
			this.clippingLayer = null;

		this.updateChild();
	};

	/**
	* サイズの変更
	* @param {Number} width 幅
	* @param {Number} height 高さ
	*/
	Sbt.Layer.prototype.setSize = function(width, height) {
		this.width = width;
		this.height = height;
	};


	/**
	* @private
	* @param {string} id 
	* @param {Object} param 
	* @param {Sbt.Node} prevGadget 
	*/
	Sbt.Layer.prototype.createNode = function(id, param, prevGadget) {
		var layout;

		switch (param["Type"]) {
			case LAYOUTTYPE_LAYER:
				layout = new Sbt.Layer();

				layout._initialize(id, this, param);
				break;
			case LAYOUTTYPE_GADGET:
				var gadgetTemplate;
				var gadgetName = param["GadgetName"];
				var className;
				var project = this.canvas.project;

				if (gadgetName) {
					gadgetTemplate = project.gadgetDic[gadgetName];

					if (!gadgetTemplate) {
						throw createNotFoundMessage("GadgetTemplate", gadgetName);
					}

					className = gadgetTemplate["ScriptName"];
				}

				// スクリプトが無い場合は、デフォルトの Sbt.Gadget を作成
				if (!className)
					className = "Sbt.Gadget";

				layout = new Function("return new " + className + "()")();

				layout._initialize(id, this, param, param["Location"], gadgetTemplate, project.animationGroupDic[param["GroupId"]]["AnimationDic"], param["AnimationId"]);

				if (param.ParamDic && param.ParamDic.length > 0) {
					var initParam = {};

					for (var i in param.ParamDic) {
						var key = param.ParamDic[i]["Key"];

						initParam[key] = param.ParamDic[i]["Value"];
					}

					layout.setParam(initParam);
				}
				break;
		}

		if (!layout)
			return null;

		if (this.firstUpdateGadget) {
			layout.siblingsPrev = prevGadget;
			prevGadget.siblingsNext = layout;
		}
		else
			this.firstUpdateGadget = layout;

		this.lastUpdateGadget = layout;

		if (id)
			this.canvas.layoutDic[id] = layout;

		return layout;
	};

	/**
	* Gadget のインスタンス作成
	* @param {string} id Sbt.Canvas.findGadget で検索するための名前
	* @param {Array.<number>} location 位置
	* @param {string} gadgetTemplateId GadgetTemplate の名前（null を指定すると標準の Sbt.Gadget になります）
	* @param {string} animationGroupId AnimationGroup の名前
	* @param {string} [animationId] Animation の名前（省略時：最初の Animation）
	* @return {Sbt.Gadget} Gadget
	*/
	Sbt.Layer.prototype.createGadget = function(id, location, gadgetTemplateId, animationGroupId, animationId) {
		if (!animationGroupId)
			animationGroupId = this.canvas.project.gadgetDic[gadgetTemplateId]["GroupId"];

		var initLocation = [0, 0, 0];

		if (location instanceof Array) {
			for (var i = 0; i < location.length && i < initLocation.length; i++)
				initLocation[i] = location[i];
		}

		var gadget = this.createNode(id, { "GadgetName": gadgetTemplateId, "Type": LAYOUTTYPE_GADGET, "GroupId": animationGroupId, "AnimationId": animationId, "Location": initLocation }, this.lastUpdateGadget);

		gadget.processInitialize();

		return gadget;
	};

	/**
	* Layer の直下に置かれている Gadget の配列を返す(子Layer の Gadget は含まれません)
	* @return {Array.<Sbt.Gadget>} Gadget の配列
	*/
	Sbt.Layer.prototype.getGadgetArray = function() {
		var gadgets = [];
		var gadget = this.firstUpdateGadget;

		while (gadget) {
			if (gadget.isGadget()) {
				gadgets.push(gadget);
			}

			gadget = gadget.siblingsNext;
		}

		return gadgets;
	};

	/**
	* Layer の直下に置かれている子Layer の配列を返す(子Layer に置かれている Layer は含まれません)
	* @return {Array.<Sbt.Layer>} Layer の配列
	*/
	Sbt.Layer.prototype.getLayerArray = function() {
		var layers = [];
		var gadget = this.firstUpdateGadget;

		while (gadget) {
			if (gadget.isLayer()) {
				layers.push(gadget);
			}

			gadget = gadget.siblingsNext;
		}

		return layers;
	};

	Sbt.Layer.prototype.isLayer = function() {
		return true;
	};

	/**
	* @const
	* @private
	*/
	var WALLPAPER_CENTER = 0;
	/**
	* @const
	* @private
	*/
	var WALLPAPER_FILL = 1;
	/**
	* @const
	* @private
	*/
	var WALLPAPER_TILE = 2;
	/**
	* @const
	* @private
	*/
	var WALLPAPER_SCALE = 3;

	/**
	* 壁紙描画オブジェクト 
	* @param {Sbt.Canvas} canvas 所属キャンバス 
	* @param {Object} image 壁紙に使用する画像 
	* @param {Number} wallPaperArrangeType 壁紙の配置方法 
	* @param {Object} location 壁紙の描画座標
	*/
	Sbt.WallPaper = function(canvas, image, wallPaperArrangeType, location) {
		this.canvas = canvas;
		if (image != null) {
			this.image = image;
		} else {
			this.image = null;
		}
		this.wallPaperArrangeType = wallPaperArrangeType;
		this.location = location;
		this.drawPriority = Sbt.DRAWPRIORITY_BACKGROUND;
	};

	Sbt.WallPaper.prototype.doDraw = function(draw2d) {
		var image = this.image;

		if (!image || !image.loaded)
			return;

		image = this.image.image;

		var drawBaseX = this.location[0];
		var drawBaseY = this.location[1];
		var drawWidth = 0;
		var drawHeight = 0;
		var canvasWidth = this.canvas.html5Canvas.width;
		var canvasHeight = this.canvas.html5Canvas.height;
		var screenWidth = canvasWidth;
		var screenHeight = canvasHeight;

		switch (this.wallPaperArrangeType) {
			case WALLPAPER_CENTER:
				drawBaseX += (screenWidth - image.width) / 2;
				drawBaseY += (screenHeight - image.height) / 2;
				drawWidth = image.width;
				drawHeight = image.height;
				break;
			case WALLPAPER_FILL:
				drawWidth = screenWidth;
				drawHeight = screenHeight;
				break;
			case WALLPAPER_TILE:
				screenWidth = drawWidth = image.width;
				screenHeight = drawHeight = image.height;
				break;
			case WALLPAPER_SCALE:
				var xScale = screenWidth / image.width;
				var yScale = screenHeight / image.height;

				if (xScale < yScale) {
					drawWidth = image.width * xScale;
					drawHeight = image.height * xScale;
					drawBaseY += (screenHeight - drawHeight) / 2;
				}
				else {
					drawHeight = image.height * yScale;
					drawWidth = image.width * yScale;
					drawBaseX += (screenWidth - drawWidth) / 2;
				}
				break;
		}

		while (0 < drawBaseX)
			drawBaseX -= screenWidth;
		while (drawBaseX < -screenWidth)
			drawBaseX += screenWidth;
		while (0 < drawBaseY)
			drawBaseY -= screenHeight;
		while (drawBaseY < -screenHeight)
			drawBaseY += screenHeight;

		draw2d.setEnvironment(Sbt.COLOR_WHITE, Sbt.COMPOSITEMODE_NORMAL);

		var drawY = drawBaseY;
		var context = draw2d.context;

		while (drawY < canvasHeight) {
			var drawX = drawBaseX;

			while (drawX < canvasWidth) {
				context.drawImage(image, 0, 0, image.width, image.height, drawX, drawY, drawWidth, drawHeight);

				drawX += screenWidth;
			}

			drawY += screenHeight;
		}
	};

	/**
	* Canvas
	* @constructor
	* @extends Sbt.Node
	*/
	Sbt.Canvas = function() {
	};

	Sbt.Canvas.prototype = new Sbt.Node();


	/**
	* @const
	* @private
	*/
	var LAYOUTTYPE_LAYER = 0;
	/**
	* @const
	* @private
	*/
	var LAYOUTTYPE_GADGET = 1;

	/**
	* @private
	* @param {string} id
	* @param {Object} param
	* @param {?Array.<number>} location
	* @param {Sbt.App} app
	* @param {boolean} isSubCanvas
	*/
	Sbt.Canvas.prototype._initialize = function(id, param, location, app, isSubCanvas) {
		Sbt.Node.prototype._initialize.call(this, id, null, param, location);

		// ユーザースクリプトからのアクセス用
		this.canvas = this;
		this.app = app;

		/**
		* Sbt.Project のインスタンス
		* @type Sbt.Project
		*/
		this.project = app.project;

		/**
		* Sbt.Resource のインスタンス
		* @type Sbt.Resource
		*/
		this.resource = app.resource;

		/**
		* Canvas エレメント
		* @type HTMLCanvas
		*/
		this.html5Canvas = app.html5Canvas;

		/*
		/* 描画用CanvasRenderingContext2Dオブジェクト
		* @type CanvasRenderingContext2Dオブジェクト
		*/
		this.context = app.context;
		this.draw2d = app.draw2d;

		var bgSetting = param["BGSetting"];
		var wallPaperName = bgSetting["WallPaperName"];
		var image = null;

		this.bgColor = bgSetting["BGColor"];

		if (wallPaperName)
			image = this.resource.getImage(wallPaperName);

		if (image)
			this.wallpaper = new Sbt.WallPaper(this, image, bgSetting["WallPaperArrangeType"], [0, 0]);
		else
			this.wallpaper = null;

		this.firstUpdateGadget = null;
		this.lastUpdateGadget = null;
		this.layoutDic = {};
		this.useImageList = [];

		var prevLayer = null;

		for (var i in param["LayerDic"]) {
			var layerDic = param["LayerDic"][i];
			var layerParam = layerDic["Value"];
			var layer = new Sbt.Layer();
			var layer_id = layerDic["Key"];

			layer._initialize(layer_id, this, layerParam)

			layer.siblingsPrev = null;
			layer.siblingsNext = null;

			if (prevLayer) {
				layer.siblingsPrev = prevLayer;
				prevLayer.siblingsNext = layer;
			}
			else
				this.firstUpdateGadget = layer;

			this.lastUpdateGadget = layer;

			this.layoutDic[layer_id] = layer;

			prevLayer = layer;
		}

		this.layoutGadgetList = []; // 配置されている Gadget のリスト
		this.drawAnimationList = []; // 描画される Animation のリスト

		var count = param["ScreenCount"];

		/**
		* Canvas 全体の幅
		* @type number
		*/
		this.width = this.project.screenSize.width * count.width;

		/**
		* Canvas 全体の高さ
		* @type number
		*/
		this.height = this.project.screenSize.height * count.height;

		this.isSubCanvas = isSubCanvas;

		if (isSubCanvas) {
			this.location[2] = Sbt.DRAWPRIORITY_SUBCANVAS;
		} else {
			this.location[2] = Sbt.DRAWPRIORITY_CANVAS;
			this.app.setSubCanvas(param["SubCanvasName"]);
		}
	};

	/**
	* 指定した Gadget へのイベントハンドラの設定
	* @param {string} gadgetId Gadget の名前
	* @param {string} name イベント名
	* @param {Function} callback コールバック
	*/
	Sbt.Canvas.prototype.setEventHandlerToGadget = function(gadgetId, name, callback) {
		var gadget = this.findGadget(gadgetId);

		if (!gadget)
			return;

		gadget.setEventHandler(name, callback);
	};

	Sbt.Canvas.prototype.doInitialize = function() {
		this.initializeChild();
	};

	Sbt.Canvas.prototype.doUpdate = function() {
		Sbt.Node.prototype.doUpdate.call(this);

		this.layoutGadgetList.length = 0;
		if (this.visible) {
			var draw2d = this.draw2d;
			var wallpaper = this.wallpaper;
			if (wallpaper)
				draw2d.addDrawable(wallpaper);
			if (this.doDraw)
				draw2d.addDrawable(this);
		}
		this.updateChild();
	};

	/**
	* インスタンスの破棄
	*/
	Sbt.Canvas.prototype.destroy = function() {
		this.layoutDic = {};
	};

	Sbt.Canvas.prototype.addUseImage = function(image) {
		if (this.useImageList.indexOf(image) < 0)
			this.useImageList.push(image);
	};

	Sbt.Canvas.prototype.getLoadingPercent = function() {
		var loadedCnt = 0;
		var resource = this.resource;
		var totalCnt = this.useImageList.length + resource.loadingAudioList.length;

		for (var i in this.useImageList) {
			if (this.useImageList[i].loaded)
				loadedCnt++;
		}

		for (var i in resource.loadingAudioList) {
			if (resource.loadingAudioList[i].loaded)
				loadedCnt++;
		}

		if (loadedCnt == totalCnt)
			return 100;

		return loadedCnt * 100 / totalCnt;
	};

	/**
	* Gadget のインスタンス作成
	* @param {string} layerId 作成する Layer の名前
	* @param {string} id Sbt.Canvas.findGadget で検索するための名前
	* @param {Array.<number>} location 位置
	* @param {string} gadgetTemplateId GadgetTemplate の名前（null を指定すると標準の Sbt.Gadget になります）
	* @param {string} animationGroupId AnimationGroup の名前
	* @param {string} [animationId] Animation の名前（省略時：最初の Animation）
	* @return {Sbt.Gadget} Gadget
	*/
	Sbt.Canvas.prototype.createGadget = function(layerId, id, location, gadgetTemplateId, animationGroupId, animationId) {
		var layer;

		if (layerId)
			layer = this.findLayer(layerId);

		if (!layer)
			layer = this.firstUpdateGadget;

		if (!layer)
			return null;

		return layer.createGadget(id, location, gadgetTemplateId, animationGroupId, animationId);
	};

	Sbt.Canvas.prototype.removeLayout = function(layout) {
		var id = layout.id;

		if (id && this.layoutDic[id])
			delete this.layoutDic[id];
	};

	/**
	* @private
	* @param {Sbt.Node} gadget
	*/
	Sbt.Canvas.prototype.addLayoutGadget = function(gadget) {
		var ary = this.layoutGadgetList;
		var mid;
		var lo = 0;
		var hi = ary.length;
		var x = gadget.location[2];
		while (lo < hi) {
			mid = Math.floor((lo + hi) / 2);
			if (x < ary[mid].location[2])
				hi = mid;
			else
				lo = mid + 1;
		}
		ary.splice(lo, 0, gadget);
	};

	/**
	* @private
	*/
	Sbt.Canvas.prototype.buildDrawList = function() {
		var draw2d = this.draw2d;
		if (this.visible) {
			var wallpaper = this.wallpaper;
			if (wallpaper)
				draw2d.addDrawable(wallpaper);
			if (this.doDraw)
				draw2d.addDrawable(this);
		}
		this.addChildToDrawList(draw2d);
	};

	/**
	* Canvas に配置されている Gadget のインスタンスの検索
	* @param {string} id インスタンスの名前
	* @return {Sbt.Node} インスタンス
	*/
	Sbt.Canvas.prototype.findGadget = function(id) {
		if (!id)
			return null;

		var gadget = this.layoutDic[id];

		if (!gadget)
			Sbt.debugLog(createNotFoundMessage("Gadget", id));

		return gadget;
	};

	/**
	* Canvas に配置されている Layer のインスタンスの検索
	* @param {string} id インスタンスの名前
	* @return {Sbt.Node} インスタンス
	*/
	Sbt.Canvas.prototype.findLayer = function(id) {
		if (!id)
			return null;

		return this.findGadget(id);
	};

	/**
	* Canvas の直下に置かれている子Layer の配列を返す(子Layer に置かれている Layer は含まれません)
	* @return {Array.<Sbt.Layer>} Layer の配列
	*/
	Sbt.Canvas.prototype.getLayerArray = function() {
		var layers = [];
		var gadget = this.firstUpdateGadget;

		while (gadget) {
			if (gadget.isLayer()) {
				layers.push(gadget);
			}

			gadget = gadget.siblingsNext;
		}

		return layers;
	};

	/**
	* Loader: ロード画面 
	* @constructor
	* @param {!Sbt.App} app Sbt.App のインスタンス
	*/
	Sbt.Loader = function(app) {
		/**
		* Sbt.App のインスタンス
		* @type Sbt.App
		*/
		this.app = app;
		this.location = [0, 0];
		this.drawPriority = Sbt.DRAWPRIORITY_FRONT;
		this.affine = new Sbt.Affine2D();
		this.angle = 0;
		this.timer = 0;
		this.loadingPercent = 0;

		var self = this;

		this.image = new Image();
		this.image.onload = function() { self.initialized = true; };
		this.image.onerror = function() { self.initialized = true; };
		this.image.src = "./Image/loading.png";
	};

	/**
	* 初期化終了確認
	* @return {boolean} true=初期化中, false=初期化終了
	*/
	Sbt.Loader.prototype.isInitialized = function() {
		return this.initialized;
	};

	/**
	* ローディングの開始
	*/
	Sbt.Loader.prototype.beginLoad = function() {
		this.angle = 0;
		this.timer = 0;
	};

	/**
	* ローディング処理。クルクル回す 
	* @param {number} percent 進捗率 
	*/
	Sbt.Loader.prototype.doUpdate = function(percent) {
		this.loadingPercent = percent;
		this.timer++;

		if (this.timer * 15 / this.app.frameRate >= 1) {
			this.angle += 45 * Sbt.DEGTORAD;
			this.timer = 0;
		}
	};

	/**
	* ローディングの描画
	* @param {Sbt.Draw2D} draw2d Sbt.Draw2Dオブジェクト
	*/
	Sbt.Loader.prototype.doDraw = function(draw2d) {
		var image = this.image;

		if (!image || image.width == 0)
			return;

		var affine = this.affine;

		affine.translate(0, 0);
		affine.multiplyTranslate(-50 * image.width / 100, -50 * image.height / 100);
		affine.multiplyRotate(this.angle);
		affine.multiplyTranslate(50 * image.width / 100, 50 * image.height / 100);

		this.location[0] = this.app.html5Canvas.width - image.width;
		this.location[1] = this.app.html5Canvas.height - image.height;

		draw2d.setEnvironment(Sbt.COLOR_WHITE, Sbt.COMPOSITEMODE_NORMAL, this.affine, this.location);

		draw2d.context.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
	};

	/**
	* ローディングの終了 
	*/
	Sbt.Loader.prototype.endLoad = function() {
	};

	/**
	* Fader: フェーダー 
	* @constructor
	* @param {!Sbt.App} app Sbt.App のインスタンス
	*/
	Sbt.Fader = function(app) {
		/**
		* Sbt.App のインスタンス
		* @type Sbt.App
		*/
		this.app = app;
		this.drawPriority = Sbt.DRAWPRIORITY_FRONT;
		this.color = [255, 255, 255, 255];
		this.rate = 0;
	};

	/**
	* フェードのモード
	* @enum {number}
	*/
	var FADEMODE = {
		OFF: 0, // オフ
		IN: 1,  // フェードイン中
		OUT: 2  // フェードアウト中
	};

	/**
	* フェード状態の取得
	* @return {boolean} true=フェード中, false=フェードしていない
	*/
	Sbt.Fader.prototype.isFading = function() {
		if (!this.mode || this.mode == FADEMODE.OFF)
			return false;

		return (this.time < this.fadeTime);
	};

	/**
	* フェードイン状態の取得
	* @return {boolean} true=フェードイン中, false=フェードイン以外
	*/
	Sbt.Fader.prototype.isFadeIn = function() {
		return (this.mode == FADEMODE.IN);
	};

	/**
	* フェードアウト状態の取得
	* @return {boolean} true=フェードアウト中, false=フェードアウト以外
	*/
	Sbt.Fader.prototype.isFadeOut = function() {
		return (this.mode == FADEMODE.OUT);
	};

	/**
	* フェードインの開始
	* @param {number} fadeTime フェード時間
	* @param {Function=} callback 終了時のコールバック
	*/
	Sbt.Fader.prototype.fadeIn = function(fadeTime, callback) {
		this.mode = FADEMODE.IN;
		this.fadeTime = fadeTime;
		this.time = 0;
		this.rate = 1;
		this.callback = callback;
	};

	/**
	* フェードアウトの開始
	* @param {number} fadeTime フェード時間
	* @param {Function=} callback 終了時のコールバック
	*/
	Sbt.Fader.prototype.fadeOut = function(fadeTime, callback) {
		this.mode = FADEMODE.OUT;
		this.fadeTime = fadeTime;
		this.time = 0;
		this.rate = 0;
		this.callback = callback;
	};

	/**
	* フェードの停止
	*/
	Sbt.Fader.prototype.fadeOff = function() {
		this.mode = FADEMODE.OFF;
	};

	Sbt.Fader.prototype.doUpdate = function() {
		if (this.time < this.fadeTime) {
			this.time++;

			this.rate = this.time / this.fadeTime;

			if (this.mode == FADEMODE.IN)
				this.rate = 1 - this.rate;

			if (this.time >= this.fadeTime) {
				this.fadeOff();
				if (this.callback)
					this.callback();
			}
		}
	};

	/**
	* フェードの描画
	* @param {Sbt.Draw2D} draw2d Sbt.Draw2Dオブジェクト
	*/
	Sbt.Fader.prototype.doDraw = function(draw2d) {
		var color = this.color;

		if (color[3] > 0 && this.rate > 0) {
			var tcolor = [color[0], color[1], color[2], this.rate * color[3]];
			draw2d.setEnvironment(tcolor, Sbt.COMPOSITEMODE_NORMAL);
			draw2d.context.fillRect(0, 0, this.app.html5Canvas.width, this.app.html5Canvas.height);
		}
	};

	/**
	* Project: 全体管理
	* @constructor
	*/
	Sbt.Project = function(app, sbtdata, url) {
		this.initialize(app, sbtdata, url);
	};

	Sbt.Project.prototype.initialize = function(app, sbtdata, url) {
		var i, elem, dic;

		this.app = app;

		/**
		* プロジェクト名
		* @type string
		*/
		this.name = sbtdata["Info"]["Name"];

		/**
		* 画面の大きさ
		* @type width, height
		*/
		this.screenSize = sbtdata["Info"]["ScreenSize"];

		this.resource = new Sbt.Resource(app, sbtdata, url);
		this.trialImage = this.resource.trialImage;

		this.gadgetDic = {};

		dic = sbtdata["GadgetDic"];

		if (dic) {
			for (i in dic) {
				elem = dic[i];

				if (elem["Key"] && elem["Value"])
					this.gadgetDic[elem["Key"]] = elem["Value"];
			}
		}

		this.animationGroupDic = {};

		dic = sbtdata["GroupDic"];

		if (dic) {
			for (i in dic) {
				elem = dic[i];

				if (elem["Key"] && elem["Value"])
					this.animationGroupDic[elem["Key"]] = elem["Value"];
			}
		}

		if (Sbt.global.lib && Sbt.global.lib.doInitialize) {
			Sbt.global.lib.doInitialize();
		}

		this.canvasDic = {};

		dic = sbtdata["CanvasDic"];

		if (dic) {
			for (i in dic) {
				elem = dic[i];

				if (elem["Key"] && elem["Value"]) {
					this.canvasDic[elem["Key"]] = elem["Value"];

					if (!Sbt.startCanvasId) {
						Sbt.startCanvasId = elem["Key"];
					}
				}
			}
		}
	};

	/**
	* タッチ・マウスイベント処理 
	* @constructor
	*/
	Sbt.Touch = function(location, id, useGesture) {
		var tm = (new Date()).getTime();
		if (location) {
			/**
			* タッチしているか？
			* @type boolean
			*/
			this.touch = true;

			/**
			* フリックしているか？
			* @type boolean
			*/
			this.flick = true;

			this.time = 0;
			this.tapTime = tm;

			/**
			* 位置
			* @type [x, y, z]
			*/
			this.location = location;

			this.id = id;
			this.prevLocation = location;

			/**
			* フリックの方向
			* @type [x, y]
			*/
			this.delta = [0, 0];

			this.useGesture = useGesture;
		} else {
			this.touch = false;
			this.flick = true;
			this.time = 0;
			this.tapTime = tm;
			this.location = [0, 0];
			this.id = -1;
			this.prevLocation = this.location;
			this.delta = [0, 0];
			this.useGesture = false;
		}
	};

	Sbt.Touch.prototype.reset = function(location, useGesture) {
		this.touch = true;
		this.flick = true;
		this.time = 0;
		this.tapTime = (new Date()).getTime();
		this.location = location;
		this.prevLocation = location;
		this.delta = [0, 0];
		this.useGesture = useGesture;
	};

	Sbt.Touch.prototype.update = function(location) {
		this.prevLocation = this.location;
		this.location = location;

		if (this.useGesture) {
			var tm = (new Date()).getTime();
			var x = location[0] - this.prevLocation[0];
			var y = location[1] - this.prevLocation[1];

			if (this.delta[0] != 0 || Math.abs(x) > SPEED_FLICK) {
				this.delta[0] += x;

				if (this.time == 0)
					this.time = tm;
			}
			if (this.delta[1] != 0 || Math.abs(y) > SPEED_FLICK) {
				this.delta[1] += y;

				if (this.time == 0)
					this.time = tm;
			}

			if (this.time > 0 && tm - this.time > 100) {
				if (Math.abs(this.delta.x) < SPEED_FLICK && Math.abs(this.delta.y) < SPEED_FLICK) {
					this.flick = false;
				}
			}
		}
	}

	Sbt.Touch.prototype.fireGestureEvent = function(gadgetList, location) {
		var preventDefault = false;
		if (this.useGesture) {
			var nowTime = (new Date()).getTime();
			var time = nowTime - this.time;
			var gadget;
			var id = this.id;

			if (this.flick && time < TIME_FLICK && (Math.abs(this.delta[0]) >= RANGE_FLICK || Math.abs(this.delta[1]) >= RANGE_FLICK)) {
				var delta = this.delta;
				var flickLocation = [location[0] - delta[0], location[1] - delta[1], location[2]];

				gadget = gadgetList;

				while (gadget != null) {
					if (gadget.processFlick(flickLocation, id)) {
						preventDefault = true;
						return;
					}

					gadget = gadget.mouseEventListenerNext;
				}
			}

			if (nowTime - this.tapTime < TIME_TAP) {
				gadget = gadgetList;

				while (gadget != null) {
					if (gadget.processTap(location, id)) {
						preventDefault = true;
						return;
					}

					gadget = gadget.mouseEventListenerNext;
				}
			}
		}

		return preventDefault;
	}

	/**
	* App: プレイヤー
	* @constructor
	* @param {string} screenId Canvas エレメントの Id
	* @param {number} frameRate フレームレート
	*/
	Sbt.App = function(screenId, frameRate) {
		/**
		* Canvas エレメント
		* @type HTMLCanvas
		*/
		this.html5Canvas = window.document.getElementById(screenId);

		this.context = this.html5Canvas.getContext("2d");
		this.draw2d = new Sbt.Draw2D(this);
		this.frameRate = frameRate;

		this.curTime = new Date();

		this.canvas = null;
		this.subCanvas = null;
		this.prevCanvas = null;
		this.prevSubCanvas = null;

		this.loader = new Sbt.Loader(this);
		this.fader = new Sbt.Fader(this);

		this.fontLoaded = false;

		/**
		* タッチ・マウスイベント情報
		* @type Sbt.Touch
		*/
		this.touch = {};
		this.touchCount = 0;
		this.suppressUIEvent = true;
		this.mouseId = -1;

		this.global = {}; // キャンバス間でのデータやり取り用の変数プレースホルダ

		this.timerList = [];

		if (typeof lib !== 'undefined') {
			Sbt.global.lib = new lib(this);
		}
	};

	/**
	* プロジェクトデータをロードし、最初の Canvas の動作を開始
	* @param {string} url プロジェクトのURL
	* @param {string} dataName プロジェクトデータのファイル名
	* @param {Function?} update 更新メソッド
	*/
	Sbt.App.prototype.start = function(url, dataName, update) {
		if (url[url.length - 1] != '/')
			url += "/";

		this.url = url;
		this.dataName = dataName;
		this.loadedJSON = false;

		if (update) {
			if (this.frameRate > 0) {
				this.beginLoad();
				setInterval(update, 1000 / this.frameRate);
			}
		}
	};

	/**
	* @private
	* @param {Object=} sbtdata
	* @param {string} url プロジェクトのURL
	*/
	Sbt.App.prototype.initialize = function(sbtdata, url) {
		/**
		* Sbt.Project のインスタンス
		* @type Sbt.Project
		*/
		this.project = new Sbt.Project(this, sbtdata, url);

		/**
		* Sbt.Resource のインスタンス
		* @type Sbt.Resource
		*/
		this.resource = this.project.resource;

		this.firstKeyEventListenerGadget = null;
		this.firstMouseEventListenerGadget = null;
		this.useGesture = false;

		window.addEventListener("keydown", function(e) { app.onKeyDown(e); }, true);
		window.addEventListener("keyup", function(e) { app.onKeyUp(e); }, true);

		this.useTouch = ("ontouchstart" in window);
		var app = this;
		var html5Canvas = this.html5Canvas;
		if (this.useTouch) {
			html5Canvas.addEventListener("touchstart", function(e) { app.onTouchStart(e); }, false);
			html5Canvas.addEventListener("touchmove", function(e) { app.onTouchMove(e); }, false);
			html5Canvas.addEventListener("touchend", function(e) { app.onTouchEnd(e); }, false);
		}
		if (!this.useTouch || Sbt.osType == Sbt.OSTYPE_WINDOWS || Sbt.osType == Sbt.OSTYPE_MAC) {
			this.touch[this.mouseId] = new Sbt.Touch();
			html5Canvas.addEventListener("mousedown", function(e) { app.onMouseDown(e); }, false);
			html5Canvas.addEventListener("mousemove", function(e) { app.onMouseMove(e); }, false);
			html5Canvas.addEventListener("mouseup", function(e) { app.onMouseUp(e); }, false);
			html5Canvas.addEventListener("dblclick", function(e) { app.onDoubleClick(e); }, false);
		}

		window.addEventListener("devicemotion", function(e) { app.onDeviceMotion(e); }, false);
		window.addEventListener("deviceorientation", function(e) { app.onDeviceOrientation(e); }, false);
		
		// canvasタグのサイズが0,0の場合、表示サイズを自動調整 
		if (this.html5Canvas.width == 0 && this.html5Canvas.height == 0) {
			this.setCanvasFit(this.project.screenSize.width, this.project.screenSize.height);
		}
	};

	/**
	* @private
	* @param {Sbt.Canvas} canvas
	* @param {Sbt.Canvas} subCanvas
	*/
	Sbt.App.prototype.initializeCanvas = function(canvas, subCanvas) {
		this.resource.loadingAudioList.length = 0;

		if (this.prevCanvas) {
			this.prevCanvas.destroy();
			this.prevCanvas = null;
		}
		if (this.prevSubCanvas && (this.prevSubCanvas != this.subCanvas)) {
			this.prevSubCanvas.destroy();
			this.prevSubCanvas = null;
		}

		for (var i in canvas.layoutDic) {
			var gadget = canvas.layoutDic[i];
			var animation = gadget.animation;

			if (animation) {
				animation.setDrawColor(gadget.base_color);

				animation.applyAnimation();
			}
		}

		canvas.processInitialize();

		if (subCanvas)
			subCanvas.processInitialize();
	};

	/**
	* @private
	* @param {Sbt.Canvas} canvas
	* @param {Sbt.Canvas} subCanvas
	*/
	Sbt.App.prototype.checkLoadingEnd = function(canvas, subCanvas) {
		var percent = canvas.getLoadingPercent();

		if (subCanvas)
			percent = (percent + subCanvas.getLoadingPercent()) / 2;

		var prevPercent = this.loadingPercent;

		this.loadingPercent = percent;

		if (percent < 100 || prevPercent < 100)
			return false;

		this.endLoad();

		if (this.fader && !this.fader.isFading()) {
			this.initializeCanvas(canvas, subCanvas);

			this.setFadeIn(canvas);
		}

		return true;
	};

	/**
	* @private
	*/
	Sbt.App.prototype.setFadeIn = function(canvas) {
		if (this.loading)
			return;

		var fader = this.fader;
		var param = canvas.param;

		fader.fadeIn(param["FadeInTime"]);
		fader.color = param["FadeColor"];
	};

	/**
	* @private
	* @param {Sbt.Canvas} canvas
	* @param {Sbt.Canvas} subCanvas
	*/
	Sbt.App.prototype.onFadeOutEnd = function(canvas, subCanvas) {
		this.setFadeIn(canvas);

		if (!this.loading)
			this.initializeCanvas(canvas, subCanvas);
	};

	/**
	* @private
	* @param {string} id
	* @param {Array.<number>=} location
	* @param {boolean=} isSubCanvas
	*/
	Sbt.App.prototype.createCanvas = function(id, location, isSubCanvas) {
		if (!id)
			return null;

		var param = this.project.canvasDic[id];

		if (!param)
			return null;

		var className = param["ScriptName"];

		// スクリプトが無い場合は、デフォルトの Sbt.Canvas を作成
		if (!className)
			className = "Sbt.Canvas";

		var canvas = new Function("return new " + className + "()")();

		canvas._initialize(id, param, location, this, isSubCanvas);

		return canvas;
	};

	/**
	* @private
	* @param {Sbt.Canvas} canvas
	*/
	Sbt.App.prototype.setCanvas = function(canvas) {
		var fader = this.fader;
		var app = this;

		var subCanvas = null;

		if (this.initSubCanvas) {
			subCanvas = this.subCanvas;

			this.initSubCanvas = false;
		}

		if (this.canvas && fader) {
			var param = this.canvas.param;

			fader.fadeOut(param["FadeOutTime"], function() { app.onFadeOutEnd(canvas, subCanvas); });
			fader.color = canvas.param["FadeColor"];
		}

		this.prevCanvas = this.canvas;

		this.canvas = canvas;

		if (this.checkLoadingEnd(canvas, subCanvas))
			return;

		this.beginLoad();

		this.appendTimer(canvas, 50,
			function(obj, count) {
				if (app.checkLoadingEnd(canvas, subCanvas))
					app.deleteTimer(obj);
			}
		);
	};

	/**
	* Canvas の変更
	* @param {string} id 新しい Canvas の名前
	* @param {Array.<number>} [location] 新しい Canvas の表示位置（省略時：[0, 0, 0]）
	*/
	Sbt.App.prototype.changeCanvas = function(id, location) {
		this.setCanvas(this.createCanvas(id, location));
	};

	/**
	* @private
	* @param {string} id 新しい SubCanvas の名前, null で SubCanvas の消去
	* @param {Array.<number>=} location 新しい SubCanvas の表示位置
	* @param {boolean=} initialize 初期化メソッドを呼び出すか？
	*/
	Sbt.App.prototype.setSubCanvas = function(id, location, initialize) {
		var subCanvas = this.subCanvas;

		if (subCanvas && subCanvas.id == id)
			return;

		this.prevSubCanvas = subCanvas;

		if (id) {
			subCanvas = this.createCanvas(id, location, true);

			if (subCanvas) {

				if (initialize)
					subCanvas.processInitialize();
				else
					this.initSubCanvas = true;
			}

			this.subCanvas = subCanvas;
		}
		else
			this.subCanvas = null;
	};

	/**
	* SubCanvas の変更
	* @param {string} id 新しい SubCanvas の名前, null で SubCanvas の消去
	* @param {Array.<number>} [location] 新しい SubCanvas の表示位置（省略時：[0, 0, 0]）
	*/
	Sbt.App.prototype.changeSubCanvas = function(id, location) {
		this.setSubCanvas(id, location, true);
	};

	/**
	* フォントのロード状況を監視する 
	* @private 
	*/
	Sbt.App.prototype.checkFont = function() {
		var resource = this.resource;

		if (!resource)
			return;

		var loaded = true;

		for (var i in resource.fontDic) {
			var font = resource.fontDic[i];

			if (font.loaded)
				continue;

			var size = this.context.measureText(CHECK_TEXT_WEBFONT);

			font.loaded = (font.checkSize.width != size.width || font.checkSize.height != size.height);
			if (!font.loaded)
				loaded = false;
		}
		this.fontLoaded = loaded;
	};

	/**
	* 最初のキャンバスをロード・起動する 
	* @private 
	*/
	Sbt.App.prototype.loadFirstCanvas = function() {
		this.loadedJSON = true;

		var app = this;
		var url = this.url;

		Sbt.callHttp(url + this.dataName, function(ret, body) {
			app.initialize(ret, url);
			app.endLoad();

			// 最初のキャンバスをセットする
			app.setCanvas(app.createCanvas(Sbt.startCanvasId));
		});
	};

	Sbt.App.prototype.update = function() {
		var nowTime = new Date();
		var elapsed = nowTime.getTime() - this.curTime.getTime();

		if (elapsed <= 0)
			elapsed = 1;

		this.curTime = nowTime;

		if (this.loader && !this.loader.isInitialized())
			return;

		if (!this.loadedJSON) {
			this.loadFirstCanvas();
			return;
		}

		if (!this.fontLoaded)
			this.checkFont();

		this.firstKeyEventListenerGadget = null;
		this.firstMouseEventListenerGadget = null;

		var canvas = this.canvas;
		var context = this.context;
		var draw2d = this.draw2d;
		var fader = this.fader;
		var fading = (fader && fader.isFading());
		var clearColor = null;

		draw2d.clearDrawList();

		if (Sbt.global.lib && Sbt.global.lib.beginUpdate) {
			Sbt.global.lib.beginUpdate();
		}

		if (this.loading || (fading && (fader.mode == FADEMODE.OUT))) {
			if (this.prevCanvas && this.prevCanvas.visible) {
				this.prevCanvas.buildDrawList();
				if (this.prevSubCanvas && this.prevSubCanvas.visible)
					this.prevSubCanvas.buildDrawList();
				clearColor = this.prevCanvas.bgColor;
			}
			else {
				if (this.canvas) {
					clearColor = this.canvas.param["FadeColor"];
				} else {
					clearColor = this.html5Canvas.style.backgroundColor;
				}
			}
		} else if (canvas) {
			canvas.processUpdate();

			this.doBuildMouseEventListener(canvas);
			this.doBuildMouseEventListener(canvas.layoutGadgetList);

			var subCanvas = this.subCanvas;

			if (subCanvas) {
				subCanvas.processUpdate();

				this.doBuildMouseEventListener(subCanvas);
				this.doBuildMouseEventListener(subCanvas.layoutGadgetList);
			}
			clearColor = canvas.bgColor;
		}

		if (Sbt.global.lib && Sbt.global.lib.endUpdate) {
			Sbt.global.lib.endUpdate();
		}

		// ロード画面 
		if (this.loading) {
			this.loader.doUpdate(this.loadingPercent);
			draw2d.addDrawable(this.loader);
		}
		// フェーダ 
		if (fading) {
			fader.doUpdate();
			if (fader.fadeTime > 0)
				draw2d.addDrawable(fader);
		}
		this.suppressUIEvent = (this.loading || fader.isFading());

		if (Sbt.global.lib && Sbt.global.lib.doDraw) {
			draw2d.addDrawable(Sbt.global.lib);
		}

		// 描画 
		draw2d.processDraw(clearColor);

		// タイマー起動処理 
		for (var i = this.timerList.length - 1; i >= 0; i--) {
			var timer = this.timerList[i];

			timer.time -= elapsed;

			if (timer.time <= 0) {
				timer.counter++;
				timer.callbackFunc(timer.obj, timer.counter);

				timer.time = timer.msec;
			}
		}
	};

	// ローディング開始
	Sbt.App.prototype.beginLoad = function() {
		this.loading = true;
		this.loadingPercent = 0;

		if (this.loader)
			this.loader.beginLoad();
	};

	// ローディング終了
	Sbt.App.prototype.endLoad = function() {
		this.loading = false;

		if (this.loader)
			this.loader.endLoad();
	};

	Sbt.App.prototype.doBuildMouseEventListener = function(gadget_list) {
		var prevKeyEventListenerGadget = this.firstKeyEventListenerGadget;
		var prevMouseEventListenerGadget = this.firstMouseEventListenerGadget;

		if (!(gadget_list instanceof Array)) {
			gadget_list = [gadget_list];
		}
		// 描画順にチェックし、描画と逆に積む
		var cnt = gadget_list.length;
		for (var i = 0; i < cnt; i++) {
			var gadget = gadget_list[i];

			if (gadget.hasKeyEventHandler) {
				gadget.keyEventListenerNext = prevKeyEventListenerGadget;

				prevKeyEventListenerGadget = gadget;
			}
			if (gadget.hasMouseEventHandler ||
				gadget.hasTouchEventHandler) {
				gadget.mouseEventListenerNext = prevMouseEventListenerGadget;

				prevMouseEventListenerGadget = gadget;
			}
		}

		this.firstKeyEventListenerGadget = prevKeyEventListenerGadget;
		this.firstMouseEventListenerGadget = prevMouseEventListenerGadget;
	};

	Sbt.App.prototype.onKeyDown = function(e) {
		if (!this.suppressUIEvent) {
			var gadget = this.firstKeyEventListenerGadget;

			while (gadget != null) {
				if (gadget.processKeyDown(e.keyCode)) {
					e.preventDefault();

					return;
				}

				gadget = gadget.keyEventListenerNext;
			}
		}
	};

	Sbt.App.prototype.onKeyUp = function(e) {
		if (!this.suppressUIEvent) {
			var gadget = this.firstKeyEventListenerGadget;

			while (gadget != null) {
				if (gadget.processKeyUp(e.keyCode)) {
					e.preventDefault();

					return;
				}

				gadget = gadget.keyEventListenerNext;
			}
		}
	};

	Sbt.App.prototype.checkSoundLoader = function() {
		var resource = this.resource;
		if (!resource.wavePreload) {
			// android では最初のタッチで、SE/BGM を読み込ませる
			resource.loadWave(resource.seDic);
			resource.loadWave(resource.bgmDic);
			resource.wavePreload = true;
		}

		if (resource.firstTouchAfter == false) {
			resource.firstTouchAfter = true;
			for (var name in resource.seDic) {
				var se = resource.seDic[name];
				if (se.sound.playFailed) {
					se.sound.play(false);
				}
			}

			if (resource.playingBgm && resource.playingBgm.playFailed) {
				resource.playingBgm.play(false);
			}
		}
	}

	Sbt.App.prototype.getMouseLocation = function(e) {
		var html5Canvas = this.html5Canvas;
		var hw = html5Canvas.width;
		var hh = html5Canvas.height;
		var canvasRect = html5Canvas.getBoundingClientRect();
		var resize = (hw != canvasRect.width || hh != canvasRect.height);

		var location = [e.pageX - canvasRect.left, e.pageY - canvasRect.top, 0];

		var scr = window.scrollX;
		if (scr)
			location[0] -= scr;
		scr = window.scrollY;
		if (scr)
			location[1] -= scr;

		if (resize) {
			location[0] = location[0] * hw / canvasRect.width;
			location[1] = location[1] * hh / canvasRect.height;
		}

		return location;
	};

	Sbt.App.prototype.onTouchStart = function(e) {
		this.checkSoundLoader();

		this.touchCount = e.touches.length;

		var touchcnt = e.changedTouches.length;
		var preventDefault = false;
		var suppressUIEvent = this.suppressUIEvent;
		for (var i = 0; i < touchcnt; i++) {
			var aTouch = e.changedTouches[i];
			var location = this.getMouseLocation(aTouch);
			var id = aTouch.identifier;
			this.touch[id] = new Sbt.Touch(location, id, this.useGesture);

			if (!suppressUIEvent) {
				var gadget = this.firstMouseEventListenerGadget;
				while (gadget != null) {
					if (gadget.processMouseDown(location, id)) {
						preventDefault = true;
						break;
					}

					gadget = gadget.mouseEventListenerNext;
				}
			}
		}
		if (preventDefault)
			e.preventDefault();
	};

	Sbt.App.prototype.onTouchMove = function(e) {
		this.touchCount = e.touches.length;

		var touchcnt = e.changedTouches.length;
		var preventDefault = false;
		var suppressUIEvent = this.suppressUIEvent;
		for (var i = 0; i < touchcnt; i++) {
			var aTouch = e.changedTouches[i];
			var location = this.getMouseLocation(aTouch);
			var id = aTouch.identifier;
			var touch = this.touch[id];
			if (touch)
				touch.update(location);

			if (!suppressUIEvent) {
				var gadget = this.firstMouseEventListenerGadget;
				while (gadget != null) {
					if (gadget.processMouseMove(location, id)) {
						preventDefault = true;
						break;
					}

					gadget = gadget.mouseEventListenerNext;
				}
			}
		}
		if (preventDefault)
			e.preventDefault();
	};

	Sbt.App.prototype.onTouchEnd = function(e) {
		var touchcnt = e.changedTouches.length;
		var preventDefault = false;
		var suppressUIEvent = this.suppressUIEvent;
		for (var i = 0; i < touchcnt; i++) {
			var aTouch = e.changedTouches[i];
			var location = this.getMouseLocation(aTouch);
			var id = aTouch.identifier;
			var touch = this.touch[id];
			var gadget = this.firstMouseEventListenerGadget;

			if (!suppressUIEvent) {
				if (touch && touch.fireGestureEvent(gadget, location))
					preventDefault = true;

				while (gadget != null) {
					if (gadget.processMouseUp(location, id)) {
						preventDefault = true;
						break;
					}

					gadget = gadget.mouseEventListenerNext;
				}
			}
			delete this.touch[id];
		}
		this.touchCount = e.touches.length;
		if (preventDefault)
			e.preventDefault();
	};

	Sbt.App.prototype.onMouseDown = function(e) {
		this.checkSoundLoader();

		var location = this.getMouseLocation(e);
		this.touch[this.mouseId].reset(location, this.useGesture);
		this.touchCount = 1;

		if (!this.suppressUIEvent) {
			var gadget = this.firstMouseEventListenerGadget;
			while (gadget != null) {
				if (gadget.processMouseDown(location, this.mouseId)) {
					e.preventDefault();

					return;
				}

				gadget = gadget.mouseEventListenerNext;
			}
		}
	};

	Sbt.App.prototype.onMouseMove = function(e) {
		var location = this.getMouseLocation(e);
		this.touch[this.mouseId].update(location);

		if (!this.suppressUIEvent) {
			var gadget = this.firstMouseEventListenerGadget;
			while (gadget != null) {
				if (gadget.processMouseMove(location, this.mouseId)) {
					e.preventDefault();

					return;
				}

				gadget = gadget.mouseEventListenerNext;
			}
		}
	};

	Sbt.App.prototype.onMouseUp = function(e) {
		var location = this.getMouseLocation(e);
		var touch = this.touch[this.mouseId];

		touch.update(location);
		this.touchCount = 0;
		touch.touch = false;

		if (!this.suppressUIEvent) {
			var gadget = this.firstMouseEventListenerGadget;
			var preventDefault = touch.fireGestureEvent(gadget, location);

			while (gadget != null) {
				if (gadget.processMouseUp(location, this.mouseId)) {
					preventDefault = true;
					break;
				}

				gadget = gadget.mouseEventListenerNext;
			}
			if (preventDefault)
				e.preventDefault();
		}
	};

	Sbt.App.prototype.onDoubleClick = function(e) {
		if (!this.suppressUIEvent) {
			var location = this.getMouseLocation(e);
			var gadget = this.firstMouseEventListenerGadget;

			while (gadget != null) {
				if (gadget.processDoubleClick(location)) {
					e.preventDefault();

					return;
				}

				gadget = gadget.mouseEventListenerNext;
			}
		}
	};

	Sbt.App.prototype.onDeviceMotion = function(e) {
		if (e.acceleration) {
			Sbt.acceleration.x = e.acceleration.x; // X方向の傾き加速度
			Sbt.acceleration.y = e.acceleration.y; // Y方向の傾き加速度
			Sbt.acceleration.z = e.acceleration.z; // Z方向の傾き加速度
		}

		if (e.accelerationIncludingGravity) {
			Sbt.gravity.x = e.accelerationIncludingGravity.x; // X方向の傾き重力加速度
			Sbt.gravity.y = e.accelerationIncludingGravity.y; // Y方向の傾き重力加速度
			Sbt.gravity.z = e.accelerationIncludingGravity.z; // Z方向の傾き重力加速度
		}

		if (e.rotationRate) {
			Sbt.gyro.x = e.rotationRate.beta; // X軸の回転加速度
			Sbt.gyro.y = e.rotationRate.gamma; // Y軸の回転加速度
			Sbt.gyro.z = e.rotationRate.alpha; // Z軸の回転加速度
		}
	};

	Sbt.App.prototype.onDeviceOrientation = function(e) {
		if (e.gamma) {
			Sbt.tilt.x = e.gamma; // X方向の傾き

			// Chrome 用の調整
			if (Sbt.tilt.x > 180)
				Sbt.tilt.x -= 360;
		}
		else
			Sbt.tilt.x = 0;

		if (e.beta)
			Sbt.tilt.y = e.beta; // Y方向の傾き
		else
			Sbt.tilt.y = 0;

		if (e.alpha)
			Sbt.tilt.z = e.alpha; // Z方向の傾き
		else
			Sbt.tilt.z = 0;
	};
	
	/**
	* フレームレートの取得
	* @return {number} フレームレート
	*/
	Sbt.App.prototype.getFrameRate = function() {
		return this.frameRate;
	};

	/**
	* タイマーを追加します
	* @function
	* @param {Object} obj タイマーを登録するオブジェクト
	* @param {number} msec コールバックの間隔(ms)
	* @param {Function} callbackFunc コールバック
	* @example
	* var self = this;
	*
	* self.app.appendTimer(this, 50,
	* 	function(obj, count) {
	* 		if (count < 10) {
	* 			// タイマー処理
	* 		}
	* 		else {
	* 			// タイマー終了
	* 			app.deleteTimer(obj);
	* 		}
	* 	}
	* );
	*/
	Sbt.App.prototype.appendTimer = function(obj, msec, callbackFunc) {
		for (var i in this.timerList) {
			if (this.timerList[i].obj == obj) {
				if (isJa)
					throw "sbt.js：そのオブジェクトに対するタイマーは定義済みです。以前のタイマーを削除して下さい。";
				else
					throw "sbt.js : Timer for the object has been already defined. Delete previous one.";
			}
		}

		this.timerList.push({ obj: obj, msec: msec, counter: 0, time: msec, callbackFunc: callbackFunc });
	};

	/**
	* タイマーを削除します
	* @function
	* @param {Object} obj タイマーに登録されているオブジェクト
	*/
	Sbt.App.prototype.deleteTimer = function(obj) {
		for (var i in this.timerList) {
			if (this.timerList[i].obj == obj)
				this.timerList.splice(i, 1);
		}
	};

	/**
	* SE のマスターボリュームの変更
	* @param {Number} volume ボリューム
	*/
	Sbt.App.prototype.setSeMasterVolume = function(volume) {
		this.resource.setSeMasterVolume(volume);
	};

	/**
	* BGM のマスターボリュームの変更
	* @param {Number} volume ボリューム
	*/
	Sbt.App.prototype.setBgmMasterVolume = function(volume) {
		this.resource.setBgmMasterVolume(volume);
	};

	/**
	* SE のミュートの変更
	* @param {boolean} mute ミュート
	*/
	Sbt.App.prototype.setSeMute = function(mute) {
		this.resource.setSeMute(mute);
	};

	/**
	* BGM のミュートの変更
	* @param {boolean} mute ミュート
	*/
	Sbt.App.prototype.setBgmMute = function(mute) {
		this.resource.setBgmMute(mute);
	};

	/**
	* SE の再生
	* @param {string} id 再生する SE の名前
	* @param {Number} [volume] ボリューム（省略時：1）
	* @param {Number} [pitch] ピッチ（省略時：0）
	* @param {Number} [panpot] パン（省略時：0）
	*/
	Sbt.App.prototype.playSe = function(id, volume, pitch, panpot) {
		this.resource.playSe(id, volume, pitch, panpot);
	};

	/**
	* BGM の再生
	* @param {string} id 再生する BGM の名前
	*/
	Sbt.App.prototype.playBgm = function(id) {
		this.resource.playBgm(id);
	};

	/**
	* BGM の停止
	*/
	Sbt.App.prototype.stopBgm = function() {
		this.resource.stopBgm();
	};

	/**
	* SE のボリュームの変更
	* @param {string} id 名前
	* @param {Number} volume ボリューム
	*/
	Sbt.App.prototype.setSeVolume = function(id, volume) {
		this.resource.setSeVolume(id, volume);
	};

	/**
	* SE のピッチの変更
	* @param {string} id 名前
	* @param {Number} pitch ピッチ
	*/
	Sbt.App.prototype.setSePitch = function(id, pitch) {
		this.resource.setSePitch(id, pitch);
	};

	/**
	* SE のパンの変更
	* @param {string} id 名前
	* @param {Number} panpot パン
	*/
	Sbt.App.prototype.setSePanpot = function(id, panpot) {
		this.resource.setSePanpot(id, panpot);
	};

	/**
	* Canvas をブラウザのクライアント領域にフィットさせる
	* @function
	* @param {number} width Canvas の基本の幅
	* @param {number} height Canvas の基本の高さ
	*/
	Sbt.App.prototype.setCanvasFit = function(width, height) {
		var html5Canvas = this.html5Canvas;

		html5Canvas.style.position = "absolute";
		html5Canvas.style.top = "50%";
		html5Canvas.style.left = "50%";

		html5Canvas.width = width;
		html5Canvas.height = height;

		this.onCanvasResize();

		var app = this;
		window.onresize = function() { app.onCanvasResize() };
	};

	Sbt.App.prototype.onCanvasResize = function() {
		var width = document.documentElement.clientWidth || document.body.clientWidth || document.body.scrollWidth;
		var height = document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight;
		var html5Canvas = this.html5Canvas;

		var scaleX = width / html5Canvas.width;
		var scaleY = height / html5Canvas.height;
		var scale;

		if (scaleX < scaleY)
			scale = scaleX;
		else
			scale = scaleY;

		width = html5Canvas.width * scale;
		height = html5Canvas.height * scale;

		html5Canvas.style.width = width + "px";
		html5Canvas.style.height = height + "px";

		html5Canvas.style.marginLeft = -width / 2 + "px";
		html5Canvas.style.marginTop = -height / 2 + "px";
	};

	/**
	* HTTP 通信を行います
	* @function
	* @param {string} url URL
	* @param {Function} callbackFunc 成功時のコールバック関数
	* @param {Function=} callbackErrFunc 失敗時のコールバック関数
	* @param {string=} body POST リクエスト用リクエストボディ
	* @param {boolean=} useActiveXObject ActiveXObject を強制的に使用(Internet Explorer専用)
	* @example
	* Sbt.callHttp("http://～", function(ret, body) {
	* 	// ret:JSONデータ
	* 	// body:生データ
	* });
	* @return {Object} キャンセル用 HTTP Object
	*/
	Sbt.callHttp = function(url, callbackFunc, callbackErrFunc, postbody, useActiveXObject) {
		var httpObj;

		if (!useActiveXObject && window.XMLHttpRequest) {
			httpObj = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			try {
				httpObj = new ActiveXObject("Msxml2.XMLHTTP.6.0");
			} catch (e) {
				try {
					httpObj = new ActiveXObject("Msxml2.XMLHTTP.3.0");
				} catch (e) {
					try {
						httpObj = new ActiveXObject("Msxml2.XMLHTTP");
					}
					catch (e) {
						return null;
					}
				}
			}
		} else
			return null;

		httpObj.onreadystatechange = function() {
			if (httpObj.readyState == 4)
				httpCallback(httpObj.status, httpObj.responseText, callbackFunc, callbackErrFunc)
		}

		try {
			httpObj.open((!postbody) ? "GET" : "POST", url, true);

			if (!postbody)
				httpObj.send();
			else
				httpObj.send(body);

			return httpObj;
		}
		catch (e) {
			if (useActiveXObject)
				return null;
			else
				return Sbt.callHttp(url, callbackFunc, callbackErrFunc, postbody, true);
		}
	};

	var httpCallback = function(status, body, callbackFunc, callbackErrFunc) {
		// state check
		if (status != 0 && status != 200) {
			// Error
			var err = {};

			err.status = status;
			err.codeDisp = "HTTP" + status; // エラーコード（表示用）
			err.body = body;

			if (callbackErrFunc)
				callbackErrFunc(err);
		} else if (callbackFunc) {
			var ret = null;

			try {
				ret = JSON.parse("" + body);
			}
			catch (e) {
			}
			callbackFunc(ret, body);
		}
	};

	/**
	* HTTP 通信をキャンセルします
	* @function
	* @param {Object} httpObj HTTP Object
	*/
	Sbt.cancelHttp = function(httpObj) {
		httpObj.abort();
	};
})();
