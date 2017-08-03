var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView(moneyRes) {
        if (moneyRes === void 0) { moneyRes = 0; }
        var _this = _super.call(this) || this;
        _this.chip = 0;
        _this.chipState = false;
        _this.money = 10000;
        _this.puke = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13
        ];
        _this.myPuke = [];
        _this.enemyPuke = [];
        _this.pukeNum = 0;
        _this.pukeX = 0;
        _this.money = moneyRes > 0 ? moneyRes : _this.money;
        _this.updateMoney();
        _this.chip5.on(Laya.Event.CLICK, _this, _this.chip_5);
        _this.chip10.on(Laya.Event.CLICK, _this, _this.chip_10);
        _this.chip25.on(Laya.Event.CLICK, _this, _this.chip_25);
        _this.chip100.on(Laya.Event.CLICK, _this, _this.chip_100);
        _this.napai.on(Laya.Event.CLICK, _this, _this.deals);
        _this.doubles.on(Laya.Event.CLICK, _this, function () {
            this.money -= this.chip;
            this.updateMoney();
            this.chip *= 2;
            this.updateChip();
        });
        _this.pukeStop.on(Laya.Event.CLICK, _this, function () {
            var myPoint = this.pukeResSum();
            var enemyPoint = this.enemyPukeSum();
            var pukeName = 'ui/cards_' + this.enemyPuke[1] + '.png';
            var img = new Laya.Sprite();
            //加载显示图片
            img.loadImage(pukeName, 220, 50, 100, 135);
            //添加到舞台
            Laya.stage.addChild(img);
            this.reStart.visible = true;
            this.reStart.on(Laya.Event.CLICK, this, this.reSet);
            if (myPoint > 21) {
                // 玩家爆
                this.myBao.visible = true;
            }
            else if (enemyPoint > 21) {
                //系统爆
                this.enemyBao.visible = true;
                this.money += (this.chip * 2);
            }
            else if (enemyPoint == myPoint) {
                // 平手
                this.ping.visible = true;
                this.money += this.chip;
            }
            else if (myPoint > enemyPoint) {
                // 玩家赢
                this.myWin.visible = true;
                this.money += (this.chip * 2);
            }
            else if (myPoint < enemyPoint) {
                // 系统赢
                this.enemyWin.visible = true;
                // this.money -= this.chip;
            }
            this.updateMoney();
            this.bg.disabled = true;
            this.tools.disabled = true;
        });
        return _this;
    }
    // 重新开始
    GameView.prototype.reSet = function () {
        var moneyRes = this.money;
        // console.log( this.money );
        this.removeSelf();
        var gameView = new GameView(moneyRes);
        Laya.stage.addChild(gameView);
    };
    GameView.prototype.chip_5 = function () {
        this.chips(5);
    };
    GameView.prototype.chip_10 = function () {
        this.chips(10);
    };
    GameView.prototype.chip_25 = function () {
        this.chips(25);
    };
    GameView.prototype.chip_100 = function () {
        this.chips(100);
        // Laya.Tween.to( this.chip100, { x:480/2-this.chip100.width, y:this.chip100.y-this.chip100.height-215 }, 1000, Laya.Ease.backInOut,null, 500);
    };
    /**
     * 下注
     * @param 金额
     */
    GameView.prototype.chips = function (num) {
        if (this.chipState) {
            // 结算余额
            this.chip += num;
            // console.log( '结算：'+this.chip );
            this.money -= num;
            this.updateChip();
            this.updateMoney();
            return false;
        }
        else {
            // 结算余额
            this.chip += num;
            this.money -= num;
            this.updateMoney();
            this.updateChip();
            //下注提示
            this.chipState = true;
            Laya.Tween.to(this.up_chip, { y: -100 }, 1000, Laya.Ease.backInOut, Laya.Handler.create(this, this.up_chip_hide), 300);
            // 发牌
            this.deal.visible = true;
            Laya.Tween.to(this.deal, { x: this.deal.x - 100 }, 2000, Laya.Ease.elasticOut, null, 500);
            this.deal.on(Laya.Event.CLICK, this, this.deals);
        }
    };
    //下注提示
    GameView.prototype.up_chip_hide = function () {
        this.up_chip.visible = false;
    };
    //更新赌注 筹码
    GameView.prototype.updateChip = function () {
        var data = {};
        var temp = this.chip;
        var i = 5;
        for (i; i > 0; i--) {
            data["item" + i] = { index: Math.floor(temp % 10) };
            temp /= 10;
        }
        this.chipNums.dataSource = data;
    };
    //更新账户余额
    GameView.prototype.updateMoney = function () {
        var data = {};
        var temp = this.money;
        var i = 5;
        for (i; i > 0; i--) {
            data["item" + i] = { index: Math.floor(temp % 10) };
            temp /= 10;
        }
        this.moneyNums.dataSource = data;
    };
    // 发牌
    GameView.prototype.deals = function () {
        var pointsum = this.pukeResSum();
        if (pointsum > 21) {
            // console.log('爆掉了');
        }
        else {
            if (this.pukeNum == 0) {
                this.randomPuke();
                this.randomPuke();
                this.enemyLoad();
                this.pukeNum = 1;
            }
            else {
                this.randomPuke();
            }
            // 隐藏发牌
            this.deal.visible = false;
            this.chip_Deals.visible = false;
            this.tools.visible = true;
            this.pukeSumbox.visible = true;
            var point = this.pukeResSum();
            this.pukeSum.text = point + '点';
        }
    };
    /*** 随机加载一张扑克*/
    GameView.prototype.randomPuke = function () {
        var point = this.pukeResSum();
        if (point > 21) {
            console.log('玩家爆掉了');
        }
        else {
            var res = this.randoms();
            this.myPuke.push(res);
            var pukeName = 'ui/cards_' + res + '.png';
            // this.myPuke.push( this.puke[res] );
            // let pukeName:string = 'ui/cards_'+this.puke[res]+'.png';
            var img = new Laya.Sprite();
            //加载显示图片
            img.loadImage(pukeName, 100 + this.pukeX, this.deal.y + 30, 100, 135);
            //添加到舞台
            Laya.stage.addChild(img);
            this.pukeX += 30;
        }
    };
    /**
     * 系统加载两张牌
     */
    GameView.prototype.enemyLoad = function () {
        var res = this.randoms();
        this.enemyPuke.push(res);
        var pukeName = 'ui/cards_' + res + '.png';
        // this.enemyPuke.push( this.puke[res] );
        // let pukeName:string = 'ui/cards_'+this.puke[res]+'.png';
        var img = new Laya.Sprite();
        //加载显示图片
        img.loadImage(pukeName, 180, 50, 100, 135);
        //添加到舞台
        Laya.stage.addChild(img);
        var img2 = new Laya.Sprite();
        var cardsImg = "ui/cards.png";
        //加载显示图片
        img.loadImage(cardsImg, 220, 50, 100, 135);
        //添加到舞台
        Laya.stage.addChild(img2);
        // 第二张牌是隐藏的
        var res1 = this.randoms();
        this.enemyPuke.push(this.puke[res1]);
    };
    // 随机一个数字
    GameView.prototype.randoms = function () {
        var index = Math.ceil(Math.random() * 52);
        return index;
    };
    // 计算我的点数
    GameView.prototype.pukeResSum = function () {
        var countSum = 0;
        var puke = this.puke;
        this.myPuke.forEach(function (v) {
            var tempNum = puke[v];
            if (tempNum > 10) {
                tempNum = 10;
            }
            countSum += tempNum;
        });
        return countSum;
    };
    // 计算系统点数
    GameView.prototype.enemyPukeSum = function () {
        var countSum = 0;
        var puke = this.puke;
        this.enemyPuke.forEach(function (v) {
            var tempNum = puke[v];
            if (tempNum > 10) {
                tempNum = 10;
            }
            countSum += tempNum;
        });
        return countSum;
    };
    return GameView;
}(ui.GameUI));
//# sourceMappingURL=GameView.js.map