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
var StartView = (function (_super) {
    __extends(StartView, _super);
    function StartView() {
        var _this = _super.call(this) || this;
        _this.startBtn.on(Laya.Event.CLICK, _this, _this.start);
        Laya.SoundManager.playMusic("res/sound/bg.mp3", 1, Laya.Handler.create(_this, _this.onComplete));
        return _this;
    }
    // 开始游戏
    StartView.prototype.start = function () {
        // console.log('点击了开始按钮');
        this.removeSelf();
        var gameView = new GameView();
        Laya.stage.addChild(gameView);
    };
    StartView.prototype.onComplete = function () {
        console.log('音乐播放完成');
    };
    return StartView;
}(ui.StartUI));
//# sourceMappingURL=StartView.js.map