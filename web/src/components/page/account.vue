<template>
	<div class="container" :class="{leader:isLeader}">
		<h1 class="top-title">账户与安全：</h1>
		<div class="information">
			<el-collapse v-model="activeNames">
				<el-collapse-item title="个人信息" name="1">
					<div class="detailIfo" v-if="detailIfoIsShow==6">
						<el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="100px" class="demo-userInfo">
							<el-row>
								<el-col :span="12">
									<el-form-item label="真实姓名" prop="name" >
										<el-input v-model="userInfo.name" disabled></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="手机号码" prop="username" >
										<el-input v-model="userInfo.username" disabled></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item label="身份证号" prop="idcard">
										<el-input v-model="userInfo.idcard" disabled></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="性别" prop="sex">
										<el-select v-model="userInfo.sex" disabled>
											<el-option label="男" value="1"></el-option>
											<el-option label="女" value="0"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="年龄" prop="age">
										<el-input v-model="userInfo.age" disabled></el-input>
									</el-form-item>
								</el-col>
							</el-row>
						</el-form>
					</div>
					
					<div class="detailIfo" v-if="detailIfoIsShow!=6">
						<el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="100px" class="demo-userInfo">
							<el-row>
								<el-col :span="12">
									<el-form-item label="真实姓名" prop="name" >
										<el-input v-model="userInfo.name" disabled></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="手机号码" prop="username" >
										<el-input v-model="userInfo.username" disabled></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item label="身份证号" prop="idcard">
										<el-input v-model="userInfo.idcard" disabled></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="性别" prop="sex">
										<el-select v-model="userInfo.sex" disabled>
											<el-option label="男" value="1"></el-option>
											<el-option label="女" value="0"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="年龄" prop="age">
										<el-input v-model="userInfo.age" disabled></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item label="用户类型" prop="userType" >
										<el-select v-model="userInfo.roleList[0].roleId" placeholder="请选择用户类型" disabled>
											<el-option v-for = "(item,index) in userTypeList" :key = "index" :label="item.label" :value="item.value"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="医院" prop="hospital">
										<el-input v-model="userInfo.hospitalName" disabled></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item label="科室" prop="department">
										<el-input v-model="userInfo.departmentName"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="职称" prop="title">
										<el-select v-model="userInfo.title" placeholder="请选择职称">
											<el-option v-for = "(item,index) in roles" :key = "index" :label="item.name" :value="item.value"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>
							<el-form-item label="简介" prop="introduce">
								<el-input type="textarea" v-model="userInfo.synopsis"></el-input>
							</el-form-item>
							<el-form-item label="擅长领域" prop="skilled">
								<el-input type="textarea" v-model="userInfo.beGoodAt"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="saveInfo('userInfo')">立即保存</el-button>
								<el-button @click="resetForm()">重置</el-button>
							</el-form-item>
						</el-form>
					</div>
				</el-collapse-item>
				<el-collapse-item title="修改密码" name="4">
					<div class="modifyPassword">
						<el-form :model="passwordForm" :rules="rules" ref="passwordForm" label-width="100px" class="demo-userInfo">
							<el-form-item label="原密码" prop="oldPassword">
								<el-input type="password" v-model="passwordForm.oldPassword" placeholder="请输入原密码"></el-input>
							</el-form-item>
							<el-form-item label="新密码" prop="newPassword1">
								<el-input type="password" v-model="passwordForm.newPassword1" placeholder="6~12位数字或者字母组合"></el-input>
							</el-form-item>
							<el-form-item label="确认密码" prop="newPassword2">
								<el-input type="password" v-model="passwordForm.newPassword2" placeholder="请再次输入密码"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="submitPassword('passwordForm')">确认修改</el-button>
							</el-form-item>
						</el-form>
					</div>
				</el-collapse-item>
			</el-collapse>
		</div>

	</div>
