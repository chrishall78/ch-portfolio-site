function CInterface(iCurLevel){
    
    var _oAudioToggle;
    var _oButExit;
    var _oScoreText;
    var _oButRestart;
    var _oButPause;
    var _oTimeNum;
    var _oHelpPanel=null;
    var _oPanelContainer;
    var _oButFullscreen;
    var _oAreYouSurePanel;
    var _oConfirmRestartPanel;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;

    var _oMask;
   
    
    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosPause;
    var _pStartPosRestart;
    var _pStartPosFullscreen;
    
    this._init = function(iCurLevel){  
        
        // var oScorePanel = createBitmap(s_oSpriteLibrary.getSprite('score_panel'));
        // oScorePanel.x = 30;
        // oScorePanel.y = 170;
        // s_oStage.addChild(oScorePanel);
        
        _oScoreText = new CFormatText(290, 100, "000000000", "#ffffff", s_oStage, "#ff0000", 60);
        _oScoreText.setAlign("left");
        _oScoreText.setOutline(4);
        
        _oPanelContainer = new createjs.Container();
        s_oStage.addChild(_oPanelContainer);
        
        oSprite = s_oSpriteLibrary.getSprite('time_bar_fill');
        var oTimePos = {x: CANVAS_WIDTH/2 - oSprite.width/2, y: 165};
        var oEnergyBarFill = createBitmap(oSprite);
        oEnergyBarFill.x=oTimePos.x+11;
        oEnergyBarFill.y=oTimePos.y+11;
        s_oStage.addChild(oEnergyBarFill);
        
        oSprite = s_oSpriteLibrary.getSprite('time_bar');
        var oEnergyBarBg = createBitmap(oSprite);
        oEnergyBarBg.x=oTimePos.x;
        oEnergyBarBg.y=oTimePos.y;
        s_oStage.addChild(oEnergyBarBg);
        
        oSprite = s_oSpriteLibrary.getSprite('time_bar_fill');
        _oMask = new createjs.Shape();
        _oMask.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(0, 0, oSprite.width,oSprite.height);
        _oMask.x= oTimePos.x+11;
        _oMask.y= oTimePos.y+11;

        s_oStage.addChild(_oMask);
        oEnergyBarFill.mask = _oMask;
        
        _oTimeNum = new CFormatText(CANVAS_WIDTH/2, oTimePos.y +6, "0:00", "#ffffff", s_oStage, "#ff0000", 35);
        _oTimeNum.setAlign("center");
        _oTimeNum.setOutline(4);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height/2) - 270, y: (oSprite.height/2) + 950};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
            
        // if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){

        //     var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
        //     _pStartPosAudio = {x: _pStartPosExit.x - oSprite.width/2, y: _pStartPosExit.y};        
        //     _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive, s_oStage);
        //     _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        //     var oSprite = s_oSpriteLibrary.getSprite('but_pause');
        //     _pStartPosPause = {x: _pStartPosAudio.x - oSprite.width, y: _pStartPosExit.y};         
        // } else {
            var oSprite = s_oSpriteLibrary.getSprite('but_pause');
            _pStartPosPause = {x: _pStartPosExit.x - oSprite.width, y: _pStartPosExit.y};            
        // }
        
        _oButPause = new CGfxButton(_pStartPosPause.x, _pStartPosPause.y, oSprite, s_oStage);
        _oButPause.addEventListener(ON_MOUSE_UP, this._onButPauseRelease);


        var oSprite = s_oSpriteLibrary.getSprite('but_restart');
        _pStartPosRestart = {x: _pStartPosPause.x - oSprite.width, y: _pStartPosExit.y}; 
        _oButRestart = new CGfxButton(_pStartPosRestart.x, _pStartPosRestart.y, oSprite, s_oStage);
        _oButRestart.addEventListener(ON_MOUSE_UP, this._onButRestartRelease);

        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && screenfull.enabled){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            _pStartPosFullscreen = {x:_pStartPosRestart.x - oSprite.width/2 ,y:_pStartPosRestart.y};

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        _oConfirmRestartPanel = new CAreYouSurePanel(s_oStage);
        _oConfirmRestartPanel.addEventListener(ON_BUT_YES_DOWN, this._onConfirmRestart, this);
        
        _oAreYouSurePanel = new CAreYouSurePanel(s_oStage);
        _oAreYouSurePanel.addEventListener(ON_BUT_YES_DOWN, this._onConfirmExit, this);
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
        
    };
    
    this.unload = function(){   
        _oAreYouSurePanel.unload();
        _oConfirmRestartPanel.unload();
        
        _oScoreText.unload();
        _oScoreText = null;

        _oButRestart.unload();
        _oButRestart = null;
        _oButPause.unload();
        _oButPause = null;
        
        _oTimeNum.unload();
        _oTimeNum = null;
        
        
        _oButExit.unload();
        // if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
        //     _oAudioToggle.unload();
        //     _oAudioToggle = null;
        // }
        
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.unload();
        }
        
        s_oInterface = null;
        
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oButExit.setPosition(_pStartPosExit.x - iNewX,iNewY + _pStartPosExit.y);
        _oButPause.setPosition(_pStartPosPause.x - iNewX,iNewY + _pStartPosPause.y);
        _oButRestart.setPosition(_pStartPosRestart.x - iNewX,iNewY + _pStartPosRestart.y);        
        // if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
        //     _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        // }
        
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x - s_iOffsetX,_pStartPosFullscreen.y + s_iOffsetY);
        }
    };
    
    this.getPanelContainer = function(){
        return _oPanelContainer;
    };

    this.refreshScore = function(iValue){

        var iNumber = pad(iValue, 9);
        
        function pad(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        }
        
        _oScoreText.setText(iNumber);
        
    };

    this.refreshTime = function(iTime, iBarLength){        
        var iNum = formatTime(iTime);
        _oTimeNum.setText(iNum);
        
        _oMask.scaleX = iBarLength;
        if(iTime < 100 || iTime > 16000){            
            createjs.Tween.removeTweens(_oTimeNum.getText());
            _oTimeNum.getText().scaleX = _oTimeNum.getText().scaleY = 1;
        } else if(iTime < 16000){
            createjs.Tween.get(_oTimeNum.getText(), {loop:true}).to({scaleX:1.3, scaleY:1.3}, 100, createjs.Ease.powIn).to({scaleX:1, scaleY:1}, 100).wait(800);
        }
        
    };

    this.setTimerColor = function(szColor, szOutline){
        _oTimeNum.setColor(szColor,szOutline);
    };

    this._onButHelpRelease = function(){
        _oHelpPanel = new CHelpPanel();
    };
    
    this._onButRestartRelease = function(){
        if(!s_oGame.getBlock()){
            _oConfirmRestartPanel.show(TEXT_ARE_SURE, 60);
        }
    };
    
    this._onConfirmRestart = function(){
        s_oGame.restartGame();
        $(s_oMain).trigger("show_interlevel_ad");
        $(s_oMain).trigger("restart_level", s_iCurLevel);
    };
    
    this._onButPauseRelease = function(){
        s_oGame.pauseGame();
    };
    
    this._onButLevelMenuRelease = function(){
        s_oGame.unload();
        
        s_oMain.goToModeMenu();
    };    
    
    this.onExitFromHelp = function(){
        _oHelpPanel.unload();
    };
    
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onExit = function(){
        if(!s_oGame.getBlock()){
            _oAreYouSurePanel.show(TEXT_ARE_SURE, 60);
        }
    };
    
    this._onConfirmExit = function(){
        s_oGame.onExit();
        $(s_oMain).trigger("end_level",s_iCurLevel);
        $(s_oMain).trigger("end_session");
    };
    
    this.resetFullscreenBut = function(){
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.setActive(s_bFullscreen);
        }
    };

    this._onFullscreenRelease = function(){
        if(s_bFullscreen) { 
            _fCancelFullScreen.call(window.document);
        }else{
            _fRequestFullScreen.call(window.document.documentElement);
        }
        
        sizeHandler();
    };
    
    s_oInterface = this;
    
    this._init(iCurLevel);
    
    return this;
}

var s_oInterface = null;