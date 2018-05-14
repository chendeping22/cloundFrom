<template>
	<div class="container expertExamine">
		<h1 class="top-title">专家审核：</h1>
		<el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline mb20">
			
			<el-form-item label="区域归属" prop = "area">
				<el-select v-model="searchForm.area" @change = "queryHospital" placeholder="请选择所属区域归属"  @focus.once="getDict('dict_area')">
					<el-option label="全部" value=""></el-option>
					<el-option :label="item.name" :value="item.value" v-for="item in areaList" :key="item.name"></el-option>  
				</el-select>
			</el-form-item> 

			<el-form-item label="医院名称："  prop = "hospital">
				<el-autocomplete
					value-key="name"
				  v-model="searchForm.hospital"
				  :fetch-suggestions="querySearch"
				  placeholder="请输入医院名称"
				></el-autocomplete>
			</el-form-item>
			
			<el-form-item label="专家姓名：" prop = "name">
				<el-input v-model="searchForm.name" placeholder="请输入专家姓名"></el-input>
			</el-form-item>
			
			<el-form-item>
				<el-button type="primary" @click="getExpertList(1,searchForm.area,searchForm.hospital,searchForm.name)">查询</el-button>
				<el-button  @click="resetForm('searchForm')" >重置</el-button>
			</el-form-item>
		</el-form>
		
		<el-table :data="tableData" border style="width: 100%" @row-click="rowClick">
			<el-table-column type="index" label="序号" width="70px" align="center"></el-table-column>
			<el-table-column prop="name" label="姓名" width = "100px" align="center"></el-table-column>
			<el-table-column label="性别" width="70px" align="center">
				<template slot-scope="scope">
					{{scope.row.patientSex==1?"男":"女"}}
				</template>
			</el-table-column>
			<el-table-column prop="age" label="年龄" width="70px" align="center"></el-table-column>
			<!--<el-table-column prop="username" label="手机号码" align="center"></el-table-column>-->
			<el-table-column prop="titleName" label="职称" align="center"></el-table-column>
			<el-table-column prop="department" label="科室" align="center"></el-table-column>
			<el-table-column prop="hospitalName" label="所属医院" align="center"></el-table-column>
			<el-table-column prop="synopsis" label="简介" align="center" :show-overflow-tooltip="overflow"></el-table-column>
			<el-table-column prop="beGoodAt" label="擅长领域" align="center" :show-overflow-tooltip="overflow"></el-table-column>
			<el-table-column label="状态" width="100px" align="center">
				<template slot-scope="scope">
					<span class="statu turnBack" v-if="scope.row.status==0">未审核</span>
					<span class="statu recieve" v-else-if="scope.row.status==1">已通过</span>
					<span class="statu turnBack" v-else>退回</span>
				</template>
			</el-table-column>
			<el-table-column prop="status" label="操作" align="center">
				<template slot-scope="scope">
					<el-button class="iconfont icon-chakanbaogao1" type="text" size="medium">查看详情</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination style="text-align:center;margin-top: 30px;" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="10" layout="total, prev, pager, next,jumper" :total="totalNumber">
		</el-pagination>
		<div class="clear"></div>

		<!--确认退回对话框-->
		<el-dialog title="请填写驳回原因" :visible.sync="dialogFormVisible" width = "35%">
			<el-form :model="rejectReasonForm">
				<!--<el-form-item label="活动名称">
					<el-input v-model="rejectReasonForm.name" auto-complete="off"></el-input>
				</el-form-item>-->
				<el-form-item label="">
					<el-input type = "textarea" v-model="rejectReasonForm.reason" placeholder="请填写原因" :rows="3"></el-input>
					<!--<el-select v-model="rejectReasonForm.reason" placeholder="请选择">
						<el-option v-for = "(item,index) in reasonList" :key = "index" :label="item.label" :value="item.value"></el-option>
					</el-select>-->
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="rejectApply(userList.username,-1,rejectReasonForm.reason)">确定退回</el-button>
			</div>
		</el-dialog>
		
		<!--会诊详情对话框-->
		<el-dialog  
		:visible.sync="dialogIsVisible" >   
			<div slot="title" >  
				<span>用户详细信息</span>
				<button type="button" aria-label="Close" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button>
			</div> 
			<div class="mes-box">
				<el-row>
					<el-col :span="20"> 
						<p class="doctor">{{userList.name}}</p>
						<p class="mes-doc">
							<span class="sex">{{userList.sex==1? '男' : '女'}}</span>
							<span class="age">{{userList.age}}岁</span>
							<i class="divide-b"></i>  
							<span class="position">{{userList.title=='1'?"主治医师":(userList.title=='2'?"副主任医师":(userList.title=='3'?"主任医师":"医士，医师/住院医师"))}}</span>
							<span class="office">{{userList.department}}</span>
							<span class="hospital">{{userList.hospitalName}}</span>
						</p>
					</el-col>
					<el-col :span="4">
						<img src="../../assets/img/headImg.png" alt="">
					</el-col>
				</el-row> 
				<div class="mes-num">
					<p>
						<span class="num-title">身份证号：</span> <span>{{userList.idcard}}</span>
						<span class="num-title">手机号：</span> <span>{{userList.username}}</span> 
					</p> 
				</div>
				<div class="cont-box"> 
					<div class="clear">
						<p class="headline">简 介：</p>  
						<p class="content"> {{userList.beGoodAt}}</p> 
					</div>
					<div class="cont-second clear">
						<p class="headline">擅长领域：</p>  
						<p class="content">{{userList.synopsis}}</p> 
					</div>
				</div>
			</div>
			<div slot="footer" class="dialog-footer"> 
				<el-button v-if = "userList.status==0" type="primary" @click="makesurePass(userList.username)">通 过</el-button>
				<el-button v-if = "userList.status==0" type = "warning" @click="turnback(userList.username)">驳 回</el-button>
				<el-button @click="dialogIsVisible = false">关 闭</el-button>
			</div>
		</el-dialog> 
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogFormVisible:false,
				dialogIsVisible:false,
				userList:{},
				areaList:{},//行政区列表
				timeout:null,
				hospitalList:[],
				tableData: [],
				totalNumber: 0,
				currentPage1: 1, //默认页
				changePageType:"",//是否搜索
				rejectReasonForm:{
					reason:''
				},
				overflow: true,
				searchForm: {//搜索框
					area: '',
					hospital: '',
					name:''
				}
			}
		},
		methods: {
			searchList(page,area,hospital,name) {//搜索查询
				
				this.$axios.get("/cloudform-authority/authority/sysUser/searchExpert/v1.0",{
//				this.$axios.get("http://192.168.121.91:3030/authority/sysUser/searchExpert/v1.0", {
				    params: {
							page,
							area,
							hospital,
							name,
							"token":sessionStorage.getItem("loginToken")
						}
				}).then((res)=>{
					console.log(res)
					this.tableData = res.data.data.data;
					console.log(this.tableData)
					this.totalNumber = res.data.data.pageCount;
					this.changePageType = "doSearch"
				})
				.catch((error)=>{
					console.log(error)
				})
			
			},
			getExpertList(page,area,hospital,name) {
				this.$axios.get("/cloudform-authority/authority/sysUser/searchExpert/v1.0", {
//				this.$axios.get("http://192.168.121.91:3030/authority/sysUser/searchExpert/v1.0", {
						params: {
							page,
							area,
							hospital,
							name,
							"token":sessionStorage.getItem("loginToken")
						}
					}).then((res) => {
						console.log(res)
						this.tableData = res.data.data.data;
						console.log(this.tableData)
						this.totalNumber = res.data.data.pageCount;
						this.changePageType = "noSearch"
					})
					.catch((error) => {
						console.log(error)
					})
			},
			resetForm(formName){//重置
				console.log(this.$refs[formName].resetFields())
				
				this.$refs[formName].resetFields();

				this.getExpertList();
			},
			handleCurrentChange(val) { //点击上下页回调
				
				if(this.changePageType = "noSearch"){
					this.getExpertList(val);
				}else{
					this.searchList(val)
				}
			},	
			rejectApply(username,status,remarks) {//接受或者退回专家审核
					if(remarks!=""){
						this.$axios.post("/cloudform-authority/authority/sysUser/review/v1.0?token="+sessionStorage.getItem("loginToken"), {
//						this.$axios.post("http://192.168.121.91:3030/authority/sysUser/review/v1.0?token="+sessionStorage.getItem("loginToken"), {
								username,
								status,
								remarks
							}).then((res) => {
								this.dialogFormVisible = false;
								if(res.data.code==200){
									this.getExpertList(1);
									this.$message({
										type: 'success',
										message: '退回成功!'
									});
									this.dialogIsVisible = false;
								}else{
									this.$message({
										type: 'error',
										message: '审核异常，请稍后再试!'
									});
								}
								
							}).catch((error) => {
								console.log(error)
						})
					}else{
							this.$message({
								type: 'error',
								message: '请填写驳回原因!'
							});
						}
			},
			
			makesurePass(username){
				this.$confirm('确认通过此申请?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.passTheApply(username,"1");
					}).catch(() => {});
			},
			passTheApply(username,status){
				this.$axios.post("/cloudform-authority/authority/sysUser/review/v1.0?token="+sessionStorage.getItem("loginToken"), {
//				this.$axios.post("http://192.168.121.91:3030/authority/sysUser/review/v1.0?token="+sessionStorage.getItem("loginToken"), {
						username,
						status
					}).then((res) => {
						console.log(res)
						if(res.data.code==200){
							this.dialogIsVisible = false;
							this.getExpertList();
							this.$message({
								type: 'success',
								message: '审核通过!'
							});
						}else{
							this.$message({
								type: 'error',
								message: '审核失败，请稍后再试!'
							});
						}
						
					})
					.catch((error) => {
						console.log(error)
					})
			},
			turnback(){//退回
				this.dialogFormVisible = true;
			},
			rowClick(row, event, column){//单击某一行的时候 
				this.dialogIsVisible = true;
				this.userList=row;
			},
			queryHospital(){//获取医院
				var area = this.searchForm.area;
				var param = `?area=${area}&&currentPage=1`; 
				this.$axios.get("/cloudform-statistics/formStatistics/getHospitalList/v1.0"+param)
				.then(response=>{
					console.log(response);
					this.hospitalList=response.data.data;
				})
				.catch((error)=>console.log(error));
			},
			getDict(dict){//获取行政区
				this.$axios
				// .post("http://192.168.121.91:3030/authority/dictUtil/queryDictList/v1.0",
				.post("/cloudform-authority/authority/dictUtil/queryDictList/v1.0",
				{
					type:dict
				})  
				.then(response=>{
					console.log(response)
					this.areaList=response.data.data; 
				})
				.catch((error)=>console.log(error));
			},
			querySearch(queryString, cb) {//补全
				console.log(queryString);
				console.log(cb)
		        var hospitalList = this.hospitalList;
		        var results = queryString ? hospitalList.filter(this.createFilter(queryString)) : hospitalList;
		        // 调用 callback 返回建议列表的数据
		        console.log(results)
//		        cb(results);
		         clearTimeout(this.timeout);
		        this.timeout = setTimeout(() => {
		          cb(results);
		        }, 1000 * Math.random());
		        
		      },
		    createFilter(queryString) {//过滤器
		        return (hospital) => {
		          return (hospital.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
		        };
		      }
		},
		mounted() {
			this.getExpertList();
		}
	}
