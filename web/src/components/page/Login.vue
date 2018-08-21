<template>

	<div class="login" :style="{backgroundImage: 'url(' +bg + ')'}">
		<div class="loginForm">

			<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
				<el-tab-pane label="用户登录" name="first">
					<el-alert v-if="fail" :title="this.notice" type="error" center show-icon>
					</el-alert>
					<el-form :label-position="labelPosition" :rules="rules1" ref="loginForm" :model="loginForm" label-width="80px">
						<el-form-item label="用户名" prop="username">
							<el-input v-model="loginForm.username" placeholder="请输入手机号码"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
						</el-form-item>
						<!-- <el-form-item v-if="fail" label="验证码" prop="check">
							<el-input v-model="loginForm.check" placeholder="请输入验证码"></el-input>
						</el-form-item> -->
						<el-form-item>
							<el-button style="width: 100%;" type="primary" @click="login('loginForm')">登录</el-button>
						</el-form-item>
						<el-form-item>
							<el-checkbox v-model="rememberPassword" label="记住密码" @change="doRememberPassword"></el-checkbox>
							<el-button type="text" @click="forgetPasswordFormVisible = true">忘记密码</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="用户注册" name="second">
					<el-alert v-if="codeMes" :title="codeMes" type="error" center show-icon>
					</el-alert>
					<el-form :label-position="labelPosition" :rules="rules2" ref="registerForm" :model="registerForm" label-width="80px">
						<el-form-item label="身份证号" prop="idCard">
							<el-input v-model="registerForm.idCard" placeholder="请输入您的身份证号"></el-input>
						</el-form-item>
						<el-form-item label="手机号" prop="phoneNum">
							<el-input v-blur="flag" v-on:blur="flag=false" v-model="registerForm.phoneNum" placeholder="请输入手机号码"></el-input>
							<el-button :plain="true" :disabled="buttonStatus1" @click="getSecurityCode(registerForm.phoneNum,1)">{{buttonText1}}</el-button>
						</el-form-item>
						<el-form-item label="验证码" prop="securityCode">
							<el-input v-model="registerForm.securityCode" placeholder="请输入验证码"></el-input>
						</el-form-item>
						<el-form-item label="设置密码" prop="password2">
							<el-input type="password" v-model="registerForm.password2" placeholder="6~12位数字或者字母组合"></el-input>
						</el-form-item>
						<el-form-item label="确认密码" prop="password3">
							<el-input type="password" v-model="registerForm.password3" placeholder="请再次输入密码"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button style="width: 100%;" type="primary" @click="register('registerForm')">注册</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>

		</div>
		<div class="img">
			<img src="../../assets/img/loginbg2.png" alt="" />
		</div>
		<div class="registerForm">
			<el-dialog title="找回密码" :visible.sync="forgetPasswordFormVisible">
				<el-alert v-if="dialogIsShow" :title="this.notice2" type="error" center show-icon>
				</el-alert>
				<el-form :rules="rules3" ref="getPasswordform" :model="getPasswordform">
					<el-form-item label="身份证号" prop="idCard">
						<el-input v-model="getPasswordform.idCard" placeholder="请输入您的身份证号"></el-input>
					</el-form-item>
					<el-form-item label="手机号" prop="phoneNum">
						<el-input v-blur="flag" v-on:blur="flag=false" v-model="getPasswordform.phoneNum" placeholder="请输入手机号码"></el-input>
						<el-button :plain="true" :disabled="buttonStatus2" @click="getSecurityCode(getPasswordform.phoneNum,2)">{{buttonText2}}</el-button>
					</el-form-item>
					<el-form-item label="验证码" prop="securityCode">
						<el-input v-model="getPasswordform.securityCode" placeholder="请输入验证码"></el-input>
					</el-form-item>
					<el-form-item label="设置密码" prop="password2">
						<el-input type="password" v-model="getPasswordform.password2" placeholder="6~12位数字或者字母组合"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="password3">
						<el-input type="password" v-model="getPasswordform.password3" placeholder="请再次输入密码"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button style="width: 100%;" type="primary" @click="onSubmit3('getPasswordform')">确认</el-button>
					</el-form-item>
				</el-form>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import cookieApi from '../../assets/js/cookieApi'
	export default {
		data() {
			//注册验证两次密码是否一致的全部变量
			var checkPass1 = (rule, value, callback) => {
				if(value !== this.registerForm.password2) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			var checkPass2 = (rule, value, callback) => {
				if(value !== this.getPasswordform.password2) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				labelPosition: "top",
				notice: '', //登陆错误提示
				notice2: '', //找回密码错误提示
				loginForm: {
					username: '',
					password: '',
					check: ''
				},
				registerForm: {
					idCard: '',
					phoneNum: '',
					securityCode: '',
					password2: '',
					password3: ''
				},
				getPasswordform: {
					idCard: '',
					phoneNum: '',
					securityCode: '',
					password2: '',
					password3: ''
				},
				rules1: {
					//登陆
					username: [ //用户名
						{
							required: true,
							message: '请输入手机号码',
							trigger: 'blur'
						},
						{
							pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
							trigger: 'blur',
							message: '格式不正确'
						}
					],
					password: [ //密码
						{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 12,
							message: '密码长度不正确',
							trigger: 'blur'
						}
					],
					check: [ //验证码
						{
							required: true,
							message: '请输入验证码',
							trigger: 'blur'
						}
					]
				},
				rules2: {
					//用户注册
					idCard: [ //身份证
						{
							required: true,
							message: '请输入身份证号码',
							trigger: 'blur'
						},
						{
							pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
							trigger: 'blur',
							message: '格式不正确'
						}
					],
					phoneNum: [ //手机号码（用户名）
						{
							required: true,
							message: '请输入手机号码',
							trigger: 'blur'
						},
						{
							pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
							trigger: 'blur',
							message: '格式不正确'
						}
					],
					securityCode: [ //验证码
						{
							required: true,
							message: '请输入验证码',
							trigger: 'blur'
						}
					],
					password2: [ //密码1
						{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 12,
							message: '密码长度不正确',
							trigger: 'blur'
						}
					],
					password3: [ //密码2
						{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 12,
							message: '密码长度不正确',
							trigger: 'blur'
						},
						{
							validator: checkPass1,
							trigger: 'blur'
						}
					]
				},
				rules3: {
					//用户注册
					idCard: [ //身份证
						{
							required: true,
							message: '请输入身份证号码',
							trigger: 'blur'
						},
						{
							pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
							trigger: 'blur',
							message: '格式不正确'
						}
					],
					phoneNum: [ //手机号码（用户名）
						{
							required: true,
							message: '请输入手机号码',
							trigger: 'blur'
						},
						{
							pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
							trigger: 'blur',
							message: '格式不正确'
						}
					],
					securityCode: [ //验证码
						{
							required: true,
							message: '请输入验证码',
							trigger: 'blur'
						}
					],
					password2: [ //密码1
						{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 12,
							message: '密码长度不正确',
							trigger: 'blur'
						}
					],
					password3: [ //密码2
						{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 12,
							message: '密码长度不正确',
							trigger: 'blur'
						},
						{
							validator: checkPass2,
							trigger: 'blur'
						}
					]
				},
				activeName2: 'first',
				rememberPassword: false,
				forgetPasswordFormVisible: false,
				formLabelWidth: '120px',
				dialogIsShow: false, //找回密码错误提示
				fail: false, //登陆错误提示
				bg: require('../../assets/img/loginbg.jpg'),
				codeMes: "",
				isfocus: true,
				flag: false,
				buttonText1: "获取验证码",
				buttonStatus1: false,
				buttonText2: "获取验证码",
				buttonStatus2: false
			}
		},
		mounted: function() {
			this.loadAccountInfo();
		},
		methods: {
			login(loginForm) {
				this.$refs[loginForm].validate((valid) => {
					if(valid) {
						this.$axios.post(this.$api.login.login, {
								username: this.loginForm.username,
								password: this.loginForm.password
							})
							.then((response) => {
								// console.log(response); 
								//登录失败
								if(response.data.code === "400" || response.data.code === "500") {
									this.fail = true;
									this.notice = response.data.detailMessage;
								}
								//登录成功
								if(response.data.code == "200") {
									//保存token 
									console.log(response.data.data.hospital);
									sessionStorage.setItem("loginToken", response.data.data.token);
									sessionStorage.setItem("hospitalId", response.data.data.hospital);
									sessionStorage.setItem("userId", response.data.data.userId);
									sessionStorage.setItem("username", response.data.data.username);
									sessionStorage.setItem("idcard", response.data.data.idcard);
									//sessionStorage.setItem("currentLoginHospitalName",response.data.data.hospitalName);
									sessionStorage.setItem("currentLoginName", response.data.data.name);
									if(response.data.data.name != null) {
										sessionStorage.setItem("name", response.data.data.name);
									} else {
										sessionStorage.setItem("name", response.data.data.username);
									}
									window.sessionStorage.menuList = JSON.stringify(response.data.data.roleList[0].menuList);
									// console.log(sessionStorage.menuList);
									this.fail = false;
									//记住密码 
									if(this.rememberPassword) {
										// console.log("勾选了记住密码，现在开始写入cookie");
										var username = this.loginForm.username;
										var password = this.loginForm.password;
										var accountInfo = username + "&" + password;
										cookieApi.setCookie('accountInfo', accountInfo, 1440 * 7); //设置7天时间
										// mySelf.$router.push('/home')
									} else {
										// console.log("没有勾选记住密码，现在开始删除账号cookie");
										cookieApi.delCookie('accountInfo');
									}
									//角色判断
									if(response.data.data.roleList.length != 0) {
										var roleId = response.data.data.roleList[0].roleId;
										sessionStorage.setItem("roleId", roleId);
										if(this.$route.query.redirect) {
											let redirect = this.$route.query.redirect;
											this.$router.push(redirect);
										} else {
											if(roleId === 2 || roleId === 8) { //机构管理员   
												// sessionStorage.setItem("stats",'/home/dataStats2'); 
												this.$router.push('/home/dataStats2');
											}
											if(roleId === 3 || roleId === 5) { //医生或者专家
												this.$router.push('/home/consultationList');
											}
											if(roleId === 4) { //卫计委 
												// sessionStorage.setItem("stats",'/home/dataStats'); 
												// this.$router.push('/home/dataStats'); 
												this.$router.push('/home/map');
											}
											if(roleId == 6) { //患者个人
												this.$router.push('/home/cloudFilm');
											}
										}
									}
								}
							})
							.catch(function(error) {
								console.log(error);
							});

					} else {
						console.log('登陆失败');
						return false;
					}
				});

			},
			//注册
			register(registerForm) {
				this.$refs[registerForm].validate((valid) => {
					if(valid) {
						//验证码验证
						this.$axios.post(this.$api.login.checkVerificationCode, {
							username: this.registerForm.phoneNum,
							code: this.registerForm.securityCode
						}).then((response) => {
							//  console.log( response);
							if(response.data.code == "200") {
								this.codeMes = "";
								this.$axios.post(this.$api.login.register, {
									username: this.registerForm.phoneNum,
									password: this.registerForm.password2,
									idcard: this.registerForm.idCard, //身份证
									roleList: [{
										roleId: 6
									}]
								}).then((response) => {
									//  console.log( response);
									//注册成功
									if(response.data.code !== "200") {
										this.codeMes = response.data.detailMessage;
									} else {
										this.codeMes = "";
										this.$alert('恭喜您，账号注册成功，赶快登录吧！', '注册成功', {
											confirmButtonText: '确定',
											callback: action => {
												this.activeName2 = "first";
											}
										});
									}
								}).catch(function(error) {
									console.log(error);
								});
							} else if(response.data.code == "500") {
								this.codeMes = response.data.message;
							}
						}).catch(function(error) {
							console.log(error);
						});

					} else {
						// console.log('error submit!!');
						return false;
					}
				});
				console.log('注册!');

			},
			onSubmit3(getPasswordform) { //找回密码
				this.$refs[getPasswordform].validate((valid) => {
					if(valid) {
						//验证码验证
						this.$axios.post(this.$api.login.checkVerificationCode, {
							username: this.getPasswordform.phoneNum,
							code: this.getPasswordform.securityCode
						}).then((response) => {
							if(response.data.code == "200") {
								this.dialogIsShow = false;
								this.$axios.post(this.$api.login.resetPassword, {
									username: this.getPasswordform.phoneNum,
									password: this.getPasswordform.password2,
									idcard: this.getPasswordform.idCard //身份证
								}).then((response) => {
									//  console.log(response);
									//找回密码成功
									if(response.data.code == "200") {
										this.dialogIsShow = false;
										this.$alert('密码找回成功', '提示消息：', {
											confirmButtonText: '确定',
											type: "success",
											callback: function() {
												forgetPasswordFormVisible: false;
											}
										});
									} else {
										this.dialogIsShow = true;
										this.notice2 = response.data.detailMessage;
									}
								}).catch(function(error) {
									console.log(error);
								});
							} else {
								this.dialogIsShow = true;
								this.notice2 = response.data.message;
							}
						}).catch(function(error) {
							console.log(error);
						});

					} else {
						return false;
					}
				});

			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			open4() {
				const h = this.$createElement;
				this.$msgbox({
					title: '找回密码',
					message: h('p', null, [
						h('span', null, '内容可以是 '),
						h('i', {
							style: 'color: teal'
						}, 'VNode')
					]),
					showCancelButton: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					beforeClose: (action, instance, done) => {
						if(action === 'confirm') {
							instance.confirmButtonLoading = true;
							instance.confirmButtonText = '执行中...';
							setTimeout(() => {
								done();
								setTimeout(() => {
									instance.confirmButtonLoading = false;
								}, 300);
							}, 3000);
						} else {
							done();
						}
					}
				}).then(action => {
					this.$message({
						type: 'info',
						message: 'action: ' + action
					});
				});
			},
			getSecurityCode(username, type) { //获取验证码
				let regex = /^1[3|4|5|7|8][0-9]\d{8}$/;
				if(regex.test(username)) {
					this.$axios.post(this.$api.login.sendVerificationCode, {
						username
					}).then((response) => {
						if(response.data.code == "200") {
							this.setTime(type);
							this.$message({
								message: '获取验证码成功！',
								type: "success"
							});
						}
					}).catch(function(error) {
						console.log(error);
					});
				} else if(username == "") {
					this.flag = true;
				}
			},
			setTime(type) { //重新获取验证码
				if(type == 1) {
					let countdown = 60;
					this.buttonStatus1 = true;
					this.buttonText1 = `${countdown}秒后重新获取`;
					var myself = this;
					let interval = setInterval(function() {
						countdown--;
						myself.buttonText1 = `${countdown}秒后重新获取`;
						if(countdown <= 0) {
							clearInterval(interval);
							myself.buttonStatus1 = false;
							myself.buttonText1 = `获取验证码`;
						}
					}, 1000)
				} else {
					let countdown = 60;
					this.buttonStatus2 = true;
					this.buttonText2 = `${countdown}秒后重新获取`;
					var myself = this;
					let interval = setInterval(function() {
						countdown--;
						myself.buttonText2 = `${countdown}秒后重新获取`;
						if(countdown <= 0) {
							clearInterval(interval);
							myself.buttonStatus2 = false;
							myself.buttonText2 = `获取验证码`;
						}
					}, 1000)
				}

			},
			doRememberPassword() {
				console.log(this.rememberPassword)
			},
			loadAccountInfo() { //记住密码之后的自动填入

				let mySelf = this;
				let accountInfo = cookieApi.getCookie('accountInfo');
				//如果cookie里没有账号信息  
				if(Boolean(accountInfo) == false) {
					// console.log('cookie中没有检测到账号信息！');
					return false;
				} else {
					//如果cookie里有账号信息  
					// console.log('cookie中检测到账号信息！现在开始预填写！');
					let userName = "";
					let passWord = "";
					let index = accountInfo.indexOf("&");

					userName = accountInfo.substring(0, index);
					passWord = accountInfo.substring(index + 1);

					mySelf.loginForm.username = userName;
					mySelf.loginForm.password = passWord;
					mySelf.rememberPassword = true;
				}
			}

		}
	};
</script>
<style>
	.login {
		width: 100%;
		height: 100%;
		background-size: cover;
		overflow: hidden;
	}
	
	.login .img {
		float: right;
		height: 100%;
	}
	
	.login img {
		height: 100%;
	}
	
	.login .loginForm {
		width: 40%;
		float: right;
		height: 100%;
		background: white;
		box-sizing: border-box;
		position: relative;
	}
	
	.loginForm .el-tabs {
		width: 380px;
		height: 540px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -270px;
		margin-left: -190px;
	}
	
	.loginForm .el-form-item,
	.registerForm .el-form-item {
		margin-bottom: 15px;
	}
	
	.loginForm .el-form-item__label,
	.registerForm .el-form-item__label {
		font-size: 16px;
		padding: 0;
		line-height: 35px;
	}
	/*修改登录按钮样式*/
	
	.loginForm .el-button--primary,
	.registerForm .el-button--primary {
		border-radius: 27px;
		height: 46px;
		font-size: 18px;
		background: #0d63ae;
		border: none;
		margin-top: 18px;
	}
	
	.loginForm .el-button--primary:focus,
	.loginForm .el-button--primary:hover,
	.registerForm .el-button--primary:focus,
	.registerForm .el-button--primary:hover {
		background: #0d63ae;
		border-color: #0d63ae;
	}
	
	.loginForm .el-button--primary:active,
	.registerForm .el-button--primary:active {
		outline: 0;
		background: rgba(13, 99, 174, 0.5);
	}
	/*修改用户注册和用户登录菜单栏*/
	
	.loginForm .el-tabs--card>.el-tabs__header {
		border: none;
		padding-left: 0;
		margin: 0 0 20px;
	}
	
	.loginForm .el-tabs--card>.el-tabs__header .el-tabs__nav {
		border: none;
	}
	
	.login .loginForm .el-tabs--card>.el-tabs__header .el-tabs__item {
		border: none;
		padding: 0px 30px;
		font-size: 16px;
	}
	
	.loginForm .el-tabs--card>.el-tabs__header .el-tabs__item:hover,
	.loginForm .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
		color: #0d63ae;
	}
	
	.loginForm .el-tabs__item::after {
		content: "";
		display: inline-block;
		width: 24px;
		height: 24px;
		position: absolute;
		left: 0px;
		top: 7px;
	}
	
	.loginForm #tab-first::after {
		background: url(../../assets/img/icon-login2.png) no-repeat;
	}
	
	.loginForm #tab-first.is-active::after {
		background: url(../../assets/img/icon-login.png) no-repeat;
	}
	
	.loginForm #tab-second::after {
		background: url(../../assets/img/icon-register2.png) no-repeat;
	}
	
	.loginForm #tab-second.is-active::after {
		background: url(../../assets/img/icon-register.png) no-repeat;
	}
	/*修改输入框*/
	
	.loginForm .el-input__inner,
	.registerForm .el-input__inner {
		font-size: 14px;
		padding: 0;
		border: none;
		border-radius: 0;
		border-bottom: 1px solid #aeaeae;
	}
	/*记住密码*/
	
	.login .loginForm .el-checkbox {
		margin-left: 10px;
		font-size: 16px;
	}
	
	.login .loginForm .el-checkbox__label {
		font-size: 16px;
		line-height: 20px;
		padding-left: 6px;
	}
	
	.login .loginForm .el-checkbox__inner {
		border-color: #606266;
		border-radius: 50%;
		zoom: 1.2;
	}
	
	.login .loginForm .is-checked .el-checkbox__inner {
		background-color: #0d63ae;
		border-color: #0d63ae;
	}
	
	.login .loginForm .is-focus .el-checkbox__inner {
		border-color: #606266;
	}
	
	.login .loginForm .is-checked.is-focus .el-checkbox__inner {
		border-color: #0d63ae;
	}
	
	.login .loginForm .el-checkbox__inner:hover,
	.login .loginForm .el-checkbox__label:hover {
		border-color: #0d63ae;
		color: #0d63ae;
	}
	
	.login .loginForm .is-checked .el-checkbox__label {
		color: #0d63ae;
	}
	/*忘记密码*/
	
	.loginForm .el-button--text {
		font-size: 16px;
		float: right;
		color: #0d63ae;
		margin-right: 10px;
	}
	
	.loginForm .el-button--text:focus,
	.loginForm .el-button--text:hover {
		color: #0d63ae;
	}
	/*找回密码*/
	
	.registerForm .el-dialog {
		width: 600px;
	}
	
	.registerForm .el-dialog__title {
		color: #0d63ae;
	}
	
	.registerForm .el-dialog__body {
		padding: 25px 60px 0;
	}
	
	.registerForm .el-button--primary {
		margin-bottom: 40px;
	}
	/*获取验证码*/
	
	.loginForm .el-button.is-plain,
	.registerForm .el-button.is-plain {
		position: absolute;
		right: 0;
		bottom: 4px;
		border: none;
		color: #0d63ae;
	}
</style>