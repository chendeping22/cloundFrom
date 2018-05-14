<template>
	<div class="container">
		<h1 class="top-title">首页地图：</h1>
			<div class="map-container" id="mapCtn">
				<img src="../../assets/img/homemap.png" id="mapbg"/>
				<div class="map-location" title="宝安区松岗人民医院" style="top:11% ;left:10% ;"></div>
				<div class="map-location" title="宝安区沙井人民医院" style="top:21% ;left:5% ;"></div>
				<div class="map-location" title="宝安区福永人民医院" style="top:37% ;left:6% ;"></div>
				<div class="map-location" title="宝安区石岩人民医院" style="top:38% ;left:21% ;"></div>
				<div class="map-location" title="宝安区慢性病医院" style="top:48% ;left:12% ;"></div>
				<div class="map-location" title="宝安区中心医院(原西乡人民医院)" style="top:54% ;left:14% ;"></div>
				<div class="map-location" title="宝安区妇幼保健院" style="top:61% ;left:16% ;"></div>
				<div class="map-location" title="宝安区计划生育专科医院" style="top:65% ;left:16% ;"></div>
				<div class="map-location" title="宝安区人民医院" style="top:66% ;left:18% ;"></div>
				<div class="map-location" title="南方医科大学深圳医院" style="top:71% ;left:16% ;"></div>
				<div class="map-location" title="光明新区人民医院(原公明医院)" style="top:16% ;left:17% ;"></div>
				<div class="map-location" title="光明新区中心医院(原光明医院)" style="top:22% ;left:22% ;"></div>
				<div class="map-location" title="龙华区中心医院(原观澜医院)" style="top:31% ;left:32% ;"></div>
				<div class="map-location" title="龙华区人民医院" style="top:47% ;left:31% ;"></div>
				<div class="map-location" title="南山区西丽医院" style="top:58% ;left:23% ;"></div>
				<div class="map-location" title="南山区人民医院" style="top:68% ;left:21% ;"></div>
				<div class="map-location" title="南山区慢性病医院" style="top:76% ;left:19% ;"></div>
				<div class="map-location" title="南山区蛇口医院" style="top:81% ;left:18% ;"></div>
				<div class="map-location" title="南山区妇幼保健院" style="top:81% ;left:15% ;"></div>
				<div class="map-location" title="龙岗区第五人民医院(原平湖人民医院)" style="top:35% ;left:43% ;"></div>
				<div class="map-location" title="深圳市第三人民医院(原东湖医院)" style="top:50% ;left:44% ;"></div>
				<div class="map-location" title="龙岗区第四人民医院(原南湾医院)" style="top:48% ;left:45% ;"></div>
				<div class="map-location" title="龙岗区第二人民医院(原布吉人民医院)" style="top:57% ;left:41% ;"></div>
				<div class="map-location" title="龙岗区第七人民医院(原沙湾医院)" style="top:54% ;left:46% ;"></div>
				<div class="map-location" title="龙岗区第三人民医院(原横岗人民医院)" style="top:46% ;left:53% ;"></div>
				<div class="map-location" title="龙岗区中医院" style="top:35% ;left:53% ;"></div>
				<div class="map-location" title="龙岗区慢性病防治院" style="top:31% ;left:54% ;"></div>
				<div class="map-location" title="龙岗区人民医院" style="top:29% ;left:56% ;"></div>
				<div class="map-location" title="龙岗区妇幼保健院" style="top:28% ;left:59% ;"></div>
				<div class="map-location" title="龙岗区耳鼻咽喉医院" style="top:35% ;left:57% ;"></div>
				<div class="map-location" title="中国医学科学院肿瘤医院深圳医院" style="top:40% ;left:58% ;"></div>
				<div class="map-location" title="深圳市龙岗区骨科医院" style="top:22% ;left:61% ;"></div>
				<div class="map-location" title="龙岗区中心医院" style="top:26% ;left:63% ;"></div>
				<div class="map-location" title="龙岗区坪地人民医院" style="top:19% ;left:66% ;"></div>
				<div class="map-location" title="香港大学深圳医院" style="top:76% ;left:28% ;"></div>
				<div class="map-location" title="深圳市眼科医院" style="top:72% ;left:31% ;"></div>
				<div class="map-location" title="深圳市慢性病防治中心" style="top:65% ;left:45% ;"></div>
				<div class="map-location" title="深圳市职业病防治院" style="top:66% ;left:47% ;"></div>
				<div class="map-location" title="福田区慢性病防治院" style="top:74% ;left:33% ;"></div>
				<div class="map-location" title="福田区妇幼保健院" style="top:78% ;left:32% ;"></div>
				<div class="map-location" title="福田区中医院" style="top:79% ;left:35% ;"></div>
				<div class="map-location" title="北京大学深圳医院" style="top:68% ;left:32% ;"></div>
				<div class="map-location" title="福田区第二人民医院" style="top:69% ;left:34% ;"></div>
				<div class="map-location" title="深圳市儿童医院" style="top:65% ;left:35% ;"></div>
				<div class="map-location" title="福田区人民医院" style="top:73% ;left:35% ;"></div>
				<div class="map-location" title="深圳市中医院" style="top:74% ;left:39% ;"></div>
				<div class="map-location" title="深圳市妇幼保健院" style="top:70% ;left:39% ;"></div>
				<div class="map-location" title="深圳市第二人民医院" style="top:68% ;left:37% ;"></div>
				<div class="map-location" title="罗湖区慢性病防治院" style="top:64% ;left:40% ;"></div>
				<div class="map-location" title="罗湖区妇幼保健院" style="top:62% ;left:46% ;"></div>
				<div class="map-location" title="深圳市康宁医院" style="top:66% ;left:44% ;"></div>
				<div class="map-location" title="深圳市孙逸仙心血管医院" style="top:69% ;left:43% ;"></div>
				<div class="map-location" title="罗湖区中医院" style="top:69% ;left:41% ;"></div>
				<div class="map-location" title="罗湖区人民医院" style="top:72% ;left:43% ;"></div>
				<div class="map-location" title="深圳市人民医院" style="top:73% ;left:41% ;"></div>
				<div class="map-location" title="盐田区梅沙医院" style="top:56% ;left:62% ;"></div>
				<div class="map-location" title="盐田区盐港医院" style="top:58% ;left:56% ;"></div>
				<div class="map-location" title="盐田区人民医院" style="top:65% ;left:53% ;"></div>
				<div class="map-location" title="盐田区妇幼保健院" style="top:69% ;left:54% ;"></div>
				<div class="map-location" title="坪山新区妇幼保健院(院坑梓人民医院)" style="top:37% ;left:71% ;"></div>
				<div class="map-location" title="坪山新区坪山人民医院" style="top:48% ;left:62% ;"></div>
				<div class="map-location" title="大鹏新区葵涌人民医院" style="top:52% ;left:76% ;"></div>
				<div class="map-location" title="大鹏新区妇幼保健院" style="top:63% ;left:82% ;"></div>
				<div class="map-location" title="大鹏新区南澳人民医院" style="top:77% ;left:88% ;"></div>
				
				<div class="map-location big" style=""></div>
				
			
			</div>
		<div class="clear"></div>	
	</div>
</template>

<script>
	export default {
		data() {
			return {
				formInline: {
					user: '',
					num:'',
					hospital: '',
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			}
		}
		
	}
	
</script>

<style scoped>
	.map-container{
    width: 100%;
    margin: auto;
    position: relative;
	}
	.map-container img{
		width: 100%;
		/*position: absolute;*/
		/*top: 0;*/
		z-index: 1;
	}
	.map-location{
	width:20px;
	height: 20px;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    background: url(../../assets/img/icon-map1.png) no-repeat center;
	}
	.big{
	width:40px;
	height: 40px;
    background: url(../../assets/img/icon-map2.png) no-repeat center;
	}
	/*.map-location span{
		position: absolute;
		display: block;
		width: 10px;
		height: 10px;
		background: #057EFF;
	}*/
</style>