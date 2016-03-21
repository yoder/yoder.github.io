/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
/*
 * getElementById简写
 */
function $(id, doc) {
	doc = doc || document;
	return (id.charAt(0) === '#' ? doc.getElementById(id.substr(1)) : doc.getElementsByTagName(id));
};
/*
 * getElementsByTagName简写
 */
function $$(name, doc) {
	return (doc || document).getElementsByTagName(name)
};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = $('#aqi-city-input').value.trim();
	var value = $('#aqi-value-input').value.trim();
	if (!/^[\u4e00-\u9fa5a-zA-Z]+$/.test(city)) {
		alert('请输入正确的城市名称!');
		$('#aqi-city-input').focus();
		return
	};
	if (!/^[1-9]*$/.test(value)) {
		alert('请输入正整数!');
		$('#aqi-value-input').focus();
		return
	};
	aqiData[city] = value
};
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var sb = [];
	if (!isEmptyJson(aqiData)) {
		sb.push('<tr>');
		sb.push('	<th>城市</th>');
		sb.push('	<th>空气质量</th>');
		sb.push('	<th style="width:60px;text-align:center">操作</th>');
		sb.push('</tr>');
		for (var data in aqiData) {
			sb.push('<tr>');
			sb.push('	<td>' + data + '</td>');
			sb.push('	<td>' + aqiData[data] + '</td>');
			sb.push('	<td style="text-align:center"><button type="button" onclick="delBtnHandle(\'' + data + '\')">删除</button></td>');
			sb.push('</tr>');
		};
	};
	$('#aqi-table').innerHTML = sb.join('')
};
/*
* 判断是否为空的json
 */
function isEmptyJson(json){
	var obj;
	for(obj in json){
		return false
	};
	return true
};
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	addAqiData();
	renderAqiList();
};
/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
	delete aqiData[city];
	renderAqiList();
};
/*
 * 例子代码有坑。。。
 * 不放到window.onload里面你就被坑了
 * html里面的table的闭合竟然用</ul>
 * 这个出题目的也太不认真了
 */
window.onload = function() {
	//监听click事件
	$('#btnSubmit').addEventListener('click', addBtnHandle);
	// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
};
/*
 * 原形扩展的方式去除字符串两头空格及中间空白
 */
String.prototype.trim = function() {
	return this.replace(/[(^\s+)(\s+$)]/g, "")
};