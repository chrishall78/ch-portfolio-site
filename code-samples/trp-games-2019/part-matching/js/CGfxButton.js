function CGfxButton(iXPos,iYPos,oSprite, oParentContainer){
    
    var _bScale;
    var _bText;
    
    var _iWidth;
    var _iHeight;
    
    var _aParams = [];
    
    var _aCbCompleted;
    var _aCbOwner;
    var _oButton;
    var _oImage;
    var _oText;
    var _oListenerMouseDown;
    var _oListenerMouseOver;
    var _oListenerMouseOut;
    var _oListenerMouseUp;
    
    this._init =function(iXPos,iYPos,oSprite, oParentContainer){
        
        _bScale = true;
        _bText = false;
        
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oButton = new createjs.Container();
        _oButton.x = iXPos;
        _oButton.y = iYPos; 
        
        _oImage = createBitmap( oSprite);                                
        _oImage.regX = oSprite.width/2;
        _oImage.regY = oSprite.height/2;
        _iWidth = oSprite.width;
        _iHeight = oSprite.height;
        _oButton.addChild(_oImage);
       
        oParentContainer.addChild(_oButton);
        
        
        this._initListener();
    };
    
    this.unload = function(){
        if(s_bMobile){
            _oButton.off("mousedown", _oListenerMouseDown);
            _oButton.off("pressup" , _oListenerMouseUp);
        } else {
            _oButton.off("mousedown", _oListenerMouseDown);
            _oButton.off("mouseover", _oListenerMouseOver);
            _oButton.off("mouseout", _oListenerMouseOut);
            _oButton.off("pressup" , _oListenerMouseUp);
        }
       
       oParentContainer.removeChild(_oButton);
    };
    
    this.setVisible = function(bVisible){
        _oButton.visible = bVisible;
    };
    
    this._initListener = function(){
        if(s_bMobile){
            _oListenerMouseDown = _oButton.on("mousedown", this.buttonDown);
            _oListenerMouseUp = _oButton.on("pressup" , this.buttonRelease);
        } else {
            _oListenerMouseDown = _oButton.on("mousedown", this.buttonDown);
            _oListenerMouseOver = _oButton.on("mouseover", this.buttonOver);
            _oListenerMouseOut = _oButton.on("mouseout", this.buttonOut);
            _oListenerMouseUp = _oButton.on("pressup" , this.buttonRelease);
        }     
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.addEventListenerWithParams = function(iEvent,cbCompleted, cbOwner,aParams){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams = aParams;
    };
    
    this.buttonRelease = function(){
        
        _oButton.scaleX = 1;
        _oButton.scaleY = 1;

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP],_aParams);
        }
    };
    
    this.buttonOver = function(evt){

        if(!s_bMobile){
            evt.target.cursor = "pointer";
        }

        if(_bText){
            _oText.setVisible(true);
        }
        
    };
    
    this.buttonOut = function(){
        if(_bText){
            _oText.setVisible(false);
        }
        
    };
    
    this.buttonDown = function(){
        _oButton.scaleX = 0.9;
        _oButton.scaleY = 0.9;
           
        // playSound("click",1,false);

        if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN],_aParams);
        }
    };
    
    this.setScaleOn = function(bVal){
        _bScale = bVal;
    };
    
    this.addTextOn = function(szText, szType){
        _bText = true;
        if(szType === "left"){
            _oText = new CFormatText(-_iWidth/2, -_iHeight/2 - 10, szText, "#ffe400", _oButton, "#ac5124", 14);
            _oText.setAlign("left");
        } else if(szType === "center"){
            _oText = new CFormatText(0, -_iHeight/2 - 10, szText, "#ffe400", _oButton, "#ac5124", 14);
            _oText.setAlign("center");
        } else if(szType === "bot"){
            _oText = new CFormatText(0, +_iHeight/2 + 12, szText, "#ffe400", _oButton, "#ac5124", 14);
            _oText.setAlign("center");
        }
        
        _oText.setVisible(false);
        
    };
    
    this.setPosition = function(iXPos,iYPos){
         _oButton.x = iXPos;
         _oButton.y = iYPos;
    };
    
    this.setX = function(iXPos){
         _oButton.x = iXPos;
    };
    
    this.setY = function(iYPos){
         _oButton.y = iYPos;
    };
    
    this.getButtonImage = function(){
        return _oButton;
    };
    
    
    this.getX = function(){
        return _oButton.x;
    };
    
    this.getY = function(){
        return _oButton.y;
    };

    this.reverseSprite = function(){
        _oImage.scaleX = -1;
    };

    this._init(iXPos,iYPos,oSprite, oParentContainer);
    
    return this;
}