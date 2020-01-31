function CHelpPanel(){

    var _bPage1Active = true;

    var _oHelpBg;
    
    var _oMsg1;
    var _oRightArrow;
    
    var _oMsg2;
    var _oMsg3;
    var _oMsg4;
    var _oBomb;
    var _oClock;
    var _oChanging;
    var _oLeftArrow;
    var _oListener;
    
    var _aThree;
    var _aFour;
    
    var _oParent;

    this._init = function(){
       
        var oSprite = s_oSpriteLibrary.getSprite('pause_panel');
        _oHelpBg = createBitmap(oSprite);
        _oListener = _oHelpBg.on("click", function(){_oParent._onExitHelp();});
        s_oStage.addChild(_oHelpBg);
        
        _oBomb = createSprite(s_oFruitSpritesheet, "bomb",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
        _oBomb.x = 150;
        _oBomb.y = 350;
        
        _oClock = createSprite(s_oFruitSpritesheet, "clock",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
        _oClock.x = 430;
        _oClock.y = 450;
        
        _oChanging = createSprite(s_oFruitSpritesheet, "changing",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
        _oChanging.x = 450;
        _oChanging.y = 480;
        
        _aThree = new Array();
        var iOffset = 10;
        for(var i=0; i<3; i++){
            _aThree[i] = createSprite(s_oFruitSpritesheet, "type_0",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
            _aThree[i].x = CANVAS_WIDTH/2 +i*(CELL_SIZE+iOffset) - CELL_SIZE-iOffset;
            _aThree[i].y = 250;
        }
        
        _aFour = new Array();
        for(var i=0; i<4; i++){
            _aFour[i] = createSprite(s_oFruitSpritesheet, "type_4",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
            _aFour[i].x = CANVAS_WIDTH/2 +i*(CELL_SIZE+iOffset) - (CELL_SIZE+iOffset)*3/2;
            _aFour[i].y = 545;
        }
        
        this._buildPage1();
    };

    this.unload = function(){       
        
        if(_bPage1Active){
            _oMsg1.unload();
            _oMsg2.unload();
            _oMsg4.unload();
            s_oStage.removeChild(_oChanging);
            for(var i=0; i<3; i++){
                s_oStage.removeChild(_aThree[i]);
            }
            // for(var i=0; i<4; i++){
            //     s_oStage.removeChild(_aFour[i]);
            // }
            //_oRightArrow.unload();
        } else {
            _oMsg1.unload();
            _oMsg2.unload();
            _oMsg3.unload();
            _oMsg4.unload();
            _oLeftArrow.unload();
            s_oStage.removeChild(_oBomb);
            s_oStage.removeChild(_oClock);
            s_oStage.removeChild(_oChanging);
        }
        
        _oHelpBg.off("click", _oListener);
        s_oStage.removeChild(_oHelpBg);
        
    };
    
    this._buildPage1 = function(){
        _bPage1Active = true;
        
        for(var i=0; i<3; i++){
            s_oStage.addChild(_aThree[i]);
        }
        // for(var i=0; i<4; i++){
        //     s_oStage.addChild(_aFour[i]);
        // }
        
        _oMsg1 = new CFormatText2(CANVAS_WIDTH/2, 350, TEXT_HELP, "#ffffff", s_oStage, "#821010", 40);
        _oMsg1.setWidth(600);

        _oMsg2 = new CFormatText2(CANVAS_WIDTH/2, 570, TEXT_HELP_CHANGING, "#ffffff", s_oStage, "#821010", 40);
        _oMsg2.setWidth(600);

        _oMsg4 = new CFormatText2(CANVAS_WIDTH/2 + 10, 730, TEXT_HELP_ITEM, "#ffffff", s_oStage, "#821010", 50);
        _oMsg4.setWidth(600);
       
        s_oStage.addChild(_oChanging);
        
        // var oSprite = s_oSpriteLibrary.getSprite('arrow');
        // _oRightArrow = new CGfxButton(CANVAS_WIDTH/2 + 200, 700, oSprite, s_oStage);
        // _oRightArrow.addEventListener(ON_MOUSE_UP, this._onButRightRelease, this);        
    };

    this._buildPage2 = function(){        
        // _bPage1Active = false;
        
        // _oMsg1 = new CFormatText2(CANVAS_WIDTH/2, 290, TEXT_HELP_ITEM, "#ffffff", s_oStage, "#821010", 30);
        // _oMsg1.setWidth(400);

        // s_oStage.addChild(_oBomb);
        
        // _oMsg2 = new CFormatText2(CANVAS_WIDTH/2 + 50, 340, TEXT_HELP_BOMB, "#ffffff", s_oStage, "#821010", 16);
        // _oMsg2.setWidth(280);
        
        // s_oStage.addChild(_oClock);
        
        // _oMsg3 = new CFormatText2(CANVAS_WIDTH/2 - 10, 440, TEXT_HELP_CLOCK, "#ffffff", s_oStage, "#821010", 16);
        // _oMsg3.setWidth(280);
        
        // s_oStage.addChild(_oClock);
        
        // _oMsg4 = new CFormatText2(CANVAS_WIDTH/2 + 50, 540, TEXT_HELP_CHANGING, "#ffffff", s_oStage, "#821010", 16);
        // _oMsg4.setWidth(280);
        
        // s_oStage.addChild(_oChanging);
        
        // var oSprite = s_oSpriteLibrary.getSprite('arrow');
        // _oLeftArrow = new CGfxButton(CANVAS_WIDTH/2 - 200, 700, oSprite, s_oStage);
        // _oLeftArrow.addEventListener(ON_MOUSE_UP, this._onButLeftRelease, this);
        // _oLeftArrow.reverseSprite();

        _bPage1Active = true;
        this._buildPage1();
    };
    
    this._onButRightRelease = function(){
        _oMsg1.unload();
        for(var i=0; i<3; i++){
            s_oStage.removeChild(_aThree[i]);
        }
        for(var i=0; i<4; i++){
            s_oStage.removeChild(_aFour[i]);
        }

        s_oStage.removeChild(_oChanging);
        
        _oRightArrow.unload();
        
        this._buildPage2();
    };
    
    this._onButLeftRelease = function(){
        if(!_bPage1Active){
            _oMsg1.unload();
            _oMsg2.unload();
            _oMsg3.unload();
            _oMsg4.unload();
            _oLeftArrow.unload();
            s_oStage.removeChild(_oBomb);
            s_oStage.removeChild(_oClock);
            s_oStage.removeChild(_oChanging);
        }
        
        this._buildPage1();
    };

    this._onExitHelp = function(){
        _oParent.unload();
        s_oGame.onExitHelp();
    };

    this._onButContinueRelease = function(){
        this.unload();
        s_oGame.onExitHelp();
    };

    _oParent=this;
    this._init();

}
