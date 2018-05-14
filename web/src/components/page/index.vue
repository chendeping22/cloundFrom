<template>

	<div>
		<div class="index_header">
			<img src="../../assets/img/lw-logo.png" /><span>蓝网影像云平台</span>
			<a @click.prevent="loginRouter">登录/注册</a>
		</div>
		<el-carousel height="600px" trigger="click" :interval="4000">
			<el-carousel-item height="700px">
				<div class="slogan slogan3" :style="{backgroundImage: 'url(' +bg3+ ')'}">
					<h1>政企合作 资源整合</h1>
					<h6>助推优质医疗资源下沉、互联共享信息，创新医疗影像服务新模式</h6>
				</div>
			</el-carousel-item>
			<el-carousel-item height="700px">
				<div class="slogan" :style="{backgroundImage: 'url(' +bg1+ ')'}">
					<h1>互联网+ 电子影像</h1>
					<h6>提供综合电子影像服务，降低医院存储成本，减少重复投入</h6>
				</div>
			</el-carousel-item>
			<el-carousel-item height="700px">
				<div class="slogan slogan2" :style="{backgroundImage: 'url(' +bg2+ ')'}">
					<h1>创新驱动 信息惠民</h1>
					<h6>移动端阅片打破定时、定点、定人的时间控制，患者少跑腿，数据多走路</h6>
				</div>
			</el-carousel-item>

		</el-carousel>
		<h1 class="experts"><span>专家团队</span></h1>

		<el-carousel height="480px" trigger="click" arrow="always" class="doctor-container" :autoplay="false">
			<el-carousel-item v-for = "(items,index) in expertList" :key = "index">
				<div class="doctor">
					<ul v-for="item in items" :key = "item.idcard">
						<li class="doctor-img"><img src="../../assets/img/icon-doctor.png" /></li>
						<li class="doctor-info">
							<strong>{{item.name}}</strong><i>{{item.titleName}}</i>
							<p>{{item.hospitalName}}<span>{{item.department}}</span></p>
						</li>
					</ul>
				</div>
			</el-carousel-item>
		</el-carousel>

		<div class="merit" :style="bgMerit">
			<h1>蓝网科技 · <span>为医疗影像插上智慧的翅膀</span></h1>
			<h6>打造以智慧影像为核心的生态进化体系</h6>
			<ul>
				<li><strong>20年</strong><span>行业经验</span></li>
				<li><strong>92</strong><span>软件著作权</span></li>
				<li><strong>3100+</strong><span>合作医院</span></li>
				<li><strong>56</strong><span>技术专利</span></li>
			</ul>
		</div>
		<div class="link-box"> 
			<el-row>
				<el-col :span="12"><div class="link"><a href="http://122.13.2.38:8008/cloudForm/fullScreen/" target="_blank" > 蓝网医学影像数据分析</a>  </div></el-col>
				<el-col :span="12"><div class="link"><a href="http://122.13.2.38:8008/cloudForm/fullScreen/map.html" target="_blank">深圳市医学影像数据地图</a></div></el-col>
			</el-row>
		</div>

		<div class="foot">
			Copyright © 2018 Lanwon. All Rights Reserved.粤ICP备13079203号
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				bg1: require('../../assets/img/banner3.jpg'),
				bg2: require('../../assets/img/banner2.jpg'),
				bg3: require('../../assets/img/banner11.jpg'),
				bgMerit: {
					backgroundImage: "url(" + require("../../assets/img/banner0.jpg") + ")",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center"
				},
				expertList:[]
			}
		},
		mounted: function() {
			this.getEepertList()
		},
		methods: {
			loginRouter() {
				this.$router.push("./login")
			},
			getEepertList() {
//				this.$axios.get("http://192.168.121.91:3030/authority/sysUser/queryExpert/v1.0")
				this.$axios.get("/cloudform-authority/authority/sysUser/queryExpert/v1.0")
					.then(res => {
						if(res.data.code == 200) {
							this.expertList = this.sliceArray(res.data.data,4);
						}

					})
					.catch((error) => console.log(error));
			},
			sliceArray(array, size) {
				var result = [];
				for(var x = 0; x < Math.ceil(array.length / size); x++) {
					var start = x * size;
					var end = start + size;
					result.push(array.slice(start, end));
				}
				return result;
			}
		}
	}
