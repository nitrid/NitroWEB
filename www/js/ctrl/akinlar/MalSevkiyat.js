function MalSevkiyat($scope,srv,$rootScope,$filter)
{
    function InitSiparisListe()
    {
        $("#TblSiparisList").dxDataGrid
        ({
            dataSource: $scope.SiparisListe,
            columnMinWidth: 50,
            columnAutoWidth: true,
            showBorders: true,
            filtering: true,
            sorting: true,
            summary: true,
            grouping: true,
            groupPaging : true,
            filterRow: 
            {
                visible: true,
                applyFilter: "auto"
            },
            selection: 
            {
                mode: "single"
            },
            headerFilter: 
            {
                visible: true
            },
            scrolling: 
            {
                columnRenderingMode: "horizontal"
            },
            onCellClick: function(e) 
            {  
               
            },
            columns: 
            [
                {
                    dataField : "CARIKODU",
                    caption: "CARI KOD",
                    align: "center",
                    width: 150,
                },
                {
                    dataField : "CARIADI",
                    caption: "CARI ADI",
                    align: "center",
                    width: 400,
                },
                {
                    dataField : "SERI",
                    align: "center",
                    width: 150,
                },
                {
                    dataField : "SIRA",
                    align: "center",
                    width: 150,
                },
                {
                    dataField : "TARIH",
                    align: "center",
                    width: 200,
                },
                
            ],
        });
    }
    $scope.Init = async function()
    {        
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "Mal Sevkiyat"
        InitSiparisListe()
        $scope.SipBarkod = ''
        $scope.Seri = 'IRS'
        let TmpParam = 
        [
            $scope.Seri,
            1   
        ]
        let tmpData = await srv.Execute($scope.Firma,'MaxStokHarSira',TmpParam);
        $scope.Sira = tmpData[0].MAXEVRSIRA
    }
    $scope.Getir = async function()
    {
       
    }
    $scope.SiparisListele = async function()
    {
        let TmpQuery2 = 
        {
            db: "{M}." + $scope.Firma,
            query : "SELECT sip_evrakno_seri AS SERI, sip_evrakno_sira AS SIRA,CONVERT(VARCHAR,sip_tarih,104) AS TARIH,sip_musteri_kod AS CARIKOD,(SELECT cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod = sip_musteri_kod) AS CARIADI FROM SIPARISLER WHERE sip_miktar > sip_teslim_miktar and sip_OnaylayanKulNo <> 0 and sip_kapat_fl <> 1 GROUP BY sip_evrakno_seri,sip_evrakno_sira,sip_tarih,sip_musteri_kod " ,
        }
        let TmpResult2 = await srv.Execute(TmpQuery2)
        if(TmpResult2.length == 0)
        {
            swal("Uyarı", "Açık ve Onaylanmış Siparis Bulunamadı..",icon="warning");
            return
        }
        $scope.SiparisListe = TmpResult2
        $("#TblSiparisList").dxDataGrid("instance").option("dataSource", $scope.SiparisListe); 
    }
    $scope.BarkodGetirEvent = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.Getir()
        }
    }
}