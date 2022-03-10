angular.module('app').component('combobox', 
{
    templateUrl: 'js/component/combobox.html',
    controller: function ComboBox($scope,srv)
    {
        var ctrl = this
        ctrl.Key = "";
        ctrl.Value = "";
        ctrl.Data = [];
        ctrl.Return = "";
        ctrl.SelectColumn = "";

        $scope.$watch("$ctrl.option", function () 
        {
            if(typeof ctrl.option != 'undefined')
            {
                ctrl.$onInit();
            }
        });
        
        ctrl.Init = function()
        {
            return new Promise(async resolve => 
            {
                if(srv.SocketConnected)
                {                    
                    let TmpDataSource = ctrl.option.datasource;
                    let TmpData = [];

                    if(typeof TmpDataSource == 'undefined')
                    {
                        resolve()
                        return 
                    }
                    // DATASOURCE İÇERSİNDEKİ DURUMA GÖRE QUERY VEYA TAG VEYA DATA UYGULANIYOR.
                    if(typeof TmpDataSource.tag != 'undefined')
                    {
                        TmpData = await srv.Execute(TmpDataSource.db,TmpDataSource.tag,TmpDataSource.values)
                    }
                    else if(typeof TmpDataSource.query != 'undefined')
                    {
                        TmpData = await srv.Execute(TmpDataSource)
                    }
                    else if(typeof TmpDataSource.data != 'undefined')
                    {
                        TmpData = TmpDataSource.data
                    }
                    //******************************************** */
                    if(typeof TmpData == 'undefined' && TmpData.length == 0)
                    {
                        resolve(false)
                        return;
                    }

                    ctrl.Data = TmpData                                     
                    resolve(true)
                }
                else
                {
                    resolve(false)
                }
            });
        }
        ctrl.$onInit = async function() 
        {            
            if(typeof ctrl.option == 'undefined')
            {
                return
            }  
            
            ctrl.Key = ctrl.option.key
            ctrl.Value = ctrl.option.value               
            ctrl.Return = ctrl.option.defaultVal

            if(typeof ctrl.Return == 'undefined')
            {
                ctrl.Return = ""
            }         
            
            if(typeof ctrl.option.selectionMode == 'undefined' || ctrl.option.selectionMode == 'key')
            {
                ctrl.SelectColumn = 'TmpData.' + ctrl.Key
            }
            else if(ctrl.option.selectionMode == 'value')
            {
                 ctrl.SelectColumn = 'TmpData.' + ctrl.Value
            }
            else if(ctrl.option.selectionMode == 'row')
            {
                 ctrl.SelectColumn = 'TmpData'
            }

            await ctrl.Init()            
            $scope.$apply()         
        }
        $scope.OnSelected = function()
        {
            ctrl.option.return = ctrl.Return;
            if(typeof ctrl.option.onSelected != 'undefined')
            {
                ctrl.option.onSelected(ctrl.Return)
            }
        }
    },
    bindings: 
    {
        option : "<"
    }
});
/* ÖRNEK KULLANIM ŞEKLİ 
<combobox option="CmbTest"></combobox>
$scope.CmbTest =
{
    datasource : 
    {
        //data : [{KODU : '001',ADI: 'KALEM'},{KODU : '002',ADI: 'SİLGİ'}]
        db: "{M}.TEST",
        query:"SELECT sto_kod AS KODU,sto_isim AS ADI,* FROM STOKLAR"
    },
    key : "KODU",
    value : "ADI",
    defaultVal : "3",
    selectionMode : "row",
    return : "",
    onSelected : function(pSelected)
    {
        $scope.CmbTest.return = pSelected
    }
}
*/