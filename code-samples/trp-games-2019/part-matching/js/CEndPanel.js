function CEndPanel(iScore, iTimeBonus){
    
    var _oBg;
    var _oParent;
    var _oPanel;
    var _oGroup;    
    var _oMsgText;
    var _oScoreText;

    var _oButRetry;

    
    this._init = function(iScore, iTimeBonus){
        
        var graphics = new createjs.Graphics().beginFill("rgba(0,0,0,0.7)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oBg = new createjs.Shape(graphics);
        _oBg.alpha = 0;
        s_oStage.addChild(_oBg);
       
        _oGroup = new createjs.Container();
        _oGroup.y = -1550;

        var oSprite = s_oSpriteLibrary.getSprite('game_over_panel');

        _oPanel = createBitmap(oSprite);
        _oPanel.regX = oSprite.width/2;
        _oPanel.regY = oSprite.height/2;
        _oPanel.x = CANVAS_WIDTH/2;
        _oPanel.y = CANVAS_HEIGHT/2;        
        _oGroup.addChild(_oPanel);
        
        var iTimeComplete = 750;
        createjs.Tween.get(_oBg).to({alpha:1}, iTimeComplete, createjs.Ease.linear);

        _oBg.on("mousedown", function(){});

       
           
        setVolume("soundtrack",0); 
        
       
        s_oStage.addChild(_oGroup);
        
		
	$(s_oMain).trigger("save_score",iScore);
        $(s_oMain).trigger("share_event",iScore);
        $(s_oMain).trigger("end_level",s_iCurLevel);
		
        setTimeout(function(){_oParent._addElements();}, iTimeComplete);
    };
    
    this._addElements = function(){
 
            _oMsgText = new CFormatText2(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 -150, TEXT_GAMEOVER, "#ffffff", _oGroup, "#821010", 80);
            _oMsgText.setOutline(6);
            
            _oMsgText = new CFormatText2(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 -50, TEXT_SCORE +" "+iScore, "#ffffff", _oGroup, "#821010", 50);
            _oMsgText.setOutline(4);
            
            _oButRetry = new CGfxButton(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 +150, s_oSpriteLibrary.getSprite('but_restart_big'), _oGroup);
            _oButRetry.addEventListener(ON_MOUSE_UP, this._onButRetryRelease, this);

            createjs.Tween.get(_oGroup).to({y:0}, 500, createjs.Ease.cubicIn);   
    };
    
    this.unload = function(){
        _oMsgText.unload();
        _oMsgText = null;

            
        _oButRetry.unload();
        _oButRetry = null;    
            
        s_oStage.removeChild(_oBg);
        s_oStage.removeChild(_oGroup);

    };
    
    this._onButRetryRelease = function(){
        createjs.Tween.get(_oGroup).to({y:480}, 500, createjs.Ease.backIn).call(function() {
            $(s_oMain).trigger("show_interlevel_ad");
            s_oGame.setBlock(false); 
            s_oGame.restartGame();
        });
    };

    _oParent = this;
    this._init(iScore, iTimeBonus);
    
    return this;
}
