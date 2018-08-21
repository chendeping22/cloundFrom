<template>
	<div class="report_detail">
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
			<el-button type="primary" @click="dialogFormVisible = true">返回列表</el-button>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {};
		},
		methods: {},
		mounted() {}
	}
</script>
<style>
	/*报告详情start*/
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
	/*报告详情end*/
</style>