//获取时间

function mytime() {
    var today = new Date(),
        year = today.getFullYear(),
        month = today.getMonth() + 1,
        day = today.getDate(),
        hours = today.getHours(),
        minutes = today.getMinutes(),
        seconds = today.getSeconds();
    if (month < 10) {
        month = "0" + month;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var now = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds,
        time = document.getElementById("time");
    time.innerHTML = now;

}
setInterval(function () { mytime() }, 1000);
function ajaxByJson(type, url, json_data, func) {//data数据可以为空  
    $.ajax({
        type: type,
        url: url,
        dataType: "json",
        data: json_data,
        error: function (data) {
            //请求失败时被调用的函数   
            // alert("传输失败:" + data);
            console.log("网络出错");
        },
        success: function (data) {
            func(data);
        }
    });
}
//数据处理
function jsonDeal(data) {
    var xAxis = [];
    var yAxis = [];
    for (var i = 0; i < data.length; i++) {
        xAxis[i] = data[i].consultationMonth
        yAxis[i] = data[i].consultationNumber
    }
    return { "x": xAxis, "y": yAxis }
}
ajaxByJson("get", testIP + "/cloudform-statistics/workStatistics/getAllBasicData/v1.0", "", show);
function show(data) {
    console.log(data);
    //左上角第一块数据 
    disposeData(data);
    //会诊量趋势
    if (data.consultationTrend == null || data.consultationTrend.length == 0) {
        noData("TrendOfCol");
    } else {
        consultationTrend(data.consultationTrend)
    }
    //检查部位，检查占比数据统计   

    if (data.studyBodyAndPersent == null || data.studyBodyAndPersent.length == 0) {
        noData("checkPoint");
    } else {
        proportion(data.studyBodyAndPersent)
    }
    //医生职称分布  
    if (data.doctorTitleDistribution == null || data.doctorTitleDistribution.length == 0) {
        noData("doctorTitle");
    } else {
        doctorTitle(data.doctorTitleDistribution);
    }
    //医生出诊量排名  
        outNumber(data.doctorConsultationRanking); 
    //医生会诊不符合率排名   
        noNumber(data.doctorAccordRanking); 
    //医院上传检查数量排名数据统计  
        loadStudy(data.hospitalAndUploadStudyNumber); 
    //签约医生数量趋势  
    if (data.signDoctorTrend == null || data.signDoctorTrend.length == 0) {
        noData("contract");
    } else {
        doctorNumber(data.signDoctorTrend);
    }
    //检查量占比
    if (data.studyeQuipmentAndPositivePersent == null || data.studyeQuipmentAndPositivePersent.length == 0) {
        noData("amount");
    } else {
        amountPre(data.studyeQuipmentAndPositivePersent)
    }
    //检查设备阳性率占比   
    if (data.studyTypeAndPersent == null || data.studyTypeAndPersent.length == 0) {
        noData("positive");
    } else {
        positivePersent(data.studyTypeAndPersent)
    }
    //按地区医生数量分布   
    doctorNumberArea(data.doctorAreaDistribution)
}

//无数据
function noData(element) {
    var ele = document.getElementById(element);
    ele.innerHTML = `
        <div class="bg-none"> 
            </div>`;
    console.log(ele);
}
//左上角第一块数据 
function disposeData(data) {
    $('#NumConsultation').html(data.joinNumber + "个");           //区域会诊中心
    $('#NumOfQuality').html(data.allQualityControlNumber + "个"); //当年累计质控量
    $('#NumUse').html(data.allStorageNumber + "GB");              //累计存储使用量
    $('#NumExam').html(data.allStudyNumber + "例");               //当年累计上传检查量
    $('#NumQuality').html(data.areaQualityControlCenter + "个");  //区域质控中心
    $('#NumOfCon').html(data.consultationNumber + "例");          //当年累计会诊数量
    $('#NumDoctor').html(data.doctorNumber + "名");               //医生数量
    $('#NumConsult').html(data.filmBuildNumber + "个");           //云胶片发放数量
    $('#NumGrant').html(data.filmOpenNumber + "次");              //云胶片调阅数量
    $('#NumOrg').html(data.joinNumber + "个");                    //接入机构数
}

//会诊量趋势数据统计  
function consultationTrend(data) {
    var xAxis = [];
    var yAxis = [];
    for (var i = 0; i < data.length; i++) {
        xAxis[i] = data[i].date;
        yAxis[i] = data[i].consultationNumber
            ;
        console.log(data[i].updatedTime, data[i].consultationNumber
        );
    }
    var TrendOfCol = echarts.init(document.getElementById('TrendOfCol'));
    TrendOfColOpt = {
        grid: {
            top: '20%',
            left: "15%",
            bottom: '20%'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: '#13ecff'
                }
            },
            data: xAxis
        },
        yAxis: {
            type: 'value',
            name: '会诊量（例）',
            gridIndes: 0,
            nameTextStyle: {
                color: '#13ecff'
            },
            axisLine: {
                lineStyle: {
                    color: '#13ecff'
                }
            },
            splitLine: {
                lineStyle: {
                    color: ['rgba(19,236,255,0.1)']
                }
            }
        },
        series: [{
            data: yAxis,
            type: 'line',
            itemStyle: {
                color: '#f5d753'
            },
            lineStyle: {
                color: '#13ecff',
                width: 1
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 1,
                    x2: 0,
                    y2: 0,
                    colorStops: [{
                        offset: 1, color: 'rgba(19, 236, 255, 0.5)'
                    }, {
                        offset: 0, color: 'rgba(128, 128, 128, 0)'
                    }],
                    globalCoord: false // 缺省为 false
                }
            }
        }],
        color: '#13ecff'
    };
    TrendOfCol.setOption(TrendOfColOpt);
}

