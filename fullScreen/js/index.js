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
setInterval(function() { mytime() }, 1000);


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
// ajaxByJson("get", testIP + "/cloudform-statistics/workStatistics/getAllBasicData/v1.0?token=" + token, "", show);

function show(data) {
    //左上角第一块数据 
    disposeData(data);
    //会诊量趋势
    //写死
    // data.consultationTrend = null;
    // data.signDoctorTrend = null;
    if (data.getConsultationNumberAndDate == null || data.getConsultationNumberAndDate.length == 0) {
        noData("TrendOfCol");
    } else {
        consultationTrend(data.getConsultationNumberAndDate)
    }
    //部位检查量占比  

    if (data.getStudyBodyAndPersent == null || data.getStudyBodyAndPersent.length == 0) {
        noData("checkPoint");
    } else {
        proportion(data.getStudyBodyAndPersent)
    }
    //医生职称分布  
    if (data.getDoctorTitleSpread == null || data.getDoctorTitleSpread.length == 0) {
        noData("doctorTitle");
    } else {
        doctorTitle(data.getDoctorTitleSpread);
    }
    //医生出诊量排名  
    outNumber(data.getConsultationDoctorAndNumber);
    //医生会诊不符合率排名   
    // noNumber(data.doctorAccordRanking);
    //医院上传检查数量排名数据统计  
    loadStudy(data.getHospitalUploadRank);
    //签约医生数量趋势  
    if (data.getDoctorNumberAndDate == null || data.getDoctorNumberAndDate.length == 0) {
        noData("contract");
    } else {
        doctorNumber(data.getDoctorNumberAndDate);
    }
    //检查量占比
    if (data.getStudyTypeAndPersent == null || data.getStudyTypeAndPersent.length == 0) {
        noData("amount");
    } else {
        amountPre(data.getStudyTypeAndPersent)
    }
    //检查设备阳性率占比   
    if (data.getStudyePositiveAndPersent == null || data.getStudyePositiveAndPersent.length == 0) {
        noData("positive");
    } else {
        positivePersent(data.getStudyePositiveAndPersent)
    }
    //按地区医生数量分布   
    doctorNumberArea(data.getDoctorNumberAndArea)
}

//无数据
function noData(element) {
    var ele = document.getElementById(element);
    ele.innerHTML = `
        <div class="bg-none"> 
            </div>`;
    console.log(ele);
}
// disposeData(json)
//左上角第一块数据 
function disposeData(data) {
    console.log(data.getStudyNumber);
    //写死数据
    // $('#NumConsultation').html(0 + "个"); //区域会诊中心
    // $('#NumQuality').html(5 + "个"); //区域质控中心
    $('#NumOrg').html(5 + "个"); //接入机构数
    $('#NumExam').html(data.getStudyNumber + "例"); //当年累计上传检查量
    $('#NumOfCon').html(83 + "例"); //会诊量
    $('#NumDoctor').html(3187 + "名"); //医生数量
    $('#NumUse').html(data.getStorageNumber + "GB"); //累计存储使用量
    // $('#NumOrg').html(data.getJoinNumber + "个"); //接入机构数
    // $('#NumExam').html(data.getStudyNumber + "例"); //当年累计上传检查量
    // $('#NumOfCon').html(data.getConsultNumber + "例"); //会诊量
    // $('#NumDoctor').html(data.getDoctorNumber + "名"); //医生数量
    // $('#NumUse').html(data.getStorageNumber + "GB"); //累计存储使用量

    // $('#NumConsultation').html(data.joinNumber + "个"); //区域会诊中心
    // $('#NumQuality').html(data.areaQualityControlCenter + "个"); //区域质控中心
    // $('#NumOrg').html(json.getJoinNumber + "个"); //接入机构数
    // $('#NumExam').html(data.allStudyNumber + "例"); //当年累计上传检查量
    // $('#NumOfQuality').html(data.allQualityControlNumber + "个"); //当年累计质控量
    // $('#NumConsult').html(data.filmBuildNumber + "个"); //云胶片发放数量
    // $('#NumGrant').html(data.filmOpenNumber + "次"); //云胶片调阅数量
}

