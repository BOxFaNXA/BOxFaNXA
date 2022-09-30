/*:
 * @author boxlunch
 * @plugindesc 锻造插件
 * @target MZ MV
 * @help
 * 使用Scene_SmithingOpen(插件参数里的真·锻造列表序号,是否可以改变名字,简介);脚本即可输打开锻造界面
 * 
 * 示例Scene_SmithingOpen(1,1)；
 * 
 * 插件参数的列表序号从0开始，0既是一。
 * 
 * 
 * @param box smithing List
 * @parent Advanced Types
 * @text 锻造列表
 * @type struct<TestStruct>[]
 * @default []
 * 
 * 
 * @param DuLiBooleanParam
 * @text 是否开启独立装备
 * @desc 是否开启独立装备
 * @type boolean
 * @on 开启
 * @off 关闭
 * @default true
 * 
 * @param dulistartid
 * @text 独立装备起始ID
 * @desc 起始ID
 * @type number
 * @min 1
 * @default 1
 * 
 * @param duliwitems
 * @text 独立物品最大数量
 * @desc 独立物品最大数量
 * @type number
 * @min 1
 * @default 1
 * 
 * @param duliweapons
 * @text 独立武器最大数量
 * @desc 独立武器最大数量
 * @type number
 * @min 1
 * @default 1
 * 
 * @param duliarmors
 * @text 独立护甲最大数量
 * @desc 独立护甲最大数量
 * @type number
 * @min 1
 * @default 1
 * 
 * @param BoxSmithingList
 * @parent Advanced Types
 * @text 真·锻造列表
 * @type struct<smithingStruct>[]
 * @default ["1","2","3"]
 * 
 * @param duzaowenben
 * @text 锻造按钮文本
 * @desc 这是锻造按钮的文本
 * @type string
 * @default abc
 * 
 * @param duzaowenben1
 * @text 锻造改名弹窗显示文本
 * @desc 锻造改名弹窗显示文本
 * @type string
 * @default abc
 * 
 * @param duzaowenben2
 * @text 锻造改名弹窗显示文本
 * @desc 锻造改名弹窗显示文本
 * @type string
 * @default abc
 * 
 * @param duzaowenben3
 * @text 锻造改简介弹窗显示文本
 * @desc 锻造改简介弹窗显示文本
 * @type string
 * @default abc
 * 
 * @param duzaowenben4
 * @text 锻造改简介弹窗显示文本
 * @desc 锻造改简介弹窗显示文本
 * @type string
 * @default abc
 * */
/*~struct~TestStruct:
 * @param ComboSmithing
 * @text 锻造列表的列表
 * @desc 1.武器 2.防具 3.物品
 * @type combo
 * @option 1
 * @option 2
 * @option 3
 * @default 1
 * 
 * @param Smithingtoid
 * @text 锻造的物品序号
 * @type number
 * 
 * @param SmithingWeaponS
 * @text 锻造需求之武器
 * @desc 锻造时的武器需求
 * @type struct<smithingWeapon>
 * @default {"WeaponSmithingid":"1"}
 * 
 * @param SmithingArmorS
 * @text 锻造需求之护甲
 * @desc 锻造时的护甲需求
 * @type struct<smithingArmor>
 * @default {"ArmorSmithingid":"1"}
 * 
 * @param SmithingItemS
 * @text 锻造需求之物品
 * @desc 锻造时的物品需求
 * @type struct<smithingItem>
 * @default {"SmithingItemid":"1"}
 * 
 * @param SmithinggoldNumber
 * @text 锻造的金币需求
 * @type number
 * 
 * @param SmithingBoolean
 * @text 条件满足情况
 * @desc 是否满足任何一个条件就可以锻造
 * @type boolean
 * @on 是
 * @off 否
 * @default true
 * 
 * @param youxianji
 * @text 锻造条件优先级
 * @desc 1.金币2.武器3.防具4.物品
 * @type number[]
 * @default ["1","2","3"]
 */
/*~struct~smithingStruct:
 * 
 * @param SmithingListID
 * @text 真*锻造列表2
 * @desc 这是锻造所需的物品id的列表
 * @type number[]
 * @default ["1","2","3"]
 */
/*~struct~smithingWeapon:
 * 
 * @param WeaponSmithingid
 * @text 锻造所需的武器id
 * @desc 这是锻造所需的武器id的列表
 * @type number[]
 * @default ["1","2","3"]
 * 
 * @param WeaponSmithingQuantity
 * @text 锻造所需的武器数量
 * @desc 这是锻造所需的武器数量的列表，对应上部分的序号
 * @type number[]
 * @default ["1","2","3"]
 */
/*~struct~smithingArmor:
 * 
 * @param ArmorSmithingid
 * @text 锻造所需的防具id
 * @desc 这是锻造所需的防具id的列表
 * @type number[]
 * @default ["1","2","3"]
 * 
 * @param ArmorSmithingQuantity
 * @text 锻造所需的防具数量
 * @desc 这是锻造所需的防具数量的列表，对应上部分的序号
 * @type number[]
 * @default ["1","2","3"]
 */
/*~struct~smithingItem:
 * 
 * @param SmithingItemid
 * @text 锻造所需的物品id
 * @desc 这是锻造所需的物品id的列表
 * @type number[]
 * @default ["1","2","3"]
 * 
 * @param ItemSmithingQuantity
 * @text 锻造所需的物品数量
 * @desc 这是锻造所需的物品id数量的列表，对应上部分的序号
 * @type number[]
 * @default ["1","2","3"]
 */
