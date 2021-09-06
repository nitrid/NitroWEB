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

        $scope.SelectedRow = [];
        $scope.IsEmriDetay = {};

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

        await GetPlanlananIsEmrileri('TUMU');
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
                        "CONVERT(varchar,is_BaslangicTarihi,102) AS IS_EMRI_ACILIS_TARIH, " +
                        "CONVERT(varchar,is_Emri_AktiflesmeTarihi,102) AS IS_EMRI_AKTIFLESTIRME_TARIH, " +
                        "CONVERT(varchar,is_Emri_PlanBaslamaTarihi,102) AS IS_EMRI_PLANLAMA_TARIH, " +
                        "ISNULL((SELECT User_name FROM MikroDB_V16.dbo.KULLANICILAR WHERE User_no = is_create_user),'VERI BULUNAMADI') AS OLUSTURAN_KULLANICI, " +
                        "is_Guid AS GUID, " +
                        "is_Kod AS KODU, " +
                        "is_Ismi AS ADI, " +
                        "is_EmriDurumu AS DURUM, " +
                        "TERP.ISEMRI_SIRA AS ISEMRISIRA, " +
                        "TERP.ISEMRI_ISTASYON_SIRA AS ISTASYONSIRA, " +
                        "UPL.upl_miktar - ISNULL((SELECT TOP 1 ish_uret_miktar FROM ISEMRI_MALZEME_DURUMLARI WHERE ish_isemri = is_Kod and ish_plan_sevkmiktar = 0),0) AS PLANMIKTAR, " +
                        "(ROTA.RtP_TamamlananMiktar) AS TAMAMLANANMIKTAR, " +
                        "UPL.upl_kodu AS STOKKODU, " +
                        "ISNULL((SELECT TOP 1 bar_kodu FROM BARKOD_TANIMLARI WHERE bar_stokkodu = UPL.upl_kodu),'') AS BARKOD, " + 
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
                        "ISM.is_EmriDurumu IN(0,1) AND " +
                        "((ROTA.RtP_OperasyonKodu = @RtP_OperasyonKodu) OR (@RtP_OperasyonKodu = 'TUMU')) AND " +
                        "((TERP.ISEMRI_ISTASYON_KOD = @RtP_OperasyonKodu) OR (@RtP_OperasyonKodu = 'TUMU')) AND " +
                        "ISM.is_Onayli_fl = @is_Onayli_fl AND  " +
                        "TERP.SPECIAL = 'ALTISEMRI' " +
                        "ORDER BY CONVERT(int,TERP.ISEMRI_ISTASYON_SIRA),CONVERT(int,TERP.ISEMRI_SIRA) " ,
                        param : ['RtP_OperasyonKodu:string|20','is_Onayli_fl:string|5'],
                        value : [pKod,$rootScope.GeneralParamList.IsEmriOnayDurumu]
            }

            let Data = await srv.Execute(TmpQuery); //GRUPLAMA İŞLEMİ

            if(Data.length == 0)
            {
                swal("Uyarı", "Gösterilecek Veri Bulunamadı.",icon="warning");
            }

            PlanlananEmriGrid(Data);
            resolve()
        });
    }
    function PlanlananEmriGrid(pData)
    {
        $("#TblPlanlananIsEmirleri").dxDataGrid({
            height: 640,
            dataSource: pData,
            columnMinWidth: 200,
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
                    dataField: "ISTASYONSIRA",
                    caption: "Istasyon Sıra",
                    alignment: "center"
                },
                {
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
                    width: 200,
                    dataField: "PLANMIKTAR",
                    caption: "Planlanan Miktar",
                    alignment: "center"
                },
                {
                    width: 200,
                    dataField: "TAMAMLANANMIKTAR",
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
                    e.cellElement.css("background-color", "#FFFFFF");
                }
            },
            onSelectionChanged: function(e) 
            {
                e.component.repaint();
            },
            onRowPrepared(e) 
            {  
                if (e.rowType == 'data' && e.data.DURUM == 0)  
                {  
                    e.rowElement.css("background-color", "#87bdd8"); //PLANLANAN İŞ EMİRLERİ
                }
                else if(e.rowType == 'data'  && e.data.DURUM == 1)
                {
                    e.rowElement.css("background-color", "#FFFF00"); //AKTİF İŞ EMİRLERİ
                }
                else if(e.rowType == 'data' && e.data.DURUM == 2)
                {
                    e.rowElement.css("background-color", "#eea29a"); //KAPANMIŞ İŞ EMİRLERİ
                }
            },
            onSelectionChanged: function (selectedItems) 
            {
                $scope.SelectedRow = selectedItems.selectedRowsData[0];
            }
        }).dxDataGrid("instance");
    }
    async function EtiketInsert()
    {
        let InsertData = 
        [
            $rootScope.GeneralParamList.MikroId,                                         //CREATE_USER
            $rootScope.GeneralParamList.MikroId,                                         //LASTUP_USER
            '',                                                                          //SPECIAL1
            $scope.EtkSeri,                                                              //SERI
            $scope.EtkSira,                                                              //SIRA
            '',                                                                          //AÇIKLAMA
            '',                                                                          //BELGENO
            0,                                                                           //ETİKETTİP
            0,                                                                           //BASİMTİPİ
            $scope.UrunAdet,                                                             //BASİMADET
            1,                                                                           //DEPONO
            $scope.SelectedRow.STOKKODU,                                                 //STOKKODU
            1,                                                                           //RENKKODU
            1,                                                                           //BEDENKODU
            $scope.SelectedRow.BARKOD + ($scope.UrunAdet).toString().padStart(5, '0'),   //BARKOD
            $scope.BasimMiktar                                                           //BASILACAKMIKTAR
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
            if($scope.SelectedRow.BARKOD == "")
            {
                swal("Uyarı", "Seçmiş Olduğunuz Satırın Barkod Bilgisi Bulunamadı.",icon="warning");
                return;
            }
            await EtiketInsert();
            $('#MdlEtiketYazdir').modal('hide')
        }
    }
}