//会诊量趋势数据统计  
function consultationTrend(data) {
    //写死
    data = [
        { date: '201804', consultationNumber: 11 },
        { date: '201805', consultationNumber: 17 },
        { date: '201806', consultationNumber: 16 },
        { date: '201807', consultationNumber: 19 },
        { date: '201808', consultationNumber: 20 }
    ]
    var xAxis = [];
    var yAxis = [];
    for (var i = 0; i < data.length; i++) {
        xAxis[i] = data[i].date;
        yAxis[i] = data[i].consultationNumber;
        console.log(data[i].updatedTime, data[i].consultationNumber);
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
                        offset: 1,
                        color: 'rgba(19, 236, 255, 0.5)'
                    }, {
                        offset: 0,
                        color: 'rgba(128, 128, 128, 0)'
                    }],
                    globalCoord: false // 缺省为 false
                }
            }
        }],
        color: '#13ecff'
    };
    TrendOfCol.setOption(TrendOfColOpt);
}

//检查部位占比数据统计 
function proportion(data) {
    let xAxis = [];
    let yAxis = [];
    for (var i = 0; i < data.length; i++) {
        xAxis[i] = data[i].body;
        yAxis[i] = {};
        yAxis[i].name = data[i].body;
        yAxis[i].value = data[i].number;
    }
    let checkPoint = echarts.init(
        document.getElementById("checkPoint")
    );
    console.log(xAxis);
    xAxis = ['胸', '头', '脊椎', '腹', '四肢', '上肢', '脸', '血管', '动脉', '尿', '生殖', '颈', '静脉', '神经']
    let checkPointOpt = {
        tooltip: {
            show: true,
            trigger: "item",
            formatter: "{b}:{c}"
        },
        xAxis: {
            type: "category",
            axisLine: {
                lineStyle: {
                    color: '#13ecff'
                }
            },
            axisLabel: {
                color: '#13ecff',
                margin: 10,
                showMinLabel: true,
                align: 'center',
                interval: 0,
                fontSize: 12,
                rotate: 0
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#13ecff'
                }
            },
            data: xAxis
        },
        yAxis: {
            type: "value",
            name: "(例)",
            nameGap: 30,
            gridIndes: 0,
            nameTextStyle: {
                color: '#13ecff'
            },
            axisLine: {
                lineStyle: {
                    color: '#13ecff'
                }
            },
            axisLabel: {
                color: '#13ecff'
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#13ecff'
                }
            }
        },
        series: [{
                // For shadow
                type: "bar",
                itemStyle: {
                    normal: {
                        color: "rgba(0,0,0,0.05)"
                    }
                },
                barGap: "-100%",
                barCategoryGap: "40%",
                animation: false
            },
            {
                type: "bar",
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: "#83bff6"
                            },
                            {
                                offset: 0.5,
                                color: "#188df0"
                            },
                            {
                                offset: 1,
                                color: "#188df0"
                            }
                        ])
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: "#2378f7"
                            },
                            {
                                offset: 0.7,
                                color: "#2378f7"
                            },
                            {
                                offset: 1,
                                color: "#83bff6"
                            }
                        ])
                    }
                },
                data: yAxis
            }
        ]
    };
    checkPoint.setOption(checkPointOpt);
}
// function proportion(data) {
//     console.log(data);
//     var xAxis = [];
//     var yAxis = [];
//     for (var i = 0; i < data.length; i++) {
//         xAxis[i] = data[i].body;
//         yAxis[i] = {};
//         yAxis[i].name = data[i].body;
//         yAxis[i].value = data[i].number;
//     }
//     var x = [],
//         y = [];
//     x = xAxis[1];
//     xAxis[1] = xAxis[3];
//     xAxis[3] = x;
//     y = yAxis[1];
//     yAxis[1] = yAxis[3];
//     yAxis[3] = y;
//     var checkPoint = echarts.init(document.getElementById('checkPoint'));
//     checkPointOpt = {
//         tooltip: {
//             trigger: 'item',
//             formatter: "{a} <br/>{b}: {c} ({d}%)"
//         },
//         legend: {
//             orient: 'vertical',
//             right: 0,
//             top: '10%',
//             data: xAxis,
//             // ["平扫",'增强',"常规","其他"],
//             textStyle: {
//                 color: '#13ecff'
//             }
//         },
//         // color: ['#E8704E', '#A374DC', '#F8D555', '#26B6EB', '#51F159', '#5D82EA', '#1D9C2B'],
//         series: [{
//             name: ' ',
//             type: 'pie',
//             radius: ['50%', '75%'],
//             center: ['35%', '50%'],
//             avoidLabelOverlap: false,
//             label: {
//                 position: 'outside',
//                 formatter: '{d}%',
//                 color: '#13ecff'
//             },
//             labelLine: {
//                 length: 15,
//                 length2: 10,
//                 lineStyle: {
//                     color: '#13ecff'
//                 }
//             },
//             data: yAxis
//         }]
//     };
//     checkPoint.setOption(checkPointOpt);

