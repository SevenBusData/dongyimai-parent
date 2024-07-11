app.controller("baseController",function ($scope) {
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        perPageOptions: [10, 20, 30],
        onChange: function () {
            $scope.reloadList();
        }
    };
    $scope.selectIds = [];
    $scope.updateSelection = function ($event,id){
        if($event.target.checked){
            $scope.selectIds.push(id);
        }else{
            var ids = $scope.selectIds.indexOf(1);
            $scope.selectIds.splice(ids,1);
        }
    }
$scope.reloadList = function (){
        $scope.findPage($scope.paginationConf.currentPage,
            $scope.paginationConf.itemsPerPage)
}
})