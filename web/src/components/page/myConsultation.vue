<template>
	<div class="container myConsultation">
		<h1 class="top-title">我的会诊：</h1>
		<el-form :inline="true" :model="searchForm" class="demo-form-inline mb20">
			<el-form-item label="患者姓名：">
				<el-input v-model="searchForm.name" placeholder="患者姓名"></el-input>
			</el-form-item>

			<el-form-item label="发起医院：">
				<el-input v-model="searchForm.hospital" placeholder="发起医院"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="searchList(1)">查询</el-button>
				<el-button  @click="getConsultationList(1)" >重置</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" border style="width: 100%" @row-click="rowClick">
			<el-table-column type="index" label="序号" width="70px" align="center"></el-table-column>
			<el-table-column prop="patientName" label="姓名" width = "100px" align="center"></el-table-column>
			<el-table-column label="性别" width="70px" align="center">
				<template slot-scope="scope">
					{{scope.row.patientSex==1?"男":"女"}}
				</template>
			</el-table-column>
			<el-table-column prop="patientAge" label="年龄" width="70px" align="center"></el-table-column>
			<el-table-column prop="checkPosition" label="检查部位" align="center"></el-table-column>
			<el-table-column prop="checkType" label="检查类型" align="center"></el-table-column>
			<el-table-column prop="startTime" label="申请日期" align="center"></el-table-column>
			<!--<el-table-column prop="endTime" label="结束日期" align = "center"></el-table-column>-->
			<el-table-column prop="hospitalName" label="发起医院" align="center"></el-table-column>
			<el-table-column prop="visitDoctor" label="发起医生" align="center"></el-table-column>
			<el-table-column label="状态" width="100px" align="center">
				<template slot-scope="scope">
					<span class="statu nocheck" v-if="scope.row.status==0">未申请</span>
					<span class="statu checking" v-else-if="scope.row.status==1">待接收</span>
					<span class="statu turnBack" v-else-if="scope.row.status==2">退回</span>
					<span class="statu recieve" v-else-if="scope.row.status==3">会诊中</span>
					<span class="finished" v-else-if="scope.row.status==4">会诊完成</span>
					<span class="statu recall" v-else>撤回</span>
				</template>
			</el-table-column>
			<el-table-column prop="status" label="操作" align="center">
				<template slot-scope="scope">
					<!--<el-popover trigger="hover" placement="left">-->
					<el-button @click.stop="operateConsultation(3,scope.row.id)" v-show="scope.row.status==1" class="iconfont icon-jieshou1" type="text" size="mini">接收</el-button>
					<el-button @click.stop="turnback(scope.row.id)" v-show="scope.row.status==1" class="iconfont icon-tuihui" type="text" size="mini">退回</el-button>
					<!--<el-button v-show="scope.row.status==3" @click.stop="finishConsultation(scope.row.id)" class="iconfont icon-huizhen" type="text" size="mini">点击完成会诊</el-button>-->
					<el-button v-show="(scope.row.type==1||scope.row.type==2)&&scope.row.status==3" @click.stop="editReport(scope.row.id,scope.row.localpid,scope.row.type)" class="iconfont icon-tianxiebaogao1" type="text" size="mini">编辑报告</el-button>
					<el-button v-show="(scope.row.type==1||scope.row.type==2)&&scope.row.status==4" @click.stop="editReport(scope.row.id,scope.row.localpid,scope.row.type)" class="iconfont icon-tianxiebaogao1" type="text" size="mini">继续编辑报告</el-button>
					
					<el-button v-show="scope.row.type==3&&scope.row.status==3" @click.stop="editDiagnose(scope.row.id)" class="iconfont icon-tianxiebaogao1" type="text" size="mini">编辑诊断意见</el-button>
					<el-button v-show="scope.row.type==3&&scope.row.status==4" @click.stop="queryDiagnose(scope.row.id)" class="iconfont icon-tianxiebaogao1" type="text" size="mini">继续编辑意见</el-button>
					
					<!--<el-button v-show="(scope.row.type==1||scope.row.type==2)&&scope.row.reportStatus==1" class="iconfont icon-jieshou" type="text" size="mini" disabled>报告已发布</el-button>-->
					<!--<el-button v-show="scope.row.type==3&&scope.row.reportStatus==1" class="iconfont icon-jieshou" type="text" size="mini" disabled>意见已发布</el-button>-->
					<!--<div slot="reference" class="name-wrapper">
			            <i style="font-size: 20px;color: #56a3f0;font-weight: 700;" class='iconfont icon-gengduo2'></i>
			          </div>-->
					<!--</el-popover>-->
				</template>
			</el-table-column>
		</el-table>
		<el-pagination style="text-align:center;margin-top: 30px;" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="10" layout="total, prev, pager, next,jumper" :total="totalNumber">
		</el-pagination>
		<div class="clear"></div>

		<!--确认退回对话框-->
		<el-dialog title="编辑取消原因" :visible.sync="dialogFormVisible" width = "35%">
			<el-form :model="rejectReasonForm">
				<!--<el-form-item label="活动名称">
					<el-input v-model="rejectReasonForm.name" auto-complete="off"></el-input>
				</el-form-item>-->
				<el-form-item label="">
					<el-input type = "textarea" v-model="rejectReasonForm.reason" placeholder="请填写原因" :rows="5"></el-input>
					<!--<el-select v-model="rejectReasonForm.reason" placeholder="请选择">
						<el-option v-for = "(item,index) in reasonList" :key = "index" :label="item.label" :value="item.value"></el-option>
					</el-select>-->
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="operateConsultation(2,dialogFormVisible,rejectReasonForm.reason)">确定退回</el-button>
			</div>
		</el-dialog>
		
		<!--跨院会诊--编辑会诊意见-->
		<el-dialog title="编辑诊断意见" :visible.sync="editDiagnoseFormVisible" width = "35%">
			<el-form :model="diagnoseForm">
				<el-form-item label="">
					<el-input type = "textarea" v-model="diagnoseForm.diagnose" placeholder="请编辑诊断意见" :rows="5"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editDiagnoseFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="sendDiagnose(diagnoseForm.diagnose)">发送</el-button>
			</div>
		</el-dialog>
		
		<!--会诊详情对话框-->
		<el-dialog :visible.sync="dialogIsVisible" width = "70%">   
			<div slot="title" >  
				<span>会诊详情：</span>
				<button type="button" aria-label="Close" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button>
			</div> 
			<div class="title">基本信息</div>
			<div class="baseInfo">
				<ul>
					<li><b>姓名：</b>{{userList.patientName}}</li>
					<li><b>性别：</b>{{userList.patientSex==1? '男' : '女'}}</li>
					<li><b>年龄：</b>{{userList.patientAge}}</li>
					<li><b>身份证号：</b>{{userList.patientId}}</li>
					<li><b>电话：</b>{{userList.patientMobile}}</li>
					<li><b>就诊医院：</b>{{userList.hospitalName}}</li>
					<li><b>就诊日期：</b>{{userList.visitTime}}</li>
					<li></li>
				</ul>
			</div>

			<div class="title">阅片信息</div>
			<div class="pacsInfo">
				<ul>
					<li><b>普通阅片：</b><i style="color:dodgerblue;font-size: 20px;" class="iconfont icon-wenjian" @click.stop = "pacsView(userList.studyUid)"></i></li>
					<li><b>检查类型：</b>{{userList.checkType}}</li>
					<li><b>检查部位：</b>{{userList.checkPosition}}</li>
					<li><b>检查时间：</b>{{userList.studyTime}}</li>
				</ul>
			</div>

			<div class="title">就诊医生</div>
			<div class="doctorInfo">
				<ul>
					<li><b>姓名：</b>{{userList.visitDoctor}}</li>
					<li><b>科室：</b>{{userList.departmentID}}</li>
					<li><b>就诊时间：</b>{{userList.visitTime}}</li>
					<li></li>
				</ul>
			</div>

			<div slot="footer" class="dialog-footer"> 
				<el-button type="primary" @click="dialogIsVisible = false">关 闭</el-button>
			</div>
		</el-dialog> 
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogFormVisible:false,//编辑退回会诊原因
				dialogIsVisible:false,//会诊详情
				editDiagnoseFormVisible:false,//跨院会诊，编辑诊断意见
				userList:{},
				isReload:sessionStorage.getItem("isReload"),
				reasonList:[
					{label:"原因1",value:"原因1"},
					{label:"原因2",value:"原因2"},
					{label:"原因3",value:"原因3"},
					{label:"原因4",value:"原因4"}
				],
				consultationId:'',//会诊id
				tableData: [],
				totalNumber: 0,
				currentPage1: 1, //默认页
				changePageType:"",//是否搜索
				rejectReasonForm:{
					reason:''
				},
				diagnoseForm:{//诊断意见
					diagnose:''
				},
				searchForm: {//搜索框
					name: '',
					hospital: ''
				}
			}
		},
		methods: {
			searchList(pageNum) {//搜索查询
				if(this.searchForm.hospital==""&&this.searchForm.name==""){
					this.$message({
		            	type: 'error',
		           		message: '查询条件不能为空！'
			         });
					return
				}
				this.$axios.get(this.$api.myConsultation.searchList,{
				    params:{
				      "page":pageNum,
				      "hospitalName":this.searchForm.hospital,
				      "patientName":this.searchForm.name,
				      "receiveDoctor":sessionStorage.getItem("userId")
			    	}
				}).then((res)=>{
					console.log(res)
					this.tableData = res.data.data;
					this.totalNumber =res.data.pageCount;
					this.changePageType = "doSearch"
				})
				.catch((error)=>{
					console.log(error)
				})
			
			},
			getConsultationList(pageNum) {
				this.$axios.get(this.$api.myConsultation.getConsultationList, {
//				this.$axios.get("http://192.168.121.91:2020/consultation/myConsultationList/v1.0", {
						params: {
							"page": pageNum,
							"consultationReceiveDoctor": sessionStorage.getItem("userId")
						}
					}).then((res) => {
						console.log(res)
						this.tableData = res.data.data;
						this.totalNumber = res.data.pageCount;
						this.changePageType = "noSearch"
					})
					.catch((error) => {
						console.log(error)
					})
			},
			handleCurrentChange(val) { //点击上下页回调
				
				if(this.changePageType = "noSearch"){
					this.getConsultationList(val);
				}else{
					this.searchList(val)
				}
			},
			editReport(consultationId,localpid,type) { //填写报告
				let {href} = this.$router.resolve({
					path: '/editReport',query:{
						consultationId,
						localpid,
						type
					}
				});
				window.open(href, '_blank');
			},
			editDiagnose(consultationId){//跨院专家填写诊断意见
				this.editDiagnoseFormVisible = true;
				this.consultationId = consultationId;
			},
			queryDiagnose(consultationId){
				this.editDiagnoseFormVisible = true;
				this.consultationId = consultationId;
				this.$axios.get(this.$api.myConsultation.queryDiagnose, {
//				this.$axios.get("/cloudform-imgconsultation/consultation/finishConsultation/v1.0", {
//				this.$axios.get("http://192.168.121.91:2020/consultation/queryDiagnosticOpinion/v1.0", {
						params:{
							"consultationId":this.consultationId
						}
					}).then((res) => {
						this.diagnoseForm.diagnose = res.data;
					})
					.catch((error) => {
						console.log(error)
					})
			},
			sendDiagnose(text){
				if(text!=""){
					this.$confirm('确认发送诊断意见?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$axios.post(this.$api.myConsultation.saveDiagnosticOpinion, {
//						this.$axios.post("http://192.168.121.91:2020/consultation/saveDiagnosticOpinion/v1.0", {
								"id": this.consultationId,
								"diagnosticOpinion":text
							}).then((res) => {
								if(res.data.result){
									this.getConsultationList(1);
									this.$message({
										type: 'success',
										message: '发送成功!对方将接收到你的宝贵意见'
									});
									this.editDiagnoseFormVisible = false;
								}else{
									this.$message({
										type: 'error',
										message: '发送失败，请稍后再试!'
									});
								}
								
								
							})
							.catch((error) => {
								this.$message({
									type: 'error',
									message: '发送失败，请稍后再试!'
								});
							})
					}).catch(() => {});

				}else{
					this.$message({
						type: 'error',
						message: '诊断意见不能为空!'
					});
				}
			},
			operateConsultation(type, id,reason) {//接受或者退回会诊

				if(type === 3) {
					this.$confirm('确认接收此会诊?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$axios.post(this.$api.myConsultation.refuseOrReceiveConsultation, {
//						this.$axios.post("http://192.168.121.91:2020/consultation/refuseOrReceiveConsultation/v1.0", {
								"consultationId": id,
								"type": type,
								"refuseMessage": ""
							}).then((res) => {
								this.getConsultationList(1);
								this.$message({
									type: 'success',
									message: '接收成功!'
								});
							})
							.catch((error) => {
								console.log(error)
							})
					}).catch(() => {});

				} else {
					if(reason!=""){
						this.$axios.post(this.$api.myConsultation.refuseOrReceiveConsultation, {
//						this.$axios.post("http://192.168.121.91:2020/consultation/refuseOrReceiveConsultation/v1.0", {
								"consultationId": this.consultationId,
								"type": type,
								"refuseMessage": reason
							}).then((res) => {
								this.dialogFormVisible = false;
								if(res.data.result){
									this.getConsultationList(1);
									this.$message({
										type: 'success',
										message: '退回成功!'
									});
								}else{
									this.$message({
										type: 'error',
										message: '退回失败，请稍后再试!'
									});
								}
								
							}).catch((error) => {
								console.log(error)
						})
					}else{
							this.$message({
								type: 'error',
								message: '请填写退回的原因!'
							});
						}
					
				}

			},
			finishConsultation(id){//完成会诊
				this.$confirm('确认完成此会诊?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$axios.get(this.$api.myConsultation.finishConsultation, {
//						this.$axios.get("http://192.168.121.91:2020/consultation/finishConsultation/v1.0", {
								params:{
								"consultationId": id
								}
							}).then((res) => {
								this.getConsultationList(1);
								this.$message({
									type: 'success',
									message: '完成会诊!'
								});
							})
							.catch((error) => {
								console.log(error)
							})
					}).catch(() => {});
			},
			turnback(id){//退回会诊
				this.consultationId = id;
				this.dialogFormVisible = true;
			},
			rowClick(row, event, column){//单击某一行的时候 
				this.dialogIsVisible = true;
				this.userList=row;
			},
			pacsView(studyUid){//阅片
				var url  = this.$api.pacsView+studyUid
				window.open(url,"_blank")
			}
			
		},
		mounted() {
			this.getConsultationList(1); 
		},
		watch: {//监控路由参数的变化
		    "$route.params":function(){
		    	console.log(this.routerParam )
		    	this.getConsultationList(1);
		    }
		} 
	}
</script>

<style scoped>
	
	/*会诊详情*/
	.title {
		border-bottom: 1px solid #e1e1e1;
		font-size: 16px;
		padding: 10px 0 10px;
		font-weight: 700;

	}
	
	.baseInfo ul,
	.pacsInfo ul,
	.doctorInfo ul{
		display: flex;
		flex-wrap: wrap;
		margin: 15px 20px;
	}
	
	.baseInfo ul li,
	.pacsInfo ul li,
	.doctorInfo ul li{
		width:25%;
	}
</style>
<style>
	/*操作提示框*/
	/*.el-popover{
		min-width: 100px;
	}*/
	
	.myConsultation .el-table .el-button {
		padding: 10px 5px;
	}
	
	.myConsultation .el-table .el-button+.el-button{
		margin: 0;
	}
	
	.myConsultation .el-dialog__body{
		padding: 10px 20px;
	}
</style>