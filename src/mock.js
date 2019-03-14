const Mock = require('mockjs');

// 获取 mock.Random 对象

const Random = Mock.Random;

Mock.setup({
  timeout: 800, // 设置延迟响应，模拟向后端请求数据
});

// mock一组数据
//空数据
Mock.mock('/empty',  /get/, '');

// 平台总览模拟数据
// 		统计数据
const home_inDate = function(opt){
	let dataObj={}
	dataObj.userCount=Random.natural(10, 150)
	dataObj.orderCount=Random.natural(10, 150)
	dataObj.adminCount=Random.natural(10, 150)
	dataObj.allUserCount=Random.natural(10, 150)
	dataObj.allOrderCount=Random.natural(10, 150)
	dataObj.allAdminCount=Random.natural(10, 150)
	return dataObj
}
Mock.mock('/home/inDate', /get/, home_inDate);
// 		图表数据
const home_sevenDate = function(opt){
	let dataArr=[]
	for(let i=0;i<5;i++){
		var arr=[]
		for(let j=0;j<7;j++){
			var num=Random.natural(0, 150)
			arr.push(num)
		}
		dataArr.push(arr)
	}
	return dataArr
}
Mock.mock('/home/sevenDate', /get/, home_sevenDate);


// 计费规则
// 列表
const charging_list = function(opt){
	let rtype = opt.type.toLowerCase(); //获取请求类型
	var dataArr=Mock.mock({
		"array|10-20": [
		    {
		    	'user_name':'@cname',
		      	"parameter|+1": ["元","美元","马来币"],
		      	'create_time':'@date',
		      	"state|1": ["运营","维修"],
		      	"mode|1": ["按次计费","按时计费","分段计费"],
		      	'describe':'@csentence(10)',
		      	'switch':'@boolean',
		      	'id':'@id'
		    }
		]
	})
	
	switch (rtype) {
   		case 'get':
	   		break;
	   	case 'delete':
	    	let id = parseInt(JSON.parse(opt.body).id) //获取删除的id
	    	dataArr.array = dataArr.array.filter(function(val){
	     	return val.id!=id;//把这个id对应的对象从数组里删除
	    });

	    break;

	   	default:
  	}
  	return dataArr.array//返回这个数组,也就是返回处理后的假数据
}
Mock.mock('/charging/list', /get|delete/i, charging_list);//get用于请求数据，post用于删除数据


// 停车记录
const record_list=function(opt){
	var dataArr=Mock.mock({
		"array|10-20": [
		    {
		    	'number':'@increment(1000000)',
				'car_owner':'@cname',
				'plate_number':/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
				'entry_mode|1':['二维码','车牌识别'],
				'way_out':'@now',
				'time_out':'@now',
				'parking_lot|1':'@csentence(3)停车场',
				"state|1": ["未缴费","已预交费","已出场"],

		      	'id':'@id'
		    }
		]
	})
	return dataArr.array
}
Mock.mock('/record/list', /get/, record_list);

// 停车场
const special_list=function(opt){
	let rtype = opt.type.toLowerCase(); //获取请求类型
	var dataArr=Mock.mock({
		"array|10-20": [
			{
				'user_name':'@csentence(3)停车场',
				'address':'@city',
				'rule|1': ["按次计费","按时计费","分段计费"],
				"state|1": ["开始运营","停止运营"],
				'number':'@natural(50, 300)',
				'create_time':'@date',
				'remarks':'@ctitle(10)',
				'passageway':'@natural(1, 6)',
			    'id':'@id'
			}
		]
	})
	switch (rtype) {
   		case 'get':
	   		break;
	   	case 'delete':
	    	let id = parseInt(JSON.parse(opt.body).id) //获取删除的id
	    	dataArr.array = dataArr.array.filter(function(val){
	     	return val.id!=id;//把这个id对应的对象从数组里删除
	    });

	    break;

	   	default:
  	}
  	return dataArr.array//返回这个数组,也就是返回处理后的假数据
}
Mock.mock('/special/list',  /get|delete/i, special_list);


//vip列表
const vip_list=function(opt){
	let rtype = opt.type.toLowerCase(); //获取请求类型
	var dataArr=Mock.mock({
		"array|10-20": [
			{
				'number':/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
				'pic':Random.image('200x200', '#50B347', '#FFF', 'Mock.js'),
				'phone':/^1[385][1-9]\d{8}/,
				'name':'@cname',
				'create_time':'@date',
				'free|1':["所有停车场","部分停车场","不免费"],
			    'id':'@id'
			}
		]
	})
	switch (rtype) {
   		case 'get':
	   		break;
	   	case 'delete':
	    	let id = parseInt(JSON.parse(opt.body).id) //获取删除的id
	    	dataArr.array = dataArr.array.filter(function(val){
	     	return val.id!=id;//把这个id对应的对象从数组里删除
	    });

	    break;

	   	default:
  	}
  	return dataArr.array//返回这个数组,也就是返回处理后的假数据
}
Mock.mock('/vip/list',  /get|delete/i, vip_list);


