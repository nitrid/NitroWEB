function MonoElektrikUretim($scope, srv, $window, $rootScope) 
{
    let SelectionRow;
    function InitGrd(pData)
    {
        $("#GrdList").dxDataGrid
        (
            {
                dataSource: pData,
                allowColumnResizing: true,
                height: 340,
                width: "100%",
                columnWidth: 100,
                selection: 
                {
                    mode: "single"
                },
                columns :
                [
                    {
                        dataField: "URETREC",
                        name : "SATIR NO",
                        width: 50
                    }, 
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
                    
                ],
                hoverStateEnabled: true,
                showBorders: true,
                paging: 
                {
                    pageSize: 18
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
                    $scope.LblKasaDara = pData;
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
                query : " SELECT  " +
                        " is_Kod AS KODU,is_Ismi AS ADI,  " +
                        "  UPL.upl_miktar - ISNULL((SELECT TOP 1 ish_uret_miktar FROM ISEMRI_MALZEME_DURUMLARI WHERE ish_isemri = is_kod and ish_plan_sevkmiktar = 0),0) AS PLANMIKTAR,  " +
                        " UPL.upl_kodu AS STOKKODU,  " +
                        " ISNULL((SELECT sto_isim  FROM STOKLAR WHERE sto_kod =  UPL.upl_kodu),'') AS STOKADI  " +
                        " FROM ISEMIRLERI as ISM INNER JOIN URETIM_MALZEME_PLANLAMA AS UPL on ISM.is_Kod =  UPL.upl_isemri  " +
                        " WHERE ISM.is_EmriDurumu = 1 AND ISM.is_Kod LIKE '" +$rootScope.GeneralParamList.ElektrikUretimIsEmriFlag+ "%' AND (SELECT TOP 1 (ish_planuretim - ish_uret_miktar) FROM ISEMRI_MALZEME_DURUMLARI WHERE ish_isemri = ISM.is_kod and ish_plan_sevkmiktar = 0) > 0 " +
                        " AND UPL.upl_uretim_tuket = 1 " ,
            },
            selection : "KODU",
            columns :
            [
               
               
                {
                    title: "STOK KODU",
                    dataField: "STOKKODU",
                    width: 200
                }, 
                {
                    title: "STOK ADI",
                    dataField: "STOKADI",
                    width: 500
                },
                {
                    title : "KALAN MIKTAR",
                    dataField: "PLANMIKTAR",
                    width: 200
                },  
                {
                    title : "İŞ EMRİ KODU",
                    dataField: "KODU",
                    width: 200
                },
            ],
            onSelected : async function(pData)
            {
                if(typeof pData != 'undefined')
                {                    
                    let GetSpecial = 
                    {
                        db: "{M}." + $scope.Firma,
                        query : "SELECT is_special1 AS SPECIAL FROM  ISEMIRLERI where is_kod = @is_kod ",
                        param : ['is_kod:string|50'],
                        value : [pData.KODU]
                    } 
                    let TmpSpecial = await srv.Execute(GetSpecial)
                    console.log($rootScope.GeneralParamList.Kullanici.substring(0, 4))
                    if(TmpSpecial[0].SPECIAL != '')
                    {
                        if(TmpSpecial[0].SPECIAL != $rootScope.GeneralParamList.Kullanici.substring(0, 4))
                        {
                            swal("Dikkat", "Bu İş Emri '" + TmpSpecial[0].SPECIAL + "' Kullanıcısında Çalışılıyor.",icon="warning");
                            $scope.BteIsEmri.txt = ''
                            return
                        }
                    }
                    $scope.Data.UMP = await UretimMalzemePlanGetir(pData.KODU);
                    $scope.Data.URP = await UretimRotaPlanGetir(pData.KODU);
                    console.log($scope.Data.URP)
                    if( $scope.Data.URP.length == 0  )
                    {
                        swal("Dikkat", "Rota Planı Eksik Veya Hatalı Lütfen Kontol Ediniz .",icon="warning");
                        $scope.Init()
                        return;
                    }
                    if($scope.Data.URP[0].URUNKODU != pData.STOKKODU)
                    {
                        swal("Dikkat", "Rota Planı Eksik Veya Hatalı Lütfen Kontol Ediniz .",icon="warning");
                        $scope.Init()
                        return;
                    }
                    let TmpQuery = 
                    {
                        db: "{M}." + $scope.Firma,
                        query : "SELECT sto_kod, sto_birim1_ad AS BIRIM1AD,sto_birim1_katsayi AS BIRIM1KATSAYI,sto_birim2_ad AS BIRIM2AD, (sto_birim2_katsayi * -1) AS BIRIM2KATSAYI,sto_birim3_ad AS BIRIM3AD, (sto_birim3_katsayi * -1) AS BIRIM3KATSAYI, " +
                        "ISNULL((SELECT TOP 1 bar_kodu FROM BARKOD_TANIMLARI WHERE bar_stokkodu = sto_kod AND bar_birimpntr = 1 AND bar_partikodu = '' AND bar_lotno = 0),'') AS BARKOD1, " +
                        "ISNULL((SELECT TOP 1 bar_kodu FROM BARKOD_TANIMLARI WHERE bar_stokkodu = sto_kod AND bar_birimpntr = 2 AND bar_partikodu = '' AND bar_lotno = 0),ISNULL((SELECT TOP 1 bar_kodu FROM BARKOD_TANIMLARI WHERE bar_stokkodu = sto_kod AND bar_birimpntr = 3 AND bar_partikodu = '' AND bar_lotno = 0),'')) AS BARKOD2, " +
                        "ISNULL((SELECT TOP 1 bar_kodu FROM BARKOD_TANIMLARI WHERE bar_stokkodu = sto_kod AND bar_birimpntr = 3 AND bar_partikodu = '' AND bar_lotno = 0),'') AS BARKOD3 " +
                        "FROM STOKLAR WHERE sto_kod = @sto_kod ",
                        param : ['sto_kod:string|50'],
                        value : [pData.STOKKODU]
                    } 
                    let TmpData = await srv.Execute(TmpQuery)

                    let UpdateQuery = 
                    {
                        db: "{M}." + $scope.Firma,
                        query : "Update ISEMIRLERI set is_special1 = @is_special1 where is_kod = @is_kod ",
                        param : ['is_special1:string|4','is_kod:string|50'],
                        value : [$rootScope.GeneralParamList.Kullanici,pData.KODU]
                    } 
                    await srv.Execute(UpdateQuery)
                    $scope.Barkod1 = TmpData[0].BARKOD1;
                    $scope.Barkod2 = TmpData[0].BARKOD2;
                    $scope.Barkod3 = TmpData[0].BARKOD3;
                    if($scope.Barkod1 == '' || $scope.Barkod2 == '' || $scope.Barkod3 == '')
                    {
                        swal("Dikkat", "Ürün Barkodlarında Eksik Mevcut Lütfen Kontrol Ediniz .",icon="warning");
                    }
                    $scope.KontrolMiktar = TmpData[0].BIRIM2KATSAYI;
                    $scope.Birim3 = TmpData[0].BIRIM3KATSAYI;
                    $scope.ToplamPlanMiktar = pData.PLANMIKTAR;

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
                data: [{name: "Barkod Etiketi", special: $rootScope.GeneralParamList.ElektrikMontajMalKabulEtiket}]
            },
            key: "special",
            value: "name",
            defaultVal: $rootScope.GeneralParamList.ElektrikMontajMalKabulEtiket,
            selectionMode: "key",
            return: $rootScope.GeneralParamList.ElektrikMontajMalKabulEtiket,
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
            console.log(TmpData)
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
            console.log(TmpData)

            if (typeof TmpData == 'undefined')
            {
                TmpData = []
            }
            resolve(TmpData);
            return;
        });
    }
    function InsertUrunGirisCikis(pGirisCikis,pDrKODU,pDrISEMRI,pDrMIKTAR,pDrDEPO,pDrISMERKEZI,pSeri,pSira)
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
                1,
                1,
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
                pDrKODU,
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
                pDrISEMRI, //İŞEMRİKODU
                "", //PERSONEL KODU
                0, //HARDOVİZCİNSİ
                1, //HARDOVİZKURU
                1, //ALTDOVİZKURU
                0, //STOKDOVİZCİNSİ
                1, //STOKDOVİZKURU
                pDrMIKTAR,
                pDrMIKTAR,
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
                pDrDEPO, //GİRİSDEPONO
                pDrDEPO, //CİKİSDEPONO
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
                (typeof pDrISMERKEZI == 'undefined') ? '' : pDrISMERKEZI
            ];
            console.log(TmpInsertData)
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
    function InsertOperasyonKapama(pDrROTAREC,pDrISEMRI,pDrKODU,pDrSAFHANO,pDrOPERASYONKODU,pDrISMERKEZI,pDrMIKTAR,pDrSURE,pSeri,pSira)
    {
        return new Promise(async resolve => 
        {
            let TmpSure = parseInt(pDrSURE);
            let TmpBitTarih = moment(new Date()).format("DD.MM.YYYY HH:mm:ss")
            let TmpBasTarih = moment(new Date()).add(TmpSure * -1,'seconds').format("DD.MM.YYYY HH:mm:ss")

            let TmpInsertData =
            [
                1,
                1,
                0,
                0,
                pSeri,
                pSira,
                pDrROTAREC,
                TmpBasTarih,
                TmpBitTarih,
                pDrISEMRI,
                pDrKODU,
                pDrSAFHANO,
                pDrOPERASYONKODU,
                pDrISMERKEZI,
                pDrMIKTAR,
                pDrMIKTAR,
                pDrMIKTAR,
                pDrMIKTAR,
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
            1,                                              //CREATE_USER
            1,                                              //LASTUP_USER
            pData.SPECIAL,                 //SPECIAL1
            $rootScope.GeneralParamList.ElektrikUretimEtiketSeri,          //SERI
            $scope.EtkSira,                                 //SIRA
            pData.ISEMRI,                                   //AÇIKLAMA
            parseFloat($scope.LblKantarKilo),                 //BELGENO
            0,                                              //ETİKETTİP
            0,                                              //BASİMTİPİ
            pData.MIKTAR,                                   //BASİMADET
            1,                                              //DEPONO
            pData.KODU,                                     //STOKKODU
            1,                                              //RENKKODU
            1,                                              //BEDENKODU
            pData.URNBARKOD,                                //BARKOD
            pData.BASMIKTAR,                                               //BASILACAKMIKTAR
        ]
        
        let InsertControl = await srv.Execute($scope.Firma,'EtiketInsert',InsertData);
        if(InsertControl == "")
        {
            //swal("İşlem Başarılı!", "Etiket Yazdırma İşlemi Gerçekleştirildi.",icon="success");
            $('.toast').toast('show');
            $window.document.getElementById("TxtBarkodKontrol").focus();
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
            $scope.LblKantarKilo =  $scope.LblKantarKilo - $scope.LblKasaDara;
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
        console.log(pSeri)
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
        $rootScope.PageName = "ELEKTRİK ÜRETİM"

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
        $scope.TxtBarkodKontrol = ""

        $scope.LblUrun = "";
        $scope.TxtBarkod = "";
        $scope.TxtMiktar = 0;
        $scope.KontrolMiktar = 0;
        $scope.BarkodKontrolMiktar = 0;
        $scope.ToplamBarkodKontrolMiktar = 0;
        $scope.ToplamPlanMiktar  = 0;
        $scope.KutuKontrolMiktar = 0;

        $scope.BteParti = 
        {
            txt : moment(new Date()).format("YYYYMMDD"),
        }     
        $scope.TxtEtiketMiktar = 1;

        $scope.SthGSeri = $rootScope.GeneralParamList.ElektrikUretimUrunGirisSeri;
        $scope.SthCSeri = $rootScope.GeneralParamList.ElektrikUretimUrunCikisSeri;
        $scope.OpSeri = $rootScope.GeneralParamList.ElektrikUretimOperasyonSeri;

        $scope.SthGSira = await MaxSthSira($scope.SthGSeri,12)
        $scope.SthCSira = await MaxSthSira($scope.SthCSeri,0)
        $scope.OpSira = await MaxOpSira($scope.OpSeri)
        $scope.EtkSira = await MaxEtiketSira($rootScope.GeneralParamList.YariMamulEtiketSeri)

        if($rootScope.GeneralParamList.MonoElektrikUretim != "true")
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
    }
    $scope.BtnTartimOnayla = function()
    {
        $scope.DataHassasTeraziGram = $scope.LblHassasGram;
        $scope.DataKantarKilo = parseInt($scope.LblKantarKilo);

       $scope.LblKantarMiktar =  parseInt((($scope.TxtSpRefMiktar / ($scope.DataHassasTeraziGram / 1000)) * $scope.DataKantarKilo).toFixed(2));
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
        if(MiktarKontrol())
        {
            swal("Dikkat", "Lütfen başka bir iş emri seçiniz.",icon="warning");
            return;
        }

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
    $scope.BtnEkle = async function()
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
                $scope.KutuKontrolMiktar,
                TmpDrUret[i].DEPO
            ]
            
            let TmpResult = await srv.Execute($scope.Firma,'SeriNoInsert',TmpInsertData);

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
            TmpData.MIKTAR = $scope.KutuKontrolMiktar;
            TmpData.DEPOMIKTAR = TmpDrUret[i].DEPOMIKTAR;
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
            TmpData.MIKTAR = TmpDrTuket[i].BMIKTAR * $scope.KutuKontrolMiktar
            TmpData.DEPOMIKTAR = TmpDrTuket[i].DEPOMIKTAR;

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
        let EtiketData = 
        {
            "ISEMRI": $scope.BteIsEmri.txt,
            "MIKTAR" : $scope.Birim3,
            "BASMIKTAR" : 1,
            "KODU" : $scope.LblUrun,
            "URNBARKOD" : $scope.SeriBarkod,
            "SPECIAL" :  "2"
        }


        let TmpDrMiktarKontrol = $scope.Data.UMP.filter(x => x.URETTUKET == 0)
        let InfoText = [];

        for(let i = 0;i < TmpDrTuket.length;i++) //Depo Miktar Kontrol
        {
            if(srv.SumColumn($scope.Data.DATA,"MIKTAR","KODU = " + TmpDrMiktarKontrol[i].KODU) > TmpDrMiktarKontrol[i].DEPOMIKTAR)
            {
                InfoText[i] =  {STOK: TmpDrMiktarKontrol[i].KODU, DEPO: TmpDrMiktarKontrol[i].DEPOMIKTAR, MIKTAR: srv.SumColumn($scope.Data.DATA,"MIKTAR","KODU = " + TmpDrMiktarKontrol[i].KODU)}
            }
            if(InfoText != "")
            {
                swal("Dikkat", "Depo miktarı eksiye düşemez ! (" + TmpDrMiktarKontrol[i].KODU + " - " + TmpDrMiktarKontrol[i].DEPOMIKTAR + " - " + srv.SumColumn($scope.Data.DATA,"MIKTAR","KODU = " + TmpDrMiktarKontrol[i].KODU) + ")",icon="warning");
                return;
            }
        }

        await EtiketInsert(EtiketData);
        InitGrd($scope.Data.DATA.filter(x => x.URETTUKET == 1))
        $scope.JsonSave()
        $scope.KutuKontrolMiktar = 0;
        $window.document.getElementById("TxtBarkodKontrol").focus();
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
        if(MiktarKontrol())
        {
            swal("Dikkat", "Lütfen başka bir iş emri seçiniz.",icon="warning");
            return;
        }
        var TmpDrUretMiktar = 0;
        var TmpDrUretSURE = 0 
     
        for (let i = 0; i < TmpDrUret.length; i++) 
        {
            
            TmpDrUretMiktar = TmpDrUretMiktar + TmpDrUret[i].MIKTAR
            var TmpDrUretKODU = TmpDrUret[i].KODU
            var TmpDrUretISEMRI = TmpDrUret[i].ISEMRI
            var TmpDrUretDEPO = TmpDrUret[i].DEPO
            var TmpDrUretISMERKEZI = TmpDrUret[i].ISMERKEZI
            var TmpDrUretROTAREC = TmpDrUret[i].ROTAREC
            var TmpDrUretSAFHANO = TmpDrUret[i].SAFHANO
            var TmpDrUretOPERASYONKODU = TmpDrUret[i].OPERASYONKODU
            TmpDrUretSURE = TmpDrUretSURE + TmpDrUret[i].SURE
        }

            await InsertUrunGirisCikis(0,TmpDrUretKODU,TmpDrUretISEMRI,TmpDrUretMiktar,TmpDrUretDEPO,TmpDrUretISMERKEZI,$scope.SthGSeri,$scope.SthGSira)
            await InsertOperasyonKapama(TmpDrUretROTAREC,TmpDrUretISEMRI,TmpDrUretKODU,TmpDrUretSAFHANO,TmpDrUretOPERASYONKODU,TmpDrUretISMERKEZI,TmpDrUretMiktar,TmpDrUretSURE,$scope.OpSeri,$scope.OpSira)
            await UpdateRotaPlani(TmpDrUretROTAREC,TmpDrUretMiktar, TmpDrUretSURE)
            await UpdateMalzemePlani(TmpDrUretISEMRI,TmpDrUretKODU, TmpDrUretMiktar, true)
            
            let TuketData = ToGroupBy(TmpDrTuket,'KODU')
            
        for (let i = 0; i < Object.values(TuketData).length; i++) 
        {
            await InsertUrunGirisCikis(1,Object.values(TuketData)[i][0].KODU,Object.values(TuketData)[i][0].ISEMRI,(Object.values(TuketData)[i][0].MIKTAR * TmpDrUret.length),Object.values(TuketData)[i][0].DEPO,Object.values(TuketData)[i][0].DEPO,$scope.SthCSeri,$scope.SthCSira)
            await UpdateMalzemePlani(Object.values(TuketData)[i][0].ISEMRI,Object.values(TuketData)[i][0].KODU, (Object.values(TuketData)[i][0].MIKTAR * TmpDrUret.length), false)
        }        
        if($scope.ToplamPlanMiktar == $scope.ToplamBarkodKontrolMiktar)
        {
           $scope.IsemriKapat()
        }
        let UpdateQuery = 
        {
            db: "{M}." + $scope.Firma,
            query : "Update ISEMIRLERI set is_special1 = '' where is_kod = @is_kod ",
            param : ['is_kod:string|50'],
            value : [$scope.BteIsEmri.txt]
        } 
        await srv.Execute(UpdateQuery)
        swal("İşlem Başarılı!", "Kayıt İşlemi Gerçekleştirildi.",icon="success");
        $scope.JsonKapat()
        $scope.Init()
    }
    $scope.BtnEtiketBas = async function()
    {
        if($scope.BteIsEmri.txt == "")
        {
            swal("Dikkat", "Lütfen İş emri seçmeden geçmeyin.",icon="warning");
            return;
        }
        let EtiketData = 
        {
            "ISEMRI": $scope.BteIsEmri.txt,
            "MIKTAR" :  $scope.KontrolMiktar,
            "BASMIKTAR": $scope.TxtEtiketMiktar,
            "KODU" : $scope.LblUrun,
            "URNBARKOD" : $scope.Barkod2,
            "SPECIAL" : "1"

        }
        await EtiketInsert(EtiketData);
    }
    $scope.BtnTekrarEtiketBas = async function()
    {
        if(typeof(SelectionRow) == "undefined")
        {
            swal("Dikkat", "Lütfen Tablodan Seçim Yapınız.",icon="warning");
            return; 
        }
        else
        {
            console.log(SelectionRow)
            let EtiketData = 
            {
                "ISEMRI": SelectionRow.ISEMRI,
                "MIKTAR" :  SelectionRow.MIKTAR,
                "BASMIKTAR": "1",
                "KODU" : SelectionRow.KODU,
                "URNBARKOD" : SelectionRow.URNBARKOD,
                "SPECIAL" : "2"
    
            }
            await EtiketInsert(EtiketData);
        }

    }
    $scope.TxtBarkodKontrolEvent = function(keyEvent)
    {
        if($scope.BteIsEmri.txt == "")
        {
            swal("Dikkat", "Lütfen İş emri seçmeden geçmeyin.",icon="warning");
            return;
        }
        if(keyEvent.which === 13)
        {
            if($scope.TxtBarkodKontrol == $scope.Barkod2)
            {
                if($scope.ToplamBarkodKontrolMiktar < $scope.ToplamPlanMiktar)
                {
                    if($scope.KutuKontrolMiktar < $scope.Birim3)
                    {
                            $scope.ToplamBarkodKontrolMiktar = $scope.ToplamBarkodKontrolMiktar + $scope.KontrolMiktar
                            $scope.KutuKontrolMiktar = $scope.KutuKontrolMiktar + $scope.KontrolMiktar
                            $scope.TxtBarkodKontrol =""
                    }
                    else
                    {
                        swal("Dikkat", "Toplam Koli İçi Miktarını Geçemezsiniz. Lütfen Ekleyip Devam Edin",icon="warning");
                        return;
                    }
                }
                else
                {
                    swal("Dikkat", "Toplam Plan Miktarını Geçemezsiniz.",icon="warning");
                    return;
                }
               
               
            }
            else
            {
                swal("Dikkat", "Lütfen İş Emrine Bağlı Stok Barkodu Okutunuz...",icon="warning");
                return;
            }
           
        }
    }
    $scope.BtnEkleVeYazdir = async function()
    {

        if($scope.KutuKontrolMiktar != $scope.Birim3)
        {
            swal("Dikkat", "Kutu Miktarını Tamamlamadan Ekleme Yapılamaz.",icon="warning");
            $scope.TxtBarkodKontrol = ""
            return;
        }
        $scope.BtnEkle()
    }
    $scope.IsemriKapat = async function()
    {
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query : "UPDATE ISEMIRLERI SET is_EmriDurumu = 2 WHERE is_kod = @is_kod",
            param : ['is_kod:string|25'],
            value : [$scope.BteIsEmri.txt]
        }
         await srv.Execute(TmpQuery)
        swal("Dikkat", "Is Emri Kapatıldı.",icon="success");
        $scope.Init()
    }
    function MaxLot()
    {
        return new Promise(async resolve => 
        {
            let TmpData = await srv.Execute($scope.Firma,'MaxPartiLot',[$scope.BteParti.txt])
            if(TmpData.length > 0)
            {
                resolve(TmpData[0].LOT);
                return;
            }
            resolve(1);
            return;
        });
    }
    function PartiLotOlustur(pParti,pLot,pStok)
    {
        return new Promise(async resolve => 
        {
            if(await GetPartiLot(pStok,pParti,pLot))
            {
                resolve(true)
                return
            }
            
            let TmpParam =
            [
                1,
                1,
                pParti,
                pLot,
                pStok,
                moment(new Date()).format("DD.MM.YYYY")
            ]
            let TmpResult = await srv.Execute($scope.Firma,'PartiLotInsert',TmpParam);
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
    function GetPartiLot(pStokKodu,pParti,pLot)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT * FROM PARTILOT WHERE pl_stokkodu = @pl_stokkodu AND pl_partikodu = @pl_partikodu AND pl_lotno = @pl_lotno",
                param : ['pl_stokkodu:string|25','pl_partikodu:string|25','pl_lotno:int'],
                value : [pStokKodu,pParti,pLot]
            }
            let TmpData = await srv.Execute(TmpQuery)
            if(TmpData.length > 0)
            {
                resolve(true);
                return;
            }

            resolve(false)
            return;
        });
    }
    function BarkodOlustur(pBarkod,pStokKodu,pParti,pLot)
    {
        return new Promise(async resolve => 
        {
            if(await GetBarkod(pBarkod))
            {
                resolve(true);
                return;
            }

            let TmpParam =
            [
                1,
                1,
                pBarkod,
                pStokKodu,
                pParti,
                pLot,
                5,
                1,
                0,
                3
            ]

            let TmpResult = await srv.Execute($scope.Firma,'BarkodInsert',TmpParam);

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
    function GetBarkod(pBarkod)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT * FROM BARKOD_TANIMLARI WHERE bar_kodu = @bar_kodu",
                param : ['bar_kodu:string|50'],
                value : [pBarkod]
            }
            let TmpData = await srv.Execute(TmpQuery)
            if(TmpData.length > 0)
            {
                $scope.Data.BARKODLIST = TmpData;
                resolve(true);
                return;
            }

            $scope.Data.BARKODLIST = [];
            resolve(false)
            return;
        });
    }
    $scope.BtnSonKoKoli = async function()
    {
        let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT TOP 1 Etkb_Barkodu AS BARKOD FROM ETIKETBAS WHERE Etkb_evrakno_seri = @Etkb_Seri ORDER BY Etkb_create_date desc ",
                param : ['Etkb_Seri:string|50'],
                value : [$scope.SthGSeri]
            }
        let Sonkoli = await srv.Execute(TmpQuery)

        console.log(Sonkoli)

        let UpdateQuery = 
        {
            db: "{M}." + $scope.Firma,
            query : "UPDATE ETIKETBAS SET Etkb_special1 = 2 where Etkb_Barkodu = @bar_kodu ",
            param : ['bar_kodu:string|50'],
            value : [Sonkoli[0].BARKOD]

        }
       await srv.Execute(UpdateQuery)

       swal("Dikkat", "Son Kolinin Etiketi Yazdırıldı.",icon="success");
    }
    ToGroupBy = function(pData,pKey)
    {
        return pData.reduce(function(rv, x) 
        {
            (rv[x[pKey]] = rv[x] || []).push(x);
            return rv;
        }, {});
    }
    $scope.JsonSave = async function()
    { 
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query : "SELECT JSON FROM MikroDB_V16.dbo.TERP_NITROWEB_JSONDATA WHERE DURUM = 0 AND KULLANICI = @KULLANICI AND MENU =@MENU ",
            param : ['KULLANICI:string|50','MENU:string|50'],
            value : [$rootScope.GeneralParamList.Kullanici,$rootScope.PageName]
        }
        let JsonControl = await srv.Execute(TmpQuery)

        if(JsonControl.length > 0)
        {
            let UpdateQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "UPDATE MikroDB_V16.dbo.TERP_NITROWEB_JSONDATA SET JSON = @JSON WHERE DURUM = 0 AND KULLANICI = @KULLANICI AND MENU =@MENU ",
                param : ['JSON:string|max','KULLANICI:string|50','MENU:string|50'],
                value : [JSON.stringify($scope.Data.DATA),$rootScope.GeneralParamList.Kullanici,$rootScope.PageName]

            }
            await srv.Execute(UpdateQuery)
        }
        else
        {
            let InsertData = 
            [
                $rootScope.GeneralParamList.Kullanici,
                $rootScope.PageName,
                JSON.stringify($scope.Data.DATA),
                0,
            ]
            console.log(InsertData)
             await srv.Execute($scope.Firma,'InsertJson',InsertData);
        }
    }
    $scope.SonEvrakGetir = async function()
    {
        console.log($scope.Data.DATA)
        if($scope.Data.DATA.length > 0)
        {
            swal("Dikkat", "Üretim İşleminiz varken Evrakı Çağıramazsınız !",icon="warning");
            return
        }


        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query : "SELECT JSON FROM MikroDB_V16.dbo.TERP_NITROWEB_JSONDATA WHERE DURUM = 0 AND KULLANICI = @KULLANICI AND MENU =@MENU ",
            param : ['KULLANICI:string|50','MENU:string|50'],
            value : [$rootScope.GeneralParamList.Kullanici,$rootScope.PageName]
        }
        let JsonControl = await srv.Execute(TmpQuery)
        if(JsonControl.length == 0 )
        {
            swal("Dikkat", "Kayıt Bulunamadı...",icon="warning");
            return;
        }

        if(JsonControl[0].JSON != '')
        {
            $scope.Data.DATA = JSON.parse(JsonControl[0].JSON)
           $scope.BteIsEmri.txt = $scope.Data.DATA[0].ISEMRI
            for(let i = 0; i < $scope.Data.DATA.length; i++)
            {
                if($scope.Data.DATA[i].TIP == "ÜRETİM")
                {
                    $scope.ToplamBarkodKontrolMiktar = $scope.ToplamBarkodKontrolMiktar + $scope.Data.DATA[i].MIKTAR
                }
            }
            InitGrd($scope.Data.DATA.filter(x => x.URETTUKET == 1))
            {                    
                $scope.Data.UMP = await UretimMalzemePlanGetir($scope.Data.DATA[0].KODU);
                $scope.Data.URP = await UretimRotaPlanGetir($scope.Data.DATA[0].KODU);
               
                let TmpQuery = 
                {
                    db: "{M}." + $scope.Firma,
                    query : "SELECT sto_kod, sto_birim1_ad AS BIRIM1AD,sto_birim1_katsayi AS BIRIM1KATSAYI,sto_birim2_ad AS BIRIM2AD, (sto_birim2_katsayi * -1) AS BIRIM2KATSAYI,sto_birim3_ad AS BIRIM3AD, (sto_birim3_katsayi * -1) AS BIRIM3KATSAYI, " +
                    "ISNULL((SELECT TOP 1 bar_kodu FROM BARKOD_TANIMLARI WHERE bar_stokkodu = sto_kod AND bar_birimpntr = 1 AND bar_partikodu = '' AND bar_lotno = 0),'') AS BARKOD1, " +
                    "ISNULL((SELECT TOP 1 bar_kodu FROM BARKOD_TANIMLARI WHERE bar_stokkodu = sto_kod AND bar_birimpntr = 2 AND bar_partikodu = '' AND bar_lotno = 0),'') AS BARKOD2, " +
                    "ISNULL((SELECT TOP 1 bar_kodu FROM BARKOD_TANIMLARI WHERE bar_stokkodu = sto_kod AND bar_birimpntr = 3 AND bar_partikodu = '' AND bar_lotno = 0),'') AS BARKOD3 " +
                    "FROM STOKLAR WHERE sto_kod = @sto_kod ",
                    param : ['sto_kod:string|50'],
                    value : [$scope.Data.DATA[0].KODU]
                } 
                let TmpData = await srv.Execute(TmpQuery)
                $scope.Barkod1 = TmpData[0].BARKOD1;
                $scope.Barkod2 = TmpData[0].BARKOD2;
                $scope.Barkod3 = TmpData[0].BARKOD3;
                if($scope.Barkod1 == '' || $scope.Barkod2 == '' || $scope.Barkod3 == '')
                {
                    swal("Dikkat", "Ürün Barkodlarında Eksik Mevcut Lütfen Kontrol Ediniz .",icon="warning");
                }
                $scope.KontrolMiktar = TmpData[0].BIRIM2KATSAYI;
                $scope.Birim3 = TmpData[0].BIRIM3KATSAYI;
                let TmpQuery2 = 
                {
                    db: "{M}." + $scope.Firma,
                    query : "SELECT (upl_miktar - ISNULL((SELECT TOP 1 ish_uret_miktar FROM ISEMRI_MALZEME_DURUMLARI WHERE ish_isemri = upl_isemri and ish_plan_sevkmiktar = 0),0)) AS PLANMIKTAR FROM URETIM_MALZEME_PLANLAMA WHERE upl_isemri = @upl_isemri ",
                    param : ['upl_isemri:string|50'],
                    value : [$scope.Data.DATA[0].ISEMRI]
                } 
                let TmpData2 = await srv.Execute(TmpQuery2)
                $scope.ToplamPlanMiktar = TmpData2[0].PLANMIKTAR;

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
        else
        {
            swal("Dikkat", "Kayıt Bulunamadı...",icon="warning");
            return;
        }
    }
    $scope.YeniEvrak = async function()
    {
        if($scope.Data.DATA.length > 0)
        {
            swal("Dikkat", "Eklenmiş Ürünleri Kaydetmeden Yeni Evraka Geçilemez !",icon="warning");
        }
        else
        {
            let UpdateQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "Update ISEMIRLERI set is_special1 = '' where is_kod = @is_kod ",
                param : ['is_kod:string|50'],
                value : [$scope.BteIsEmri.txt]
            } 
        await srv.Execute(UpdateQuery)
            $scope.Init()
        }
    }
    $scope.JsonKapat= async function()
    {
            let UpdateQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "UPDATE MikroDB_V16.dbo.TERP_NITROWEB_JSONDATA SET DURUM = 1 WHERE DURUM = 0 AND KULLANICI = @KULLANICI AND MENU =@MENU ",
                param : ['KULLANICI:string|50','MENU:string|50'],
                value : [$rootScope.GeneralParamList.Kullanici,$rootScope.PageName]

            }
            await srv.Execute(UpdateQuery)
    }
    $scope.BtnIsEmriDetay = async function()
    {
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query : "SELECT  upl_miktar - ISNULL((SELECT TOP 1 ish_uret_miktar FROM ISEMRI_MALZEME_DURUMLARI WHERE ish_isemri = upl_isemri and ish_plan_sevkmiktar = 0),0) AS PLANMIKTAR ," +
            " upl_miktar AS ToplamMiktar, (SELECT TOP 1 ish_uret_miktar FROM ISEMRI_MALZEME_DURUMLARI WHERE ish_isemri = upl_isemri and ish_plan_sevkmiktar = 0) AS URETILEN  FROM URETIM_MALZEME_PLANLAMA" + 
            " WHERE upl_isemri = @upl_isemri AND upl_uretim_tuket = 1", 
            param : ['upl_isemri:string|50'],
            value : [$scope.BteIsEmri.txt]
        }
        let Detay = await srv.Execute(TmpQuery)
        if(Detay.length > 0)
        {
            swal("İş Emri Detayı", "Planlanan Miktar : " + Detay[0].ToplamMiktar +" \n Önceden Tamamlanmış Miktar "+ Detay[0].URETILEN + " \n Kalan Miktar : "+ Detay[0].PLANMIKTAR + " \n Koli İçi Kapasite " + $scope.Birim3 +   "  \n Kutu İçi Kapasite " + $scope.KontrolMiktar +  " ",icon="");
        }
        else
        {
            swal("Dikkat", "Detay Bukunamadı  .",icon="warning");
        }

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
        $scope.SeriBarkod = $scope.BteParti.txt.padStart(8, "0")   + AutoStr
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
            $scope.SeriBarkodOlustur()
         }
    }
}