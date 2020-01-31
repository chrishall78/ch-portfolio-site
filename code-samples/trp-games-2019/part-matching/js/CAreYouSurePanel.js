function CAreYouSurePanel(oParentContainer) {
    var _iStartY;
    var _aCbCompleted;
    var _aCbOwner;
    var _oListener;
    
    var _oBg;
    var _oMsg;
    var _oMsgStroke;
    var _oButYes;
    var _oButNo;
    var _oContainer;
    var _oParentContainer;
    var _oFade;
    var _oPanelContainer;
    
    var _oThis = this;

    this._init = function () {
        _aCbCompleted = new Array();
        _aCbOwner = new Array();
        
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        _oParentContainer.addChild(_oContainer);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.01;
        _oListener = _oFade.on("click", function () {});
        _oContainer.addChild(_oFade);
        
        _oPanelContainer = new createjs.Container();   
        _oContainer.addChild(_oPanelContainer);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite('pause_panel');
        _oBg = createBitmap(oSpriteBg);
        _oBg.regX = oSpriteBg.width * 0.5;
        _oBg.regY = oSpriteBg.height * 0.5;
        _oPanelContainer.addChild(_oBg);
        
        _oPanelContainer.x = CANVAS_WIDTH/2;
        _oPanelContainer.y = CANVAS_HEIGHT/2;    
        
        _oMsgStroke = new createjs.Text("", "90px " + SECONDARY_FONT, "#821010");
        _oMsgStroke.x = 0;
        _oMsgStroke.y = -220;
        _oMsgStroke.textAlign = "center";
        _oMsgStroke.textBaseline = "middle";
        _oMsgStroke.lineWidth = oSpriteBg.width -50;
        _oMsgStroke.outline = 6;
        _oPanelContainer.addChild(_oMsgStroke);
        
        _oMsg = new createjs.Text("", "90px " + SECONDARY_FONT, "#fff");
        _oMsg.x = _oMsgStroke.x;
        _oMsg.y = _oMsgStroke.y;
        _oMsg.textAlign = "center";
        _oMsg.textBaseline = "middle";
        _oMsg.lineWidth = oSpriteBg.width -50;
        _oPanelContainer.addChild(_oMsg);

        _oButYes = new CGfxButton(160, 30, s_oSpriteLibrary.getSprite('but_yes'), _oPanelContainer);
        _oButYes.addEventListener(ON_MOUSE_UP, this._onButYes, this);

        _oButNo = new CGfxButton(-160, 30, s_oSpriteLibrary.getSprite('but_no'), _oPanelContainer);
        _oButNo.addEventListener(ON_MOUSE_UP, this._onButNo, this);
    };
    
    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };
    
    this.show = function (szText,iSize) {
        _oMsgStroke.text = szText;
        _oMsgStroke.font = iSize+"px " + SECONDARY_FONT;
        _oMsg.text = szText;
        _oMsg.font = iSize+"px " + SECONDARY_FONT;
        
        //_oPanelContainer.y = _iStartY;
        _oContainer.visible = true;
        
        s_oGame.stopUpdate();
    };
    
    this.hide = function(){
        s_oGame.resumeUpdate();
        _oContainer.visible = false;
    };

    this.unload = function () {
        _oButNo.unload();
        _oButYes.unload();
        _oFade.off("click",_oListener);
    };

    this._onButYes = function () {
        _oThis.hide();
        
        if (_aCbCompleted[ON_BUT_YES_DOWN]) {
            _aCbCompleted[ON_BUT_YES_DOWN].call(_aCbOwner[ON_BUT_YES_DOWN]);
        }
    };

    this._onButNo = function () {
        
        _oThis.hide();
    };

    _oParentContainer = oParentContainer;

    this._init();
}