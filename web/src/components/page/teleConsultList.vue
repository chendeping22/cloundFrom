<template>
	<div class="container">
		<h1 class="top-title">咨询列表：</h1>
		<el-tabs tab-position="left" style="height: 100%;background-color: #fff;">
			<el-tab-pane>
					<div class="chater" slot="label">
						<img class="chater_head" src="../../assets/img/icon-doctor.png" alt="" />
						<div class="chater_info">
							<div class="name">金三胖</div>
							<div class="checkPosition">咨询的部位：腹部</div>
						</div>
						<div class="chater_status">
							<div class="checkTime">2018-08-15 09:10:03</div>
							<div class="statu turnBack">已结束</div>
						</div>
					</div>
					 我的行程
			</el-tab-pane>
			<el-tab-pane>
				<span slot="label"><i class="el-icon-date"></i> 我的行程</span> 我的行程
			</el-tab-pane>
			<el-tab-pane>
				<span slot="label"><i class="el-icon-date"></i> 我的行程</span> 我的行程
			</el-tab-pane>
			<el-tab-pane>
				<span slot="label"><i class="el-icon-date"></i> 我的行程</span> 我的行程
			</el-tab-pane>
		</el-tabs>
	</div>

</template>
<style scoped="scoped">
	.chater{
		display: flex;
		justify-content: space-between;
	}
	.chater_head{
		display: inline-block;
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}
</style>