//============================================
//============================================
　　var box = box || {}; 
    box.sing = box.sing || {}; 

box.Parameters = PluginManager.parameters('box_smithing');
box._RMSelect  = box.Parameters['RMSelect'];
box._smithing_List  = JSON.parse(box.Parameters['box smithing List']);
box._BoxSmithingList  = JSON.parse(box.Parameters['BoxSmithingList']) || 0;
box._DuLiBooleanParam  = JSON.parse(box.Parameters['DuLiBooleanParam']);
box._dulistartid  = Number(box.Parameters['dulistartid']);
box._duliweapons  = Number(box.Parameters['duliweapons']);
box._duliarmors  = Number(box.Parameters['duliarmors']);
box._duliwitems  = Number(box.Parameters['duliwitems']);
box.duzaowenben = box.Parameters['duzaowenben'];
box.duzaowenben1 = box.Parameters['duzaowenben1'];
box.duzaowenben2 = box.Parameters['duzaowenben2'];
box.duzaowenben3 = box.Parameters['duzaowenben3'];
box.duzaowenben4 = box.Parameters['duzaowenben4'];

if(box._DuLiBooleanParam){
box.sing.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function (){
      if (!box.sing.DataManager_isDatabaseLoaded.call(this))
          return false;
      if (!box._loaded_box_smithing) {
          this.setDatabaseLengths();
          box._loaded_box_smithing = true;
      }
      return true;
  };
  
  DataManager.setDatabaseLengths = function () {
      this._baseItemsLength   = $dataItems.length
      this._baseWeaponsLength = $dataWeapons.length;
      this._baseArmorsLength = $dataArmors.length;
  };

  box.sing.DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    box.sing.DataManager_createGameObjects.call(this);
    this.createIndependentObjects();
};

DataManager.createIndependentObjects = function() {
    DataManager.createIndependentGroups();
    this.loadIndependentItems();
};

DataManager.loadIndependentItems = function() {
    if (box._duliwitems > 0) {
      var difItems = $dataItems.length - DataManager._baseItemsLength;
      $dataItems.splice(DataManager._baseItemsLength, difItems);
      this.setIndependentLength($dataItems);
      $dataItems = $dataItems.concat(this._independentItems);
    }
    if (box._duliweapons > 0) {
      var difWeapons = $dataWeapons.length - DataManager._baseWeaponsLength;
      $dataWeapons.splice(DataManager._baseWeaponsLength, difWeapons);
      this.setIndependentLength($dataWeapons);
      $dataWeapons = $dataWeapons.concat(this._independentWeapons);
    }
    if (box._duliarmors > 0) {
      var difArmors = $dataArmors.length - DataManager._baseArmorsLength;
      $dataArmors.splice(DataManager._baseArmorsLength, difArmors);
      this.setIndependentLength($dataArmors);
      $dataArmors = $dataArmors.concat(this._independentArmors);
    }
};

DataManager.setIndependentLength = function(group) {
    const stratId = box._dulistartid;
	while(group.length <= stratId) {
		group.push(null);
	}
};

DataManager.saveGameWithoutRescue = function(savefileId) {
    var json = JsonEx.stringify(this.makeSaveContents());
    StorageManager.save(savefileId, json);
    this._lastAccessedId = savefileId;
    var globalInfo = this.loadGlobalInfo() || [];
    globalInfo[savefileId] = this.makeSavefileInfo();
    this.saveGlobalInfo(globalInfo);
    return true;
};

box.sing.DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = box.sing.DataManager_makeSaveContents.call(this);
    contents.items = this._independentItems;
    contents.weapons = this._independentWeapons;
    contents.armors = this._independentArmors;
    return contents;
};

box.sing.DataManager_extractSaveContents =
    DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    box.sing.DataManager_extractSaveContents.call(this, contents);
    this._independentItems = contents.items || [];
    this._independentWeapons = contents.weapons || [];
    this._independentArmors = contents.armors || [];
    this.loadIndependentItems();
};

DataManager.createIndependentGroups = function() {
    this._independentItems = [];
    this._independentWeapons = [];
    this._independentArmors = [];
};

DataManager.isIndependent = function(item) {
    if (!item) return false;
    if (DataManager.isBattleTest()) return false;
    if (item.nonIndependent) return false;
    if (DataManager.isItem(item)) return box._duliwitems > 0;
    if (DataManager.isWeapon(item)) return box._duliweapons > 0;
    if (DataManager.isArmor(item)) return box._duliarmors > 0;
    return false;
};

DataManager.registerNewItem = function(item) {
    if (!this.isNewItemValid(item)) return item;
    var newItem = JsonEx.makeDeepCopy(item);
    this.addNewIndependentItem(item, newItem);
    return newItem;
};

DataManager.isNewItemValid = function(item) {
    if (!item) return false;
    if (item.baseItemId) return false;
    return item.id === this.getDatabase(item).indexOf(item);
};

DataManager.addNewIndependentItem = function(baseItem, newItem) {
    newItem.id = this.getDatabase(baseItem).length;
    ItemManager.setNewIndependentItem(baseItem, newItem);
    this.getDatabase(baseItem).push(newItem);
    this.getContainer(baseItem).push(newItem);
};

