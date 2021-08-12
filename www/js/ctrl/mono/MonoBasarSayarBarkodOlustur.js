function MonoBasarSayarBarkodOlustur($scope,srv, $rootScope)
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
                    width: 300
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
                    $scope.LblStokKodu = pData.KODU;
                    $scope.LblStokAdi = pData.ADI;
                }
            }
        }
        $scope.CmbEtiketList = 
        {
            datasource : 
            {
                data :  [{name: "Basar Sayar Etiket - 1", special: $rootScope.GeneralParamList.BasarSayarEtiket}] 
            },
            key : "special",
            value : "name",
            defaultVal : $rootScope.GeneralParamList.BasarSayarEtiket,
            selectionMode : "key",
            return : $rootScope.GeneralParamList.BasarSayarEtiket,
            onSelected : function(pSelected)
            {
                $scope.CmbEtiketList.return = pSelected
            }
        }
    }
    function Scale()
    {
        srv.Scale.Start($rootScope.GeneralParamList.BasarSayarHasasTeraziPORT,pData =>
        {
            console.log(pData)
            $scope.LblHassasGram = pData
        });
    }
    function KantarVeriGetir() 
    {
        var net = new WebTCP('192.168.2.240', 9999);

        options = { encoding: "utf-8", timeout: 0, noDelay: false, keepAlive: false, initialDelay: 10000 }
        var socket = net.createSocket($rootScope.GeneralParamList.BasarSayarKantarIP, $rootScope.GeneralParamList.BasarSayarKantarPORT, options);
        socket.on('connect', function () { console.log('connected'); });

        let TmpData = "";
        socket.on('data', function (data) 
        {
            TmpData += data;

            if(data.includes("kg"))
            {
                KantarData(TmpData)
                TmpData = "";
            }
        });

        socket.on('end', function (data) { console.log("socket is closed "); });
        socket.write("hello world");
    }
    function KantarData(pData)
    {
        if (pData.includes("�,") && pData.includes("kg")) 
        {
            pData = pData.substring(
                pData.lastIndexOf("�,") + 1,
                pData.lastIndexOf("k")
            );
            $scope.LblKantarKilo = pData.split(",   ").join("");
            $scope.LblKantarKilo = pData.split(",").join("");
        }
    }
    function HassasTeraziVeriGetir() 
    {
        var net = new WebTCP('192.168.2.240', 9999);

        options = { encoding: "utf-8", timeout: 0, noDelay: true, keepAlive: false, initialDelay: 0 }
        var socket = net.createSocket($rootScope.GeneralParamList.BasarSayarHasasTeraziIP, $rootScope.GeneralParamList.BasarSayarHasasTeraziPORT, options);
        socket.on('connect', function () { console.log('connected'); });

        let TmpData = "";
        socket.on('data', function (data) 
        {
            TmpData += data;
           
            if(data.includes("g"))
            {
                HassasData(TmpData)
                TmpData = "";
            }
        });

        socket.on('end', function (data) { console.log("socket is closed "); });
        socket.write("hello world");
    }
    function HassasData(pData)
    {
        if(pData.includes("ST,GS,+") && pData.includes("g")) 
        {
            pData = pData.substring(
                pData.lastIndexOf("ST,GS,+") + 1,
                pData.lastIndexOf("g")
            );
            pData = pData.split("ST,GS,+").join("");
            pData = pData.split("T,GS,+").join("");
            $scope.LblHassasGram = pData.split(",   ").join("");
        }
    }
    async function EtiketInsert()
    {
        let InsertData = 
        [
            1,                               //CREATE_USER
            1,                               //LASTUP_USER
            $scope.CmbEtiketList.return,     //SPECIAL1
            $scope.EtkSeri,                  //SERI
            $scope.EtkSira,                  //SIRA
            '',                              //AÇIKLAMA
            '',                              //BELGENO
            0,                               //ETİKETTİP
            0,                               //BASİMTİPİ
            $scope.LblKantarMiktar,          //BASİMADET
            1,                               //DEPONO
            $scope.LblStokKodu,              //STOKKODU
            1,                               //RENKKODU
            1,                               //BEDENKODU
            $scope.LblBarkod,                //BARKOD
            $scope.TxtEtiketMiktar           //BASILACAKMIKTAR
        ]

        let InsertControl = await srv.Execute($scope.Firma,'EtiketInsert',InsertData);

        if(InsertControl == "")
        {
            swal("İşlem Başarılı!", "Etiket Yazdırma İşlemi Gerçekleştirildi.",icon="success");
        }
        else
        {
            swal("İşlem Başarısız!", "Etiket Yazdırma İşleminde Hata Oluştu.",icon="error");
        }
    }
    async function MaxEtiketSira()
    {
        $scope.EtkSira = (await srv.Execute($scope.Firma,'MaxEtiketSira',[$scope.EtkSeri]))[0].MAXEVRSIRA
    }
    $scope.Init = async function()
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "BASAR SAYAR BARKOD OLUŞTUR"

        $scope.EtkSeri = $rootScope.GeneralParamList.BasarSayarSeri;
        $scope.EtkSira = 1;

        $scope.TxtSpRefMiktar = 0;
        $scope.LblHassasGram = 0;
        $scope.LblKantarKilo = 0;
        $scope.LblKantarMiktar = 0;
        $scope.DataKantarKilo = 0;
        $scope.DataHassasTeraziGram = 0;

        $scope.LblSipSeri = "";
        $scope.LblSipSira = "";
        $scope.LblBarkod = "";
        $scope.LblStokKodu = "";
        $scope.LblStokAdi = "";
        
        $scope.TxtEtiketMiktar = 1;
        if($rootScope.GeneralParamList.MonoBasarSayarBarkodOlustur != "true")
        {
            swal("Dikkat", "Bu Sayfaya Giriş Yetkiniz Bulunmamaktadır..",icon="warning");
            var url = "index.html";
            window.location.href = url;
            event.preventDefault();        
        }

        InitObj();
        MaxEtiketSira();
        KantarVeriGetir();
        HassasTeraziVeriGetir();
        Scale()
    }
    $scope.BtnTartimOnayla = async function()
    {
        
        
        $scope.DataHassasTeraziGram = $scope.LblHassasGram;
        $scope.DataKantarKilo = $scope.LblKantarKilo;

        $scope.LblKantarMiktar = (($scope.TxtSpRefMiktar / ($scope.DataHassasTeraziGram / 1000)) * $scope.DataKantarKilo).toFixed(2);
    }
    $scope.BtnKantarVerisiGetir = async function()
    {
        $scope.LblKantarKilo  = await srv.Scale.Send($rootScope.GeneralParamList.BasarSayarKantarPORT);
    }
    $scope.BtnBarkodBas = async function()
    {
        if($scope.LblStokKodu != '')
        {
            await EtiketInsert();
        }
        else
        {
            swal("Hatalı İşlem!", "Lütfen Stok Seçimi Yapınız",icon="error");
        }
    }
}