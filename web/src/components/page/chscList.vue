<template>
	<div class="container">
		<h1 class="top-title">
			社康中心：
		</h1>
		<el-form :inline="true" :model="formInline" class="demo-form-inline mb20"> 
			<el-form-item label="社康名称">
				<el-input v-model="formInline.input" placeholder="请输入社康名称"></el-input>
			</el-form-item> 
			<el-form-item>
				<el-button type="primary" @click="getData(formInline.input)">查询</el-button>
			</el-form-item>
		</el-form>
		<div class="server-list" v-for="item in hospitalList" :key="item.name">
		    		<h3><i class="iconfont icon-yunzhuji1"></i>{{item.name}}</h3>
		    		<ul>
		    			<li><span>检查数量</span><strong>{{item.allStudyNumber==null?0:item.allStudyNumber}}</strong></li>
					<li><span>设备数量</span><strong>{{item.deviceNumber==null?0:item.deviceNumber}}</strong></li> 
		    		</ul>
		    	</div>  
		<div class="clear"></div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				formInline: {  
					input:''
				},
				hospitalList:[],  
				hospitalId:sessionStorage.getItem("hospitalId")
			}
		},
		mounted(){
			this.getData("");
		},
		methods: { 
			getData(input){ 
				let param = {};
				if (input == "") {
					param ={ 
						parentId:this.hospitalId
					};
				} else {
					param ={
						parentId:this.hospitalId,
						name:input
					};
				} 
				this.$axios
				// .get("http://192.168.121.132:4040/formStatistics/getCommunityList/v1.0",{
				.get(this.$api.chscList.getData,{
					params:param
				})
				.then(response=>{
					// console.log(response);
					this.hospitalList=response.data;
				})
				.catch((error)=>console.log(error));
			}  
		},  
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

	.server-list,.ip-list{
		float: left;
		width: 20%;
		min-width: 220px;
		min-height: 130px;
		border: 1px solid #EBEEF5;
		margin: 15px 2.3%;
		background-color: #fff;
		/*background: url(../../assets/img/serverbg.png) right top;*/
	}
	.server-list h3,.ip-list h3{
		margin: 20px 10px 10px 20px;
		/* padding-left: 40px; */
		min-height: 30px;
		/* background: url(../../assets/img/icon-server.png)no-repeat left top; */
	}
	.ip-list h3{
		background: url(../../assets/img/icon-serverip.png)no-repeat left top;
	}
	.server-list li,.ip-list li{
		margin:0 0 10px 20px;
	} 
	.server-list li span,.ip-list li span{
		margin-right: 20px;
	}
	.normal{
		color: #057eff;
	}
	.abnormal{
		color: #ff3341;
	} 
	.icon-yunzhuji1{
		font-size: 24px;
		vertical-align: middle;
		color:#057eff;
		margin-right: 6px;
	}
	/* .icon-yunzhuji1:before{
		font-size: 22px;
    	vertical-align: middle;
	} */

</style>