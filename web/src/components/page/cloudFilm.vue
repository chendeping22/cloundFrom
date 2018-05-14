<template>
	<div class="container">
		<h1 class="top-title">
			云胶片：
		</h1>
        <div class="clear"> 
            <!-- 菜单 -->  
            <ul class="navmenu" >
                <li v-for="(item,index) in menuList" 
                    :key="item.title"
                    :class="{active:index==num}"
                    @click="handleClick(index,item.type)">
                    <div>
                        <img :src="item.imgUrl" alt="">
                        <p>{{item.title}}</p>
                    </div>
                </li> 
            </ul>
              <!--内容  -->
            <div class="content"> 
                <el-collapse v-model="activeNames" @change="handleChange">
                     <el-collapse-item v-for="item in reportList" :key="item.reportIdentity" :name="item.reportIdentity">
                         <template slot="title">
                            <span class="content-title">{{item.reportTypeName}}</span>
                            <span class="content-date">{{item.orderClinicApplyTime}}</span>
                            <!-- <span class="content-time">09:53 上午</span>  -->
                            <span class="content-hospital"><i class="iconfont icon-yiyuan"></i>{{item.reportHospital}}</span>
                        </template> 
                        <el-row>
                            <el-col :span="18"> 
                                <div class="content-txt">
                                    <el-row>
                                        <el-col :span="3">
                                            <div class="txt-title">
                                                <p>检查部位：</p>
                                                <p>所见描述：</p>
                                            </div>  
                                        </el-col>    
                                        <el-col :span="21">
                                            <p>{{item.orderChecksite}}</p>
                                            <p>{{item.reportFinding}}</p>
                                        </el-col>    
                                    </el-row> 
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="QR-code"> 
                                    <qriously :value="initQCode+item.reportIdentity" :size="125"/> 
                                    <p>(30分钟内有效)</p>
                                </div>
                                </el-col>
                        </el-row> 
                    </el-collapse-item>   
                </el-collapse>
            </div>
        </div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: [],
      token: sessionStorage.getItem("loginToken"),
      typeList: [],
      menuList: [
        {
          imgUrl: require("../../assets/img/mFilm_all.png"),
          title: "全部",
          type: ""
        },
        {
          imgUrl: require("../../assets/img/mFilm_chaoSheng.png"),
          title: "超声",
          type: "us"
        },
        {
          imgUrl: require("../../assets/img/mFilm_fangShe.png"),
          title: "放射",
          type: "ris"
        },
        {
          imgUrl: require("../../assets/img/mFilm_xinDian.png"),
          title: "心电",
          type: "1"
        },
        {
          imgUrl: require("../../assets/img/mFilm_neiJing.png"),
          title: "内镜",
          type: "es"
        },
        {
          imgUrl: require("../../assets/img/mFilm_bingLi.png"),
          title: "病理",
          type: "2"
        }
      ],
      reportList: [],
      num: 0,
      token: sessionStorage.getItem("loginToken"),
      initQCode: ""
    };
  },
  mounted() {
    this.getData();
    this.handleClick("");
    console.log(this.token);
  },
  methods: {
    getData() {
      this.$axios 
        // .get("http://192.168.121.62:8009/report/getTypes/v1.0?token=" + this.token) 
        // .get(  "http://122.13.2.38:8010/report/getTypes/v1.0?token=" + this.token )
        .get(  "/cloudform-cloudfilm/report/getTypes/v1.0?token=" + this.token )
        .then(response => {
          console.log(response);
          let list = response.data.data;
          this.menuList = this.menuList.filter(function(number) {
            for (let index in list) {
              if (number.type == list[index].type || number.type == "") {
                return number;
              }
            }
          });
        })
        .catch(error => console.log(error));
      this.$axios
        // .get(`http://192.168.121.62:8009/report/getReportList/v1.0?token=${this.token }`)
        // .get(`http://122.13.2.38:8010/report/getReportList/v1.0?token=${this.token }`)
        .get(`/cloudform-cloudfilm/report/getReportList/v1.0?token=${this.token}`)
        .then(response => {
          console.log(response);
          // this.reportList=response.data.data;
        })
        .catch(error => console.log(error));
    },
    handleChange(val) {
      for (let i = 0; i < this.reportList.length; i++) {
        if (this.reportList[i].reportIdentity == val[val.length - 1]) {
          console.log(this.reportList[i].patientName);
          this.$axios
            // .get(`http://192.168.121.62:8009/report/getReportToken/v1.0`, 
            // .get(`http://122.13.2.38:8010/report/getReportToken/v1.0`, 
              .get( "/cloudform-cloudfilm/report/getReportToken/v1.0",
              {
                params: {
                  token: this.token,
                  name: this.reportList[i].patientName
                }
              }
            )
            .then(response => {
              // console.log(response); 
              this.initQCode = `http://122.13.2.38:8008/html/report.html?token=${this.token}&reportToken=${
              // this.initQCode = `http://192.168.121.137:80/html/report.html?token=${this.token}&reportToken=${
                response.data.data
              }&reportId=`;
            })
            .catch(error => console.log(error));
        }
      }
    },
    handleClick(index, type) {
      this.num = index;
      let param = {
        type: type,
        token: this.token
        // telephone:'18825141019'
      };
      this.$axios
        // .get("http://192.168.121.62:8009/report/getReportList/v1.0",
        // .get("http://122.13.2.38:8010/report/getReportList/v1.0",
          .get("/cloudform-cloudfilm/report/getReportList/v1.0",
          {
            params: param
          }
        )
        .then(response => {
          // console.log(response);
          this.reportList = response.data.data;
          // for(let key of this.reportList ){
          //   console.log(key);
          // }
        })
        .catch(error => console.log(error));
    },
    show(a, b, c, d, e) {
      console.log(b);
    }
  }
};
</script>
 
<style scoped>
.navmenu {
  float: left;
}
.navmenu li {
  width: 120px;
  height: 100px;
  text-align: center;
  display: block;
  box-sizing: border-box;
}
.navmenu li p {
  color: #666;
  font-size: 14px;
  margin-top: -10px;
}
.navmenu li.active {
  background-color: #fff;
  border: 1px solid #ddd;
  border-right: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.content {
  margin-left: 119px;
  border: 1px solid #ddd;
  min-height: 600px;
  background-color: #fff;
  border-radius: 4px;
  padding: 30px;
  font-size: 14px;
}
.content-title {
  color: #0d64ae;
  font-weight: bold;
  margin-left: 30px;
}
.content-date {
  color: #0d64ae;
  margin-left: 15px;
}
.content-time {
  color: #999;
  font-size: 12px;
  margin-left: 5px;
}
.content-hospital {
  font-weight: bold;
  color: #333;
  margin-left: 30px;
}
.content-txt {
  padding: 30px;
}
.txt-title {
  font-weight: bold;
  text-align: right;
}
.QR-code {
  text-align: center;
  color: #999;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
.icon-yiyuan:before {
  vertical-align: middle;
  color: #057eff;
  margin-right: 5px;
}
#qrcode {
  height: 100px;
}
</style>