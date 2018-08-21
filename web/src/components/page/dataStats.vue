<template>
	<div class="container leader">
		<h1 class="top-title">数据统计：</h1>
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-form-item label="日期 :">
				<el-date-picker v-model="formInline.date" type="month" value-format="yyyyMM" placeholder="选择月">
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">查询</el-button>
			</el-form-item>
		</el-form>
		<el-row :gutter="20">
			<el-col :span="12">
				<div class="grid-content">
					<ul class="medic-arr">
						<!-- <li>
							<dl>
								<dt>区域会诊中心</dt>
								<dd>{{this.joinNumber==null||this.joinNumber==""? 0:this.joinNumber}}个</dd>
							</dl>
						</li> -->
						<!-- <li>
							<dl>
								<dt>区域质控中心</dt>
								<dd>{{this.areaQualityControlCenter==null||this.areaQualityControlCenter==""? 0:this.areaQualityControlCenter}}个</dd>
							</dl>
						</li> -->
						<li>
							<dl>
								<dt>接入机构数量</dt>
								<dd>{{this.joinNumber==null||this.joinNumber==""? 0:this.joinNumber}}个</dd>
							</dl>
						</li>
						<li>
							<dl>
								<dt>医生数量</dt>
								<dd>{{this.doctorNumber==null||this.doctorNumber==""? 0:this.doctorNumber}}名</dd>
							</dl>
						</li>
						<li>
							<dl>
								<dt>会诊量</dt>
								<dd class="icon2">{{this.consultationNumber==null||this.consultationNumber==""? 0:this.consultationNumber}}例</dd>
							</dl>
						</li>
						<!-- <li>
							<dl>
								<dt>质控量</dt>
								<dd class="icon2">{{this.allQualityControlNumber==null||this.allQualityControlNumber==""? 0:this.allQualityControlNumber}}例</dd>
							</dl>
						</li> -->
						<li>
							<dl>
								<dt>存储使用量</dt>
								<dd class="icon2">{{this.allStorageNumber==null||this.allStorageNumber==""? 0:this.allStorageNumber}}GB</dd>
							</dl>
						</li>
						<li>
							<dl>
								<dt>检查量</dt>
								<dd class="icon2">{{this.allStudyNumber==null||this.allStudyNumber==""? 0:this.allStudyNumber}}个</dd>
							</dl>
						</li>
						<!-- <li>
							<dl>
								<dt>电子影像调阅量</dt>
								<dd>{{this.filmOpenNumber==null||this.filmOpenNumber==""? 0:this.filmOpenNumber}}次</dd>
							</dl>
						</li>
						<li>
							<dl>
								<dt>电子影像发放量</dt>
								<dd>{{this.filmBuildNumber==null||this.filmBuildNumber==""? 0:this.filmBuildNumber}}个</dd>
							</dl>
						</li> -->
					</ul>

				</div>
			</el-col>

			<el-col :span="12">
				<div class="grid-content">
					<h3 class="item-title">基础医院上传检查数量排名</h3>
					<div :style="{width:'100%',height:'80%'}">
						<div v-if="hospitalAndUploadStudyNumber.length==0" :style="bg">
						</div>
						<ul class="hospt-list" v-if="hospitalAndUploadStudyNumber.length!=0">
							<li v-for="item in hospitalAndUploadStudyNumber" :value="item.name" :key="item.totalCount">
								<span>{{item.name}}</span>
								<span></span>
								<span>{{item.totalCount}}例</span>
							</li>
						</ul>
					</div>
				</div>
			</el-col>

			<el-col :span="12">
				<div class="grid-content">
					<h3 class="item-title">会诊医生月注册量</h3>
					<div id="contract" :style="{width: '100%', height: '80%'}">
						<div v-if="signDoctorTrend.length==0" :style="bg">
						</div>
					</div>
				</div>
			</el-col>

			<el-col :span="12">
				<div class="grid-content">
					<h3 class="item-title">会诊量趋势</h3>
					<div id="TrendOfCol" :style="{width: '100%', height: '80%'}">
						<div v-if="consultationTrendList.length==0" :style="bg">
						</div>
					</div>
				</div>
			</el-col>

			<el-col :span="8">
				<div class="grid-content">
					<h3 class="item-title">会诊医生职称分布</h3>
					<div id="doctorTitle" :style="{width: '100%', height: '80%'}">
						<div v-if="doctorTitleDistribution.length==0" :style="bg">
						</div>
					</div>
				</div>
			</el-col>

			<el-col :span="16">
				<div class="grid-content">
					<h3 class="item-title">会诊量排名</h3>
					<div :style="{width:'100%',height:'80%'}">
						<div v-if="doctorConsultationRanking.length==0" :style="bg">
						</div>
						<ul class="doct-list" id="noNumber" v-if="doctorConsultationRanking.length!=0">
							<li v-for="item in doctorConsultationRanking" :key="item.consultationDoctor">
								<span>{{item.consultationDoctor}}</span>
								<span><i></i></span>
								<span>{{item.consultationNumber}}</span>
							</li>
						</ul>
					</div>
				</div>
			</el-col>

			<!-- <el-col :span="8">
				<div class="grid-content">
					<h3 class="item-title">医生不符合率排名</h3>

					<div :style="{width:'100%',height:'80%'}">
						<div v-if="doctorConsultationRanking.length==0" :style="bg">
						</div>
						<ul class="doct-list" id="noNumber" v-if="doctorConsultationRanking.length!=0">
							<li v-for="item in doctorAccordRanking" :key="item.consultationDoctor">
								<span>{{item.consultationDoctor}}</span>
								<span><i></i></span>
								<span>{{item.consultationNumber}}</span>
							</li>
						</ul>
					</div>
				</div>
			</el-col> -->
			<el-col :span="8">
				<div class="grid-content">
					<h3 class="item-title">检查阳性率占比</h3>
					<div id="positive" :style="{width: '100%', height: '80%'}">
						<div v-if="studyeQuipmentAndPositivePersent.length==0" :style="bg">
						</div>
					</div>
				</div>
			</el-col>
			<el-col :span="16">
				<div class="grid-content">
					<h3 class="item-title">部位检查量占比</h3>
					<div id="checkPoint" :style="{width: '100%', height: '80%'}">
						<div v-if="studyTypeAndPersent.length==0" :style="bg">
						</div>
					</div>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="grid-content">
					<h3 class="item-title">按地区医生数量分布</h3>
					<ul class="doct-map" id="doctorNumberArea">
						<li v-for="(item,index) in doctorAreaDistribution" :key="item.area" :index="index">
							<img style="width:100px; height:100px;" v-bind:src="item.src" />
							<span>{{item.area}}</span>
							<span class="doct-num" id="baoAn">{{item.doctorNumber}}人</span>
						</li>
					</ul>
				</div>
			</el-col>
		</el-row>
		<div class="clear"></div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        date: ""
        // region: ''
      },
      ok: 0,
      json: [],
      joinNumber: "", //区域会诊中心
      allQualityControlNumber: "", //当年累计质控量
      allStorageNumber: "", //累计存储使用量
      allStudyNumber: "", //当年累计上传检查量
      areaQualityControlCenter: "", //区域质控中心
      consultationNumber: "", //当年累计会诊数量
      doctorNumber: "", //医生数量
      filmBuildNumber: "", //云胶片发放数量
      filmOpenNumber: "", //云胶片调阅数量
      hospitalAndUploadStudyNumber: [], //签约医生数量趋势
      doctorConsultationRanking: [], //医生出诊量排名
      doctorAccordRanking: [], //医生不符合率排名
      doctorAreaDistribution: [],
      signDoctorTrend: [],
      consultationTrendList: [], //会诊量趋势
      doctorTitleDistribution: [], //医生职称分布
      doctorConsultationRanking: [], //医生出诊量排名
      studyeQuipmentAndPositivePersent: [], //检查设备阳性率占比
      studyTypeAndPersent: [], //检查部位、检查占比
      bg: {
        backgroundImage: "url(" + require("../../assets/img/nodata.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        height: "100%"
      },
      axisLine: "#095795", //xy轴颜色
      axisLabel: "#a5c3ff", //xy字体颜色
      splitLine: "#095795", //坐标系网格线段颜色
      pieLabelColor: "#a5c3ff", //饼图字体颜色
      lineColor: "#fff", //曲线颜色
      pointColor: "#eac052" //曲线和网格交点颜色
    };
  },
  mounted() {
    this.getData("");
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      //   console.log(sessionStorage.getItem("loginToken"));
      //   console.log(sessionStorage.getItem("hospitalId"));
      let hospitalId = sessionStorage.getItem("hospitalId");
      // console.log(this.formInline.date);
      if (this.formInline.date != null) {
        this.getData(this.formInline.date);
      } else {
        this.getData("");
      }
    },
    axiosJson(url, dataList) {
      //data数据可以为空
      this.$axios
        .get(url)
        .then(res => {
           console.log(res.data.data);
            this.json[dataList] = res.data.data;
			this.ok++; 
            if (this.ok == 14) {
				console.log( this.json);
				this.show(this.json)
            }
        })
        .catch(err=>{
          console.log(err);
            this.ok++;
            if (this.ok == 14) {
                this.show(this.json)
            }
        });
    },
    show(data) { 
		console.log(data);
		// this.joinNumber = data.getJoinNumber; //接入机构数
		// this.allStudyNumber = data.getStudyNumber; //当年累计上传检查量
		// this.consultationNumber = data.getConsultNumber; //会诊量
		// this.doctorNumber = data.getDoctorNumber; //医生数量
    // this.allStorageNumber = data.getStorageNumber; //存储量
    
		this.joinNumber = 5; //接入机构数
		this.allStudyNumber = data.getStudyNumber; //当年累计上传检查量
		this.consultationNumber = 83; //会诊量
		this.doctorNumber = 3817; //医生数量
		this.allStorageNumber = data.getStorageNumber; //存储量
		// this.allQualityControlNumber = data.allQualityControlNumber;
		// this.areaQualityControlCenter = data.areaQualityControlCenter;
		// this.filmBuildNumber = data.filmBuildNumber;
		// this.filmOpenNumber = data.filmOpenNumber;
		//基础医院上传数量排名
    // this.hospitalAndUploadStudyNumber = data.getHospitalUploadRank;
   this.hospitalAndUploadStudyNumber =  [
            { hospitalcode: "455769641", name: "深圳市龙华区中心医院", totalCount: 388322 },
            { hospitalcode: "455769641", name: "深圳市第二人民医院", totalCount: 379234 },
            { hospitalcode: "455769641", name: "深圳市龙华区人民医院", totalCount: 325812 },
            { hospitalcode: "455769641", name: "坪山人民医院", totalCount: 234539 },
            { hospitalcode: "455769641", name: "北京大学深圳医院", totalCount: 14687 }
        ]
		//签约医生数量趋势
		if (
			data.getDoctorNumberAndDate != null &&
			data.getDoctorNumberAndDate.length != 0
		) {
			this.signDoctorTrend =data.getDoctorNumberAndDate;
			this.doctorNumber1(data.getDoctorNumberAndDate);
		}
		// this.loadStudy(data.hospitalAndUploadStudyNumber);
		//会诊量趋势
		if (
			data.getConsultationNumberAndDate != null &&
			data.getConsultationNumberAndDate.length != 0
		) {
			this.consultationTrendList = data.getConsultationNumberAndDate;
			this.consultationTrend(data.getConsultationNumberAndDate);
		}
		//医生职称分布
		if (
			data.getDoctorTitleSpread != null &&
			data.getDoctorTitleSpread.length != 0
		) {
			this.doctorTitleDistribution = data.getDoctorTitleSpread;
			this.doctorTitle(data.getDoctorTitleSpread);
		}
		//医生出诊量排名
		if (
			data.getConsultationDoctorAndNumber != null &&
			data.getConsultationDoctorAndNumber .length != 0
		) {
      // this.doctorConsultationRanking =data.getConsultationDoctorAndNumber;
        this.doctorConsultationRanking = [
        { consultationDoctor: '兰建清', consultationNumber: 22 },
        { consultationDoctor: '范凯瑞', consultationNumber: 18 },
        { consultationDoctor: '李正豪', consultationNumber: 13 },
        { consultationDoctor: '羊城', consultationNumber: 8 },
        { consultationDoctor: '陈浩宇', consultationNumber: 4 }
    ]
		}
		//   //医生不符合率排名
		//   if (
		//     data.doctorAccordRanking != null &&
		//     data.doctorAccordRanking != 0
		//   ) {
		//     this.doctorAccordRanking = data.doctorAccordRanking;
		//   }
		//检查设备阳性率占比

		if (
			data.getStudyePositiveAndPersent != null &&
			data.getStudyePositiveAndPersent.length != 0
		) {
			this.studyeQuipmentAndPositivePersent =
			data.getStudyePositiveAndPersent;
			this.positivePersent(data.getStudyePositiveAndPersent);
		}
		//检查部位、检查占比
		if (
			data.getStudyBodyAndPersent != null &&
			data.getStudyBodyAndPersent.length != 0
		) {
			this.studyBodyAndPersent = data.getStudyBodyAndPersent;
			this.proportion(data.getStudyBodyAndPersent);
		}
		//按地区医生数量分布
		//   this.doctorAreaDistribution = data.doctorAreaDistribution;
		this.doctorArea(data.getDoctorNumberAndArea); 
	},
    getData(month) {
      var param = "";
      if (month === "" || month === null) {
        param = "";
      } else {
        param = `?month=${month}`;
      }
      for (var key in this.$api.dataStats) {
        // console.log(key);
        this.axiosJson(this.$api.dataStats[key] + param, key);
      } 
    },
    option(xAxis, yAxis, name, formatter) {
      return {
        tooltip: {
          show: true,
          trigger: "item",
          formatter: formatter
        },
        noDataLoadingOption: {
          text: "暂无数据",
          effect: "bubble",
          effectOption: {
            effect: {
              n: 0
            }
          }
        },
        xAxis: {
          //lanjq
          type: "category",
          axisLine: {
            lineStyle: {
              color: this.axisLine
            }
          },
          axisLabel: {
            color: this.axisLabel,
            margin: 15
          },
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: this.splitLine
            }
          },
          data: xAxis
        },
        yAxis: {
          //lanjq
          type: "value",
          name: name,
          nameGap: 30,
          gridIndes: 0,
          nameTextStyle: {
            color: "#a5c3ff"
          },
          axisLine: {
            lineStyle: {
              color: "#095795"
            }
          },
          axisLabel: {
            color: "#a5c3ff"
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#095795"
            }
          }
        },
        series: [
          {
            data: yAxis,
            type: "line",
            itemStyle: {
              color: "#fff", //lanjq 交点中心颜色
              borderColor: "#fff", //lanjq 交点颜色
              borderWidth: 5
            },
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#eac052" // 0% 处的颜色 lanjq线条颜色
                  },
                  {
                    offset: 1,
                    color: "#eac052" // 100% 处的颜色 lanjq线条颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              width: 5
            },
            smooth: true
          }
        ]
      };
    },
    //签约医生数量趋势
    doctorNumber1(data) {
     data = [
        { date: '201804', doctorNumber: 7 },
        { date: '201805', doctorNumber: 7 },
        { date: '201806', doctorNumber: 8 },
        { date: '201807', doctorNumber: 6 },
        { date: '201808', doctorNumber: 9 }
    ]
      if (data == null) {
        console.log("无数据");
      } else {
        let xAxis = [];
        let yAxis = [];
        for (let i = 0; i < data.length; i++) {
          xAxis[i] = data[i].date;
          yAxis[i] = data[i].doctorNumber;
        }
        let contract = this.$echarts.init(document.getElementById("contract"));
        let contractOpt = this.option(xAxis, yAxis, "单位（人）", "{b}: {c}人");
        contract.setOption(contractOpt);
      }
    },
    //医生职称分布
    doctorTitle(data) {
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
      let myChart = this.$echarts.init(document.getElementById("doctorTitle"));
      let option = {
        noDataLoadingOption: {
          text: "暂无数据",
          effect: "bubble",
          effectOption: {
            effect: {
              n: 0
            }
          }
        },
        color: ["#0D63AE", "#A572E4", "#2292D3", "#2924DD", "#06AFF6"],
        title: {
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/ >{b} : {c} ({d}%)"
        },
        toolbox: {
          show: true
        },
        calculable: true,
        series: [
          {
            name: "人数",
            type: "pie",
            label: {
              color: this.pieLabelColor, //lanjq 饼图文字
              formatter: "{b} {c}人"
            },
            labelLine: {
              length: 10,
              length2: 10,
              lineStyle: {
                color: this.pieLabelColor //lanjq 饼图 指引线
              }
            },
            radius: ["30%", "75%"],
            center: ["50%", "50%"],
            roseType: "area",
            data: yAxis
          }
        ]
      };
      myChart.setOption(option);
    },
    //会诊量趋势
    consultationTrend(data) {
       data = [
        { date: '201804', consultationNumber: 11 },
        { date: '201805', consultationNumber: 17 },
        { date: '201806', consultationNumber: 16 },
        { date: '201807', consultationNumber: 19 },
        { date: '201808', consultationNumber: 20 }
        ]
      let xAxis = [];
      let yAxis = [];
      for (let i = 0; i < data.length; i++) {
        xAxis[i] = data[i].date;
        yAxis[i] = data[i].consultationNumber;
      }
      let TrendOfCol = this.$echarts.init(
        document.getElementById("TrendOfCol")
      );
      let TrendOfColOpt = this.option(
        xAxis,
        yAxis,
        "会诊量（例）",
        "{b}: {c}例"
      );
      TrendOfCol.setOption(TrendOfColOpt);
    },
    //检查阳性率占比
    positivePersent(data) {
      let xAxis = [];
      let yAxis = [];
      for (let i = 0; i < data.length; i++) {
        xAxis[i] = data[i].studyType;
        yAxis[i] = {};
        yAxis[i].name = data[i].studyType;
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
      let positive = this.$echarts.init(document.getElementById("positive"));
      let positiveOpt = {
        noDataLoadingOption: {
          text: "暂无数据",
          effect: "bubble",
          effectOption: {
            effect: {
              n: 0
            }
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: " ",
            type: "pie",
            radius: ["60%", "75%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            color: ["#0D63AE", "#A572E4", "#2292D3", "#2924DD", "#06AFF6"],

            label: {
              position: "outside",
              formatter: function(data) {
                return data.name + "：" + parseInt(data.percent) + "%";
              },
              color: this.pieLabelColor,
              rich: {
                a: {
                  color: "red",
                  lineHeight: 10
                },
                b: {
                  backgroundColor: {
                    image: "xxx/xxx.jpg"
                  },
                  height: 40
                },
                x: {
                  fontSize: 18,
                  fontFamily: "Microsoft YaHei",
                  borderColor: "#449933",
                  borderRadius: 4
                }
              }
            },
            labelLine: {
              length: 10,
              length2: 10,
              lineStyle: {
                color: this.pieLabelColor
              }
            },
            data: yAxis
          }
        ]
      };
      positive.setOption(positiveOpt);
    },
    //检查部位、检查占比
    proportion(data) {
      let xAxis = [];
      let yAxis = [];
      for (var i = 0; i < data.length; i++) {
        xAxis[i] = data[i].body;
        yAxis[i] = {};
        yAxis[i].name = data[i].body;
        yAxis[i].value = data[i].number;
      }
      xAxis = ['胸', '头', '脊椎', '腹', '四肢', '上肢', '脸', '血管', '动脉', '尿', '生殖', '颈', '静脉', '神经'];
      let checkPoint = this.$echarts.init(
        document.getElementById("checkPoint")
      );
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
              color: this.axisLine
            }
          },
          axisLabel: {
            // color: this.axisLabel,
            // margin: 15,
            // rotate: 90 
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
              color: this.splitLine
            }
          },
          data: xAxis
        },
        yAxis: {
          type: "value",
          name: "例",
          nameGap: 30,
          gridIndes: 0,
          nameTextStyle: {
            color: this.axisLabel
          },
          axisLine: {
            lineStyle: {
              color: this.axisLine
            }
          },
          axisLabel: {
            color: this.axisLabel
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: this.splitLine
            }
          }
        },
        series: [
          {
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
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
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
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
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
    }, 
    //按地区医生数量分布
    doctorArea(data) {
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
      for (let i = 0; i < data.length; i++) {
        data[i].src = require("../../assets/img/region" + i + ".png");
      }
      this.doctorAreaDistribution = data;
	}
	}
  };
</script>

<style scoped>
</style>