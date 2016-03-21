/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
//默认的表单选项
var defRate = 'day',
    defCity = '北京';
//原始数据
var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};
// 用于渲染图表的数据
var chartData = {};
/*
 * 简单的获取dom的方法
 */
function $(id, doc) {
    doc = doc || document;
    return (id.charAt(0) === '#' ? doc.getElementById(id.substr(1)) : doc.getElementsByTagName(id));
};
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
};
/*
 * 创建临时数据
 */
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    };
    return returnData;
};
/*
 * 获取随机颜色
 */
function getRandomColor() {
    return "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
}
/**
 * 渲染图表
 */
function renderChart() {
    var sb = [];
    sb.push('<div class="title">' + defCity + '</div>');
    for (var key in chartData) {
        sb.push('<div class="chart-wrap" title="日期:' + key + ', 数据:' + chartData[key] + '"><div style="height:' + chartData[key] + 'px;background:' + getRandomColor() + '"></div></div>')
    };
    $('#aqi-chart-wrap').className = defRate;
    $('#aqi-chart-wrap').innerHTML = sb.join('')
};
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(obj) {
    // 确定是否选项发生了变化 
    // 设置对应数据
    // 调用图表渲染函数
    var rate = obj.value;
    //发生变化
    if (rate != defRate) {
        defRate = rate;
        chartData = aqiSourceData[defCity];
        renderChart()
    }
};
/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化 
    // 设置对应数据
    // 调用图表渲染函数
    var city = this.value;
    //发生变化
    if (city != defCity) {
        defCity = city;
        chartData = aqiSourceData[defCity];
        renderChart()
    };
};
/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var objs = document.getElementsByName('gra-time');
    for (var i = 0; i < objs.length; i++) {
        //闭包解决i的问题
        (function(m) {
            objs[m].addEventListener('click', function() {
                graTimeChange(objs[m])
            })
        })(i)
    };
};
/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var ddlCity = $('#city-select'),
        sb = [];
    for (var city in aqiSourceData) {
        sb.push('<option value="' + city + '">' + city + '</option>')
    };
    ddlCity.innerHTML = sb.join('');
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    ddlCity.addEventListener('change', citySelectChange);
};
/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    chartData = aqiSourceData[defCity];
    renderChart()
};
/**
 * 初始化函数
 */
(function() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
})()