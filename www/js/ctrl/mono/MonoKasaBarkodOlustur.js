function MonoKasaBarkodOlustur($scope, srv, $rootScope)
{
    function InitObj()
    {
        $scope.BtnStokList =
        {
            title: "Stok Seçimi",
            datasource:
            {
                db: "{M}." + $scope.Firma,
                query: ""
            },
            columns:
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
                    width: 500
                },
                {
                    dataField: "BIRIM",
                    width: 100
                },
            ],
             onClick: async function (pStatus)
             {
                TmpQuery = "SELECT " +
                                "bar_kodu AS [BARKOD], " +
                                "bar_stokkodu AS [KODU], " +
                                "ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod = bar_stokkodu),'') AS [ADI], " +
                                "(SELECT dbo.fn_StokBirimi(bar_stokkodu,bar_birimpntr)) AS [BIRIM] " +
                                "FROM BARKOD_TANIMLARI "

                $scope.BtnStokList.datasource.query = TmpQuery;
                pStatus(true)
            },
            onSelected: async function (pData) {
                if (typeof pData != 'undefined') {
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
                data : [{name: "Kasa Etiket - 1", special: $rootScope.GeneralParamList.KasaEtiket}] 
            },
            key : "special",
            value : "name",
            defaultVal : $rootScope.GeneralParamList.KasaEtiket,
            selectionMode : "key",
            return : $rootScope.GeneralParamList.KasaEtiket,
            onSelected : function(pSelected)
            {
                $scope.CmbEtiketList.return = pSelected
            }
        } 
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
    async function MaxEtiketSira()
    {
        $scope.EtkSira = (await srv.Execute($scope.Firma,'MaxEtiketSira',[$scope.EtkSeri]))[0].MAXEVRSIRA
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
            $scope.DataKantarKilo,           //BASİMADET
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
    $scope.Init = function ()
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "KASA BARKOD OLUŞTUR"

        $scope.EtkSeri = $rootScope.GeneralParamList.KasaBarkodSeri;
        $scope.EtkSira = 1;

        $scope.LblKantarKilo = 0;
        $scope.DataKantarKilo = 0;
        $scope.LblBarkod = "";
        $scope.LblStokKodu = "";
        $scope.LblStokAdi = "";

        $scope.TxtEtiketMiktar = 1;

        InitObj();
        MaxEtiketSira();
        KantarVeriGetir();
    }
    $scope.BtnBarkodBas = async function()
    {
        if($scope.LblStokKodu != '')
        {
            $scope.DataKantarKilo = $scope.LblKantarKilo;
            await EtiketInsert();
        }
        else
        {
            swal("Hatalı İşlem!", "Lütfen Stok Seçimi Yapınız",icon="error");
        }
    }
}