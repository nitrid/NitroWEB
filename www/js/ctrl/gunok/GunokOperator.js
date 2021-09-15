function GunokOperator($scope,srv,$rootScope,$filter)
{
    $scope.Init = async function () 
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "OPERATOR";
        
        $scope.TabIndex = 1;
        $scope.UrunAdet = 1;
        $scope.BasimMiktar = 1;
        $scope.EtkSeri = "";
        $scope.EtkSira = 1;
        $scope.MiktarGiris = 1;

        $scope.SelectedRow = [];
        $scope.EtiketList = [];

        $scope.Data = {};
        $scope.Data.UMP = [];
        $scope.Data.URP = [];
        $scope.Data.DATA = [];

        $scope.SthGSira = await MaxSthSira($rootScope.GeneralParamList.UrunGirisSeri,12)
        $scope.SthCSira = await MaxSthSira($rootScope.GeneralParamList.UrunCikisSeri,0)
        $scope.OpSira = await MaxOpSira($rootScope.GeneralParamList.OperasyonSeri)

        $scope.CmbIsMerkezleri =
        {
            datasource : 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT 'TUMU' AS KODU,'TÜMÜ' AS ACIKLAMA " +
                        "UNION ALL " +
                        "SELECT Op_Kodu AS KODU,Op_Aciklama AS ACIKLAMA FROM URETIM_OPERASYONLARI " ,
            },
            key : "KODU",
            value : "ACIKLAMA",
            defaultVal : $rootScope.GeneralParamList.OperasyonKodu,
            selectionMode : "key",
            return : $rootScope.GeneralParamList.OperasyonKodu,
            onSelected : async function(pSelected)
            {
                await GetPlanlananIsEmrileri(pSelected);
            }
        }
        $scope.CmbDurdurmaNedeni =
        {
            datasource : 
            {
                data :  [{name: "1", special: "Durdurma Nedeni - 1"},{name: "2", special: "Durdurma Nedeni - 2"},{name: "3", special: "Durdurma Nedeni - 3"}] 
            },
            key : "name",
            value : "special",
            defaultVal : "1",
            selectionMode : "key",
            return : 1,
            onSelected : async function(pSelected)
            {

            }
        }

        await GetPlanlananIsEmrileri($rootScope.GeneralParamList.OperasyonKodu,"#FFFFFF");
    }
    async function GetPlanlananIsEmrileri(pKod,pColor)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT " +
                        "CASE WHEN is_Onayli_fl = 0 THEN 'ONAYSIZ' WHEN is_Onayli_fl = 1 THEN 'ONAYLI' END AS ONAYDURUMU, " +
                        "CASE WHEN is_Onceligi = 0 THEN 'DÜŞÜK' WHEN is_Onceligi = 1 THEN 'NORMAL' WHEN is_Onceligi = 2 THEN 'YÜKSEK' END AS ONCELIK, " +
                        "CONVERT(varchar,is_BaslangicTarihi,102) AS IS_EMRI_ACILIS_TARIH, " +
                        "CONVERT(varchar,is_Emri_AktiflesmeTarihi,102) AS IS_EMRI_AKTIFLESTIRME_TARIH, " +
                        "CONVERT(varchar,is_Emri_PlanBaslamaTarihi,102) AS IS_EMRI_PLANLAMA_TARIH, " +
                        "ISNULL((SELECT User_name FROM MikroDB_V16.dbo.KULLANICILAR WHERE User_no = is_create_user),'VERI BULUNAMADI') AS OLUSTURAN_KULLANICI, " +
                        "is_Guid AS GUID, " +
                        "is_Kod AS KODU, " +
                        "is_Ismi AS ADI, " +
                        "is_EmriDurumu AS DURUM, " +
                        "TERP.ISEMRI_STATUS AS ISEMRISTATUS, " +
                        "TERP.ISEMRI_ISTASYON_SIRA AS ISTASYONSIRA, " +
                        "UPL.upl_miktar - ISNULL((SELECT TOP 1 ish_uret_miktar FROM ISEMRI_MALZEME_DURUMLARI WHERE ish_isemri = is_Kod and ish_plan_sevkmiktar = 0),0) AS PLANMIKTAR, " +
                        "ROTA.RtP_PlanlananMiktar AS PLANLANANROTAMIKTAR, " +
                        "ROTA.RtP_TamamlananMiktar AS TAMAMLANANROTAMIKTAR, " +
                        "ROTA.RtP_OperasyonSafhaNo AS SAFHANO, " +
                        "ISNULL((SELECT RT.RtP_TamamlananMiktar FROM URETIM_ROTA_PLANLARI AS RT WHERE RT.RtP_OperasyonSafhaNo = ROTA.RtP_OperasyonSafhaNo - 1 AND RT.RtP_IsEmriKodu = is_Kod),0) AS ONCEKIISTASYONTAMAMLANANMIKTAR, " +
                        "ROTA.RtP_SonrakiSafhaNo AS SONRAKISAFHANO, " +
                        "UPL.upl_kodu AS STOKKODU, " +
                        "ISNULL((SELECT TOP 1 bar_kodu FROM BARKOD_TANIMLARI WHERE bar_stokkodu = UPL.upl_kodu),'') AS BARKOD, " + 
                        "ISNULL((SELECT sto_isim  FROM STOKLAR WHERE sto_kod =  UPL.upl_kodu),'') AS STOKADI, " +
                        "ISM.is_Baglanti_uid AS BAGLANTIID, " +
                        "(SELECT sip_evrakno_seri + CONVERT(varchar,sip_evrakno_sira) FROM SIPARISLER WHERE sip_Guid = ISM.is_Baglanti_uid) AS SIPARISNO, " +
                        "(SELECT cari_unvan1 + ' ' cari_unvan2 FROM CARI_HESAPLAR WHERE cari_kod = (SELECT sip_musteri_kod FROM SIPARISLER WHERE sip_Guid = ISM.is_Baglanti_uid)) AS CARIISMI, " +
                        "ISNULL(ROTA.RtP_OperasyonKodu,'') AS OPERASYONKODU " +
                        "FROM ISEMIRLERI AS ISM " +
                        "INNER JOIN URETIM_MALZEME_PLANLAMA AS UPL ON ISM.is_Kod =  UPL.upl_isemri " +
                        "LEFT OUTER JOIN URETIM_ROTA_PLANLARI AS ROTA ON ISM.is_Kod = ROTA.RtP_IsEmriKodu " +
                        "LEFT JOIN MikroDB_V16.dbo.TERP_NITROWEB_ISEMRI_LISTESI AS TERP ON TERP.ISEMRI_KOD = ISM.is_Kod COLLATE Turkish_CI_AS " +
                        "WHERE " +
                        "(SELECT sto_cins FROM STOKLAR WHERE sto_kod =  UPL.upl_kodu) IN(4,3) AND " +
                        "(ROTA.RtP_PlanlananMiktar - ROTA.RtP_TamamlananMiktar) > 0  AND " +
                        "UPL.upl_uretim_tuket = 1 AND " +
                        "TERP.ISEMRI_STATUS IN(0,1) AND " +
                        "((ROTA.RtP_OperasyonKodu = @RtP_OperasyonKodu) OR (@RtP_OperasyonKodu = 'TUMU')) AND " +
                        "((TERP.ISEMRI_ISTASYON_KOD = @RtP_OperasyonKodu) OR (@RtP_OperasyonKodu = 'TUMU')) AND " +
                        "ISM.is_Onayli_fl = @is_Onayli_fl   " +
                        "ORDER BY CONVERT(int,TERP.ISEMRI_ISTASYON_SIRA) " ,
                        param : ['RtP_OperasyonKodu:string|20','is_Onayli_fl:string|5'],
                        value : [pKod,$rootScope.GeneralParamList.IsEmriOnayDurumu]
            }

            let Data = await srv.Execute(TmpQuery); //GRUPLAMA İŞLEMİ

            if(Data.length == 0)
            {
                swal("Uyarı", "Gösterilecek Veri Bulunamadı.",icon="warning");
            }

            PlanlananEmriGrid(Data,pColor);
            resolve()
        });
    }
    function PlanlananEmriGrid(pData,pSelectedColor)
    {
        $("#TblPlanlananIsEmirleri").dxDataGrid({
            height: 640,
            dataSource: pData,
            columnMinWidth: 200,
            showBorders: true,
            sorting: 
            {
                mode: "none"
            },
            showBorders: true,
            filterRow: 
            {
                visible: true,
                applyFilter: "auto"
            },
            selection: 
            {
    	        mode: "single"
    	    },
            scrolling: 
            {
                columnRenderingMode: "horizontal"
            },
            paging: 
            {
                pageSize: 20
            },
            headerFilter: 
            {
                visible: true
            },
            columns: [
                {
                    width: 100,
                    dataField: "ISTASYONSIRA",
                    caption: "Istasyon Sıra",
                    alignment: "center"
                },
                {
                    width: 100,
                    dataField: "SIPARISNO",
                    caption: "Sipariş No",
                    alignment: "center"
                },
                {
                    width: 150,
                    dataField: "KODU",
                    caption: "İş Emri No",
                    alignment: "center"
                },
                {
                    width: 300,
                    dataField: "ONCEKIISTASYONTAMAMLANANMIKTAR",
                    caption: "Önceki İstasyon Tamamlanan Miktar",
                    alignment: "center"
                },
                {
                    width: 200,
                    dataField: "PLANLANANROTAMIKTAR",
                    caption: "Planlanan Miktar",
                    alignment: "center"
                },
                {
                    width: 200,
                    dataField: "TAMAMLANANROTAMIKTAR",
                    caption: "Tamamlanan Miktar",
                    alignment: "center"
                },
                {
                    dataField: "STOKKODU",
                    caption: "Stok Kodu",
                    alignment: "center"
                },
                {
                    dataField: "STOKADI",
                    caption: "Stok Adı",
                    alignment: "center"
                },
                {
                    dataField: "CARIISMI",
                    caption: "Cari Adı",
                    alignment: "center"
                },
                {      
                    caption: "İŞLEMLER",
                    width: 90,
                    type: "buttons",
                    buttons: 
                    [ 
                        {
                            icon: "print",
                            text: "ETİKES BAS",
                            onClick: function (e) 
                            {

                            }
                        },
                        {
                            icon: "pdffile",
                            text: "PDF GOSTER",
                            onClick: function (e) 
                            {
                                
                            }
                        }
                    ]
            }],
            onCellPrepared: function(e) 
            {
                if (e.rowType == "data" && e.row.isSelected) 
                {
                    e.cellElement.css("background-color", pSelectedColor);
                }
            },
            onSelectionChanged: function(e) 
            {
                e.component.repaint();
            },
            onRowPrepared(e) 
            {  
                if (e.rowType == 'data' && e.data.ISEMRISTATUS == 0)  
                {  
                    e.rowElement.css("background-color", "#87bdd8"); //PLANLANAN İŞ EMİRLERİ
                }
                else if(e.rowType == 'data'  && e.data.ISEMRISTATUS == 1)
                {
                    e.rowElement.css("background-color", "#FFFF00"); //AKTİF İŞ EMİRLERİ
                }
                else if(e.rowType == 'data' && e.data.ISEMRISTATUS == 2)
                {
                    e.rowElement.css("background-color", "#eea29a"); //KAPANMIŞ İŞ EMİRLERİ
                }
            },
            onSelectionChanged: async function (selectedItems) 
            {
                $scope.SelectedRow = selectedItems.selectedRowsData;
                $scope.Data.UMP = await UretimMalzemePlanGetir(selectedItems.selectedRowsData[0].KODU);
                $scope.Data.URP = await UretimRotaPlanGetir(selectedItems.selectedRowsData[0].KODU,selectedItems.selectedRowsData[0].OPERASYONKODU);
            }
        }).dxDataGrid("instance");
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
    async function EtiketPrint(pData)
    {
        return new Promise(async resolve => 
        {
            for (let i = 0; i < $scope.BasimMiktar; i++) 
            {
                srv.Emit('DevPrint',"{TYPE:'PRINT',PATH:'" + $scope.GeneralParamList.TasarimYolu + "/" + $rootScope.GeneralParamList.Tasarim + "',DATA:"+ JSON.stringify(pData).split("İ").join("I").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u") +"}",(pResult)=>
                {
                    console.log(pResult)
                })
            }
       
            swal("İşlem Başarılı!", "Etiket Yazdırma İşlemi Gerçekleştirildi.",icon="success");
            resolve()
        });
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

            let TmpData = await srv.Execute(TmpQuery)

            if(typeof TmpData == 'undefined')
            {
                TmpData = []
            }

            resolve(TmpData);
        });
    }
    function UretimRotaPlanGetir(pIsEmri,pOpKod)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT " +
                        "RtP_Guid AS REC, " +
                        "RtP_PlanlananMiktar AS PLANLANANMIKTAR, " + 
                        "RtP_TamamlananMiktar AS TAMAMLANANMIKTAR, " + 
                        "RtP_OperasyonSafhaNo AS SAFHANO, " +
                        "RtP_SonrakiSafhaNo AS SONRAKISAFHANO, " +
                        "RtP_IsEmriKodu AS ISEMRI, " +
                        "RtP_OperasyonKodu AS OPERASYONKODU, " +
                        "RtP_PlanlananIsMerkezi AS ISMERKEZI, " +
                        "RtP_UrunKodu AS URUNKODU, " +
                        "ROUND(CAST((RtP_PlanlananSure / RtP_PlanlananMiktar) AS float),2) AS SURE " +
                        "FROM URETIM_ROTA_PLANLARI WHERE RtP_IsEmriKodu = @RtP_IsEmriKodu AND RtP_OperasyonKodu = @RtP_OperasyonKodu",
                param : ['RtP_IsEmriKodu:string|50','RtP_OperasyonKodu:string|25'],
                value : [pIsEmri,pOpKod]
            }

            let TmpData = await srv.Execute(TmpQuery)

            if (typeof TmpData == 'undefined')
            {
                TmpData = []
            }
            resolve(TmpData);
        });
    }
    function BaslatData()
    {
        let TmpDrUret = $scope.Data.UMP.filter(x => x.URETTUKET == 1)
        let TmpDrTuket = $scope.Data.UMP.filter(x => x.URETTUKET == 0)
       
        let TmpDrRota = [];

        if(TmpDrUret.length > 0)
        {
            TmpDrRota = $scope.Data.URP.filter(x => x.URUNKODU == $scope.SelectedRow[0].STOKKODU)
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
            TmpData.URNBARKOD = TmpDrUret[i].BARKOD + ($scope.MiktarGiris).toString().padStart(5, '0');
            TmpData.ISEMRI = TmpDrUret[i].ISEMRI;
            TmpData.KODU = TmpDrUret[i].KODU;
            TmpData.ADI = TmpDrUret[i].ADI;
            TmpData.MIKTAR = parseFloat(TmpDrUret[i].BMIKTAR * $scope.MiktarGiris);
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
            TmpData.ISEMRI = TmpDrTuket[i].ISEMRI;
            TmpData.KODU = TmpDrTuket[i].KODU;
            TmpData.ADI = TmpDrTuket[i].ADI;
            TmpData.MIKTAR = parseFloat(TmpDrTuket[i].BMIKTAR * $scope.MiktarGiris);
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
                '00000000-0000-0000-0000-000000000000',       //sth_sip_uid
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
            let BasTarih = (await srv.Execute($scope.Firma,'GetIsEmriDate',[pDr.ISEMRI,pDr.OPERASYONKODU]))[0].DATE;
            let BitTarih = new Date();
            let TmpSure = (new Date(moment(BitTarih).format("YYYY-MM-DDTHH:mm:ss")) - new Date(moment(BasTarih).format("YYYY-MM-DDTHH:mm:ss"))) / 1000;

            await srv.Execute($scope.Firma,'UpdateIsEmriDate',[moment(BasTarih).format("DD.MM.YYYY HH:mm:ss"),moment(BitTarih).format("DD.MM.YYYY HH:mm:ss"),$scope.SelectedRow[0].GUID,$scope.SelectedRow[0].OPERASYONKODU]);
            
            let TmpInsertData =
            [
                $scope.Param.MikroId,
                $scope.Param.MikroId,
                0,
                0,
                pSeri,
                pSira,
                pDr.ROTAREC,
                moment(BasTarih).format("DD.MM.YYYY HH:mm:ss"),
                moment(BitTarih).format("DD.MM.YYYY HH:mm:ss"),
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
                TmpUpdateQuery = "UPDATE ISEMRI_MALZEME_DURUMLARI SET ish_lastup_date = GETDATE(),ish_uret_miktar = ish_uret_miktar + @miktar WHERE ish_isemri = @ish_isemri AND ish_stokhizm_gid_kod = @ish_stokhizm_gid_kod"
            }
            else
            {
                TmpUpdateQuery = "UPDATE ISEMRI_MALZEME_DURUMLARI SET ish_lastup_date = GETDATE(),ish_sevk_miktar = ish_sevk_miktar + @miktar WHERE ish_isemri = @ish_isemri AND ish_stokhizm_gid_kod = @ish_stokhizm_gid_kod"
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
    function RotaControl(pKod,pSafha)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT " +
                        "RtP_OperasyonKodu AS OPERASYONKODU, " +
                        "(SELECT Op_Aciklama FROM URETIM_OPERASYONLARI WHERE Op_Kodu = RtP_OperasyonKodu) AS OPERASYONADI, " +
                        "RtP_TamamlananMiktar AS TAMAMLANANMIKTAR, " +
                        "RtP_OperasyonSafhaNo AS SAFHA " +
                        "FROM URETIM_ROTA_PLANLARI " +
                        "WHERE " +
                        "RtP_IsEmriKodu = @RtP_IsEmriKodu AND " +
                        "RtP_OperasyonSafhaNo = @RtP_OperasyonSafhaNo - 1 " ,
                param : ['RtP_IsEmriKodu:string|50','RtP_OperasyonSafhaNo:int'],
                value : [pKod,pSafha]
            }

            let TmpResult = await srv.Execute(TmpQuery)

            resolve(TmpResult);
        });
    }
    $scope.BtnDurdur = async function()
    {
        $('#MdlDurdur').modal('show')
    }
    $scope.BtnEtiketYazdir = async function(pType)
    {
        if(pType == 0)
        {
            if($scope.SelectedRow.length == 0)
            {
                swal("Uyarı", "Lütfen Satır Seçimi Yapınız.",icon="warning");
                return;
            }
            $('#MdlEtiketYazdir').modal('show')
        }
        else if(pType == 1)
        {
            if($scope.SelectedRow.BARKOD == "" || typeof($scope.SelectedRow.BARKOD) == 'undefined')
            {
                swal("Uyarı", "Seçmiş Olduğunuz Satırın Barkod Bilgisi Bulunamadı.",icon="warning");
                return;
            }

            $scope.SelectedRow.UrunAdet = $scope.UrunAdet;
            await EtiketPrint($scope.SelectedRow);
            
            $('#MdlEtiketYazdir').modal('hide');
        }
    }
    $scope.BtnBaslat = async function()
    {
        if($scope.SelectedRow.length > 0)
        {
            if($scope.SelectedRow[0].ISEMRISTATUS == 1)
            {
                swal("Uyarı", "Lütfen Planlanmış İş Emri Seçiniz.",icon="warning");
                return;
            }

            swal({
                title: "Uyarı",
                text : "İş Emrini Başlatmak İstediğinize Emin Misiniz ? ",
                icon: "warning",
                buttons: true,
                dangerMode: false,
              })
              .then(async (willDelete) => 
              {
                if (willDelete) 
                {
                    await srv.Execute($scope.Firma,'IsEmriBaslat',[$scope.SelectedRow[0].GUID]); 
                    await srv.Execute($scope.Firma,'UpdateIsEmriDate',[moment(new Date()).format("DD.MM.YYYY HH:mm:ss"),'24-02-1997 00:00:00.000',$scope.SelectedRow[0].GUID,$scope.SelectedRow[0].OPERASYONKODU]);
                    await GetPlanlananIsEmrileri($scope.CmbIsMerkezleri.return,"#FFFF00");
                  swal("Başarılı! İş Emri Başlatıldı.", 
                  {
                    icon: "success",
                  });
                }
                else 
                {
                  swal("Uyarı", "İşlem İptal Edildi.",icon="warning");
                }
              });
        }
        else
        {
            swal("Uyarı", "Lütfen Satır Seçimi Yapınız.",icon="warning");
        }
    }
    $scope.BtnUrunGiris = async function(pType)
    {
        if($scope.SelectedRow.length <= 0)
        {
            swal("Uyarı", "Lütfen Satır Seçimi Yapınız.",icon="warning");
            return;
        }
        if($scope.SelectedRow[0].ISEMRISTATUS == 0)
        {
            swal("Uyarı", "Lütfen Aktif İş Emri Seçiniz.",icon="warning");
            return;
        }
     
        if(pType == 0)
        {
            $scope.Data.DATA = [];
            $('#MdlUrunGiris').modal('show');
        }
        else if(pType == 1)
        {   
            if($scope.SelectedRow[0].SAFHANO > 1)
            {
                let rotacontrol = await RotaControl($scope.SelectedRow[0].KODU,$scope.SelectedRow[0].SAFHANO);

                if(rotacontrol[0].TAMAMLANANMIKTAR < $scope.MiktarGiris) //BİR ÖNCEKİ İSTASYONDAKİ MİKTAR KONTROLÜ
                {
                    swal("İşlem Başarısız!","Bir Önceki (" + rotacontrol[0].OPERASYONADI + ") İstasyonda \n Tamamlanan Miktar : " + rotacontrol[0].TAMAMLANANMIKTAR ,icon="error"); 
                    return;
                }
            }

            BaslatData();
            let TmpDrTuket = $scope.Data.DATA.filter(x => x.URETTUKET == 0);
            let TmpDrUret = $scope.Data.DATA.filter(x => x.URETTUKET == 1);

            if(MiktarKontrol()) //Girilen Miktar İle Planlanan Miktar Kontrol
            {
                swal("Dikkat", "Üretilecek Ürün Planlanan Üründen Fazla Olamaz.",icon="warning");
                return;
            }
            let InfoText = "";

            if($rootScope.GeneralParamList.StokEksiyeDusme == "false")
            {
                for(let i = 0;i < TmpDrTuket.length;i++) //Depo Miktar Kontrol
                {
                    if(srv.SumColumn($scope.Data.DATA,"MIKTAR","KODU = " + TmpDrTuket[i].KODU) > TmpDrTuket[i].DEPOMIKTAR)
                    {
                        InfoText = InfoText + 'Stok Kodu : ' + TmpDrTuket[i].KODU + ' - ' + 'Depo Miktar : ' + TmpDrTuket[i].DEPOMIKTAR + ' - ' + 'Miktar : ' + srv.SumColumn($scope.Data.DATA,"MIKTAR","KODU = " + TmpDrTuket[i].KODU) + "\n"

                        if(i == TmpDrTuket.length - 1)
                        {
                            swal("Dikkat", "Depo Miktarı Eksiye Düşemez. " + "\n" + InfoText,icon="warning");
                            return;
                        }
                    }
                }
            }
            
            for (let i = 0; i < TmpDrUret.length; i++) 
            {
                await InsertOperasyonKapama(TmpDrUret[i],$rootScope.GeneralParamList.OperasyonSeri,$scope.OpSira);
                await UpdateRotaPlani(TmpDrUret[i].ROTAREC, TmpDrUret[i].MIKTAR, TmpDrUret[i].SURE);

                if($scope.SelectedRow[0].SONRAKISAFHANO == 0)
                {
                    await InsertUrunGirisCikis(0,TmpDrUret[i],$rootScope.GeneralParamList.UrunGirisSeri,$scope.SthGSira);
                    await UpdateMalzemePlani(TmpDrUret[i].ISEMRI, TmpDrUret[i].KODU, TmpDrUret[i].MIKTAR, true);
                    await srv.Execute($scope.Firma,'IsEmriKapat',[$scope.SelectedRow[0].GUID]); 
                }
            }
            for (let i = 0; i < TmpDrTuket.length; i++) 
            {
                if($scope.SelectedRow[0].SONRAKISAFHANO == 0)
                {
                    await InsertUrunGirisCikis(1,TmpDrTuket[i],$rootScope.GeneralParamList.UrunCikisSeri,$scope.SthCSira);
                    await UpdateMalzemePlani(TmpDrTuket[i].ISEMRI, TmpDrTuket[i].KODU, TmpDrTuket[i].MIKTAR, false);
                }
            }

            $scope.Init();

            swal("İşlem Başarılı!", "Kayıt İşlemi Gerçekleştirildi.",icon="success");
        }
    }
}