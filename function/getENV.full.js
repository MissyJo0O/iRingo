/**
 * Get Environment Variables
 * @author VirgilClyne
 * @param {String} name - Persistent Store Key
 * @param {String} platform - Platform Name
 * @param {Object} database - Default DataBase
 * @return {Promise<*>}
 */
async function getENV(name, platform, database) {
	$.log(`⚠ ${$.name}, Get Environment Variables`, "");
	/***************** BoxJs *****************/
	// 包装为局部变量，用完释放内存
	// BoxJs的清空操作返回假值空字符串, 逻辑或操作符会在左侧操作数为假值时返回右侧操作数。
	let BoxJs = $.getjson(name, database);
	$.log(`🚧 ${$.name}, Get Environment Variables`, `BoxJs类型: ${typeof BoxJs}`, `BoxJs内容: ${JSON.stringify(BoxJs)}`, "");
	/***************** Settings *****************/
	let Settings = BoxJs?.[platform] || BoxJs?.Settings?.[platform] || database[platform];
	$.log(`🎉 ${$.name}, Get Environment Variables`, `Settings: ${typeof Settings}`, `Settings内容: ${JSON.stringify(Settings)}`, "");
	/***************** Argument *****************/
	if (typeof $argument != "undefined") {
		$.log(`🎉 ${$.name}, $Argument`);
		$argument = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
		$.log(JSON.stringify($argument));
		let arg = {};
		for (var key in $argument) setPath(arg, key, arg[key]);
		$.log(JSON.stringify(arg));
		Object.assign(Settings, arg);
		function setPath(object, path, value) {path.split(".").reduce((o, p, i) => o[p] = path.split(".").length === ++i ? value : o[p] || {}, object)}
	};
	$.log(`🎉 ${$.name}, Get Environment Variables`, `Settings: ${typeof Settings}`, `Settings内容: ${JSON.stringify(Settings)}`, "");
	return Settings
};


let $argument = "Switch=true&NextHour.Switch=true&AQI.Switch=true&AQI.Mode=WAQI Public&AQI.Location=Station&AQI.Auth=null&AQI.Scale=EPA_NowCast.2201&Map.AQI=true"
let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
console.log(JSON.stringify(arg));
let newArg = {};
for (var key in arg) setPath(newArg, key, arg[key]);
console.log(JSON.stringify(newArg));
function setPath(object, path, value) {path.split(".").reduce((o, p, i) => o[p] = path.split(".").length === ++i ? value : o[p] || {}, object)}
$done()
