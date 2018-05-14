<template>
	<div class="container">
		<h1 v-if="roleId==4" style="margin-bottom:10px; text-align:center; font-size:24px;">{{hospitalName}}</h1>
		<h1 class="top-title">
			数据统计：
		</h1>
		<el-form :inline="true" :model="formInline" class="demo-form-inline mb20">
			<!-- <el-form-item label="审批人">
				<el-input v-model="formInline.user" placeholder="审批人"></el-input>
			</el-form-item> --> 
			<el-form-item label="日期 :"> 
				<el-date-picker
					v-model="formInline.date"
					type="month"
					value-format="yyyyMM"
					placeholder="选择月">
				</el-date-picker>
			</el-form-item>
			<!-- <el-form-item label="活动区域">
				<el-select v-model="formInline.region" placeholder="活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item> --> 
			<el-form-item>
				<el-button type="primary" @click="onSubmit">查询</el-button>
			</el-form-item>
		</el-form>
		<el-row :gutter="20">
			<el-col :span="8">
				<div class="grid-content">

					<ul class="medic-arr medic-arr2">
						
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
								<dt>存储使用量</dt>
								<dd class="icon2">{{this.allStorageNumber==null||this.allStorageNumber==""? 0:this.allStorageNumber}}GB</dd>
							</dl>
						</li>
						<li>
							<dl>
								<dt>检查量</dt>
								<dd class="icon2">{{this.allStudyNumber==null||this.allStudyNumber==""? 0:this.allStudyNumber}}例</dd>
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
			
						
			<el-col :span="16">
				<div class="grid-content">
					<h3 class="item-title">会诊量趋势</h3>
					<div id="TrendOfCol" :style="{width: '100%', height: '80%'}"> 
						<div v-if="consultationTrendList.length==0" :style="bg">
							<!-- <img src="../../assets/img/nodata.png" alt=""> -->
						</div>
					</div>
				</div>
			</el-col>
						
			<el-col :span="8">
				<div class="grid-content">
					<h3 class="item-title">医生职称分布</h3> 
					<div id="doctorTitle" :style="{width: '100%', height: '80%'}"> 
						<div v-if="doctorTitleDistribution.length==0" :style="bg"> 
						</div>
					</div>
				</div>
			</el-col>
						
			<el-col :span="8">
				<div class="grid-content">
					<h3 class="item-title">医生出诊量排名</h3> 
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

			<el-col :span="8">
				<div class="grid-content">
					<h3 class="item-title">医生不符合率排名</h3> 
         			<div :style="{width:'100%',height:'80%'}">	
						<div v-if="doctorAccordRanking.length==0" :style="bg" > 
						</div>
						<ul class="doct-list" id="noNumber" v-if="doctorAccordRanking.length!=0">
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
					<div id="positive" :style="{width: '100%', height: '80%'}"> 
						<!-- <div class="no-data" v-if="studyeQuipmentAndPositivePersent==null">暂无数据</div> --> 
						<div v-if="studyeQuipmentAndPositivePersent.length==0" :style="bg"> 
						</div>
					</div>
				</div>
			</el-col>
			<el-col :span="16">
				<div class="grid-content">
					<h3 class="item-title">部位检查量占比</h3>
					<div id="checkPoint" :style="{width: '100%', height: '80%'}">
						<!-- <div class="no-data" v-if="studyTypeAndPersent==null">暂无数据</div> --> 
						<div v-if="studyTypeAndPersent.length==0" :style="bg"> 
						</div>
					</div>
				</div>
			</el-col>

		</el-row>
		<div v-if="roleId==4">
			<h1 class="top-title">
			社康中心：
			</h1>  
			<div  :style="{width: '100%', height:'200px'}">
				<div v-if="chscList.length==0" :style="bg"> 
				</div>
				<div class="server-list" v-for="item in chscList" :key="item.name">
							<h3><i class="iconfont icon-yunzhuji1"></i> {{item.name}}</h3>
							<ul>
								<li><span>检查数量</span><strong>{{item.allStudyNumber==null?0:item.allStudyNumber}}</strong></li>
								<li><span>设备数量</span><strong>{{item.deviceNumber==null?0:item.deviceNumber}}</strong></li> 
							</ul>
				</div> 
			</div>
		</div> 
	<div class="clear"></div>	 
	</div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      doctorNumber: "", //医生数量
      consultationNumber: "", //当年累计会诊数量
      allStorageNumber: "", //累计存储使用量
      allStudyNumber: "", //当年累计上传检查量
      filmBuildNumber: "", //云胶片发放数量
      filmOpenNumber: "", //云胶片调阅数量
      doctorConsultationRanking: [], //医生出诊量排名
      doctorAccordRanking: [], //医生不符合率排名
      doctorAreaDistribution: [],
      studyeQuipmentAndPositivePersent: [], //阳性占比
      studyTypeAndPersent: [], //占比
      chscList: [],
      roleId: sessionStorage.getItem("roleId"),
      consultationTrendList: [], //会诊量趋势
      doctorTitleDistribution: [], //医生职称分布
      hospitalName: sessionStorage.getItem("hospitalName"),
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
    let hospitalId = sessionStorage.getItem("hospitalId");
    this.getData(hospitalId, "");
  },
  methods: {
    onSubmit() {
      // console.log("submit!");
      // console.log(sessionStorage.getItem("loginToken"));
      // console.log(sessionStorage.getItem("hospitalId"));
      let hospitalId = sessionStorage.getItem("hospitalId");

      this.getData(hospitalId, this.formInline.date);
    },
    getData(hospitalId, month) {
      let token = sessionStorage.getItem("loginToken");
      let param = "";
      if (month == "" || month == null) {
        param = `?hospitalId=${hospitalId}`;
      } else {
        param = `?hospitalId=${hospitalId}&month=${month}`;
      }
      // console.log(param);
      this.$axios
        // .get('http://192.168.121.42:4040/workStatistics/getHospitalBasicData/v1.0'+param)
        .get(
          "/cloudform-statistics/workStatistics/getHospitalBasicData/v1.0" +
            param
        )
        .then(response => {
          var data = response.data;
          // console.log(response.data);
          //统计数据
          this.totalData(data);
          //会诊量趋势
          if (
            data.consultationTrend != null &&
            data.consultationTrend.length != 0
          ) {
            this.consultationTrendList = data.consultationTrend;
            this.consultationTrend(data.consultationTrend);
          }
          //医生职称分布
          if (
            data.doctorTitleDistribution != null &&
            data.doctorTitleDistribution.length != 0
          ) {
            this.doctorTitleDistribution = data.doctorTitleDistribution;
            this.doctorTitle(data.doctorTitleDistribution);
          }
          //医生出诊量排名
          if (
            data.doctorConsultationRanking != null &&
            data.doctorConsultationRanking.length != 0
          ) {
            this.doctorConsultationRanking = data.doctorConsultationRanking;
          }
          //医生不符合率排名
          if (
            data.doctorAccordRanking != null &&
            data.doctorAccordRanking.length != 0
          ) {
            this.doctorAccordRanking = data.doctorAccordRanking;
          }
          //检查设备阳性率占比
          if (
            data.studyeQuipmentAndPositivePersent != null &&
            data.studyeQuipmentAndPositivePersent.length != 0
          ) {
            this.studyeQuipmentAndPositivePersent =
              data.studyeQuipmentAndPositivePersent;
            this.positivePersent(data.studyeQuipmentAndPositivePersent);
          }
          //检查部位、检查占比
          if (
            data.studyBodyAndPersent != null &&
            data.studyBodyAndPersent.length != 0
          ) {
            this.studyBodyAndPersent = data.studyBodyAndPersent;
            this.proportion(data.studyBodyAndPersent);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      if (this.roleId == 4) {
        this.$axios
          // .get("http://192.168.121.42:4040/formStatistics/getHospitalList/v1.0"+param)
          .get("/cloudform-statistics/formStatistics/getCommunityList/v1.0", {
            params: {
              parentId: sessionStorage.getItem("hospitalId")
            }
          })
          .then(response => {
            this.chscList = response.data;
            // console.log(this.chscList);
          })
          .catch(error => console.log(error));
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
      this.doctorNumber = data.doctorNumber;
      this.consultationNumber = data.consultationNumber;
      this.allStorageNumber = data.allStorageNumber;
      this.allStudyNumber = data.allStudyNumber;
      this.filmBuildNumber = data.filmBuildNumber;
      this.filmOpenNumber = data.filmOpenNumber;
    },
    //会诊量趋势
    consultationTrend(data) {
      console.log(data);
      let xAxis = [];
      let yAxis = [];
      for (let i = 0; i < data.length; i++) {
        xAxis[i] = data[i].date;
        yAxis[i] = data[i].consultationNumber;
        // console.log(data[i].date, data[i].consultationNumber);
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
    //医生职称分布
    doctorTitle(data) {
      // console.log(data);
      var yAxis = [];
      for (var i = 0; i < data.length; i++) {
        yAxis[i] = {};
        yAxis[i].name = data[i].doctorTitle;
        yAxis[i].value = data[i].doctorNumber;
      }
      let myChart = this.$echarts.init(document.getElementById("doctorTitle"));
      let option = {
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
    //检查设备阳性率占比
    positivePersent(data) { 
      let xAxis = [];
      let yAxis = [];
      // for(let key in data[0]){
      // 	yAxis.push(data[0][key]);
      // }
      // console.log(yAxis);
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
        // legend: {
        //     orient: 'vertical',
        //     right: 0,
        //     top: '10%',
        //     data: xAxis,
        //     // ["平扫",'增强',"常规","其他"],
        //     textStyle: {
        //         color: '#666'
        //     }
        // },
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
              color: "#333"
            },
            labelLine: { 
              lineStyle: {
                color: "#666"
              }
            },
            // label: {
            //   position: "outside",
            //   formatter: "{a} {b} {c}",
            //   color: "#666",
            //   rich: {
            //     a: {
            //       color: "red",
            //       lineHeight: 10
            //     },
            //     b: {
            //       backgroundColor: {
            //         image: "xxx/xxx.jpg"
            //       },
            //       height: 40
            //     },
            //     x: {
            //       fontSize: 18,
            //       fontFamily: "Microsoft YaHei",
            //       borderColor: "#449933",
            //       borderRadius: 4
            //     }
            //   }
            // },
            // labelLine: {
            //   show: false
            // },
            data: yAxis
          }
        ]
      };
      positive.setOption(positiveOpt);
    },
    //检查部位、检查占比
    proportion(data) {
		// console.log(data);
      let xAxis = [];
      let yAxis = [];
      for (var i = 0; i < data.length; i++) {
        xAxis[i] = data[i].type;
        yAxis[i] = {};
        yAxis[i].name = data[i].type;
        yAxis[i].value = parseInt(data[i].number);
      }
      let checkPoint = this.$echarts.init(
        document.getElementById("checkPoint")
      );
      let checkPointOpt = {
        tooltip: {
          show: true,
          trigger: "item",
          formatter: "{b}:{c}%"
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*容器*/

h1.top-title {
  /*font-weight: normal;*/
  font-size: 16px;
  padding: 0 0 10px 0;
  margin: 0 0 26px 0;
  border-bottom: 1px solid #d2d2d3;
  color: #303133;
}
/*重置输入框、按钮的样式*/
.el-input__inner {
  height: 34px;
  line-height: 34px;
}
.el-button {
  padding: 8px 20px;
}

.el-button--primary {
  color: #fff;
  background-color: #057eff;
  border-color: #057eff;
}

.mb20 {
  margin-bottom: 20px;
}
#TrendOfCol {
  width: 800px;
  height: 300px;
}

.server-list,
.ip-list {
  float: left;
  width: 20%;
  min-width: 220px;
  min-height: 130px;
  border: 1px solid #ebeef5;
  margin: 15px 2.3%;
  background-color: #fff;
  /*background: url(../../assets/img/serverbg.png) right top;*/
}
.server-list h3,
.ip-list h3 {
  margin: 20px 10px 10px 20px;
  /* padding-left: 40px; */
  min-height: 30px;
  /* background: url(../../assets/img/icon-server.png)no-repeat left top; */
}
.ip-list h3 {
  background: url(../../assets/img/icon-serverip.png)no-repeat left top;
}
.server-list li,
.ip-list li {
  margin: 0 0 10px 20px;
}
.server-list li span,
.ip-list li span {
  margin-right: 20px;
}
.normal {
  color: #057eff;
}
.abnormal {
  color: #ff3341;
}
.icon-yunzhuji1:before {
  font-size: 28px;
  vertical-align: middle;
  color: #057eff;
}
</style>
