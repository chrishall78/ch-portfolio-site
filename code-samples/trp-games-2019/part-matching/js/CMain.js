function CMain(oData){
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    
    var _oPreloader;
    var _oMenu;
    var _oModeMenu;
    var _oHelp;
    var _oGame;

    this.initContainer = function(){
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        createjs.Touch.enable(s_oStage);
		
	s_bMobile = jQuery.browser.mobile;
        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);  
            $('body').on('contextmenu', '#canvas', function(e){ return false; });
        }
		
        s_iPrevTime = new Date().getTime();

	createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.framerate =30;
        
        if(navigator.userAgent.match(/Windows Phone/i)){
                DISABLE_SOUND_MOBILE = true;
        }
        
        s_oSpriteLibrary  = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
    };
    
    this.preloaderReady = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            this._initSounds();
        }
        
        this._loadImages();
        _bUpdate = true;

        // remove preloader automatically - eliminates need for "start" button
        setTimeout(function(){
            s_oMain._onRemovePreloader();
        }, 50);
    };
    
    this.soundLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        _oPreloader.refreshLoader(iPerc);         
    };
    
    this._initSounds = function(){
        var aSoundsInfo = new Array();
        aSoundsInfo.push({path: './sounds/',filename:'fn_explosion',loop:false,volume:1, ingamename: 'fn_explosion'});
        aSoundsInfo.push({path: './sounds/',filename:'click',loop:false,volume:1, ingamename: 'click'});
        aSoundsInfo.push({path: './sounds/',filename:'hourglass_explosion',loop:false,volume:1, ingamename: 'hourglass_explosion'});
        aSoundsInfo.push({path: './sounds/',filename:'break',loop:false,volume:1, ingamename: 'break'});
        aSoundsInfo.push({path: './sounds/',filename:'break2',loop:false,volume:1, ingamename: 'break2'});
        aSoundsInfo.push({path: './sounds/',filename:'game_over',loop:false,volume:1, ingamename: 'game_over'});
        aSoundsInfo.push({path: './sounds/',filename:'swoosh',loop:false,volume:1, ingamename: 'swoosh'});
        aSoundsInfo.push({path: './sounds/',filename:'tictac',loop:false,volume:1, ingamename: 'tictac'});
        aSoundsInfo.push({path: './sounds/',filename:'soundtrack',loop:true,volume:1, ingamename: 'soundtrack'});
        
        RESOURCE_TO_LOAD += aSoundsInfo.length;

        s_aSounds = new Array();
        for(var i=0; i<aSoundsInfo.length; i++){
            s_aSounds[aSoundsInfo[i].ingamename] = new Howl({ 
                                                            src: [aSoundsInfo[i].path+aSoundsInfo[i].filename+'.mp3'],
                                                            autoplay: false,
                                                            preload: true,
                                                            loop: aSoundsInfo[i].loop, 
                                                            volume: aSoundsInfo[i].volume,
                                                            onload: s_oMain.soundLoaded
                                                        });
        }
        
    }; 


    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this);

        s_oSpriteLibrary.addSprite("bg_menu","./sprites/bg_menu.png");        
        s_oSpriteLibrary.addSprite("but_play","./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("pause_panel","./sprites/pause_panel.png");
        s_oSpriteLibrary.addSprite("game_over_panel","./sprites/game_over_panel.png");
        
        s_oSpriteLibrary.addSprite("bg_game","./sprites/bg_game.png");
        s_oSpriteLibrary.addSprite("but_restart","./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("but_restart_big","./sprites/but_restart_big.png");
        s_oSpriteLibrary.addSprite("but_pause","./sprites/but_pause.png");
        s_oSpriteLibrary.addSprite("arrow","./sprites/arrow.png");

        s_oSpriteLibrary.addSprite("but_no","./sprites/but_no.png");
        s_oSpriteLibrary.addSprite("but_yes","./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("but_exit","./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("level_up","./sprites/level_up.png");
        s_oSpriteLibrary.addSprite("time_is_up","./sprites/time_is_up.png");
        s_oSpriteLibrary.addSprite("audio_icon","./sprites/audio_sprites.png");
        s_oSpriteLibrary.addSprite("time_bar","./sprites/time_bar.png");
        s_oSpriteLibrary.addSprite("time_bar_fill","./sprites/time_bar_fill.png");
        s_oSpriteLibrary.addSprite("score_panel","./sprites/score_panel.png");
        s_oSpriteLibrary.addSprite("logo_ctl","./sprites/logo_ctl.png");
        s_oSpriteLibrary.addSprite("but_info","./sprites/but_info.png");
        s_oSpriteLibrary.addSprite("but_fullscreen","./sprites/but_fullscreen.png");
        
        s_oSpriteLibrary.addSprite("fruits","./sprites/fruits.png");        
        for(var i=0; i<7; i++){
            s_oSpriteLibrary.addSprite("fruit_"+i,"./sprites/fruit_"+i+".png");
        }
        s_oSpriteLibrary.addSprite("explosion_9","./sprites/explosion_9.png");
        s_oSpriteLibrary.addSprite("explosion_10","./sprites/explosion_10.png");
        
        s_oSpriteLibrary.addSprite("target","./sprites/target.png");
        
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        _oPreloader.refreshLoader(iPerc);
    };
    
    this._onAllImagesLoaded = function(){
        
    };

    this._onRemovePreloader = function(){
        _oPreloader.unload();
        //s_oSoundTrack = playSound("soundtrack", 1, true);

        s_oMain.gotoMenu();
    };
    
    this.gotoMenu = function(){        
        _oMenu = new CMenu();
        _iState = STATE_MENU;        
    };
    
    this.goToModeMenu = function(){
        _oModeMenu = new CModeMenu();
        _iState = STATE_MENU;
    };
    

    this.gotoGame = function(iLevel){
        s_iCurLevel = 1;
        _oGame = new CGame(_oData, s_iCurLevel);   						
        _iState = STATE_GAME;
    };
    
    this.gotoHelp = function(){
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };
	
    this.stopUpdate = function(){
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display","block");
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            Howler.mute(true);
        }
        
    };

    this.startUpdate = function(){
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display","none");
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            if(s_bAudioActive){
                Howler.mute(false);
            }
        }
        
    };
    
    this._update = function(event){
        if(_bUpdate === false){
                return;
        }
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;
        
        if ( s_iCntTime >= 1000 ){
            s_iCurFps = s_iCntFps;
            s_iCntTime-=1000;
            s_iCntFps = 0;
        }
        
        if(_iState === STATE_GAME){
            _oGame.update();
        }
        
        s_oStage.update(event);

    };
    
    s_oMain = this;
    
    _oData = oData;
    ENABLE_FULLSCREEN = oData.fullscreen;
    ENABLE_CHECK_ORIENTATION = oData.check_orientation;
    
    this.initContainer();
}


var s_bMobile;
var s_bAudioActive = true;
var s_bMusicActive = true;
var s_iTotalScore = 0;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;
var s_iCurLevel;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundTrack = null;
var s_oCanvas;
var s_bFullscreen = false;
var s_aSounds;