</script>

<style>	
	/*详情对话框*/
	.mes-box{
		padding-left:10px; 
	} 
	.el-dialog__header{
		border-bottom:1px solid #ddd;
		background:#f8fafd;
	}	 
	.doctor{
		font-size: 24px; 
		color:#333;
		margin-bottom:20px;
	} 
	.divide-b{ 
		margin-right: 10px;
		border-left:1px solid #0d63ee; 

	}
	.sex,.age,.position,.office,.hospital{
		margin-right:10px;
	}
	.mes-num{
		/* margin-top:20px; */
		height:50px;
		border-top:1px dashed #e5e5e5;
		border-bottom:1px dashed #e5e5e5;
	}
	.mes-num p{
		line-height:50px;
		font-size:14px;
		color:#666;
	}
	.num-title{
		color:#999;
	}
	.num-title+span{
		margin-right:8%;
	}
	.cont-box{
		margin-top:20px;
		font-size:14px; 
	}
	.cont-box p{
		float:left;
	}
	.headline{
		color:#006699;
		font-weight:bold; 
	}
	.content{
		color:#666;
		max-width:90%;
		padding-left:5px;
	}
	.cont-second{
		padding-top:20px;
	}
	.cont-second .content{ 
		max-width:87%;
	}
	.mes-box img{
		width:70px;
		height:90px;
	}
</style>
<style>
	/*操作提示框*/
	/*.el-popover{
		min-width: 100px;
	}*/
	/*搜索*/
	.expertExamine .el-table .el-button {
		padding: 10px 5px;
	}
	
	.expertExamine .el-table .el-button+.el-button{
		margin: 0;
	}
	
	/*气泡*/
	.el-tooltip__popper.is-dark {
	  /*border:none;
	background: rgba(5,126,255,0.5);
	color: #fff;*/
	  font-size: 14px;
	  line-height: 20px;
	  width: 300px;
	}
</style>