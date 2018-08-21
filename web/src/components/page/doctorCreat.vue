<template>
	<div class="container">
		<h1 class="top-title">医生注册：</h1>
		<div class="doctorRegister">
		<el-collapse v-model="activeNames">
			<el-collapse-item title="用户注册" name="1">
				<div class="registerIfo">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<el-row>
							<el-col :span="12">
								<el-form-item label="真实姓名" prop="name">
									<el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="手机号码" prop="phoneNum">
									<el-input v-model="ruleForm.phoneNum" placeholder="请输入手机号码"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="身份证号" prop="idCard">
									<el-input v-model="ruleForm.idCard" @blur="fillinGenderAndAge" placeholder="请输入身份证号码"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="性别" prop="gender">
									<el-select v-model="ruleForm.gender">
										<el-option label="男" value="1"></el-option>
										<el-option label="女" value="0"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="年龄" prop="age">
									<el-input v-model="ruleForm.age"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="默认密码" prop="password">
									<el-input v-model="ruleForm.password" disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="用户类型" prop="userType">
									<el-select v-model="ruleForm.userType" placeholder="请选择用户类型">
										<el-option label="医生" value="3"></el-option>
										<el-option label="专家" value="5"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="科室" prop="section">
									<el-input v-model="ruleForm.section" placeholder="请输入科室"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="职称" prop="role">
									<el-select v-model="ruleForm.role" placeholder="请选择职称">
										<el-option v-for="item in roles" :label="item.name" :value="item.value" :key="item.name"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-form-item label="简介" prop="introduce">
							<el-input type="textarea" v-model="ruleForm.introduce" placeholder="请填写简介"></el-input>
						</el-form-item>
						<el-form-item label="擅长领域" prop="skilled">
							<el-input type="textarea" v-model="ruleForm.skilled" placeholder="请填写擅长领域"></el-input>
						</el-form-item>
						<el-row>
							<el-col :span="12">
								<el-form-item>
									<el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
									<el-button @click="resetForm('ruleForm')">重置</el-button>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-row>
									<el-col :span="8">
										<el-form-item>
											<!-- <el-button type="primary" @click="">批量注册</el-button> -->
											<el-upload :action="actionUrl" :show-file-list="false" :on-success="success">
												<el-button size="small" type="primary">批量注册</el-button>
											</el-upload>
										</el-form-item>
									</el-col>
									<el-col :span="16">
										<el-form-item>
											<el-button @click="downModel">下载模板</el-button>
										</el-form-item>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
					</el-form>
				</div>
			</el-collapse-item>
			<el-collapse-item title="用户注册列表" name="4">
				<div class="userList">
					<!-- @cell-mouse-enter="tableHover" -->
					<el-table :data="tableData" border style="width: 100%" @row-click="rowClick">
						<el-table-column prop="name" label="姓名" width="100px" align="center"></el-table-column>
						<el-table-column prop="idcard" label="身份证号" align="center"></el-table-column>
						<el-table-column label="性别" width="80" align="center">
							<template slot-scope="scope">
								{{ scope.row.sex==1? '男' : '女' }}
							</template>
						</el-table-column>
						<el-table-column prop="age" label="年龄" width="80" align="center"></el-table-column>
						<el-table-column prop="username" label="手机号" width="110" align="center"></el-table-column>
						<el-table-column prop="roleList[0].roleName" label="用户类型" width="100px" align="center"></el-table-column>
						<el-table-column prop="department" label="科室" width="100" align="center"></el-table-column>
						<el-table-column label="职称" width="180" align="center">
							<template slot-scope="scope">
								<span v-if="scope.row.title==1">主治医师</span>
								<span v-else-if="scope.row.title==2">副主任医师</span>
								<span v-else-if="scope.row.title==3">主任医师</span>
								<span v-else>医士，医师/住院医师</span>
							</template>
						</el-table-column>
						<!--<el-table-column prop="synopsis" label="简介" :show-overflow-tooltip="overflow" align="center"></el-table-column>-->
						<!--<el-table-column prop="beGoodAt" label="擅长领域" :show-overflow-tooltip="overflow" align="center"></el-table-column>-->
						<el-table-column label="状态" width="100" align="center">
							<template slot-scope="scope">
								<span style="font-weight: 700;" v-if="scope.row.status==1">已激活</span>
								<span style="color:red;font-weight: 700;" v-else-if="scope.row.status==-1">已驳回</span>
								<span style="color:#00618d;font-weight: 700;" v-else>待审核</span>
							</template>
						</el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<el-button type="text" size="mini" class="iconfont icon-tianxiebaogao1">修改详情</el-button>
								<el-button v-if="scope.row.status==-1" @click.stop="queryRemarks(scope.row.username)" class="iconfont icon-chakanbaogao1" size="mini" type="text">查看原因</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination style="text-align:center;margin-top: 30px;" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="10" layout="total, prev, pager, next,jumper" :total="totalNumber">
					</el-pagination>
				</div>
			</el-collapse-item>
		</el-collapse>
		</div>

		<div class="clear"></div>
		<el-dialog :visible.sync="dialogVisible">
			<div slot="title">
				<span>用户列表</span>
				<button type="button" aria-label="Close" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button>
			</div>
			<div class="mes-box">
				<el-row>
					<el-col :span="20">
						<p class="doctor">
							<el-input placeholder="请输入姓名" v-model="userList.name">
								<i class="el-icon-edit el-input__icon" slot="suffix"></i>
							</el-input>
						</p>
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
						<span class="num-title">身份证号：</span>
						<span>
							<el-input placeholder="请输入身份证号码" v-model="userList.idcard">
								<i class="el-icon-edit el-input__icon" slot="suffix"></i>
							</el-input>
						</span>
						<span class="num-title">手机号：</span>
						<span class="teleohone">
							<el-input placeholder="请输入电话号码" v-model="userList.username">
								<i class="el-icon-edit el-input__icon" slot="suffix"></i>
							</el-input>
						</span>
					</p>
				</div>
				<div class="cont-box">
					<div>
						<p class="headline">简 介：</p>
						<el-input type="textarea" :rows="3" placeholder="请输入简介" v-model="userList.synopsis">
						</el-input>
					</div>
					<div class="cont-second">
						<p class="headline">擅长领域：</p>
						<el-input type="textarea" :rows="3" placeholder="请输入简介" v-model="userList.beGoodAt">
						</el-input>
					</div>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="makesureModify">确认修改</el-button>
				<el-button @click="dialogVisible = false">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [], //医生列表
				roles: [], //角色
				currentPage1: 1, //默认页
				totalNumber: 0,
				dialogVisible: false,
				overflow: true,
				activeNames: ['1'], //折叠面板
				hospitalId: sessionStorage.getItem("hospitalId"),
				userList: {},
				actionUrl: this.$api.doctorCreat.actionUrl,
				ruleForm: {
					name: "",
					phoneNum: "",
					password: "123456",
					idCard: "",
					userType: "",
					hospital: "",
					section: "",
					role: "",
					introduce: "",
					skilled: "",
					gender: "",
					age: ""
				},
				rules: {
					name: [{
							required: true,
							message: "请输入活动名称",
							trigger: "blur"
						},
						{
							min: 2,
							max: 4,
							message: "长度在 3 到 5 个字符",
							trigger: "blur"
						}
					],
					phoneNum: [{
							required: true,
							message: "请输入手机密码",
							trigger: "blur"
						},
						{
							pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
							trigger: "blur",
							message: "格式不正确"
						}
					],
					password: [{
						required: true
					}],
					idCard: [
						//身份证
						{
							required: true,
							message: "请输入身份证号码",
							trigger: "blur"
						},
						{
							pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
							trigger: "blur",
							message: "格式不正确"
						}
					],
					gender: [{
						required: true,
						message: "请选择性别",
						trigger: "blur"
					}],
					age: [{
						required: true,
						message: "请输入年龄",
						trigger: "blur"
					}],
					userType: [{
						required: true,
						message: "请选择用户类型",
						trigger: "blur"
					}],
					section: [{
						required: true,
						message: "请输入科室",
						trigger: "blur"
					}],
					role: [{
						required: true,
						message: "请选择职称",
						trigger: "blur"
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if(valid) {
						this.$axios.post(this.$api.doctorCreat.sysUser, {
								username: this.ruleForm.phoneNum,
								name: this.ruleForm.name,
								password: "123456", //密码
								sex: this.ruleForm.gender == "男" ? 1 : 0,
								age: this.ruleForm.age,
								idcard: this.ruleForm.idCard,
								department: this.ruleForm.section,
								title: this.ruleForm.role,
								synopsis: this.ruleForm.introduce,
								beGoodAt: this.ruleForm.skilled,
								roleList: [{
									roleId: this.ruleForm.userType
								}],
								hospital: sessionStorage.getItem("hospitalId")
							})
							.then(response => {
								//注册成功
								if(response.data.code == "200") {
									this.$alert("账号注册成功", "注册成功", {
										confirmButtonText: "确定",
										callback: action => {
											console.log("回调函数");
											this.getUserList(1); //页面初始化
										}
									});
								} else {
									this.$alert(response.data.detailMessage, "提示：", {
										confirmButtonText: "确定",
										callback: action => {
											console.log("回调函数");
										}
									});
								}
							})
							.catch(function(error) {
								console.log(error);
							});
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			queryGenderAndAge(idCard, num) {
				//查询年龄和性别
				if(num == 1) {
					//获取性别
					if(parseInt(idCard.substr(16, 1)) % 2 == 1) {
						return "男";
					} else {
						return "女";
					}
				}
				if(num == 2) {
					//获取年龄
					var myDate = new Date();
					var month = myDate.getMonth() + 1;
					var day = myDate.getDate();
					var age = myDate.getFullYear() - idCard.substring(6, 10) - 1;
					if(
						idCard.substring(10, 12) < month ||
						(idCard.substring(10, 12) == month && idCard.substring(12, 14) <= day)
					) {
						age++;
					}
					return age;
				}
			},
			fillinGenderAndAge() {
				//填写完身份证好好之后自动填写性别和年龄
				let reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
				if(this.ruleForm.idCard != "" && reg.test(this.ruleForm.idCard)) {
					let gender = this.queryGenderAndAge(this.ruleForm.idCard, 1);
					let age = this.queryGenderAndAge(this.ruleForm.idCard, 2);
					this.ruleForm.age = age;
					this.ruleForm.gender = gender;
				}
			},
			getRoles() {
				//调用接口 获取医生角色
				this.$axios.post(this.$api.doctorCreat.getRoles, {
						type: "dict_title"
					})
					.then(res => {
						if(res.data.code == "200") {
							this.roles = res.data.data;
						}
					})
					.catch(error => {
						console.log(error);
					});
			},
			getUserList(num) {
				//调用接口 获取医生列表
				this.$axios.post(this.$api.doctorCreat.getUserList, {
						currentPage: num,
						hospital: sessionStorage.getItem("hospitalId")
					})
					.then(res => {
						console.log(res);
						if(res.data.code == "200") {
							this.tableData = res.data.data.data;
							this.totalNumber = res.data.data.pageCount;
						}
					})
					.catch(error => {
						console.log(error);
					});
			},
			handleCurrentChange(val) {
				//点击上下页回调
				this.getUserList(val);
			},
			// tableHover(row, column, cell, event){//鼠标进入单元格之后
			// 	console.log(cell.getElementsByClassName("cell")[0].innerText)
			// },
			rowClick(row, event, column) {
				//单击某一行的时候
				this.dialogVisible = true;
				this.userList = Object.assign({}, row);
				console.log(JSON.stringify(this.userList, null, 2))
				console.log(JSON.stringify(row, null, 2))
			},
			success(response, file, fileList) {
				console.log(response);
				if(response.code === "200") {
					this.$message({
						message: response.detailMessage,
						type: "success"
					});
				}
				if(response.code === "400") {
					console.log(typeof response.data === "string");
					if(typeof response.data === "string") {
						this.$message({
							message: response.data + "," + response.detailMessage,
							type: "warning"
						});
					} else {
						this.$message({
							message: response.data.username + "," + response.detailMessage,
							type: "warning"
						});
					}
				}
				if(response.code === "500") {
					this.$message({
						message: response.data.username + "," + response.detailMessage,
						type: "warning"
					});
				}
			},
			downModel() {
				window.location.href =this.$api.doctorCreat.downModel+this.hospitalId;
			},
			makesureModify() { //确定修改
				if(this.userList.name != "" && this.userList.username != "" && this.userList.idcard != "") {
					this.$confirm('确认修改此用户信息？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.modifyDoctorInfo();
					}).catch(() => {});
				} else {
					this.$alert("姓名/身份证号/电话号码不能为空", '修改失败：', {
						confirmButtonText: '确定',
						type: 'error'
					});
				}

			},
			modifyDoctorInfo() { //修改表格数据
				this.$axios.post(this.$api.doctorCreat.modifyDoctorInfo, this.userList).then((res)=> { 
					if(res.data.code == "200") {
						this.$alert(res.data.detailMessage, '提示：', {
							confirmButtonText: '确定',
							type: "success",
							callback: action => {
								this.dialogVisible = false;
								this.getUserList(1); //页面初始化
							}
						})
					} else {
						this.$alert(res.data.detailMessage, '提示：', {
							confirmButtonText: '确定',
							type: "error"
						});
					}
				}).catch(function(error) {
					console.log(error);
				});

			},
			queryRemarks(username) { //查看原因
				this.$axios.get(this.$api.doctorCreat.queryRemarks,{
						params: {
							username
						}
					}).then((res) => {
						this.$alert(res.data.data, '驳回原因', {
							confirmButtonText: '确定',
							callback: action => {}
						});
						console.log(res)
					})
					.catch((error) => {
						console.log(error)
					})

			}
		},
		mounted() {
			this.getRoles();
			this.getUserList(1); //页面初始化
			console.log(this.hospitalId);
		}
	};
</script>

<style>	
	/*用户列表表格*/
	.userList .cell {
		/*显示单行*/
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		/*以下适合手机端和webkit*/
		/*overflow : hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;*/
	}
	
	.el-tooltip__popper.is-dark {
		/*border:none;
background: rgba(5,126,255,0.5);
color: #fff;*/
		font-size: 14px;
		line-height: 20px;
		width: 300px;
	}
	/* .el-tooltip__popper[x-placement^=top] .popper__arrow::after{
		border-top-color: rgba(5,126,255,0.3);
	}
	.el-tooltip__popper[x-placement^=top] .popper__arrow{
		border-top-color: rgba(5,126,255,0.3);
		
	}   */
	
	.userList .el-table .el-button {
		padding: 10px 2px;
	}
	
	
	
	
	/*用户详情 弹框*/
	.mes-box {
		padding-left: 10px;
	}
	
	.cont-box .el-textarea__inner {
		font-family: Microsoft YaHei;
		text-indent: 2em;
	}
	
	.el-dialog__header {
		border-bottom: 1px solid #ddd;
		background: #f8fafd;
	}
	
	.doctor .el-input__inner {
		font-size: 22px;
		color: #333;
		border: none;
		border-radius: 0;
		border-bottom: 1px solid #dcdfe6;
		width: 180px;
	}
	
	.doctor .el-input {
		width: 180px;
		margin-bottom: 20px;
	}
	
	/*身份证号码电话号码*/
	
	.mes-num .el-input {
		width: 200px;
	}
	
	.mes-num .teleohone .el-input {
		width: 150px;
	}
	
	.mes-num .el-input__inner {
		border: none;
		border-radius: 0;
		border-bottom: 1px solid #dcdfe6;
	}
	
	.divide-b {
		margin-right: 10px;
		border-left: 1px solid #0d63ee;
	}
	
	.sex,
	.age,
	.position,
	.office,
	.hospital {
		margin-right: 10px;
	}
	
	.mes-num {
		height: 60px;
		border-top: 1px dashed #e5e5e5;
		border-bottom: 1px dashed #e5e5e5;
	}
	
	.mes-num p {
		line-height: 50px;
		font-size: 14px;
		color: #666;
	}
	
	.num-title {
		color: #999;
	}
	
	.num-title+span {
		margin-right: 8%;
	}
	
	.cont-box {
		margin-top: 20px;
		font-size: 14px;
	}
	
	.cont-box p {
		float: left;
	}
	
	.headline {
		color: #006699;
		font-weight: bold;
	}
	
	.cont-second {
		padding-top: 20px;
	}
	
	.mes-box img {
		width: 70px;
		height: 90px;
	}
	
	
/*修改折叠面板样式*/
	.doctorRegister {
		padding: 0 25px;
		background-color: #fff;
		box-sizing: border-box;
		border-radius: 5px;
		box-shadow: 0px 0px 3px 0px rgba(49, 78, 104, 0.1);
	}
	
	.doctorRegister .el-collapse {
		border: none;
	}
	
	.doctorRegister .el-collapse-item__header {
		font-size: 14px;
		height: 105px;
		line-height: 105px;
	}
	
	.doctorRegister .el-collapse-item__header.is-active {
		border-bottom: 1px dashed #ebeef5;
	}
	
	.doctorRegister .el-collapse-item__arrow {
		line-height: 105px;
		float: left;
	}
	/*用户注册*/
	
	.doctorRegister .registerIfo {
		margin-top: 30px;
		width: 760px;
	}
	
	.doctorRegister .el-select {
		display: block;
	}
	
	
	/*用户列表*/
	.doctorRegister .userList {
		margin-top: 30px;
	}

	
</style>