function MonoBasarSayarBarkodOlustur($scope,srv)
{
    function InitObj()
    {
        $scope.BtnSipList = 
        {
            title : "Sipariş Seçimi",
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT " +
                        "sip_evrakno_seri AS SERI, " +
                        "sip_evrakno_sira AS SIRA, " +
                        "ISNULL((SELECT cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod = sip_musteri_kod),'') AS CARI, " +
                        "ISNULL((SELECT TOP 1 adr_cadde + ' ' + adr_mahalle + ' ' + adr_sokak + ' ' + adr_ilce + ' ' + adr_il FROM CARI_HESAP_ADRESLERI WHERE adr_cari_kod = sip_musteri_kod AND adr_adres_no = sip_adresno),'') AS ADRES " +
                        "FROM SIPARISLER WHERE sip_tip = 0 " +
                        "GROUP BY sip_evrakno_seri,sip_evrakno_sira,sip_tip,sip_musteri_kod,sip_adresno "
            },
            columns :
            [
                {
                    dataField: "SERI",
                    width: 100
                }, 
                {
                    dataField: "SIRA",
                    width: 100
                }, 
                {
                    dataField: "CARI",
                    width: 200
                }, 
                {
                    title: "ADRES",
                    dataField: "ADRES",
                    width: 300
                }, 
            ],
            onSelected : async function(pData)
            {
                if(typeof pData != 'undefined')
                {     
                    $scope.LblSipSeri = pData.SERI;
                    $scope.LblSipSira = pData.SIRA;
                }
            }
        }
        $scope.BtnStokList = 
        {
            title : "Stok Seçimi",
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : ""
            },
            columns :
            [
                {
                    dataField: "BARKOD",
                    width: 200
                }, 
                {
                    dataField: "KODU",
                    width: 200
                }, 
                {
                    dataField: "ADI",
                    width: 200
                }, 
                {
                    dataField: "BIRIM",
                    width: 100
                }, 
            ],
            onClick : async function(pStatus)
            {
                if($scope.LblSipSeri != '' && $scope.LblSipSira != '')
                {
                    TmpQuery =  "SELECT " +
                                "ISNULL((SELECT TOP 1 bar_kodu FROM BARKOD_TANIMLARI WHERE bar_stokkodu = sip_stok_kod AND bar_birimpntr = sip_birim_pntr),'') AS [BARKOD] , " +
                                "ISNULL(sip_stok_kod,'') AS [KODU] , " +
                                "ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod = sip_stok_kod),'') AS [ADI] , " +
                                "(SELECT dbo.fn_StokBirimi(sip_stok_kod,sip_birim_pntr)) AS [BIRIM] " +
                                "FROM SIPARISLER WHERE sip_evrakno_seri = '" + $scope.LblSipSeri + "' AND sip_evrakno_sira = " + $scope.LblSipSira + " AND sip_tip = 0 ORDER BY sip_satirno ASC "           
                }
                else
                {
                    TmpQuery = "SELECT " +
                                "bar_kodu AS [BARKOD], " +
                                "bar_stokkodu AS [KODU], " +
                                "ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod = bar_stokkodu),'') AS [ADI], " +
                                "(SELECT dbo.fn_StokBirimi(bar_stokkodu,bar_birimpntr)) AS [BIRIM] " +
                                "FROM BARKOD_TANIMLARI "
                }

                $scope.BtnStokList.datasource.query = TmpQuery;
                pStatus(true)
            },
            onSelected : async function(pData)
            {
                if(typeof pData != 'undefined')
                {
                    $scope.LblBarkod = pData.BARKOD;
                    $scope.LblAdi = pData.ADI;
                }
            }
        }
    }
    function NumberWithCommas(x) 
    {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    $scope.Init = function()
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));

        $scope.LblHassasGram = 1000;
        $scope.TxtSpRefMiktar = 0;
        $scope.LblKantarKilo = 10000;
        $scope.LblKantarMiktar = 0;

        $scope.LblSipSeri = "";
        $scope.LblSipSira = "";
        $scope.LblBarkod = "";
        $scope.LblAdi = "";
        
        $scope.CmbEtiket = "1";
        $scope.TxtEtiketMiktar = 1;

        InitObj();
    }
    $scope.BtnTartimOnayla = function()
    {
        $scope.LblKantarMiktar = NumberWithCommas(($scope.TxtSpRefMiktar / ($scope.LblHassasGram / 1000)) * $scope.LblKantarKilo);
        $scope.LblKantarKilo = NumberWithCommas($scope.LblKantarKilo);
    }
    $scope.BtnBarkodBas = function()
    {
        
    }
}