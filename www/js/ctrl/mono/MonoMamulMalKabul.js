function MonoMamulMalKabul($scope,srv)
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
                        dataField: "PARTIBARKOD",
                        width: 150
                    }, 
                    {
                        dataField: "URETREC",
                        width: 100
                    }, 
                    {
                        dataField: "PARTI",
                        width: 100
                    }, 
                    {
                        dataField: "LOT",
                        width: 75
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
                if($scope.BteIsEmri.txt == "")
                {
                    swal("Dikkat", "Lütfen İş Emri Seçiniz",icon="warning");
                    pCallback(false)
                }
                else
                {
                    pCallback(true)
                }
            }
        }     
        $scope.CmbEtiketTasarim = 
        {
            datasource : 
            {
                data : $scope.Param.Mono.MamulMalKabulEtiket
            },
            key : "special",
            value : "name",
            defaultVal : "1",
            selectionMode : "key",
            return : "1",
            onSelected : function(pSelected)
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
                $scope.Param.MikroId,
                $scope.Param.MikroId,
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
                $scope.Param.MikroId,
                $scope.Param.MikroId,
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
    function Ekle(pBarkod,pParti,pLot)
    {
        let TmpDr = $scope.Data.DATA.filter(x => x.PARTIBARKOD == pBarkod);
        if(TmpDr.length > 0)
        {
            swal("Dikkat", "Barkod daha önce eklenmiş !",icon="warning");
            return;
        }

        let TmpDrUret = $scope.Data.UMP.filter(x => x.URETTUKET == 1);
        let TmpUretRec = 0;
        let TmpDrRota = [];
        
        if(TmpDrUret.length > 0)
        {
            TmpDrRota = $scope.Data.URP.filter(x => x.URUNKODU == TmpDrUret[0].KODU);
        }

        for(let i = 0;i < $scope.Data.UMP.length;i++)
        {
            let TmpRec = 0;
            if($scope.Data.DATA.length > 0)
            {
                TmpRec = srv.Max($scope.Data.DATA,'REC');
            }

            let TmpData = {};
            TmpData.REC = TmpRec + 1;
            TmpData.TARIH = moment(new Date()).format("DD.MM.YYYY");
            TmpData.TIP = $scope.Data.UMP[i].TIP;
            TmpData.URETTUKET = $scope.Data.UMP[i].URETTUKET;
            TmpData.PARTIBARKOD = pBarkod;
            TmpData.URNBARKOD = $scope.Data.UMP[i].BARKOD;
            TmpData.ADITR = $scope.Data.UMP[i].ADITR;
            TmpData.ADIENG = $scope.Data.UMP[i].ADIENG;
            TmpData.ADIRU = $scope.Data.UMP[i].ADIRU;
            TmpData.ADIRO = $scope.Data.UMP[i].ADIRO;
            TmpData.DESI = $scope.Data.UMP[i].DESI;
            TmpData.AGIRLIK = $scope.Data.UMP[i].AGIRLIK;
            TmpData.ISEMRI = $scope.Data.UMP[i].ISEMRI;
            TmpData.KODU = $scope.Data.UMP[i].KODU;
            TmpData.ADI = $scope.Data.UMP[i].ADI;

            if($scope.Param.Mono.MamulMalKabulDepo != "")
                TmpData.DEPO = $scope.Param.Mono.MamulMalKabulDepo;
            else
                TmpData.DEPO = $scope.Data.UMP[i].DEPO;

            if(TmpData.URETTUKET == 1)
            {
                TmpData.MIKTAR = $scope.Data.UMP[i].BMIKTAR * $scope.Data.UMP[i].KATSAYI;
            }
            else
            {
                TmpData.MIKTAR = $scope.Data.UMP[i].BMIKTAR * (TmpDrUret[0].BMIKTAR * TmpDrUret[0].KATSAYI)
            }
            
            TmpData.DEPOMIKTAR = $scope.Data.UMP[i].DEPOMIKTAR;
            TmpData.PARTI = pParti;
            TmpData.LOT = pLot;

            if($scope.Data.UMP[i].URETTUKET == 1)
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
        InitGrd($scope.Data.DATA.filter(x => x.URETTUKET == 1))
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
                pDr.PARTI, 
                pDr.LOT,
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
                $scope.Param.MikroId,
                $scope.Param.MikroId,
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
    function DeletePartiLotVeBarkod(pParti,pLot,pBarkod,pStokKodu)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "DELETE FROM PARTILOT WHERE pl_partikodu = @pl_partikodu AND pl_lotno = @pl_lotno AND pl_stokkodu = @stokkodu " + 
                        "DELETE FROM BARKOD_TANIMLARI WHERE bar_kodu = @bar_kodu AND bar_stokkodu = @stokkodu",
                param : ['pl_partikodu:string|50','pl_lotno:int','bar_kodu:string|50','stokkodu:string|50'],
                value : [pParti,pLot,pBarkod,pStokKodu]
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
    async function EtiketInsert(pBarkod)
    {
        let TmpDr = $scope.Data.DATA.filter(x => x.URETTUKET == 1)

        let InsertData = 
        [
            1,                               //CREATE_USER
            1,                               //LASTUP_USER
            $scope.CmbEtiketTasarim.return,  //SPECIAL1
            $scope.EtkSeri,                  //SERI
            $scope.EtkSira,                  //SIRA
            '',                              //AÇIKLAMA
            '',                              //BELGENO
            0,                               //ETİKETTİP
            0,                               //BASİMTİPİ
            TmpDr[0].MIKTAR,      //BASİMADET
            1,                               //DEPONO
            TmpDr[0].KODU,        //STOKKODU
            1,                               //RENKKODU
            1,                               //BEDENKODU
            pBarkod,                         //BARKOD
            1                                //BASILACAKMIKTAR
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
    $scope.Init = async function()
    {        
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $scope.Data = {};
        $scope.Data.UMP = [];
        $scope.Data.URP = [];
        $scope.Data.DATA = [];
        $scope.Data.BARKODLIST = [];

        $scope.LblUrun = "";
        $scope.TxtBarkod = "";
        $scope.TxtMiktar = 0;
        
        $scope.SthGSeri = $scope.Param.Mono.UrunGirisSeri;
        $scope.SthCSeri = $scope.Param.Mono.UrunCikisSeri;
        $scope.OpSeri = $scope.Param.Mono.OperasyonSeri;
        $scope.EtkSeri = $scope.Param.Mono.MamulEtiketSeri;

        $scope.SthGSira = await MaxSthSira($scope.SthGSeri,12)
        $scope.SthCSira = await MaxSthSira($scope.SthCSeri,0)
        $scope.OpSira = await MaxOpSira($scope.OpSeri)
        $scope.EtkSira = (await srv.Execute($scope.Firma,'MaxEtiketSira',[$scope.EtkSeri]))[0].MAXEVRSIRA

        InitObj();
        InitGrd([]);
    }
    $scope.BtnBarkodBas = async function()
    {
        let TmpBarkod = "";

        if($scope.BteIsEmri.txt == "" || $scope.BteParti.txt == "")
        {
            swal("Dikkat", "Lütfen İş emri ve parti kodu seçmeden geçmeyin.",icon="warning");
            return;
        }
        if(MiktarKontrol())
        {
            swal("Dikkat", "Lütfen başka bir iş emri seçiniz.",icon="warning");
            return;
        }

        let TmpLot = await MaxLot();

        if(await PartiLotOlustur($scope.BteParti.txt,TmpLot,$scope.LblUrun))
        {
            TmpBarkod = $scope.BteParti.txt.padStart(8, "0") + TmpLot.toString().padStart(4, "0")
            if(await BarkodOlustur(TmpBarkod,$scope.LblUrun,$scope.BteParti.txt,TmpLot))
            {
                Ekle(TmpBarkod,$scope.BteParti.txt,TmpLot);
                await EtiketInsert(TmpBarkod);
            }
        }
    }
    $scope.BtnKaydet = async function()
    {
        let TmpDrTuket = $scope.Data.DATA.filter(x => x.URETTUKET == 0)
        let TmpDrUret = $scope.Data.DATA.filter(x => x.URETTUKET == 1)

        if($scope.Data.DATA.length == 0)
        {
            swal("Dikkat", "Kayıt Girilmeden Bu İşlemi Yapamazsınız !",icon="warning");
            return;
        }
        //* DEPO MİKTAR KONTROL */        
        for(let i = 0;i < TmpDrTuket.length;i++)
        {
            if(srv.SumColumn($scope.Data.DATA,"MIKTAR","KODU = " + TmpDrTuket[i].KODU) > TmpDrTuket[i].DEPOMIKTAR)
            {
                swal("Dikkat", "Depo miktarı eksiye düşemez ! (" + TmpDrTuket[i].KODU + " - " + TmpDrTuket[i].DEPOMIKTAR + " - " + srv.SumColumn($scope.Data.DATA,"MIKTAR","KODU = " + TmpDrTuket[i].KODU) + ")",icon="warning");
                return;
            }
        }
        //************************/
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
    }
    $scope.BtnSatirSil = async function()
    {
        let TmpDr = $scope.Data.DATA.filter(x => x.PARTIBARKOD == SelectionRow.PARTIBARKOD)
        for(let i = 0;i < TmpDr.length;i++)
        {
            if(await DeletePartiLotVeBarkod(TmpDr[i].PARTI,TmpDr[i].LOT,TmpDr[i].PARTIBARKOD,TmpDr[i].KODU))
            {
                $scope.Data.DATA = $scope.Data.DATA.filter(x => x.REC !== TmpDr[i].REC)
            }
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
    $scope.TxtBarkodPress = async function(keyEvent)
    {    
        if($scope.TxtBarkod != "")
        {
            if(keyEvent.which === 13)
            {   
                if(await GetBarkod($scope.TxtBarkod))
                {
                    if($scope.Data.BARKODLIST[0].bar_stokkodu == $scope.LblUrun)
                    {
                        $scope.BtnBarkodBas();
                    }
                    else
                    {
                        swal("Dikkat", "Geçersiz stok",icon="warning");
                    }
                }
                else
                {
                    swal("Dikkat", "Geçersiz stok",icon="warning");
                }
            }
        }
    }
}