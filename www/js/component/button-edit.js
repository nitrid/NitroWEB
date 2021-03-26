angular.module('app').component('buttonEdit', 
{
    templateUrl: 'js/component/button-edit.html',
    controller: function Modal($scope,$element,$attrs) 
    {
        console.log($scope)
        
        $scope.visiblePopup = false;

        $scope.popupOptions = 
        {
            width: 300,
            height: 250,
            contentTemplate: "info",
            showTitle: true,
            title: "Information",    
            dragEnabled: false,
            closeOnOutsideClick: true,
            bindingOptions: 
            {
                visible: "visiblePopup",
            }
        };
        $scope.showInfo = function () 
        {
            //$scope.currentEmployee = data.model.employee;
            $scope.visiblePopup = true;
        }; 
    }
});