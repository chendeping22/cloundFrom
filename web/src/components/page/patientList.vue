<template>
	<div class="container patientList" :class="{leader:isLeader}">
		<h1 class="top-title">患者列表：</h1>
		<div class="searchForm">
			<el-form :inline="true" :model="searchForm" :rules="rules" ref="searchForm"  class="demo-form-inline">
				<el-form-item v-if="roleId==4" label="区域归属" prop="area">
					<el-select v-model="searchForm.area" @change="queryHospital" @focus.once="getDict('dict_area')">
						<el-option label="请选择区域" value=""></el-option>
						<el-option :label="item.name" :value="item.value" v-for="item in areaList" :key="item.name"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-if="roleId==4" label="医院名称" prop="hospitalId">
					<el-select v-model="searchForm.hospitalId">
						<el-option label="请选择医院" value=""></el-option>
						<el-option :label="item.name" :value="item.id" v-for="item in hospitalList" :key="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-if="roleId!=4" label="患者姓名" prop="patientName">
					<el-input v-model="searchForm.patientName" placeholder="患者姓名"></el-input>
				</el-form-item>
				<el-form-item label="选择日期" prop="date">
					<el-date-picker v-model="searchForm.date" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" :picker-options="pickerOptions2">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="检查科室" prop="appliedDepartment">
					<el-input v-model="searchForm.appliedDepartment" placeholder="请选择科室"></el-input>
				</el-form-item>
				<el-form-item label="就诊号" prop="accessionNumber">
					<el-input v-model="searchForm.accessionNumber" placeholder="请输入就诊号"></el-input>
				</el-form-item>
				<el-form-item label="患者来源" prop="patientType">
					<el-select v-model="searchForm.patientType">
						<el-option label="请选择患者来源" value=""></el-option>
						<el-option label="门诊" value="门诊"></el-option>
						<el-option label="住院" value="住院"></el-option>
						<el-option label="体检" value="体检"></el-option>
					</el-select>
				</el-form-item>

				<el-collapse>
					<el-collapse-item title="更多查询条件">
						<!--<el-form-item label="检查设备" prop="studyDevice">
							<el-input v-model="searchForm.studyDevice" placeholder="请选择科室"></el-input>
						</el-form-item>
						<el-form-item label="检查类别" prop="modalityType">
							<el-input v-model="searchForm.modalityType" placeholder="请选择类别"></el-input>
						</el-form-item>-->
						<el-form-item label="申请医生" prop="appliedPhysician">
							<el-input v-model="searchForm.appliedPhysician" placeholder="申请医生"></el-input>
						</el-form-item>
						<el-form-item label="审核医生" prop="appoverName">
							<el-input v-model="searchForm.appoverName" placeholder="审核医生"></el-input>
						</el-form-item>
						<el-form-item label="检查所见" prop="objectiveFinding">
							<el-input v-model="searchForm.objectiveFinding" placeholder="检查所见"></el-input>
						</el-form-item>
						<el-form-item label="诊断意见" prop="SubjectiveFinding">
							<el-input v-model="searchForm.SubjectiveFinding" placeholder="诊断意见"></el-input>
						</el-form-item>
					</el-collapse-item>
				</el-collapse>

				<el-form-item>
					<el-button type="primary" @click="switchParams(searchForm,1,'searchForm')">查询</el-button>
					<el-button @click="reset('searchForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>

		<el-collapse>
			<el-collapse-item title="修改表格样式">
				<el-checkbox v-for="item in colList" :key="item.prop" v-model="item.isShow">{{item.label}}</el-checkbox>
			</el-collapse-item>
		</el-collapse>
		<el-table :data="tableData" border style="width: 100%" @row-click="rowClick">
			<el-table-column type="index" label="序号" width="70px" align="center"></el-table-column>
			<el-table-column prop="patientName" label="姓名" width="100px" align="center"></el-table-column>
			<el-table-column prop="patientAge" label="年龄" width="80px" align="center"></el-table-column>
			<el-table-column v-for="item in colList" v-if="item.isShow" :prop="item.prop" :label="item.label" :width="item.width" :key="item.prop" align="center" :show-overflow-tooltip="item.tooltip">
			</el-table-column>
			<el-table-column prop="status" label="操作" align="center">
				<template slot-scope="scope">
					<el-button @click.stop="pacsView(scope.row.studyUID)" type="text" size="mini" class="iconfont icon-chakanbaogao">阅片</el-button>
					<el-button @click.stop="checkReport(scope.row.reportHospital,scope.row.studyUID)" type="text" size="mini" class="iconfont icon-chakanbaogao1">报告</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination style="text-align:center;margin-top: 30px;" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="10" layout="total, prev, pager, next,jumper" :total="totalNumber">
		</el-pagination>
		<div class="clear"></div>

		<!--患者详情对话框-->
		<el-dialog :visible.sync="patientDetailIsVisible" width="70%">
			<div slot="title">
				<span>患者详情：</span>
				<button type="button" aria-label="Close" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button>
			</div>
			<div class="title">基本信息</div>
			<div class="baseInfo">
				<ul>
					<li><b>姓名：</b>{{userList.patientName}}</li>
					<li><b>性别：</b>{{userList.patientSex==1? '男' : '女'}}</li>
					<li><b>年龄：</b>{{userList.patientAge}}</li>
					<li><b>就诊号：</b>{{userList.studyID}}</li>
					<li><b>电话：</b>{{userList.patientTel}}</li>
					<li><b>就诊医院：</b>{{userList.hospitalName}}</li>
					<li><b>患者来源：</b>{{userList.patientType}}</li>
					<li><b>就诊日期：</b>{{userList.studyTime}}</li>

				</ul>
			</div>

			<div class="title">阅片信息</div>
			<div class="pacsInfo">
				<ul>
					<li><b>普通阅片：</b><i style="color:dodgerblue;font-size: 22px;cursor:pointer;" class="iconfont icon-wenjian" @click.stop="pacsView(userList.studyUID)"></i></li>
					<li><b>检查类型：</b>{{userList.checkType}}</li>
					<li><b>检查部位：</b>{{userList.studyBodyPart}}</li>
					<li><b>检查时间：</b>{{userList.studyTime}}</li>
				</ul>
			</div>

			<div class="title">检查所见</div>
			<div class="finding">
				<p>{{userList.objectiveFinding}}</p>
			</div>

			<div class="title">诊断意见</div>
			<div class="register">
				<p>{{userList.SubjectiveFinding}}</p>
			</div>

			<div class="title">就诊医生</div>
			<div class="doctorInfo">
				<ul>
					<li><b>姓名：</b>{{userList.visitDoctor}}</li>
					<li><b>科室：</b>{{userList.appliedDepartment}}</li>
				</ul>
			</div>

			<div slot="footer" class="dialog-footer">
				<el-button @click="patientDetailIsVisible = false">关 闭</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	const typeOptions = ['姓名', '就诊号', '性别', '年龄', '患者来源', '检查部位', '检查设备', '检查时间', '检查科室', '检查所见', '诊断意见', '操作'];
	export default {
		data() {
			return {
				showTypes: typeOptions,
				roleId: sessionStorage.getItem("roleId"),
				isLeader: false, //是否卫计委
				tableData: [],
				colList: [
					//					{
					//						"label": "姓名",
					//						"prop": "patientName",
					//						"width": "100px",
					//						"tooltip": false,
					//						"isShow":true
					//					},
					{
						"label": "就诊号",
						"prop": "accessionNumber",
						//						"width": "150px",
						"tooltip": false,
						"isShow": true
					},
					{
						"label": "性别",
						"prop": "patientGender",
						//						"width": "70px",
						"tooltip": false,
						"isShow": true
					},
					//					{
					//						"label": "年龄",
					//						"prop": "patientAge",
					//						"width": "70px",
					//						"tooltip": false,
					//						"isShow":true
					//					},
					{
						"label": "患者来源",
						"prop": "patientType",
						//						"width": "100px",
						"tooltip": false,
						"isShow": true
					},
					{
						"label": "检查部位",
						"prop": "studyBodyPart",
						//						"width": "150px",
						"tooltip": false,
						"isShow": true
					},
					{
						"label": "检查设备",
						"prop": "studyDevice",
						//						"width": "150px",
						"tooltip": false,
						"isShow": true
					},
					{
						"label": "检查时间",
						"prop": "studyTime",
						//						"width": "200px",
						"tooltip": false,
						"isShow": true
					},
					{
						"label": "检查科室",
						"prop": "appliedDepartment",
						//						"width": "150px",
						"tooltip": false,
						"isShow": true
					},
					{
						"label": "检查所见",
						"prop": "objectiveFinding",
						"width": "",
						"tooltip": true,
						"isShow": true
					},
					{
						"label": "诊断意见",
						"prop": "subjectiveFinding",
						"width": "",
						"tooltip": true,
						"isShow": true
					},
					{
						"label": "申请医生",
						"prop": "appliedPhysician",
						"width": "",
						"tooltip": false,
						"isShow": true
					},
					{
						"label": "审核医生",
						"prop": "appoverName",
						"width": "",
						"tooltip": false,
						"isShow": true
					},
				],
				rules: {
					area: [{
							required: true,
							message: '请选择区域',
							trigger: 'blur,change'
						}
					],
					hospitalId: [{
							required: true,
							message: '请选择医院名称',
							trigger: 'blur,change'
						}
					],
				},
				totalNumber: 0,
				currentPage1: 1, //默认页
				patientDetailIsVisible: false, //患者详情
				userList: {},
				areaList: {}, //行政区列表
				hospitalList: [],
				searchForm: {
					area: "",
					date: "",
					hospitalId: "", //医院ID
					//studyuid: "", //检查ID
					patientName: "", //患者姓名
					appliedDepartment: "", //科室
					studyDevice: "", //检查设备
					modalityType: "", //检查类型
					accessionNumber: "", //就诊号
					patientType: "", //患者来源
					appliedPhysician: "", //申请医生
					appoverName: "", //审核医生
					objectiveFinding: "", //检查所见
					SubjectiveFinding: "", //诊断意见
					rowsCount: 10
				},
				paramsForm: {},
				pickerOptions2: {
					shortcuts: [{
						text: '最近1周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近1月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近3月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
			}
		},
		methods: {
			switchParams(formName, pageNum,formNameStr) {
				this.$refs[formNameStr].validate((valid) => {
					if(valid) {
						for(var key in formName) {
							if(key != "area" && key != "date") {
								this.paramsForm[key] = formName[key]
							}
						};
						this.paramsForm.pageNum = pageNum;
						this.paramsForm.startTime = formName.date[0];
						this.paramsForm.endTime = formName.date[1];
						if(sessionStorage.getItem("hospitalId") && this.roleId != "4") {
							this.paramsForm.hospitalId = sessionStorage.getItem("hospitalId");
						};
						this.currentPage1 = pageNum;
						this.getPatientList(this.paramsForm);
					}
				})		
			},
			getPatientList(params) {	
				this.$axios.post(this.$api.patientList.getPatientList, params).then((res) => {
						if(res.data.code == 200) {
							this.tableData = res.data.data.data;
							this.totalNumber = res.data.data.pageCount;
						}else{
							this.tableData = [];
							this.totalNumber = 0;
						}
					})
					.catch((error) => {
						console.log(error)
					})
			},
			reset(formName) {
				this.$refs[formName].resetFields();
				this.tableData = [];
				this.totalNumber = 0;
			},
			handleCurrentChange(val) { //点击上下页回调
				this.switchParams(this.searchForm, val,'searchForm');
			},
			checkReport(hospitalId, studyUid) { //查看报告					
				var url = this.$api.checkReport+hospitalId+"/"+studyUid;
				window.open(url, "_blank")
			},
			rowClick(row, event, column) { //单击某一行的时候 
				this.patientDetailIsVisible = true;
				this.userList = row;
				// console.log(row)
				// console.log(event);
				// console.log(column);
			},
			pacsView(studyUid) { //阅片
				var url = this.$api.pacsView + studyUid
				window.open(url, "_blank")
			},
			getDict(dict) { //获取行政区
				this.$axios
					// .post("http://192.168.121.91:3030/authority/dictUtil/queryDictList/v1.0",
					.post(this.$api.patientList.getDict, {
						type: dict
					})
					.then(response => {
						// console.log(response)
						this.areaList = response.data.data;
					})
					.catch((error) => console.log(error));
			},
			queryHospital() { //获取医院
				var area = this.searchForm.area;
				var param = `?area=${area}&&page=1&pageSize=100`;
				this.$axios.get(this.$api.patientList.queryHospital + param)
					.then(response => {
						// console.log(response)
						this.hospitalList = response.data.data.datas;
					})
					.catch((error) => console.log(error));
			}
		},
		mounted() {
			this.isLeader = this.roleId == 4 ? true : false;
			if(this.roleId!=4){
				this.switchParams(this.searchForm,1,'searchForm')
			};
		}
	}
</script>

<style scoped>
	/*我的患者操作按钮*/
	
	.patientList .el-table .el-button {
		padding: 10px 2px;
	}
	
	.patientList .el-table .el-button+.el-button {
		margin: 0;
	}
	/*患者详情弹窗*/
	
	.title {
		border-bottom: 1px solid #e1e1e1;
		font-size: 16px;
		padding: 10px 0 10px;
		font-weight: 700;
	}
	
	.baseInfo ul,
	.pacsInfo ul,
	.doctorInfo ul {
		display: flex;
		flex-wrap: wrap;
		margin: 15px 20px;
	}
	
	.finding p,
	.register p {
		margin: 15px 20px;
	}
	
	.baseInfo ul li,
	.pacsInfo ul li {
		width: 25%;
	}
	
	.doctorInfo ul li {
		width: 50%;
	}
	
	.el-range-editor.el-input__inner {
		padding: 0 10px;
	}
</style>
<style>
	.patientList .el-collapse-item__header,
	.patientList .el-collapse-item__wrap {
		background-color: transparent;
		color: #067dfb;
		border: none;
	}
	
	.patientList .el-collapse-item__header {
		font-weight: 700;
	}
	
	.patientList .el-collapse-item__arrow {
		float: left;
	}
	
	.patientList .el-collapse {
		border: none;
		margin-top: -20px;
	}
	
	.patientList .el-collapse-item__content {
		padding-bottom:12px;
	}
	/*输入框*/
	
	.patientList .el-form-item {
		margin-bottom: 15px;
	}
	
	.patientList .el-form {
		max-width: 1000px;
	}
	
	.searchForm .el-input {
		width: 200px;
	}
	
	.patientList .el-form-item__label {
		width: 80px;
	}
	
	.leader .el-date-editor .el-range__icon {
		color: #a5c3ff;
	}
	
	.leader .el-range-editor .el-range-input {
		background-color: transparent;
		color: #a5c3ff;
	}
	
	.leader .el-date-editor .el-range-separator {
		color: #a5c3ff;
	}
	
	.leader .el-checkbox{
		color: #a5c3ff;
	}
</style>