// }

//医生职称分布  
function doctorTitle(data) {
    console.log(data);
    data = [
        { doctorTitle: '主治医师', doctorNumber: 972 },
        { doctorTitle: '主任医师', doctorNumber: 364 },
        { doctorTitle: '副主任医师', doctorNumber: 489 },
        { doctorTitle: '医师', doctorNumber: 1362 }
    ]
    var yAxis = [];
    for (var i = 0; i < data.length; i++) {
        yAxis[i] = {};
        yAxis[i].name = data[i].doctorTitle;
        yAxis[i].value = data[i].doctorNumber;
    }
    console.log(yAxis)
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
        series: [{
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
        }]
    };
    myChart.setOption(option);
}

//医生出诊量排名 
function outNumber(data) {
    //写死
    // data = null;
    console.log(data);
    data = [
        { consultationDoctor: '兰建清', consultationNumber: 22 },
        { consultationDoctor: '范凯瑞', consultationNumber: 18 },
        { consultationDoctor: '李正豪', consultationNumber: 13 },
        { consultationDoctor: '羊城', consultationNumber: 8 },
        { consultationDoctor: '陈浩宇', consultationNumber: 4 }
    ]
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
// function noNumber(data) {
//     //写死
//     data = null;
//     // console.log(data);
//     var html = "";
//     if (data == null || data.length == 0) {
//         html = `
//         <div class="bg-none"> 
//             </div>`;
//         $("#noNumber").parent(".doct-item").append(html);
//     } else {
//         for (var i = 0; i < data.length; i++) {
//             html += `<dt>${data[i].consultationDoctor}</dt> <dd>${data[i].consultationNumber}%</dd>`;
//         }
//         $("#noNumber").append(html);
//     }
// }
//医院上传检查数量排名数据统计  
function loadStudy(data) {
    data = [
            { hospitalcode: "455769641", name: "深圳市龙华区中心医院", totalCount: 388322 },
            { hospitalcode: "455769641", name: "深圳市第二人民医院", totalCount: 379234 },
            { hospitalcode: "455769641", name: "深圳市龙华区人民医院", totalCount: 325812 },
            { hospitalcode: "455769641", name: "坪山人民医院", totalCount: 234539 },
            { hospitalcode: "455769641", name: "北京大学深圳医院", totalCount: 14687 }
        ]
        // data = mdata
        // console.log(data);
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

    //写死
    data = [
        { date: '201804', doctorNumber: 7 },
        { date: '201805', doctorNumber: 7 },
        { date: '201806', doctorNumber: 8 },
        { date: '201807', doctorNumber: 6 },
        { date: '201808', doctorNumber: 9 }
    ]
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
                        offset: 1,
                        color: 'rgba(19, 236, 255, 0.5)'
                    }, {
                        offset: 0,
                        color: 'rgba(128, 128, 128, 0)'
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
        xAxis[i] = data[i].studyDevice;
        yAxis[i] = {};
        yAxis[i].name = data[i].studyDevice;
        yAxis[i].value = data[i].studyNumber;
    }
    var x = [];
    var y = [];
    x = xAxis[5];
    xAxis[5] = xAxis[1];
    xAxis[1] = x;
    y = yAxis[5];
    yAxis[5] = yAxis[1];
    yAxis[1] = y;
    var amount = echarts.init(document.getElementById('amount'));
    amountOpt = {
        title: {
            text: "检查量占比",
            textStyle: {
                color: '#13ecff',
                align: "center",
                fontSize: 14
            },
            left: "35%",
            top: "40%"
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        // legend: {
        //     orient: 'vertical',
        //     right: "0",
        //     top: '0%',
        //     data: xAxis,
        //     textStyle: {
        //         color: '#13ecff'
        //     }
        // },
        series: [{
                name: ' ',
                type: 'pie',
                radius: ['58%', '75%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    position: 'outside',
                    formatter: function(data) {
                        return data.name + ':' + parseInt(data.percent) + '%';
                    },
                    color: '#13ecff'
                },
                labelLine: {
                    length: 5,
                    length2: 5,
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
    console.log(data)
    var xAxis = [];
    var yAxis = [];
    for (var i = 0; i < data.length; i++) {
        xAxis[i] = data[i].studyType;
        yAxis[i] = {};
        yAxis[i].name = data[i].studyType;
        yAxis[i].value = data[i].studyNumber;
    }
    console.log(yAxis);
    var x = [];
    var y = [];
    x = xAxis[5];
    xAxis[5] = xAxis[1];
    xAxis[1] = x;
    y = yAxis[5];
    yAxis[5] = yAxis[1];
    yAxis[1] = y;
    var positive = echarts.init(document.getElementById('positive'));
    positiveOpt = {

        title: {
            text: "阳性率占比",
            textStyle: {
                color: '#13ecff',
                align: "center",
                fontSize: 14
            },
            left: "33%",
            top: "40%"
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        // legend: {
        //     orient: 'vertical',
        //     right: "0",
        //     top: '0%',
        //     data: xAxis,
        //     // ['CT 50%','MR 68%','DR 80%'],
        //     textStyle: {
        //         color: '#13ecff'
        //     }
        // },
        series: [{
                name: ' ',
                type: 'pie',
                radius: ['58%', '75%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    position: 'outside',
                    formatter: function(data) {
                        return data.name + ':' + parseInt(data.percent) + '%';
                    },
                    // function(data){
                    //     return 
                    // },
                    // '{b} {d}%',
                    color: '#13ecff'
                },
                labelLine: {
                    length: 5,
                    length2: 5,
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
    data = [
        { area: "宝安区", doctorNumber: 229 },
        { area: "光明新区", doctorNumber: 80 },
        { area: "南山区", doctorNumber: 589 },
        { area: "福田区", doctorNumber: 463 },
        { area: "坪山新区", doctorNumber: 112 },
        { area: "龙岗区", doctorNumber: 336 },
        { area: "大鹏新区", doctorNumber: 89 },
        { area: "龙华新区", doctorNumber: 600 },
        { area: "盐田区", doctorNumber: 123 },
        { area: "罗湖区", doctorNumber: 566 }
    ]
    console.log(data)
    for (var i = 0; i < data.length; i++) {
        html += `<li>
       <img src="img/region${i + 1}.png"/>
       <span>${data[i].area}</span>
       <span class="doct-num" id="baoAn">${data[i].doctorNumber}人</span>
   </li>`;
    }
    $("#doctorNumberArea").append(html);
};