//检查部位，检查占比数据统计  
function proportion(data) {
    var xAxis = [];
    var yAxis = [];
    for (var i = 0; i < data.length; i++) {
        xAxis[i] = data[i].type;
        yAxis[i] = {};
        yAxis[i].name = data[i].type;
        yAxis[i].value = data[i].number;
    }  
    var x=[],y=[]; 
    x=xAxis[1];
    xAxis[1]=xAxis[3];
    xAxis[3]=x;
    y=yAxis[1];
    yAxis[1]=yAxis[3];
    yAxis[3]=y;
    var checkPoint = echarts.init(document.getElementById('checkPoint'));
    checkPointOpt = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            right: 0,
            top: '10%',
            data: xAxis,
            // ["平扫",'增强',"常规","其他"],
            textStyle: {
                color: '#13ecff'
            }
        },
        color: ['#E8704E', '#A374DC', '#F8D555', '#26B6EB', '#51F159', '#5D82EA', '#1D9C2B'],
        series: [
            {
                name: ' ',
                type: 'pie',
                radius: ['50%', '75%'],
                center: ['35%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    position: 'outside',
                    formatter: '{d}%',
                    color: '#13ecff'
                },
                labelLine: {  
                    length:15,
                    length2:10,
                    lineStyle: {
                        color: '#13ecff'
                    }
                },
                data: yAxis
            }
        ]
    };
    checkPoint.setOption(checkPointOpt);

}

//医生职称分布  
function doctorTitle(data) {
    var yAxis = [];
    for (var i = 0; i < data.length; i++) {
        yAxis[i] = {};
        yAxis[i].name = data[i].doctorTitle;
        yAxis[i].value = data[i].doctorNumber;
    }
    var myChart = echarts.init(document.getElementById('doctorTitle'));
    option = {
        color: ['#E8704E', '#A374DC', '#F8D555', '#26B6EB', '#51F159', '#5D82EA', '#1D9C2B'],
        title: {
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/ >{b} : {c} ({d}%)"
        },
        toolbox: {
            show: true
        },
        calculable: true,
        series: [
            {
                name: '人数',
                type: 'pie',
                label: {
                    color: '#13ecff',
                    formatter: '{b} {c}人'
                },
                labelLine: {
                    lineStyle: {
                        color: '#13ecff'
                    }
                },
                radius: ['30%', '85%'],
                center: ['50%', '50%'],
                roseType: 'area',
                data: yAxis
                // [
                //     {value:21, name:'主治医生',
                //     itemStyle:{
                //         color:'yellow'
                //     }
                // },
                //     {value:35, name:'副主任医师' 
                // },
                //     {value:25, name:'主任医师'},
                //     {value:36, name:'医士'},
                //     {value:15, name:'医师'} 
                // ]
            }
        ]
    };
    myChart.setOption(option);
}

//医生出诊量排名 
function outNumber(data) {
    var html = "";
    if (data == null || data.length == 0) {
        html = `
        <div class="bg-none"> 
            </div>`;
        $("#outNumber").parent(".doct-item").append(html);
    } else {
        for (var i = 0; i < data.length; i++) {
            html += `<dt>${data[i].consultationDoctor}</dt> <dd>${data[i].consultationNumber} 例</dd>`;
        }
        $("#outNumber").append(html);
    }
}
//医生会诊不符合率排名 
function noNumber(data) {
    console.log(data);
    var html = "";
    if (data == null || data.length == 0) {
        html = `
        <div class="bg-none"> 
            </div>`;
        $("#noNumber").parent(".doct-item").append(html);
    } else {
        for (var i = 0; i < data.length; i++) {
            html += `<dt>${data[i].consultationDoctor}</dt> <dd>${data[i].consultationNumber}%</dd>`;
        }
        $("#noNumber").append(html);
    }
}
//医院上传检查数量排名数据统计  
function loadStudy(data) {
    var html = "";
    if (data == null || data.length == 0) {
        html = `
        <div class="bg-none"> 
            </div>`;
        $("#loadStudy").parent(".doct-item").append(html);
    } else {
        for (var i = 0; i < data.length; i++) {
            html += `<li> <span>${data[i].name}</span> <span></span> <span>${data[i].totalCount} 例</span></li>`;
        }
        $("#loadStudy").append(html);
    }
}