DataManager.removeIndependentItem = function(item) {
    if (!item) return;
    if (this.independentItemIsUsed(item)) return;
    var container = this.getContainer(item);
    var database = this.getDatabase(item);
    var index = container.indexOf(item);
    container[index] = null;
    var index = database.indexOf(item);
    database[index] = null;
};

DataManager.independentItemIsUsed = function(item) {
    if ($gameParty.numItems(item) > 0) return false;
    for (var i = 0; i < $dataActors.length; ++i) {
      var actor = $gameActors.actor(i);
      if (!actor) continue;
      if (actor.equips().contains(item)) return true;
    }
    return false;
};

DataManager.getDatabase = function(item) {
    if (!item) return [];
    if (DataManager.isItem(item)) return $dataItems;
    if (DataManager.isWeapon(item)) return $dataWeapons;
    if (DataManager.isArmor(item)) return $dataArmors;
    return [];
};

DataManager.getContainer = function(item) {
    if (!item) return [];
    if (DataManager.isItem(item)) return this._independentItems;
    if (DataManager.isWeapon(item)) return this._independentWeapons;
    if (DataManager.isArmor(item)) return this._independentArmors;
    return [];
};

DataManager.getBaseItem = function(item) {
    if (!this.isIndependent(item)) return item;
    if (!item.baseItemId) return item;
    var baseItemId = item.baseItemId;
    var baseItem = this.getDatabase(item)[baseItemId];
    return baseItem;
};

function ItemManager() {
    throw new Error('This is a static class');
};

ItemManager.setNewIndependentItem = function(baseItem, newItem) {
    newItem.baseItemId = baseItem.id;
    newItem.baseItemName = baseItem.name;
    newItem.baseItemPrice = baseItem.price;
    newItem.baseItemIconIndex = baseItem.iconIndex;
    newItem.namePrefix = '';
    newItem.nameSuffix = '';
    if (baseItem.setPriorityName) {
      newItem.priorityName = baseItem.name;
    } else {
      newItem.priorityName = '';
    }
    newItem.boostCount = 0;
 newItem.note = '';
};

box.sing.Game_Party_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    if (DataManager.isIndependent(item)) {
      this.gainIndependentItem(item, amount, includeEquip);
    } else {
      box.sing.Game_Party_gainItem.call(this, item, amount, includeEquip);
    }
};

Game_Party.prototype.ItemNumber = function(item) {
    var container = this.itemContainer(item),
    ItemNumber = 0,
    ItemNumber1 = Object.getOwnPropertyNames(container).sort();
    for(var i=0;i<ItemNumber1.length;i++){
    const dataItems = $dataItems[ItemNumber1[i]]
if(dataItems.baseItemId && dataItems.baseItemId==item.id){
    ++ItemNumber;
}else if(dataItems.id==item.id){
    ++ItemNumber;
}
    }
    return ItemNumber;
};

Game_Party.prototype.gainIndependentItem = function(item, amount, includeEquip) {
    var arr = [];
    if (amount > 0) {
      for (var i = 0; i < amount; ++i) {
        var newItem = DataManager.registerNewItem(item);
        this.registerNewItem(item, newItem);
        arr.push(newItem);
      }
    } else if (amount < 0) {
      amount = Math.abs(amount);
      for (var i = 0; i < amount; ++i) {
        if (item.baseItemId) {
          this.removeIndependentItem(item, includeEquip);
        } else if (DataManager.isIndependent(item)) {
          var target = $gameParty.getMatchingBaseItem(item, includeEquip);
          if (target !== null) this.removeIndependentItem(target, includeEquip);
        } else {
          this.removeBaseItem(item, includeEquip);
        }
      }
    }
    return arr;
};

Game_Party.prototype.removeBaseItem = function(item, includeEquip) {
    var container = this.itemContainer(item);
    container[item.id]--;
    if (container[item.id] <= 0) delete container[item.id];
    if (includeEquip) this.discardMembersEquip(item, -1);
};

Game_Party.prototype.registerNewItem = function(baseItem, newItem) {
    var container = this.itemContainer(baseItem);
    if (container) {
      var lastNumber = this.numItems(newItem);
      container[newItem.id] = 1;
    }
};

Game_Party.prototype.removeIndependentItem = function(item, includeEquip) {
    if (includeEquip && this.checkItemIsEquipped(item)) {
      for (var i = 1; i < $gameActors._data.length; ++i) {
        var actor = $gameActors.actor(i);
        if (!actor) continue;
        if (!actor.equips().contains(item)) continue;
        actor.unequipItem(item);
      }
    }
    var container = this.itemContainer(item);
    container[item.id] = 0;
    if (container[item.id] <= 0) delete container[item.id];

};

Game_Party.prototype.getMatchingBaseItem = function(baseItem, equipped) {
    if (!baseItem) return null;
    if (DataManager.isItem(baseItem)) var group = this.items();
    if (DataManager.isWeapon(baseItem)) var group = this.weapons();
    if (DataManager.isArmor(baseItem)) var group = this.armors();
    if (equipped) {
      for (var a = 0; a < this.members().length; ++a) {
        var actor = this.members()[a];
        if (!actor) continue;
        if (DataManager.isWeapon(baseItem)) {
          group = group.concat(actor.weapons());
        } else if (DataManager.isArmor(baseItem)) {
          group = group.concat(actor.armors());
        }
      }
    }
    var baseItemId = baseItem.id;
    for (var i = 0; i < group.length; ++i) {
      var item = group[i];
      if (!item) continue;
      if (!item.baseItemId) continue;
      if (item.baseItemId !== baseItemId) continue;
      return item;
    }
    return null;
};

