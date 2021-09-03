function GunokPlanlama($scope,srv,$rootScope,$filter)
{
    $scope.Init = async function () 
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "PLANLAMA";
        $scope.TumIsEmirMiktar = 0;
        $scope.AcikIsEmirMiktar = 0;
        $scope.PlanlananIsEmriMiktar = 0;
        $scope.IsEmriDetay = {};
        $scope.TabIndex = 1;

        $scope.SelectedData = [];
        $scope.SiralamaList = [];
        $scope.IsEmriIstasyonList = [];
        $scope.PlanlananList = [];

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
            defaultVal : "TUMU",
            selectionMode : "key",
            return : 1,
            onSelected : function(pSelected)
            {
                $scope.BtnTab($scope.TabIndex,pSelected);
            }
        }

        $scope.BtnTab(1,'TUMU');
    }
    async function GetIsEmriMiktar()
    {
        for (let i = 0; i < 3; i++) 
        {
            if(i == 0)
            {
                let TmpQuery = 
                {
                    db: "{M}." + $scope.Firma,
                    query : "SELECT " +
                            "COUNT(upl_miktar) AS TUMISEMIRLERIMIKTAR " +
                            "FROM ISEMIRLERI AS ISM INNER JOIN URETIM_MALZEME_PLANLAMA AS UPL on ISM.is_Kod =  UPL.upl_isemri " +
                            "WHERE " +
                            "ISM.is_BagliOlduguIsemri = '' AND " +
                            "UPL.upl_uretim_tuket = 1 AND " +
                            "ISM.is_Onayli_fl = @is_Onayli_fl AND " +
                            "((ISM.is_EmriDurumu <> @is_EmriDurumu) OR (@is_EmriDurumu <> 2)) " +
                            "GROUP BY is_DBCno " ,
                    param : ['is_Onayli_fl:string|5','is_EmriDurumu:int'],
                    value : [$rootScope.GeneralParamList.IsEmriOnayDurumu,$rootScope.GeneralParamList.KapananIsEmri]
                
                }
                let TmpData = await srv.Execute(TmpQuery)
                if(TmpData.length > 0)
                {
                    $scope.TumIsEmirMiktar = TmpData[0].TUMISEMIRLERIMIKTAR
                }
                else
                {
                    $scope.TumIsEmirMiktar = 0;
                }
            }
            else if (i == 1)
            {
                let TmpQuery = 
                {
                    db: "{M}." + $scope.Firma,
                    query : "SELECT " +
                            "COUNT(upl_miktar) AS ACIKISEMIRLERIMIKTAR " +
                            "FROM ISEMIRLERI AS ISM INNER JOIN URETIM_MALZEME_PLANLAMA AS UPL on ISM.is_Kod =  UPL.upl_isemri " +
                            "LEFT JOIN MikroDB_V16.dbo.TERP_NITROWEB_ISEMRI_LISTESI AS TERP ON TERP.ISEMRI_KOD = ISM.is_Kod COLLATE Turkish_CI_AS " +
                            "WHERE " +
                            "ISM.is_BagliOlduguIsemri = '' AND " +
                            "UPL.upl_uretim_tuket = 1 AND " +
                            "ISM.is_EmriDurumu = 0 AND " +
                            "ISM.is_Onayli_fl = @is_Onayli_fl AND " +
                            "TERP.SPECIAL IS NULL " +
                            "GROUP BY is_DBCno " ,
                    param : ['is_Onayli_fl:string|5'],
                    value : [$rootScope.GeneralParamList.IsEmriOnayDurumu]
                }
                let TmpData = await srv.Execute(TmpQuery)
                if(TmpData.length > 0)
                {
                    $scope.AcikIsEmirMiktar = TmpData[0].ACIKISEMIRLERIMIKTAR
                }
                else
                {
                    $scope.AcikIsEmirMiktar = 0;
                }
            }
            else if (i == 2)
            {
                let TmpQuery = 
                {
                    db: "{M}." + $scope.Firma,
                    query : "SELECT " +
                            "COUNT(upl_miktar) AS PLANLANANISEMIRLERIMIKTAR " +
                            "FROM ISEMIRLERI AS ISM INNER JOIN URETIM_MALZEME_PLANLAMA AS UPL on ISM.is_Kod =  UPL.upl_isemri " +
                            "LEFT JOIN MikroDB_V16.dbo.TERP_NITROWEB_ISEMRI_LISTESI AS TERP ON TERP.ISEMRI_KOD = ISM.is_Kod COLLATE Turkish_CI_AS " +
                            "WHERE " +
                            "ISM.is_BagliOlduguIsemri <> '' AND " +
                            "UPL.upl_uretim_tuket = 1 AND " +
                            "ISM.is_Onayli_fl = @is_Onayli_fl AND " +
                            "ISM.is_EmriDurumu = 0 AND " +
                            "TERP.SPECIAL = 'ALTISEMRI' " +
                            "GROUP BY is_DBCno " ,
                    param : ['is_Onayli_fl:string|5'],
                    value : [$rootScope.GeneralParamList.IsEmriOnayDurumu]
                }
                let TmpData = await srv.Execute(TmpQuery)
                if(TmpData.length > 0)
                {
                    $scope.PlanlananIsEmriMiktar = TmpData[0].PLANLANANISEMIRLERIMIKTAR
                }
                else
                {
                    $scope.PlanlananIsEmriMiktar = 0;
                }
            }
        }
    }
    async function GetTumIsEmrileri(pKod)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT " +
                        "CASE WHEN is_Onayli_fl = 0 THEN 'ONAYSIZ' WHEN is_Onayli_fl = 1 THEN 'ONAYLI' END AS ONAYDURUMU, " +
                        "CASE WHEN is_Onceligi = 0 THEN 'DÜŞÜK' WHEN is_Onceligi = 1 THEN 'NORMAL' WHEN is_Onceligi = 2 THEN 'YÜKSEK' END AS ONCELIK, " +
                        "CONVERT(varchar,is_BaslangicTarihi,20) AS IS_EMRI_ACILIS_TARIH," +
                        "CONVERT(varchar,is_Emri_AktiflesmeTarihi,20) AS IS_EMRI_AKTIFLESTIRME_TARIH, " +
                        "CONVERT(varchar,is_Emri_PlanBaslamaTarihi,20) AS IS_EMRI_PLANLAMA_TARIH, " +
                        "ISNULL((SELECT User_name FROM MikroDB_V16.dbo.KULLANICILAR WHERE User_no = is_create_user),'VERI BULUNAMADI') AS OLUSTURAN_KULLANICI, " +
                        "CASE WHEN is_EmriDurumu = 0 AND is_special3 = '' THEN 'AÇIK' WHEN " +
                        "is_EmriDurumu = 0 AND is_special3 <> '' AND is_special3 <> '0' THEN 'PLANLANAN' WHEN " +
                        "is_EmriDurumu = 1 THEN 'AKTİF' ELSE " +
                        " 'KAPANAN' END AS ISEMRIDURUM, " +
                        "is_Guid AS GUID, " +
                        "is_Kod AS KODU, " +
                        "is_Ismi AS ADI, " +
                        "(SELECT sip_evrakno_seri + CONVERT(varchar,sip_evrakno_sira) FROM SIPARISLER WHERE sip_Guid = ISM.is_Baglanti_uid) AS SIPARISNO, " +
                        "(SELECT cari_unvan1 + ' ' cari_unvan2 FROM CARI_HESAPLAR WHERE cari_kod = (SELECT sip_musteri_kod FROM SIPARISLER WHERE sip_Guid = ISM.is_Baglanti_uid)) AS CARIISMI, " +
                        "is_EmriDurumu AS DURUM, " +
                        "is_special3 AS SPECIAL, " +
                        "UPL.upl_miktar - ISNULL((SELECT TOP 1 ish_uret_miktar FROM ISEMRI_MALZEME_DURUMLARI WHERE ish_isemri = is_Kod and ish_plan_sevkmiktar = 0),0) AS PLANMIKTAR, " + 
                        "UPL.upl_kodu AS STOKKODU, " +
                        "ISNULL((SELECT sto_isim  FROM STOKLAR WHERE sto_kod =  UPL.upl_kodu),'') AS STOKADI, " +
                        "ISNULL(ROTA.RtP_OperasyonKodu,'') AS OPERASYONKODU " +
                        "FROM ISEMIRLERI AS ISM " +
                        "INNER JOIN URETIM_MALZEME_PLANLAMA AS UPL ON ISM.is_Kod =  UPL.upl_isemri " +
                        "LEFT OUTER JOIN URETIM_ROTA_PLANLARI AS ROTA ON ISM.is_Kod = ROTA.RtP_IsEmriKodu " +
                        "WHERE " +
                        "ISM.is_BagliOlduguIsemri = '' AND " +
                        "(SELECT TOP 1 (ish_planuretim - ish_uret_miktar) FROM ISEMRI_MALZEME_DURUMLARI WHERE ish_isemri = ISM.is_Kod and ish_plan_sevkmiktar = 0) > 0  AND " +
                        "UPL.upl_uretim_tuket = 1 AND " +
                        "((ROTA.RtP_OperasyonKodu = @RtP_OperasyonKodu) OR (@RtP_OperasyonKodu = 'TUMU')) AND " +
                        "ISM.is_Onayli_fl = @is_Onayli_fl AND " +
                        "((ISM.is_EmriDurumu <> @is_EmriDurumu) OR (@is_EmriDurumu <> 2)) " ,
                param : ['RtP_OperasyonKodu:string|20','is_Onayli_fl:string|5','is_EmriDurumu:int'],
                value : [pKod,$rootScope.GeneralParamList.IsEmriOnayDurumu,$rootScope.GeneralParamList.KapananIsEmri]
            }

            let Data = await srv.Execute(TmpQuery);
       
            if(Data.length == 0)
            {
                swal("Uyarı", "Gösterilecek Veri Bulunamadı.",icon="warning");
            }

            resolve(Data)
        });
    }
    async function GetAcikIsEmrileri(pKod)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT " +
                        "CASE WHEN is_Onayli_fl = 0 THEN 'ONAYSIZ' WHEN is_Onayli_fl = 1 THEN 'ONAYLI' END AS ONAYDURUMU, " +
                        "CASE WHEN is_Onceligi = 0 THEN 'DÜŞÜK' WHEN is_Onceligi = 1 THEN 'NORMAL' WHEN is_Onceligi = 2 THEN 'YÜKSEK' END AS ONCELIK, " +
                        "CONVERT(varchar,is_BaslangicTarihi,102) AS IS_EMRI_ACILIS_TARIH," +
                        "CONVERT(varchar,is_Emri_AktiflesmeTarihi,102) AS IS_EMRI_AKTIFLESTIRME_TARIH, " +
                        "CONVERT(varchar,is_Emri_PlanBaslamaTarihi,102) AS IS_EMRI_PLANLAMA_TARIH, " +
                        "ISNULL((SELECT User_name FROM MikroDB_V16.dbo.KULLANICILAR WHERE User_no = is_create_user),'VERI BULUNAMADI') AS OLUSTURAN_KULLANICI, " +
                        "is_Guid AS GUID, " +
                        "is_Kod AS KODU, " +
                        "is_Ismi AS ADI, " +
                        "UPL.upl_miktar - ISNULL((SELECT TOP 1 ish_uret_miktar FROM ISEMRI_MALZEME_DURUMLARI WHERE ish_isemri = is_Kod and ish_plan_sevkmiktar = 0),0) AS PLANMIKTAR, " + 
                        "UPL.upl_kodu AS STOKKODU, " +
                        "ISNULL((SELECT sto_isim  FROM STOKLAR WHERE sto_kod =  UPL.upl_kodu),'') AS STOKADI, " +
                        "(SELECT sip_evrakno_seri + CONVERT(varchar,sip_evrakno_sira) FROM SIPARISLER WHERE sip_Guid = ISM.is_Baglanti_uid) AS SIPARISNO, " +
                        "(SELECT cari_unvan1 + ' ' cari_unvan2 FROM CARI_HESAPLAR WHERE cari_kod = (SELECT sip_musteri_kod FROM SIPARISLER WHERE sip_Guid = ISM.is_Baglanti_uid)) AS CARIISMI, " +
                        "ISNULL(ROTA.RtP_OperasyonKodu,'') AS OPERASYONKODU " +
                        "FROM ISEMIRLERI AS ISM " +
                        "INNER JOIN URETIM_MALZEME_PLANLAMA AS UPL ON ISM.is_Kod =  UPL.upl_isemri " +
                        "LEFT OUTER JOIN URETIM_ROTA_PLANLARI AS ROTA ON ISM.is_Kod = ROTA.RtP_IsEmriKodu " +
                        "LEFT JOIN MikroDB_V16.dbo.TERP_NITROWEB_ISEMRI_LISTESI AS TERP ON TERP.ISEMRI_KOD = ISM.is_Kod COLLATE Turkish_CI_AS " +
                        "WHERE " +
                        "ISM.is_BagliOlduguIsemri = '' AND " +
                        "(SELECT TOP 1 (ish_planuretim - ish_uret_miktar) FROM ISEMRI_MALZEME_DURUMLARI WHERE ish_isemri = ISM.is_Kod and ish_plan_sevkmiktar = 0) > 0  AND " +
                        "UPL.upl_uretim_tuket = 1 AND " +
                        "ISM.is_EmriDurumu = 0 AND " +
                        "((ROTA.RtP_OperasyonKodu = @RtP_OperasyonKodu) OR (@RtP_OperasyonKodu = 'TUMU')) AND " +
                        "ISM.is_Onayli_fl = @is_Onayli_fl AND " +
                        "TERP.SPECIAL IS NULL ",
                        param : ['RtP_OperasyonKodu:string|20','is_Onayli_fl:string|5'],
                        value : [pKod,$rootScope.GeneralParamList.IsEmriOnayDurumu]
            }

            let Data = await srv.Execute(TmpQuery);

            if(Data.length == 0)
            {
                swal("Uyarı", "Gösterilecek Veri Bulunamadı.",icon="warning");
            }

            resolve(Data)
        });
    }
    async function GetPlanlananIsEmrileri(pKod)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT " +
                        "CASE WHEN is_Onayli_fl = 0 THEN 'ONAYSIZ' WHEN is_Onayli_fl = 1 THEN 'ONAYLI' END AS ONAYDURUMU, " +
                        "CASE WHEN is_Onceligi = 0 THEN 'DÜŞÜK' WHEN is_Onceligi = 1 THEN 'NORMAL' WHEN is_Onceligi = 2 THEN 'YÜKSEK' END AS ONCELIK, " +
                        "CONVERT(varchar,is_BaslangicTarihi,102) AS IS_EMRI_ACILIS_TARIH," +
                        "CONVERT(varchar,is_Emri_AktiflesmeTarihi,102) AS IS_EMRI_AKTIFLESTIRME_TARIH, " +
                        "CONVERT(varchar,is_Emri_PlanBaslamaTarihi,102) AS IS_EMRI_PLANLAMA_TARIH, " +
                        "ISNULL((SELECT User_name FROM MikroDB_V16.dbo.KULLANICILAR WHERE User_no = is_create_user),'VERI BULUNAMADI') AS OLUSTURAN_KULLANICI, " +
                        "is_Guid AS GUID, " +
                        "is_Kod AS KODU, " +
                        "is_Ismi AS ADI, " +
                        "TERP.ISEMRI_SIRA AS ISEMRISIRA, " +
                        "TERP.ISEMRI_ISTASYON_SIRA AS ISTASYONSIRA, " +
                        "UPL.upl_miktar - ISNULL((SELECT TOP 1 ish_uret_miktar FROM ISEMRI_MALZEME_DURUMLARI WHERE ish_isemri = is_Kod and ish_plan_sevkmiktar = 0),0) AS PLANMIKTAR, " + 
                        "UPL.upl_kodu AS STOKKODU, " +
                        "ISNULL((SELECT sto_isim  FROM STOKLAR WHERE sto_kod =  UPL.upl_kodu),'') AS STOKADI, " +
                        "(SELECT sip_evrakno_seri + CONVERT(varchar,sip_evrakno_sira) FROM SIPARISLER WHERE sip_Guid = ISM.is_Baglanti_uid) AS SIPARISNO, " +
                        "(SELECT cari_unvan1 + ' ' cari_unvan2 FROM CARI_HESAPLAR WHERE cari_kod = (SELECT sip_musteri_kod FROM SIPARISLER WHERE sip_Guid = ISM.is_Baglanti_uid)) AS CARIISMI, " +
                        "ISNULL(ROTA.RtP_OperasyonKodu,'') AS OPERASYONKODU " +
                        "FROM ISEMIRLERI AS ISM " +
                        "INNER JOIN URETIM_MALZEME_PLANLAMA AS UPL ON ISM.is_Kod =  UPL.upl_isemri " +
                        "LEFT OUTER JOIN URETIM_ROTA_PLANLARI AS ROTA ON ISM.is_Kod = ROTA.RtP_IsEmriKodu " +
                        "LEFT JOIN MikroDB_V16.dbo.TERP_NITROWEB_ISEMRI_LISTESI AS TERP ON TERP.ISEMRI_KOD = ISM.is_Kod COLLATE Turkish_CI_AS " +
                        "WHERE " +
                        "(SELECT sto_cins FROM STOKLAR WHERE sto_kod =  UPL.upl_kodu) = 3 AND " +
                        "(SELECT TOP 1 (ish_planuretim - ish_uret_miktar) FROM ISEMRI_MALZEME_DURUMLARI WHERE ish_isemri = ISM.is_Kod and ish_plan_sevkmiktar = 0) > 0  AND " +
                        "UPL.upl_uretim_tuket = 1 AND " +
                        "ISM.is_EmriDurumu = 0 AND " +
                        "((ROTA.RtP_OperasyonKodu = @RtP_OperasyonKodu) OR (@RtP_OperasyonKodu = 'TUMU')) AND " +
                        "((TERP.ISEMRI_ISTASYON_KOD = @RtP_OperasyonKodu) OR (@RtP_OperasyonKodu = 'TUMU')) AND " +
                        "ISM.is_Onayli_fl = @is_Onayli_fl AND " +
                        "TERP.SPECIAL = 'ALTISEMRI' " +
                        "ORDER BY TERP.ISEMRI_ISTASYON_SIRA,TERP.ISEMRI_SIRA " ,
                        param : ['RtP_OperasyonKodu:string|20','is_Onayli_fl:string|5'],
                        value : [pKod,$rootScope.GeneralParamList.IsEmriOnayDurumu]
            }

            let Data = await srv.Execute(TmpQuery); //GRUPLAMA İŞLEMİ

            if(Data.length == 0)
            {
                swal("Uyarı", "Gösterilecek Veri Bulunamadı.",icon="warning");
            }

            resolve(Data)
        });
    }
    function TumIsEmriGrid(pData)
    {
        $("#TblTumIsEmirleri").dxDataGrid({
            height: 640,
            dataSource: pData,
            columnsAutoWidth: true,
            showBorders: true,
            sorting: {
                mode: "none"
            },
            showBorders: true,
            filterRow: 
            {
                visible: true,
                applyFilter: "auto"
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
                    dataField: "SIPARISNO",
                    caption: "Sipariş No",
                    alignment: "center"
                },
                {
                    width: 150,
                    dataField: "IS_EMRI_ACILIS_TARIH",
                    caption: "Açılış Tarihi",
                    alignment: "center"
                }, 
                {
                    width: 150,
                    dataField: "IS_EMRI_AKTIFLESTIRME_TARIH",
                    caption: "Aktifleştirme Tarihi",
                    alignment: "center"
                },
                {
                    width: 150,
                    dataField: "IS_EMRI_PLANLAMA_TARIH",
                    caption: "Planlama Tarihi",
                    alignment: "center"
                },
                {
                    width: 150,
                    dataField: "KODU",
                    caption: "İş Emri No",
                    alignment: "center"
                }, 
                {
                    width: 200,
                    dataField: "PLANMIKTAR",
                    caption: "Planlanan Miktar",
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
                            icon: "file",
                            text: "DETAYLAR",
                            onClick: function (e) 
                            {
                                GetDetail(e.row.data)
                            }
                        },
                        {
                            icon: "print",
                            text: "ETİKES BAS",
                            onClick: function (e) 
                            {
                                GetDetail(e.row.data)
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
            onSelectionChanged: function(selectedItems) 
            {
                $scope.SelectedData = [];
                for (let i = 0; i < selectedItems.selectedRowsData.length; i++) 
                {
                    $scope.SelectedData.push(selectedItems.selectedRowsData[i]);
                }
            },
            onRowPrepared(e) 
            {  
                if (e.rowType == 'data' && e.data.DURUM == 0 && e.data.SPECIAL == "" )  
                {  
                    e.rowElement.css("background-color", "#FFFF00"); //BEKLEYEN İŞ EMİRLERİ
                }
                else if(e.rowType == 'data' && e.data.DURUM == 0 && e.data.SPECIAL != "")
                {
                    e.rowElement.css("background-color", "#87bdd8"); //PLANLANMIŞ İŞ EMİRLERİ
                }
                else if(e.rowType == 'data'  && e.data.DURUM == 1)
                {
                    e.rowElement.css("background-color", "#ADFF2F"); //AKTİF İŞ EMİRLERİ
                }
                else if(e.rowType == 'data' && e.data.DURUM == 2)
                {
                    e.rowElement.css("background-color", "#eea29a"); //KAPANMIŞ İŞ EMİRLERİ
                }
            },
        }).dxDataGrid("instance");
    }
    function AcikIsEmriGrid(pData)
    {
        $("#TblAcikIsEmirleri").dxDataGrid({
            height: 640,
            dataSource: pData,
            columnsAutoWidth: true,
            showBorders: true,
            sorting: {
                mode: "none"
            },
            selection: {
                mode: "multiple"
            },
            showBorders: true,
            filterRow: 
            {
                visible: true,
                applyFilter: "auto"
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
                dataField: "SIPARISNO",
                caption: "Sipariş No",
                alignment: "center"
            },
            {
                width: 150,
                dataField: "IS_EMRI_ACILIS_TARIH",
                caption: "Açılış Tarihi",
                alignment: "center"
            }, 
            {
                width: 150,
                dataField: "IS_EMRI_AKTIFLESTIRME_TARIH",
                caption: "Aktifleştirme Tarihi",
                alignment: "center"
            },
            {
                width: 150,
                dataField: "IS_EMRI_PLANLAMA_TARIH",
                caption: "Planlama Tarihi",
                alignment: "center"
            },
            {
                width: 150,
                dataField: "KODU",
                caption: "İş Emri No",
                alignment: "center"
            }, 
            {
                width: 200,
                dataField: "PLANMIKTAR",
                caption: "Planlanan Miktar",
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
                        icon: "file",
                        text: "DETAYLAR",
                        onClick: function (e) 
                        {
                            GetDetail(e.row.data)
                        }
                    },
                    {
                        icon: "print",
                        text: "ETİKES BAS",
                        onClick: function (e) 
                        {
                            GetDetail(e.row.data)
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
            onSelectionChanged: function(selectedItems) 
            {
                $scope.SelectedData = [];
                for (let i = 0; i < selectedItems.selectedRowsData.length; i++) 
                {
                    $scope.SelectedData.push(selectedItems.selectedRowsData[i]);
                }
            },
        }).dxDataGrid("instance");
    }
    function PlanlananEmriGrid(pData)
    {
        $("#TblPlanlananIsEmirleri").dxDataGrid({
            height: 640,
            dataSource: pData,
            columnsAutoWidth: true,
            showBorders: true,
            sorting: {
                mode: "none"
            },
            showBorders: true,
            filterRow: 
            {
                visible: true,
                applyFilter: "auto"
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
            rowDragging: 
            {
                allowReordering: true,
                onReorder: function(e) 
                {
                    var visibleRows = e.component.getVisibleRows(),
                    toIndex = pData.indexOf(visibleRows[e.toIndex].data),
                    fromIndex = pData.indexOf(e.itemData);
                    pData.splice(fromIndex, 1);
                    pData.splice(toIndex, 0, e.itemData);
                    e.component.refresh();
                    $scope.SiralamaList = pData;

                    console.log($scope.SiralamaList)
                }
            },
            columns: [
                {
                    dataField: "SIPARISNO",
                    caption: "Sipariş No",
                    alignment: "center"
                },
                {
                    dataField: "ISTASYONSIRA",
                    caption: "Istasyon Sıra",
                    alignment: "center"
                },
                {
                    width: 150,
                    dataField: "IS_EMRI_ACILIS_TARIH",
                    caption: "Açılış Tarihi",
                    alignment: "center"
                }, 
                {
                    width: 150,
                    dataField: "IS_EMRI_AKTIFLESTIRME_TARIH",
                    caption: "Aktifleştirme Tarihi",
                    alignment: "center"
                },
                {
                    width: 150,
                    dataField: "IS_EMRI_PLANLAMA_TARIH",
                    caption: "Planlama Tarihi",
                    alignment: "center"
                },
                {
                    width: 150,
                    dataField: "KODU",
                    caption: "İş Emri No",
                    alignment: "center"
                }, 
                {
                    width: 200,
                    dataField: "PLANMIKTAR",
                    caption: "Planlanan Miktar",
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
        }).dxDataGrid("instance");
    }
    async function GetDetail(pData)
    {
        $('#MdlIsEmriDetay').modal('show')
        $scope.IsEmriIstasyonList = await GetIsEmriIstasyonlari(pData.KODU);

        $scope.IsEmriDetay.Kodu = pData.KODU
        $scope.IsEmriDetay.Adi = pData.ADI
        $scope.IsEmriDetay.Miktar = pData.PLANMIKTAR
        $scope.IsEmriDetay.StokAdi = pData.STOKADI
        $scope.IsEmriDetay.StokKodu = pData.STOKKODU
        $scope.IsEmriDetay.OLUSTURAN_KULLANICI = pData.OLUSTURAN_KULLANICI
        $scope.IsEmriDetay.IS_EMRI_ACILIS_TARIH = pData.IS_EMRI_ACILIS_TARIH
        $scope.IsEmriDetay.IS_EMRI_AKTIFLESTIRME_TARIH = pData.IS_EMRI_AKTIFLESTIRME_TARIH
        $scope.IsEmriDetay.IS_EMRI_PLANLAMA_TARIH = pData.IS_EMRI_PLANLAMA_TARIH
        $scope.IsEmriDetay.ONAYDURUMU = pData.ONAYDURUMU
        $scope.IsEmriDetay.ONCELIK = pData.ONCELIK
    }
    function GetIsEmriIstasyonlari(pKod)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT " +
                        "Op_Aciklama AS ACIKLAMA, " +
                        "Op_Kodu AS KODU " +
                        "FROM URETIM_ROTA_PLANLARI AS ROTA " +
                        "INNER JOIN " +
                        "URETIM_OPERASYONLARI AS OP ON ROTA.RtP_OperasyonKodu = OP.Op_Kodu " +
                        "WHERE " +
                        "RtP_IsEmriKodu = @RtP_IsEmriKodu " ,
                        param : ['RtP_IsEmriKodu:string|20'],
                        value : [pKod]
            }

            let data = await srv.Execute(TmpQuery);

            resolve(data)
        });
    }
    $scope.BtnPlanla = async function()
    {
        if($scope.SelectedData.length > 0)
        {
            let infodata = [];

            for (let i = 0; i < $scope.SelectedData.length; i++) 
            {
                let IsEmriSira = 0;

                let BagliIsEmriList = await srv.Execute($scope.Firma,'BagliIsEmriGet',[$scope.SelectedData[i].KODU]); //ANA İŞ EMRİNE BAĞLI İŞ EMİRLERİ LİSTELENİYOR
                await srv.Execute($scope.Firma,'IsEmriListesiInsert',[$scope.SelectedData[i].GUID,$scope.SelectedData[i].KODU,0,0,'','','ANAISEMRI']); //ANA İŞ EMRİ LİSTE TABLOSUNA KAYIT EDİLİYOR.

                if(BagliIsEmriList.length > 0)
                {
                    for (let x = 0; x < BagliIsEmriList.length; x++) 
                    {
                        IsEmriSira = (await srv.Execute($scope.Firma,'MaxIsEmriSira',[]))[0].MAXISEMRISIRA; //ALT İŞ EMRİNE BAĞLI MAKSİMUM SIRA GETİRİLİYOR
                        let TmpData = await srv.Execute($scope.Firma,'IsEmriListesiInsert',[BagliIsEmriList[x].GUID,BagliIsEmriList[x].KODU,IsEmriSira,0,$scope.SelectedData[i].KODU,BagliIsEmriList[x].OPKODU,'ALTISEMRI']); //ALT İŞ EMRİ LİSTE TABLOSUNA KAYIT EDİLİYOR.
                        
                        if(TmpData.length == 0)
                        {
                            infodata.push(BagliIsEmriList[x].KODU)
                        }
                    }
                }
            }

            swal("Başarılı","İş Emri No : " + infodata + "\n" +"Planlama İşlemi Gerçekleştirildi.",icon="success");
            GetIsEmriMiktar();
            $scope.BtnTab(1,'TUMU')
        }
        else
        {
            swal("Dikkat", "İş Emri Planlama İşlemi İçin Listeden Seçim Yapınız.",icon="warning");
        }
    }
    $scope.BtnTab = async function(pType,pKod)
    {
        GetIsEmriMiktar();
        $scope.TabIndex = pType;

        let data = [];
        if(pType == 0)
        {
            data = await GetTumIsEmrileri(pKod);
            TumIsEmriGrid(data)
        }
        else if(pType == 1)
        {
            data = await GetAcikIsEmrileri(pKod);
            AcikIsEmriGrid(data)
        }
        else if (pType == 2)
        {
            data = await GetPlanlananIsEmrileri(pKod);
            $scope.PlanlananList = data;
            PlanlananEmriGrid(data);
        }
    }
    $scope.BtnSiralamaKaydet = async function()
    {
        if($scope.SiralamaList.length == 0 && $scope.PlanlananList.length > 0)
        {   
            $scope.SiralamaList = $scope.PlanlananList;
        }

        if($scope.SiralamaList.length > 0)
        {
            let IsEmriSira = 0;
            for (let i = 0; i < $scope.SiralamaList.length; i++) 
            {
                IsEmriSira = (await srv.Execute($scope.Firma,'MaxIsEmriIstasyonSira',[$scope.CmbIsMerkezleri.return]))[0].MAXISEMRISIRA; //ALT İŞ EMRİNE BAĞLI MAKSİMUM SIRA GETİRİLİYOR
                
                console.log($scope.SiralamaList[i].GUID)
                console.log(IsEmriSira)
                await srv.Execute($scope.Firma,'UpdateIsEmriSira',[IsEmriSira,$scope.SiralamaList[i].GUID,$scope.CmbIsMerkezleri.return]);
            }

            $scope.SiralamaList = [];
            $scope.BtnTab(2,$scope.CmbIsMerkezleri.return)
            swal("Başarılı", "İş Emri Sıralama İşlemi Başarıyla Gerçekleşti.",icon="success");
        }
        else
        {
            swal("Uyarı", "Planlama Listesinde Değişiklik Bulunamadı.",icon="warning");
        }
    }
}