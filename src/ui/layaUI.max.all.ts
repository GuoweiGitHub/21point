
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class GameUI extends View {
		public bg:Laya.Image;
		public chip_Deals:Laya.Box;
		public chip5:Laya.Image;
		public chip10:Laya.Image;
		public chip25:Laya.Image;
		public chip100:Laya.Image;
		public up_chip:Laya.Image;
		public deal:Laya.Image;
		public moneyNums:Laya.Box;
		public chipNums:Laya.Box;
		public tools:Laya.Box;
		public doubles:Laya.Image;
		public napai:Laya.Image;
		public pukeStop:Laya.Image;
		public pukeSumbox:Laya.Box;
		public pukeSum:laya.display.Text;
		public enemyBao:Laya.Image;
		public myBao:Laya.Image;
		public ping:Laya.Image;
		public enemyWin:Laya.Image;
		public myWin:Laya.Image;
		public reStart:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":480,"height":800},"child":[{"type":"Image","props":{"y":0,"x":0,"width":480,"var":"bg","skin":"ui/background.jpg","height":800}},{"type":"Box","props":{"y":649,"x":19,"var":"chip_Deals"},"child":[{"type":"Image","props":{"y":2,"width":90,"var":"chip5","skin":"ui/chip_01.png","height":90}},{"type":"Image","props":{"y":3,"x":119,"width":90,"var":"chip10","skin":"ui/chip_02.png","height":90}},{"type":"Image","props":{"x":242,"width":90,"var":"chip25","skin":"ui/chip_03.png","height":90}},{"type":"Image","props":{"x":361,"width":90,"var":"chip100","skin":"ui/chip_04.png","height":90}}]},{"type":"Image","props":{"y":1,"x":115,"width":250,"var":"up_chip","skin":"ui/panels_btn_01.png","height":100}},{"type":"Image","props":{"y":400,"x":470,"width":250,"visible":false,"var":"deal","skin":"ui/panels_btn_08.png","height":100}},{"type":"Box","props":{"y":764,"x":210,"var":"moneyNums"},"child":[{"type":"Clip","props":{"width":25,"skin":"ui/clip_number.png","name":"item0","index":0,"height":30,"clipX":10}},{"type":"Clip","props":{"x":23,"width":25,"skin":"ui/clip_number.png","name":"item1","index":0,"height":30,"clipX":10}},{"type":"Clip","props":{"x":48,"width":25,"skin":"ui/clip_number.png","name":"item2","index":0,"height":30,"clipX":10}},{"type":"Clip","props":{"x":71,"width":25,"skin":"ui/clip_number.png","name":"item3","index":0,"height":30,"clipX":10}},{"type":"Clip","props":{"x":93,"width":25,"skin":"ui/clip_number.png","name":"item4","index":0,"height":30,"clipX":10}},{"type":"Clip","props":{"x":117,"width":25,"skin":"ui/clip_number.png","name":"item5","index":0,"height":30,"clipX":10}}]},{"type":"Box","props":{"y":584,"x":69,"var":"chipNums"},"child":[{"type":"Clip","props":{"width":25,"skin":"ui/clip_number.png","name":"item0","index":0,"height":30,"clipX":10}},{"type":"Clip","props":{"y":0,"x":22,"width":25,"skin":"ui/clip_number.png","name":"item1","index":0,"height":30,"clipX":10}},{"type":"Clip","props":{"y":0,"x":45,"width":25,"skin":"ui/clip_number.png","name":"item2","index":0,"height":30,"clipX":10}},{"type":"Clip","props":{"y":0,"x":69,"width":25,"skin":"ui/clip_number.png","name":"item3","index":0,"height":30,"clipX":10}},{"type":"Clip","props":{"y":0,"x":91,"width":25,"skin":"ui/clip_number.png","name":"item4","index":0,"height":30,"clipX":10}},{"type":"Clip","props":{"y":0,"x":115,"width":25,"skin":"ui/clip_number.png","name":"item5","index":0,"height":30,"clipX":10}}]},{"type":"Box","props":{"y":649,"x":19,"visible":false,"var":"tools"},"child":[{"type":"Image","props":{"width":90,"visible":false,"skin":"ui/buttons_01.png","height":90}},{"type":"Image","props":{"x":123,"width":90,"var":"doubles","skin":"ui/buttons_02.png","height":90}},{"type":"Image","props":{"x":245,"width":90,"var":"napai","skin":"ui/buttons_03.png","height":90}},{"type":"Image","props":{"x":361,"width":90,"var":"pukeStop","skin":"ui/buttons_04.png","height":90}}]},{"type":"Box","props":{"y":375,"x":376,"visible":false,"var":"pukeSumbox"},"child":[{"type":"Image","props":{"width":250,"skin":"ui/panels_btn_05.png","height":150}},{"type":"Text","props":{"y":56,"x":13,"width":93,"var":"pukeSum","text":"12","height":48,"fontSize":45,"font":"SimHei"}}]},{"type":"Image","props":{"y":305,"x":115,"width":250,"visible":false,"var":"enemyBao","skin":"ui/panels_btn_03.png","height":100}},{"type":"Image","props":{"y":305,"x":115,"width":250,"visible":false,"var":"myBao","skin":"ui/panels_btn_04.png","height":100}},{"type":"Image","props":{"y":305,"x":115,"width":250,"visible":false,"var":"ping","skin":"ui/panels_btn_07.png","height":100}},{"type":"Image","props":{"y":305,"x":115,"width":250,"visible":false,"var":"enemyWin","skin":"ui/panels_btn_12.png","height":100}},{"type":"Image","props":{"y":305,"x":115,"width":250,"visible":false,"var":"myWin","skin":"ui/panels_btn_13.png","height":100}},{"type":"Image","props":{"y":400,"x":381,"width":250,"visible":false,"var":"reStart","skin":"ui/panels_btn_10.png","height":100}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.GameUI.uiView);
        }
    }
}

module ui {
    export class StartUI extends View {
		public startBtn:Laya.Animation;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":480,"height":800},"child":[{"type":"Image","props":{"y":0,"x":0,"width":480,"skin":"ui/titleScreen.jpg","height":800}},{"type":"Animation","props":{"y":590,"x":241,"width":180,"var":"startBtn","source":"start.ani","pivotY":40.38461538461536,"pivotX":92.30769230769229,"interval":50,"height":90,"autoPlay":true}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.StartUI.uiView);
        }
    }
}
