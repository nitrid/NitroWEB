function MonoYariMamulMalKabul($scope, srv, $rootScope) 
{
    let SelectionRow;
    function InitGrd(pData)
    {
        $("#GrdList").dxDataGrid
        (
            {
                dataSource: pData,
                allowColumnResizing: true,
                height: 400,
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
                    if($scope.ManuelGirisHide ==  true)
                    {
                        $scope.LblKasaDara = parseFloat($scope.LblKasaDara) + parseFloat(pData)
                    }
                    else
                    {
                        $scope.LblKasaDara = pData
                    }
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
                        "ISNULL((SELECT TOP 1 bar_kodu FROM BARKOD_TANIMLARI WHERE bar_stokkodu = ISNULL((SELECT TOP 1 upl_kodu FROM URETIM_MALZEME_PLANLAMA WHERE upl_isemri = is_Kod AND upl_uretim_tuket = 1 and upl_satirno = 0),'') AND bar_birimpntr = 1 AND bar_partikodu = '' AND bar_lotno = 0),'') AS BARKOD, " +
                        "is_Kod AS KODU,is_Ismi AS ADI, " +
                        "ISNULL((SELECT TOP 1 upl_kodu FROM URETIM_MALZEME_PLANLAMA WHERE upl_isemri = is_Kod AND upl_uretim_tuket = 1 and upl_satirno = 0),'') AS STOKKODU, " +
                        "ISNULL((SELECT TOP 1 upl_miktar FROM URETIM_MALZEME_PLANLAMA WHERE upl_isemri = is_Kod AND upl_uretim_tuket = 1 and upl_satirno = 0),'') AS MIKTAR, " +
                        "ISNULL((SELECT sto_isim  FROM STOKLAR WHERE sto_kod = ISNULL((SELECT TOP 1 upl_kodu FROM URETIM_MALZEME_PLANLAMA WHERE upl_isemri = is_Kod AND upl_uretim_tuket = 1 and upl_satirno = 0),'')),'') AS STOKADI " +
                        "FROM ISEMIRLERI WHERE is_EmriDurumu = 1  AND ((is_Kod LIKE '" +$rootScope.GeneralParamList.YariMamulIsEmriFlag+ "%') OR  (is_Kod LIKE 'AYD-%')) "
            },
            selection : "KODU",
            columns :
            [
                {
                    
                    dataField: "ADI",
                    width: 200
                }, 
                
                {
                    title: "STOK KODU",
                    dataField: "STOKKODU",
                    width: 200
                },
                {
                    title: "MIKTAR",
                    dataField: "MIKTAR",
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
                        }
                    }
                }
            }
        }
        $scope.CmbEtiketTasarim =
        {
            datasource:
            {
                data: [{name: "Yari Mamul Mal Kabul Etiket - 1", special: $rootScope.GeneralParamList.YariMamulMalKabulEtiket}] 
            },
            key: "special",
            value: "name",
            defaultVal: $rootScope.GeneralParamList.YariMamulMalKabulEtiket,
            selectionMode: "key",
            return: $rootScope.GeneralParamList.YariMamulMalKabulEtiket,
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
                        "ROUND(CAST((RtP_PlanlananSure / RtP_PlanlananMiktar) AS float),2) AS SURE " +
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
                $rootScope.GeneralParamList.MikroId,
                $rootScope.GeneralParamList.MikroId,
                0, //FİRMA NO
                0, //ŞUBE NO
                moment(new Date()).format("DD.MM.YYYY"),
                TmpTip,
                7,
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
                '', //CARI KODU,
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
    function InsertOperasyonKapama(pDr,pSeri,pSira)
    {
        return new Promise(async resolve => 
        {
            let TmpSure = parseInt(pDr.SURE);
            let TmpBitTarih = moment(new Date()).format("DD.MM.YYYY HH:mm:ss")
            let TmpBasTarih = moment(new Date()).add(TmpSure * -1,'seconds').format("DD.MM.YYYY HH:mm:ss")

            let TmpInsertData =
            [
                $rootScope.GeneralParamList.MikroId,
                $rootScope.GeneralParamList.MikroId,
                0,
                0,
                pSeri,
                pSira,
                pDr.ROTAREC,
                TmpBasTarih,
                TmpBitTarih,
                pDr.ISEMRI,
                pDr.KODU,
                pDr.SAFHANO,
                pDr.OPERASYONKODU,
                pDr.ISMERKEZI,
                pDr.MIKTAR,
                pDr.MIKTAR,
                pDr.MIKTAR,
                pDr.MIKTAR,
                TmpSure
            ]

            let TmpResult = await srv.Execute($scope.Firma,'OperasyonHareketInsert',TmpInsertData);

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
    async function EtiketInsert(pData)
    {
        let InsertData = 
        [
            1,                               //CREATE_USER
            1,                               //LASTUP_USER
            1,     //SPECIAL1
            $rootScope.GeneralParamList.YariMamulEtiketSeri,          //SERI
            $scope.EtkSira,                                 //SIRA
            pData.ISEMRI,    
            ($scope.DataKantarKilo - $scope.LblKasaDara),                              //BELGENO
            0,                               //ETİKETTİP
            0,                               //BASİMTİPİ
            (pData.MIKTAR <= 32000 ? pData.MIKTAR : 32000),             //BASİMADET
            1,                               //DEPONO
            pData.KODU,                  //STOKKODU
            pData.MIKTAR,                               //RENKKODU
            1,                               //BEDENKODU
            pData.URNBARKOD,                         //BARKOD
            $scope.TxtBasimAdet              //BASILACAKMIKTAR
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
    function UpdateRotaPlani(pRec,pMiktar,pSure)
    {
        return new Promise(async resolve => 
        {
            let TmpSure = parseInt(pSure);
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "UPDATE URETIM_ROTA_PLANLARI SET RtP_TamamlananMiktar = RtP_TamamlananMiktar + @RtP_TamamlananMiktar,RtP_TamamlananSure = RtP_TamamlananSure + @RtP_TamamlananSure WHERE RtP_Guid = @RtP_Guid",
                param : ['RtP_TamamlananMiktar:float','RtP_TamamlananSure:int','RtP_Guid:string|50'],
                value : [pMiktar,TmpSure,pRec]
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
                if(TmpDr[0].PMIKTAR < srv.SumColumn($scope.Data.DATA,"MIKTAR","URETTUKET = 1"))
                {
                    return true;
                }
            }
        }
        return false;
    }
    function KantarVeriGetir() 
    {
        var net = new WebTCP('176.236.62.130', 9999);

        console.log(net)

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
           // $scope.LblKantarKilo =  $scope.LblKantarKilo - $scope.LblKasaDara;
        }
    }
    function HassasTeraziVeriGetir() 
    {
        var net = new WebTCP('176.236.62.130', 9999);

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
    function Scale()
    {
        srv.Scale.Start($rootScope.GeneralParamList.BasarSayarHasasTeraziPORT,pData =>
        {
            console.log(pData)
            $scope.LblHassasGram = pData
        });
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
    function MaxSthSira(pSeri,pEvrakTip)
    {
        return new Promise(async resolve => 
        {
            console.log(pSeri)
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
    async function MaxEtiketSira(pSeri)
    {
        return new Promise(async resolve => 
        {
            resolve((await srv.Execute($scope.Firma,'MaxEtiketSira',[pSeri]))[0].MAXEVRSIRA)
        })
    }
    $scope.Init = async function () 
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "YARI MAMÜL MAL KABUL"
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
        $scope.ManuelGirisHide = $rootScope.GeneralParamList.YariMamulManuelGiris;

        $scope.LblUrun = "";
        $scope.TxtBarkod = "";
        $scope.TxtMiktar = 0;

        $scope.TxtBasimAdet = 1;
        

        $scope.SthGSeri = $rootScope.GeneralParamList.YariMamulUrunGirisSeri;
        $scope.SthCSeri = $rootScope.GeneralParamList.YariMamulUrunCikisSeri;
        $scope.OpSeri = $rootScope.GeneralParamList.YariMamulOperasyonSeri;

        $scope.SthGSira = await MaxSthSira($scope.SthGSeri,12)
        $scope.SthCSira = await MaxSthSira($scope.SthCSeri,0)
        $scope.OpSira = await MaxOpSira($scope.OpSeri)
        $scope.EtkSira = await MaxEtiketSira($rootScope.GeneralParamList.YariMamulEtiketSeri)

        if($rootScope.GeneralParamList.MonoYariMamulMalKabul != "true")
        {
            swal("Dikkat", "Bu Sayfaya Giriş Yetkiniz Bulunmamaktadır..",icon="warning");
            var url = "index.html";
            window.location.href = url;
            event.preventDefault();        
        }

        InitObj();
        InitGrd([]);
        HassasTeraziVeriGetir();
        KantarVeriGetir();
        Scale();
    }
    $scope.BtnTartimOnayla = async function()
    {
        $scope.DataHassasTeraziGram = $scope.LblHassasGram;
        $scope.DataKantarKilo =$scope.LblKantarKilo
        if($rootScope.GeneralParamList.YariMamulGramKontrol == 1)
        {
            console.log($scope.LblUrun)
            let TmpData = await srv.Execute($scope.Firma,'StokGramDegerGetir',[$scope.LblUrun])
            let ReferansDeger = (TmpData[0].REFDEGER) * ($rootScope.GeneralParamList.YariMamulGramYuzde / 100)
            if(($scope.LblHassasGram / $scope.TxtSpRefMiktar) < (TmpData[0].REFDEGER - ReferansDeger) ||  ($scope.LblHassasGram / $scope.TxtSpRefMiktar) > (parseInt(TmpData[0].REFDEGER) + ReferansDeger))
            {
                swal("Dikkat", "Verilen Değerler Ürün İçin Belirlenen Sapma Oranından Fazla İşlem Durduruldu..",icon="warning");
                return;
            }
            
        }
        console.log($scope.LblKasaDara)
        console.log($scope.DataKantarKilo)
        console.log($scope.DataHassasTeraziGram)
        
        $scope.LblKantarMiktar =  parseInt((($scope.TxtSpRefMiktar / ($scope.DataHassasTeraziGram / 1000)) * ($scope.DataKantarKilo - $scope.LblKasaDara)).toFixed(2));
      
    }
    $scope.BtnSatirSil = async function()
    {
        let TmpDr = $scope.Data.DATA.filter(x => x.URNBARKOD == SelectionRow.URNBARKOD)

        for (let i = 0; i < TmpDr.length; i++) 
        {
            $scope.Data.DATA = $scope.Data.DATA.filter(x => x.REC !== TmpDr[i].REC)
        }

        if($scope.Data.DATA.length > 0)
        {
            InitGrd($scope.Data.DATA.filter(x => x.URETTUKET == 1))
        }
        else
        {
            InitGrd([]);
        }
    }
    $scope.BtnBarkodBas = async function()
    {
        let TmpDr = $scope.Data.DATA.filter(x => x.URETTUKET == 1)

        if($scope.BteIsEmri.txt == "")
        {
            swal("Dikkat", "Lütfen İş emri ve parti kodu seçmeden geçmeyin.",icon="warning");
            return;
        }
        // if(MiktarKontrol())
        // {
        //     swal("Dikkat", "Lütfen başka bir iş emri seçiniz.",icon="warning");
        //     return;
        // }

        if(TmpDr.length > 0)
        {
            for (let i = 0; i < TmpDr.length; i++) 
            {
                await EtiketInsert(TmpDr[i]);
            }
        }
        else
        {
            swal("Hatalı İşlem!", "Lütfen Stok Seçimi Yapınız",icon="error");
        }
    }
    $scope.BtnEkle = async  function()
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

            await $scope.SeriBarkodOlustur()
            

            let TmpInsertData =
            [
                $scope.SthGSeri,
                $scope.SthGSira,
                $scope.SeriBarkod,
                TmpDrUret[i].KODU,
                parseInt(TmpDrUret[i].BMIKTAR * $scope.LblKantarMiktar)
            ]
           
            let TmpResult = await srv.Execute($scope.Firma,'SeriNoInsert',TmpInsertData);
            console.log(TmpResult)  
            let TmpData = {};
            TmpData.REC = TmpRec + 1;
            TmpData.TARIH = moment(new Date()).format("DD.MM.YYYY");
            TmpData.TIP = TmpDrUret[i].TIP;
            TmpData.URETTUKET = TmpDrUret[i].URETTUKET;
            TmpData.URNBARKOD = $scope.SeriBarkod;
            TmpData.ADITR = TmpDrUret[i].ADITR;
            TmpData.ADIENG = TmpDrUret[i].ADIENG;
            TmpData.ADIRU = TmpDrUret[i].ADIRU;
            TmpData.ADIRO = TmpDrUret[i].ADIRO;
            TmpData.DESI = TmpDrUret[i].DESI;
            TmpData.AGIRLIK = TmpDrUret[i].AGIRLIK;
            TmpData.ISEMRI = TmpDrUret[i].ISEMRI;
            TmpData.KODU = TmpDrUret[i].KODU;
            TmpData.ADI = TmpDrUret[i].ADI;
            TmpData.MIKTAR = parseInt(TmpDrUret[i].BMIKTAR * $scope.LblKantarMiktar);
            TmpData.DEPOMIKTAR = TmpDrUret[i].DEPOMIKTAR;

            

            if($rootScope.GeneralParamList.YariMamulDepo != "")
            TmpData.DEPO = $rootScope.GeneralParamList.YariMamulDepo;
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
                TmpData.SURE = TmpDrRota[0].SURE * TmpData.MIKTAR;
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
            TmpData.MIKTAR = parseInt(TmpDrTuket[i].BMIKTAR * $scope.LblKantarMiktar);
            TmpData.DEPOMIKTAR = TmpDrTuket[i].DEPOMIKTAR;

            if($rootScope.GeneralParamList.YariMamulDepo != "")
            TmpData.DEPO = $rootScope.GeneralParamList.YariMamulDepo;
            else
            TmpData.DEPO = TmpDrTuket[i].DEPO;

            if(TmpDrRota.length > 0)
            {
                TmpData.ROTAREC = TmpDrRota[0].REC;
                TmpData.SAFHANO = TmpDrRota[0].SAFHANO;
                TmpData.OPERASYONKODU = TmpDrRota[0].OPERASYONKODU;
                TmpData.ISMERKEZI = TmpDrRota[0].ISMERKEZI;
                TmpData.SURE = TmpDrRota[0].SURE * TmpData.MIKTAR;
            }

            $scope.Data.DATA.push(TmpData);
        }

        InitGrd($scope.Data.DATA.filter(x => x.URETTUKET == 1))
    }
    $scope.BtnKaydet = async function()
    {
        let TmpDrTuket = $scope.Data.DATA.filter(x => x.URETTUKET == 0)
        let TmpDrUret = $scope.Data.DATA.filter(x => x.URETTUKET == 1)

        if($scope.BteIsEmri.txt == "")
        {
            swal("Dikkat", "Lütfen İş emri seçmeden geçmeyin.",icon="warning");
            return;
        }
        // if(MiktarKontrol())
        // {
        //     swal("Dikkat", "Lütfen başka bir iş emri seçiniz.",icon="warning");
        //     return;
        // }

        for (let i = 0; i < TmpDrUret.length; i++) 
        {
            await InsertUrunGirisCikis(0,TmpDrUret[i],$scope.SthGSeri,$scope.SthGSira)
            await InsertOperasyonKapama(TmpDrUret[i],$scope.OpSeri,$scope.OpSira)
            await UpdateRotaPlani(TmpDrUret[i].ROTAREC, TmpDrUret[i].MIKTAR, TmpDrUret[i].SURE)
            await UpdateMalzemePlani(TmpDrUret[i].ISEMRI, TmpDrUret[i].KODU, TmpDrUret[i].MIKTAR, true)
        }
        for (let i = 0; i < TmpDrTuket.length; i++) 
        {
            await InsertUrunGirisCikis(1,TmpDrTuket[i],$scope.SthCSeri,$scope.SthCSira)
            await UpdateMalzemePlani(TmpDrTuket[i].ISEMRI, TmpDrTuket[i].KODU, TmpDrTuket[i].MIKTAR, false)
        }

        swal("İşlem Başarılı!", "Kayıt İşlemi Gerçekleştirildi.",icon="success");
        $scope.Init()
    }
    $scope.YeniEvrak = function()
    {
        if($scope.Data.DATA.length > 0)
        {
            swal("Dikkat", "Eklenmiş Ürünleri Kaydetmeden Yeni Evraka Geçilemez !",icon="warning");
        }
        else
        {
            $scope.Init()
        }
    }
    $scope.BtnKantarVerisiGetir = async function()
    {
        $scope.LblKantarKilo  = await srv.Scale.Send($rootScope.GeneralParamList.BasarSayarKantarPORT);
    }
    $scope.SeriBarkodOlustur = async function()
    {
        $scope.SeriBarkod = ''
        let length = 7;
        let chars = '0123456789'.split('');
        let AutoStr = "";
        
        if (! length) 
        {
            length = Math.floor(Math.random() * chars.length);
        }
        for (let i = 0; i < length; i++) 
        {
            AutoStr += chars[Math.floor(Math.random() * chars.length)];
        }
        $scope.BteParti = moment(new Date()).format("YYYYMMGG"),
        $scope.SeriBarkod = $scope.BteParti.padStart(8, "0")   + AutoStr
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query : "SELECT chz_serino FROM STOK_SERINO_TANIMLARI WHERE chz_serino = @chz_serino ",
            param : ['chz_serino:string|50'],
            value : [$scope.SeriBarkod]
        }
        let SeriKontrol = await srv.Execute(TmpQuery)
        if(SeriKontrol.length > 0)
         {
            $scope.PartiBarkod()
           
         }
    }
}