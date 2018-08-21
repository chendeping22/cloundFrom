// var testIP = "http://123.207.247.110:8000"; //外网测试
// var  testIP="http://192.168.121.150:4040";      //内网测试
var testIP = 'http://122.13.2.38:8005'; //联通云 
var token = window.location.search.substr(1).split("=")[1];
var insideIP = ""; //内网
var outIP = ""; //外网
var IP = 'http://183.240.147.144:8888/cloudform-statistics';
// var IP = 'http://192.168.131.11:4040';  //羊城
// var IP = 'http://192.168.0.165:8888';
var json = {};
var ok = 0;
var api = {

    //接入机构
    getJoinNumber: '/numberData/getJoinNumber/v2.0',
    // 接入医生
    getDoctorNumber: '/numberData/getDoctorNumber/v2.0',
    //会诊量
    getConsultNumber: '/numberData/getConsultNumber/v2.0',
    //检查量
    getStudyNumber: '/numberData/getStudyNumber/v2.0',
    //医生职称分布
    getDoctorTitleSpread: '/chartData/getDoctorTitleSpread/v2.0',
    //签约医生数量趋势
    getDoctorNumberAndDate: '/chartData/getDoctorNumberAndDate/v2.0',
    //会诊量趋势
    getConsultationNumberAndDate: '/chartData/getConsultationNumberAndDate/v2.0',
    //医生初诊量排名
    getConsultationDoctorAndNumber: '/chartData/getConsultationDoctorAndNumber/v2.0',
    //设备检查量占比
    getStudyTypeAndPersent: '/chartData/getStudyTypeAndPersent/v2.0',
    //设备阳性率占比
    getStudyePositiveAndPersent: '/chartData/getStudyePositiveAndPersent/v2.0',
    //部位检查量比
    getStudyBodyAndPersent: '/chartData/getStudyBodyAndPersent/v2.0',
    //基础医院上传检查数量排名
    getHospitalUploadRank: '/chartData/getHospitalUploadRank/v2.0',
    //按地区医生数量分布
    getDoctorNumberAndArea: '/chartData/getDoctorNumberAndArea/v2.0',
    //存储量
    getStorageNumber: '/numberData/getStorageNumber/v2.0'
}

function ajaxByJson(url, dataList) { //data数据可以为空  
    $.ajax({
        type: 'GET',
        url: url,
        dataType: "json",
        error: function(data) {
            //请求失败时被调用的函数   
            // alert("传输失败:" + data);
            console.log("网络出错");
            ok++;
            if (ok == 14) {
                show(json)
            }
        },
        success: function(data) {
            // console.log(data);
            if (data.code == "401") {
                alert("登陆超时，返回重新登陆");
                window.close()
            }
            json[dataList] = data.data;
            ok++;
            if (ok == 14) {
                show(json)
            }
        }
    });
}
for (var key in api) {
    // console.log(key);
    api[key] = IP + api[key];
    ajaxByJson(api[key], key)
}
console.log(json);