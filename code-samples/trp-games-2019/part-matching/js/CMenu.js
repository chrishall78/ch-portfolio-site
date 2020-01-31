function CMenu(){
    
    var _oButCredits;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _oBg;
    var _oButPlay;
    var _oAudioToggle;
    var _oParent;    
    
    var _pStartPosAudio;
    var _pStartPosCredits;
    var _pStartPosFullscreen;
    
    this._init = function(){

        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);

        // if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
        //     var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
        //     _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height/2)- 15, y: (oSprite.height/2) + 15};            
        //     _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive, s_oStage);
        //     _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);            
        // }
        
        var oSprite = s_oSpriteLibrary.getSprite('but_info');
        _pStartPosCredits = {x:(oSprite.height/2)+ 15, y:(oSprite.height/2) + 15};
        _oButCredits = new CGfxButton(_pStartPosCredits.x, _pStartPosCredits.y, oSprite, s_oStage);
        _oButCredits.addEventListener(ON_MOUSE_UP, this._onButCreditRelease, this);
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && screenfull.enabled){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            _pStartPosFullscreen = {x:_pStartPosCredits.x + oSprite.width/2 +5,y:_pStartPosCredits.y};

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        var oSprite = s_oSpriteLibrary.getSprite('but_play');
        _oButPlay = new CGfxButton(CANVAS_WIDTH/2, 850, oSprite, s_oStage);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);   

        setVolume("soundtrack",1);
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };
    
    this.unload = function(){
        
        _oButPlay.unload(); 
        _oButPlay = null;
        _oButCredits.unload();
        s_oStage.removeChild(_oBg);
        
        // if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
        //     _oAudioToggle.unload();
        //     _oAudioToggle = null;
        // }
        
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.unload();
        }
        
        _oBg = null;
        s_oMenu = null;
    };

    
    
   
    this.refreshButtonPos = function(iNewX,iNewY){
        _oButCredits.setPosition(_pStartPosCredits.x + s_iOffsetX, s_iOffsetY + _pStartPosCredits.y);
        
        // if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
        //     _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        // }
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + s_iOffsetX,_pStartPosFullscreen.y + s_iOffsetY);
        }
    };
   
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onButPlayRelease = function(){
        this.unload();        
        
        s_oMain.gotoGame();
        
        $(s_oMain).trigger("start_session");
    };  
 
    this._onButCreditRelease = function(){
        new CCreditsPanel();
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
    
    s_oMenu = this;
    
    _oParent = this;
    this._init();
}

var s_oMenu = null;