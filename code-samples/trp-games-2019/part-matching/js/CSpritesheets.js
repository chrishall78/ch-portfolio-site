function CSpriteSheets(){
    
    this._init = function(){
        var oSprite = s_oSpriteLibrary.getSprite('fruit_0');
        var iWidth = oSprite.width;
        var iHeight = oSprite.height;

        var oData = {   
                        framerate: 25,
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: iWidth/9, height: iHeight, regX: (iWidth/9)/2, regY: iHeight/2}, 
                        animations: {flawless: [0], slice_0:[1], slice_1:[2], slice_2:[3], slice_3:[4], slice_4:[5], slice_5:[6], slice_6:[7], slice_7:[8]}
                   };

        s_aFruitSpritesheet[0] = new createjs.SpriteSheet(oData);


        var oSprite = s_oSpriteLibrary.getSprite('fruit_1');
        var iWidth = oSprite.width;
        var iHeight = oSprite.height;

        var oData = {   
                        framerate: 25,
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: iWidth/9, height: iHeight, regX: (iWidth/9)/2, regY: iHeight/2}, 
                        animations: {flawless: [0], slice_0:[1], slice_1:[2], slice_2:[3], slice_3:[4], slice_4:[5], slice_5:[6], slice_6:[7], slice_7:[8]}
                   };

        s_aFruitSpritesheet[1] = new createjs.SpriteSheet(oData);

        var oSprite = s_oSpriteLibrary.getSprite('fruit_2');
        var iWidth = oSprite.width;
        var iHeight = oSprite.height;

        var oData = {   
                        framerate: 25,
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: iWidth/9, height: iHeight, regX: (iWidth/9)/2, regY: iHeight/2}, 
                        animations: {flawless: [0], slice_0:[1], slice_1:[2], slice_2:[3], slice_3:[4], slice_4:[5], slice_5:[6], slice_6:[7], slice_7:[8]}
                   };

        s_aFruitSpritesheet[2] = new createjs.SpriteSheet(oData);

        var oSprite = s_oSpriteLibrary.getSprite('fruit_3');
        var iWidth = oSprite.width;
        var iHeight = oSprite.height;

        var oData = {   
                        framerate: 25,
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: iWidth/9, height: iHeight, regX: (iWidth/9)/2, regY: iHeight/2}, 
                        animations: {flawless: [0], slice_0:[1], slice_1:[2], slice_2:[3], slice_3:[4], slice_4:[5], slice_5:[6], slice_6:[7], slice_7:[8]}
                   };

        s_aFruitSpritesheet[3] = new createjs.SpriteSheet(oData);

        var oSprite = s_oSpriteLibrary.getSprite('fruit_4');
        var iWidth = oSprite.width;
        var iHeight = oSprite.height;

        var oData = {   
                        framerate: 25,
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: iWidth/9, height: iHeight, regX: (iWidth/9)/2, regY: iHeight/2}, 
                        animations: {flawless: [0], slice_0:[1], slice_1:[2], slice_2:[3], slice_3:[4], slice_4:[5], slice_5:[6], slice_6:[7], slice_7:[8]}
                   };

        s_aFruitSpritesheet[4] = new createjs.SpriteSheet(oData);

        var oSprite = s_oSpriteLibrary.getSprite('fruit_5');
        var iWidth = oSprite.width;
        var iHeight = oSprite.height;

        var oData = {   
                        framerate: 25,
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: iWidth/9, height: iHeight, regX: (iWidth/9)/2, regY: iHeight/2}, 
                        animations: {flawless: [0], slice_0:[1], slice_1:[2], slice_2:[3], slice_3:[4], slice_4:[5], slice_5:[6], slice_6:[7], slice_7:[8]}
                   };

        s_aFruitSpritesheet[5] = new createjs.SpriteSheet(oData);

        var oSprite = s_oSpriteLibrary.getSprite('fruit_6');
        var iWidth = oSprite.width;
        var iHeight = oSprite.height;

        var oData = {   
                        framerate: 25,
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: iWidth/9, height: iHeight, regX: (iWidth/9)/2, regY: iHeight/2}, 
                        animations: {flawless: [0], slice_0:[1], slice_1:[2], slice_2:[3], slice_3:[4], slice_4:[5], slice_5:[6], slice_6:[7], slice_7:[8]}
                   };

        s_aFruitSpritesheet[6] = new createjs.SpriteSheet(oData);
        
        
        this._changingNum(CONFIG[s_iCurLevel].numitems -1);
        
    };
    
    this._changingNum = function(iNum){
        var iNumChangingItem = iNum;
        var oSprite = s_oSpriteLibrary.getSprite('fruits');
        var oData = {   
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: CELL_SIZE, height: CELL_SIZE, regX: CELL_SIZE/2, regY: CELL_SIZE/2}, 
                        animations: {type_0:[0], type_1:[1], type_2:[2], type_3:[3], type_4:[4], type_5:[5], type_6:[6], type_7:[7], star:[8], bomb:[9], clock:[10], changing:[0,iNumChangingItem,"changing",0.150]}
                   };

        s_oFruitSpritesheet = new createjs.SpriteSheet(oData);
    }; 
    
    
    this._init();
}



var s_aFruitSpritesheet = new Array();
var s_oFruitSpritesheet;