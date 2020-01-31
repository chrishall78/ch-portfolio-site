function CMovingCell(iX, iY, iType, oParentContainer){
    
    var _iType;
    
    var _oItems;
    
    this._init = function(iX, iY, iType, oParentContainer){
        
        _iType = iType;
        var iNumChangingItem = 6;
        var oSprite = s_oSpriteLibrary.getSprite('fruits');
        var oData = {   
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: CELL_SIZE, height: CELL_SIZE, regX: CELL_SIZE/2, regY: CELL_SIZE/2}, 
                        animations: {type_0:[0], type_1:[1], type_2:[2], type_3:[3], type_4:[4], type_5:[5], type_6:[6], type_7:[7], star:[8], bomb:[9], clock:[10], changing:[0,iNumChangingItem,"changing",0.150]}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        if(_iType === TYPE_CHANGING){
             _oItems = createSprite(oSpriteSheet, "changing",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
             _oItems.gotoAndPlay("changing");
         } else {
             _oItems = createSprite(oSpriteSheet, _iType,CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
             _oItems.gotoAndStop(_iType);
         }
        _oItems.x = iX;
        _oItems.y = iY;
        oParentContainer.addChild(_oItems);
        
    };
    
    this.unload = function(){
        oParentContainer.removeChild(_oItems);
    };
    
    this.move = function(iX, iY){
        createjs.Tween.get(_oItems).to({x:iX, y:iY}, 250, createjs.Ease.cubicIn).call(function(){ _oItems.visible = false; s_oGame.checkMatch();});
    };
    
    this.moveBack = function(){
        _oItems.visible = true;
        createjs.Tween.get(_oItems).to({x:iX, y:iY}, 250, createjs.Ease.cubicIn).call(function(){s_oGame.returnInPosition();});
    };
    
    this.fall = function(iX, iY, iTimeMulti){
        createjs.Tween.get(_oItems).to({x:iX, y:iY}, TIME_FALL*iTimeMulti, createjs.Ease.linear).call(function(){s_oGame.onFinishFall();});
    };
    
    this.fallStar = function(iX, iY){
        createjs.Tween.get(_oItems).to({x:iX, y:iY}, 1200, createjs.Ease.cubicIn);
    };
    
    this.setVisible = function(bVal){
        _oItems.visible = bVal;        
    };
    
    this.getType = function(){
        return _iType;
    };
    
    this._init(iX, iY, iType, oParentContainer);
    
};


