 //商品类目控制层 
app.controller('itemCatController' ,function($scope,$controller   ,itemCatService , typeTemplateService){
	
	$controller('baseController',{$scope:$scope});//继承

	$scope.findByParentId = function(parentId){
		itemCatService.findByParentId(parentId).success(
			function (resp){
				$scope.list=resp;
			}
		)
	}

	//读取列表数据绑定到表单中
	$scope.findAll=function(){
		itemCatService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		itemCatService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		itemCatService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象  				
		if($scope.entity.id!=null){//如果有ID
			serviceObject=itemCatService.update( $scope.entity ); //修改  
		}else{
			if($scope.entity_2!=null){
				$scope.entity.parentId = $scope.entity_2.id;
			}else if($scope.entity_1 != null){
				$scope.entity.parentId = $scope.entity_1.id;
			}else{
				$scope.entity.parentId = 0;
			}

			serviceObject=itemCatService.add( $scope.entity  );//增加 
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
		        	$scope.findByParentId($scope.entity.parentId);//重新加载
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		itemCatService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					if($scope.entity_2!=null){
						$scope.findByParentId($scope.entity_2.id);
					}else if($scope.entity_1 != null){
						$scope.findByParentId($scope.entity_1.id);
					}else{
						$scope.findByParentId(0);
					}//刷新列表
					$scope.selectIds=[];
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		itemCatService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	//面包屑导航
	$scope.grade = 1;
	$scope.setGrade = function (g){
		$scope.grade = Number(g);
	}
	$scope.selectList=function (parentEntity){
		if($scope.grade==1){
			$scope.entity_1=null;
			$scope.entity_2=null;
		}else if($scope.grade==2){
			$scope.entity_1=parentEntity;
			$scope.entity_2=null;
		}else {
			$scope.entity_2=parentEntity;
		}
		$scope.findByParentId(parentEntity.id);
	}
    $scope.typeList={data:[]};
	$scope.selectTypeList=function (){
		typeTemplateService.selectList().success(function (resp){
			$scope.typeList = {data: resp};
		})
	}
});	