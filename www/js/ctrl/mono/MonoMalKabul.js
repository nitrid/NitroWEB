function MonoMalKabul($scope,srv, $rootScope)
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
            title : "Stok Seçimi",
            txt : "",
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT sto_kod AS KODU, sto_isim AS ADI, sto_birim1_ad AS BIRIM FROM STOKLAR"
            },
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
                    dataField: "BIRIM",
                    width: 100
                }, 
            ],
            onSelected : async function(pData)
            {
                if(typeof pData != 'undefined')
                {
                    $scope.BteIsEmri.txt = pData.KODU
                    $scope.LblBarkod = pData.BARKOD;
                    $scope.LblStokKodu = pData.KODU;
                    $scope.LblStokAdi = pData.ADI;
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
            title : "SIPARIS Seçim",
            txt : "",
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "select sip_evrakno_seri AS SERI , sip_evrakno_sira AS SIRA , sip_musteri_kod AS CARI, " +
                        "(SELECT cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod = sip_musteri_kod) AS CARIADI  " +
                        "from SIPARISLER WHERE sip_tip = 1 and sip_kapat_fl = 0 " +
                        "GROUP BY sip_evrakno_seri,sip_evrakno_sira,sip_musteri_kod " +
                        "HAVING SUM(sip_miktar) > SUM(sip_teslim_miktar) ",
            },
            showBorders: true,
            filtering: true,
            selection : "CARIADI",
            columns :
            [
                {
                    dataField: "SERI",
                    width: 200
                }, 
                {
                    dataField: "SIRA",
                    width: 200
                }, 
                {
                    dataField: "CARIADI",
                    width: 400
                }, 
                {
                    dataField: "CARI",
                    width: 200
                }, 
            ],
            masterDetail: 
            {
                enabled: true,
                template: async function(container, options) 
                {
                    let Detail = await DetayGetir(options.data)

                $("<div>")
                    .addClass("master-detail-caption")
                    .appendTo(container);

                $("<div>")
                    .dxDataGrid({
                        columnAutoWidth: false,
                        showBorders: true,
                        dataSource: Detail,
                        filtering: true,
                        filterRow: 
                        {
                            visible: true,
                            applyFilter: "auto"
                        },
                        headerFilter: 
                        {
                            visible: true
                        },
                        columns: 
                        [ 
                            {
                                dataField : "KODU",
                                caption: "KODU",
                                dataType: "text",
                                align: "center",
                            },
                            {
                                dataField : "ADI",
                                caption: "ADI",
                                dataType: "text",
                                align: "center",
                            }, 
                            {
                                dataField : "MIKTAR",
                                caption: "MIKTAR",
                                dataType: "text",
                                align: "center",
                            },                           
                        ],
                        
                    }).appendTo(container);
                }
            },
            onSelected : async function(pData)
            {
                if(typeof pData != 'undefined')
                {                    
                    $scope.CariKodu = pData.CARI
                    $scope.CariAdı = pData.CARIADI;
                    $scope.SipSeri = pData.SERI
                    $scope.SipSira = pData.SIRA
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
                data :  [{name: "Mal Giris Etiket - 1", special: $rootScope.GeneralParamList.FasonGirisEtiket}] 
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
            title: "Manuel Ekle",
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
        srv.Scale.Start($rootScope.GeneralParamList.BasarSayarHasasTeraziPORT,pData =>
        {
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
           // $scope.LblKantarKilo =  $scope.LblKantarKilo - $scope.LblKasaDara;
        }
    }
    async function DetayGetir(pData)
    {
        return new Promise(async resolve => 
            {
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query :"SELECT sip_stok_kod AS KODU, (SELECT sto_isim FROM STOKLAR WHERE sto_kod = sip_stok_kod) AS ADI,sip_miktar AS MIKTAR FROM SIPARISLER WHERE sip_evrakno_seri = @sip_evrakno_seri and sip_evrakno_sira = @sip_evrakno_sira and sip_tip = 1 ",
            param : ['sip_evrakno_seri:string|50','sip_evrakno_sira:string|50'],
            value : [pData.SERI,pData.SIRA]
        }
        let TmpData = await srv.Execute(TmpQuery)
        resolve(TmpData)
        });
        
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
    async function Ekle(pBarkod,pParti,pLot,pMiktar)
    {
        let TmpUretRec = 0;

        
            let TmpRec = 0;
            if($scope.Data.DATA.length > 0)
            {
                TmpRec = srv.Max($scope.Data.DATA,'REC');
            }
           
                await $scope.SeriBarkodOlustur()
            

                let TmpInsertData =
                [
                    $scope.SthGSeri,
                    $scope.SthGSira,
                    $scope.SeriBarkod,
                    $scope.LblStokKodu,
                    $scope.EtiketMiktar
                ]
               
                let TmpResult = await srv.Execute($scope.Firma,'SeriNoInsert',TmpInsertData);
                console.log(TmpResult)  
                
            let TmpData = {};
            TmpData.REC = TmpRec + 1;
            TmpData.TARIH = moment(new Date()).format("DD.MM.YYYY");
            TmpData.TIP = 1;
            TmpData.URETTUKET = 1;
            TmpData.PARTIBARKOD = $scope.SeriBarkod;
            TmpData.URNBARKOD = $scope.SeriBarkod;
            TmpData.ADITR = ''
            TmpData.ADIENG =''
            TmpData.ADIRU = ''
            TmpData.ADIRO = ''
            TmpData.DESI = ''
            TmpData.AGIRLIK = ''
            TmpData.ISEMRI = ''
            TmpData.KODU =$scope.LblStokKodu;
            TmpData.ADI = $scope.LblStokAdi;

            // if($scope.Data.UMP[i].URETTUKET == 1)
            // {
            //     TmpData.DEPO = $rootScope.GeneralParamList.FasonDepo;                
            // }
            // else
            // {
                TmpData.DEPO = $rootScope.GeneralParamList.FasonDepo;
            //}
            
            TmpData.MIKTAR = $scope.EtiketMiktar
           
            TmpData.PARTI = pParti;
            TmpData.LOT = pLot;
            
            $scope.Data.DATA.push(TmpData);
        
        
        InitGrd($scope.Data.DATA)
    }
   
     $scope.Ekle = async function(pMiktar)
    {

        if(typeof pMiktar == 'undefined')
        {
            pMiktar = $scope.LblKantarMiktar
        }
        let TmpBarkod = "";
        if( document.getElementById("Tarih").value == "" || $scope.BteFasoncu.txt == "")
        {
            swal("Dikkat", "Lütfen Cari ve tarih seçmeden geçmeyin.",icon="warning");
            return;
        }
        $scope.EtiketMiktar = pMiktar.toString().padStart(5, '0');
        // if(MiktarKontrol($scope.EtiketMiktar))
        // {
        //     swal("Dikkat", "Lütfen başka bir iş emri seçiniz.",icon="warning");
        //     return;
        // }

        
        // if($scope.Data.UMP.filter(x => x.URETTUKET == 1)[0].BARKOD.substring(0,2) == "27")
        // {
        //     
        //     TmpBarkod = $scope.Data.UMP.filter(x => x.URETTUKET == 1)[0].BARKOD + $scope.EtiketMiktar;
        // }
        // else
        // {
                            
        //     swal("Dikkat", "Lütfen tartım barkodu giriniz.",icon="warning");
        //     return;
        // }
   
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
    async function InsertUrunGirisCikis(TmpKodu,TmpIsemrı,TmpMiktar,TmpDepo,TmpParti,TmpLot,TmpIsmerkezi,pSeri,pSira)
    {
        let TmpSipQuery = 
        {
            db: "{M}." + $scope.Firma,
            query : "SELECT sip_Guid FROM  SIPARISLER WHERE sip_evrakno_seri = @sip_evrakno_seri AND sip_evrakno_sira = @sip_evrakno_sira and sip_stok_kod = @sip_stok_kod and sip_tip = 1  ",
            param : ['sip_evrakno_seri:string|25','sip_evrakno_sira:int','sip_stok_kod:string|50'],
            value : [$scope.SipSeri,$scope.SipSira,TmpKodu]
        }
        let TmpResults = await srv.Execute(TmpSipQuery)
        if(TmpResults.length > 0)
        {
            $scope.SipGuid = TmpResults[0].sip_Guid
        }
        else
        {
            $scope.SipGuid ='00000000-0000-0000-0000-000000000000'
        }
        
        return new Promise(async resolve => 
        {
            let TmpInsertData = 
            [
                $rootScope.GeneralParamList.MikroId,
                $rootScope.GeneralParamList.MikroId,
                0, //FİRMA NO
                0, //ŞUBE NO
                moment(document.getElementById("Tarih").value).format("DD.MM.YYYY"),
                0,
                0,
                0,
                13,
                pSeri,
                pSira,
                $scope.TxtEvrakno, //BELGE NO
                moment(new Date()).format("DD.MM.YYYY"),
                TmpKodu,
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
                $scope.CariKodu, //CARI KODU,
                TmpIsemrı, //İŞEMRİKODU
                "", //PERSONEL KODU
                0, //HARDOVİZCİNSİ
                1, //HARDOVİZKURU
                1, //ALTDOVİZKURU
                0, //STOKDOVİZCİNSİ
                1, //STOKDOVİZKURU
                TmpMiktar,
                TmpMiktar,
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
                $scope.SipGuid, //sth_sip_uid
                '00000000-0000-0000-0000-000000000000', //sth_fat_uid,
                TmpDepo, //GİRİSDEPONO
                TmpDepo, //CİKİSDEPONO
                moment(new Date()).format("DD.MM.YYYY"), //MALKABULSEVKTARİHİ
                '', // CARİSORUMLULUKMERKEZİ
                '', // STOKSORUMLULUKMERKEZİ
                0,  // VERGİSİZFL
                1,  // ADRESNO
                TmpParti, 
                TmpLot,
                '', // PROJE KODU
                '', // EXİMKODU
                0, // DİSTİCARETTURU
                0, // OTVVERGİSİZFL
                0, // OİVVERGİSİZ
                0, //FIYAT LISTE NO
                0, //NAKLİYEDEPO
                0, // NAKLİYEDURUMU
                (typeof TmpIsmerkezi == 'undefined') ? '' : TmpIsmerkezi
            ];
            
            console.log(TmpInsertData)
            let TmpResult = await srv.Execute($scope.Firma,'StokHarInsert',TmpInsertData);

            console.log(TmpResult)
            if(typeof TmpResult != 'undefined')
            {
                if($scope.SipGuid != '00000000-0000-0000-0000-000000000000')
                {
                    let TmpSipQuery = 
                    {
                        db: "{M}." + $scope.Firma,
                        query : "UPDATE SIPARISLER SET sip_teslim_miktar = sip_teslim_miktar + @MIKTAR WHERE sip_Guid = @sip_Guid  ",
                        param : ['MIKTAR:float','sip_Guid:string|50'],
                        value : [TmpMiktar,$scope.SipGuid]
                    }
                    console.log(TmpSipQuery)
                    let TmpResults = await srv.Execute(TmpSipQuery)
                    console.log(TmpResults)
                }
                
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
            1,     //SPECIAL1
            $rootScope.GeneralParamList.FasonEtiketSeri,//SERI
            pSira,                          //SIRA
            $scope.LblKasaDara,                              //AÇIKLAMA
            $scope.DataKantarKilo,                              //BELGENO
            0,                               //ETİKETTİP
            0,                               //BASİMTİPİ
            (SelectionRow.MIKTAR <= 32000 ? SelectionRow.MIKTAR : 32000),             //BASİMADET
            $scope.DepoKod,                               //DEPONO
            SelectionRow.KODU,                  //STOKKODU
            SelectionRow.MIKTAR,                               //RENKKODU
            1,                               //BEDENKODU
            SelectionRow.PARTIBARKOD,                         //BARKOD
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
        $rootScope.PageName = "MAL KABUL"

        $scope.Data = {};
        $scope.Data.UMP = [];
        $scope.Data.URP = [];
        $scope.Data.DATA = [];
        $scope.Data.BARKODLIST = [];
        document.getElementById("Tarih").value = "";

        $scope.LblDepo = "Merkez Depo";
        $scope.LblUrun = "";
        $scope.TxtBasimAdet = 1;
        $scope.EtiketMiktar = 0;
        $scope.TxtEvrakno = "";
        $scope.LblBarkod = '';
        $scope.LblStokKodu = '';
        $scope.LblStokAdi = '';

        $scope.LblKasaDara = 0;
        $scope.TxtSpRefMiktar = 0;
        $scope.Miktar = 0;
        $scope.LblHassasGram = 0;
        $scope.LblKantarKilo = 0;
        $scope.LblKantarMiktar = 0;
        $scope.DataKantarKilo = 50;
        $scope.DataHassasTeraziGram = 0;
        $scope.ManuelGirisHide = $rootScope.GeneralParamList.YariMamulManuelGiris;

        $scope.SthGSeri = $rootScope.GeneralParamList.FasonGirisSeri;
        $scope.SthCSeri = $rootScope.GeneralParamList.FasonCikisSeri;

        $scope.SthGSira = await MaxSthSira($scope.SthGSeri,1)
        $scope.SthCSira = await MaxSthSira($scope.SthCSeri,0)

        // if($rootScope.GeneralParamList.MonoMalKabul != "true")
        // {
        //     swal("Dikkat", "Bu Sayfaya Giriş Yetkiniz Bulunmamaktadır..",icon="warning");
        //     var url = "index.html";
        //     window.location.href = url;
        //     event.preventDefault();        
        // }

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
        $scope.DataKantarKilo = $scope.LblKantarKilo;
        if($rootScope.GeneralParamList.YariMamulGramKontrol == 1)
        {
            console.log(($scope.LblHassasGram / $scope.TxtSpRefMiktar))
            console.log($scope.TxtSpRefMiktar / ($scope.DataHassasTeraziGram / 1000))
            console.log(($scope.DataKantarKilo - $scope.LblKasaDara))
            let TmpData = await srv.Execute($scope.Firma,'StokGramDegerGetir',[$scope.LblUrun])
            let ReferansDeger = (TmpData[0].REFDEGER) * ($rootScope.GeneralParamList.YariMamulGramYuzde / 100)
            if(($scope.LblHassasGram / $scope.TxtSpRefMiktar) < (TmpData[0].REFDEGER - ReferansDeger) ||  ($scope.LblHassasGram / $scope.TxtSpRefMiktar) > (parseInt(TmpData[0].REFDEGER) + ReferansDeger))
            {
                swal("Dikkat", "Verilen Değerler Ürün İçin Belirlenen Sapma Oranından Fazla İşlem Durduruldu..",icon="warning");
                return;
            }
            
        }
       
       $scope.LblKantarMiktar =  parseInt((($scope.TxtSpRefMiktar / ($scope.DataHassasTeraziGram / 1000)) * ($scope.DataKantarKilo - $scope.LblKasaDara)).toFixed(2));
      
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
      

        var TmpUretMiktar = 0
        for (let i = 0; i < TmpDrUret.length; i++) 
        {
           var TmpUretKodu = TmpDrUret[i].KODU
           var TmpUretIsemrı = TmpDrUret[i].ISEMRI
           TmpUretMiktar = parseFloat(TmpUretMiktar) + parseFloat(TmpDrUret[i].MIKTAR)
           var TmpUretDepo = TmpDrUret[i].DEPO
           var TmpUretParti = TmpDrUret[i].PARTI
           var TmpUretLot = TmpDrUret[i].LOT
           var TmpUretIsmerkezi = TmpDrUret[i].ISMERKEZI

        }
        await InsertUrunGirisCikis(TmpUretKodu,TmpUretIsemrı,TmpUretMiktar,TmpUretDepo,TmpUretParti,TmpUretLot,TmpUretIsmerkezi,$scope.SthGSeri,$scope.SthGSira)

       // await InsertUrunGirisCikis(1,TmpTuketKodu,TmpTuketIsemrı,TmpTuketMiktar,TmpTuketDepo,TmpTuketParti,TmpTuketLot,TmpTuketIsmerkezi,$scope.SthCSeri,$scope.SthCSira)
       // await UpdateMalzemePlani(TmpTuketIsemrı, TmpTuketKodu,TmpTuketMiktar, false)

        swal("İşlem Başarılı!", "Kayıt İşlemi Gerçekleştirildi.",icon="success");
       $scope.Init()
    }
    $scope.BtnBarkodBas = async function()
    {
        if($scope.LblUrun != '')
        {
            let TmpSira = await MaxEtiketSira($rootScope.GeneralParamList.FasonEtiketSeri)
            console.log($rootScope.GeneralParamList.FasonEtiketSeri)
            console.log(TmpSira)
            console.log(SelectionRow)
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
    ToGroupBy = function(pData,pKey)
    {
        return pData.reduce(function(rv, x) 
        {
            (rv[x[pKey]] = rv[x] || []).push(x);
            return rv;
        }, {});
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
            $scope.PartiBarkod()
            console.log(11123)
         }
    }
}