</script>
<style scoped>
	body {
		background-color: #fff;
	}
	
	.index_header {
		width: 100%;
		background-color: #3f66e7;
		height: 66px;
		line-height: 66px;
		color: #fff;
		font-size: 22px;
	}
	
	.index_header img {
		float: left;
		height: 30px;
		/*margin-top: 18px;*/
		margin: 18px 20px 0 60px;
	}
	
	.index_header a {
		float: right;
		font-size: 16px;
		color: #fff;
		margin-right: 60px;
	}
	
	.slogan {
		text-align: center;
		color: #fff;
		/*margin-top: 40%;*/
		height: 600px;
		width: 100%;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}
	
	.slogan h1 {
		font-size: 56px;
		padding-top: 168px;
	}
	
	.slogan h6 {
		font-weight: normal;
		font-size: 28px;
		margin-top: 20px;
	}
	
	.experts {
		font-size: 40px;
		text-align: center;
		padding: 60px 0 80px;
		font-weight: normal;
		width: 100%;
		background-color: #fff;
	}
	
	.experts span {
		display: inline-block;
		/*border-bottom: 1px dashed #a0a2a5;*/
		padding-bottom: 10px;
	}
	
	.doctor {
		width: 1000px;
		margin: auto;
		height: 400px;
	}
	
	.doctor ul {
		height: 240px;
		width: 50%;
		float: left;
	}
	
	.doctor ul .doctor-img {
		float: left;
		width: 136px;
		height: 136px;
		border-radius: 50%;
		margin: 0 20px;
		background-color: #F1F1F1;
	}
	
	.doctor ul .doctor-img img {
		width: 100%;
		border-radius: 50%;
	}
	
	.doctor ul .doctor-info {
		float: left;
		padding-top: 20px;
		line-height: 24px;
		vertical-align: middle;
	}
	
	.doctor ul .doctor-info strong {
		color: #333333;
		font-size: 24px;
		vertical-align: middle;
	}
	
	.doctor ul .doctor-info i {
		display: inline-block;
		padding: 0 6px;
		background-color: #057eff;
		color: #fff;
		border-radius: 2px;
		margin-left: 24px;
		line-height: 24px;
		font-size: 16px;
		vertical-align: middle;
	}
	
	.doctor ul .doctor-info p {
		padding-top: 34px;
		font-size: 18px;
	}
	
	.doctor ul .doctor-info p span {
		color: #323640;
		margin-left: 20px;
	}
	
	.doctor-container {
		background-color: #fff;
	}
	
	.merit {
		width: 100%;
		margin-top: 60px;
		height: 346px;
		color: #fff;
		text-align: center;
	}
	
	.merit h1 {
		padding-top: 54px;
		font-size: 48px;
	}
	
	.merit h1 span {
		font-size: 34px;
		font-weight: normal;
	}
	
	.merit h6 {
		padding-top: 10px;
		font-size: 22px;
		/*opacity: .8;*/
		font-weight: normal;
	}
	
	.merit ul {
		width: 1000px;
		margin: auto;
		height: 80px;
		padding-top: 60px;
	}
	
	.merit ul li {
		width: 25%;
		float: left;
		text-align: center;
	}
	
	.merit ul li strong,
	.merit ul li span {
		display: block;
		font-size: 40px;
	}
	
	.merit ul li span {
		font-size: 18px;
		padding-top: 12px;
	}
	
	.foot { 
		color: #62728d;
		font-size: 14px;
		text-align: center;
		padding: 20px 0;
		border-top: 1px solid #e9f0f5;
	}
	.link-box{
		width:1000px;
		margin:80px auto 10px;
	}
	.link{
		font-size:18px;
		text-align: center;
	} 
	.link a{ 
		color:#62728d;
	}
</style>
<style>
	/*分页器颜色*/
	
	.doctor-container .el-carousel__button {
		background-color: #057eff;
	}
</style>