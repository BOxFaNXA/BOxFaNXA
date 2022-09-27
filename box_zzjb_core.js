/*:
 * @target MZ
 * @plugindesc 一盒子插件
 * @author 盒师傅
 *
 * 
 * 
 /*
 *@help
 * =============================================================================
 * 
 * 
 * 
 * 
 * 
 * =============================================================================
 * 帮助结束
 * ================================================================================
 * @param ------分组1------
 * @default  
 * 
 * @param box Window Width1
 * @text 菜单选项窗口宽
 * @parent SelectSellWindowSet
 * @desc 确认窗口的宽度
 * @default 465
 * 
 * @param box Window Height1
 * @text 菜单选项窗口高
 * @parent SelectSellWindowSet
 * @desc 确认窗口的高度
 * @default 280
 * 
 * @param box Window Width2
 * @text 菜单角色窗口宽
 * @parent SelectSellWindowSet
 * @desc 确认窗口的宽度
 * @default 465
 * 
 * @param box Window Height2
 * @text 菜单角色窗口高
 * @parent SelectSellWindowSet
 * @desc 确认窗口的高度
 * @default 280
 * 
 * @param box Window Width3
 * @text 物品菜单种类选项窗口宽
 * @parent SelectSellWindowSet
 * @desc 确认窗口的高度
 * @default 280
 * 
 * @param box Window Height3
 * @text 物品菜单种类选项窗口高
 * @parent SelectSellWindowSet
 * @desc 确认窗口的高度
 * @default 280
 * 
 * @param windowcJText
 * @parent TextSet
 * @desc 乘降按钮名字
 * @default 全部
 */  
    
    
    //========================================
//========================================
var Imported = Imported || {};
Imported.box_zzjb_core = true;

var box = box || {};
box.Parameters = PluginManager.parameters('box_zzjb_core');
box.box_Window_Width1 = Number(box.Parameters['box Window Width1'] || 400);
box.box_Window_Height1 = Number(box.Parameters['box Window Height1'] || 200);
box.box_Window_Width2 = Number(box.Parameters['box Window Width2'] || 400);
box.box_Window_Height2 = Number(box.Parameters['box Window Height2'] || 200);
box.box_Window_Width3 = Number(box.Parameters['box Window Width3'] || 400);
box.box_Window_Height3 = Number(box.Parameters['box Window Height3'] || 200);
box.windowcJText = String(box.Parameters['windowcJText'] || '乘降');

//窗口状态部分
function Window_BoxStatusBase() {
    this.initialize(...arguments);
}

Window_BoxStatusBase.prototype = Object.create(Window_Selectable.prototype);
Window_BoxStatusBase.prototype.constructor = Window_BoxStatusBase;

Window_BoxStatusBase.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._additionalSprites = {};
    this.loadFaceImages();
};

Window_BoxStatusBase.prototype.loadFaceImages = function() {
    for (const actor of $gameParty.members()) {
        ImageManager.loadFace(actor.faceName());
    }
};

Window_BoxStatusBase.prototype.refresh = function() {
    this.hideAdditionalSprites();
    Window_Selectable.prototype.refresh.call(this);
};

Window_BoxStatusBase.prototype.hideAdditionalSprites = function() {
    for (const sprite of Object.values(this._additionalSprites)) {
        sprite.hide();
    }
};

Window_BoxStatusBase.prototype.placeActorName = function(actor, x, y) {
    const key = "actor%1-name".format(actor.actorId());
    const sprite = this.createInnerSprite(key, Sprite_Name);
    sprite.setup(actor);
    sprite.move(x, y);
    sprite.show();
};

Window_BoxStatusBase.prototype.placeStateIcon = function(actor, x, y) {
    const key = "actor%1-stateIcon".format(actor.actorId());
    const sprite = this.createInnerSprite(key, Sprite_StateIcon);
    sprite.setup(actor);
    sprite.move(x, y);
    sprite.show();
};

Window_BoxStatusBase.prototype.placeGauge = function(actor, type, x, y) {
    const key = "actor%1-gauge-%2".format(actor.actorId(), type);
    const sprite = this.createInnerSprite(key, Sprite_Gauge);
    sprite.setup(actor, type);
    sprite.move(x, y);
    sprite.show();
};

