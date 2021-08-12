function MonoFasonGiris($scope,srv, $rootScope)
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
                        "FROM ISEMIRLERI WHERE is_EmriDurumu = 1 AND is_Kod LIKE '%F%' "
            },
            selection : "KODU",
            columns :
            [
                {
                    dataField: "KODU",
                    width: 200
                }, 
                {
                    dataField: "ADI",
                    width: 200
                },
                {
                    dataField: "STOKADI",
                    width: 500
                },
                {
                    dataField: "STOKKODU",
                    width: 500
                },
                {
                    dataField: "BARKOD",
                    width: 200
                }, 
            ],
            onSelected : async function(pData)
            {
                $scope.Data.UMP = await UretimMalzemePlanGetir(pData.KODU);
                    
                if($scope.Data.UMP.length > 0)
                {
                    let TmpDr = $scope.Data.UMP.filter(x => x.URETTUKET == 1);
                    if(TmpDr.length > 0)
                    {
                        $scope.LblDepo = TmpDr[0].DEPOADI
                        $scope.LblUrun = TmpDr[0].KODU
                    }
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
        $scope.BteFasoncu = 
        {
            title : "Fasoncu Seçim",
            txt : "",
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT " +
                        "cari_kod AS KODU,cari_unvan1 AS ADI " +
                        "FROM CARI_HESAPLAR"
            },
            selection : "KODU",
            columns :
            [
                {
                    dataField: "KODU",
                    width: 200
                }, 
                {
                    dataField: "ADI",
                    width: 500
                }, 
            ],
            onSelected : async function(pData)
            {
                if(typeof pData != 'undefined')
                {                    
                    
                }
            }
        }
        $scope.BteParti = 
        {
            title : "Parti Seçim",
            txt : moment(new Date()).format("YYYYMMGG"),
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT pl_partikodu AS PARTI, pl_lotno AS LOT FROM PARTILOT"
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
                data :  [{name: "Fason Giris Etiket - 1", special: $rootScope.GeneralParamList.FasonGirisEtiket}] 
            },
            key : "special",
            value : "name",
            defaultVal : $rootScope.GeneralParamList.FasonGirisEtiket,
            selectionMode : "key",
            return : $rootScope.GeneralParamList.FasonGirisEtiket,
            onSelected : function(pSelected)
            {
                $scope.CmbEtiketTasarim.return = pSelected
            }
        } 
        $scope.BtnEkle =
        {
            title: "Ekle",
            onSelected: async function (pData) 
            {
                if (typeof pData != 'undefined') 
                {
                    $scope.Ekle(pData);
                }
            }
        }
    }
    function Scale()
    {
        console.log($rootScope.GeneralParamList.BasarSayarHasasTeraziPORT)
        srv.Scale.Start($rootScope.GeneralParamList.BasarSayarHasasTeraziPORT,pData =>
        {
            console.log(pData)
            $scope.LblHassasGram = pData
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
            $scope.LblKantarKilo =  $scope.LblKantarKilo - $scope.LblKasaDara;
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
    function Ekle(pBarkod,pParti,pLot,pMiktar)
    {
        let TmpUretRec = 0;

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

            if($scope.Data.UMP[i].URETTUKET == 1)
            {
                TmpData.DEPO = $rootScope.GeneralParamList.FasonDepo;                
            }
            else
            {
                TmpData.DEPO = $scope.Data.UMP[i].DEPO;
            }
            
            TmpData.MIKTAR = $scope.Data.UMP[i].BMIKTAR * pMiktar;
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

            $scope.Data.DATA.push(TmpData);
        }
        
        InitGrd($scope.Data.DATA.filter(x => x.URETTUKET == 1))
    }
     $scope.Ekle = async function(pMiktar)
    {

        if(typeof pMiktar == 'undefined')
        {
            pMiktar = $scope.LblKantarMiktar
        }
        let TmpBarkod = "";
        if($scope.BteIsEmri.txt == "" || document.getElementById("Tarih").value == "" || $scope.BteFasoncu.txt == "")
        {
            swal("Dikkat", "Lütfen İş emri,fasoncu ve tarih seçmeden geçmeyin.",icon="warning");
            return;
        }
        if(MiktarKontrol())
        {
            swal("Dikkat", "Lütfen başka bir iş emri seçiniz.",icon="warning");
            return;
        }
        if($scope.Data.UMP.filter(x => x.URETTUKET == 1)[0].BARKOD.substring(0,2) == "27")
        {
            $scope.EtiketMiktar = pMiktar.padStart(5, '0');
            TmpBarkod = $scope.Data.UMP.filter(x => x.URETTUKET == 1)[0].BARKOD + $scope.EtiketMiktar;
        }
        else
        {
                            
            swal("Dikkat", "Lütfen tartım barkodu giriniz.",icon="warning");
            return;
        }
   
        Ekle(TmpBarkod,'',0,$scope.EtiketMiktar);
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
                        "ISNULL((SELECT sto_birim3_katsayi * -1 FROM STOKLAR WHERE sto_kod = upl_kodu),1) AS KATSAYI, " +
                        "upl_isemri AS ISEMRI, " +
                        "CASE WHEN upl_uretim_tuket = 1 THEN 'ÜRETİM' ELSE 'TÜKETİM' END AS TIP, " +
                        "upl_uretim_tuket AS URETTUKET, " +
                        "upl_depno AS DEPO, " +
                        "ISNULL((SELECT TOP 1 dep_adi FROM DEPOLAR WHERE dep_no = upl_depno),'') AS DEPOADI, " +
                        "dbo.fn_DepodakiMiktar(upl_kodu,upl_depno,GETDATE()) AS DEPOMIKTAR, " +
                        "upl_miktar AS PMIKTAR, " +
                        "upl_miktar / ISNULL((SELECT TOP 1 upl_miktar FROM URETIM_MALZEME_PLANLAMA AS UMP2 WHERE UMP2.upl_isemri = UMP1.upl_isemri AND UMP2.upl_uretim_tuket = 1 ORDER BY upl_satirno ASC),0) AS BMIKTAR " +
                        "FROM URETIM_MALZEME_PLANLAMA AS UMP1 WHERE upl_isemri = @upl_isemri",
                param : ['upl_isemri:string|50'],
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
                moment(document.getElementById("Tarih").value).format("DD.MM.YYYY"),
                TmpTip,
                8,
                0,
                TmpEvrTip,
                pSeri,
                pSira,
                $scope.TxtEvrakno, //BELGE NO
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
    async function EtiketInsert(pSira,pBarkod)
    {
        let InsertData = 
        [
            1,                               //CREATE_USER
            1,                               //LASTUP_USER
            $scope.CmbEtiketTasarim.return,     //SPECIAL1
            $rootScope.GeneralParamList.FasonEtiketSeri,//SERI
            pSira,                          //SIRA
            '',                              //AÇIKLAMA
            '',                              //BELGENO
            0,                               //ETİKETTİP
            0,                               //BASİMTİPİ
            $scope.EtiketMiktar,             //BASİMADET
            1,                               //DEPONO
            $scope.LblUrun,                  //STOKKODU
            1,                               //RENKKODU
            1,                               //BEDENKODU
            pBarkod,                         //BARKOD
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
    async function MaxEtiketSira(pSeri)
    {
        return new Promise(async resolve => 
        {
            resolve((await srv.Execute($scope.Firma,'MaxEtiketSira',[pSeri]))[0].MAXEVRSIRA)
        })
    }
    $scope.Init = async function()
    {        
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "FASON GİRİŞ"

        $scope.Data = {};
        $scope.Data.UMP = [];
        $scope.Data.URP = [];
        $scope.Data.DATA = [];
        $scope.Data.BARKODLIST = [];
        document.getElementById("Tarih").value = "";

        $scope.LblDepo = "";
        $scope.LblUrun = "";
        $scope.TxtBasimAdet = 1;
        $scope.EtiketMiktar = 0;
        $scope.TxtEvrakno = "";

        $scope.LblKasaDara = 0;
        $scope.TxtSpRefMiktar = 0;
        $scope.LblHassasGram = 0;
        $scope.LblKantarKilo = 0;
        $scope.LblKantarMiktar = 0;
        $scope.DataKantarKilo = 50;
        $scope.DataHassasTeraziGram = 0;
        $scope.ManuelGirisHide = $rootScope.GeneralParamList.YariMamulManuelGiris;

        $scope.SthGSeri = $rootScope.GeneralParamList.FasonGirisSeri;
        $scope.SthCSeri = $rootScope.GeneralParamList.FasonCikisSeri;

        $scope.SthGSira = await MaxSthSira($scope.SthGSeri,12)
        $scope.SthCSira = await MaxSthSira($scope.SthCSeri,0)

        if($rootScope.GeneralParamList.MonoFasonGiris != "true")
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
        Scale()
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
    $scope.BtnTartimOnayla = async function()
    {
        $scope.DataHassasTeraziGram = $scope.LblHassasGram;
        $scope.DataKantarKilo = parseInt($scope.LblKantarKilo);
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
       $scope.LblKantarMiktar =  parseInt((($scope.TxtSpRefMiktar / ($scope.DataHassasTeraziGram / 1000)) * $scope.DataKantarKilo).toFixed(2));
      
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
        // for(let i = 0;i < TmpDrTuket.length;i++)
        // {
        //     if(srv.SumColumn($scope.Data.DATA,"MIKTAR","KODU = " + TmpDrTuket[i].KODU) > TmpDrTuket[i].DEPOMIKTAR)
        //     {
        //         swal("Dikkat", "Depo miktarı eksiye düşemez ! (" + TmpDrTuket[i].KODU + " - " + TmpDrTuket[i].DEPOMIKTAR + " - " + srv.SumColumn($scope.Data.DATA,"MIKTAR","KODU = " + TmpDrTuket[i].KODU) + ")",icon="warning");
        //         return;
        //     }
        // }
        //************************/
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

        swal("İşlem Başarılı!", "Kayıt İşlemi Gerçekleştirildi.",icon="success");
    }
    $scope.BtnBarkodBas = async function()
    {
        if($scope.LblUrun != '')
        {
            let TmpSira = await MaxEtiketSira($rootScope.GeneralParamList.FasonEtiketSeri)
            console.log($rootScope.GeneralParamList.FasonEtiketSeri)
            console.log(TmpSira)
            await EtiketInsert(TmpSira,$scope.Data.DATA[0].PARTIBARKOD);
        }
        else
        {
            swal("Hatalı İşlem!", "Lütfen Stok Seçimi Yapınız",icon="error");
        }
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
}