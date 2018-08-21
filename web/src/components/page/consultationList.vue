<template>
	<div class="container">
		<h1 class="top-title">会诊列表：</h1>
		<el-form :inline="true" :model="searchForm" class="demo-form-inline mb20">
			<el-form-item label="患者姓名：">
				<el-input v-model="searchForm.name" placeholder="患者姓名"></el-input>
			</el-form-item>
			<el-form-item label="电话号码：">
				<el-input v-model="searchForm.phoneNum" placeholder="电话号码"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="searchList(1)">查询</el-button>
				<el-button  @click="getConsultationList(1)" >重置</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" border style="width: 100%" @row-click="rowClick">
			<el-table-column type="index" label="序号" width = "70px" align = "center"></el-table-column>
			<el-table-column prop="patientName" label="姓名" width = "100px" align = "center"></el-table-column>
			<el-table-column label="性别" width = "80px" align = "center">
				<template slot-scope="scope">
					{{scope.row.patientSex==1?"男":"女"}}
				</template>
			</el-table-column>
			<el-table-column prop="patientAge" label="年龄" width = "80px" align = "center"></el-table-column>
			<el-table-column prop="checkPosition" label="检查部位" align = "center"></el-table-column>
			<el-table-column prop="checkType" label="检查类型" align = "center"></el-table-column>
			<el-table-column prop="visitTime" label="就诊日期" align = "center"></el-table-column>
			<!--<el-table-column prop="hospitalName" label="就诊医院" align = "center"></el-table-column>-->
			<el-table-column  label="状态" width = "100" align = "center">
				<template slot-scope="scope">
					<span class="statu recall">未开始</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="200" align = "center">
				<template slot-scope="scope">
			            <el-button @click.stop = "makeConsultation(scope.row.localpid,scope.row.id)"  type="primary" size="mini">发起会诊</el-button>
			            <el-button @click.stop = "removeConsultation(scope.row.localpid)"  size="mini"  type="danger" icon="el-icon-delete"></el-button>
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
		
		
		<el-dialog title="会诊详情" :visible.sync="dialogIsVisible" width = "70%">
			<div class="title">基本信息</div>
			<div class="baseInfo">
				<ul>
					<li><b>姓名：</b>{{userList.patientName}}</li>
					<li><b>性别：</b>{{userList.patientSex==1?"男":"女"}}</li>
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
				<el-button type="primary" @click="dialogIsVisible = false">关 闭</el-button>
			</div>
		</el-dialog> 
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData:[],
				totalNumber:1,
				currentPage1: 1, //默认页
				changePageType:"",
				headerIsShow:false,
				dialogIsVisible: false,
				userList:{},
				searchForm: {
					name: '',
					phoneNum: ''
				}
			}
		},
		methods: {
			searchList(pageNum) {//搜索查询
				if(this.searchForm.phoneNum==""&&this.searchForm.name==""){
					this.$message({
		            	type: 'error',
		           		message: '查询条件不能为空！'
			         });
					return
				}
				this.$axios.get(this.$api.consultationList.getConsultationList,{
				    params:{
				      "page":pageNum,
				      "patientMobile":this.searchForm.phoneNum,
				      "patientName":this.searchForm.name
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
			getConsultationList(num){
				this.$axios.get(this.$api.consultationList.getConsultationList,{
				    params:{
				      "hospitalId":sessionStorage.getItem("hospitalId"),
				      "page":num
			    	}
				}).then((res)=>{
					console.log(res)
					this.tableData = res.data.data;
					this.totalNumber =res.data.pageCount;
					this.changePageType = "noSearch";
				})
				.catch((error)=>{
					console.log(error)
				})
			},
			handleCurrentChange(val) {//点击上下页回调
				
				if(this.changePageType = "noSearch"){
					this.getConsultationList(val);
				}else{
					this.searchList(val)
				}
			},
			makeConsultation(localpid,consultationId){
				let {href} = this.$router.resolve({ path: '/consultation',query:{
					localpid,
					consultationId
				}});
				
 				window.open(href, '_blank');
			},
			removeConsultation(localpid){
				this.$confirm('删除后此会诊将不可见, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	 this.$axios.get(this.$api.consultationList.removeConsultation,{
			        	params:{
						"localpid":localpid
						}
			        }).then((res)=>{
			        	this.getConsultationList(1)
						this.$message({
			            	type: 'success',
			           		message: '删除成功!'
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
				this.dialogIsVisible = true;
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
			this.getConsultationList(1)
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
		/*color:#99a9bf*/
	}
	
</style>
<style>
	/*操作提示框*/
	.el-popover{
		min-width: 100px;
	}
	.el-dialog .el-table::before{
		height:0;
	}
	.el-dialog .el-table td{
		border: none;
	}
	/*.el-dialog__header {
    	border-bottom: 1px solid #ddd;
    	background: #f8fafd;
    	padding: 20px 20px 15px;
	}*/
</style>