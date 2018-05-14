<template>
	<div class="container">
		<h1 class="top-title">地图显示：</h1>
		<div id="main" :style="bg"></div>
	</div>
</template>

<script>
	import shenzhenjson from '../../assets/440300.json';
//	require('../../assets/js/data.js')
	
	export default {
		data() {
			return {
				SZdata:require('../../assets/js/data.js'),
				bg:require('../../assets/img/loginbg.jpg'),
				hosipitalData:[],
				bg:{
					backgroundImage:"url(" + require("../../assets/img/point.png") + ")",
					backgroundRepeat:"repeat"
				}
			}
		},
		mounted: function() {
			this.getHospitalData();
		},
		methods: {
			clickRouter(router,hospitalId){
				sessionStorage.setItem("hospitalId",hospitalId)
				this.$router.push(router)
			},
			getHospitalData(){
				let myself = this;
				this.$axios.get("/cloudform-statistics/formStatistics/getMapStatus/v1.0").then((res)=>{
					myself.hosipitalData = res.data;
					console.log(myself.hosipitalData)
					console.log(this.convertData(this.hosipitalData, this.SZdata.geoCoordMap))
					this.drawMap();
				}).catch(function(error){
					console.log(error)
				})
			},
			convertData(data,geoCoordMap) {
				var res = [];
				for(var i = 0; i < data.length; i++) {
					var geoCoord = geoCoordMap[data[i].name];
					if(geoCoord) {
						var value = geoCoord.concat(data[i].showLevel);
						value = value.concat(data[i].joinDate);
						value = value.concat(data[i].allStudyNumber);
						value = value.concat(data[i].id)
						res.push({
							name: data[i].name,
							value: value
						});
					}
				}
				return res;
			},
			drawMap() {
				var myslef = this;
				this.$echarts.registerMap('深圳', shenzhenjson);
				let myCharts = this.$echarts.init(document.getElementById('main'));
				let area = {};
			    /*获取地图数据*/
			       
				myCharts.showLoading();
				var mapFeatures = this.$echarts.getMap("深圳").geoJson.features;
				myCharts.hideLoading();
				
				mapFeatures.forEach(function(v) {
				    // 地区名称
				    let name = v.properties.name;
				    // 地区经纬度
				    area[name] = v.properties.cp;
				
				});
				
				let option = {
					tooltip: {
						trigger: 'item',
						confine: true,
						formatter: function(params) {
							//return console.log(params)
							return '</div><div class="hehehe">' + params.name + '</div>' +
//								'</div><div class="hehehe">接入时间：' + params.value[3] + '</div>' +
								'</div><div class="hehehe">上传检查量：' + params.value[4] + '</div>'
						},
						position: 'top',
						backgroundColor: 'rgba(0,0,0,0.5)',
//						borderColor: 'rgba(26,187,189,0.8)',
//						borderWidth: 1,
						padding: [6, 12, 6, 12]
					},
					
					geo: {
						show: true,
						zoom:1.2,
						map: '深圳',
						label: {
							normal: {
								show: false
							},
							emphasis: {
								show: false
							}
						},
						aspectScale: 1, //正常比例 ，默认0.75
						roam: true, //是否支持地图缩放平移
						itemStyle: {
							normal: {
								borderColor: 'rgba(15,97,176,0.6)', //省市边界线，
//								areaColor: '#e3e9f3',//地图背景色
								areaColor: 'rgba(255,255,255,0.5)',//地图背景色
								
								borderWidth: 1,
//								shadowColor: 'rgba(63, 218, 255, 0.3)',
//								shadowColor: '#4e6cdc',
//								shadowBlur: 20,
								//shadowOffsetX:1,
								//shadowOffsetY:5
							},
							emphasis: {
								areaColor: '#d4ddeb', //悬浮时候的背景
								areaColor: 'rgba(255,255,255,0.5)',//地图背景色
								
							}
						},
						zlevel: 2
					},
					series: [
						{
							name: '医院',
							type: 'effectScatter',
							coordinateSystem: 'geo',
							data: this.convertData(this.hosipitalData, this.SZdata.geoCoordMap),
							symbolSize: function(val) {
								return val[2] / 3;
							},
							showEffectOn: 'render',
							rippleEffect: {
								brushType: 'stroke'
							},
							hoverAnimation: true,
							label: {
								normal: {
									formatter: '{b}',
									show: false,
									textStyle: {
										color: '#fff'
									}
								}
							},
							itemStyle: {
								normal: {
									// 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变  
									color: {
										type: 'radial',
										x: 0.5,
										y: 0.5,
										r: 0.5,
										colorStops: [{
											offset: 0,
//											color: 'rgba(245,215,83,1)' // 0% 处的颜色  
											color: 'rgba(87,178,255,1)'
										}, {
											offset: 1,
//											color: 'rgba(245,215,83,0.8)' // 100% 处的颜色  
											color: 'rgba(87,178,255,0.8)'
										}],
										globalCoord: false // 缺省为 false  
									},
									shadowBlur: 10,
									shadowColor: 'rgba(87,178,255,1)',
//									borderColor: 'rgba(255,255,255,0.8)',
//									borderWidth: 3
								},
								emphasis: {
									backgroundColor: 'rgba(31,226,132,1)',
									borderColor: 'rgba(255,255,255,0.8)',
									borderWidth: 2
								}
							},
							zlevel: 3
						}
						,{
							name: '散点',
							type: 'scatter',
							coordinateSystem: 'geo',
							data: this.convertData(this.SZdata.data1, area),
							symbolSize: function(val) {
								return 0.1;
							},
							label: {
								normal: {
									formatter: '{b}',
									position: 'right',
									show: true
								},
								emphasis: {
									show: true
								}
							},
							itemStyle: {
								normal: {
									color: '#666'
								}
							},
							zlevel: 3
						}
					]
				};
				myCharts.setOption(option);
				window.onresize = myCharts.resize;
				
				myCharts.on('click', function (params) {
					console.log(params)
					sessionStorage.setItem("hospitalName",params.name);
					if (params.componentType === 'series') {
				        // 点击到了散点 上
				        if (params.seriesIndex === 0) {
//				        	console.log(params.value[5])//医院id
				            // 点击到了 index 为 0 的 series 的 散点上上。
				            myslef.clickRouter("/home/dataStats2",params.value[5])
				        }
				    }
			    
				});

			}

		}
	}
</script>

<style scoped>
	.container{
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.container h1.top-title	{
		height: 32px;
    	box-sizing: border-box;
	}
	#main{
		width:100%;
		height:100%;
		background: url(../../assets/img/point.png) repeat;
		flex: 1;
	}
</style>