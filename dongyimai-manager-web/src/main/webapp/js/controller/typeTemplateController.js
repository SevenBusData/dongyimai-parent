 //控制层 
app.controller('typeTemplateController' ,function($scope,$controller   ,typeTemplateService,brandService,specificationService){
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		typeTemplateService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		typeTemplateService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		typeTemplateService.findOne(id).success(
			function(response){
				$scope.entity= response;
				$scope.entity.specIds= JSON.parse($scope.entity.specIds);
				$scope.entity.brandIds= JSON.parse($scope.entity.brandIds);
				$scope.entity.customAttributeItems= JSON.parse($scope.entity.customAttributeItems)
			}
		);				
	}
	
	//保存 
	$scope.save=function(){				
		let serviceObject;//服务层对象
		if($scope.entity.id!=null){//如果有ID
			serviceObject=typeTemplateService.update( $scope.entity ); //修改  
		}else{
			serviceObject=typeTemplateService.add( $scope.entity  );//增加 
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
		        	$scope.reloadList();//重新加载
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		typeTemplateService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
					$scope.selectIds=[];
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		typeTemplateService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	//品牌
	$scope.brandList={data:[]};
	$scope.selectBrandOption = function (){
		brandService.selectOption().success(function (resp){
			$scope.brandList={data:resp}
		})
	}
	//规格
	$scope.specList={data:[]};
	$scope.selectSpecOption = function (){
		specificationService.selectOption().success(function (resp){
			$scope.specList={data:resp};
		})
	}
	//扩展属性
	$scope.addTableRow = function(){
		if($scope.entity.customAttributeItems==undefined){
			$scope.entity.customAttributeItems=[];
		}
		$scope.entity.customAttributeItems.push({});
	}
	$scope.delTableRow = function(idx){
		$scope.entity.customAttributeItems.splice(idx,1);
	}
	//界面优化
	$scope.jsonString=function (jsonString,key){
		let jsonArr = JSON.parse(jsonString);
		let str ="";
		for (let i =0 ; i<jsonArr.length;i++){
			str += jsonArr[i][key]+" ";
		}
		return str;

	}

    
});