Window_BoxStatusBase.prototype.createInnerSprite = function(key, spriteClass) {
    const dict = this._additionalSprites;
    if (dict[key]) {
        return dict[key];
    } else {
        const sprite = new spriteClass();
        dict[key] = sprite;
        this.addInnerChild(sprite);
        return sprite;
    }
};

Window_BoxStatusBase.prototype.placeTimeGauge = function(actor, x, y) {
    if (BattleManager.isTpb()) {
        this.placeGauge(actor, "time", x, y);
    }
};

Window_BoxStatusBase.prototype.placeBasicGauges = function(actor, x, y) {
    this.placeGauge(actor, "hp", x - 80, y);
    /*
    this.placeGauge(actor, "mp", x + 55, y);
    if ($dataSystem.optDisplayTp) {
        this.placeGauge(actor, "tp", x + (55 * 2.5), y);
    }
    */
};

Window_BoxStatusBase.prototype.gaugeLineHeight = function() {
    return 24;
};

Window_BoxStatusBase.prototype.drawActorCharacter = function(actor, x, y) {
    this.drawCharacter(actor.characterName(), actor.characterIndex(), x, y);
};

// prettier-ignore
Window_BoxStatusBase.prototype.drawActorFace = function(
    actor, x, y, width, height
) {
    this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height);
};

Window_BoxStatusBase.prototype.drawActorName = function(actor, x, y, width) {
    width = width || 168;
    this.changeTextColor(ColorManager.hpColor(actor));
    this.drawText(actor.name(), x, y, width);
};

Window_BoxStatusBase.prototype.drawActorClass = function(actor, x, y, width) {
    width = width || 168;
    this.resetTextColor();
    this.drawText(actor.currentClass().name, x-100, y, width);
};

Window_BoxStatusBase.prototype.drawActorNickname = function(actor, x, y, width) {
    width = width || 270;
    this.resetTextColor();
    this.drawText(actor.nickname(), x, y, width);
};

Window_BoxStatusBase.prototype.drawActorLevel = function(actor, x, y) {
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.levelA, x, y, 48);
    this.resetTextColor();
    this.drawText(actor.level, x + 30, y, 36, "right");
};

Window_BoxStatusBase.prototype.drawActorIcons = function(actor, x, y, width) {
    width = width || 144;
    const iconWidth = ImageManager.iconWidth;
    const icons = actor.allIcons().slice(0, Math.floor(width / iconWidth));
    let iconX = x;
    for (const icon of icons) {
        this.drawIcon(icon, iconX, y + 2);
        iconX += iconWidth;
    }
};

Window_BoxStatusBase.prototype.drawActorSimpleStatus = function(actor, x, y) {
    const lineHeight = this.lineHeight();
    const x2 = x + 180;
    this.drawActorName(actor, 20, y + lineHeight * 1);
    this.drawActorLevel(actor, x -20, y + lineHeight * 1);
    this.drawActorIcons(actor, x-20, y + lineHeight * 2);
    this.drawActorClass(actor, x2-20, y + lineHeight * 1);
    this.placeBasicGauges(actor, x2+30, y + lineHeight);
};

Window_BoxStatusBase.prototype.actorSlotName = function(actor, index) {
    const slots = actor.equipSlots();
    return $dataSystem.equipTypes[slots[index]];
};

// 主菜单角色部分
function Window_MenuStatus() {
    this.initialize(...arguments);
}

Window_MenuStatus.prototype = Object.create(Window_BoxStatusBase.prototype);
Window_MenuStatus.prototype.constructor = Window_MenuStatus;

Window_MenuStatus.prototype.initialize = function(rect) {
    Window_BoxStatusBase.prototype.initialize.call(this, rect);
    this._formationMode = false;
    this._pendingIndex = -1;
    this.refresh();
};

Window_MenuStatus.prototype.maxItems = function() {
    return $gameParty.size();
};

Window_MenuStatus.prototype.numVisibleRows = function() {
    return 4;
};

Window_MenuStatus.prototype.itemHeight = function() {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};

Window_MenuStatus.prototype.actor = function(index) {
    return $gameParty.members()[index];
};

Window_MenuStatus.prototype.drawItem = function(index) {
    this.drawPendingItemBackground(index);
    this.drawItemStatus(index);
};

Window_MenuStatus.prototype.drawPendingItemBackground = function(index) {
    if (index === this._pendingIndex) {
        const rect = this.itemRect(index);
        const color = ColorManager.pendingColor();
        this.changePaintOpacity(false);
        this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
        this.changePaintOpacity(true);
    }
};