</template>
<script>
	export default {
		data() {
			var checkPass = (rule, value, callback) => {
				if(value !== this.passwordForm.newPassword1) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				isLeader:false,
				roleId: sessionStorage.getItem("roleId"),
				num:3,
				roles:[],
				detailIfoIsShow:sessionStorage.getItem("roleId"),//根据角色显示
				userTypeList:[],
				userInfo: {
					userType:"",
					roleList:[{roleId:''}]
				},
				passwordForm: {
					oldPassword: '',
					newPassword1: '',
					newPassword2: ''
				},

				activeNames: ['1'], //折叠面板
				rules: {
					name: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 6,
							message: '长度在 2到 6个字符',
							trigger: 'blur'
						}
					],
					userName: [{
							required: true,
							message: '请输入手机密码',
							trigger: 'blur'
						},
						{
							pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
							trigger: 'blur',
							message: '格式不正确'
						}
					],
					idcard: [ //身份证
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
					gender: [{
						required: true,
						message: '请选择性别',
						trigger: 'blur'
					}],
					age: [{
						required: true,
						message: '请输入年龄',
						trigger: 'blur'
					}],
//					userType: [{
//						required: true,
//						message: '请选择用户类型',
//						trigger: 'blur'
//					}],
//					hospital: [{
//						required: true,
//						message: '请选择医院名称',
//						trigger: 'blur'
//					}],
//					departmentName: [{
//						required: true,
//						message: '请选择科室',
//						trigger: 'blur'
//					}],
					oldPassword: [ //密码1
						{
							required: true,
							message: '请输入旧密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 12,
							message: '旧密码长度不正确',
							trigger: 'blur'
						}
					],
					newPassword1: [ //密码1
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
					newPassword2: [ //密码2
						{
							required: true,
							message: '请再次输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 12,
							message: '密码长度不正确',
							trigger: 'blur'
						},
						{validator: checkPass,trigger: 'blur'}
					]

				}
			};
		},
		methods: {
			saveInfo(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) { 
						this.$axios.post(this.$api.account.saveInfo, this.userInfo).then((res)=> { 
//						this.$axios.post('/cloudform-authority/authority/sysUser/update/v1.0', this.userInfo).then((res)=> { 
//						this.$axios.post('http://192.168.121.91:3030/authority/sysUser/update/v1.0', this.userInfo).then((res)=> { 
							if(res.data.code=="200"){
								this.$alert(res.data.detailMessage, '提示：', {
								 confirmButtonText: '确定',
								 type:"success"
								});
							}else{
								this.$alert(res.data.detailMessage, '提示：', {
								 confirmButtonText: '确定',
								 type:"error"
								});
							}
						}).catch(function(error) {
							console.log(error);
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm() {
				this.getUserInfo();
//				this.$refs[formName].resetFields();
			},
			submitPassword(formName){
				this.$refs[formName].validate((valid) => {
					if(valid) { 
						this.$axios.post(this.$api.account.submitPassword, {
//						this.$axios.post('http://192.168.121.91:3030/authority/updatePassword/v1.0', {
							username:sessionStorage.getItem("username"),
							oldPassword:this.passwordForm.oldPassword,
							newPassword:this.passwordForm.newPassword1
						}).then((res)=> { 
							if(res.data.code==200){
								this.$alert(res.data.detailMessage, '提示：', {
								confirmButtonText: '确定',
								type:"success"
								});
							}else{
								this.$alert(res.data.detailMessage, '提示：', {
								confirmButtonText: '确定',
								type:"error"
								});
							}
							
//							this.$notify({
//					          title: '成功',
//					          message: '这是一条成功的提示消息',
//					          type: 'success'
//					        });
						}).catch(function(error) {
							console.log(error);
						});

					} else {
						console.log('修改密码失败');
						return false;
					}
				});

			},
			getUserInfo(){ 
				//用户类型
				this.userTypeList = [
					{"label":"超级管理员","value":1},
					{"label":"机构管理员","value":2},
					{"label":"机构医生","value":3},
					{"label":"卫计委运维","value":4},
					{"label":"机构专家","value":5},
					{"label":"卫计委主任","value":7}
				]
				//用户信息
				this.$axios.post(this.$api.account.getUserInfo, {
//				this.$axios.post('http://192.168.121.91:3030/authority/sysUser/searchUserInfo/v1.0', {
					username:sessionStorage.getItem("username")
				}).then((res)=> { 
					if(res.data.code==200){
						this.userInfo = res.data.data;
					}
				}).catch(function(error) {
					console.log(error);
				});

			},
			getRoles() {
				//调用接口 获取医生角色
				// this.$axios.post("http://192.168.121.91:3030/authority/dictUtil/queryDictList/v1.0",
				this.$axios.post(this.$api.account.getRoles,
				 {
					"type": "dict_title"
				}).then((res) => {
					if(res.data.code == '200') {
						this.roles = res.data.data;
					}
				}).catch((error) => {
					console.log(error)
				});
				
			},
			
		},
		mounted(){
			this.getRoles();
			this.getUserInfo();
			this.isLeader = this.roleId==4?true:false;
		},
		watch:{
			roles:function(oldVal,newVal){
				console.log(oldVal)
				console.log(newVal)
			}
		}
	}
</script>
<style>
	.information {
		padding: 0 25px;
		background-color: #fff;
		box-sizing: border-box;
		border-radius: 5px;
		box-shadow: 0px 0px 3px 0px rgba(49, 78, 104, 0.1);
	}
	
	.leader .information{
		background-color: #183861;
	}
	
	.information .el-collapse {
		border: none;
	}
	
	.information .el-collapse-item__header {
		font-size: 14px;
		height: 105px;
		line-height: 105px;
	}
	
	.information .el-collapse-item__header.is-active {
		border-bottom: 1px dashed #ebeef5;
	}
	.leader .information .el-collapse-item__header.is-active {
		border-bottom: 1px dashed #1e5991;
	}
	
	.information .el-collapse-item__arrow {
		line-height: 105px;
		float: left;
	}
	/*个人信息*/
	
	.information .detailIfo {
		margin-top: 30px;
		width: 760px;
	}
	
	.information .el-select {
		display: block;
	}
	/*修改密码*/
	
	.information .modifyPassword {
		margin-top: 30px;
		width: 400px;
	}
	
	.leader .information .el-collapse-item__wrap,
	.leader .information .el-collapse-item__header{
		background-color: #183861;
		color: #a5c3ff;
	}
	
	.leader .information .el-collapse-item__header{
		border-bottom: 1px solid #1e5991;
	}
	
	.leader .information .el-collapse-item__wrap{
		border-bottom: 1px solid #1e5991;
	}
</style>

