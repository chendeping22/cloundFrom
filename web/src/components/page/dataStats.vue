<template>
	<div class="container">
		<h1 class="top-title">数据统计：</h1>
		<el-form :inline="true" :model="formInline" class="demo-form-inline mb20">
			<el-form-item label="日期 :"> 
				<el-date-picker
					v-model="formInline.date"
					type="month"
					value-format="yyyyMM"
					placeholder="选择月">
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
						<li>
							<dl>
								<dt>区域会诊中心</dt>
								<dd>{{this.joinNumber==null||this.joinNumber==""? 0:this.joinNumber}}个</dd>
							</dl>
						</li>
						<li>
							<dl>
								<dt>区域质控中心</dt>
								<dd>{{this.areaQualityControlCenter==null||this.areaQualityControlCenter==""? 0:this.areaQualityControlCenter}}个</dd>
							</dl>
						</li>
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
						<li>
							<dl>
								<dt>质控量</dt>
								<dd class="icon2">{{this.allQualityControlNumber==null||this.allQualityControlNumber==""? 0:this.allQualityControlNumber}}例</dd>
							</dl>
						</li>
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
						<li>
							<dl>
								<dt>云胶片二维码调阅量</dt>
								<dd>{{this.filmOpenNumber==null||this.filmOpenNumber==""? 0:this.filmOpenNumber}}次</dd>
							</dl>
						</li>
						<li>
							<dl>
								<dt>云胶片二维码发放量</dt>
								<dd>{{this.filmBuildNumber==null||this.filmBuildNumber==""? 0:this.filmBuildNumber}}个</dd>
							</dl>
						</li>
					</ul>

				</div>
			</el-col>

			<el-col :span="12">
				<div class="grid-content">
					<h3 class="item-title">基础医院上传检查数量排名</h3> 
          <div :style="{width:'100%',height:'80%'}">
            <div v-if="hospitalAndUploadStudyNumber.length==0"  :style="bg"> 
              </div>
            <ul class="hospt-list" v-if="hospitalAndUploadStudyNumber.length!=0" >
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
					<h3 class="item-title">签约医生数量趋势</h3>
          
					<div id="contract" :style="{width: '100%', height: '80%'}"> 
            <div v-if="signDoctorTrend.length==0"  :style="bg"> 
              </div>
          </div>
				</div>
			</el-col>

			<el-col :span="12">
				<div class="grid-content">
					<h3 class="item-title">会诊量趋势</h3>
					<div id="TrendOfCol" :style="{width: '100%', height: '80%'}">
            <div v-if="consultationTrendList.length==0"  :style="bg"> 
              </div></div>
				</div>
			</el-col>

			<el-col :span="8">
				<div class="grid-content">
					<h3 class="item-title">医生职称分布</h3>
					<div id="doctorTitle" :style="{width: '100%', height: '80%'}">
            <div v-if="doctorTitleDistribution.length==0"  :style="bg"> 
              </div>
            </div>
				</div>
			</el-col>

			<el-col :span="8">
				<div class="grid-content">
					<h3 class="item-title">医生出诊量排名</h3>
          <div :style="{width:'100%',height:'80%'}">
              <div v-if="doctorConsultationRanking.length==0"  :style="bg"> 
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

			<el-col :span="8">
				<div class="grid-content">
					<h3 class="item-title">医生不符合率排名</h3>
          
          <div :style="{width:'100%',height:'80%'}">
              <div v-if="doctorConsultationRanking.length==0"  :style="bg"> 
                </div>
            <ul class="doct-list" id="noNumber" v-if="doctorConsultationRanking.length!=0">
              <li v-for="item in doctorAccordRanking"
              :key="item.consultationDoctor" >
                <span>{{item.consultationDoctor}}</span>
                <span><i></i></span>
                <span>{{item.consultationNumber}}</span>
              </li> 
            </ul>
          </div>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="grid-content">
					<h3 class="item-title">检查设备阳性率占比</h3>
					<div id="positive" :style="{width: '400px', height: '250px'}">
            <div v-if="studyeQuipmentAndPositivePersent.length==0"  :style="bg"> 
              </div>
          </div>
				</div>
			</el-col>
			<el-col :span="16">
				<div class="grid-content">
					<h3 class="item-title">部位检查量占比</h3>
					<div id="checkPoint" :style="{width: '100%', height: '80%'}">
            <div v-if="studyTypeAndPersent.length==0" :style="bg"> 
              </div></div>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="grid-content">
					<h3 class="item-title">按地区医生数量分布</h3>
					<ul class="doct-map" id="doctorNumberArea">
						<li v-for="(item,index) in doctorAreaDistribution" :key="item.area" :index="index" >
							<img style="width:100px; height:100px;" v-bind:src="item.src"/>  
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
      }
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
    getData(month) {
      var token = sessionStorage.getItem("loginToken");
      var param = "";
      if (month ===""|| month ===null) {
        param = "";
      } else {
        param = `?month=${month}`;
      }
      // console.log(param);
      this.$axios
        // .get("http://192.168.121.132:4040/workStatistics/getHospitalBasicData/v1.0" +param)
        .get(
          "/cloudform-statistics/workStatistics/getHospitalBasicData/v1.0" +
            param
        )
        .then(response => {
          // console.log(response);
          var data = response.data;
          //统计数据
          this.totalData(data);
          //基础医院上传数量排名
          this.hospitalAndUploadStudyNumber = data.hospitalAndUploadStudyNumber;
          //签约医生数量趋势
          if (data.signDoctorTrend != null && data.signDoctorTrend != 0) {
            this.signDoctorTrend = data.signDoctorTrend;
            this.doctorNumber1(data.signDoctorTrend);
          }
          // this.loadStudy(data.hospitalAndUploadStudyNumber);
          //会诊量趋势
          if (data.consultationTrend != null && data.consultationTrend != 0) {
            this.consultationTrendList = data.consultationTrend;
            this.consultationTrend(data.consultationTrend);
          }
          //医生职称分布
          if (
            data.doctorTitleDistribution != null &&
            data.doctorTitleDistribution != 0
          ) {
            this.doctorTitleDistribution = data.doctorTitleDistribution;
            this.doctorTitle(data.doctorTitleDistribution);
          }
          //医生出诊量排名
          if (
            data.doctorConsultationRanking != null &&
            data.doctorConsultationRanking != 0
          ) {
            this.doctorConsultationRanking = data.doctorConsultationRanking;
          }
          //医生不符合率排名
          if (
            data.doctorAccordRanking != null &&
            data.doctorAccordRanking != 0
          ) {
            this.doctorAccordRanking = data.doctorAccordRanking;
          }
          //检查设备阳性率占比

          if (
            data.studyeQuipmentAndPositivePersent != null &&
            data.studyeQuipmentAndPositivePersent != 0
          ) {
            this.studyeQuipmentAndPositivePersent =
              data.studyeQuipmentAndPositivePersent;
            this.positivePersent(data.studyeQuipmentAndPositivePersent);
          }
          //检查部位、检查占比
          if (
            data.studyBodyAndPersent != null &&
            data.studyBodyAndPersent != 0
          ) {
            this.studyBodyAndPersent = data.studyBodyAndPersent;
            this.proportion(data.studyBodyAndPersent);
          }
          //按地区医生数量分布
          //   this.doctorAreaDistribution = data.doctorAreaDistribution;
          this.doctorArea(data.doctorAreaDistribution);
        })
        .catch(function(error) {
          console.log(error);
        });
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
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#eee"
            }
          },
          axisLabel: {
            color: "#0d63ae",
            margin: 15
          },
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: "#eee"
            }
          },
          data: xAxis
        },
        yAxis: {
          type: "value",
          name: name,
          nameGap: 30,
          gridIndes: 0,
          nameTextStyle: {
            color: "#999999"
          },
          axisLine: {
            lineStyle: {
              color: "#eeeee"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#eee"
            }
          }
        },
        series: [
          {
            data: yAxis,
            type: "line",
            itemStyle: {
              color: "#0d47ec",
              borderColor: "#0d47ec",
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
                    color: "#2783c6" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#0bb9ef" // 100% 处的颜色
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
    //统计数据
    totalData(data) {
      this.joinNumber = data.joinNumber;
      this.allQualityControlNumber = data.allQualityControlNumber;
      this.allStorageNumber = data.allStorageNumber;
      this.allStudyNumber = data.allStudyNumber;
      this.areaQualityControlCenter = data.areaQualityControlCenter;
      this.consultationNumber = data.consultationNumber;
      this.doctorNumber = data.doctorNumber;
      this.filmBuildNumber = data.filmBuildNumber;
      this.filmOpenNumber = data.filmOpenNumber;
    },
    //签约医生数量趋势
    doctorNumber1(data) {
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
              color: "#666",
              formatter: "{b} {c}人"
            },
            labelLine: {
                length:10,
                length2:10,
              lineStyle: {
                color: "#666"
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
    //检查设备阳性率占比
    positivePersent(data) {
      let xAxis = [];
      let yAxis = [];
      for (let i = 0; i < data.length; i++) {
        xAxis[i] = data[i].type;
        yAxis[i] = {};
        yAxis[i].name = data[i].type;
        yAxis[i].value = data[i].number;
      }
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
            radius: ["60%", "85%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            color: ["#0D63AE", "#A572E4", "#2292D3", "#2924DD", "#06AFF6"],

            label: {
              position: "outside",   
              formatter:function(data){ 
                    return data.name+'：'+parseInt(data.percent)+'%';
                },
              color: "#333",
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
                length:10,
                length2:10,
              lineStyle: {
                color: "#666"
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
        xAxis[i] = data[i].type;
        yAxis[i] = {};
        yAxis[i].name = data[i].type;
        yAxis[i].value = data[i].number;
      }
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
              color: "#eee"
            }
          },
          axisLabel: {
            color: "#0d63ae",
            margin: 15
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#eee"
            }
          },
          data: xAxis
        },
        yAxis: {
          type: "value",
          name: "%",
          nameGap: 30,
          gridIndes: 0,
          nameTextStyle: {
            color: "#999999"
          },
          axisLine: {
            lineStyle: {
              color: "#eeeee"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#eee"
            }
          }
        },
        series: [
          {
            // For shadow
            type: "bar",
            itemStyle: {
              normal: { color: "rgba(0,0,0,0.05)" }
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
                  { offset: 0, color: "#83bff6" },
                  { offset: 0.5, color: "#188df0" },
                  { offset: 1, color: "#188df0" }
                ])
              },
              emphasis: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" }
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