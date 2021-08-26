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
                            "UPL.upl_uretim_tuket = 1 " +
                            "GROUP BY is_DBCno " 
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
                            "WHERE " +
                            "UPL.upl_uretim_tuket = 1 AND ISM.is_EmriDurumu = 0 AND ISM.is_special3 = '' " +
                            "GROUP BY is_DBCno " 
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
                            "WHERE " +
                            "UPL.upl_uretim_tuket = 1 AND ISM.is_special3 <> '' AND ISM.is_EmriDurumu = 0 " +
                            "GROUP BY is_DBCno " 
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
                        "is_Guid AS GUID, " +
                        "is_Kod AS KODU, " +
                        "is_Ismi AS ADI, " +
                        "UPL.upl_miktar - ISNULL((SELECT TOP 1 ish_uret_miktar FROM ISEMRI_MALZEME_DURUMLARI WHERE ish_isemri = is_Kod and ish_plan_sevkmiktar = 0),0) AS PLANMIKTAR, " + 
                        "UPL.upl_kodu AS STOKKODU, " +
                        "ISNULL((SELECT sto_isim  FROM STOKLAR WHERE sto_kod =  UPL.upl_kodu),'') AS STOKADI, " +
                        "ISNULL(ROTA.RtP_OperasyonKodu,'') AS OPERASYONKODU " +
                        "FROM ISEMIRLERI AS ISM " +
                        "INNER JOIN URETIM_MALZEME_PLANLAMA AS UPL ON ISM.is_Kod =  UPL.upl_isemri " +
                        "LEFT OUTER JOIN URETIM_ROTA_PLANLARI AS ROTA ON ISM.is_Kod = ROTA.RtP_IsEmriKodu " +
                        "WHERE " +
                        "(SELECT TOP 1 (ish_planuretim - ish_uret_miktar) FROM ISEMRI_MALZEME_DURUMLARI WHERE ish_isemri = ISM.is_Kod and ish_plan_sevkmiktar = 0) > 0  AND " +
                        "UPL.upl_uretim_tuket = 1 AND " +
                        "((ROTA.RtP_OperasyonKodu = @RtP_OperasyonKodu) OR (@RtP_OperasyonKodu = 'TUMU')) " ,
                param : ['RtP_OperasyonKodu:string|20'],
                value : [pKod]
            }

            let UrunData = $filter('groupBy')((await srv.Execute(TmpQuery)), 'KODU'); //GRUPLAMA İŞLEMİ
            let Data = [];

            for (let i = 0; i < Object.values(UrunData).length; i++) 
            {
                Data.push(Object.values(UrunData)[i][0]);
            }
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
                        "is_Guid AS GUID, " +
                        "is_Kod AS KODU, " +
                        "is_Ismi AS ADI, " +
                        "UPL.upl_miktar - ISNULL((SELECT TOP 1 ish_uret_miktar FROM ISEMRI_MALZEME_DURUMLARI WHERE ish_isemri = is_Kod and ish_plan_sevkmiktar = 0),0) AS PLANMIKTAR, " + 
                        "UPL.upl_kodu AS STOKKODU, " +
                        "ISNULL((SELECT sto_isim  FROM STOKLAR WHERE sto_kod =  UPL.upl_kodu),'') AS STOKADI, " +
                        "ISNULL(ROTA.RtP_OperasyonKodu,'') AS OPERASYONKODU " +
                        "FROM ISEMIRLERI AS ISM " +
                        "INNER JOIN URETIM_MALZEME_PLANLAMA AS UPL ON ISM.is_Kod =  UPL.upl_isemri " +
                        "LEFT OUTER JOIN URETIM_ROTA_PLANLARI AS ROTA ON ISM.is_Kod = ROTA.RtP_IsEmriKodu " +
                        "WHERE " +
                        "(SELECT TOP 1 (ish_planuretim - ish_uret_miktar) FROM ISEMRI_MALZEME_DURUMLARI WHERE ish_isemri = ISM.is_Kod and ish_plan_sevkmiktar = 0) > 0  AND " +
                        "UPL.upl_uretim_tuket = 1 AND " +
                        "ISM.is_EmriDurumu = 0 AND " +
                        "ISM.is_special3 = '' AND " +
                        "((ROTA.RtP_OperasyonKodu = @RtP_OperasyonKodu) OR (@RtP_OperasyonKodu = 'TUMU')) " ,
                        param : ['RtP_OperasyonKodu:string|20'],
                        value : [pKod]
            }

            let UrunData = $filter('groupBy')((await srv.Execute(TmpQuery)), 'KODU'); //GRUPLAMA İŞLEMİ
            let Data = [];

            for (let i = 0; i < Object.values(UrunData).length; i++) 
            {
                Data.push(Object.values(UrunData)[i][0]);
            }
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
                        "is_Guid AS GUID, " +
                        "is_Kod AS KODU, " +
                        "is_Ismi AS ADI, " +
                        "ISM.is_special3 AS SIRA, " +
                        "UPL.upl_miktar - ISNULL((SELECT TOP 1 ish_uret_miktar FROM ISEMRI_MALZEME_DURUMLARI WHERE ish_isemri = is_Kod and ish_plan_sevkmiktar = 0),0) AS PLANMIKTAR, " + 
                        "UPL.upl_kodu AS STOKKODU, " +
                        "ISNULL((SELECT sto_isim  FROM STOKLAR WHERE sto_kod =  UPL.upl_kodu),'') AS STOKADI, " +
                        "ISNULL(ROTA.RtP_OperasyonKodu,'') AS OPERASYONKODU " +
                        "FROM ISEMIRLERI AS ISM " +
                        "INNER JOIN URETIM_MALZEME_PLANLAMA AS UPL ON ISM.is_Kod =  UPL.upl_isemri " +
                        "LEFT OUTER JOIN URETIM_ROTA_PLANLARI AS ROTA ON ISM.is_Kod = ROTA.RtP_IsEmriKodu " +
                        "WHERE " +
                        "(SELECT TOP 1 (ish_planuretim - ish_uret_miktar) FROM ISEMRI_MALZEME_DURUMLARI WHERE ish_isemri = ISM.is_Kod and ish_plan_sevkmiktar = 0) > 0  AND " +
                        "UPL.upl_uretim_tuket = 1 AND " +
                        "ISM.is_EmriDurumu = 0 AND " +
                        "ISM.is_special3 <> '' AND" +
                        "((ROTA.RtP_OperasyonKodu = @RtP_OperasyonKodu) OR (@RtP_OperasyonKodu = 'TUMU')) ORDER BY CONVERT(int,is_special3) " ,
                        param : ['RtP_OperasyonKodu:string|20'],
                        value : [pKod]
            }

            let UrunData = $filter('groupBy')((await srv.Execute(TmpQuery)), 'KODU'); //GRUPLAMA İŞLEMİ
            let Data = [];

            for (let i = 0; i < Object.values(UrunData).length; i++) 
            {
                Data.push(Object.values(UrunData)[i][0]);
            }
            if(Data.length == 0)
            {
                swal("Uyarı", "Gösterilecek Veri Bulunamadı.",icon="warning");
            }

            resolve(Data)
        });
    }
    async function UpdatePlanlananIsEmri(pSira,pGuid)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "UPDATE ISEMIRLERI SET is_special3 = @is_special3 WHERE is_Guid = @is_Guid ",
                param : ["is_special3:string|15","is_Guid:string|50"],
                value : [pSira,pGuid]
            }

            resolve(await srv.Execute(TmpQuery))
        });
    }
    async function MaxIsEmriSira()
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT ISNULL(MAX(CONVERT(int,is_special3)),0) + 1 AS MAXISEMRISIRA FROM ISEMIRLERI "
            }

            resolve((await srv.Execute(TmpQuery))[0].MAXISEMRISIRA)
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
            columns: 
            [
            {
                width: 150,
                dataField: "KODU",
                caption: "İş Emri No",
                alignment: "center"
            }, 
            {
                dataField: "ADI",
                caption: "İş Emri Adı",
                alignment: "center"
            },
            {
                width: 100,
                dataField: "PLANMIKTAR",
                caption: "Miktar",
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
                width: 150,
                dataField: "KODU",
                caption: "İş Emri No",
                alignment: "center"
            }, 
            {
                dataField: "ADI",
                caption: "İş Emri Adı",
                alignment: "center"
            },
            {
                width: 100,
                dataField: "PLANMIKTAR",
                caption: "Miktar",
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
            rowDragging: {
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
                }
            },
            columns: [
            {
                width: 100,
                dataField: "SIRA",
                caption: "SIRA",
                alignment: "center"
            }, 
            {
                width: 150,
                dataField: "KODU",
                caption: "İş Emri No",
                alignment: "center"
            }, 
            {
                dataField: "ADI",
                caption: "İş Emri Adı",
                alignment: "center"
            },
            {
                width: 100,
                dataField: "PLANMIKTAR",
                caption: "Miktar",
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
                ]
            }],
        }).dxDataGrid("instance");
    }
    function GetDetail(pData)
    {
        $('#MdlIsEmriDetay').modal('show')
        $scope.IsEmriDetay.Kodu = pData.KODU
        $scope.IsEmriDetay.Adi = pData.ADI
        $scope.IsEmriDetay.Miktar = pData.PLANMIKTAR
        $scope.IsEmriDetay.StokAdi = pData.STOKADI
        $scope.IsEmriDetay.StokKodu = pData.STOKKODU
    }
    $scope.BtnPlanla = async function()
    {
        if($scope.SelectedData.length > 0)
        {
            let infodata = [];
            for (let i = 0; i < $scope.SelectedData.length; i++) 
            {
                let TmpQuery = 
                {
                    db: "{M}." + $scope.Firma,
                    query : "UPDATE ISEMIRLERI SET is_special3 = '0' WHERE is_Guid = @GUID ",
                    param : ['GUID:string|50'],
                    value : [$scope.SelectedData[i].GUID]
                }

                let TmpData = await srv.Execute(TmpQuery)
                if(TmpData.length == 0)
                {
                    infodata.push($scope.SelectedData[i].ADI)
                }
            }

            swal("Başarılı", "İş Emri No : " + infodata + "\n" +"Planlama İşlemi Gerçekleştirildi.",icon="success");
            GetIsEmriMiktar();
            PlanlananEmriGrid(0,'');
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
            PlanlananEmriGrid(data);
        }
    }
    $scope.BtnSiralamaKaydet = async function()
    {
        if($scope.SiralamaList.length > 0)
        {
            let sira = 0
            for (let i = 0; i < $scope.SiralamaList.length; i++) 
            {
                sira = await MaxIsEmriSira();
                await UpdatePlanlananIsEmri(sira,$scope.SiralamaList[i].GUID);
                $scope.BtnTab(2,'TUMU');
            }

            swal("Başarılı", "İş Emri Sıralama İşlemi Başarıyla Gerçekleşti.",icon="success");
        }
        else
        {
            swal("Uyarı", "Planlama Listesinde Değişiklik Bulunamadı.",icon="warning");
        }
    }
}