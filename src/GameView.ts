class GameView extends ui.GameUI{

    private chip:number = 0;
    private chipState:boolean = false;
    private money:number = 10000;
    protected puke:Array<number>=[
        0,1,2,3,4,5,6,7,8,9,10,11,12,13, 
        1,2,3,4,5,6,7,8,9,10,11,12,13, 
        1,2,3,4,5,6,7,8,9,10,11,12,13, 
        1,2,3,4,5,6,7,8,9,10,11,12,13 
    ];
    private myPuke:Array<number> = [];
    private enemyPuke:Array<number> = [];
    private pukeNum:number = 0;
    private pukeX:number = 0;

    constructor(moneyRes:number=0) {
        super();
        this.money = moneyRes>0 ? moneyRes :this.money;
        this.updateMoney();
        this.chip5.on(Laya.Event.CLICK,this,this.chip_5 );
        this.chip10.on(Laya.Event.CLICK,this,this.chip_10 );
        this.chip25.on(Laya.Event.CLICK,this,this.chip_25 );
        this.chip100.on(Laya.Event.CLICK,this,this.chip_100 );
        this.napai.on(Laya.Event.CLICK,this,this.deals);
        this.doubles.on(Laya.Event.CLICK,this,function(){
            this.money -= this.chip;
            this.updateMoney();
            this.chip *= 2;
            this.updateChip();
        });
        this.pukeStop.on(Laya.Event.CLICK,this,function(){
            let myPoint:number=this.pukeResSum();
            let enemyPoint:number=this.enemyPukeSum();

            let pukeName:string = 'ui/cards_'+this.enemyPuke[1]+'.png';
            let img:Laya.Sprite = new Laya.Sprite();
            //加载显示图片
            img.loadImage(pukeName,220,50,100,135);
            //添加到舞台
            Laya.stage.addChild(img);   

            this.reStart.visible = true;
            this.reStart.on(Laya.Event.CLICK,this,this.reSet );

            if( myPoint>21 ){
                // 玩家爆
                this.myBao.visible=true;
                          
            }else if(enemyPoint >21){
                //系统爆
                this.enemyBao.visible=true;
                this.money += (this.chip*2);
                
            }else if( enemyPoint == myPoint ){
                // 平手
                this.ping.visible=true;
                this.money += this.chip;

            }else if(myPoint>enemyPoint ){
                // 玩家赢
                this.myWin.visible=true;
                this.money += (this.chip*2);   

            }else if(myPoint<enemyPoint ){
                // 系统赢
                this.enemyWin.visible=true;
                // this.money -= this.chip;
            }

            this.updateMoney();
            this.bg.disabled = true;
            this.tools.disabled = true;  
            
        });

    }


    // 重新开始
    private reSet():void{

        var moneyRes:number = this.money;
        // console.log( this.money );

        this.removeSelf();
        let gameView:GameView = new GameView(moneyRes) ;
        Laya.stage.addChild(gameView) ;    
    }

    private chip_5():void{
        this.chips(5);
    }

    private chip_10():void{
        this.chips(10);
    }

    private chip_25():void{
        this.chips(25);
    }

    private chip_100():void{
        this.chips(100);
        // Laya.Tween.to( this.chip100, { x:480/2-this.chip100.width, y:this.chip100.y-this.chip100.height-215 }, 1000, Laya.Ease.backInOut,null, 500);
    }

    /**
     * 下注
     * @param 金额 
     */
    private chips(num:number):any{

        if( this.chipState ){
            // 结算余额
            this.chip += num;
            // console.log( '结算：'+this.chip );
            this.money -= num; 
            this.updateChip();
            this.updateMoney();   
            return false;
        }else{
 
            // 结算余额
            this.chip += num;
            this.money -= num; 
            this.updateMoney();      
            this.updateChip();

            //下注提示
            this.chipState=true;
            Laya.Tween.to( this.up_chip, { y:-100 }, 1000, Laya.Ease.backInOut,Laya.Handler.create(this, this.up_chip_hide), 300);

            // 发牌
            this.deal.visible = true;
            Laya.Tween.to( this.deal, { x:this.deal.x-100 }, 2000, Laya.Ease.elasticOut, null, 500);
            this.deal.on(Laya.Event.CLICK,this,this.deals );
        }

    }


    //下注提示
    public up_chip_hide():void{
        this.up_chip.visible = false;        
    }


    //更新赌注 筹码
    private updateChip():void{
        let data:any ={};
        let temp:number = this.chip;
        let i:number = 5;

        for(i; i>0; i-- ){
            data["item"+i] = {index: Math.floor(temp%10) };
            temp/=10;
        }

        this.chipNums.dataSource = data;

    }    


    //更新账户余额
    private updateMoney():void{
        let data:any ={};
        let temp:number = this.money;
        let i:number = 5;
        
        for(i; i>0; i--){
            data["item"+i] = {index: Math.floor(temp%10) };
            temp/=10;
        }
        this.moneyNums.dataSource = data;
    }  


    // 发牌
    private deals():void{

        let pointsum:number=this.pukeResSum();
        if(pointsum>21){
            // console.log('爆掉了');
        }else{
            if( this.pukeNum == 0){
                this.randomPuke();
                this.randomPuke();
                this.enemyLoad();
                this.pukeNum = 1;       
            } else{
                this.randomPuke();
            }       
            
            // 隐藏发牌
            this.deal.visible  = false;
            this.chip_Deals.visible = false;
            this.tools.visible = true;    
            this.pukeSumbox.visible = true;

            let point:number=this.pukeResSum();
            this.pukeSum.text = point+'点'; 
        }

    }

    /*** 随机加载一张扑克*/
    private randomPuke():void{
            let point:number=this.pukeResSum();
            if( point >21 ){
                console.log('玩家爆掉了');
            }else{
                let res:number = this.randoms();

                this.myPuke.push( res );
                let pukeName:string = 'ui/cards_'+res+'.png';
                // this.myPuke.push( this.puke[res] );
                // let pukeName:string = 'ui/cards_'+this.puke[res]+'.png';
                let img:Laya.Sprite = new Laya.Sprite();
                //加载显示图片
                img.loadImage(pukeName,100+this.pukeX,this.deal.y+30,100,135);
                //添加到舞台
                Laya.stage.addChild(img);    
                this.pukeX +=30 ; 
            }                     
    }


    /**
     * 系统加载两张牌
     */
    private enemyLoad():void{
            let res:number = this.randoms();
            this.enemyPuke.push( res );
            let pukeName:string = 'ui/cards_'+res+'.png';

            // this.enemyPuke.push( this.puke[res] );
            // let pukeName:string = 'ui/cards_'+this.puke[res]+'.png';

            let img:Laya.Sprite = new Laya.Sprite();
            //加载显示图片
            img.loadImage(pukeName,180,50,100,135);
            //添加到舞台
            Laya.stage.addChild(img);    

            let img2:Laya.Sprite = new Laya.Sprite();
            let cardsImg:string = "ui/cards.png";
            //加载显示图片
            img.loadImage(cardsImg,220,50,100,135);
            //添加到舞台
            Laya.stage.addChild(img2);  

            // 第二张牌是隐藏的
            let res1:number = this.randoms();
            this.enemyPuke.push( this.puke[res1] );              
    }

    // 随机一个数字
    private randoms():number{
        let index:number = Math.ceil(Math.random()*52);
        return  index;      
    }

    // 计算我的点数
    private pukeResSum():number{
        let countSum:number = 0;
        let puke:Array<number> = this.puke;
        this.myPuke.forEach(function(v:number){

            let tempNum:number = puke[v];
            if(tempNum>10){
                tempNum = 10;
            }
            countSum += tempNum;
        });
        return countSum;
    }

    // 计算系统点数
    private enemyPukeSum():number{
        let countSum:number = 0;
        let puke:Array<number> = this.puke;

        this.enemyPuke.forEach(function(v:number){
            let tempNum:number = puke[v];
            if(tempNum>10){
                tempNum = 10;
            }
            countSum += tempNum;
        });
        return countSum;        
    }

}