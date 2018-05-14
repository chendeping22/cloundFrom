var pageNum = 0;
var pageNumSize;

var convertData = function(data, response) {
	for(var i = 0; i < response.length; i++) {
		for(var j = 0; j < data.length; j++) {
			if(response[i].name == data[j].name) {
				data[j]['showLevel'] = response[i].showLevel
			}else{
				console.log(response[i].name)
			}
		}
	}
	return data;
};


var data = [{
		"class": "big",
		"name": "深圳市人民医院",
		"style": "top:47%;left:39.5%;"
	},
	{
		"class": "big",
		"name": "北京大学深圳医院",
		"style": "top:46%;left:31%;"
	},
	{
		"class": "big",
		"name": "深圳市第二人民医院",
		"style": "top:46%;left:37%;"
	},
	{
		"class": "big",
		"name": "中山大学附属第八医院（深圳福田）",
		"style": "top:49.5%;left:36.5%;"
	},
	{
		"class": "big",
		"name": "深圳市中医院",
		"style": "top:50%;left:37%;"
	},
	{
		"class": "big",
		"name": "深圳市儿童医院",
		"style": "top:50%;left:31%;"
	},
	{
		"class": "big",
		"name": "深圳市眼科医院",
		"style": "top:50%;left:27%;"
	},
	{
		"class": "big",
		"name": "深圳市第三人民医院",
		"style": "top:29%;left:42%;"
	},
	{
		"class": "big",
		"name": "深圳市康宁医院",
		"style": "top:43%;left: 42%;"
	},
	{
		"class": "big",
		"name": "深圳市孙逸仙心血管医院",
		"style": "top:45%;left: 41%;"
	},
	{
		"class": "little",
		"name": "深圳市妇幼保健院",
		"style": "top:47%;left: 38.5%;"
	},
	{
		"class": "little",
		"name": "香港大学深圳医院",
		"style": "top:57%;left:22%;"
	},
	{
		"class": "little",
		"name": "南方医科大学深圳医院",
		"style": "top:52%;left: 13%;"
	},
	{
		"class": "little",
		"name": "中国医学科学院肿瘤医院深圳医院",
		"style": "top:20%;left: 53%;"
	},
	{
		"class": "little",
		"name": "深圳市职业病防治院",
		"style": "top:40.5%;left: 43%;"
	},
	{
		"class": "little",
		"name": "深圳市慢性病防治中心",
		"style": "top:40%;left: 42.5%;"
	},
	{
		"class": "little",
		"name": "深圳市罗湖区人民医院",
		"style": "top:49%;left: 39.5%;"
	},
	{
		"class": "little",
		"name": "深圳市罗湖区中医院",
		"style": "top:46%;left: 40.5%;"
	},
	{
		"class": "little",
		"name": "深圳市罗湖区妇幼保健院",
		"style": "top:39%;left: 43%;"
	},
//	{
//		"class": "little",
//		"name": "深圳市罗湖区慢性病防治院",
//		"style": "top:43%;left: 39%;"
//	},
//	{
//		"class": "little",
//		"name": "深圳市福田区慢性病防治院",
//		"style": "top:55%;left: 29%;"
//	},
	{
		"class": "little",
		"name": "深圳市福田区妇幼保健院",
		"style": "top:58%;left: 30%;"
	},
//	{
//		"class": "little",
//		"name": "深圳市福田区中医院",
//		"style": "top:44%;left: 30%;"
//	},
//	{
//		"class": "little",
//		"name": "深圳市福田人民医院",
//		"style": "top:50%;left: 36%;"
//	},
	{
		"class": "little",
		"name": "深圳市福田区第二人民医院",
		"style": "top:45%;left: 35%;"
	},
	{
		"class": "little",
		"name": "深圳市南山区人民医院",
		"style": "top:46%;left: 18%;"
	},
	{
		"class": "little",
		"name": "深圳市南山区蛇口人民医院",
		"style": "top:70%;left: 8%;"
	},
	{
		"class": "little",
		"name": "深圳市南山区妇幼保健院",
		"style": "top:71%;left: 9%;"
	},
//	{
//		"class": "little",
//		"name": "深圳市南山区慢性病医院",
//		"style": "top:65%;left: 8%;"
//	},
	{
		"class": "little",
		"name": "深圳市南山区西丽人民医院",
		"style": "top:35%;left: 23%;"
	},
	{
		"class": "little",
		"name": "深圳市宝安区人民医院",
		"style": "top:44%;left: 16%;"
	},
	{
		"class": "little",
		"name": "深圳市宝安区中医院",
		"style": "top:43%;left: 14.5%;"
	},
	{
		"class": "little",
		"name": "深圳市宝安区妇幼保健院",
		"style": "top:43%;left: 15%;"
	},
//	{
//		"class": "little",
//		"name": "深圳市宝安区慢性病医院",
//		"style": "top:34%;left: 15%;"
//	},
	{
		"class": "little",
		"name": "深圳市宝安区中心医院",
		"style": "top:40%;left: 13%;"
	},
	{
		"class": "little",
		"name": "深圳市宝安区沙井人民医院",
		"style": "top:12%;left: 21%;"
	},
	{
		"class": "little",
		"name": "深圳市宝安区松岗人民医院",
		"style": "top:7%;left: 24.5%;"
	},
	{
		"class": "little",
		"name": "深圳市宝安区福永人民医院",
		"style": "top:24%;left: 16%;"
	},
	{
		"class": "little",
		"name": "深圳市宝安区石岩人民医院",
		"style": "top:21%;left: 27%;"
	},
	{
		"class": "little",
		"name": "龙岗区中医院",
		"style": "top:18%;left: 51.5%;"
	},
	{
		"class": "little",
		"name": "深圳市龙岗中心医院",
		"style": "top:14%;left: 56.5%;"
	},
	{
		"class": "little",
		"name": "深圳市龙岗区人民医院",
		"style": "top:12.5%;left: 51.5%;"
	},
	{
		"class": "little",
		"name": "深圳市龙岗区第五人民医院",
		"style": "top:17%;left: 44%;"
	},
//	{
//		"class": "little",
//		"name": "深圳市龙岗区坪地人民医院",
//		"style": "top:11%;left: 60%;"
//	},
//	{
//		"class": "little",
//		"name": "深圳市龙岗区慢性病防治院",
//		"style": "top:14%;left: 51%;"
//	},
	{
		"class": "little",
		"name": "深圳市龙岗区妇幼保健院",
		"style": "top:12%;left: 52%;"
	},
	{
		"class": "little",
		"name": "深圳市龙岗区第三人民医院",
		"style": "top:26%;left: 49.5%;"
	},
	{
		"class": "little",
		"name": "深圳市龙岗区第四人民医院",
		"style": "top:27%;left: 43%;"
	},
	{
		"class": "little",
		"name": "深圳市龙岗区第七人民医院",
		"style": "top:31%;left: 45%;"
	},
	{
		"class": "little",
		"name": "深圳市龙岗区第二人民医院",
		"style": "top:34%;left: 40%;"
	},
	{
		"class": "little",
		"name": "深圳市龙岗区耳鼻咽喉医院",
		"style": "top:17%;left: 53%;"
	},
	{
		"class": "little",
		"name": "深圳市龙岗区骨科医院",
		"style": "top:13%;left: 55%;"
	},
//	{
//		"class": "little",
//		"name": "深圳市盐田区梅沙医院",
//		"style": "top:34%;left: 59%;"
//	},
	{
		"class": "little",
		"name": "深圳市盐田区人民医院",
		"style": "top:46%;left: 49.5%;"
	},
//	{
//		"class": "little",
//		"name": "深圳市盐田区盐港医院",
//		"style": "top:35%;left: 55%;"
//	},
	{
		"class": "little",
		"name": "深圳市盐田区妇幼保健院",
		"style": "top:47%;left: 50.5%;"
	},
	{
		"class": "little",
		"name": "深圳市光明新区人民医院",
		"style": "top:9%;left: 28%;"
	},
	{
		"class": "little",
		"name": "深圳市光明新区中心医院",
		"style": "top:10%;left: 32%;"
	},
	{
		"class": "little",
		"name": "深圳市龙华区人民医院",
		"style": "top:22%;left: 34%;"
	},
	{
		"class": "little",
		"name": "深圳市龙华区中心医院",
		"style": "top:15%;left: 38%;"
	},
	{
		"class": "little",
		"name": "深圳市坪山区人民医院",
		"style": "top:23%;left: 62%;"
	},
	{
		"class": "little",
		"name": "深圳市坪山区妇幼保健院",
		"style": "top:18%;left: 65%;"
	},
	{
		"class": "little",
		"name": "大鹏新区葵涌人民医院",
		"style": "top:28%;left: 69.7%;"
	},
	{
		"class": "little",
		"name": "深圳市大鹏新区妇幼保健院",
		"style": "top:40%;left: 78.5%;"
	},
	{
		"class": "little",
		"name": "深圳市大鹏新区南澳人民医院",
		"style": "top:52%;left: 83%;"
	}
];

