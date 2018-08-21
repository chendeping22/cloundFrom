<template>
	<div class="container teleConsultion">
		<h1 class="top-title">专家咨询：</h1>
		<el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline">

			<el-form-item label="区域归属：" prop="area">
				<el-select v-model="searchForm.area" @change="queryHospital" placeholder="请选择所属区域归属" @focus.once="getDict('dict_area')">
					<el-option label="全部" value=""></el-option>
					<el-option :label="item.name" :value="item.value" v-for="item in areaList" :key="item.name"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="医院名称：" prop="hospital">
				<el-autocomplete value-key="name" v-model="searchForm.hospital" :fetch-suggestions="querySearch" placeholder="请输入医院名称"></el-autocomplete>
			</el-form-item>

			<el-form-item label="科室：" prop="department">
				<el-select v-model="searchForm.department" @change="" placeholder="请选择科室" @focus.once="">
					<el-option label="全部" value=""></el-option>
					<!--<el-option :label="" :value="" v-for="" :key=""></el-option>-->
				</el-select>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="getExpertList(1,searchForm.area,searchForm.hospital,searchForm.department)">查询</el-button>
				<el-button @click="resetForm('searchForm')">重置</el-button>
			</el-form-item>
		</el-form>

		<el-row :gutter="25">
			<el-col :span="8" v-for="(o, index) in 6" :key="index">
				<div class="doctorListContainer">
					<div class="intro">
						<img src="../../assets/img/icon-doctor.png" alt="" />
						<div class="intro_text">
							<div class="top">
								<div class="name">金三胖</div>
								<div class="dep">儿科</div>
								<div class="position">主任医师</div>
							</div>
							<div class="bottom">
								<div class="hospital">深圳市南山人民医院</div>
								<div class="hospital_level">三甲</div>
							</div>
						</div>
					</div>
					<div class="describe">
						主要擅长肺结节、肺癌、食管癌、胸腺瘤等疾病的多学科诊疗，熟练掌握微创手术技术，致力于肺癌和食管癌的精准医疗及临床转化研究。
					</div>
					<div class="price">
						<div class="price_text">￥<span class="price_text_num">50</span>/次</div>
						<el-button type="primary" @click="dialogFormVisible = true">选择报告</el-button>
					</div>
				</div>
			</el-col>
		</el-row>
		<div style="text-align:center;margin-top: 30px;">
			<el-pagination @current-change="handleCurrentChange" :current-page.sync="defaultPage" :page-size="6" layout="total, prev, pager, next,jumper" :total="totalNumber">
			</el-pagination>
		</div>
		<div class="clear"></div>

		<!--对话框-->
		<el-dialog :title="titleName" :visible.sync="dialogFormVisible" @close="resetData">
			<!--报告列表-->
			<div class="report_list" v-if="tabelIsVisible">
				<el-table :data="tableData" style="width: 100%">
					<!--<el-table-column type="index" label="序号" width="70px" align="center"></el-table-column>-->
					<el-table-column prop="visitTime" label="检查时间" align="center"></el-table-column>
					<el-table-column prop="hospital" label="检查医院" align="center"></el-table-column>
					<el-table-column prop="checkType" label="检查类型" align="center" width="100px"></el-table-column>
					<el-table-column prop="checkPosition" label="检查部位" align="center"></el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<el-button @click.stop="reportDetail()" type="text">报告详情</el-button>
							<span class="lineOfButton"></span>
							<el-button @click.stop="makeConsultion()" type="text">付费咨询</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div style="text-align:center;margin-top: 30px;padding-bottom: 30px;">
					<el-pagination @current-change="handleChangeOfRep" :current-page.sync="defaultPageOfRep" :page-size="6" layout="total, prev, pager, next,jumper" :total="totalNumberOfRep">
					</el-pagination>
				</div>
			</div>
			<!--<filmDetail v-if="true"></filmDetail>-->
			<!--报告详情-->
			<div class="report_detail" v-if="detailIsVisible">
				<div class="report_title">
					<h1 class="hospitalName">深圳市龙华区人民医院</h1>
					<div class="visitTime">2018-08-11 14:00:00</div>
				</div>
				<div class="information">
					<div class="checkType">
						<p><i>检查类型：</i>放射</p>
					</div>
					<div class="checkPosition">
						<p><i>检查部位：</i>颅内平扫</p>
					</div>
					<div class="finding">
						<p><i>所见描述：</i>各房室腔内径正常，房室间隔连续完整，室间隔与左室壁不厚。二、三尖瓣回声、厚度及开闭未见异常。主动脉及肺动脉内径正常，瓣膜不厚，回声尚可，开闭未见异常。室壁运动分析：未见节段性运动异常。左室整体收缩功能正常。</p>
					</div>
					<div class="pacsInfo">
						<p><i>手机扫一扫可查看影像：</i><span class="pacsInfo_img"><img src="../../assets/img/erweima.png" alt="" /><i>30分钟之内有效</i></span></p>
					</div>
				</div>
				<div class="buttonContainer">
					<el-button type="primary" @click="turnbackTable(1)">返回列表</el-button>
				</div>
			</div>
			<!--付款页面-->
			<div class="payment" v-if="paymentIsVisible">
				<div class="payment_reportInfo">
					<div class="payment_title">相关报告：</div>
					<el-table :data="tableData2" style="width: 100%">
						<el-table-column prop="visitTime" label="检查时间" align="center"></el-table-column>
						<el-table-column prop="hospital" label="检查医院" align="center"></el-table-column>
						<el-table-column prop="checkType" label="检查类型" align="center" width="100px"></el-table-column>
						<el-table-column prop="checkPosition" label="检查部位" align="center"></el-table-column>
					</el-table>
				</div>
				<div class="payment_doctorInfo">
					<div class="payment_title refer">咨询专家：</div>
					<div class="infoBox">
						<img src="../../assets/img/icon-doctor.png" alt="" />
						<div class="intro_text">
							<div class="top">
								<div class="name">金三胖</div>
								<div class="dep">儿科</div>
								<div class="position">主任医师</div>
							</div>
							<div class="bottom">
								<div class="hospital">深圳市南山人民医院</div>
								<div class="hospital_level">三甲</div>
							</div>
						</div>
						<div class="price">
							<div class="price_text">￥<span class="price_text_num">50</span>/次</div>
						</div>
					</div>
				</div>
				<div class="payment_choose">
					<span>请选择付款方式：</span>
					<template>
						<el-radio class="wechat" v-model="radio" label="1">微信支付</el-radio>
						<el-radio class="alipay" v-model="radio" label="2">支付宝</el-radio>
					</template>
				</div>
				<div class="payment_button">
					<el-button @click.stop="openPayment" type="primary">立即支付</el-button>
					<el-button @click.stop="turnbackTable(2)" type="default">返回</el-button>
				</div>
			</div>
			<!--付款成功-->
			<div class="pay_success" v-if="successIsVisible">
				<div class="pay_title">
					<span class="image"></span>
					<span>支付成功，等待医生接收...</span>
				</div>
				<div class="pay_info">
					<div class="pay_type">
						<i>支付方式：</i>微信支付
					</div>
					<div class="pay_sum">
						<i>支付金额：</i>￥50.00
					</div>
					<div class="pay_time">
						<i>支付时间：</i>2018-08-12 09:00:09
					</div>
				</div>
				<div class="pay_butt">
					<el-button class="confirm" @click.stop="resetData" type="primary">确定</el-button>
					<el-button class="turnToChat" @click.stop="turnToChatRoom" type="default">前往咨询</el-button>
				</div>
			</div>
			<!--支付失败-->
			<div class="pay_fail" v-if="failIsVisible">
				<div class="pay_title">
					<span class="image"></span>
					<span>支付遇到问题，会诊申请未发出...</span>
				</div>
				<div class="pay_butt">
					<el-button class="confirm" @click.stop="secondPay" type="primary">重新支付</el-button>
					<el-button class="turnToChat" @click.stop="otherPayType" type="default">其他方式</el-button>
				</div>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	import filmDetail from '@/components/page/filmDetail';
	export default {
		name: "teleConsultion",
		components: {
			filmDetail
		},
		data() {
			return {
				radio: "1",
				titleName: '选择要咨询的报告',
				dialogFormVisible: false,
				tabelIsVisible: true,
				detailIsVisible:false,
				paymentIsVisible:false,
				successIsVisible:false,
				failIsVisible:false,
				totalNumber: 25,
				defaultPage: 1,
				defaultPageOfRep: 1,
				totalNumberOfRep: 25,
				currentDate: new Date(),
				areaList: {}, //行政区列表
				searchForm: { //搜索框
					area: '',
					hospital: '',
					department: ''
				},
				tableData2: [{
					"checkType": "MR",
					"checkPosition": "胸部正位",
					"visitTime": "2018-08-11 10:34:23",
					"hospital": "深圳市龙华区人民医院"
				}],
				tableData: [{
						"checkType": "MR",
						"checkPosition": "胸部正位",
						"visitTime": "2018-08-11 10:34:23",
						"hospital": "深圳市龙华区人民医院"
					},
					{
						"checkType": "MR",
						"checkPosition": "胸部正位",
						"visitTime": "2018-08-11 10:34:23",
						"hospital": "深圳市龙华区人民医院"
					},
					{
						"checkType": "MR",
						"checkPosition": "胸部正位",
						"visitTime": "2018-08-11 10:34:23",
						"hospital": "深圳市龙华区人民医院"
					},
					{
						"checkType": "MR",
						"checkPosition": "胸部正位",
						"visitTime": "2018-08-11 10:34:23",
						"hospital": "深圳市龙华区人民医院"
					},
					{
						"checkType": "MR",
						"checkPosition": "胸部正位",
						"visitTime": "2018-08-11 10:34:23",
						"hospital": "深圳市龙华区人民医院"
					},
					{
						"checkType": "MR",
						"checkPosition": "胸部正位",
						"visitTime": "2018-08-11 10:34:23",
						"hospital": "深圳市龙华区人民医院"
					}
				]
			}
		},
		methods: {
			//点击上下页回调
			handleCurrentChange(val) {
				console.log("上下页")
			},
			//获取医院
			queryHospital() {
				var area = this.searchForm.area;
				var param = `?area=${area}&&currentPage=1`;
				this.$axios.get(this.$api.expertExamine.queryHospital + param)
					.then(response => {
						console.log(response);
						this.hospitalList = response.data.data;
					})
					.catch((error) => console.log(error));
			},
			getDict(dict) { //获取行政区
				this.$axios.post(this.$api.expertExamine.queryDictList, {
						type: dict
					})
					.then(response => {
						console.log(response)
						this.areaList = response.data.data;
					})
					.catch((error) => console.log(error));
			},
			querySearch(queryString, cb) { //补全
				console.log(queryString);
				console.log(cb)
				var hospitalList = this.hospitalList;
				var results = queryString ? hospitalList.filter(this.createFilter(queryString)) : hospitalList;
				// 调用 callback 返回建议列表的数据
				console.log(results)
				//		        cb(results);
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					cb(results);
				}, 1000 * Math.random());

			},
			createFilter(queryString) { //过滤器
				return(hospital) => {
					return(hospital.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			//关闭对话框回调
			resetData(){
				this.titleName = '选择要咨询的报告';
				this.dialogFormVisible=false,
				this.tabelIsVisible=true;
				this.detailIsVisible=false;
				this.paymentIsVisible=false;
				this.successIsVisible=false;
				this.failIsVisible=false;
			},
			//报告详情
			reportDetail() {
				this.titleName = '报告详情';
				this.tabelIsVisible = false;
				this.detailIsVisible=true;
			},
			//返回列表
			turnbackTable(type){
				this.titleName = '选择要咨询的报告';
				this.tabelIsVisible = true;
				if(type==1){
					this.detailIsVisible=false;
				}else{
					this.paymentIsVisible=false;
				}
			},
			//报告列表翻页
			handleChangeOfRep() {
				console.log("翻页")
			},
			//发起咨询
			makeConsultion() {
				this.titleName = '报告解读支付';
				this.tabelIsVisible = false;
				this.paymentIsVisible=true;
			},
			//立即支付
			openPayment() {
				this.titleName = '支付成功';
				this.paymentIsVisible=false;
				this.successIsVisible=true;
			},
			//前往咨询室
			turnToChatRoom() {
				console.log("前往咨询室")
			},
			//重新支付
			secondPay() {
				console.log("重新支付")
			},
			//其他支付方式
			otherPayType() {
				console.log("其他支付方式")
			}

		},
		mounted() {

		}
	}
</script>

<style scoped>
	/*搜索*/
	
	.el-table .el-button {
		padding: 10px 5px;
	}
	
	.el-table .el-button+.el-button {
		margin: 0;
	}
	/*面板样式*/
	
	.doctorListContainer {
		color: #333;
		margin-bottom: 30px;
		padding: 24px 24px 0;
		background: #fff;
		box-shadow: 0px 3px 6px 0px rgba(13, 99, 174, 0.1);
		display: flex;
		flex-direction: column;
	}
	/*简介*/
	
	.doctorListContainer .intro {
		display: flex;
	}
	
	.doctorListContainer .intro img {
		width: 90px;
		height: 90px;
		border-radius: 50%;
		margin-right: 20px;
	}
	
	.intro_text .top,
	.intro_text .bottom {
		display: flex;
		margin-top: 14px;
	}
	
	.intro_text .bottom {
		font-size: 14px;
		line-height: 16px;
	}
	
	.intro_text .top .name {
		font-size: 24px;
		color: #333;
		margin-right: 10px;
	}
	
	.intro_text .top .dep,
	.intro_text .top .position {
		color: #606266;
		margin-right: 10px;
		line-height: 31px;
	}
	
	.intro_text .bottom .hospital_level:before {
		content: "";
		width: 0px;
		border-left: 1px solid #606266;
		margin: 0 8px;
	}
	/*擅长*/
	
	.doctorListContainer .describe {
		font-size: 14px;
		line-height: 24px;
		color: #333;
		margin: 20px 0 12px;
		/*显示三行*/
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}
	/*价格-选择报告*/
	
	.price {
		display: flex;
		justify-content: space-between;
		border-top: 1px solid #eee;
		padding: 12px 0;
	}
	
	.price .price_text {
		line-height: 32px;
		font-size: 14px;
	}
	
	.price .price_text_num {
		color: #f69816;
		font-size: 24px;
		font-weight: 700;
		margin: 0 2px;
	}
	/*对话框操作按钮*/
	
	.lineOfButton {
		display: inline-block;
		width: 1px;
		background: #409EFF;
		height: 15px;
		vertical-align: -2px;
	}
	
	/*报告详情start----------------------------------------*/
	.report_detail {
		margin: 14px;
	}
	.report_detail .report_title {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #0d63ae;
		margin-bottom: 12px;
	}
	
	.report_detail .hospitalName {
		font-size: 18px;
		padding-bottom: 8px;
		color: #0d63ae;
	}
	.report_detail .visitTime{
		font-size: 14px;
		color: #969ba1;
	}
	.report_detail .information{
		color: #666;
		line-height: 30px;
	}
	.report_detail .information i{
		font-weight: 700;
		color: #333;
	}
	.report_detail .information .pacsInfo img{
		display: inline-block;
		width: 140px;
		height: 140px;
	}
	.report_detail .buttonContainer{
		text-align: right;
		padding: 15px 0;
	}
	
	.report_detail .pacsInfo_img{
		display: inline-block;
		position: relative;
		vertical-align: top;
	}
	
	.report_detail .pacsInfo_img i{
		display: inline-block;
		width: 100%;
		text-align: center;
		position: absolute;
		bottom: -10px;
		left: 0;
	}
	/*报告详情end---------------------------*/
	
	
	/*对话框的支付页面*/
	
	.payment {
		margin: 0px 36px;
	}
	
	.payment .payment_title {
		font-size: 14px;
		font-weight: 700;
		line-height: 50px;
		color: #333;
		border-bottom: 1px solid #eee;
	}
	
	.payment .payment_title.refer {
		border: none;
	}
	
	.payment .infoBox {
		display: flex;
		padding: 15px 25px;
		border-bottom: 1px solid #eee;
	}
	
	.payment .infoBox img {
		width: 70px;
		height: 70px;
		border-radius: 50%;
	}
	
	.payment .infoBox .intro_text {
		margin: 0 60px 0 30px;
	}
	
	.infoBox .intro_text .top,
	.infoBox .intro_text .bottom {
		margin-top: 10px;
	}
	
	.infoBox .intro_text .top .dep,
	.infoBox .intro_text .top .position,
	.infoBox .intro_text .top .name {
		line-height: 20px;
	}
	
	.infoBox .intro_text .name {
		font-size: 16px;
		color: #333;
	}
	
	.payment .price_text {
		line-height: 40px;
	}
	
	.payment .price {
		border: none;
	}
	
	.payment .payment_choose {
		margin-top: 16px;
	}
	
	.payment .payment_choose span {
		font-size: 14px;
		font-weight: 700;
		color: #333;
	}
	
	.payment_button {
		text-align: right;
		padding: 30px 0;
	}
	/*支付成功&失败页面*/
	
	.pay_success,
	.pay_fail {
		margin: 70px auto;
		width: 500px;
	}
	
	.pay_title .image {
		display: inline-block;
		width: 40px;
		height: 40px;
		margin: 0 20px 20px 0;
		vertical-align: top;
		background: url("../../assets/img/pay-sucessed.png") no-repeat center;
	}
	
	.pay_title span:nth-child(2) {
		display: inline-block;
		font-size: 24px;
		color: #5f6e7f;
		line-height: 40px;
	}
	
	.pay_success .pay_info {
		padding-left: 64px;
		line-height: 30px;
		color: #666;
		margin-bottom: 60px;
	}
	
	.pay_butt {
		text-align: center;
		padding-bottom: 70px;
	}
	
	.pay_butt .confirm {
		width: 88px;
		margin-right: 25px;
	}
	
	.pay_butt .turnToChat,
	.pay_butt .confirm {
		padding: 8px 15px;
	}
	/*失败*/
	
	.pay_fail .image {
		background: url("../../assets/img/pay-failed.png") no-repeat center;
	}
	
	.pay_fail .pay_butt {
		margin-top: 80px;
	}
</style>
<style>
	.teleConsultion .el-dialog__body {
		padding: 0;
	}
	
	.teleConsultion .el-dialog__header {
		border: 0 solid #ddd;
	}
	
	.teleConsultion .el-dialog {
		min-width: 800px;
	}
	/*支付*/
	
	.teleConsultion .el-radio__label:before {
		content: '';
		display: inline-block;
		width: 25px;
		height: 25px;
		margin: 0 5px;
		vertical-align: -6px;
	}
	
	.teleConsultion .wechat .el-radio__label:before {
		background: url('../../assets/img/logo-wechatpay.png') no-repeat center;
	}
	
	.teleConsultion .alipay .el-radio__label:before {
		background: url('../../assets/img/logo-alipay.png') no-repeat center;
	}
</style>