Game_Party.prototype.checkItemIsEquipped = function(item) {
    for (var i = 1; i < $gameActors._data.length; ++i) {
      var actor = $gameActors.actor(i);
      if (!actor) continue;
      if (actor.equips().contains(item)) return true;
    }
    return false;
};

box.sing.Game_Party_items = Game_Party.prototype.items;
Game_Party.prototype.items = function() {
    var results = box.sing.Game_Party_items.call(this);
    results.sort(this.independentItemSort);
    return results;
};

box.sing.Game_Party_weapons = Game_Party.prototype.weapons;
Game_Party.prototype.weapons = function() {
    var results = box.sing.Game_Party_weapons.call(this);
    results.sort(this.independentItemSort);
    return results;
};

box.sing.Game_Party_armors = Game_Party.prototype.armors;
Game_Party.prototype.armors = function() {
    var results = box.sing.Game_Party_armors.call(this);
    results.sort(this.independentItemSort);
    return results;
};

Game_Party.prototype.independentItemSort = function(a, b) {
    var aa = (a.baseItemId) ? a.baseItemId : a.id;
    var bb = (b.baseItemId) ? b.baseItemId : b.id;
    if (aa < bb) return -1;
    if (aa >= bb) return 1;
    return 0;
};

box.sing.Game_Party_maxItems = Game_Party.prototype.maxItems;
Game_Party.prototype.maxItems = function(item) {
    if (DataManager.isIndependent(item)) return 1;
    return box.sing.Game_Party_maxItems.call(this, item);
};

box.sing.Game_Party_hasItem = Game_Party.prototype.hasItem;
Game_Party.prototype.hasItem = function(item, includeEquip) {
    if (DataManager.isIndependent(item)) {
      if (this.numIndependentItems(item) > 0) return true;
    }
    return box.sing.Game_Party_hasItem.call(this, item, includeEquip);
};

Game_Party.prototype.numIndependentItems = function(baseItem) {
    var value = 0;
    if (!DataManager.isIndependent(baseItem)) return this.numItems(baseItem);
    var id = baseItem.id;
    if (DataManager.isItem(baseItem)) var group = this.items();
    if (DataManager.isWeapon(baseItem)) var group = this.weapons();
    if (DataManager.isArmor(baseItem)) var group = this.armors();
    for (var i = 0; i < group.length; ++i) {
      var item = group[i];
      if (!item) continue;
      if (item.baseItemId && item.baseItemId == id) value += 1;
    }
    return value;
};

Game_Party.prototype.clearAllMatchingBaseItems = function(baseItem, equipped) {
    if (!box._loaded_box_smithing) return;
    for (;;) {
      var item = this.getMatchingBaseItem(baseItem, equipped);
      if (item) {
        this.removeIndependentItem(item, equipped);
        DataManager.removeIndependentItem(item);
      } else {
        break;
      }
    }
  };

box.sing.Game_Interpreter_gDO = Game_Interpreter.prototype.gameDataOperand;
Game_Interpreter.prototype.gameDataOperand = function(type, param1, param2) {
  switch (type) {
  case 0:
    return $gameParty.numIndependentItems($dataItems[param1]);
    break;
  case 1:
    return $gameParty.numIndependentItems($dataWeapons[param1]);
    break;
  case 2:
    return $gameParty.numIndependentItems($dataArmors[param1]);
    break;
  default:
    return box.sing.Game_Interpreter_gDO.call(this, type, param1, param2);
    break;
  }
};

Game_Actor.prototype.unequipItem = function(item) {
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip !== item) continue;
      this.changeEquip(i, null);
    }
};
}

//======================================================================================================
//锻造功能类
//======================================================================================================