//签约医生数量趋势  
function doctorNumber(data) {
    console.log(data);
    var xAxis = [];
    var yAxis = [];
    for (var i = 0; i < data.length; i++) {
        xAxis[i] = data[i].date
        yAxis[i] = data[i].doctorNumber
    }
    var contract = echarts.init(document.getElementById('contract'));
    contractOpt = {
        grid: {
            top: '20%',
            left: "15%",
            bottom: '20%'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: '#13ecff'
                }
            },
            data: xAxis
            // ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月']
        },
        yAxis: {
            type: 'value',
            name: '单位（人）',
            gridIndes: 0,
            nameTextStyle: {
                color: '#13ecff'
            },
            axisLine: {
                lineStyle: {
                    color: '#13ecff'
                }
            },
            splitLine: {
                lineStyle: {
                    color: ['rgba(19,236,255,0.1)']
                }
            }
        },
        series: [{
            data: yAxis,
            // [35,70, 82, 55, 60, 80, 85, 52,41],
            type: 'line',
            lineStyle: {
                color: '#13ecff',
                width: 1
            },
            itemStyle: {
                color: '#f5d753'
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 1,
                    x2: 0,
                    y2: 0,
                    colorStops: [{
                        offset: 1, color: 'rgba(19, 236, 255, 0.5)'
                    }, {
                        offset: 0, color: 'rgba(128, 128, 128, 0)'
                    }],
                    globalCoord: false // 缺省为 false
                }
            }
        }],
        color: '#13ecff'
    };
    contract.setOption(contractOpt);
}
//检查量占比 
function amountPre(data) {
    console.log(data);
    var xAxis = [];
    var yAxis = [];
    for (var i = 0; i < data.length; i++) {
        xAxis[i] = data[i].type;
        yAxis[i] = {};
        yAxis[i].name = data[i].type;
        yAxis[i].value = data[i].number;
    }
    var amount = echarts.init(document.getElementById('amount'));
    amountOpt = {
        title: {
            text: "检查量占比",
            textStyle: {
                color: '#13ecff',
                align: "center",
                fontSize: 14
            },
            left: "30%",
            top: "40%"
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            right: "0",
            top: '0%',
            data: xAxis,
            textStyle: {
                color: '#13ecff'
            }
        },
        series: [{
            name: ' ',
            type: 'pie',
            radius: ['60%', '80%'],
            center: ['45%', '50%'],
            avoidLabelOverlap: false,
            label: {
                position: 'outside',
                formatter: '{d}%',
                color: '#13ecff'
            },
            labelLine: {  
                length:10,
                length2:10,
                lineStyle: {
                    color: '#13ecff'
                }
            },
            data: yAxis
        }

        ]
    };

    amount.setOption(amountOpt);
}
//检查设备阳性率占比 
function positivePersent(data) {
    var xAxis = [];
    var yAxis = [];
    for (var i = 0; i < data.length; i++) {
        xAxis[i] = data[i].type;
        yAxis[i] = {};
        yAxis[i].name = data[i].type;
        yAxis[i].value = data[i].number;
    }
    var positive = echarts.init(document.getElementById('positive'));
    positiveOpt = {

        title: {
            text: "检查设备占比",
            textStyle: {
                color: '#13ecff',
                align: "center",
                fontSize: 14
            },
            left: "28%",
            top: "40%"
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            right: "0",
            top: '0%',
            data: xAxis,
            // ['CT 50%','MR 68%','DR 80%'],
            textStyle: {
                color: '#13ecff'
            }
        },
        series: [{
            name: ' ',
            type: 'pie',
            radius: ['60%', '80%'],
            center: ['45%', '50%'],
            avoidLabelOverlap: false,
            label: {
                position: 'outside',
                formatter: '{d}%',
                color: '#13ecff'
            },
            labelLine: {  
                length:10,
                length2:10,
                lineStyle: {
                    color: '#13ecff'
                }
            },
            data: yAxis
        }

        ]
    };

    positive.setOption(positiveOpt);
}

//按地区医生数量分布 
function doctorNumberArea(data) {
    var html = "";
    for (var i = 0; i < data.length; i++) {
        html += `<li>
       <img src="img/region${i + 1}.png"/>
       <span>${data[i].area}</span>
       <span class="doct-num" id="baoAn">${data[i].doctorNumber}人</span>
   </li>`;
    }
    $("#doctorNumberArea").append(html);
}
