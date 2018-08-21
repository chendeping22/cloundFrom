<template>
	<div class="container leader">
		<h1 class="top-title">
			接入机构列表：
		</h1>
		<el-form :inline="true" :model="formInline" ref = "formInline" class="demo-form-inline">
			<el-form-item label="市/区" prop = "city">
				<el-select v-model="formInline.city" placeholder="请选择市属/区属" @focus.once="getDict('dict_hospital_subjection')"> 
					<el-option label="全部" :value="all"></el-option>
					<el-option :label="item.name" :value="item.value" v-for="item in cityList" :key="item.name"></el-option>  
				</el-select>
			</el-form-item>
			<el-form-item label="区域归属" prop = "area">
				<el-select v-model="formInline.area " placeholder="请选择所属区域归属"  @focus.once="getDict('dict_area')">
					<el-option label="全部" :value="all"></el-option>
					<el-option :label="item.name" :value="item.value" v-for="item in areaList" :key="item.name"></el-option>  
				</el-select>
			</el-form-item> 
			<el-form-item label="级别" prop = "level">
				<el-select v-model="formInline.level" placeholder="请选择级别"  @focus.once="getDict('dict_hospital_level')">
					<el-option label="全部" :value="all"></el-option>
					<el-option v-if="item.value!=4" :label="item.name" :value="item.value" v-for="item in levelList" :key="item.name"></el-option>  
				</el-select>
			</el-form-item>
			<el-form-item label="医院名称" prop = "hospital">
				<el-input v-model="formInline.hospital" placeholder="医院名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">查询</el-button>
				<el-button @click="reset('formInline')">重置</el-button>
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
			<div style="text-align:center; margin-top:20px;"> 
				<el-pagination  
					layout="total, prev, pager, next,jumper"
					:page-size="pageSize" 
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
					level:'',
					hospital:''
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
			this.getData(this.formInline.hospital,this.formInline.city,this.formInline.area,this.formInline.level,this.currentPage); 
		},
		methods: {
			onSubmit() {   
				this.currentPage=1; 
				this.getData(this.formInline.hospital,this.formInline.city,this.formInline.area,this.formInline.level,this.currentPage);
			},
			reset(formName){
				this.$refs[formName].resetFields();
				this.getData(this.formInline.hospital,this.formInline.city,this.formInline.area,this.formInline.level,1);
			},
			getData(hospital,city,area,level,currentPage){ 
				console.log(this.currentPage);
				var param = ""; 
				param = `?city=${city}&area=${area}&level=${level}&page=${currentPage}&pageSize=15&hospitalName=${hospital}`; 
//				console.log(param);
				this.$axios
				// .get("http://192.168.121.132:4040/formStatistics/getHospitalList/v1.0"+param)
				// .get("/formStatistics/getHospitalList/v1.0?currentPage="+1)  
				.get(this.$api.hospitalList.queryHospital+param)
				.then(response=>{
					console.log(response);
					 this.hospitalList=response.data.data.datas;
					 this.total=response.data.data.pageCount;
					//  this.currentPage=response.data.data.currentPage;
					 this.pageSize=response.data.data.pageSize;
				})
				.catch((error)=>console.log(error));
			},
			//获取地区
			getDict(dict){
				// http://ip:port/authority/dictUtil/queryDictList/v1.0
				this.$axios
				// .post("http://192.168.121.91:3030/authority/dictUtil/queryDictList/v1.0",
				.post("/cloudform-authority/authority/dictUtil/queryDictList/v1.0",
				{
					type:dict
				})  
				.then(response=>{
					// console.log(response); 
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
			pageTrun(hospitalId,hospitalName){
				this.$router.push({path:'/home/dataStats2',query:{
					hospitalId,
					hospitalName
				}});
				
			},
			handleCurrentChange(val){  
				this.getData(this.formInline.hospital,this.formInline.city,this.formInline.area,this.formInline.level,val); 
			}
		},  
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.hospt-grid {
		height: 100px;
		border-radius: 4px;
		margin-bottom: 28px;
		/*transition: all 0.3s;*/
		background: linear-gradient(0deg,rgba(4, 71, 158, 0.5) 0%,rgba(14, 44, 128, 0.5) 100%);
		background-blend-mode: normal, normal;
		box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.52);
		border: solid 1px #095795;
	}
	
	.hospt-grid p {
		padding: 15px 0 6px 20px;
		color: rgba(255,255,255,0.84);
		font-weight: 600;
	}
	
	.hospt-grid span {
		display: block;
		padding: 3px 20px;
		font-size: 14px;
		color: #a5c3ff;
	}
	
	.hospt-grid span i {
		color: #bfa52a;
		margin-right: 8px;
	}
	
	.hospt-grid:hover {
		background: rgba(5, 176, 255, 0.3);
		cursor: pointer;
	}
	
</style>