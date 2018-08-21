<template>
	<div class="consultation">
		<el-container>
			<!--页头-->
			<div class="header">
				<div class="logo">
					<img src="../../assets/img/lwlogo.png" alt="" />
					<p>医疗影像云平台</p>
				</div>
			</div>

			<div class="main">
				<div class="cons">
					<!--基本信息-->
					<div class="cons_info">
						<div class="title">基本信息</div>
						<div class="info">
							<ul>
								<li><b>姓名：</b>{{data.patientName}}</li>
								<li><b>性别：</b>{{data.patientSex==1?"男":"女"}}</li>
								<li><b>年龄：</b>{{data.patientAge}}</li>
								<li><b>身份证号：</b>{{data.patientID}}</li>
								<li><b>电话：</b>{{data.patientMobile}}</li>
								<li><b>就诊日期：</b>{{data.visitTime}}</li>
								<li><b>就诊医院：</b>{{data.hospitalName}}</li>
								<li></li>
							</ul>
						</div>
					</div>
					<!--影像信息-->
					<div class="cons_pacs">
						<div class="title">影像信息</div>
						<div class="pacs">
							<ul>
								<li><b>普通阅片：</b><i style="color:dodgerblue;font-size: 20px;" class="iconfont icon-wenjian" @click.stop = "pacsView(data.studyUid)"></i></li>
								<li><b>检查类型：</b>{{data.checkType}}</li>
								<li><b>检查部位：</b>{{data.checkPosition}}</li>
								<li><b>检查时间：</b>{{data.studyTime}}</li>
							</ul>
						</div>
					</div>
					<!--问题描述-->
					<div class="cons_describe" style="display: flex;flex-direction: column;">
						<div class="title" style="height: 32px;box-sizing: border-box;">临床诊断</div>
						<!--<el-tooltip  class="item" effect="dark" :content="data.clinicDiaedit" placement="top">-->
						<div class="describe">{{data.clinicDiaedit}}擅长于眼表疾病、视神经疾病、眼睑及眼部整形美容。擅长于眼表疾病、视神经疾病、眼睑及眼部整形美容。擅长于眼表疾病、视神经疾病、眼睑及眼部整形美容。擅长于眼表疾病、视神经疾病、眼睑及眼部整形美容。擅长于眼表疾病、视神经疾病、眼睑及眼部整形美容。擅长于眼表疾病、视神经疾病、眼睑及眼部整形美容。擅长于眼表疾病、视神经疾病、眼睑及眼部整形美容。擅长于眼表疾病、视神经疾病、眼睑及眼部整形美容。</div>
    					<!--</el-tooltip>-->

					</div>
					
					<!--医生选择-->
					<div class="cons_choose">
						<div class="title">选择医生</div>
						<div class="query">
							<el-form :inline="true" :model="queryForm" ref = "queryForm" class="demo-form-inline mb20">
									<el-form-item label="医院" prop = "hospital">
										<el-select v-model="queryForm.hospital" @focus.once = "getHospital">
											<el-option label="全部" value=""> </el-option>
											<el-option v-for = "item in hospital" :key = "item.id" :label="item.name" :value="item.id"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="职称" prop = "role">
										<el-select  v-model="queryForm.role" @focus.once = "getDepartment">
											<el-option label="全部" value=""></el-option>
											<el-option v-for = "(item,index) in department" :key = "index" :label="item.name" :value="item.value"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="姓名" prop = "name">
										<el-input v-model="queryForm.name"></el-input>
									</el-form-item>
									<el-form-item>
										<el-button type="primary" @click="searchDoctor(1)">查询</el-button>
										<el-button @click="resetForm('queryForm')">重置</el-button>
									</el-form-item>
							</el-form>
						</div>
						<div class="list">
							<el-row :gutter="12">
								
								<el-col v-for = "(item,index) in doctorList" :key = "item.userId" :span="6">
									<el-card @click.native = "chooseDoctor(item.userId,item.name)" v-bind:class="{ active: item.userId===elCardIsActive}" shadow="hover">
										<div class="doctor_card">
											<span class="name">{{item.name}}</span>
											<span style="font-weight: 400;margin-left: 15px;" class="hospital">{{item.hospitalName}}</span>
										</div>
										<div class="roleInDep">
											<span class="role">{{item.title}}</span>
											<span class="department">{{item.departmentName}}</span>
										</div>
										<el-tooltip  class="item" effect="dark" :content="item.beGoodAt" placement="bottom">
      										<div class="introduce"><b>擅长：</b>{{item.beGoodAt}}</div>
    									</el-tooltip>
									</el-card>
								</el-col>
								
							</el-row>
							<el-pagination style="text-align:center;margin-top: 20px;" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="4" layout="total, prev, pager, next,jumper" :total="totalNumber">
							</el-pagination>
						</div>
					</div>
				</div>

			</div>
			<div class="footer">
				<el-button @click='makesureMakeConsulation()' type="primary">发起会诊</el-button>
				<el-button @click='handleClose'>关闭页面</el-button>
			</div>
		</el-container>

	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
	export default {
		data() {
			return {
				currentPage1: 1,
				totalNumber: 0,
				receiveDoctorId:'',//接收会诊医生id
				receiveDoctorName:'',
				localPid:'',
				data:{},
				hospital:{},
				elCardIsActive:'',
				department:[],
				doctorList:[],
				queryForm: {
					hospital: '',
					role: '',
					name: ''
				}
			}
		},
		mounted() {
       		this.localpid = this.$route.query.localpid;
       		this.getPatientInfo(this.localpid);
       		this.searchDoctor(1);//默认查询第一页
		},
		methods: {
			searchDoctor(num) {//查询医生列表
//				this.$axios.post("http://192.168.121.91:2020/consultation/searchDoctor/v1.0", {
				this.$axios.post(this.$api.consultation.searchDoctor, {
					  "userId":sessionStorage.getItem("userId"),
					  "userType":sessionStorage.getItem("roleId"),
			          "hospital":this.queryForm.hospital==""?sessionStorage.getItem("hospitalId"):this.queryForm.hospital,
			          "title":this.queryForm.role,//选择职称value
			          "name":this.queryForm.name,//搜索姓名
					  "page":num
					}).then((res) => {
						this.doctorList = res.data.data;
						this.totalNumber = res.data.pageCount;
					})
					.catch((error) => {
						console.log(error)
					})
			},
			resetForm(formName){//重置
				this.$refs[formName].resetFields();
				this.searchDoctor(1);//默认查询第一页
			},
			makesureMakeConsulation(){//确定发起会诊
				if(this.receiveDoctorId != ""){
					this.$confirm('确认向 < '+this.receiveDoctorName+' > 医生发起此次会诊？', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			        	this.makeConsultation();
			        }).catch(() => {});
				}else{
					this.$alert("请选择接收会诊医生", '发起失败：', {
						confirmButtonText: '确定',
						type:'error'
					});
				}

			},
			makeConsultation() { //发起会诊
				this.$axios.post(this.$api.consultation.makeConsultation, {
					  "sendDoctorId":sessionStorage.getItem("userId"),
					  "receiveDoctorId":this.receiveDoctorId,
			          "localpid":this.localPid,
			          "consultationId":this.$route.query.consultationId,
			          "sendHospitalId":sessionStorage.getItem("hospitalId"),
			          "userType":sessionStorage.getItem("roleId"),
					}).then((res) => {
					  if(res.data.result){ 
							this.$alert('发起会诊成功，请到“我的患者”页面查看', '发起成功：', {
								confirmButtonText: '确定',
								type:"success",
								callback: action => {
									window.close();
									window.opener.location.replace(window.location.href.split("#")[0]+"#/home/myPatient/"+new Date().getTime());
								}
							});
						}else{
							this.$alert("发起失败，请稍后再试", '发起失败：', {
								confirmButtonText: '确定',
								type:'error'
							});
						}
					})
					.catch((error) => {
						console.log(error)
					})
				
			},
			handleClose() { //关闭页面
				window.close();
			},
			getPatientInfo(localpid) {
				this.$axios.get(this.$api.consultation.getPatientInfo, {
						params: {
							"localpid": localpid
						}
					}).then((res) => {
						this.data = res.data;
					})
					.catch((error) => {
						console.log(error)
					})
			},
			getHospital(){
				this.$axios.get(this.$api.consultation.getHospital, {
						params: {
							"userType":sessionStorage.getItem("roleId"),
							"hospitalId":sessionStorage.getItem("hospitalId")
						}
					}).then((res) => {
						console.log(res)
						this.hospital = res.data;
						console.log(this.hospital)
					})
					.catch((error) => {
						console.log(error)
					});
				
			},
			getDepartment(){
				this.$axios.get(this.$api.consultation.getDepartment).then((res) => {
						this.department = res.data;
						console.log(this.department)
					})
					.catch((error) => {
						console.log(error)
					});	
			},
			handleCurrentChange(val) { //点击上下页回调
				this.searchDoctor(val);
			},
			chooseDoctor(userId,name){//点击医生列表选中医生
				this.elCardIsActive = userId;
				this.receiveDoctorName = name;
				this.receiveDoctorId = userId;
			},
			pacsView(studyUid){//阅片
				var url  = this.$api.pacsView+studyUid;
				window.open(url,"_blank")
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
	
	.consultation {
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
	
	.footer .el-button {
		margin-left: 20px;
	}
	
	
	/*内容区域*/
	
	.main {
		position: absolute;
		top: 60px;
		left: 0;
		right: 0;
		bottom: 60px;
		overflow: auto;
	}
	
	.cons {
		width: 80%;
		height: 800px;
		background: #fff;
		margin: 40px auto;
		box-shadow: 0px 3px 6px 0px rgba(13, 99, 174, 0.1);
		box-sizing: border-box;
		padding: 30px 20px;
	}
	
	.cons_info,
	.cons_choose,
	.cons_describe,
	.cons_pacs{
		font-size: 14px;
	}
	
	.title {
		border-bottom: 1px solid #e1e1e1;
		padding: 0 0 10px;
		font-weight: 700;
		font-size: 15px;
	}
	
	/*第1部分：基本性息*/
	
	.cons_info {
		height: 18%;
	}
	
	.cons_info .info,
	.cons_pacs .pacs {
		padding: 10px 40px;
	}
	
	.cons_info .info ul,
	.cons_pacs .pacs ul {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 100%;
	}
	.cons_info .info p{
		line-height: 29px;
	}
	
	.cons_info .info ul li,
	.cons_pacs .pacs ul li {
		width: 25%;
		padding: 5px 0;
	}
	/*第2部分：影像信息*/
	
	.cons_pacs {
		height: 14%;
	}
	
	/*第3部分：选择医生*/
	
	.cons_choose {
		height: 50%;
	}
	
	.cons_choose .query {
		margin: 15px 40px 15px;
		border-bottom: 1px dashed #e1e1e1;
	}
	
	.cons_choose .list {
		margin: 0 40px 5px;
	}
	
	.cons_choose .list  .active{
		border: 1px solid #057efb;
   		-webkit-box-shadow: 0 2px 12px 0 rgba(5,126,251,.6);
    	box-shadow: 0 2px 12px 0 rgba(5,126,251,.6);
	}
	.cons_choose .doctor_card{
		margin-bottom: 12px;
	}
	.cons_choose .doctor_card .name{
		font-weight: 700;
	}
	.cons_choose .roleInDep{
		color:#9c9c9c;
		font-size: 14px;
		margin-bottom: 12px;
	}
	.cons_choose .roleInDep .role{
		padding-right: 12px;
		margin-right: 10px;
		border-right: 1px solid #9c9c9c;
	}
	.cons_choose  .introduce{
		font-size: 14px;
		height:80px;
		/*显示两行*/
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
	}
	
	
	/*第4部分：问题描述*/	
	.cons_describe {
		height: 18%;
	}
	
	.cons_describe .describe{
		/*text-indent: 2em;*/
		box-sizing: border-box;
		margin: 15px 40px;
		height:60px;
		/*显示多行*/
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}
</style>
<style>
	/*修改医生列表盒子*/
	.el-card__body{
		padding:10px;
	}
	/*查询医生*/
	.consultation .main .el-input__inner {
		height: 34px;
		line-height: 34px;
	}
	.consultation .main .el-button{
		padding:8px 20px;
	}
	.consultation .el-input__inner {
		height: 34px;
		line-height: 34px;
	}
	
	.el-form-item {
    	margin-bottom: 15px;
	}
	.el-tooltip__popper.is-dark {
		/*border:none;
	    background: rgba(5,126,255,0.5);
	    color: #fff;*/
	    font-size: 14px;
	    line-height: 20px;
	    width:300px;
	}  
	.list .el-card{
		cursor: pointer;
	}
</style>