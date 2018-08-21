<template>
	<div class="container myPatient">
		<h1 class="top-title">我的患者：</h1>
		<el-form :inline="true" :model="searchForm" class="demo-form-inline mb20">
			<el-form-item label="患者姓名：">
				<el-input v-model="searchForm.name" placeholder = "患者姓名"></el-input>
			</el-form-item>
			<el-form-item label="电话号码：">
				<el-input v-model="searchForm.phoneNum" placeholder = "电话号码"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="searchList(1)">查询</el-button>
				<el-button  @click="getPatientList(1)" >重置</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" border style="width: 100%" @row-click="rowClick">
			<el-table-column type="index" label="序号" width = "70px" align = "center"></el-table-column>
			<el-table-column prop="patientName" label="姓名" width = "100px" align = "center"></el-table-column>
			<el-table-column  label="性别" width = "70px" align = "center">
				<template slot-scope="scope">
					{{scope.row.patientSex==1?"男":"女"}}
				</template>
			</el-table-column>
			<el-table-column prop="patientAge" label="年龄" width = "70px" align = "center"></el-table-column>
			<!--<el-table-column prop="patientId" label="身份证号" align = "center"></el-table-column>-->
			<el-table-column prop="checkPosition" label="检查部位" align = "center"></el-table-column>
			<el-table-column prop="checkType" label="检查类型" align = "center"></el-table-column>
			<el-table-column prop="receiveHospitalName" label="会诊医院" align = "center"></el-table-column>
			<el-table-column prop="receiveDoctorName" label="会诊医生" align = "center"></el-table-column>
			<el-table-column  label="状态" width = "100px" align = "center">
				<template slot-scope="scope">
					<span class="statu nocheck" v-if="scope.row.status==0">未申请</span>
					<span class="statu checking" v-else-if="scope.row.status==1">申请中</span>
					<span class="statu turnBack" v-else-if="scope.row.status==2">已退回</span>
					<span class="statu recieve" v-else-if="scope.row.status==3">会诊中</span>
					<span class="finished" v-else-if="scope.row.status==4">会诊完成</span>
					<!--<span v-else-if="scope.row.status==-1">撤回</span>-->
					<span class="statu recall" v-else>撤回</span>
				</template>
			</el-table-column>
			<el-table-column prop="status" label="操作" align = "center">
				<template slot-scope="scope">
			            <!--<el-button @click = "gotoreport"  type="text" size="medium">查看报告</el-button>-->
        				<!--<el-button @click = "makeConsultation" type="text" size="medium">发起会诊</el-button>-->
        				<el-button 
        					v-show="scope.row.status==1" 
        					@click.stop = "recallConsultation(scope.row.id)" 
        					type="text" 
        					size="mini"
        					class="iconfont icon-tuihui"
        					>撤回会诊</el-button>
        				<el-button 
        					v-show="scope.row.status==2" 
        					@click.stop = "checkReason(scope.row.id)" 
        					type="text" 
        					size="mini"
        					class = "iconfont icon-chakanbaogao1"
        					>查看原因</el-button>
        				<el-button 
        					v-show="scope.row.status==2" 
        					@click.stop = "makeConsultation(scope.row.localpid,scope.row.id)" 
        					type="text" 
        					size="mini"
        					class="iconfont icon-huizhen"
        					>继续发起</el-button>
        				<el-button 
        					v-show="scope.row.status==2" 
        					@click.stop = "recallConsultation(scope.row.id)" 
        					type="text" 
        					size="mini"
        					class="iconfont icon-tuihui"
        					>撤回</el-button>
        				<el-button 
        					v-show="(scope.row.type==1||scope.row.type==2)&&scope.row.status==4&&scope.row.reportStatus===1" 
        					@click.stop = "checkReport(scope.row.id,scope.row.localpid)" 
        					type="text" 
        					size="mini"
        					class="iconfont icon-chakanbaogao"
        					>查看报告</el-button>
        				<!--如果是跨院会诊-->
        				<el-button 
        					v-show="scope.row.type==3&&scope.row.status==4" 
        					@click.stop = "checkDiagnose(scope.row.id)" 
        					type="text" 
        					size="mini"
        					class="iconfont icon-chakanbaogao"
        					>查看会诊意见</el-button>
        				<el-button 
        					v-show="scope.row.type==3&&scope.row.status==4" 
        					@click.stop = "editReport(scope.row.id,scope.row.localpid,scope.row.type)" 
        					type="text" 
        					size="mini"
        					class="iconfont icon-tianxiebaogao1"
        					>编辑报告</el-button>
        				<el-button 
        					v-show="scope.row.type==3&&scope.row.status==4&&scope.row.reportStatus===1" 
        					@click.stop = "checkReport(scope.row.id,scope.row.localpid)" 
        					type="text" 
        					size="mini"
        					class="iconfont icon-chakanbaogao"
        					>查看报告</el-button>	
        				<!--<el-button 
        					disabled
        					v-show="(scope.row.type==1||scope.row.type==2)&&scope.row.status==4&&scope.row.reportStatus===-1" 
        					type="text" 
        					size="mini"
        					class="iconfont icon-chakanbaogao"
        					>暂无报告</el-button>
        				<el-button 
        					disabled
        					v-show="scope.row.type==3&&scope.row.status==4&&scope.row.reportStatus===-1" 
        					type="text" 
        					size="mini"
        					class="iconfont icon-chakanbaogao"
        					>暂无会诊意见</el-button>		-->
        				<el-button 
        					v-show="scope.row.status==3" disabled 
        					type="text" 
        					size="mini"
        					class = "iconfont icon-jianchayuyue"
        					>会诊中...</el-button>
			    </template>
			</el-table-column>
		</el-table>
		<el-pagination style="text-align:center;margin-top: 30px;" 
				@current-change="handleCurrentChange" 
				:current-page.sync="currentPage1" 
				:page-size="10" 
				layout="total, prev, pager, next,jumper" 
				:total="totalNumber">
		</el-pagination>
		<div class="clear"></div>
		
		<!--患者详情对话框-->
		<el-dialog title="会诊详情" :visible.sync="patientDetailIsVisible" width = "70%">
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
					<li><b>普通阅片：</b><i style="color:dodgerblue;font-size: 22px;cursor:pointer;" class="iconfont icon-wenjian" @click.stop = "pacsView(userList.studyUid)"></i></li>
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
				<el-button type="primary" @click="patientDetailIsVisible = false">关 闭</el-button>
			</div>
		</el-dialog> 
		
		<!--查看专家会诊意见-->
		<el-dialog title="诊断意见" :visible.sync="diagnoseFormVisible" width = "35%">
			<el-form :model="diagnoseForm">
				<el-form-item label="">
					<el-input type = "textarea" v-model="diagnoseForm.diagnose" ref="input" :rows="5"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="copyDiagnose">一键复制</el-button>
				<el-button @click="diagnoseFormVisible = false">关闭</el-button>
			</div>
		</el-dialog>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData:[],
				totalNumber:0,
				routerParam:"",
				currentPage1: 1, //默认页
				changePageType:"",//是否查询之后的换页 ，还是全部的换页
				patientDetailIsVisible:false,//患者详情
				diagnoseFormVisible:false,//专家会诊意见
				diagnoseForm:{
					diagnose:""
				},
				headerIsShow:false,
				userList:{},
				searchForm: {
					name: '',
					phoneNum: ''
				}
			}
		},
		methods: {
			searchList(pageNum) {
				if(this.searchForm.phoneNum==""&&this.searchForm.name==""){
					this.$message({
		            	type: 'error',
		           		message: '查询条件不能为空！'
			         });
					return
				}
				this.$axios.get(this.$api.myPatient.queryConsultation,{
//				this.$axios.get("http://192.168.121.91:2020/consultation/queryConsultation/v1.0",{
				    params:{
				      "page":pageNum,
				      "patientMobile":this.searchForm.phoneNum,
				      "patientName":this.searchForm.name,
				      "sendDoctor":sessionStorage.getItem("userId")
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
			getPatientList(pageNum){
				this.$axios.get(this.$api.myPatient.getPatientList,{
//				this.$axios.get("http://192.168.121.91:2020/consultation/myPatientList/v1.0",{
				    params:{
				      "page":pageNum,
				      "consultationSendDoctor":sessionStorage.getItem("userId")
			    	}
				}).then((res)=>{
//					console.log(res)
					this.tableData = res.data.data;
					this.totalNumber =res.data.pageCount;
					this.changePageType = "noSearch"
				})
				.catch((error)=>{
					console.log(error)
				})
			},
			handleCurrentChange(val) {//点击上下页回调
				if(this.changePageType = "noSearch"){
					this.getPatientList(val);
				}else{
					this.searchList(val)
				}
					
			},
			checkReport(consultationId,localpid){//查看报告					
				let {href} = this.$router.resolve({ path: '/report',query:{
					consultationId,
					localpid
				} });
   				window.open(href, '_blank');
			},
			checkReason(consultationId){//查看退回原因
				this.$axios.get(this.$api.myPatient.checkReason,{
//				this.$axios.get("http://192.168.121.91:2020/consultation/queryRemarks/v1.0",{
				    params:{
				      consultationId
			    	}
				}).then((res)=>{
					this.$alert(res.data, '退回原因', {
			          confirmButtonText: '确定',
			          callback: action => {}
			        });
					console.log(res)
				})
				.catch((error)=>{
					console.log(error)
				})
			},
			checkDiagnose(consultationId){//查看诊断意见
				this.diagnoseFormVisible = true;
				this.$axios.get(this.$api.myPatient.checkDiagnose, {
//				this.$axios.get("http://192.168.121.91:2020/consultation/queryDiagnosticOpinion/v1.0", {
						params:{
							consultationId
						}
					}).then((res) => {
						this.diagnoseForm.diagnose = res.data;
					})
					.catch((error) => {
						console.log(error)
					})
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
			copyDiagnose(){//诊断意见一键复制
			 	var Url = this.$refs.input.$el.children[0];
			        Url.select(); // 选择对象
			        try{
			            if(document.execCommand('Copy', false, null)){
							this.$message({
				            	type: 'success',
				           		message: '文本信息复制成功!'
			          		});
			          		this.diagnoseFormVisible = false;
			            } else{
			                //fail info
			            } 
			        } catch(err){
			            //fail info
			        }
			},
			makeConsultation(localpid,consultationId){//发起会诊
				let {href} = this.$router.resolve({ path: '/consultation',query:{
					localpid,
					consultationId
				} });
 				window.open(href, '_blank');
			},
			recallConsultation(id){//撤回会诊
				this.$confirm('确认要撤回此条会诊?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
			        this.$axios.get(this.$api.myPatient.recallConsultation,{
//			        this.$axios.get("http://192.168.121.91:2020/consultation/cancelConsultation/v1.0",{
			        	
			        	
			        	params:{
						"consultationId":id
						}
			        }).then((res)=>{
			        	this.getPatientList(1);
						this.$message({
			            	type: 'success',
			           		message: '撤回成功!'
			          	});
					})
			          
		        }).catch(() => {
//		          this.$message({
//		            type: 'info',
//		            message: '已取消删除'
//		          });          
		        });

			},
			rowClick(row, event, column){//单击某一行的时候 
				this.patientDetailIsVisible = true;
				this.userList=row;
				console.log(row)
				console.log(event);
				console.log(column); 
			},
			pacsView(studyUid){//阅片
				var url  = this.$api.pacsView+studyUid
				window.open(url,"_blank")
			}
		},
		mounted(){
			this.getPatientList(1);
			this.routerParam = this.$route.params.jump;
		},
		watch: {
		    "$route.params":function(to, from){
		    	this.getPatientList(1);
		    }
		} 
	}	
</script>

<style scoped>	
	/*我的患者操作按钮*/
	.myPatient .el-table .el-button {
		padding: 10px 2px;
	}
	
	.myPatient .el-table .el-button+.el-button{
		margin: 0;
	}
	
	/*患者详情弹窗*/
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
		/*color:#99a9bf*/
	}

	
</style>