// 会员信息列表
const memberInfo_list=function(opt){
	let rtype = opt.type.toLowerCase(); //获取请求类型
	var dataArr=Mock.mock({
		"array|10-20": [
			{
				'email':'@email',
				'phone':/^1[385][1-9]\d{8}/,
				'name':'@cname',
				'create_time':'@date',
				'account_number':'@first',
				'cars|1-5':[/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/],
				'switch':'@boolean',
				'id':'@id'
			}
		]
	})
	switch (rtype) {
   		case 'get':
	   		break;
	   	case 'delete':
	    	let id = parseInt(JSON.parse(opt.body).id) //获取删除的id
	    	dataArr.array = dataArr.array.filter(function(val){
	     	return val.id!=id;//把这个id对应的对象从数组里删除
	    });

	    break;

	   	default:
  	}
  	return dataArr.array//返回这个数组,也就是返回处理后的假数据
}
Mock.mock('/memberInfo/list',  /get|delete/i, memberInfo_list);


//充值记录
const recharge = function(opt){

	var dataArr=Mock.mock({
		"array|10-20": [
			{
				'name':'@cname',
				'create_time':'@date',
				'mony|1-200':200,
				'id':'@id'
			}
		]
	})
	return dataArr.array
}
Mock.mock('/recharge/list', /get/, recharge);




Random.extend({
    roleArr: function(date) {
        var roleArr = ['角色A','角色B','角色C','角色D'];
        return this.pick(roleArr);
    },
});
// 系统用户列表
const user_list=function(opt){
	let rtype = opt.type.toLowerCase(); //获取请求类型
	var arr=['角色A','角色B','角色C','角色D']
	var dataArr=Mock.mock({
		"array|10-20": [
			{
				'user_name':'@email',
				'role|1': ['角色A','角色B','角色C','角色D'],
				'id':'@id'
			}
		]
	})
	switch (rtype) {
   		case 'get':
	   		break;
	   	case 'delete':
	    	let id = parseInt(JSON.parse(opt.body).id) //获取删除的id
	    	dataArr.array = dataArr.array.filter(function(val){
	     	return val.id!=id;//把这个id对应的对象从数组里删除
	    });

	    break;

	   	default:
  	}
  	return dataArr.array//返回这个数组,也就是返回处理后的假数据
}
Mock.mock('/user/list',  /get|delete/i, user_list);


// 系统角色列表
const role_list=function(opt){
	let rtype = opt.type.toLowerCase(); //获取请求类型
	var arr=['角色A','角色B','角色C','角色D']
	var dataArr=Mock.mock({
		"array|10-20": [
			{
				'user_name|1':['角色A','角色B','角色C','角色D'],
				"resource|1-5":[{
					'key':'@id',
					'label':/[a-z]{2}[A-Z]{2}[0-9]/
				}],
				'id':'@id'
			}
		]
	})
	switch (rtype) {
   		case 'get':
   		console.log(dataArr.array)
   			if(opt.body && JSON.parse(opt.body).id){
   				let id2 =parseInt(JSON.parse(opt.body).id) //获取查询的id
		   		dataArr.array = dataArr.array.filter(function(val){
		     		console.log(val.id+'--'+id2)
		     		return val.id==id2;//返回这个id对应的对象
		    	});
   			}
	   		break;
	   	case 'delete':
	    	let id1 = parseInt(JSON.parse(opt.body).id) //获取删除的id
	    	dataArr.array = dataArr.array.filter(function(val){
	     		return val.id!=id1;//把这个id对应的对象从数组里删除
	    	});
	    	break;
	    // case 'post':
	    // 	let id2 = parseInt(JSON.parse(opt.body).id) //获取删除的id
	    // 	dataArr.array = dataArr.array.filter(function(val){
	    //  		console.log(val)
	    //  		return val.id==id2;//返回这个id对应的对象
	    // 	});
	    // 	break;

	   	default:
  	}
  	console.log(dataArr)
  	return dataArr.array//返回这个数组,也就是返回处理后的假数据
}
Mock.mock('/role/list',  /get|delete/i, role_list);


// 资源列表
const resource_list=function(opt){
	let rtype = opt.type.toLowerCase(); //获取请求类型
	var arr=['角色A','角色B','角色C','角色D']
	var dataArr=Mock.mock({
		"resource|1-5":[{
			'key':'@id',
			'label':/[a-z]{2}[A-Z]{2}[0-9]/
		}]
	})
  	return dataArr.resource//返回这个数组,也就是返回处理后的假数据
}
Mock.mock('/resource/list',  /get/, resource_list);