class Box_Smithing{
    static setSmithingData(){
        this.smithing_List = [];
        box._smithing_List.forEach(element => {
            this.smithing_List1 = [];
            const smithing_List2 = JSON.parse(element);
            this.smithing_List1.push(smithing_List2.ComboSmithing,smithing_List2.Smithingtoid,smithing_List2.SmithinggoldNumber,smithing_List2.SmithingWeaponS,smithing_List2.SmithingArmorS,smithing_List2.SmithingItemS,smithing_List2.SmithingBoolean,smithing_List2.youxianji);
            this.smithing_List.push(this.smithing_List1)   
        }); 
        return this.smithing_List
    }
        static setSmithingData_bug(data,data1){
        for (const key in data) {
        if(key=='WeaponSmithingQuantity'||key=='ArmorSmithingQuantity'||key=='ItemSmithingQuantity'){
            continue;
        }
        const element = JSON.parse(data[key]),
        element2 = Object.keys(data),
        element1 = JSON.parse(data[element2[1]]);
        if(SmithingOpen(element,element1,data1))  return SmithingOpen(element,element1,data1);
            }
        }
    static setSmithingData2(data,data1){
    if(!data1[0]){
        this.laofuzi = []
        this.laofuzi1 = []
        this.WQ = []
        for(var i=0;i<data.length;i++){
        for (const key in data[i]) {
            if(key=='WeaponSmithingQuantity'||key=='ArmorSmithingQuantity'||key=='ItemSmithingQuantity'){
                continue;
            }
            const element = JSON.parse(data[i][key]),
            element2 = Object.keys(data[i]),
            element1 = JSON.parse(data[i][element2[1]]);
            for(var j=0;j<element.length;j++){
                if($gameParty.ItemNumber($dataWeapons[element[j]])<Number(element1[j])){
                    return false;
                }else{
                    this.laofuzi.push(element);
                    this.laofuzi1.push(element1);
                }
            }
        }
        }
        this.WQ.push(this.laofuzi,this.laofuzi1,'wanquanTRUE');
      return this.WQ
    }else{
        for(var i=0;i<data1[1].length;i++){
            switch (Number(data1[1][i])){
                case 1:
                return true;
                case 2:
                if(this.setSmithingData_bug(data[0],data1[1][i]))    return this.setSmithingData_bug(data[0],data1[1][i]);
                case 3:
                if(this.setSmithingData_bug(data[1],data1[1][i]))    return this.setSmithingData_bug(data[0],data1[1][i]);
                case 4:
                if(this.setSmithingData_bug(data[2],data1[1][i]))    return this.setSmithingData_bug(data[0],data1[1][i]);
                }
        }
    }
    }
    static setSmithingSHURU(data,dataprice,data1){
const nameinitialize = data.name,
nameinitialize1 = data.description;
if(box.Data4) {
    const setSR = prompt(box.duzaowenben1,box.duzaowenben2);
    data.name = setSR
}
if(box.Data5) {
    const setSR1 = prompt(box.duzaowenben3,box.duzaowenben4);
    data.description = setSR1
}
$gameParty.gainItem(data, 1);
switch (data1[data1.length-1]){
case 'weapontrue':
    for(var i=0;i<data1[0].length;i++){
        $gameParty.loseItem($dataWeapons[data1[0][i]], Number(data1[1][i]));
};
break
case 'armortrue':
    for(var i=0;i<data1[0].length;i++){
        $gameParty.loseItem($dataArmors[data1[0][i]], Number(data1[1][i]));
};
break
case 'itemtrue':
    for(var i=0;i<data1[0].length;i++){
        $gameParty.loseItem($dataItems[data1[0][i]], Number(data1[1][i]));
    }
break
case 'wanquanTRUE':
    for(var i=0;i<data1[0].length;i++){
        for(var j=0;j<data1[0][i][0].length;j++){
            $gameParty.loseItem($dataWeapons[data1[0][i][0][j]], Number(data1[1][i][0][j]))
        }
        for(var j=0;j<data1[0][i][1].length;j++){
            $gameParty.loseItem($dataArmors[data1[0][i][1][j]], Number(data1[1][i][1][j]))
        }
        for(var j=0;j<data1[0][i][2].length;j++){
            $gameParty.loseItem($dataItems[data1[0][i][2][j]], Number(data1[1][i][2][j]))
        }
    }
break
default:
    $gameParty.loseGold(dataprice);
}
if(box.Data4) data.name = nameinitialize
if(box.Data5) data.description = nameinitialize1
    }
}

function SmithingOpen(data,data1,Data4) {
    const weapontrue = 'weapontrue',
   armortrue = 'armortrue',
   itemtrue = 'itemtrue';
   switch (Number(Data4)){
    case 1:
    return true;
    case 2:
            for(var j=0;j<data.length;j++){
                if($gameParty.ItemNumber($dataWeapons[data[j]])<Number(data1[j])) {
                    break;
                }else if($gameParty.ItemNumber($dataWeapons[data[j]])>= Number(data1[j])&&j==data.length-1){
                    return [data,data1,weapontrue];
                }
    }
    case 3:
        for(var j=0;j<data.length;j++){
            if($gameParty.ItemNumber($dataArmors[data[j]])<Number(data1[j])) {
                break;
            }else if($gameParty.ItemNumber($dataArmors[data[j]])>= Number(data1[j])&&j==data.length-1){
                return [data,data1,armortrue];
            }
    }
    case 4:
        for(var j=0;j<data.length;j++){
        if($gameParty.ItemNumber($dataItems[data[j]])<Number(data1[j])) {
            break;
        }else if($gameParty.ItemNumber($dataItems[data[j]])>= Number(data1[j])&& j==data.length-1){
            return [data,data1,itemtrue]
        }
    }
}
}

function Scene_SmithingOpen(SmithingDatabox,Data4) {
    box.SmithinglunchData = Box_Smithing.setSmithingData(SmithingDatabox);
    SceneManager.goto(Scene_Smithing);
switch (Data4){
    case Data4 = 1:
        box.Data4 = true
        box.Data5 = false
        break
    case Data4 = 2:
        box.Data4 = false
        box.Data5 = true
        break
    case Data4 = 3:
        box.Data4 = true
        box.Data5 = true
        break
    default:
        box.Data4 = false
        box.Data5 = false
        break
}
}   
//===================================================
//窗口类Scene_Smithing
//===================================================
function Scene_Smithing() {
    this.initialize(...arguments);
}

Scene_Smithing.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Smithing.prototype.constructor = Scene_Smithing;

Scene_Smithing.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Smithing.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createGoldWindow();
    this.createCommandWindow();
    this.createDummyWindow();
    this.createStatusWindow();
    this.createBuyWindow();
};

