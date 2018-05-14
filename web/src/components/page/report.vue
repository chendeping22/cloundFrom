<template>
	<div class="report_home">
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
							<p>{{reportInfo.findings}}</p>
						</div>
						<div class="diagnose">
							<h5>诊断报告：</h5>
							<p>{{reportInfo.diagnostic}}</p>
						</div>
					</div>
					<!--报告尾部-->
					<div class="report_footer">
						<ul>
							<li><b>填写报告医生：</b>{{reportInfo.receiveDoctorName}}</li>
							<li><b>会诊医生：</b>{{reportInfo.receiveDoctorName}}</li>
							<li><b>填写时间：</b>{{reportInfo.endTime}}</li>
							<li><b>会诊时间：</b>{{reportInfo.consultationIdStartTime}}</li>
						</ul>
					</div>
				</div>

			</div>
			<div class="footer">
				 <el-button @click = 'handlePrint' type="primary">打印报告</el-button>
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
				reportInfo:{}
			}
		},
		mounted() {
			this.getReportInfo();
		},
		methods: {
			handlePrint() {
				console.log("打印");
				var printStr = document.getElementsByClassName("main")[0].innerHTML;
				var oldStr = document.body.innerHTML;
				document.body.innerHTML = printStr;
				window.print();
//				document.body.innerHTML = oldStr;
				window.location.reload()
			},
			handleClose() {
				window.close();
			},
			getReportInfo() {
				let id = this.$route.query.consultationId;
				let localpid = this.$route.query.localpid				
				this.$axios.get("/cloudform-imgconsultation/report/getReportInfo/v1.0", {
//				this.$axios.get("http://192.168.121.91:2020/report/getReportInfo/v1.0", {
					params: {
						"consultationId": id,
						"localpid":localpid,
						"token":sessionStorage.getItem("loginToken")
					}
				}).then((res) => {
					console.log(res);
					this.reportInfo = res.data
				})
				.catch((error) => {
					console.log(error)
				})
			}
		}

	}
</script>
<style scoped>
	body {
		position: relative;
		width: 100%;
		min-height: 100%;
	}
	.report_home {
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
		margin: 40px auto 0;
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