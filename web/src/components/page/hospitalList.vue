<template>
	<div class="container">
		<h1 class="top-title">
			接入机构列表：
		</h1>
		<el-form :inline="true" :model="formInline" class="demo-form-inline mb20">
			<!-- <el-form-item label="审批人">
				<el-input v-model="formInline.user" placeholder="审批人"></el-input>
			</el-form-item> -->
			<el-form-item label="市/区">
				<el-select v-model="formInline.city" placeholder="请选择市属/区属" @focus.once="getDict('dict_hospital_subjection')"> 
					<el-option label="全部" :value="all"></el-option>
					<el-option :label="item.name" :value="item.value" v-for="item in cityList" :key="item.name"></el-option>  
				</el-select>
			</el-form-item>
			<el-form-item label="区域归属">
				<el-select v-model="formInline.area " placeholder="请选择所属区域归属"  @focus.once="getDict('dict_area')">
					<el-option label="全部" :value="all"></el-option>
					<el-option :label="item.name" :value="item.value" v-for="item in areaList" :key="item.name"></el-option>  
				</el-select>
			</el-form-item> 
			<el-form-item label="级别">
				<el-select v-model="formInline.level" placeholder="请选择级别"  @focus.once="getDict('dict_hospital_level')">
					<el-option label="全部" :value="all"></el-option>
					<el-option v-if="item.value!=4" :label="item.name" :value="item.value" v-for="item in levelList" :key="item.name"></el-option>  
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">查询</el-button>
			</el-form-item>
		</el-form>
		<el-row :gutter="20">
			<el-col :span="8" v-for="item in hospitalList" :key="item.name">
				<div class="hospt-grid" @click="pageTrun(item.id,item.name)">
					<p>{{item.name}}</p>
					<span><i class="iconfont icon-shijian"></i>接入时间：{{item.joinDate}}</span>
					<span><i class="iconfont icon-shujuku"></i>检查数量：{{item.allStudyNumber==null?0:item.allStudyNumber}}例</span>
				</div>
			</el-col>  
		</el-row>
		<div>
			<div class="block" style="text-align:center; margin-top:20px;"> 
				<el-pagination  
					layout="total, prev, pager, next,jumper"
					:page-size="pageSize"
					:page-count="currentPage"
					:current-page.sync="currentPage"
					:pager-count="5"
					:total="total"  
					@current-change="handleCurrentChange"
					>
				</el-pagination>
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
					city:'',    //市属
					area: '',  //区属
					level:''
				},
				hospitalList:[],
				currentPage:1,
				pageSize:0,
				total:0,//数据总数
				cityList:[],
				areaList:[],
				levelList:'',
				all:""
			}
		},
		mounted(){
			this.getData(this.formInline.city,this.formInline.area,this.formInline.level,this.currentPage); 
		},
		methods: {
			onSubmit() {   
				this.currentPage=1; 
				this.getData(this.formInline.city,this.formInline.area,this.formInline.level,this.currentPage);
			},
			getData(city,area,level,currentPage){ 
				console.log(this.currentPage);
				var param = ""; 
				param = `?city=${city}&&area=${area}&&level=${level}&&currentPage=${currentPage}`; 
				console.log(param);
   				 var token = sessionStorage.getItem("loginToken"); 
				this.$axios
				// .get("http://192.168.121.132:4040/formStatistics/getHospitalList/v1.0"+param)
				// .get("/formStatistics/getHospitalList/v1.0?currentPage="+1)  
				.get("/cloudform-statistics/formStatistics/getHospitalList/v1.0"+param)
				.then(response=>{
					console.log(response);
					 this.hospitalList=response.data.data;
					 this.total=response.data.pageCount;
					 this.currentPage=response.data.currentPage;
					 this.pageSize=response.data.pageSize;
				})
				.catch((error)=>console.log(error));
			},
			getDict(dict){
				// http://ip:port/authority/dictUtil/queryDictList/v1.0
				this.$axios
				// .post("http://192.168.121.91:3030/authority/dictUtil/queryDictList/v1.0",
				.post("/cloudform-authority/authority/dictUtil/queryDictList/v1.0",
				{
					type:dict
				})  
				.then(response=>{
					console.log(response); 
					if(dict=="dict_hospital_subjection"){
						this.cityList=response.data.data; 
					} 
					if(dict=="dict_area"){
						this.areaList=response.data.data; 
					}
					if(dict=="dict_hospital_level"){
						console.log(response.data.data);
						this.levelList=response.data.data; 
					} 
				})
				.catch((error)=>console.log(error));
			},
			pageTrun(id,name){
				// console.log(id);
				// console.log(sessionStorage.getItem("hospitalId"));
				sessionStorage.setItem("hospitalId",id); 
				sessionStorage.setItem("hospitalName",name);
				console.log(sessionStorage.getItem("hospitalId")); 
				// this.$router.push('/home/dataStats2'); 
				this.$router.push('/home/dataStats2'); 
				
			},
			handleCurrentChange(val){  
				this.getData(this.formInline.city,this.formInline.area,this.formInline.level,val); 
			}
		},  
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.hospt-grid {
		height: 100px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 3px 0px rgba(49, 78, 104, 0.1);
		border-radius: 4px;
		border: solid 1px #eeeeee;
		margin-bottom: 28px;
		transition: all 0.3s;
	}
	
	.hospt-grid p {
		padding: 15px 0 6px 20px;
		color: #303133;
		font-weight: 600;
	}
	
	.hospt-grid span {
		display: block;
		padding: 3px 20px;
		font-size: 14px;
	}
	
	.hospt-grid span i {
		color: #057EFF;
		margin-right: 8px;
	}
	
	.hospt-grid:hover {
		background: rgba(5, 176, 255, 0.1);
		cursor: pointer;
	}
</style>