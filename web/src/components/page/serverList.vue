<template>
	<div class="container">
		<h1 class="top-title">
			服务器列表：
		</h1>
		 <el-tabs v-model="activeName" @tab-click="handleClick"  type="border-card">
		    <el-tab-pane label="云端" name="first">
		    	<div class="ip-list" v-for="item in serverList" :key="item.server_ip">
		    		<h3>{{item.server_ip}}</h3>
		    		<ul>
		    			<li><span>内存</span><strong>{{item.server_memory.total}}</strong></li>
		    			<li><span>CPU</span><strong>{{item.server_cpu.core}}核</strong></li>
		    			<li><span>硬盘</span><strong>{{item.server_storage}}</strong></li>
		    			<li><span>服务器状态</span><strong class="normal">{{item.connectStatus}}</strong></li> 
		    			<li><span>状态警告</span><strong class="abnormal">{{item.alarmStatus}}</strong></li> 
		    		</ul>
		    	</div> 
				<!-- <div class="block clear" style="text-align:center; margin-top:20px;"> 
						<el-pagination
							layout="total, prev, pager, next,jumper"
							:total="50">
						</el-pagination>
					</div>  -->
		    </el-tab-pane>
		    <el-tab-pane label="医院" name="second"> 
					<div class="server-list" v-for="item in hospitalList" :key="item.id">
						<h3>{{item.hospitalName}}</h3>
						<ul>
							<li><span>内存</span><strong>{{item.server.server_memory}}</strong></li>
							<li><span>CPU</span><strong>{{item.server.server_cpu}}</strong></li>
							<li><span>硬盘</span><strong>{{item.server.server_storage}}</strong></li>
							<!-- <li><span>采集状态</span><strong class="normal">正在采集</strong></li>  -->
							<li><span>状态警告</span><strong class="abnormal">{{item.alarmStatus}}</strong></li> 
							<li><span>采集状态</span><strong class="normal">{{item.connectStatus=="连接成功"?"正在采集":"故障"}}</strong></li>
						</ul>
					</div>  
					<!-- <div class="block clear" style="text-align:center; margin-top:20px;"> 
						<el-pagination 
							layout="total, prev, pager, next,jumper"
							:total="50">
						</el-pagination>
					</div>  -->
		    </el-tab-pane>
		  </el-tabs> 
		<div class="clear"></div>

	</div>
</template>

<script>
	 export default {
	    data() {
	      return {
			activeName: 'first', 
			serverList:[],
			hospitalList:[]
	      };
		},
		mounted(){
			this.getData(); 
		},
	    methods: {
	      handleClick(tab, event) {
	        // console.log(tab, event);
		  },
		  getData(){
			  this.$axios
				// .get("http://192.168.121.82:4040/server/queryCloudMachineList/v1.0")
				.get("/cloudform-statistics/server/queryCloudMachineList/v1.0")
				.then(response=>{   
					// console.log(response);
					for(let i=0;i<response.data.length;i++){ 
						this.$axios
						// .get("http://192.168.121.82:4040/server/queryCloudMachineList/v1.0")
						.get("/cloudform-statistics/server/getCloudMachineStatus/v1.0",{
							params:{
							instanceId:response.data[i].server_instance_id
							}
						})
						.then(res=>{    
							response.data[i].alarmStatus=res.data.serverStatuss[0].alarmStatus;
							response.data[i].connectStatus=res.data.serverStatuss[0].connectStatus 
							if(i==response.data.length-1){ 	
								this.serverList=response.data;
							}
						})
						.catch((error)=>console.log(error)); 
						}  
				}) 
				.catch((error)=>console.log(error));

				this.$axios
				// .get("http://192.168.121.82:4040/server/queryFrontMachineList/v1.0")
				.get("/cloudform-statistics/server/queryFrontMachineList/v1.0")
				.then(response=>{  
					// console.log(response);
					for(let i=0;i<response.data.length;i++){ 
						this.$axios
						// .get("http://192.168.121.82:4040/server/queryCloudMachineList/v1.0")
						.get("/cloudform-statistics/server/getFrontMachineStatus/v1.0",{
							params:{
							instanceId:response.data[i].server_instance_id
							}
						})
						.then(res=>{ 
							// console.log(res);
							response.data[i].alarmStatus=res.data.statuss[0].alarmStatus;
							response.data[i].connectStatus=res.data.statuss[0].connectStatus 
							if(i==response.data.length-1){ 	
								this.hospitalList=response.data;
							}
						})
						.catch((error)=>console.log(error)); 
						}  
				})
				.catch((error)=>console.log(error));
		  },
		  getCloudState(Id,num){  
			  var stat={};
			  
		  },
		  getStatus(str){
			  return str;
		  }
	    }
	  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.server-list,.ip-list{
		float: left;
		width: 20%;
		min-width: 220px;
		min-height: 224px;
		border: 1px solid #EBEEF5;
		margin: 25px 2.3%;
		background: url(../../assets/img/serverbg.png) right top;
	}
	.server-list h3,.ip-list h3{
		margin: 20px 10px 10px 20px;
		padding-left: 40px;
		min-height: 30px;
		background: url(../../assets/img/icon-server.png)no-repeat left top;
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
</style>