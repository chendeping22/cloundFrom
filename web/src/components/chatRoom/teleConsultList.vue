<script>
//	import { actions } from '../../store';

	import Card from './card';
	import List from './list';
	import Text from './text';
	import Message from './message';

	export default {
		components: {
			Card,
			List,
			Text,
			Message
		},
		vuex: {
//			actions: actions
		},
		created() {
			this.initData();
		}
	}
</script>

<template>
	<div class="container">
		<h1 class="top-title">咨询列表：</h1>
		<div class="sidebar">
			<card></card>
			<list></list>
		</div>
		<div class="main">
			<message></message>
			<text></text>
		</div>
	</div>
</template>

<style scoped>
	.sidebar,
	.main {
		height: 100%;
	}
	
	.sidebar {
		float: left;
		width: 200px;
		color: #f4f4f4;
		background-color: #2e3238;
	}
	
	.main {
		position: relative;
		overflow: hidden;
		background-color: #eee;
	}
	
	.text {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
	}
	
	.message {
		height: ~'calc(100% - 160px)';
	}
</style>