$.ajax({
	url: "http://122.13.2.38:8005/cloudform-statistics/formStatistics/getMapStatus/v1.0",
	ansyc: "false",
	type: "get",
	success: function(res) {
		console.log(res)
		pageNumSize = Math.ceil(data.length / 5);
		data = convertData(data, res);
		console.log(data)
		var locationList = template("location", data); //按时间
		$(".locationContainer").html(locationList)
	}
});

var swiper = new Swiper('.swiper-container', {
	direction: 'vertical', //垂直
	speed: 1000, //过度时间
	autoplay: {
		delay: 5000, //5秒切换一次
	}, //可选选项，自动滑动
	loop: true,
	//				effect:"flip",//开启数据翻转
	on: {
		init: function(swiper) {
			slide = this.slides.eq(0);
			slide.addClass('ani-slide');
		},
		slideChangeTransitionStart: function() {
			console.log(this.activeIndex)
			for(i = 0; i < this.slides.length; i++) {
				slide = this.slides.eq(i);
				slide.removeClass('ani-slide');
			};
			slide = this.slides.eq(this.activeIndex);
			slide.addClass('ani-slide');
			pageNum += 1;
			//						console.log(pageNum)
			if(pageNum > pageNumSize) {
				pageNum = 1
			}
			getData();

		}

	}
});

function getData() {
	$.ajax({
		url: "http://122.13.2.38:8005/cloudform-statistics/formStatistics/getMapStatus/v1.0?pageNumber=" + pageNum,
		success: function(data) {
			var datalist = template("dataList", data); //按时间
			$(".ani-slide .list").html(datalist);
		}
	})
};