function CPausePanel(){
    
    var _oBg;
    var _oPauseText;
    var _oButContinue;
    var _oListener;
    
    this._init = function(){
        
        var oSprite = s_oSpriteLibrary.getSprite('pause_panel');
        _oBg = createBitmap(oSprite);
        _oListener = _oBg.on("mousedown", function(){});
        s_oStage.addChild(_oBg);
        
        _oPauseText = new CFormatText2(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 -275, TEXT_ISPAUSED, "#ffffff", s_oStage, "#821010", 70);
        _oPauseText.setWidth(400);
        _oPauseText.setOutline(5);
        
        _oButContinue = new CGfxButton(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 30, s_oSpriteLibrary.getSprite('but_play'), s_oStage);
        _oButContinue.addEventListener(ON_MOUSE_UP, this._onButContinueRelease, this);
    };
    
    this.unload = function(){
        _oPauseText.unload();
        _oPauseText = null;
        _oButContinue.unload();
        _oButContinue = null;
        
        _oBg.off("mousedown", _oListener);
        
        s_oStage.removeChild(_oBg);
    };
    
    this._onButContinueRelease = function(){
        $(s_oMain).trigger("show_interlevel_ad");
        s_oGame.resumeGame();
    };

    
    this._init();

}