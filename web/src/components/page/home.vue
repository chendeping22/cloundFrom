<template>
	<div class="home">
		<el-container>
			<!--页头-->
			<div class="header" :style="roleId==4?headerBg1:headerBg2">
				<div class="logo">
					<img v-if="!logoIsWhite" src="../../assets/img/lwlogo.png" alt="" />
					<img v-if="logoIsWhite" src="../../assets/img/lw-logo.png" alt="" />
					<p :style="roleId==4?headerText:''">医疗影像云平台</p>
				</div>
				<div class="account">
					<el-dropdown @command="handleCommand" class="iconfont icon-morentouxiang" :style="roleId==4?headerText:''">
						<span class="el-dropdown-link">
					     {{this.name}}<i class="el-icon-arrow-down el-icon--right"></i>
					    </span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="a">用户信息</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<!-- <router-link class="iconfont icon-icon-" to="/">退出登录</router-link> -->
					<a :style="roleId==4?headerText:''" class="iconfont icon-icon- exit" href="javascript:void(0)" @click="exitLogon">退出登录</a>
				</div>
			</div>

			<div class="aside" :style="roleId==4?asideBg2:asideBg1">
				<!--background-color="#0d62b0"-->
				<el-aside width="200px">
					<el-menu :default-active="onShow()" router :class="{leader:roleId==4?true:false}" @open="handleOpen" @close="handleClose" background-color="transparent" :text-color="textColor" :active-text-color="activeTextColor">
						<el-menu-item @click="addBackground" ref="menulist" v-for="(item,index) in menuList" :index="item.url" :key="item.menuId"areaList>
							<i :class="'iconfont '+item.icon"></i>
							<span slot="title">{{item.name}}</span>
						</el-menu-item>
						<!--<el-submenu index="1">
							<template slot="title">
								<i class="iconfont el-icon-location"></i>
								<span>远程咨询会诊</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="/home/teleConsultion">专家咨询</el-menu-item>
								<el-menu-item index="/home/teleConsultList">咨询列表</el-menu-item>
							</el-menu-item-group>
						</el-submenu>-->
						<li v-if="roleId==4" class="el-menu-item dataAndMap" @click="openFullScreen('index.html')">
							<i class="iconfont icon-shujuku"></i>
							<span>影像数据分析</span>
						</li>
						<li v-if="roleId==4" class="el-menu-item dataAndMap" @click="openFullScreen('map.html')">
							<i class="iconfont icon-yunzhuji"></i>
							<span>影像数据地图</span>
						</li>

					</el-menu>
				</el-aside>
			</div>
			<div class="main" :style="roleId==4?mainBg2:mainBg1">
				<el-main>
					<router-view></router-view>
				</el-main>
			</div>
			<div class="footer" :style="roleId==4?footerStyle:''">
				<span :style="roleId==4?footerTextStyle:''">Copyright © 2017-2018  Lanwon. All Rights Reserved <a :style="roleId==4?footerTextStyle:''" href="http://www.lanwon.com/" target="_blank">蓝网科技股份有限公司</a> 版权所有</span>
			</div>
		</el-container>

	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
	export default {
		data() {
			return {
				name: sessionStorage.getItem("name"),
				stats: sessionStorage.getItem("stats"),
				roleId: sessionStorage.getItem("roleId"),
				menuList: sessionStorage.menuList ? JSON.parse(sessionStorage.menuList) : null,
				logoIsWhite: false,
				asideBg1: {
					backgroundImage: "url(" + require("../../assets/img/sidebg.png") + ")",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "bottom"
				},
				asideBg2:{
					backgroundImage:"url("+require("../../assets/img/admin-sidebg.jpg")+")",
					backgroundRepeat:"no-repeat",
					backgroundPosition:"bottom"
				},
				headerBg1: {
					backgroundImage: "url(" + require("../../assets/img/headerbg.jpg") + ")",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center"
				},
				headerBg2: {
					backgroundColor: "#fff"
				},
				headerText: {
					color: "white"
				},
				mainBg1: {
					backgroundColor: "#f8fafd"
				},
				mainBg2: {
					backgroundImage: "url(" + require("../../assets/img/mainbg.png") + ")",
					backgroundRepeat: "no-repeat",
					backgroundSize: "100% 100%",
					paddingBottom: "32px",
					//					paddingTop:"32px"
				},
				footerStyle: {
					height: "32px",
					backgroundColor: "transparent",
					border: 0,
					opacity: 0.5
				},
				footerTextStyle: {
					lineHeight: '32px',
					fontSize: "12px",
					color: "rgba(255,255,255,0.7)"
				},
				textColor: '',
				activeTextColor: ''
			}
		},
		mounted() {
			this.textColor = this.roleId == 4 ? 'rgba(255,255,255,0.7)' : '#fff';
			this.activeTextColor = this.roleId == 4 ? '#fff' : '#0d62b0';
			this.logoIsWhite = this.roleId == 4 ? true : false;
		},
		methods: {
			exitLogon() {
				sessionStorage.removeItem('loginToken');
				this.$router.push('/');
			},
			onShow() {
				return this.$route.meta.sideActive;
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			handleCommand(command) { //下拉回调
				this.$router.push({
					path: '/home/account'
				});
			},
			openFullScreen(htmlName) {
				window.open(`${this.$api.openFullScreen}${htmlName}?token=${sessionStorage.getItem("loginToken")}`)
			},
			addBackground() {
				// console.log("添加背景图片");
				// console.log(this.$refs.menulist)
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
	/*header*/
	
	.header {
		background-color: #fff;
		/*color: #333;*/
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
		display: inline-block;
		width: 64px;
		height: 30px;
		vertical-align: -7px;
		margin-bottom: 2px;
	}
	
	.header .logo p {
		display: inline-block;
		height: 30px;
		line-height: 30px;
		font-size: 22px;
		font-weight: 700;
	}
	
	.header .account {
		line-height: 30px;
		font-size: 14px;
		float: right;
	}
	
	.header .icon-morentouxiang:before,
	.header .icon-icon-:before {
		font-size: 22px;
		vertical-align: middle;
	}
	
	.header .el-dropdown-link {
		cursor: pointer;
	}
	
	.header .el-icon-arrow-down {
		font-size: 12px;
	}
	
	.header .el-dropdown-menu__item {
		line-height: 26px;
	}
	
	.header .router-link-active,
	.exit {
		/*退出登录*/
		margin: 0 10px;
		font-size: 14px;
		color: #606266;
	}
	/*页脚*/
	
	.footer {
		background-color: #eef2f9;
		color: #666;
		padding: 0;
		text-align: center;
		width: 100%;
		height: 60px;
		border-top: 1px solid #dadde0;
		position: absolute;
		bottom: 0px;
		left: 200px;
	}
	/*.footer b{
		display: inline-block;
		background-color: #0d62b0;
		width: 200px;
		height: 61px;
		float: left;
		margin-top: -1px;
	}*/
	
	.footer span {
		line-height: 60px;
		font-size: 14px;
		margin-left: -200px;
	}
	
	.footer a {
		color: #666;
	}
	/*左侧导航栏*/
	
	.aside {
		background-color: #0d62b0;
		color: #fff;
		line-height: 200px;
		padding-top: 50px;
		overflow: hidden;
		position: absolute;
		top: 60px;
		width: 200px;
		bottom: 0;
		left: 0;
	}
	
	.el-aside {
		overflow: hidden;
	}
	
	.main {
		position: absolute;
		top: 60px;
		left: 200px;
		right: 0;
		bottom: 0;
		overflow: auto;
		padding-bottom: 60px;
	}
	
	.el-menu {
		border: none;
	}
	
	.el-submenu .el-menu-item {
		text-align: center;
	}
	/*.el-aside .el-menu-item:hover {
	    color:#0d62b0 !important;
	    background-color: #fff !important;
	}
	
	.el-aside .el-submenu:hover
	{
		color:#0d62b0 !important;
	    background-color: #fff !important;
	}*/
	/*内容区域*/
	
	.el-main {
		padding: 30px;
		height: 100%;
	}
	/*body>.el-container {
		margin-bottom: 40px;
	}
	*/
	
	.home {
		height: 100%;
	}
	/*.home .el-container.is-vertical {
		height: 100%;
	}
	*/
	
	::-webkit-scrollbar {
		/*display: none;*/
	}
	/*卫计委之外的角色*/
	
	.el-menu-item i,
	.el-submenu__title i {
		color: rgba(255, 255, 255, 0.8);
	}
	
	.el-menu-item.is-active {
		background-color: #f8fafd !important;
		font-weight: 700;
	}
	
	.el-menu-item.is-active i,
	/*.el-menu-item:focus i,*/
	
	.el-menu-item:hover i {
		color: #0d62b0;
	}
	
	.el-menu-item:focus,
	.el-menu-item:hover {
		background-color: #f8fafd !important;
		color: #0d62b0 !important;
		font-weight: 700;
	}
	
	.el-menu-item-group__title {
		padding: 0 !important;
	}
	
	/*卫计委角色*/
	
	.leader .el-menu-item i,
	.leader .el-submenu__title i {
		color: rgba(255, 255, 255, 0.6);
	}
	
	.leader .el-menu-item.is-active {
		background-color: rgba(255, 255, 255, 0) !important;
		background: url(../../assets/img/activebg.png) bottom no-repeat !important;
		font-weight: 700;
		color: #fff;
	}
	
	.leader .el-menu-item.is-active i,
	/*.el-menu-item:focus i,*/
	
	.leader .el-menu-item:hover i {
		/*color: #0d62b0;*/
		color: #fff;
	}
	
	.leader .el-menu-item:focus,
	.leader .el-menu-item:hover {
		background-color: rgba(255, 255, 255, 0) !important;
		color: #fff !important;
		font-weight: 700;
	}
	/*全屏地图和数据*/
	
	.dataAndMap {
		color: rgba(255, 255, 255, 0.7);
	}
</style>
<style type="text/css">
	.el-menu-item-group__title {
		padding: 0 !important;
	}
	/*下拉小箭头颜色*/
	.el-submenu__title i{
		color:#fff !important;
	}
</style>