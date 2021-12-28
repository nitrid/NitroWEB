function Ureticictrl($scope,srv,$rootScope,$filter)
{
    function InitObj()
    {
        $scope.BteIsEmri = 
        {
            title : "İş Emri Seçim",
            txt : "",
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT " +
                        "ISNULL((SELECT TOP 1 bar_kodu FROM BARKOD_TANIMLARI WHERE bar_stokkodu = ISNULL((SELECT TOP 1 upl_kodu FROM URETIM_MALZEME_PLANLAMA WHERE upl_isemri = is_Kod AND upl_uretim_tuket = 1),'') AND bar_birimpntr = 1 AND bar_partikodu = '' AND bar_lotno = 0),'') AS BARKOD, " +
                        "is_Kod AS KODU,is_Ismi AS ADI, " +
                        "ISNULL((SELECT TOP 1 upl_kodu FROM URETIM_MALZEME_PLANLAMA WHERE upl_isemri = is_Kod AND upl_uretim_tuket = 1),'') AS STOKKODU, " +
                        "ISNULL((SELECT sto_isim  FROM STOKLAR WHERE sto_kod = ISNULL((SELECT TOP 1 upl_kodu FROM URETIM_MALZEME_PLANLAMA WHERE upl_isemri = is_Kod AND upl_uretim_tuket = 1),'')),'') AS STOKADI " +
                        "FROM ISEMIRLERI WHERE is_EmriDurumu = 1 AND is_Kod LIKE '%AYD-%'"
            },
            selection : "KODU",
            columns :
            [
                {
                    dataField: "ADI",
                    width: 200
                }, 
                {
                    title : "İŞ EMRİ KODU",
                    dataField: "KODU",
                    width: 200
                }, 
                {
                    title: "STOK ADI",
                    dataField: "STOKADI",
                    width: 500
                },
                {
                    title: "STOK KODU",
                    dataField: "STOKKODU",
                    width: 200
                },
                {
                    dataField: "BARKOD",
                    width: 200
                }, 
            ],
            onSelected : async function(pData)
            {
                if(typeof pData != 'undefined')
                {                    
                    $scope.Data.UMP = await UretimMalzemePlanGetir(pData.KODU);
                    $scope.Data.URP = await UretimRotaPlanGetir(pData.KODU);
                    
                    if($scope.Data.UMP.length > 0)
                    {
                        let TmpDr = $scope.Data.UMP.filter(x => x.URETTUKET == 1);
                        if(TmpDr.length > 0)
                        {
                            $scope.LblUrun = TmpDr[0].KODU
                            $scope.BteParti.datasource.value.push($scope.LblUrun)     
                        }
                    }
                }
            }
        }
        $scope.BteParti = 
        {
            title : "Parti Seçim",
            txt : moment(new Date()).format("YYYYMMDD"),
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT pl_partikodu AS PARTI, pl_lotno AS LOT FROM PARTILOT WHERE pl_stokkodu = @pl_stokkodu",
                param : ['pl_stokkodu:string|25'],
                value : []
            },
            selection : "PARTI",
            columns :
            [
                {
                    dataField: "PARTI",
                    width: 200
                }, 
                {
                    dataField: "LOT",
                    width: 200
                }, 
            ],
            onClick : function(pCallback)
            {                                
               
                pCallback(true)
            }
        }     
       
    }
    $scope.Init = async function()
    {        
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "Ureticictrl"

        console.log(1000)
     
        InitObj();
    }
}