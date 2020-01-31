function CParticle(iX, iY, iType, szDir, oParentContainer){
    
    var _bSliced;
    var _bGone;
    
    var _iSpeed;
    var _iRunFactor;
    var _iRunTime = 0;
    var _iRunTimeSlice1 = 0;
    var _iRunTimeSlice2 = 0;
    var _iShiftLeftX;
    var _iShiftRightX;
    var _iShiftx;
    var _iRotFactorSlice1;
    var _iRotFactorSlice2;
    var _iRotFactor;
    
    var _oParticle = null;
    var _oParent;
    var _oSlice1;
    var _oSlice2;
    var _oListener;
    
    this._init= function(iX, iY, iType, szDir, oParentContainer){
        
        _bSliced = false;
        _bGone = false;
        
        _iSpeed = 8;
        _iRunFactor = _iSpeed/8;
        
        if(iX > (CANVAS_WIDTH/2) ){
            _iShiftx = 0;
            //_iShiftx = randomFloatBetween(-12.5,-5,2);
        }else{
            _iShiftx = 0;
            //_iShiftx = randomFloatBetween(5,12.5,2);
        }
        
        _iRotFactor = 0;
        //_iRotFactor = randomFloatBetween(-MAX_FRUITS_ROT_SPEED,MAX_FRUITS_ROT_SPEED,2);

        
        if(iType === TYPE_BOMB || iType === TYPE_CLOCK ){
            var oSprite = s_oSpriteLibrary.getSprite('explosion_'+iType);
            var oData = {   
                            framerate: 25,
                            images: [oSprite], 
                            // width, height & registration point of each sprite
                            frames: {width: 150, height: 150, regX: 75, regY: 75}, 
                            animations: {idle: [0,9,"stop"], stop:[10]}
                       };

            var oSpriteSheet = new createjs.SpriteSheet(oData);
            _oParticle = createSprite(oSpriteSheet, "idle",75,75,150,150);
            _oListener = _oParticle.on("animationend", this._onParticleEnd);
            _oParticle.gotoAndPlay("idle");
            var pGlobPoints = oParentContainer.localToGlobal(iX, iY);
            _oParticle.x = pGlobPoints.x/s_iScaleFactor + PARTICLE_OFFSET[iType].x;
            _oParticle.y = pGlobPoints.y/s_iScaleFactor + PARTICLE_OFFSET[iType].y;
        
            s_oStage.addChild(_oParticle);
            
        } else {
            
            
            var oSprite = s_oSpriteLibrary.getSprite('fruit_'+iType);
            var iWidth = oSprite.width;
            var iHeight = oSprite.height;
            
            
            if(szDir === "horizontal"){
                
                _oSlice1 = createSprite(s_aFruitSpritesheet[iType], "slice_7",(iWidth/9)/2,iHeight/2,iWidth/9,iHeight);
                _oSlice1.x = iX;
                _oSlice1.y = iY;
                oParentContainer.addChild(_oSlice1);

                _oSlice2 = createSprite(s_aFruitSpritesheet[iType], "slice_6",(iWidth/9)/2,iHeight/2,iWidth/9,iHeight);
                _oSlice2.x = iX;
                _oSlice2.y = iY;
                oParentContainer.addChild(_oSlice2);
                
            } else if(szDir === "vertical"){
                
                _oSlice1 = createSprite(s_aFruitSpritesheet[iType], "slice_5",(iWidth/9)/2,iHeight/2,iWidth/9,iHeight);
                _oSlice1.x = iX;
                _oSlice1.y = iY;
                oParentContainer.addChild(_oSlice1);

                _oSlice2 = createSprite(s_aFruitSpritesheet[iType], "slice_4",(iWidth/9)/2,iHeight/2,iWidth/9,iHeight);
                _oSlice2.x = iX;
                _oSlice2.y = iY;
                oParentContainer.addChild(_oSlice2);
            } else {
                
                var iRandomDir = 1 +Math.floor(Math.random()*3);
               
                
                _oSlice1 = createSprite(s_aFruitSpritesheet[iType], iRandomDir +1,(iWidth/9)/2,iHeight/2,iWidth/9,iHeight);
                _oSlice1.x = iX;
                _oSlice1.y = iY;
                _oSlice1.gotoAndStop(iRandomDir+1);
                oParentContainer.addChild(_oSlice1);

                _oSlice2 = createSprite(s_aFruitSpritesheet[iType], iRandomDir,(iWidth/9)/2,iHeight/2,iWidth/9,iHeight);
                _oSlice2.x = iX;
                _oSlice2.y = iY;
                _oSlice2.gotoAndStop(iRandomDir);
                oParentContainer.addChild(_oSlice2);   
            }
                      
           
            this.sliceVertical();
        }
         

    };
    
    this.unload = function(){
        
        
        if(_oParticle !== null){            
            _oParticle.visible = false;
            _oParticle.off("animationend", _oListener);
            s_oStage.removeChild(_oParticle);
        } else {
            oParentContainer.removeChild(_oSlice1);
            oParentContainer.removeChild(_oSlice2);
        }       
        _bGone = true;
    };
    
    this.sliceVertical = function(){
        _bSliced = true;
       
        _iRunTimeSlice1 = _iRunTime - (_iRunFactor*2);
        _iRunTimeSlice2 = _iRunTime - (_iRunFactor*2);
        _iShiftLeftX = _iShiftx;
        _iShiftRightX = -_iShiftx;
        _iRotFactorSlice1 = _iRotFactor * 1.5;
        _iRotFactorSlice2 = -_iRotFactor * 1.5;
       
        
    };
    
    this.update = function(){
        if(_bSliced){
            _iRunTime += _iRunFactor;
        
            _iRunTimeSlice1 += _iRunFactor;
            _oSlice1.y = _oSlice1.y - _iSpeed + _iRunTimeSlice1*2;
            _oSlice1.x += _iShiftLeftX/(_iRunTime);
            _oSlice1.rotation += _iRotFactorSlice1;

            _iRunTimeSlice2 += _iRunFactor;
            _oSlice2.y = _oSlice2.y - _iSpeed + _iRunTimeSlice2*2;
            _oSlice2.x += _iShiftRightX/(_iRunTime);
            _oSlice2.rotation += _iRotFactorSlice2;
            
            
            var iRemove = 0;
            if(_oSlice1.y > CANVAS_HEIGHT){
                iRemove++;
            }

            if(_oSlice2.y > CANVAS_HEIGHT){
                iRemove++;
            }

            if(iRemove === 2){
                _oParent.unload();
            } 
        }
        
        
    };
    
    this.isGone = function(){
        return _bGone;
    };
    
    this._onParticleEnd = function(){
        if(_oParticle.currentAnimation === "idle"){
            _oParent.unload();
        }
    };
    
    _oParent = this;
    this._init(iX, iY, iType, szDir, oParentContainer);
    
};