Window_MenuStatus.prototype.drawItemStatus = function(index) {
    const actor = this.actor(index);
    const rect = this.itemRect(index);
    const x = rect.x + 180;
    const y = rect.y + Math.floor(rect.height / 2 - this.lineHeight() * 1.5);
    this.drawActorSimpleStatus(actor, x, y);
};

Window_MenuStatus.prototype.processOk = function() {
    Window_BoxStatusBase.prototype.processOk.call(this);
    const actor = this.actor(this.index());
    $gameParty.setMenuActor(actor);
};

Window_MenuStatus.prototype.isCurrentItemEnabled = function() {
    if (this._formationMode) {
        const actor = this.actor(this.index());
        return actor && actor.isFormationChangeOk();
    } else {
        return true;
    }
};

Window_MenuStatus.prototype.selectLast = function() {
    this.smoothSelect($gameParty.menuActor().index() || 0);
};

Window_MenuStatus.prototype.formationMode = function() {
    return this._formationMode;
};

Window_MenuStatus.prototype.setFormationMode = function(formationMode) {
    this._formationMode = formationMode;
};

Window_MenuStatus.prototype.pendingIndex = function() {
    return this._pendingIndex;
};

Window_MenuStatus.prototype.setPendingIndex = function(index) {
    const lastPendingIndex = this._pendingIndex;
    this._pendingIndex = index;
    this.redrawItem(this._pendingIndex);
    this.redrawItem(lastPendingIndex);
};

Scene_MenuBase.prototype.createCancelButton = function() {
    this._cancelButton = new Sprite_Button("cancel");
    this._cancelButton.x = Graphics.boxWidth - this._cancelButton.width - 4;
    this._cancelButton.y = this.buttonY();
    this.addWindow(this._cancelButton);
};

Window_MenuCommand.prototype.addOriginalCommands = function() {
    //
    this.addCommand(box.windowcJText,    'CJbox');
};
Window_MenuCommand.prototype.makeCommandList = function() {
    this.addMainCommands();
    this.addOriginalCommands();
    this.addFormationCommand();
    this.addOptionsCommand();
    this.addSaveCommand();
    this.addGameEndCommand();
};

Scene_Menu.prototype.createCommandWindow = function() {
    const rect = this.commandWindowRect();
    const commandWindow = new Window_MenuCommand(rect);
    commandWindow.setHandler("item", this.commandItem.bind(this));
    commandWindow.setHandler("skill", this.commandPersonal.bind(this));
    commandWindow.setHandler("equip", this.commandPersonal.bind(this));
    commandWindow.setHandler("status", this.commandPersonal.bind(this));
    commandWindow.setHandler("formation", this.commandFormation.bind(this));
    commandWindow.setHandler("options", this.commandOptions.bind(this));
    commandWindow.setHandler("save", this.commandSave.bind(this));
    commandWindow.setHandler("gameEnd", this.commandGameEnd.bind(this));
    commandWindow.setHandler("cancel", this.popScene.bind(this));
    commandWindow.setHandler("CJbox", this.CJbox.bind(this));
    this.addWindow(commandWindow);
    this._commandWindow = commandWindow;
};

Scene_Menu.prototype.CJbox = function() {

};



//主菜单命令
Scene_Menu.prototype.commandWindowRect = function() {
    const ww = box.box_Window_Width1
    const wh = box.box_Window_Height1
    const wx = Graphics.width - (Graphics.width - 50);
    const wy = Graphics.height - (wh+20);
    return new Rectangle(wx, wy, ww, wh);
};

//角色
Scene_Menu.prototype.statusWindowRect = function() {
    const ww = box.box_Window_Width2
    const wh = box.box_Window_Height2
    const wx = this.commandWindowRect().x + this.commandWindowRect().width; 
    const wy = this.commandWindowRect().y
    return new Rectangle(wx, wy, ww, wh);
};
//金币
Scene_Menu.prototype.goldWindowRect = function() {
    const ww = this.mainCommandWidth();
    const wh = this.calcWindowHeight(1, true);
    const wx = this.statusWindowRect().x + this.statusWindowRect().width - ww
    const wy = this.commandWindowRect().y - wh
    return new Rectangle(wx, wy, ww, wh);
};
