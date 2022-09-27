/*:
 *  @author 盒师傅
 * @plugindesc 兑换码
 * @target MZ MV
 * @help
 * 使用box_redemption();脚本即可输入兑换码
 * 
 * @param box redemption List
 * @parent Advanced Types
 * @text 结构列表
 * @type struct<TestStruct>[]
 * @default ["随便打"]
 * */
/*~struct~TestStruct:
 * @param redemptionText
 * @text 兑换码
 * @type string
 * 
 * @param redemptionNote
 * @text 备注
 * @type note
 * 
 * @param goldNumber
 * @text 获取的金币数量
 * @type number
 * 
 * @param ItemNumberid
 * @text 获取的物品id
 * @desc 这是获取物品id的列表
 * @type number[]
 * @default ["1","2","3"]
 * 
 * @param ItemNumberquantity
 * @text 获取物品数量
 * @desc 这是获取物品id数量的列表，对应上部分的序号
 * @type number[]
 * @default ["1","2","3"]
 * 
 * @param WeaponNumberid
 * @text 获取武器id
 * @desc 这是获取武器id的列表
 * @type number[]
 * @default ["1","2","3"]
 * 
 * @param WeaponNumberquantity
 * @text 获取武器数量
 * @desc 这是获取武器id数量的列表，对应上部分的序号
 * @type number[]
 * @default ["1","2","3"]
 * 
 * @param ArmorNumberid
 * @text 获取护甲id
 * @desc 这是获取护甲id的列表
 * @type number[]
 * @default ["1","2","3"]
 * 
 * @param ArmorNumberquantity
 * @text 获取护甲数量
 * @desc 这是获取护甲id数量的列表，对应上部分的序号
 * @type number[]
 * @default ["1","2","3"]
 * 
 * @param EventNumberid
 * @text 获取公共事件id
 * @desc 这是获取公共事件id的列表
 * @type number[]
 * @default ["1","2","3"]
 * 
 * @param Switchredemption
 * @text 开关参数
 * @desc 兑换码完成打开的开关
 * @type switch
 * @default 1
 */
//============================================
//============================================

　var Imported = Imported || {};
　　Imported.box_redemption = true;
　　var box = box || {}; 

box.Parameters = PluginManager.parameters('box_redemption');
box.redemption_List = JSON.parse(box.Parameters['box redemption List']);


function box_redemption(){
    var redemption = prompt('请输入兑换码','请输入兑换码');
for(i=0;i<box.redemption_List.length;i++){
    var box_redemption = JSON.parse(box.redemption_List[i]);
    if(redemption !== box_redemption.redemptionText) continue;
    if($gameSwitches.value(Number(box_redemption.Switchredemption))) continue;
if(box_redemption.goldNumber)   $gameParty.gainGold(Number(box_redemption.goldNumber));
if(box_redemption.ItemNumberid){
    var box_redemption1 = JSON.parse(box_redemption.ItemNumberid);
    var box_redemption2 = JSON.parse(box_redemption.ItemNumberquantity);
    for(i=0;i<box_redemption1.length;i++){
    $gameParty.gainItem($dataItems[Number(box_redemption1[i])], Number(box_redemption2[i]));
    }
}
if(box_redemption.WeaponNumberid){
    var box_redemption1 = JSON.parse(box_redemption.WeaponNumberid);
    var box_redemption2 = JSON.parse(box_redemption.WeaponNumberquantity);
    for(i=0;i<box_redemption1.length;i++){
    $gameParty.gainItem($dataWeapons[Number(box_redemption1[i])], Number(box_redemption2[i]));
    }
}
if(box_redemption.ArmorNumberid){
    var box_redemption1 = JSON.parse(box_redemption.ArmorNumberid);
    var box_redemption2 = JSON.parse(box_redemption.ArmorNumberquantity);
    for(i=0;i<box_redemption1.length;i++){
    $gameParty.gainItem($dataArmors[Number(box_redemption1[i])], Number(box_redemption2[i]));
    }
}
if(box_redemption.EventNumberid){
    var box_redemption1 = JSON.parse(box_redemption.EventNumberid);
    for(i=0;i<box_redemption1.length;i++){
        $gameTemp.reserveCommonEvent(Number(box_redemption1[i]));
    }
}
$gameSwitches.setValue(Number(box_redemption.Switchredemption),true);
}
}