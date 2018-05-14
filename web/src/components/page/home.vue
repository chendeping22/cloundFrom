<template>
	<div class="home">
		<el-container>
			<!--页头-->
			<div class="header">
				<div class="logo">
					<img src="../../assets/img/lwlogo.png" alt="" />
					<p>医疗影像云平台</p>
				</div>
				<div class="account">
					<el-dropdown @command="handleCommand" class="iconfont icon-morentouxiang">
						<span class="el-dropdown-link">
					    {{this.name}}<i class="el-icon-arrow-down el-icon--right"></i>
					  </span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="a">用户信息</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<!-- <router-link class="iconfont icon-icon-" to="/">退出登录</router-link> -->
					<a class="iconfont icon-icon- exit" href="javascript:void(0)" @click="exitLogon">退出登录</a>
				</div>
			</div>

			<div class="aside">
				<!--background-color="#0d62b0"--> 
				<el-aside width="200px">
					<el-menu 
					:default-active="onShow()" 
					router 
					class="el-menu-vertical-demo" 
					@open="handleOpen" 
					@close="handleClose" 
					background-color="transparent" 
					text-color="#fff" 
					active-text-color="#0d62b0">
						<el-menu-item v-for="item in menuList" :key="item.menuId" :index="item.url">
							<i :class="'iconfont '+item.icon"></i>
							<span slot="title">{{item.name}}</span>
						</el-menu-item>

					</el-menu>
				</el-aside>
			</div>
			<div class="main">
				<el-main>
					<router-view></router-view>
				</el-main>
			</div>
			<div class="footer">
				<span>Copyright © 2017-2018  Lanwon. All Rights Reserved <a href="http://www.lanwon.com/" target="_blank">蓝网科技股份有限公司</a> 版权所有</span>
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
				menuList:sessionStorage.menuList?JSON.parse(sessionStorage.menuList):null
			}
		},
		mounted() {
			// console.log(sessionStorage.menuList);
			// console.log(this.$route.meta);
		},
		methods: {
			exitLogon(){
				sessionStorage.removeItem('userId');
				this.$router.push('/'); 
			},
			onShow(){ 
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
		vertical-align: middle;
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
		/*clear: both;*/
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
		text-align: center;
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
		background-color: #f8fafd;
		/*color: #333;*/
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
	
	.el-menu-item i,
	.el-submenu__title i {
		color: rgba(255, 255, 255, 0.8);
	}
			
	.el-menu-item.is-active{
		background-color: #f8fafd !important;
		font-weight: 700;
	}
	.el-menu-item.is-active i,
	/*.el-menu-item:focus i,*/
	.el-menu-item:hover i
	 {
		color: #0d62b0;
	}
	
	.el-menu-item:focus,
	.el-menu-item:hover
	{
		background-color: #f8fafd !important;
		color: #0d62b0 !important;
		font-weight: 700;
	}
</style>
