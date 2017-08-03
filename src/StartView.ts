class StartView extends ui.StartUI {
    constructor() {
        super();
        this.startBtn.on(Laya.Event.CLICK,this,this.start);
         Laya.SoundManager.playMusic("res/sound/bg.mp3", 1, Laya.Handler.create(this, this.onComplete));
    }

    // 开始游戏
    private start():void{
        // console.log('点击了开始按钮');
        this.removeSelf();
        let gameView:GameView = new GameView() ;
        Laya.stage.addChild(gameView) ;        
    }

    private onComplete():void{
        console.log('音乐播放完成');
    }

}