<template>
	<div class="container" :class="{leader:isLeader}">
		<h1 v-if="roleId==4" class="hospitalHeader">{{hospitalName}}数据统计</h1>
		<h1 class="top-title">数据统计：</h1>
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
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
					<h3 class="item-title">会诊医生职称分布</h3> 
					<div id="doctorTitle" :style="{width: '100%', height: '80%'}"> 
						<div v-if="doctorTitleDistribution.length==0" :style="bg"> 
						</div>
					</div>
				</div>
			</el-col>
						
			<el-col :span="8">
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

			<!--<el-col :span="8">
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
			</el-col>-->
			<el-col :span="8">
				<div class="grid-content">
					<h3 class="item-title">检查阳性率占比</h3> 
					<div id="positive" :style="{width: '100%', height: '80%'}"> 
						<!-- <div class="no-data" v-if="studyeQuipmentAndPositivePersent==null">暂无数据</div> --> 
						<div v-if="studyeQuipmentAndPositivePersent.length==0" :style="bg"> 
						</div>
					</div>
				</div>
			</el-col>
			<el-col :span="24">
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
      ok: 0,
      json: [],
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
      hospitalName: "",
      hospitalId: "",
      bg: {
        backgroundImage: "url(" + require("../../assets/img/nodata.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        height: "100%"
      },
      isLeader: false,
      axisLine: "", //xy轴颜色
      axisLabel: "", //xy字体颜色
      splitLine: "", //坐标系网格线段颜色
      pieLabelColor: "", //饼图字体颜色
      lineColor: "", //曲线颜色
      pointColor: "" //曲线和网格交点颜色
    };
  },
  mounted() {
    this.hospitalName = this.$route.query.hospitalName;
    if (this.roleId == 2 || this.roleId == 8) {
      this.hospitalId = sessionStorage.getItem("hospitalId");
    } else {
      this.hospitalId = this.$route.query.hospitalId;
    }
    this.getData(this.hospitalId, "");
    this.isLeader = this.roleId == 4 ? true : false;
    this.axisLine = this.roleId == 4 ? "#095795" : "#eee";
    this.axisLabel = this.roleId == 4 ? "#a5c3ff" : "#0d63ae";
    this.splitLine = this.roleId == 4 ? "#095795" : "#eee";
    this.pieLabelColor = this.roleId == 4 ? "#a5c3ff" : "#666";
    this.lineColor = this.roleId == 4 ? "#fff" : "#0d47ec";
    this.pointColor = this.roleId == 4 ? "#eac052" : "#0bb9ef";
  },
  methods: {
    onSubmit() {
      this.getData(this.hospitalId, this.formInline.date);
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
            console.log(this.json);
            this.show(this.json);
          }
        })
        .catch(err => {
          console.log(err);
          this.ok++;
          if (this.ok == 14) {
            this.show(this.json);
          }
        });
    },
    show(data) {
      console.log(data);
      this.joinNumber = data.getJoinNumber; //接入机构数
      this.allStudyNumber = data.getStudyNumber; //当年累计上传检查量
      this.consultationNumber = data.getConsultNumber; //会诊量
      this.doctorNumber = data.getDoctorNumber; //医生数量
      this.allStorageNumber = data.getStorageNumber; //存储量
      // this.allQualityControlNumber = data.allQualityControlNumber;
      // this.areaQualityControlCenter = data.areaQualityControlCenter;
      // this.filmBuildNumber = data.filmBuildNumber;
      // this.filmOpenNumber = data.filmOpenNumber;
      //基础医院上传数量排名
      this.hospitalAndUploadStudyNumber = data.getHospitalUploadRank;
      // //签约医生数量趋势
      // if (
      //   data.getDoctorNumberAndDate != null &&
      //   data.getDoctorNumberAndDate.length != 0
      // ) {
      //   this.signDoctorTrend = data.getDoctorNumberAndDate;
      //   this.doctorNumber(data.getDoctorNumberAndDate);
      // }
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
        data.getConsultationDoctorAndNumber.length != 0
      ) {
        this.doctorConsultationRanking = data.getConsultationDoctorAndNumber;
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
       if (this.roleId == 4) {
        this.$axios
          .get(this.$api.dataStats2.getCommunityList, {
            params: {
              parentId: this.hospitalId
            }
          })
          .then(response => {
            this.chscList = response.data;
            // console.log(this.chscList);
          })
          .catch(error => console.log(error));
      }
    },
    getData(hospitalId,month) {
      let param = "";
      if (month == "" || month == null) {
        param = `?hospitalId=${hospitalId}`;
      } else {
        param = `?hospitalId=${hospitalId}&month=${month}`;
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
          type: "value",
          name: name,
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
            data: yAxis,
            type: "line",
            itemStyle: {
              color: this.lineColor,
              borderColor: this.lineColor,
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
                    color: this.pointColor // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: this.pointColor // 100% 处的颜色
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
      console.log(data);
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
              color: this.pieLabelColor,
              formatter: "{b} {c}人"
            },
            labelLine: {
              length: 10,
              length2: 10,
              lineStyle: {
                color: this.pieLabelColor
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
            radius: ["60%", "85%"],
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
             color: this.axisLabel,
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
          name: "%",
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*医院名称*/
.hospitalHeader {
  margin-bottom: 10px;
  text-align: center;
  font-size: 24px;
  color: #a5c3ff;
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

#TrendOfCol {
  width: 800px;
  height: 300px;
}

.server-list {
  float: left;
  width: 20%;
  min-width: 220px;
  min-height: 130px;
  border: 1px solid #ebeef5;
  margin: 15px 2.3%;
  background-color: #fff;
}

.leader .server-list {
  background: linear-gradient(
    0deg,
    rgba(4, 71, 158, 0.4) 0%,
    rgba(14, 44, 128, 0.4) 100%
  );
  background-blend-mode: normal, normal;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.52);
  border: solid 1px #095795;
  color: #a5c3ff;
}
.server-list h3 {
  margin: 20px 10px 10px 20px;
  min-height: 30px;
}

.server-list li {
  margin: 0 0 10px 20px;
}
.server-list li span {
  margin-right: 20px;
}

.icon-yunzhuji1:before {
  font-size: 26px;
  vertical-align: middle;
  color: #057eff;
}
</style>
