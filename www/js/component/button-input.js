angular.module('app').component('buttonInput', 
{
    templateUrl: 'js/component/button-input.html',

    controller: function ButtonInput($scope,$attrs,srv) 
    {
        var ctrl = this
        ctrl.Model = "";
        ctrl.Id = $attrs.id;

        async function ModalShow()
        {
            ctrl.Model = "";
            $('#Mdl' + ctrl.Id).modal("show");
        }
        $scope.$watch("$ctrl.Model", function () 
        {
            if(typeof ctrl.option != 'undefined')
            {
                ctrl.option.model = ctrl.Model;
            }
        });
        ctrl.$onInit = function() 
        {

        }
        ctrl.Show = function()
        {
            if(typeof ctrl.option.onClick != 'undefined')
            {
                ctrl.option.onClick(function(pStatus)
                {
                    if(pStatus)
                    {
                        ModalShow();        
                    }
                });
            }
            else
            {
                ModalShow();
            }                        
        }
        ctrl.Select = function()
        {
            $('#Mdl' + ctrl.Id).modal("hide");

            ctrl.option.onSelected(ctrl.option.model);
        }
        ctrl.Cancel = function()
        {
            $('#Mdl' + ctrl.Id).modal("hide");
        }
    },
    bindings : 
    {
        option : '<'
    }
});