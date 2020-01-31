function CGame(oData, iLevel){
    var _bTouchActive;
    var _bBlock;
    var _bInitGame;
    var _bTimeSpawn;
    var _bChangingItemSpawn;
    var _bClockSoundPlayed;
    var _bTremble = false;
    var _bAlternateTremble = false;
    var _bStartHintTimer = false;
    var _bSpawnBomb;
    var _bAllowBomb;
    var _bAllowChanging;
    
    var _aGrid;
    var _aItemsToDestroy;
    var _aColToReplace;
    var _aItemsToFall;
    var _aHorizontalMatch;
    var _aVerticalMatch;
    var _aParticle;
    var _aGridSwapInfo;
    var _aHintArray;
    var _aStepNumItems;
    
    var _iNumItems;
    var _iCountBomb;
    var _iScore;
    var _iTimeBonusScore;
    var _iSwappedCount;
    var _iMaxCol;
    var _iMaxRow;
    var _iTypeToSwap1;
    var _iTypeToSwap2;
    var _iFallCount;
    var _iTimeElaps;
    var _iTimeTimer;
    var _iGridOffset;
    var _iIdInterval;
    var _iCurTrembleIndex = 0;
    var _iCellSize;
    var _iHintTimer;
    var _iCounterChangeNumFruits = 0;
    var _iCurLevelTime;

    var _oGridContainer;
    var _oParticleContainer;
    var _oPanelContainer;
    var _oCellSelected;
    var _oCellToSwap;
    var _oTarget;
    var _oPickRandomHint = null;
    var _oFruitSpritesheet;
    
    var _oInterface;
    var _oEndPanel = null;
    var _oPausePanel;
    var _oParent;
    var _oHammer;
    
    this._init = function(){
        
        _oFruitSpritesheet = new CSpriteSheets();
        
        _bTouchActive=false;
        _bInitGame=false;
        _bTimeSpawn=false;
        _bChangingItemSpawn=false;
        _bClockSoundPlayed = false;
        _bSpawnBomb = false;
        _bAllowBomb = true;
        _bAllowChanging = false;
        
        _iScore=0;
        _iSwappedCount = 0;
        _iFallCount = 0;
        _iNumItems = CONFIG[iLevel].numitems;
        _iCountBomb = 0;
        _iCountBomb = 0;
        _iTimeElaps = oData.starting_time + 1000; //STARTING_TIME + 1000;
        _iCurLevelTime = _iTimeElaps;
        _iTimeTimer = TIMER_CLOCK_SPAWN[iLevel];
        _iHintTimer = 0;        

        setVolume("soundtrack",0.0);

        _aParticle = new Array();
        _aStepNumItems = new Array(false,false,false,false);

        _oCellSelected = null;
        
        var _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(_oBg);//Draws on canvas      
        
        _iGridOffset = -30;
        
        _oGridContainer = new createjs.Container();
        _oGridContainer.x = CANVAS_WIDTH/2;
        _oGridContainer.y = CANVAS_HEIGHT/2 - _iGridOffset;
        s_oStage.addChild(_oGridContainer);
        
        _oParticleContainer = new createjs.Container();
        _oParticleContainer.x = CANVAS_WIDTH/2;
        _oParticleContainer.y = CANVAS_HEIGHT/2 - _iGridOffset;
        s_oStage.addChild(_oParticleContainer);
        
        _iMaxCol = LEVEL_MATRIX[iLevel][0].length;
        _iMaxRow = LEVEL_MATRIX[iLevel].length;
    
        this._buildLevel();
        
        var oSprite = s_oSpriteLibrary.getSprite('target');
        _oTarget = createBitmap(oSprite);
        _oTarget.regX = oSprite.width/2;
        _oTarget.regY = oSprite.height/2;
        _oTarget.visible = false;
        _oGridContainer.addChild(_oTarget);
    
        this.initialMatch();

        _bBlock = false;
        
        _oInterface = new CInterface(iLevel);
        _oPanelContainer = _oInterface.getPanelContainer();
        _oInterface.refreshTime(_iTimeElaps -1000, 1);
        
        new CHelpPanel();
        
        if(s_bMobile){
            this._initHammer();
        }
       
    };
    
    this._initHammer = function(){
       _oHammer = new Hammer(s_oCanvas);
       _oHammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
       _oHammer.get('swipe').set({ velocity: 0.005});
       _oHammer.get('swipe').set({ threshold: 0.1 });

       
       _oHammer.on("swipeleft",function(){_oParent._swipeControl("left");});
       _oHammer.on("swiperight",function(){_oParent._swipeControl("right");});
       _oHammer.on("swipeup",function(){_oParent._swipeControl("up");});
       _oHammer.on("swipedown",function(){_oParent._swipeControl("down");});
    };
    
    this._swipeControl = function(szType){
        
        if(_oCellSelected === null || _bBlock){
            return;
        }
        _bBlock = true;
        switch(szType) {
            case "left":{   
                    if(_oCellSelected.col === 0 || _aGrid[_oCellSelected.row][_oCellSelected.col-1].getType() === CELL_STATE_DISABLE || 
                            _aGrid[_oCellSelected.row][_oCellSelected.col-1].getType() === TYPE_BOMB || _aGrid[_oCellSelected.row][_oCellSelected.col-1].getType() === TYPE_CHANGING){
                       _bBlock = false;
                       return;
                    }
                   _oCellToSwap = {row: _oCellSelected.row, col: _oCellSelected.col-1, cell: null};
                   
                
                break;
            }
            case "right":{                    
                    if(_oCellSelected.col === _iMaxCol-1 || _aGrid[_oCellSelected.row][_oCellSelected.col+1].getType() === CELL_STATE_DISABLE ||
                            _aGrid[_oCellSelected.row][_oCellSelected.col+1].getType() === TYPE_BOMB || _aGrid[_oCellSelected.row][_oCellSelected.col+1].getType() === TYPE_CHANGING){
                       _bBlock = false;
                       return;
                    }
                    _oCellToSwap = {row: _oCellSelected.row, col: _oCellSelected.col +1, cell: null};
                
                break;
            }
            case "up":{
                    if(_oCellSelected.row === 0 || _aGrid[_oCellSelected.row-1][_oCellSelected.col].getType() === CELL_STATE_DISABLE ||
                            _aGrid[_oCellSelected.row-1][_oCellSelected.col].getType() === TYPE_BOMB || _aGrid[_oCellSelected.row-1][_oCellSelected.col].getType() === TYPE_CHANGING){
                       _bBlock = false;
                       return;
                    }
                    _oCellToSwap = {row: _oCellSelected.row -1, col: _oCellSelected.col, cell: null};
                
                break;
            }
            case "down":{
                    if(_oCellSelected.row === _iMaxRow -1 || _aGrid[_oCellSelected.row+1][_oCellSelected.col].getType() === CELL_STATE_DISABLE ||
                            _aGrid[_oCellSelected.row+1][_oCellSelected.col].getType() === TYPE_BOMB || _aGrid[_oCellSelected.row+1][_oCellSelected.col].getType() === TYPE_CHANGING){
                       _bBlock = false;
                       return;
                    }
                    _oCellToSwap = {row: _oCellSelected.row +1, col: _oCellSelected.col, cell: null};
                
                break;
            }
        }    
        
        this._swapItems();
        
    };  
    
    this._createRandomItem = function(){
        
        var iType = Math.floor(Math.random()*_iNumItems);
        
        if (CONFIG[iLevel].bomballowed){
            
            if (_bSpawnBomb && _bAllowBomb){
                iType = TYPE_BOMB;
                _bSpawnBomb = false;
                _bAllowBomb = false;
            }
        }
        
        if (CONFIG[iLevel].clockallowed && _bTimeSpawn){
            
            var iTimeRemaining = _iTimeElaps/1000;
            var iProb = Math.random();

            if (iTimeRemaining < 15){
                //This means 2% of timer item prob
                iProb = iProb * 50;
            } else if (iTimeRemaining < 30){
                //This means 1,11% of timer item prob
                iProb = iProb * 90;
            } else if (iTimeRemaining < 60){
                //This means 0,5% of timer item prob
                iProb = iProb * 200;
            } else{
                //This means 0,25% of timer item prob
                iProb = iProb * 400;
            }

            if (iProb < 1){
                iType = TYPE_CLOCK;
                _bTimeSpawn = false;
            }
            
        }
        
        if (CONFIG[iLevel].changingallowed && !_bChangingItemSpawn && _bAllowChanging){
            iType = TYPE_CHANGING;
            _bAllowChanging = false;
            _bChangingItemSpawn = true;
        }
        
        return iType;
    };
    
    this._shuffleLevel = function(){
        var iType; 
        for(var i=0;i<_iMaxRow;i++){
            for(var j=0;j<_iMaxCol;j++){
                if(LEVEL_MATRIX[iLevel][i][j] > 0){
                    iType = Math.floor(Math.random()*_iNumItems);
                    _aGrid[i][j].setType(iType);
                }
            }
        }        
        this.initialMatch();
        this._hintCheckMovesAvailable();
    };
    
    this._buildLevel = function(){
        
        _iCellSize = CELL_SIZE + 10;
        
        var iGridWidth =  LEVEL_MATRIX[iLevel][0].length*_iCellSize;
        var iGridHeight = LEVEL_MATRIX[iLevel].length*_iCellSize;
        var pStartGridPoint = {x: -(iGridWidth/2) +_iCellSize/2, y: -(iGridHeight)/2 +_iCellSize/2 + 10};
        
        
        
        _aGrid = new Array();
        for(var i=0; i<_iMaxRow; i++){
            _aGrid[i] = new Array();
            for(var j=0; j<_iMaxCol; j++){
                var iType = Math.floor(Math.random()*_iNumItems);
                if(LEVEL_MATRIX[iLevel][i][j] === CELL_FILL_ITEM){
                    //Random Items
                    
                    _aGrid[i][j] = new CCell(pStartGridPoint.x + j*_iCellSize, pStartGridPoint.y + i*_iCellSize, i, j, _oGridContainer, iType);
                } else if(LEVEL_MATRIX[iLevel][i][j] === CELL_FILL_NULL) {
                    //Empty cell
                    _aGrid[i][j] = new CCell(pStartGridPoint.x + j*_iCellSize, pStartGridPoint.y + i*_iCellSize, i, j, _oGridContainer, CELL_STATE_DISABLE);
                } else if(LEVEL_MATRIX[iLevel][i][j] === CELL_FILL_BOMB){
                    //Bomb
                    _aGrid[i][j] = new CCell(pStartGridPoint.x + j*_iCellSize, pStartGridPoint.y + i*_iCellSize, i, j, _oGridContainer, TYPE_BOMB);
                }else if(LEVEL_MATRIX[iLevel][i][j] === CELL_FILL_CLOCK){
                    
                    _aGrid[i][j] = new CCell(pStartGridPoint.x + j*_iCellSize, pStartGridPoint.y + i*_iCellSize, i, j, _oGridContainer, TYPE_CLOCK);
                } else if(LEVEL_MATRIX[iLevel][i][j] === CELL_FILL_CHANGE){
                   
                    _aGrid[i][j] = new CCell(pStartGridPoint.x + j*_iCellSize, pStartGridPoint.y + i*_iCellSize, i, j, _oGridContainer, TYPE_CHANGING);
                }else if(LEVEL_MATRIX[iLevel][i][j] === CELL_FILL_TRAP){
           
                    _aGrid[i][j] = new CCell(pStartGridPoint.x + j*_iCellSize, pStartGridPoint.y + i*_iCellSize, i, j, _oGridContainer, iType);
                } 
                
            }
        }
    };
    
    this.initialMatch = function(){
        do{
                
            _aItemsToDestroy = new Array();
            this._matchHorizontal();
            this._matchVertical();

            var iType;
            for(var i=0; i<_aItemsToDestroy.length; i++){

                iType = Math.floor(Math.random()*_iNumItems);
                _aGrid[_aItemsToDestroy[i].row][_aItemsToDestroy[i].col].setType(iType);
                _aGrid[_aItemsToDestroy[i].row][_aItemsToDestroy[i].col].setToDelete(false);
            }

        } while (_aItemsToDestroy.length > 0)        
        
        this._refreshMatrix();
        
    };
   
    this._matchHorizontal = function(){
        var iSameColor;
        var iCurColor;
        _aStarPosition = new Array();
        _aHorizontalMatch = new Array();
        for(var i=0; i<_iMaxRow; i++){
            iCurColor = _aGrid[i][0].getType();
            iSameColor = 0;
            for(var j=0; j<_iMaxCol; j++){
                if(_aGrid[i][j].getType() === TYPE_STAR){
                    _aStarPosition.push({row:i, col:j});
                }
                
                if(_aGrid[i][j].getType() === iCurColor && j === _iMaxCol - 1 && _aGrid[i][j].getType()>= 0 && _aGrid[i][j].getType() <  TYPE_STAR){
                    iSameColor++;
                    if(iSameColor >= 3){
                        for(var k=0; k<iSameColor; k++){
                            _aGrid[i][j-k].setToDelete(true);
                            _aItemsToDestroy.push({row:i, col:j-k, dir:"horizontal"});
                        }
                        
                        _aHorizontalMatch.push({num:iSameColor, row:i, col:j});
                    }
                } else if(_aGrid[i][j].getType() === iCurColor && j !== _iMaxCol - 1 && _aGrid[i][j].getType()>= 0 && _aGrid[i][j].getType() <  TYPE_STAR){
                    iSameColor++;
                    
                } else {
                    if(iSameColor >= 3){
                        for(var k=0; k<iSameColor; k++){
                            _aGrid[i][j-1-k].setToDelete(true);
                            _aItemsToDestroy.push({row:i, col:j-1-k, dir:"horizontal"});
                        }      
                        
                        _aHorizontalMatch.push({num:iSameColor, row:i, col:j});
                    }
                    
                    iSameColor = 1;
                    iCurColor = _aGrid[i][j].getType();
                    
                }     
            } 
        }
    };
   
    this._matchVertical = function(){
        var iSameColor;
        var iCurColor;
        _aVerticalMatch = new Array();
        
        for(var j=0; j<_iMaxCol; j++){
            iCurColor = _aGrid[0][j].getType();
            iSameColor = 0;
            for(var i=0; i<_iMaxRow; i++){
                if(_aGrid[i][j].getType() === iCurColor && i === _iMaxRow - 1 && _aGrid[i][j].getType()>= 0 && _aGrid[i][j].getType() <  TYPE_STAR){
                    iSameColor++;
                    if(iSameColor >= 3){
                        for(var k=0; k<iSameColor; k++){
                            if(!_aGrid[i-k][j].getToDelete()){
                                _aGrid[i-k][j].setToDelete(true);
                                _aItemsToDestroy.push({row:i-k, col:j, dir:"vertical"});
                            }
                            
                        }
                        _aVerticalMatch.push({num:iSameColor, row:i, col:j});
                    }
                } else if(_aGrid[i][j].getType() === iCurColor && i !== _iMaxRow - 1 && _aGrid[i][j].getType()>= 0 && _aGrid[i][j].getType() <  TYPE_STAR){
                    iSameColor++;
                    
                } else {
                    if(iSameColor >= 3){
                        for(var k=0; k<iSameColor; k++){
                            if(!_aGrid[i-1-k][j].getToDelete()){
                                _aGrid[i-1-k][j].setToDelete(true);
                                _aItemsToDestroy.push({row:i-1-k, col:j, dir:"vertical"});
                            }
                            
                        }
                        _aVerticalMatch.push({num:iSameColor, row:i, col:j});
                    }
                    
                    iSameColor = 1;
                    iCurColor = _aGrid[i][j].getType();
                    
                }     
            }            
        }
    };
    
    this.callTremble = function(){
        if(!_bTremble){
            _bTremble = true;
            _iIdInterval = setInterval(function(){_oParent.tremble();},10);
        }        
    };
    
    this.tremble = function(){
        _bAlternateTremble = !_bAlternateTremble;
        var _iStrenght = 10;
        
        if(_bAlternateTremble){
            var iSignX = Math.random();
            var iNumberX = _iStrenght;
            var iDirX;
            if(iSignX < 0.5){
                iDirX = - iNumberX;             
            } else {
                iDirX = iNumberX;
            }
            var iSignY = Math.random();
            var iNumberY = _iStrenght;
           
            var iDirY;
            if(iSignY < 0.5){
                iDirY = - iNumberY;             
            } else {
                iDirY = iNumberY;
            }
            
            s_oStage.x = iDirX;
            s_oStage.y = iDirY;

        } else {
            s_oStage.x = 0;
            s_oStage.y = 0;

        }
        
        
        _iCurTrembleIndex++;
        if(_iCurTrembleIndex === 50){
            _iCurTrembleIndex = 0;
            _bTremble = false;
            clearInterval(_iIdInterval);            
        }
    };
    
    this._refreshMatrix = function(){
        for(var i=0; i<_aItemsToDestroy.length; i++){
            _aGrid[_aItemsToDestroy[i].row][_aItemsToDestroy[i].col].setToDelete(false);
        }
    };
    
    this._swapItems = function(){        
        if(_oPickRandomHint !== null){
            _aGrid[_oPickRandomHint.element0row][_oPickRandomHint.element0col].stopAnimHint();
            _aGrid[_oPickRandomHint.element1row][_oPickRandomHint.element1col].stopAnimHint();
            _bStartHintTimer = true;
            _iHintTimer = TIMER_HINT-2000;
        }
        
        // playSound("swoosh",1,false);
        
        var oItem1 = {x: _aGrid[_oCellSelected.row][_oCellSelected.col].getPos().x, y: _aGrid[_oCellSelected.row][_oCellSelected.col].getPos().y};
        var oItem2 = {x: _aGrid[_oCellToSwap.row][_oCellToSwap.col].getPos().x, y: _aGrid[_oCellToSwap.row][_oCellToSwap.col].getPos().y};
        _iTypeToSwap1 = _aGrid[_oCellSelected.row][_oCellSelected.col].getType();
        _iTypeToSwap2 = _aGrid[_oCellToSwap.row][_oCellToSwap.col].getType();
        
        _oCellSelected.cell = new CMovingCell(oItem1.x, oItem1.y, _iTypeToSwap1, _oGridContainer );
        _oCellToSwap.cell = new CMovingCell(oItem2.x, oItem2.y, _iTypeToSwap2, _oGridContainer );
        
        _oCellSelected.cell.move(oItem2.x, oItem2.y);
        _oCellToSwap.cell.move(oItem1.x, oItem1.y);
        
        _aGrid[_oCellSelected.row][_oCellSelected.col].setType(CELL_STATE_INVISIBLE);
        _aGrid[_oCellToSwap.row][_oCellToSwap.col].setType(CELL_STATE_INVISIBLE);
    };
    
    
    
    this._checkBombArea = function(iRow, iCol){
        _bBlock = true;
        _aGrid[iRow][iCol].setToDelete(true);
        _aItemsToDestroy = new Array();
        _iCountBomb++;
        for(var i=iRow-1; i<iRow+2; i++){
            for(var j=iCol-1; j<iCol+2; j++){
                if( (i >= 0 && i<_iMaxRow) && (j >= 0 && j<_iMaxCol) && _aGrid[i][j].getType() !== CELL_STATE_DISABLE ){
                    if(_aGrid[i][j].getType() === TYPE_BOMB && !_aGrid[i][j].getToDelete()){
                        _oParent._checkBombArea(i,j);
                    }
                    
                    if((_aGrid[i][j].getType() !== TYPE_BOMB) && (_aGrid[i][j].getType() !== TYPE_CHANGING) ){
                        _aGrid[i][j].setToDelete(true);
                    }                    
                }                    
            }
        }       
    };
    
    this._detonateBomb = function(iRow, iCol){
        // playSound("fn_explosion",1,false);
        
        this.callTremble();
        
        this._checkBombArea(iRow, iCol); //Recursive find near bomb
        var iNumItemsFind = 0;
        for(var i=0; i<_iMaxRow; i++){
            for(var j=0; j<_iMaxCol; j++){
                if(_aGrid[i][j].getToDelete()){
                    _aItemsToDestroy.push({row:i, col:j, dir:"random"});
                    iNumItemsFind++;
                }
            }
        } 
        
        var iPartialScore = (_aItemsToDestroy.length-_iCountBomb)*SCORES_FOR_SINGLE + _iCountBomb*SCORES_FOR_BOMB;
        this._updateScore(iPartialScore);
        _iCountBomb = 0;
        this._explosion();
    };
    
    this._checkSameItems= function(iType, iRow, iCol){
        var iNumItemsFind = 0;
        for(var i=0; i<_iMaxRow; i++){
            for(var j=0; j<_iMaxCol; j++){
                if(_aGrid[i][j].getType() === iType){
                    _aItemsToDestroy.push({row:i, col:j, dir:"random"});
                    iNumItemsFind++;
                }
            }
        }
        
        // disable adding extra time for changing parts
        //this._addNewTime(0,iRow, iCol,iNumItemsFind*1000,"changing"); 
    };
    
    this.checkCellClicked = function(iRow, iCol, iType){
        if(_bBlock){
            return;
        }

        if(iType === TYPE_BOMB){
            //Bomb clicked
            if(_oPickRandomHint !== null){
                _aGrid[_oPickRandomHint.element0row][_oPickRandomHint.element0col].stopAnimHint();
                _aGrid[_oPickRandomHint.element1row][_oPickRandomHint.element1col].stopAnimHint();
            }
            this._detonateBomb(iRow, iCol);
            _oTarget.visible = false;
            return;
        }
        
        if(iType === TYPE_CLOCK){
            // playSound("hourglass_explosion",1,false);
            
            if(_oPickRandomHint !== null){
                _aGrid[_oPickRandomHint.element0row][_oPickRandomHint.element0col].stopAnimHint();
                _aGrid[_oPickRandomHint.element1row][_oPickRandomHint.element1col].stopAnimHint();
            }
            
            _bBlock = true;
            
            this._addNewTime(0,iRow, iCol, TIME_TO_ADD,"changing"); 

            
            _aItemsToDestroy.push({row:iRow, col:iCol});
            _oTarget.visible = false;
            this._explosion();
            return;
            
        }
        
        if(_aGrid[iRow][iCol].getType() === TYPE_CHANGING){
            
            if(_oPickRandomHint !== null){
                _aGrid[_oPickRandomHint.element0row][_oPickRandomHint.element0col].stopAnimHint();
                _aGrid[_oPickRandomHint.element1row][_oPickRandomHint.element1col].stopAnimHint();
            }
            
            _bBlock = true;
            _aItemsToDestroy.push({row:iRow, col:iCol});
            _oTarget.visible = false;
            this._checkSameItems(iType, iRow, iCol);
            this._updateScore(_aItemsToDestroy.length*SCORES_FOR_SINGLE);
            this._explosion();
            return;
        }
        
        if(_oCellSelected === null){
            _oCellSelected = {row: iRow, col: iCol, cell: null};
            _oTarget.visible = true;
            _oTarget.x = _aGrid[iRow][iCol].getPos().x;
            _oTarget.y = _aGrid[iRow][iCol].getPos().y;
        } else if(_oCellSelected.row === iRow && _oCellSelected.col === iCol){
            return;
            
        }else if ( ((Math.abs(iRow - _oCellSelected.row) < 2) &&  ((iCol - _oCellSelected.col) === 0)) ||
                        (((iRow - _oCellSelected.row) === 0) &&  (Math.abs(iCol - _oCellSelected.col) < 2))  ){

            _oCellToSwap = {row: iRow, col: iCol, cell: null};
            _bBlock = true;
            this._swapItems();
            
        } else {
            _oCellSelected = {row: iRow, col: iCol, cell: null};
            _oTarget.x = _aGrid[iRow][iCol].getPos().x;
            _oTarget.y = _aGrid[iRow][iCol].getPos().y;
        }
    };
    
    this.checkMatch = function(){
        _iSwappedCount++;
        if(_iSwappedCount === 2){            
            _aItemsToDestroy = new Array();            
            _aGrid[_oCellSelected.row][_oCellSelected.col].setType(_iTypeToSwap2);
            _aGrid[_oCellToSwap.row][_oCellToSwap.col].setType(_iTypeToSwap1);
            
            this._matchHorizontal();
            this._matchVertical();            
            
            if(_aItemsToDestroy.length > 0){
                //SWAP VALID
                _iCountBomb = _iCountBomb + _aItemsToDestroy.length;
                this._explosion();
            } else {
                // playSound("swoosh",1,false);

                var oItem1 = {x: _aGrid[_oCellSelected.row][_oCellSelected.col].getPos().x, y: _aGrid[_oCellSelected.row][_oCellSelected.col].getPos().y};
                var oItem2 = {x: _aGrid[_oCellToSwap.row][_oCellToSwap.col].getPos().x, y: _aGrid[_oCellToSwap.row][_oCellToSwap.col].getPos().y};
                
                _aGrid[_oCellSelected.row][_oCellSelected.col].setType(_iTypeToSwap1);
                _aGrid[_oCellToSwap.row][_oCellToSwap.col].setType(_iTypeToSwap2);
                
                _oCellSelected.cell.moveBack(oItem1.x, oItem1.y);
                _oCellToSwap.cell.moveBack(oItem2.x, oItem2.y);
                
                _aGrid[_oCellSelected.row][_oCellSelected.col].setType(CELL_STATE_INVISIBLE);
                _aGrid[_oCellToSwap.row][_oCellToSwap.col].setType(CELL_STATE_INVISIBLE);
            }
            
            _iSwappedCount = 0;
        }
    };
    
    this._explosion = function(){
        _iHintTimer = 0;

        // if(Math.random()<0.5){
        //     playSound("break",1,false);
        // }else {
        //     playSound("break2",1,false);
        // }

        var iRow;
        var iCol;
        _aColToReplace = new Array();
        for(var i=0; i<_iMaxCol; i++){
            _aColToReplace[i] = 0;
        }
        
        for(var i=0; i<_aItemsToDestroy.length; i++){
            iRow = _aItemsToDestroy[i].row;
            iCol = _aItemsToDestroy[i].col;
            
            _aColToReplace[iCol]++;            
            
            _aGrid[iRow][iCol].setType(CELL_STATE_MATCHED, _aItemsToDestroy[i].dir);
        }
        
        _oTarget.visible = false;
        
        this._updateMatchScore();
        
        setTimeout(this._fallItems, 500);
        
    };
    
    this._fallItems = function(){
        ////////BUILD ALL ITEMS TO BEING FALL

        var aTypeArray = new Array();        
        for(var i=0; i<_aColToReplace.length; i++){
            for(var j=0; j<_aColToReplace[i]; j++){
                aTypeArray.push(_oParent._createRandomItem());
            }
        }
        shuffle(aTypeArray);
        
        _aItemsToFall = new Array();
        for(var i=0; i<_iMaxCol; i++){          
            if(_aColToReplace[i] > 0){                
                
                var iType;
                var bFlag = false;
                for(var k=_iMaxRow-1; k>=0; k--){
                    if(_aGrid[k][i].getType() === CELL_STATE_MATCHED){
                        bFlag = true;
                    }

                    if(_aGrid[k][i].getType() >= 0 && bFlag){
                        _aItemsToFall.push({
                                        jump:0,
                                        startrow: k,
                                        endrow: null,
                                        col: i, 
                                        cell: new CMovingCell(_aGrid[k][i].getPos().x, _aGrid[k][i].getPos().y, _aGrid[k][i].getType(), _oGridContainer )});

                    }                    
                }
                for(var j=0; j<_aColToReplace[i]; j++){
                    iType = aTypeArray.pop();
                    _aItemsToFall.push({
                                        jump:0,
                                        startrow: -(j+1),
                                        endrow: null,
                                        col: i, 
                                        cell: new CMovingCell(_aGrid[0][i].getPos().x, _aGrid[0][i].getPos().y -_iCellSize*(j+1), iType, _oGridContainer )});                    
                }
            }
        }        
        
        ////////DETECT POSITION OF THE FALL
        var iIndex = 0;
        for(var i=0; i<_iMaxCol; i++){
            
            if(_aColToReplace[i] > 0){
             
                var aColImage = new Array();
                for(var j=0; j<_iMaxRow; j++){
                    aColImage[j] = _aGrid[j][i].getType();
                }
                
                var bFlag = false;
                for(var k=_iMaxRow-1; k>=0; k--){
                    if(_aGrid[k][i].getType() === CELL_STATE_MATCHED){
                        bFlag = true;
                    }                    
                    if(_aGrid[k][i].getType() >= 0 && bFlag){                      
                        _aGrid[k][i].setType(CELL_STATE_INVISIBLE);
                    }                    
                }
                
                for(var j=_iMaxRow-1; j>=0; j--){
                    if(aColImage[j] === CELL_STATE_MATCHED){
                        _aItemsToFall[iIndex].endrow = j;
                        _aItemsToFall[iIndex].jump = j - _aItemsToFall[iIndex].startrow;
                        var bFlag = false;
                        for(var k=_iMaxRow-1; k>=0; k--){
                            if(aColImage[k] === CELL_STATE_MATCHED){
                                bFlag = true;
                            }
                            if(aColImage[k] >= 0 && bFlag){
                                aColImage[k] = CELL_STATE_MATCHED;
                                break;
                            }                            
                        }
                        
                        iIndex++;                        
                    }
                }    
            }            
        }
            
        
        //////FALL ITEMS
        for(var i=0; i<_aItemsToFall.length; i++){
            var iX = _aGrid[_aItemsToFall[i].endrow][_aItemsToFall[i].col].getPos().x;
            var iY = _aGrid[_aItemsToFall[i].endrow][_aItemsToFall[i].col].getPos().y;
            var iJump = _aItemsToFall[i].jump;
            
            _aItemsToFall[i].cell.fall(iX, iY, iJump);
        }        
    };
    
    this.onFinishFall = function(){
        _iFallCount++;
        if(_iFallCount === _aItemsToFall.length){
            _iFallCount = 0;
            /////SET GRID WITH ITEMS TYPE
            for(var i=0; i<_aItemsToFall.length; i++){
                
                _aItemsToFall[i].cell.unload();
                
                var iRow = _aItemsToFall[i].endrow;
                var iCol = _aItemsToFall[i].col;
                var iType = _aItemsToFall[i].cell.getType();
                _aGrid[iRow][iCol].setType(iType);
            }
            
            if(_bInitGame === false){
                return;
            }
            
            //// CHECK FURTHER EXPLOSION
            this._refreshMatrix();   

            _aItemsToDestroy = new Array();
            
            this._matchHorizontal();
            this._matchVertical();
            
            if(_aItemsToDestroy.length > 0){
                //SWAP VALID
                this._explosion();
            } else {
                if(_oCellSelected !== null){
                    if(_oCellSelected.cell !== null){
                        _oCellSelected.cell.unload();
                        _oCellToSwap.cell.unload();
                    }                    
                }
                
                _oCellToSwap = null;
                _oCellSelected = null; 
                _bBlock = false;
                _bAllowBomb = true;
                _bChangingItemSpawn = false;
                for(var i=0; i<_iMaxRow; i++){
                    for(var j=0; j<_iMaxRow; j++){
                        if(_aGrid[i][j].getType()=== TYPE_CHANGING){
                            _bChangingItemSpawn = true;
                        }
                    }
                }
                this._hintCheckMovesAvailable();
                
            }            
        }               
    };
    
    
    this._hintCheckMovesAvailable = function(){
      
        
        _aHintArray = new Array();
        _oPickRandomHint = null;
        var bSpecialElement = false; 
        //INIT TEMP GRID
        _aGridSwapInfo = new Array();      
        for(var i=0;i<_iMaxRow;i++){
            _aGridSwapInfo[i] = new Array();            
            for(var j=0;j<_iMaxCol;j++){
                _aGridSwapInfo[i][j] = {type : _aGrid[i][j].getType(), check_up: false, check_down: false, check_left: false, check_right: false};
                if(_aGridSwapInfo[i][j].type === 9 || _aGridSwapInfo[i][j].type === 10 || _aGridSwapInfo[i][j].type === 11){
                    bSpecialElement = true; 
                }
            }
        }
        
        //START CHECK MOVES
        for(var i=0;i<_iMaxRow;i++){
            for(var j=0;j<_iMaxCol;j++){
                if(_aGrid[i][j].getType()>= 0 && _aGrid[i][j].getType() <  TYPE_STAR){
                    this._hintMoveAndCheck(i, j);  
                }  
            }
        }

        if(_aHintArray.length > 0){
            _bStartHintTimer = true;
            _oPickRandomHint = _aHintArray[Math.floor(Math.random()*_aHintArray.length)];
        } else {
            _bStartHintTimer = false;
            _oPickRandomHint = null;
            if(!bSpecialElement){

               var oShuffleText = new CFormatText(-300, CANVAS_HEIGHT/2, TEXT_SHUFFLE, "#ffffff", s_oStage, "#000000", 50);
                oShuffleText.setOutline(10);

                createjs.Tween.get(oShuffleText.getText()).to({x: CANVAS_WIDTH/2}, 500, createjs.Ease.quintOut).wait(1000).call(function(){
                    _oParent._shuffleLevel();
                    _oParent.callTremble();
                    createjs.Tween.get(oShuffleText.getText()).to({x: CANVAS_WIDTH + 300}, 500, createjs.Ease.backIn).call(function(){s_oStage.removeChild(oShuffleText);});
                });
            }
        }
    };
    
    this._hintMoveAndCheck = function(iRow, iCol){
        
        //CHECK UP        
        if(iRow > 0 && !_aGridSwapInfo[iRow][iCol].check_up && _aGridSwapInfo[iRow-1][iCol].type>= 0 && _aGridSwapInfo[iRow-1][iCol].type <  TYPE_STAR){
            _aGridSwapInfo[iRow][iCol].type = _aGrid[iRow-1][iCol].getType();
            _aGridSwapInfo[iRow-1][iCol].type = _aGrid[iRow][iCol].getType();
            
            var bCol = this._hintCheckColumn(_aGridSwapInfo, iCol);
            var bRow = this._hintCheckRow(_aGridSwapInfo, iRow);
            var bRow1 = this._hintCheckRow(_aGridSwapInfo, iRow-1);
            
            _aGridSwapInfo[iRow][iCol].type = _aGrid[iRow][iCol].getType();
            _aGridSwapInfo[iRow-1][iCol].type = _aGrid[iRow-1][iCol].getType();
            _aGridSwapInfo[iRow][iCol].check_up = true;
            _aGridSwapInfo[iRow-1][iCol].check_down =  true;
            
            if(bCol || bRow || bRow1){
                _aHintArray.push({element0row:iRow, element0col:iCol, element1row:iRow-1, element1col:iCol});
                //trace("UP")
            }
        }
        
        //CHECK DOWN
        if(iRow < _iMaxRow-1 && !_aGridSwapInfo[iRow][iCol].check_down && _aGridSwapInfo[iRow+1][iCol].type>= 0 && _aGridSwapInfo[iRow+1][iCol].type <  TYPE_STAR){
            _aGridSwapInfo[iRow][iCol].type = _aGrid[iRow+1][iCol].getType();
            _aGridSwapInfo[iRow+1][iCol].type = _aGrid[iRow][iCol].getType();
            
            var bCol = this._hintCheckColumn(_aGridSwapInfo, iCol);
            var bRow = this._hintCheckRow(_aGridSwapInfo, iRow);
            var bRow1 = this._hintCheckRow(_aGridSwapInfo, iRow+1);
            
            _aGridSwapInfo[iRow][iCol].type = _aGrid[iRow][iCol].getType();
            _aGridSwapInfo[iRow+1][iCol].type = _aGrid[iRow+1][iCol].getType();
            _aGridSwapInfo[iRow][iCol].check_down = true;
            _aGridSwapInfo[iRow+1][iCol].check_up =  true;
            
            if(bCol || bRow || bRow1){
                _aHintArray.push({element0row:iRow, element0col:iCol, element1row:iRow+1, element1col:iCol});
                //trace("DOWN")
            }
        }

        //CHECK LEFT        
        if(iCol > 0 && !_aGridSwapInfo[iRow][iCol].check_left && _aGridSwapInfo[iRow][iCol-1].type>= 0 && _aGridSwapInfo[iRow][iCol-1].type){
            _aGridSwapInfo[iRow][iCol].type = _aGrid[iRow][iCol-1].getType();
            _aGridSwapInfo[iRow][iCol-1].type = _aGrid[iRow][iCol].getType();
            
            var bRow = this._hintCheckRow(_aGridSwapInfo, iRow);
            var bCol = this._hintCheckColumn(_aGridSwapInfo, iCol);
            var bCol1 = this._hintCheckColumn(_aGridSwapInfo, iCol-1);
            
            
            _aGridSwapInfo[iRow][iCol].type = _aGrid[iRow][iCol].getType();
            _aGridSwapInfo[iRow][iCol-1].type = _aGrid[iRow][iCol-1].getType();
            _aGridSwapInfo[iRow][iCol].check_left = true;
            _aGridSwapInfo[iRow][iCol-1].check_right =  true;
            
            if(bRow || bCol || bCol1){
                _aHintArray.push({element0row:iRow, element0col:iCol, element1row:iRow, element1col:iCol-1});
                //trace("LEFT")
            }
        }

        //CHECK RIGHT
        if(iCol < _iMaxCol-1 && !_aGridSwapInfo[iRow][iCol].check_right && _aGridSwapInfo[iRow][iCol+1].type>= 0 && _aGridSwapInfo[iRow][iCol+1].type){
            _aGridSwapInfo[iRow][iCol].type = _aGrid[iRow][iCol+1].getType();
            _aGridSwapInfo[iRow][iCol+1].type = _aGrid[iRow][iCol].getType();
            
            var bRow = this._hintCheckRow(_aGridSwapInfo, iRow);
            var bCol = this._hintCheckColumn(_aGridSwapInfo, iCol);
            var bCol1 = this._hintCheckColumn(_aGridSwapInfo, iCol+1);
            
            _aGridSwapInfo[iRow][iCol].type = _aGrid[iRow][iCol].getType();
            _aGridSwapInfo[iRow][iCol+1].type = _aGrid[iRow][iCol+1].getType();
            _aGridSwapInfo[iRow][iCol].check_right = true;
            _aGridSwapInfo[iRow][iCol+1].check_left =  true;
            
            if(bRow || bCol || bCol1){
                _aHintArray.push({element0row:iRow, element0col:iCol, element1row:iRow, element1col:iCol+1});
                //trace("RIGHT")
            }
        }
    };
    
    this._hintCheckColumn = function(aGrid, iCol){
        var iCurColor = aGrid[0][iCol];
        var iSameColor = 0;
        for(var i=0; i<_iMaxRow; i++){
            if(aGrid[i][iCol].type === iCurColor && aGrid[i][iCol].type>= 0 && aGrid[i][iCol].type <  TYPE_STAR){
                
                iSameColor++;               

            } else {
                
                iSameColor = 1;
                iCurColor = aGrid[i][iCol].type;
            }
            
            if(iSameColor >= 3){
                return true;
            }            
        }
        
        return false;        
    };
    
    this._hintCheckRow = function(aGrid, iRow){
        var iCurColor = aGrid[iRow][0];
        var iSameColor = 0;
        for(var i=0; i<_iMaxCol; i++){
            if(aGrid[iRow][i].type === iCurColor && aGrid[iRow][i].type>= 0 && aGrid[iRow][i].type <  TYPE_STAR){
                
                iSameColor++;               

            } else {
                
                iSameColor = 1;
                iCurColor = aGrid[iRow][i].type;
            }
            
            if(iSameColor >= 3){
                return true;
            }            
        }
        
        return false;        
    };
    
    this._revealHint = function(){
         
        _aGrid[_oPickRandomHint.element0row][_oPickRandomHint.element0col].animHint();
        _aGrid[_oPickRandomHint.element1row][_oPickRandomHint.element1col].animHint();
     
    };
    
    this.printMatrix = function(aGrid){        
        var res = "";

        for (var i = 0; i < _iMaxRow; i++) {
            for (var j = 0; j < _iMaxCol; j++) {
                res += aGrid[i][j].type +"|";
            }
            res += "\n";

        }
        trace(res);        
    };
    
    this.returnInPosition = function(){
        _iSwappedCount++;
        if(_iSwappedCount === 2){
            _aGrid[_oCellSelected.row][_oCellSelected.col].setType(_iTypeToSwap1);
            _aGrid[_oCellToSwap.row][_oCellToSwap.col].setType(_iTypeToSwap2);
            
            _oCellSelected.cell.unload();
            _oCellToSwap.cell.unload();
            
            _oCellToSwap = null;
            _oCellSelected = null;
            _oTarget.visible = false;
            _iSwappedCount = 0;
            _bBlock = false;
        }        
    };  
    
    this._updateMatchScore = function(){
        var  iPartialScore = 0;
        for(var i=0; i<_aHorizontalMatch.length; i++){
            for(var j=0; j<_aHorizontalMatch[i].num; j++){
                if(j > 2){
                    iPartialScore = Math.round(iPartialScore * EXTRA_ITEM_MULTIPLIER);
                } else {
                    iPartialScore += SCORES_FOR_SINGLE;
                }
            }
            
            if(_aHorizontalMatch[i].num === 4){
                this._addNewTime(_aHorizontalMatch[i].num, _aHorizontalMatch[i].row, _aHorizontalMatch[i].col, TIME_FOR_QUAD, "horizontal");
                _bSpawnBomb = true;
            } else if(_aHorizontalMatch[i].num >= 5){
                this._addNewTime(_aHorizontalMatch[i].num, _aHorizontalMatch[i].row, _aHorizontalMatch[i].col, TIME_FOR_QUINT, "horizontal");
                _bAllowChanging = true;
            }
        }
        
        for(var i=0; i<_aVerticalMatch.length; i++){
            for(var j=0; j<_aVerticalMatch[i].num; j++){
                if(j > 2){
                    iPartialScore = Math.round(iPartialScore * EXTRA_ITEM_MULTIPLIER);
                } else {
                    iPartialScore += SCORES_FOR_SINGLE;
                }                  
            }
            
            if(_aVerticalMatch[i].num === 4){
                this._addNewTime(_aVerticalMatch[i].num, _aVerticalMatch[i].row, _aVerticalMatch[i].col, TIME_FOR_QUAD, "vertical");
                _bSpawnBomb = true;
            } else if(_aVerticalMatch[i].num >= 5){
                this._addNewTime(_aVerticalMatch[i].num, _aVerticalMatch[i].row, _aVerticalMatch[i].col, TIME_FOR_QUINT, "vertical");

                _bAllowChanging = true;
            }
        }
        
        this._updateScore(iPartialScore);        
    };
    
    this._addNewTime = function(iNum, iRow, iCol, iTime, iType){
        
        var iX = _aGrid[iRow][iCol].getPos().x;
        var iY = _aGrid[iRow][iCol].getPos().y;
        if(iType === "horizontal"){
            var pPos = _oGridContainer.localToGlobal(iX -_iCellSize*iNum/2,iY);
        } else if (iType === "vertical"){
            var pPos = _oGridContainer.localToGlobal(iX,iY - _iCellSize*iNum/2);
        } else {
            var pPos = _oGridContainer.localToGlobal(iX,iY);
        }

        var iTimeToAdd = iTime/1000;

        var oBonusTimeText = new CScoreText("+"+iTimeToAdd+" s", pPos.x/s_iScaleFactor, pPos.y/s_iScaleFactor);

        _iTimeElaps += iTime;
        
        if(_iTimeElaps > 16000) {
            _bClockSoundPlayed = false;
            stopSound("tictac");
            _oInterface.setTimerColor("#ffffff", "#ff0000");
        }
        if(_iTimeElaps > _iCurLevelTime){
            _iCurLevelTime = _iTimeElaps;
        }
        
    };
    
    this._updateScore = function(iPartialScore){
        _iScore += iPartialScore;
        _oInterface.refreshScore(_iScore);
        
        _iCounterChangeNumFruits = _iScore;
        if(_iCounterChangeNumFruits >= STEP_1_INCREASE_FRUITS && _iCounterChangeNumFruits < STEP_2_INCREASE_FRUITS && !_aStepNumItems[0]){
            _iNumItems = 4;
            _aStepNumItems[0] = true;
            _oFruitSpritesheet._changingNum(_iNumItems-1);
            this._levelUpMessage();
            this._updateSpritesheetToGrid();
            
        } else if(_iCounterChangeNumFruits >= STEP_2_INCREASE_FRUITS && _iCounterChangeNumFruits < STEP_3_INCREASE_FRUITS && !_aStepNumItems[1]){
            _iNumItems = 5;
            _aStepNumItems[1] = true;
            _oFruitSpritesheet._changingNum(_iNumItems-1);
            this._levelUpMessage();
            this._updateSpritesheetToGrid();
        } else if(_iCounterChangeNumFruits >= STEP_3_INCREASE_FRUITS && _iCounterChangeNumFruits < STEP_4_INCREASE_FRUITS && !_aStepNumItems[2]){
            _iNumItems = 6;
            _aStepNumItems[2] = true;
            _oFruitSpritesheet._changingNum(_iNumItems-1);
            this._levelUpMessage();
            this._updateSpritesheetToGrid();
        } else if(_iCounterChangeNumFruits >= STEP_4_INCREASE_FRUITS && !_aStepNumItems[3]){
            _iNumItems = 7;
            _aStepNumItems[3] = true;
            _oFruitSpritesheet._changingNum(_iNumItems-1);
            this._levelUpMessage();
            this._updateSpritesheetToGrid();
        }
    };
    
    this._levelUpMessage = function(){
        var oSprite = s_oSpriteLibrary.getSprite('level_up');
        var oLevelUpText = createBitmap(oSprite);//new CFormatText(-300, CANVAS_HEIGHT/2, TEXT_STAGE + " " +s_iCurLevel, "#ffffff", s_oStage, "#000000", 90);
        oLevelUpText.regX = oSprite.width/2;
        oLevelUpText.regY = oSprite.height/2;
        oLevelUpText.y = CANVAS_HEIGHT/2;
        s_oStage.addChild(oLevelUpText);

        createjs.Tween.get(oLevelUpText).to({x: CANVAS_WIDTH/2}, 500, createjs.Ease.quintOut).wait(500).to({x: CANVAS_WIDTH + 300}, 500, createjs.Ease.backIn).call(function(){
            s_oStage.removeChild(oLevelUpText);
        });
    };
    
    this._timeIsUpMessage = function(){
        // playSound("game_over",1,false);
        // stopSound("tictac");
        
        var oSprite = s_oSpriteLibrary.getSprite('time_is_up');
        var oTimeUpText = createBitmap(oSprite);//new CFormatText(-300, CANVAS_HEIGHT/2, TEXT_STAGE + " " +s_iCurLevel, "#ffffff", s_oStage, "#000000", 90);
        oTimeUpText.regX = oSprite.width/2;
        oTimeUpText.regY = oSprite.height/2;
        oTimeUpText.y = CANVAS_HEIGHT/2;
        s_oStage.addChild(oTimeUpText);

        createjs.Tween.get(oTimeUpText).to({x: CANVAS_WIDTH/2}, 500, createjs.Ease.quintOut).wait(500).to({x: CANVAS_WIDTH + 300}, 500, createjs.Ease.backIn).call(function(){
            s_oStage.removeChild(oTimeUpText);
            s_oGame.gameOver();
        });
    };
    
    this._updateSpritesheetToGrid = function(){
        for(var i=0; i<_iMaxRow; i++){
            for(var j=0; j<_iMaxCol; j++){
                _aGrid[i][j].setNewSpritesheet();
            }
        }    
    };  
    
    this.createParticle = function(iX, iY, iType, szDir){
        _aParticle.push(new CParticle(iX, iY, iType, szDir, _oParticleContainer)); 
    };
    
    this.unload = function(){
        stopSound("tictac");
        
        _bInitGame = false;
        
        _oInterface.unload();
        if(_oEndPanel !== null){
            _oEndPanel.unload();
            _oEndPanel = null;
        }
        
        _oCellSelected = null;
        for(var i=0; i<_aGrid.length; i++){
            for(var j=0; j<_aGrid[i].length; j++){
                
                _aGrid[i][j].unload();
                
            }
        }
        
        if(s_bMobile){
            _oHammer.off("swipeleft",function(){_oParent._swipeControl("left");});
            _oHammer.off("swiperight",function(){_oParent._swipeControl("right");});
            _oHammer.off("swipeup",function(){_oParent._swipeControl("up");});
            _oHammer.off("swipedown",function(){_oParent._swipeControl("down");});
        }
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();
    };
    
    this.setBlock = function(bVal){
        _bBlock = bVal;
    };
    
    this.getBlock = function(){
        return _bBlock;
    };
    
    this.restartGame = function () {
        if(!_bBlock){            
            this.unload();
            this._init();
        }        
    };
    
    this.pauseGame = function(){
        if(!_bBlock){

            _bInitGame = false;
            _oPausePanel = new CPausePanel();
            
            if(s_bMobile){
                _oHammer.off("swipeleft",function(){_oParent._swipeControl("left");});
                _oHammer.off("swiperight",function(){_oParent._swipeControl("right");});
                _oHammer.off("swipeup",function(){_oParent._swipeControl("up");});
                _oHammer.off("swipedown",function(){_oParent._swipeControl("down");});
            }
        }
    };

    this.resumeGame = function(){
        _bInitGame = true;
       
        _oPausePanel.unload();
        
        if(s_bMobile){
            this._initHammer();
        }
    };
 
    this.stopUpdate = function(){
        _bInitGame = false;
    };
    
    this.resumeUpdate = function(){
        _bInitGame = true;
    };
 
    this.onExit = function(){
        this.unload();
        s_oMain.gotoMenu();
    };
    
    this.onExitHelp = function () {
        this._hintCheckMovesAvailable();
        
        _bInitGame = true;
        $(s_oMain).trigger("start_level",s_iCurLevel);
        
    };
    
    this.gameOver = function(){  
        _bInitGame = false;

        _oEndPanel = new CEndPanel(_iScore, _iTimeBonusScore);
    };

    this._timeTimer = function(){
        _iTimeTimer -= s_iTimeElaps;
        if(_iTimeTimer < 0){
            _iTimeTimer = TIMER_CLOCK_SPAWN[iLevel];
            _bTimeSpawn = true;
        }
    };
    
    this.update = function(){
        
        if(_bInitGame){
        
            if(!_bTimeSpawn && CONFIG[iLevel].clockallowed && _iNumItems >= 5){
                this._timeTimer();
            }
        
            _iTimeElaps -= s_iTimeElaps;
            
            if(_bStartHintTimer){
                _iHintTimer += s_iTimeElaps;
                if(_iHintTimer > TIMER_HINT){
                    _bStartHintTimer = false;
                    _iHintTimer = 0;
                    this._revealHint();
                }
            };
            

            if(_iTimeElaps < 15000 && !_bClockSoundPlayed){
                _bClockSoundPlayed = true;

                // playSound("tictac",1,true);
                
                _oInterface.setTimerColor("#ff0000", "#000000");
            }
            
            
             
            if(_iTimeElaps < 0 && _oEndPanel === null){
                _iTimeElaps = 0;
                this._timeIsUpMessage();
                _bInitGame = false;
                return;
            }
            _oInterface.refreshTime(_iTimeElaps, _iTimeElaps / (_iCurLevelTime + 1000) );     
            
        }
        
        if(_aParticle.length > 0){
            for(var i=0; i<_aParticle.length; i++){
                _aParticle[i].update();
            } 

            for(var i=_aParticle.length-1; i>=0; i--){
                if(_aParticle[i].isGone()){
                    _aParticle.splice(i,1);
                }
            }                
        }
        
    };

    s_oGame=this;
    
    SCORES_FOR_SINGLE = oData.scores_for_single;
    SCORES_FOR_BOMB = oData.scores_for_bomb;
    EXTRA_ITEM_MULTIPLIER = oData.extra_item_multiplier;
    
    TIMER_HINT = oData.hint_timer;
    
    TIME_TO_ADD = oData.hourglass_add_time;
    TIME_FOR_QUAD = oData.quad_combo_time;
    TIME_FOR_QUINT = oData.quint_combo_time;
    
    STEP_1_INCREASE_FRUITS = oData.increase_to_4_fruits_goal_score;
    STEP_2_INCREASE_FRUITS = oData.increase_to_5_fruits_goal_score;
    STEP_3_INCREASE_FRUITS = oData.increase_to_6_fruits_goal_score;
    STEP_4_INCREASE_FRUITS = oData.increase_to_7_fruits_goal_score;
    
    STARTING_TIME = oData.starting_time;
    
    _oParent=this;
    this._init();
}

var s_oGame;
