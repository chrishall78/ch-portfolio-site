function CScoreText (iScore,iX,iY){
    
    var _oScoreHit;
    
    
    this._init = function(iScore,iX,iY){

        _oScoreHit = new CFormatText(iX, iY, iScore, "#ffffff", s_oStage, "#ff0000", 35);
        _oScoreHit.setOutline(5);
        _oScoreHit.getText().alpha = 0;
        
        var oParent = this;
        //createjs.Tween.get(_oScoreHit.getText()).to({alpha:1}, 400, createjs.Ease.cubicIn).call(function(){oParent.moveUp();});  
    };
	
    this.moveUp = function(){
            var iNewY = _oScoreHit.getPos().y-150;
            var oParent = this;
            //createjs.Tween.get(_oScoreHit.getText()).to({y:iNewY}, 1500, createjs.Ease.sineIn).call(function(){oParent.unload();});
            //createjs.Tween.get(_oScoreHit.getText()).wait(750).to({alpha:0}, 750);
    };
	
    this.unload = function(){
        _oScoreHit.unload();    
    };
	
    this._init(iScore,iX,iY);
    
}