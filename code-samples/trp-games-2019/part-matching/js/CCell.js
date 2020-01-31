function CCell(iX, iY, iRow, iCol, oParentContainer, iType){
    
    var _bToDelete;
    
    var _iType;
    
    var _oCellContainer;
    var _oItem;
    var _oGlowItem = null;
    var _oTarget;
    
    this._init = function(iX, iY, iRow, iCol, oParentContainer, iType){
        _bToDelete = false;
        
        _iType = iType;
        
        _oCellContainer = new createjs.Container();
        _oCellContainer.x = iX;
        _oCellContainer.y = iY;
        if(_iType >= 0){
            oParentContainer.addChild(_oCellContainer);
        } 

        
         if(_iType === TYPE_CHANGING){

            _oItem = createSprite(s_oFruitSpritesheet, "changing",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
            _oItem.gotoAndPlay("changing");
            _oCellContainer.addChild(_oItem);
         }else {
            _oItem = createSprite(s_oFruitSpritesheet, _iType,CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
            _oItem.gotoAndStop(_iType);
            _oCellContainer.addChild(_oItem);
         }

        var graphics = new createjs.Graphics().beginFill("rgba(158,158,158,0.01)").drawRect(-CELL_SIZE/2, -CELL_SIZE/2, CELL_SIZE, CELL_SIZE);
        _oTarget = new createjs.Shape(graphics);
        _oTarget.on("mousedown", this._onCellClick);
        _oCellContainer.addChild(_oTarget);
       
    };
    
    this.unload = function(){
        if(_iType >= 0){
            oParentContainer.removeChild(_oCellContainer);         
        }      
    };
    
    this.getType = function(){
        return _iType;
    };
    
    this.setType = function(iType, szDir){
        
        var iPrevType = _iType;
        _iType = iType;
        
        switch(_iType){
            
            case CELL_STATE_MATCHED:{
                    if(iPrevType === TYPE_CHANGING){
                        var iChangingType = _oItem.currentFrame;

                        s_oGame.createParticle(iX, iY, iChangingType, szDir);
                    } else {

                        s_oGame.createParticle(iX, iY, iPrevType, szDir);
                    }

                    _oItem.gotoAndStop(_iType);
                    break;
            }
            case CELL_STATE_INVISIBLE:{
                    _oItem.gotoAndStop(_iType);
                    break;
            }
            case TYPE_CHANGING:{
                    _oItem.gotoAndPlay("changing");
                    break;
            }

            default:{                    
                    _oItem.gotoAndStop(_iType);
                    break;
            }
        }
    };
    
    this.animHint = function(){
        var oParent = this;
        var iHintSpeed = 55;
        var iRot = 18;
        createjs.Tween.get(_oItem).to({rotation:-iRot},iHintSpeed).to({rotation:0},iHintSpeed).to({rotation:iRot},iHintSpeed).to({rotation:0},iHintSpeed).
                to({rotation:-iRot},iHintSpeed).to({rotation:0},iHintSpeed).to({rotation:iRot},iHintSpeed).to({rotation:0},iHintSpeed).wait(800).call(function(){oParent.animHint();});
    };
    
    this.stopAnimHint = function(){
        _oItem.rotation = 0;
        createjs.Tween.removeTweens(_oItem);
    };
    
    this.getToDelete = function(){
        return _bToDelete;
    };
    
    this.setToDelete = function(bVal){
        _bToDelete = bVal;
    };
    
    this.getPos = function(){
        return {x: iX, y: iY};
    }; 
    
    this._glowItem = function(){
        var oParent = this;
        createjs.Tween.get(_oGlowItem).to({alpha:0},1000).to({alpha:1},1000).call(function(){oParent._glowItem(_oGlowItem);});
    };
    
    this.setNewSpritesheet = function(){
        _oItem.spriteSheet = s_oFruitSpritesheet;
    };
    
    this._onCellClick = function(){
        if(_iType === TYPE_CHANGING){
            var iChangedType = _oItem.currentFrame;
            s_oGame.checkCellClicked(iRow, iCol, iChangedType);
        } else {
            s_oGame.checkCellClicked(iRow, iCol, _iType);
        }
    };
    
    this._init(iX, iY, iRow, iCol, oParentContainer, iType);

}



