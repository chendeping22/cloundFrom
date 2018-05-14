  
  
  
  
 $.get('440300.json', function (shenzhenjson) {
 	
    echarts.registerMap('深圳', shenzhenjson);  
    var chart = echarts.init(document.getElementById('main'));
    var area = {};
    /*获取地图数据*/
       
		chart.showLoading();
		var mapFeatures = echarts.getMap("深圳").geoJson.features;
		chart.hideLoading();
		
		mapFeatures.forEach(function(v) {
		    // 地区名称
		    var name = v.properties.name;
		    // 地区经纬度
		    area[name] = v.properties.cp;
		
		});
		

			
//		function convertData(data,geoCoordMap) {
//			var res = [];
//			for(var i = 0; i < data.length; i++) {
//				var geoCoord = geoCoordMap[data[i].name];
//				if(geoCoord) {
//					res.push({
//						name: data[i].name,
//						value: geoCoord.concat(data[i].value)
//					});
//				}
//			}
//			return res;
//		};  	
    
	function convertData(data,geoCoordMap) {
			var res = [];
			for(var i = 0; i < data.length; i++) {
				var geoCoord = geoCoordMap[data[i].name];
				if(geoCoord) {
					var value = geoCoord.concat(data[i].showLevel);
					value = value.concat(data[i].joinDate);
					value = value.concat(data[i].allStudyNumber)					
					res.push({
						name: data[i].name,
						value: value
					});
				}
			}
			return res;
		};  
         

     console.log(hospital)
     console.log(convertData(hospital,geoCoordMap)) ;
     
     
    option = {
				tooltip: {
					trigger: 'item',
					confine: true,
					formatter: function(params) {
//						return console.log(params)
						return '</div><div class="hehehe">' + params.name + '</div>'+
										'</div><div class="hehehe">接入时间：' + params.value[3] + '</div>'+
										'</div><div class="hehehe">上传检查量：' + params.value[4] + '</div>'
					},
					position: 'top',
					backgroundColor: 'rgba(0,0,0,0.5)',
					borderColor: 'rgba(26,187,189,0.8)',
					borderWidth: 1,
					padding: [6, 12, 6, 12]
				},
//			     visualMap: {//这边是针对series里数据的
//			        show: true,
//			        min: 0,
//			        max: 15,
//			        left: 'left',
//			        top: 'bottom',
//			        text: ['高', '低'], // 文本，默认为数值文本
//			        calculable: true,
//			        seriesIndex: [1],
//			        inRange: {
////			             color: ['#3B5077', '#031525'] // 蓝黑
////			             color: ['#ffc0cb', '#800080'] // 红紫
////			             color: ['#3C3B3F', '#605C3C'] // 黑绿
//			            // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
////			             color: ['#23074d', '#cc5333'] // 紫红
//			            color: ['#00467F', '#A5CC82'] // 蓝绿
////			             color: ['#1488CC', '#2B32B2'] // 浅蓝
////			             color: ['#00467F', '#A5CC82'] // 蓝绿
////			             color: ['#00467F', '#A5CC82'] // 蓝绿
////			             color: ['#00467F', '#A5CC82'] // 蓝绿
////			             color: ['#00467F', '#A5CC82'] // 蓝绿
//			
//			        }
//			    },
			    geo: {
			    	show: true,
			        map: '深圳',
			        label: {
			        	normal: {
			                show: false
			            },
			            emphasis: {
			                show: false
			            }
			        },
			        aspectScale:1,//正常比例 ，默认0.75
			        roam: true,//是否支持地图缩放平移
//					roam:false,
			        itemStyle: {
			            normal: {
			                color: 'rgba(51, 69, 89, .5)', //地图背景色
//							borderColor: 'rgba(100,149,237,1)', //省市边界线，
//							areaColor: 'transparent',
							areaColor: '#1c254b',
//		                    borderColor: 'rgba(62,219,253,0.6)',
		                    borderWidth: 1,
		                    shadowColor: 'rgba(63, 218, 255, 0.3)',
		                    shadowColor: '#4e6cdc',
		                    shadowBlur:20,
//		                    shadowOffsetX:1,
//		                    shadowOffsetY:5
			            },
			            emphasis: {
			                areaColor: '#1a3091'//悬浮时候的背景
			                ,color: 'rgba(37, 43, 61, .5)'//悬浮背景
			            }
			        },
			        zlevel: 2
			    },
				series: [{
						name: '医院',
						type: 'effectScatter',
						coordinateSystem: 'geo',
						data: convertData(hospital,geoCoordMap),
						symbolSize: function (val) {
//							return console.log(val)
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
										offset: 0, color: 'rgba(245,215,83,1)' // 0% 处的颜色  
									}, {
											offset: 1, color: 'rgba(245,215,83,0.8)' // 100% 处的颜色  
										}],
									globalCoord: false // 缺省为 false  
								},
								shadowBlur: 10,
								shadowColor: '#333'
							},
							emphasis: {
								backgroundColor: 'rgba(31,226,132,1)',
								borderColor: 'rgba(255,255,255,0.8)',
								borderWidth: 2
							}
						},
						zlevel: 3
					},
//					{
//			            type: 'map',
//			            map:"深圳",
//			            roam:true,
////						roam:false,
//			            geoIndex: 0,
//			            aspectScale: 0.96, //长宽比
////			            top:180,
////			            left:152,
//          			showLegendSymbol: false, // 存在legend时显示
//			            coordinateSystem: 'geo',
////			            data: data1,
//			            tooltip:{//取消提示
//			            	trigger: 'none'
//			            },
//			            label: {
//			                normal: {
//			                    formatter: '{b}',
//			                    position: 'center',
//			                    show: false
//			                },
//			                emphasis: {
//			                    show: false
//			                }
//			            },
//			            itemStyle: {
//			                normal: {
//			                    color: '#05C3F9',
//			                    areaColor: '#031525',
//				                borderColor: '#3B5077',
//				                borderWidth: 2,
//				                shadowColor: '#4e6cdc',
//		                    	shadowBlur:20
//			                },
//			                emphasis: {
//			                    areaColor: '#1a3091',
//			                }
//			            },
//			            animation: false,
//			            zlevel: 1
//			        },
			        {
			            name: '散点',
			            type: 'scatter',
			            coordinateSystem: 'geo',
			            data: convertData(data1,area),
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
			                    color: '#fff'
			                }
			            },
			            zlevel:3
			        }
				]
			};
        chart.setOption(option);  
        window.onresize = chart.resize;
        
//      chart.on('click', function (params) {
//			if (params.componentType === 'series') {
//		        // 点击到了 markPoint 上
//		        if (params.seriesIndex === 0) {
//		            // 点击到了 index 为 5 的 series 的 markPoint 上。
//		            alert("我是一级医院")
//		        }
//		    }
//		    
//		});
});  