Scene_Smithing.prototype.createGoldWindow = function() {
    const rect = this.goldWindowRect();
    this._goldWindow = new Window_Gold(rect);
    this.addWindow(this._goldWindow);
};

Scene_Smithing.prototype.goldWindowRect = function() {
    const ww = this.mainCommandWidth();
    const wh = this.calcWindowHeight(1, true);
    const wx = Graphics.boxWidth - ww;
    const wy = this.mainAreaTop();
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Smithing.prototype.createCommandWindow = function() {
    const rect = this.commandWindowRect();
    this._commandWindow = new Window_SmithingCommand(rect);
    this._commandWindow.setPurchaseOnly(this._purchaseOnly);
    this._commandWindow.y = this.mainAreaTop();
    this._commandWindow.setHandler("BOXdz", this.commandDuanZ.bind(this));
    this._commandWindow.setHandler("cancel", this.onNumberCancel.bind(this));
    this.addWindow(this._commandWindow);
};

Scene_Smithing.prototype.commandWindowRect = function() {
    const wx = 0;
    const wy = this.mainAreaTop();
    const ww = this._goldWindow.x;
    const wh = this.calcWindowHeight(1, true);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Smithing.prototype.createDummyWindow = function() {
    const rect = this.dummyWindowRect();
    this._dummyWindow = new Window_Base(rect);
    this.addWindow(this._dummyWindow);
};

Scene_Smithing.prototype.dummyWindowRect = function() {
    const wx = 0;
    const wy = this._commandWindow.y + this._commandWindow.height;
    const ww = Graphics.boxWidth;
    const wh = this.mainAreaHeight() - this._commandWindow.height;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Smithing.prototype.createHelpWindow = function() {
    const rect = this.helpWindowRect();
    this._helpWindow = new Window_HelpSmithing(rect);
    this.addWindow(this._helpWindow);
};

Scene_Smithing.prototype.helpWindowRect = function() {
    const wx = 0;
    const wy = this.helpAreaTop();
    const ww = Graphics.boxWidth;
    const wh = this.helpAreaHeight();
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Smithing.prototype.createStatusWindow = function() {
    const rect = this.statusWindowRect();
    this._statusWindow = new Window_SmithingTJ(rect);
    this._statusWindow.refresh();
    this._statusWindow.hide();
    this.addWindow(this._statusWindow);
};

Scene_Smithing.prototype.statusWindowRect = function() {
    const ww = this.statusWidth();
    const wh = this._dummyWindow.height;
    const wx = Graphics.boxWidth - ww;
    const wy = this._dummyWindow.y;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Smithing.prototype.createBuyWindow = function() {
    const rect = this.buyWindowRect();
    this._buyWindow = new Window_SmithingBuy(rect);
    this._buyWindow.setupGoods(box.SmithinglunchData);
    this._buyWindow.setHelpWindow(this._helpWindow);
    this._buyWindow.setStatusWindow(this._statusWindow);
    this._buyWindow.hide();
    this._buyWindow.setHandler("ok", this.onBuyOk.bind(this));
    this._buyWindow.setHandler("cancel", this.onBuyCancel.bind(this));
    this.addWindow(this._buyWindow);
};

Scene_Smithing.prototype.buyWindowRect = function() {
    const wx = 0;
    const wy = this._dummyWindow.y;
    const ww = Graphics.boxWidth - this.statusWidth();
    const wh = this._dummyWindow.height;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Smithing.prototype.activateBuyWindow = function() {
    this._buyWindow.setMoney(this.money());
    this._buyWindow.show();
    this._buyWindow.activate();
    this._statusWindow.show();
};

Scene_Smithing.prototype.onBuyOk = function() {
    this._item = this._buyWindow.item();
    const buyingPrice = this.buyingPrice(),
    itemprice = this._buyWindow.itemprice(this._item),
    youxianji = this._buyWindow.youxianji(this._item);
    Box_Smithing.setSmithingSHURU(this._item,buyingPrice,Box_Smithing.setSmithingData2(itemprice,youxianji));
    this._buyWindow.activate();
    this._buyWindow.refresh();
    this._goldWindow.refresh();
};

Scene_Smithing.prototype.onBuyCancel = function() {
    this._commandWindow.activate();
    this._dummyWindow.show();
    this._buyWindow.hide();
    this._statusWindow.hide();
    this._statusWindow.setItem(null);
    this._helpWindow.clear();
};

Scene_Smithing.prototype.commandDuanZ = function() {
    box.itemPrice = this._buyWindow._itemprice;
    this._statusWindow.setStatusWindow(this._buyWindow);
    this._dummyWindow.hide();
    this.activateBuyWindow();
};

Scene_Smithing.prototype.onNumberCancel = function() {
    SoundManager.playCancel();
	this._buyWindow.hide();
    SceneManager.goto(Scene_Map);
};

Scene_Smithing.prototype.maxBuy = function() {
    const num = $gameParty.numItems(this._item);
    const max = $gameParty.maxItems(this._item) - num;
    const price = this.buyingPrice();
    if (price > 0) {
        return Math.min(max, Math.floor(this.money() / price));
    } else {
        return max;
    }
};

Scene_Smithing.prototype.money = function() {
    return this._goldWindow.value();
};

Scene_Smithing.prototype.currencyUnit = function() {
    return this._goldWindow.currencyUnit();
};

Scene_Smithing.prototype.buyingPrice = function() {
    return this._buyWindow.price(this._item);
};

Scene_Smithing.prototype.sellingPrice = function() {
    return Math.floor(this._item.price / 2);
};

Scene_Smithing.prototype.statusWidth = function() {
    return 704;
};


function Window_SmithingCommand() {
    this.initialize(...arguments);
}

Window_SmithingCommand.prototype = Object.create(Window_HorzCommand.prototype);
Window_SmithingCommand.prototype.constructor = Window_SmithingCommand;

Window_SmithingCommand.prototype.initialize = function(rect) {
    Window_HorzCommand.prototype.initialize.call(this, rect);
};

Window_SmithingCommand.prototype.setPurchaseOnly = function(purchaseOnly) {
    this._purchaseOnly = purchaseOnly;
    this.refresh();
};

Window_SmithingCommand.prototype.maxCols = function() {
    return 2;
};

Window_SmithingCommand.prototype.makeCommandList = function() {
    this.addCommand('锻造', "BOXdz");
    this.addCommand(TextManager.cancel, "cancel");
};

function Window_HelpSmithing() {
    this.initialize(...arguments);
}

Window_HelpSmithing.prototype = Object.create(Window_Base.prototype);
Window_HelpSmithing.prototype.constructor = Window_HelpSmithing;

Window_HelpSmithing.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this._text = "";
};

Window_HelpSmithing.prototype.setText = function(text) {
    if (this._text !== text) {
        this._text = text;
        this.refresh();
    }
};

Window_HelpSmithing.prototype.clear = function() {
    this.setText("");
};

Window_HelpSmithing.prototype.setItem = function(item) {
    this.setText(item ? item.description : "");
};

Window_HelpSmithing.prototype.refresh = function() {
    const rect = this.baseTextRect();
    this.contents.clear();
    this.drawTextEx(this._text, rect.x, rect.y, rect.width);
};

function Window_SmithingBuy() {
    this.initialize(...arguments);
}

Window_SmithingBuy.prototype = Object.create(Window_Selectable.prototype);
Window_SmithingBuy.prototype.constructor = Window_SmithingBuy;

Window_SmithingBuy.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._money = 0;
};

Window_SmithingBuy.prototype.setupGoods = function(shopGoods) {
    this._shopGoods = shopGoods;
    this.refresh();
    this.select(0);
};

Window_SmithingBuy.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_SmithingBuy.prototype.item = function() {
    return this.itemAt(this.index());
};

Window_SmithingBuy.prototype.itemAt = function(index) {
    return this._data && index >= 0 ? this._data[index] : null;
};

Window_SmithingBuy.prototype.setMoney = function(money) {
    this._money = money;
    this.refresh();
};

Window_SmithingBuy.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
};

Window_SmithingBuy.prototype.price = function(item) {
    return this._price[this._data.indexOf(item)] || 0;
};

Window_SmithingBuy.prototype.itemprice = function(item) {
    return this._itemprice[this._data.indexOf(item)] || 0;
};

Window_SmithingBuy.prototype.youxianji = function(item) {
    return this._youxianji[this._data.indexOf(item)] || 0;
};

Window_SmithingBuy.prototype.isEnabled = function(item) {
    return (
        item && this.price(item) <= this._money && !$gameParty.hasMaxItems(item) && Box_Smithing.setSmithingData2(this.itemprice(item),this.youxianji(item))
    );
};

Window_SmithingBuy.prototype.refresh = function(){
    this.makeItemList();
    Window_Selectable.prototype.refresh.call(this);
};

Window_SmithingBuy.prototype.makeItemList = function() {
    this._data = [];
    this._price = [];
    this._itemprice = [];
    this._youxianji = [];
    for (const goods of this._shopGoods) {
        const item = this.goodsToItem(goods);
        if (item) {
            this._itemprice1 = [];
            this._youxianji1 = [];
            this._data.push(item);
            this._price.push(Number(goods[2]));
            this._itemprice1.push(JSON.parse(goods[3]),JSON.parse(goods[4]),JSON.parse(goods[5]));
            this._youxianji1.push(JSON.parse(goods[6]),JSON.parse(goods[7]));
            this._itemprice.push(this._itemprice1);
            this._youxianji.push(this._youxianji1);
        }
    }
};


Window_SmithingBuy.prototype.goodsToItem = function(goods) {
    switch (Number(goods[0])) {
        case 1:
            return $dataWeapons[goods[1]];
        case 2:
            return $dataArmors[goods[1]];
        case 3:
            return $dataItems[goods[1]];
        default:
            return null;
    }
};

Window_SmithingBuy.prototype.drawItem = function(index) {
    const item = this.itemAt(index);
    const price = this.price(item);
    const rect = this.itemLineRect(index);
    const priceWidth = this.priceWidth();
    const priceX = rect.x + rect.width - priceWidth;
    const nameWidth = rect.width - priceWidth; 
    this.changePaintOpacity(this.isEnabled(item));
    this.drawItemName(item, rect.x, rect.y, nameWidth);
    this.drawText(price, priceX, rect.y, priceWidth, "right");
    this.changePaintOpacity(true);
};

Window_SmithingBuy.prototype.priceWidth = function() {
    return 96;
};

Window_SmithingBuy.prototype.setStatusWindow = function(statusWindow) {
    this._statusWindow = statusWindow;
    this.callUpdateHelp();
};

Window_SmithingBuy.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
    if (this._statusWindow) {
        this._statusWindow.setItem(this.item());
    }
};

function Window_SmithingTJ() {
    this.initialize(...arguments);
}

Window_SmithingTJ.prototype = Object.create(Window_StatusBase.prototype);
Window_SmithingTJ.prototype.constructor = Window_SmithingTJ;

Window_SmithingTJ.prototype.initialize = function(rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
    this._item = null;
    this._pageIndex = 0;
    this.refresh();
};

Window_SmithingTJ.prototype.refresh = function() {
    this.contents.clear();
    if (this._item) {
        const x = this.itemPadding();
        this.drawPossession(x, 0);
            const y = Math.floor(this.lineHeight() * 1.5);
            this.drawEquipInfo(x, y);
    }
};

Window_SmithingTJ.prototype.setItem = function(item) {
    this._item = item;
    this.refresh();
};

Window_SmithingTJ.prototype.isEquipItem = function() {
    return DataManager.isWeapon(this._item) || DataManager.isArmor(this._item);
};

Window_SmithingTJ.prototype.drawPossession = function(x, y) {
    const width = this.innerWidth - this.itemPadding() - x;
    const possessionWidth = this.textWidth("0000");
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.possession, x, y, width - possessionWidth);
    this.resetTextColor();
    this.drawText($gameParty.numItems(this._item), x, y, width, "right");
};

Window_SmithingTJ.prototype.drawEquipInfo = function(x, y) {
    const members = this.statusMembers();
    for (let i = 0; i < members.length; i++) {
        const actorY = y + Math.floor(this.lineHeight() * i * 2.2);
        this.drawActorEquipInfo(0, actorY);
    }
};

Window_SmithingTJ.prototype.statusMembers = function() {
    const start = this._pageIndex * this.pageSize();
    const end = start + this.pageSize();
    return $gameParty.members().slice(start, end);
};

Window_SmithingTJ.prototype.pageSize = function() {
    return 1;
};

Window_SmithingTJ.prototype.maxPages = function(){
    return 1;
};

Window_SmithingTJ.prototype.currentWeapon = function(data) {  
    return data[0];
};

Window_SmithingTJ.prototype.currentArmor = function(data) {
return data[1]
};

Window_SmithingTJ.prototype.currentItem = function(data) {
    return data[2]
};

Window_SmithingTJ.prototype.drawActorEquipInfo = function(x, y) {
    const members = this._statusWindow.itemprice(this._item)
    const members1 = this._statusWindow.youxianji(this._item)
    const item1 = this.currentWeapon(members);
    const item2 = this.currentArmor(members);
    const item3 = this.currentItem(members);
    const width = 100
    this.changePaintOpacity(true);
    this.resetTextColor();
    this.drawText(box.duzaowenben, x, y, 250);
    this.drawText(box.duzaowenben, x, y+80, 250);
    this.drawText(box.duzaowenben, x, y+160, 250);
    const item_1 = JSON.parse(item1.WeaponSmithingid);
    const _item_1 = JSON.parse(item1.WeaponSmithingQuantity);
    const item_2 = JSON.parse(item2.ArmorSmithingid);
    const _item_2 = JSON.parse(item2.ArmorSmithingQuantity);
    const item_3 = JSON.parse(item3.SmithingItemid);
    const _item_3 = JSON.parse(item3.ItemSmithingQuantity);
    for(var i=0;i<item_1.length;i++){
        this.drawItemName($dataWeapons[item_1[i]], (i*150), y + this.lineHeight(), width);
        this.drawText('X'+_item_1[i], (i*150)+width, y + this.lineHeight(), width);
    }
    for(var i=0;i<item_2.length;i++){
        this.drawItemName($dataArmors[item_2[i]], (i*150), y + this.lineHeight()+80, width);
        this.drawText('X'+_item_2[i], (i*150)+width, y + this.lineHeight()+80, width);
    }
    for(var i=0;i<item_3.length;i++){
        this.drawItemName($dataItems[item_3[i]], (i*150), y + this.lineHeight()+160, width);
        this.drawText('X'+_item_3[i], (i*150)+width, y + this.lineHeight()+160, width);
    }
    if(members1[0]) this.drawText('以下条件满足其一即可', x+300, 0, 300);
    this.changePaintOpacity(true);
};

Window_SmithingTJ.prototype.paramId = function() {
    return DataManager.isWeapon(this._item) ? 2 : 3;
};

Window_SmithingTJ.prototype.update = function() {
    Window_StatusBase.prototype.update.call(this);
    this.updatePage();
};

Window_SmithingTJ.prototype.updatePage = function() {
    if (this.isPageChangeEnabled() && this.isPageChangeRequested()) {
        this.changePage();
    }
};

Window_SmithingTJ.prototype.isPageChangeEnabled = function() {
    return this.visible && this.maxPages() >= 2;
};

Window_SmithingTJ.prototype.isPageChangeRequested = function() {
    if (Input.isTriggered("shift")) {
        return true;
    }
    if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
        return true;
    }
    return false;
};

Window_SmithingTJ.prototype.setStatusWindow = function(statusWindow) {
    this._statusWindow = statusWindow;
};

Window_SmithingTJ.prototype.changePage = function() {
    this._pageIndex = (this._pageIndex + 1) % this.maxPages();
    this.refresh();
    this.playCursorSound();
};