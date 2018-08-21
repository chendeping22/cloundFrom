<template>
	<div class="container">
		<h1 class="title">深圳市医学影像数据地图</h1>
		<div id="main"></div>
		<div style="color: #c5d6fe;font-size: 14px;">温馨提示：数据点越大，说明该医院数据量越大，点击医院可跳转相关统计数据</div>
	</div>
</template>

<script>
	import shenzhenjson from '../../assets/440300.json';
	//	require('../../assets/js/data.js')

	export default {
		data() {
			return {
				SZdata: require('../../assets/js/data.js'),
				hosipitalData: []
				//				bg:{
				//					backgroundImage:"url(" + require("../../assets/img/point.png") + ")",
				//					backgroundRepeat:"repeat"
				//				}
			}
		},
		mounted: function() {
			this.getHospitalData();
		},
		methods: {
			clickRouter(router, hospitalId, hospitalName) {
				this.$router.push({
					path: router,
					query: {
						hospitalId,
						hospitalName
					}
				})
			},
			getHospitalData() {
				let myself = this;
				this.$axios.get(this.$api.map.getHospitalData, {
					params: {
						"pageSize": 80
					}
				}).then((res) => {
					myself.hosipitalData = res.data.data;
					console.log(myself.hosipitalData)
					console.log(this.convertData(this.hosipitalData, this.SZdata.geoCoordMap))
					this.drawMap();
				}).catch(function(error) {
					console.log(error)
				})
			},
			convertData(data, geoCoordMap) {
				var res = [];
				for(var i = 0; i < data.length; i++) {
					var geoCoord = geoCoordMap[data[i].name];
					if(geoCoord) {
						var value = geoCoord.concat(data[i].showLevel);
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
								'</div><div class="hehehe">上传检查量：' + params.value[3] + '</div>'
						},
						position: 'top',
						backgroundColor: 'rgba(0,0,0,1)',
						//						borderColor: 'rgba(26,187,189,0.8)',
						//						borderWidth: 1,
						padding: [6, 12, 6, 12],
						textStyle: {
							color: "#96aee3"
						}
					},

					geo: {
						show: true,
						zoom: 1.2,
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
								borderColor: '#2b82ca', //省市边界线，
								//								areaColor: '#e3e9f3',//地图背景色
								areaColor: '#051537', //地图背景色

								borderWidth: 2,
								shadowColor: 'rgba(63, 218, 255, 0.3)',
								//								shadowColor: '#4e6cdc',
								shadowBlur: 20,
								//shadowOffsetX:1,
								//								shadowOffsetY:5
							},
							emphasis: {
								areaColor: '#d4ddeb', //悬浮时候的背景
								areaColor: 'rgba(20,38,78,0.5)', //地图背景色
							}
						},
						zlevel: 2
					},
					series: [{
						name: '医院',
						type: 'effectScatter',
						coordinateSystem: 'geo',
						data: this.convertData(this.hosipitalData, this.SZdata.geoCoordMap),
						symbolSize: function(val) {
							return val[2] * 5;
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
									color: '#fff',
								},
							},

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
										color: '#bfa52a'
									}, {
										offset: 1,
										//											color: 'rgba(245,215,83,0.8)' // 100% 处的颜色  
										color: '#bfa52a'
									}],
									globalCoord: false // 缺省为 false  
								},
								shadowBlur: 10,
								shadowColor: '#bfa52a',
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
					}, {
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
								show: true,
								textStyle: {
									color: '#96aee3',
									fontSize: 15
								}
							},
							emphasis: {
								show: true
							}
						},
						itemStyle: {
							normal: {}
						},
						zlevel: 3
					}]
				};
				myCharts.setOption(option);
				window.onresize = myCharts.resize;

				myCharts.on('click', function(params) {
					console.log(params)
					if(params.componentType === 'series') {
						// 点击到了散点 上
						if(params.seriesIndex === 0) {
							console.log(params.value[5]) //医院id
							// 点击到了 index 为 0 的 series 的 散点上上。
							myslef.clickRouter("/home/dataStats2", params.value[4], params.name)
						}
					}

				});

			}

		}
	}
</script>

<style scoped>
	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	
	.container h1.title {
		text-align: center;
		color: #c5d6fe;
		font-size: 30px;
		font-weight: 500;
		height: 50px;
		line-height: 50px;
		box-sizing: border-box;
		background: url("../../assets/img/titlebg.png") bottom no-repeat;
		text-shadow: 4px 4px 22px rgb(120, 194, 255)
	}
	
	#main {
		width: 100%;
		height: 100%;
		flex: 1;
	}
</style>