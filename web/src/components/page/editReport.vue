<template>
	<div class="home">
		<el-container>
			<!--页头-->
			<div class="header">
				<div class="logo">
					<img src="../../assets/img/lwlogo.png" alt="" />
					<p>医疗影像云平台</p>
				</div>
			</div>

			<div class="main">
				<div class="report">
					<!--报告头-->
					<div class="report_header">
						<div class="title">
							<p><i class="iconfont icon-cross"></i>{{reportInfo.hospitalName}}{{reportInfo.departmentID}}</p>
							<p>{{reportInfo.checkType}}检查报告</p>
						</div>
						<!--<div class="date">
							<p>ID:20180418</p>
							<p>登记日期：2018-04-18</p>
						</div>-->
					</div>
					<!--基本信息-->
					<div class="report_info">
						<ul>
							<li><b>姓名：</b>{{reportInfo.patientName}}</li>
							<li><b>性别：</b>{{reportInfo.patientSex}}</li>
							<li><b>年龄：</b>{{reportInfo.patientAge}}</li>
							<li><b>身份证号：</b>{{reportInfo.patientID}}</li>
							<li><b>电话：</b>{{reportInfo.patientMobile}}</li>
							<li><b>就诊日期：</b>{{reportInfo.visitTime}}</li>
							<li><b>就诊医院：</b>{{reportInfo.hospitalName}}</li>
							<li></li>
						</ul>
					</div>
					<!--报告详情-->
					<div class="report_detail">
						<div class="finding">
							<h5>检查所见：</h5>
							<!--<p>黏膜红白相间,白相为主,皱襞变平甚至消失,部分黏膜血管显露;可伴有黏膜颗粒或结节</p>-->
							<el-input
							  type="textarea"
							  :autosize="{ minRows: 4, maxRows: 8}"
							  placeholder="请输入相关内容"
							  v-model="findingText">
							</el-input>
						</div>
						<div class="diagnose">
							<h5>诊断意见：</h5>
							<!--<p>黏膜红白相间,白相为主,皱襞变平甚至消失,部分黏膜血管显露;可伴有黏膜颗粒或结节</p>-->
							<el-input
							  type="textarea"
							  :autosize="{ minRows: 5, maxRows: 10}"
							  placeholder="请输入相关内容"
							  v-model="diagnoseText">
							</el-input>
						</div>
					</div>
					<!--报告尾部-->
					<div class="report_footer">
						<ul>
							<li><b>填写报告医生：</b>{{currentLoginName}}</li>
							<li><b>会诊医生：</b>{{currentLoginName}}</li>
							<li><b>填写时间：</b>{{currentTime}}</li>
							<li><b>会诊时间：</b>{{reportInfo.consultationIdStartTime}}</li>
						</ul>
					</div>
				</div>

			</div>
			<div class="footer">
				 <el-button @click = 'makesureIssue' type="success">发布报告</el-button>
				 <el-button @click = 'saveReport' type="primary">暂存报告</el-button>
				 <el-button @click = 'handleClose' >关闭页面</el-button>
			</div>
		</el-container>

	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
	export default {
		data() {
			return {
				token:"",
				doctorId:"",
				consultationId:"",
				localpid:"",
				reportInfo:{},
				currentLoginHospitalName:sessionStorage.getItem("currentLoginHospitalName"),
				currentLoginName:sessionStorage.getItem("currentLoginName"),
				diagnoseText:"",
				findingText:"",
				currentTime:""//当前时间（暂存报告时间）
			}
		},
		mounted() {
			this.token = sessionStorage.getItem("loginToken");
			this.doctorId = sessionStorage.getItem("userId");
			this.consultationId = this.$route.query.consultationId;
			this.localpid = this.$route.query.localpid;
			this.formatTime();
			this.getReportInfo(this.consultationId,this.localpid,this.token);
		},
		methods: {
			makesureIssue(){
				this.$confirm('发布之后，对方发起医生将可以查看此报告, 是否继续?', '提示', {
		          confirmButtonText: '确定发布',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	this.issueReport();
		        }).catch(() => {});
			},
			issueReport(){
				this.$axios.post("/cloudform-imgconsultation/report/finishReport/v1.0?token="+this.token, {
//				this.$axios.post("http://192.168.121.91:2020/report/finishReport/v1.0?token="+this.token, {
						"consultationId":this.consultationId,
						"findings":this.findingText,
						"diagnostic":this.diagnoseText,
						"doctor":this.doctorId
				}).then((res) => {
					console.log(res)
					if(res.data.result){
						 this.$alert('报告发布成功，请返回页面查看', '发布成功：', {
								confirmButtonText: '确定',
								type: 'success',
								callback: action => { 
									window.close();
									if(this.$route.query.type==3){
										window.opener.location.replace(window.location.href.split("/#")[0]+"/#/home/myPatient/"+new Date().getTime());
									}else{
										window.opener.location.replace(window.location.href.split("/#")[0]+"/#/home/myConsultation/"+new Date().getTime());
									}

								}
							});
					}else{
						 this.$notify({
				          title: '失败',
				          position: 'bottom-right',
				          message: "发布报告失败，"+res.data.resultMsg,
				          type: 'error',
				          offset:70
				        });
						
//						this.$message({
//				          showClose: true,
//				          type: 'error',
//				          message: "保存失败，"+res.data.resultMsg
//				        });
					}
				})
				.catch((error) => {
					console.log(error)
				})
			},
			handleClose() {
				window.close();
			},
			saveReport(){
				this.$axios.post("/cloudform-imgconsultation/report/saveReport/v1.0?token="+this.token, {
//				this.$axios.post("http://192.168.121.91:2020/report/saveReport/v1.0?token="+this.token, {
						"consultationId":this.consultationId,
						"findings":this.findingText,
						"diagnostic":this.diagnoseText,
						"doctor":this.doctorId
				}).then((res) => {
					console.log(res)
					if(res.data.result){
						 this.$notify({
				          title: '成功',
				          position: 'bottom-right',
				          message: res.data.resultMsg,
				          type: 'success',
				          offset:70
				        });
						
//						this.$message({
//				          showClose: true,
//				          type: 'success',
//				          message: 
//				        });
					}else{
						 this.$notify({
				          title: '失败',
				          position: 'bottom-right',
				          message: "保存失败，"+res.data.resultMsg,
				          type: 'error',
				          offset:70
				        });
						
//						this.$message({
//				          showClose: true,
//				          type: 'error',
//				          message: "保存失败，"+res.data.resultMsg
//				        });
					}
				})
				.catch((error) => {
					console.log(error)
				})
			},
			getReportInfo(consultationId,localpid,token){//会诊医生查询报告信息
				this.$axios.get("/cloudform-imgconsultation/report/getNewReport/v1.0", {
//				this.$axios.get("http://192.168.121.91:2020/report/getNewReport/v1.0", {
					params: {
						consultationId,
						localpid,
						token
					}
				}).then((res) => {
					console.log(res)
				    this.reportInfo = res.data;
				    this.findingText=this.reportInfo.findings;
					this.diagnoseText = this.reportInfo.diagnostic;
				})
				.catch((error) => {
					console.log(error)
				})
			},
			formatTime(){
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth()+1;
				if(month<=9){
					month = "0"+month;
				}
				var day = date.getDate();
				if(day<=9){
					day = "0"+day;
				}
				var hour = date.getHours();
				if(hour<=9){
					hour = "0"+hour;
				}
				var minute = date.getMinutes();
				if(minute<=9){
					minute = "0"+minute;
				}
				var second = date.getSeconds();
				if(second<=9){
					second = "0"+second;
				}
				this.currentTime = year+'-'+month+'-'+day +'   '+ hour+':'+minute+':'+second
			},
			
		}

	}
