//服务层
app.service('indexService',function($http){
	    	
	//读取列表数据绑定到表单中
	this.showName=function(){
		return $http.get('/index/showName.do');
	}

});