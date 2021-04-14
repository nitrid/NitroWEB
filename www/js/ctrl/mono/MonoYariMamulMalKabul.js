function MonoYariMamulMalKabul($scope, srv) 
{
    let SelectionRow;
    function InitGrd(pData)
    {
        $("#GrdList").dxDataGrid
        (
            {
                dataSource: pData,
                allowColumnResizing: true,
                height: 490,
                width: "100%",
                columnWidth: 100,
                selection: 
                {
                    mode: "single"
                },
                columns :
                [
                    {
                        caption : "TİP",
                        dataField: "TIP",
                        width: 100
                    }, 
                    {
                        dataField: "KODU",
                        width: 200
                    }, 
                    {
                        dataField: "ADI",
                        width: 400
                    }, 
                    {
                        dataField: "MIKTAR",
                        width: 100
                    }, 
                    {
                        caption : "BARKOD",
                        dataField: "URNBARKOD",
                        width: 150
                    }, 
                    {
                        dataField: "URETREC",
                        width: 100
                    }, 
                ],
                hoverStateEnabled: true,
                showBorders: true,
                paging: 
                {
                    pageSize: 10
                },
                filterRow: 
                {
                    visible: true,
                    applyFilter: "auto"
                },
                headerFilter: 
                {
                    visible: true
                },
                onSelectionChanged: function (selectedItems) 
                {
                    SelectionRow = selectedItems.selectedRowsData[0];
                }
            }
        )
    }
    function InitObj() 
    {
        $scope.BtnKasaDaraAl =
        {
            title: "Kasa Darası Al",
            onSelected: async function (pData) 
            {
                if (typeof pData != 'undefined') 
                {
                    $scope.LblKasaDara = (pData.substring(7, 12) / 1000).toFixed(3);
                }
            }
        }
        $scope.BtnManuelKasaDaraAl =
        {
            title: "Kasa Darası Elle Giriş",
            onSelected: async function (pData) 
            {
                if (typeof pData != 'undefined') 
                {
                    $scope.LblKasaDara = (pData.substring(7, 12) / 1000).toFixed(3);
                }
            }
        }
        $scope.BtnManuelMiktarGiris =
        {
            title: "Manuel Miktar Giriş",
            onSelected: async function (pData) 
            {
                if(typeof pData != 'undefined') 
                {
                    $scope.LblKantarMiktar = pData;
                }
            }
        }
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
                    title: "STOK KODU",
                    dataField: "STOKKODU",
                    width: 100
                }, 
                {
                    title: "STOK ADI",
                    dataField: "STOKADI",
                    width: 500
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
                        }
                    }
                }
            }
        }
        $scope.CmbEtiketTasarim =
        {
            datasource:
            {
                data: $scope.Param.Mono.YariMamulMalKabulEtiket
            },
            key: "special",
            value: "name",
            defaultVal: "1",
            selectionMode: "key",
            return: "1",
            onSelected: function (pSelected) 
            {
                $scope.CmbEtiketTasarim.return = pSelected
            }
        }
    }
    function UretimMalzemePlanGetir(pIsEmri)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT " +
                        "ISNULL((SELECT TOP 1 bar_kodu FROM BARKOD_TANIMLARI WHERE bar_stokkodu = upl_kodu AND bar_birimpntr = 1),'') AS BARKOD, " +
                        "upl_kodu AS KODU, " +
                        "ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod = upl_kodu),'') AS ADI, " +
                        "ISNULL((SELECT STOK_ISIM__TURKCE_ FROM STOKLAR_USER WHERE Record_uid = (SELECT TOP 1 sto_Guid FROM STOKLAR WHERE sto_kod = upl_kodu)),'') AS ADITR, " +
                        "ISNULL((SELECT STOK_ISIM__INGILIZCE FROM STOKLAR_USER WHERE Record_uid = (SELECT TOP 1 sto_Guid FROM STOKLAR WHERE sto_kod = upl_kodu)),'') AS ADIENG, " +
                        "ISNULL((SELECT STOK_ISIM__RUSCA_ FROM STOKLAR_USER WHERE Record_uid = (SELECT TOP 1 sto_Guid FROM STOKLAR WHERE sto_kod = upl_kodu)),'') AS ADIRU, " +
                        "ISNULL((SELECT STOK_ISIM__RUMENCE_ FROM STOKLAR_USER WHERE Record_uid = (SELECT TOP 1 sto_Guid FROM STOKLAR WHERE sto_kod = upl_kodu)),'') AS ADIRO, " +
                        "ISNULL((SELECT FLOOR((sto_birim3_en * sto_birim3_boy * sto_birim3_yukseklik) / 3000) FROM STOKLAR WHERE sto_kod = upl_kodu),1) AS DESI, " +
                        "ISNULL((SELECT sto_birim3_agirlik FROM STOKLAR WHERE sto_kod = upl_kodu),1) AS AGIRLIK, " +
                        "{0} AS KATSAYI, " +
                        "upl_isemri AS ISEMRI, " +
                        "CASE WHEN upl_uretim_tuket = 1 THEN 'ÜRETİM' ELSE 'TÜKETİM' END AS TIP, " +
                        "upl_uretim_tuket AS URETTUKET, " +
                        "upl_depno AS DEPO, " +
                        "dbo.fn_DepodakiMiktar(upl_kodu,upl_depno,GETDATE()) AS DEPOMIKTAR, " +
                        "upl_miktar AS PMIKTAR, " +
                        "upl_miktar / ISNULL((SELECT TOP 1 upl_miktar FROM URETIM_MALZEME_PLANLAMA AS UMP2 WHERE UMP2.upl_isemri = UMP1.upl_isemri AND UMP2.upl_uretim_tuket = 1 ORDER BY upl_satirno ASC),0) AS BMIKTAR " +
                        "FROM URETIM_MALZEME_PLANLAMA AS UMP1 WHERE upl_isemri = @upl_isemri",
                param : ['upl_isemri:string|50'],
                value : [pIsEmri]
            }

            if($scope.TxtMiktar == 0)
            {
                TmpQuery.query = TmpQuery.query.replace('{0}', 'ISNULL((SELECT sto_birim3_katsayi * -1 FROM STOKLAR WHERE sto_kod = upl_kodu),1)')
            }
            else
            {
                TmpQuery.query = TmpQuery.query.replace('{0}', $scope.TxtMiktar)
            }                

            let TmpData = await srv.Execute(TmpQuery)

            if (typeof TmpData == 'undefined')
            {
                TmpData = []
            }

            resolve(TmpData);
            return;
        });
    }
    function UretimRotaPlanGetir(pIsEmri)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT " +
                        "RtP_Guid AS REC, " +
                        "RtP_IsEmriKodu AS ISEMRI, " +
                        "RtP_OperasyonSafhaNo AS SAFHANO, " +
                        "RtP_OperasyonKodu AS OPERASYONKODU, " +
                        "RtP_PlanlananIsMerkezi AS ISMERKEZI, " +
                        "RtP_UrunKodu AS URUNKODU, " +
                        "CAST((RtP_PlanlananSure / RtP_PlanlananMiktar) AS int) AS SURE " +
                        "FROM URETIM_ROTA_PLANLARI WHERE RtP_IsEmriKodu = @RtP_IsEmriKodu",
                param : ['RtP_IsEmriKodu:string|50'],
                value : [pIsEmri]
            }

            let TmpData = await srv.Execute(TmpQuery)

            if (typeof TmpData == 'undefined')
            {
                TmpData = []
            }
            resolve(TmpData);
            return;
        });
    }
    function InsertUrunGirisCikis(pGirisCikis,pDr,pSeri,pSira)
    {
        return new Promise(async resolve => 
        {
            let TmpEvrTip = 12;
            let TmpTip = 0;

            if(pGirisCikis == 1)
            {
                TmpEvrTip = 0
                TmpTip = 1
            }

            let TmpInsertData = 
            [
                $scope.Param.MikroId,
                $scope.Param.MikroId,
                0, //FİRMA NO
                0, //ŞUBE NO
                moment(new Date()).format("DD.MM.YYYY"),
                TmpTip,
                8,
                0,
                TmpEvrTip,
                pSeri,
                pSira,
                "", //BELGE NO
                moment(new Date()).format("DD.MM.YYYY"),
                pDr.KODU,
                0, //ISKONTO 1
                1, //ISKONTO 2
                1, //ISKONTO 3
                1, //ISKONTO 4
                1, //ISKONTO 5
                1, //ISKONTO 6
                1, //ISKONTO 7
                1, //ISKONTO 8
                1, //ISKONTO 9
                1, //ISKONTO 10
                0, //SATIR ISKONTO TİP 1
                0, //SATIR ISKONTO TİP 2
                0, //SATIR ISKONTO TİP 3
                0, //SATIR ISKONTO TİP 4
                0, //SATIR ISKONTO TİP 5
                0, //SATIR ISKONTO TİP 6
                0, //SATIR ISKONTO TİP 7
                0, //SATIR ISKONTO TİP 8
                0, //SATIR ISKONTO TİP 9
                0, //SATIR ISKONTO TİP 10
                0, //CARİCİNSİ
                $scope.BteFasoncu.txt, //CARI KODU,
                pDr.ISEMRI, //İŞEMRİKODU
                "", //PERSONEL KODU
                0, //HARDOVİZCİNSİ
                1, //HARDOVİZKURU
                1, //ALTDOVİZKURU
                0, //STOKDOVİZCİNSİ
                1, //STOKDOVİZKURU
                pDr.MIKTAR,
                pDr.MIKTAR,
                1, //BIRIM PNTR
                0, //TUTAR
                0, // İSKONTO TUTAR 1
                0, // İSKONTO TUTAR 2
                0, // İSKONTO TUTAR 3
                0, // İSKONTO TUTAR 4
                0, // İSKONTO TUTAR 5
                0, // İSKONTO TUTAR 6
                0, // MASRAF TUTAR 1
                0, // MASRAF TUTAR 2
                0, // MASRAF TUTAR 3
                0, // MASRAF TUTAR 4
                0, // VERİPNTR
                0, // VERGİ
                0, // MASRAFVERGİPNTR,
                0, // MASRAFVERGİ
                0, // ODEME NO                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                '',// AÇIKLAMA
                '00000000-0000-0000-0000-000000000000', //sth_sip_uid
                '00000000-0000-0000-0000-000000000000', //sth_fat_uid,
                pDr.DEPO, //GİRİSDEPONO
                pDr.DEPO, //CİKİSDEPONO
                moment(new Date()).format("DD.MM.YYYY"), //MALKABULSEVKTARİHİ
                '', // CARİSORUMLULUKMERKEZİ
                '', // STOKSORUMLULUKMERKEZİ
                0,  // VERGİSİZFL
                1,  // ADRESNO
                '', // PARTI, 
                1,  // LOT
                '', // PROJE KODU
                '', // EXİMKODU
                0, // DİSTİCARETTURU
                0, // OTVVERGİSİZFL
                0, // OİVVERGİSİZ
                0, //FIYAT LISTE NO
                0, //NAKLİYEDEPO
                0, // NAKLİYEDURUMU
                (typeof pDr.ISMERKEZI == 'undefined') ? '' : pDr.ISMERKEZI
            ];
            
            let TmpResult = await srv.Execute($scope.Firma,'StokHarInsert',TmpInsertData);

            if(typeof TmpResult != 'undefined')
            {
                resolve(true);
                return
            }
            else
            {
                resolve(false);
                return
            }
        })
    }
    function UpdateMalzemePlani(pIsEmri,pStokKodu,pMiktar,pUret)
    {
        return new Promise(async resolve => 
        {
            let TmpUpdateQuery = "";

            if(pUret)
            {
                TmpUpdateQuery = "UPDATE ISEMRI_MALZEME_DURUMLARI SET ish_uret_miktar = ish_uret_miktar + @miktar WHERE ish_isemri = @ish_isemri AND ish_stokhizm_gid_kod = @ish_stokhizm_gid_kod"
            }
            else
            {
                TmpUpdateQuery = "UPDATE ISEMRI_MALZEME_DURUMLARI SET ish_sevk_miktar = ish_sevk_miktar + @miktar WHERE ish_isemri = @ish_isemri AND ish_stokhizm_gid_kod = @ish_stokhizm_gid_kod"
            }

            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : TmpUpdateQuery,
                param : ['miktar:float','ish_isemri:string|25','ish_stokhizm_gid_kod:string|25'],
                value : [pMiktar,pIsEmri,pStokKodu]
            }
            let TmpResult = await srv.Execute(TmpQuery)

            if(typeof TmpResult != 'undefined')
            {
                resolve(true);
                return
            }
            else
            {
                resolve(false);
                return
            }
        });
    }
    function MiktarKontrol()
    {
        if($scope.Data.UMP.length > 0)
        {
            let TmpDr = $scope.Data.UMP.filter(x => x.URETTUKET == 1);
            if(TmpDr.length > 0)
            {
                if(TmpDr[0].PMIKTAR <= srv.SumColumn($scope.Data.DATA,"MIKTAR","URETTUKET = 1"))
                {
                    return true;
                }
            }
        }
        return false;
    }
    function KantarVeriGetir() 
    {
        var net = new WebTCP('localhost', 9999);

        options = { encoding: "utf-8", timeout: 0, noDelay: true, keepAlive: false, initialDelay: 0 }
        var socket = net.createSocket($scope.Param.Mono.BasarSayarKantarIP, $scope.Param.Mono.BasarSayarKantarPORT, options);
        socket.on('connect', function () { console.log('connected'); });

        socket.on('data', function (data) {
            if (data.includes("�,") && data.includes("kg")) {
                data = data.substring(
                    data.lastIndexOf("�,") + 1,
                    data.lastIndexOf("k")
                );
                $scope.LblKantarKilo = data.split(",   ").join("");
            }
        });

        socket.on('end', function (data) { console.log("socket is closed "); });
        socket.write("hello world");
    }
    function HassasTeraziVeriGetir() 
    {
        var net = new WebTCP('localhost', 9999);

        options = { encoding: "utf-8", timeout: 0, noDelay: true, keepAlive: false, initialDelay: 0 }
        var socket = net.createSocket($scope.Param.Mono.BasarSayarHasasTeraziIP, $scope.Param.Mono.BasarSayarHasasTeraziPORT, options);
        socket.on('connect', function () { console.log('connected'); });

        socket.on('data', function (data) {
            if (data.includes("�,") && data.includes("kg")) {
                data = data.substring(
                    data.lastIndexOf("�,") + 1,
                    data.lastIndexOf("k")
                );
                $scope.LblHassasGram = data.split(",   ").join("");
            }
        });

        socket.on('end', function (data) { console.log("socket is closed "); });
        socket.write("hello world");
    }
    function MaxSthSira(pSeri,pEvrakTip)
    {
        return new Promise(async resolve => 
        {
            let TmpData = await srv.Execute($scope.Firma,'MaxStokHarSira',[pSeri,pEvrakTip])
            if(TmpData.length > 0)
            {
                resolve(TmpData[0].MAXEVRSIRA);
                return;
            }
            resolve(1);
            return;
        })
    }
    function MaxOpSira(pSeri)
    {
        return new Promise(async resolve => 
        {
            let TmpData = await srv.Execute($scope.Firma,'MaxOperasyonSira',[pSeri])
            if(TmpData.length > 0)
            {
                resolve(TmpData[0].MAXEVRSIRA);
                return;
            }
            resolve(1);
            return;
        })
    }
    $scope.Init = async function () 
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $scope.Data = {};
        $scope.Data.UMP = [];
        $scope.Data.URP = [];
        $scope.Data.DATA = [];

        $scope.LblKasaDara = 0;

        $scope.TxtSpRefMiktar = 0;
        $scope.LblHassasGram = 0;
        $scope.LblKantarKilo = 0;
        $scope.LblKantarMiktar = 0;
        $scope.DataKantarKilo = 0;
        $scope.DataHassasTeraziGram = 0;

        $scope.LblUrun = "";
        $scope.TxtBarkod = "";
        $scope.TxtMiktar = 0;

        $scope.TxtEtiketMiktar = 1;

        $scope.SthGSeri = $scope.Param.Mono.UrunGirisSeri;
        $scope.SthCSeri = $scope.Param.Mono.UrunCikisSeri;
        $scope.OpSeri = $scope.Param.Mono.OperasyonSeri;

        $scope.SthGSira = await MaxSthSira($scope.SthGSeri,12)
        $scope.SthCSira = await MaxSthSira($scope.SthGSeri,0)
        $scope.OpSira = await MaxOpSira($scope.OpSeri)

        InitObj();
        InitGrd([]);
        HassasTeraziVeriGetir();
        KantarVeriGetir();
    }
    $scope.BtnTartimOnayla = function () 
    {
        $scope.DataHassasTeraziGram = $scope.LblHassasGram;
        $scope.DataKantarKilo = $scope.LblKantarKilo;

        $scope.LblKantarMiktar = (($scope.TxtSpRefMiktar / ($scope.DataHassasTeraziGram / 1000)) * $scope.DataKantarKilo).toFixed(2);
    }
    $scope.BtnEkle = function()
    {
        let TmpDrUret = $scope.Data.UMP.filter(x => x.URETTUKET == 1)
        let TmpDrTuket = $scope.Data.UMP.filter(x => x.URETTUKET == 0)
        let TmpDrRota = [];

        if(TmpDrUret.length > 0)
        {
            TmpDrRota = $scope.Data.URP.filter(x => x.URUNKODU == $scope.LblUrun)
        }

        let TmpUretRec = 0;

        for (let i = 0; i < TmpDrUret.length; i++) 
        {
            let TmpRec = 0;
            if(TmpDrUret.length > 0)
            {
                TmpRec = srv.Max($scope.Data.DATA.filter(x => x.URETTUKET == 1),'REC');
            }

            let TmpData = {};
            TmpData.REC = TmpRec + 1;
            TmpData.TARIH = moment(new Date()).format("DD.MM.YYYY");
            TmpData.TIP = TmpDrUret[i].TIP;
            TmpData.URETTUKET = TmpDrUret[i].URETTUKET;
            TmpData.URNBARKOD = TmpDrUret[i].BARKOD;
            TmpData.ADITR = TmpDrUret[i].ADITR;
            TmpData.ADIENG = TmpDrUret[i].ADIENG;
            TmpData.ADIRU = TmpDrUret[i].ADIRU;
            TmpData.ADIRO = TmpDrUret[i].ADIRO;
            TmpData.DESI = TmpDrUret[i].DESI;
            TmpData.AGIRLIK = TmpDrUret[i].AGIRLIK;
            TmpData.ISEMRI = TmpDrUret[i].ISEMRI;
            TmpData.KODU = TmpDrUret[i].KODU;
            TmpData.ADI = TmpDrUret[i].ADI;
            TmpData.MIKTAR = TmpDrUret[i].BMIKTAR * $scope.LblKantarMiktar;
            TmpData.DEPOMIKTAR = TmpDrUret[i].DEPOMIKTAR;

            if($scope.Param.Mono.YariMamulDepo != "")
            TmpData.DEPO = $scope.Param.Mono.YariMamulDepo;
            else
            TmpData.DEPO = TmpDrUret[i].DEPO;

            if(TmpDrUret[i].URETTUKET == 1)
            {
                TmpUretRec = TmpData.REC
                TmpData.URETREC = TmpUretRec 
            }
            else
            {
                TmpData.URETREC = TmpUretRec
            }
            if(TmpDrRota.length > 0)
            {
                TmpData.ROTAREC = TmpDrRota[0].REC;
                TmpData.SAFHANO = TmpDrRota[0].SAFHANO;
                TmpData.OPERASYONKODU = TmpDrRota[0].OPERASYONKODU;
                TmpData.ISMERKEZI = TmpDrRota[0].ISMERKEZI;
                TmpData.SURE = TmpDrRota[0].SURE * TmpDrUret[0].KATSAYI;
            }

            $scope.Data.DATA.push(TmpData);
        }
        for (let i = 0; i < TmpDrTuket.length; i++) 
        {
            let TmpRec = 0;
            if(TmpDrTuket.length > 0)
            {
                TmpRec = srv.Max($scope.Data.DATA.filter(x => x.URETTUKET == 0),'REC');
            }

            let TmpData = {};
            TmpData.REC = TmpRec + 1;
            TmpData.TARIH = moment(new Date()).format("DD.MM.YYYY");
            TmpData.TIP = TmpDrTuket[i].TIP;
            TmpData.URETTUKET = TmpDrTuket[i].URETTUKET;
            TmpData.URNBARKOD = TmpDrTuket[i].BARKOD;
            TmpData.ADITR = TmpDrTuket[i].ADITR;
            TmpData.ADIENG = TmpDrTuket[i].ADIENG;
            TmpData.ADIRU = TmpDrTuket[i].ADIRU;
            TmpData.ADIRO = TmpDrTuket[i].ADIRO;
            TmpData.DESI = TmpDrTuket[i].DESI;
            TmpData.AGIRLIK = TmpDrTuket[i].AGIRLIK;
            TmpData.ISEMRI = TmpDrTuket[i].ISEMRI;
            TmpData.KODU = TmpDrTuket[i].KODU;
            TmpData.ADI = TmpDrTuket[i].ADI;
            TmpData.MIKTAR = TmpDrTuket[i].BMIKTAR * $scope.LblKantarMiktar;
            TmpData.DEPOMIKTAR = TmpDrTuket[i].DEPOMIKTAR;

            if($scope.Param.Mono.YariMamulDepo != "")
            TmpData.DEPO = $scope.Param.Mono.YariMamulDepo;
            else
            TmpData.DEPO = TmpDrTuket[i].DEPO;

            if(TmpDrRota.length > 0)
            {
                TmpData.ROTAREC = TmpDrRota[0].REC;
                TmpData.SAFHANO = TmpDrRota[0].SAFHANO;
                TmpData.OPERASYONKODU = TmpDrRota[0].OPERASYONKODU;
                TmpData.ISMERKEZI = TmpDrRota[0].ISMERKEZI;
                TmpData.SURE = TmpDrRota[0].SURE * TmpDrTuket[0].KATSAYI;
            }

            $scope.Data.DATA.push(TmpData);
        }

        InitGrd($scope.Data.DATA.filter(x => x.URETTUKET == 1))
    }
    $scope.BtnKaydet = function()
    {
        let TmpDrTuket = $scope.Data.DATA.filter(x => x.URETTUKET == 0)
        let TmpDrUret = $scope.Data.DATA.filter(x => x.URETTUKET == 1)

        if($scope.BteIsEmri.txt == "")
        {
            swal("Dikkat", "Lütfen İş emri seçmeden geçmeyin.",icon="warning");
            return;
        }
        if(MiktarKontrol())
        {
            swal("Dikkat", "Lütfen başka bir iş emri seçiniz.",icon="warning");
            return;
        }

        for (let i = 0; i < TmpDrUret.length; i++)
        {
            await InsertUrunGirisCikis(0,TmpDrUret[i],$scope.SthGSeri,$scope.SthGSira)
            await UpdateMalzemePlani(TmpDrUret[i].ISEMRI, TmpDrUret[i].KODU, TmpDrUret[i].MIKTAR, true)
        }
        for (let i = 0; i < TmpDrTuket.length; i++) 
        {
            await InsertUrunGirisCikis(1,TmpDrTuket[i],$scope.SthCSeri,$scope.SthCSira)
            await UpdateMalzemePlani(TmpDrTuket[i].ISEMRI, TmpDrTuket[i].KODU, TmpDrTuket[i].MIKTAR, false)
        }
    }
}