</script>
<style scoped>
	body {
		position: relative;
		width: 100%;
		min-height: 100%;
	}
	.home {
		height: 100%;
	}
	/*header*/
	
	.header {
		background-color: #fff;
		padding: 15px;
		box-shadow: 0px 3px 6px 0px rgba(13, 99, 174, 0.1);
		z-index: 99;
		width: 100%;
	}
	
	.header .logo {
		width: 300px;
		float: left;
	}
	
	.header .logo img {
		vertical-align: middle;
		margin-bottom: 2px;
	}
	
	.header .logo p {
		display: inline-block;
		height: 30px;
		line-height: 30px;
		font-size: 22px;
		font-weight: 700;
	}
	

	/*页脚*/
	
	.footer {
		background-color: #fff;
		box-shadow: 0px -3px 6px 0px rgba(13, 99, 174, 0.1);
		color: #666;
		text-align: center;
		width: 100%;
		height: 70px;
		position: absolute;
		bottom: 0px;
		padding: 15px;
		box-sizing: border-box;
	}
	.footer .el-button{
		margin-left: 20px;
	}
		
	/*内容区域*/
	.main {
		position: absolute;
		top: 60px;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: auto;
		padding-bottom: 60px;
		
	}
	.report{
		width: 80%;
		height: 800px;
		background: #fff;
		margin: 30px auto 0;
		box-shadow: 0px 3px 6px 0px rgba(13, 99, 174, 0.1);
		box-sizing: border-box;
		padding: 20px;
		font-size: 14px;
	}	
	/*报告头*/
	.report_header	{
		height: 20%;
		border-bottom: 1px solid #e1e1e1;
		position: relative;
	}
	.report_header .title{
		text-align: center;
		margin-top: 20px;
	}
	.report_header .title p{
		font-size: 30px;
		color:#282828;
	}
	.report_header .title p:nth-child(1){
		color: #1b5e9e;
	}
	.report_header .title p i{
		font-size: 50px;
		color: red;
		vertical-align: -9px;
	}
	.report_header .date {
		width: 180px;
		position: absolute;
		right: 0;
		bottom: 10px;
		line-height: 1.6em;
	}
	
	/*基本信息*/
	.report_info	{
		height: 12%;
		border-bottom: 1px solid #e1e1e1;
		position: relative;
	}
	.report_info ul{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 100%;
		position: absolute;
		top:50%;
		margin-top: -29px;
	}
	.report_info ul li{
		width: 25%;
		padding: 5px 0;
	}
	
	/*报告详情*/
	.report_detail	{
		height: 56%;
		border-bottom: 1px solid #e1e1e1;
		padding: 15px 0;
		box-sizing: border-box;
	}
	.report_detail	p{
		text-indent: 25px;
		line-height: 25px;
		padding-top: 10px;
	}
	
	.report_detail .finding{
		height: 50%;
	}
	.report_detail .diagnose{
		height: 50%;
	}
	
	/*报告尾部*/
	.report_footer{
		height: 12%;
		position: relative;
	}
	.report_footer	ul{
		display: flex;
		width: 100%;
		justify-content: space-between;
		flex-wrap: wrap;
		position: absolute;
		top:50%;
		margin-top: -29px;
	}
	.report_footer	ul li{
		width: 50%;
		padding: 5px 0;
	}
	
</style>

<style>	
	.report_detail .el-textarea{
		padding:15px 50px;
		box-sizing: border-box;
	}
</style>