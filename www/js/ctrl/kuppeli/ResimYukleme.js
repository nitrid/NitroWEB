function ResimYukleme($scope,srv,$rootScope,$filter)
{      
    $scope.Init = async function () 
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "RESIM YUKLEME";

        $scope.ImgSource = {}
        $scope.Code = ''
        $scope.FilePath = "";
        $scope.StokDetay = []
        $scope.SiralamaList = []
        $scope.ImageDetail = ''

        InitStokListe()
        // InitImageGrid()

        $scope.StokListeGetir()
        $("#TbStok").addClass('active');
        $("#TbResim").removeClass('active');
    }
    function InitStokListe()
    {
        $("#TblStokList").dxDataGrid
        ({
            dataSource: $scope.StokListe,
            columnMinWidth: 50,
            columnAutoWidth: true,
            showBorders: true,
            filtering: true,
            sorting: true,
            summary: true,
            grouping: true,
            groupPaging : true,
            filterRow: 
            {
                visible: true,
                applyFilter: "auto"
            },
            selection: 
            {
                mode: "single"
            },
            headerFilter: 
            {
                visible: true
            },
            scrolling: 
            {
                columnRenderingMode: "horizontal"
            },
            onCellClick: function(e) 
            {  
                if(e.columnIndex == 4)
                {
                   
                   $scope.PreviewImage = "http://kuppeli.shop/upload/product/picture/" + e.key.DOC_NAME + ".jpg";
                   $('#PreviewImg').modal('show');
                   $rootScope.$apply()
                }
            },
            columns: 
            [
                {      
                    caption: "DÜZENLE",
                    width: 90,
                    type: "buttons",
                    buttons: [ {
                        text: "DÜZENLE",
                        icon: "edit",
                        onClick: function (e) {
                            $scope.Code = e.row.data.KODU
                            $scope.StokDetay  = e.row.data
                            $scope.DetayClick()
                        }
                    }]
                },
                {
                    dataField : "ADI",
                    caption: "ADI",
                    align: "center",
                },
                {
                    dataField : "KODU",
                    caption: "KODU",
                    align: "center",
                    width: 120,
                },
                {
                    dataField : "RESIMVAR",
                    caption: "RESIM",
                    align: "center",
                    width: 90,
                },
                {
                    caption: 'RESIM',
                    cellTemplate: function(cellElement, cellInfo) {   
                        $("<div>")
                        .append($("<img>", { "src": "http://kuppeli.shop/upload/product/picture/" + cellInfo.row.data.DOC_NAME + ".jpg", "class":"img-fluid", "onerror":"this.onerror=null; this.src='../../../../upload/resim_yok.jpg'"}))
                        .appendTo(cellElement);
                    },
                    width : "150",
                },
            ],
        });
    }
    function InitImageGrid()
    {
        $("#TblImageGrid").dxDataGrid
        ({
            dataSource: $scope.ImageList,
            columnMinWidth: 50,
            columnAutoWidth: false,
            showBorders: true,
            filtering: true,
            sorting: true,
            summary: true,
            grouping: true,
            groupPaging : true,
            editing: {
                mode: "row",
                allowUpdating: true,
                allowDeleting: true,
                useIcons: true
            },
            filterRow: 
            {
                visible: true,
                applyFilter: "auto"
            },
            selection: 
            {
                mode: "single"
            },
            headerFilter: 
            {
                visible: true
            },
            scrolling: 
            {
                columnRenderingMode: "horizontal"
            },
            onRowRemoved: async function(e) 
            {
                await ResimDelete(e.data)
            },
            rowDragging: 
            {
                allowReordering: true,
                onReorder: function(e) 
                {
                    var visibleRows = e.component.getVisibleRows(),
                    toIndex = $scope.ImageList.indexOf(visibleRows[e.toIndex].data),
                    fromIndex = $scope.ImageList.indexOf(e.itemData);
                    $scope.ImageList.splice(fromIndex, 1);
                    $scope.ImageList.splice(toIndex, 0, e.itemData);
                    e.component.refresh();
                    $scope.SiralamaList = $scope.ImageList;
                }
            },
            onCellClick: function(e) 
            {  
                if(e.columnIndex == 2)
                {
                   
                   $scope.PreviewImage = "http://kuppeli.shop/upload/product/picture/" + e.key.DOC_NAME + ".jpg";
                   $('#PreviewImg').modal('show');
                   $rootScope.$apply()
                }
            },
            columns: 
            [
                {
                    dataField : "SHORT",
                    caption: "SIRA",
                    align: "center",
                },
                {
                    caption: 'RESİM',
                    cellTemplate: function(cellElement, cellInfo) {   
                        $("<div>")
                        .append($("<img>", { "src": "http://kuppeli.shop/upload/product/picture/" + cellInfo.row.data.DOC_NAME + ".jpg", "class":"img-fluid", "onerror":"this.onerror=null; this.src='../../../../../../www/upload/resim_yok.jpg'"}))
                        .appendTo(cellElement);
                    },
                    width : "150",
                },
                {
                    caption: 'RESMİ SİL',
                    type: "buttons",
                    width: 110,
                    buttons: [ "delete",{
                        onClick: function(e) {
                            var clonedItem = angular.copy(e.row.data);
    
                            clonedItem.ID = ++maxID;
                            employees.splice(e.row.rowIndex, 0, clonedItem);
                            e.component.refresh(true);
                            e.event.preventDefault();
                        }
                    }]
                },
            ],
          
        });
    }
    ResimDelete = async function(pData)
    {
        let TmpQuery = 
        {
          db: "GENDB_NITROWEB",
          query : "DELETE FROM  TERP_NITROWEB_IMAGE WHERE GUID =@GUID ",
          param :["GUID:string|50"],
          value : [pData.GUID]
        }
        let TmpResult = await srv.Execute(TmpQuery)
        srv.Emit("ImgDelete",pData.DOC_NAME,function(pData)
        {
            swal("Uyarı", "Silme İşlemi Gerçekleştirildi..",icon="warning");
        }) 
    }
    $scope.StokListeGetir = async function()
    {
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query : "SELECT sto_isim AS ADI, sto_kod AS KODU, ISNULL((SELECT TOP 1 DOC_NAME FROM [GENDB_NITROWEB].dbo.TERP_NITROWEB_IMAGE WHERE CODE = sto_kod COLLATE Turkish_CI_AS ORDER BY SHORT),'image-not-found') AS DOC_NAME, " +
            "ISNULL((SELECT TOP 1 'VAR' FROM [GENDB_NITROWEB].dbo.TERP_NITROWEB_IMAGE WHERE CODE = sto_kod COLLATE Turkish_CI_AS),'YOK') AS RESIMVAR FROM STOKLAR " ,
        }
        let TmpResult = await srv.Execute(TmpQuery)
        console.log()
        $scope.StokListe = TmpResult
        $("#TblStokList").dxDataGrid("instance").option("dataSource", $scope.StokListe); 
    }
    $scope.DetayClick = async function()
    {
        let TmpQuery = 
        {
            db: "GENDB_NITROWEB",
            query : "SELECT CODE AS CODE ,SHORT AS SHORT, DOC_NAME AS DOC_NAME,URL AS URL, GUID AS GUID FROM  TERP_NITROWEB_IMAGE WHERE CODE =@CODE ORDER BY SHORT",
            param :["CODE:string|50"],
            value : [$scope.Code]
        }
        let TmpResult = await srv.Execute(TmpQuery)
        $scope.ImageList = TmpResult
        InitImageGrid()

        $("#TbResim").addClass('active');
        $("#TbStok"). removeClass('active');
    }
    $scope.UploadImg = function(pImg,pSira) 
    {
        for(let i = 0; i < pImg.files.length; i++)
        {
            var reader = new FileReader();

            reader.onload = function(event) 
            {
                $scope.ImgSource = {}

                $scope.ImgSource.Code = $scope.Code
                $scope.ImgSource.Short = pSira + i

                $scope.ImgSource[pImg.id] = event.target.result
                
                srv.Emit("ImgUpload",$scope.ImgSource,function(pData)
                {
                    $scope.ImageDetail = ''
                    $scope.DetayClick()
                }) 
            }
            reader.readAsDataURL(pImg.files[i]);
        }
    }
    $scope.BtnGeri = function()
    {
        $("#TbStok").addClass('active');
        $("#TbResim").removeClass('active');
    }
    $scope.BtnFotografKaydet= async function()
    {   
        if($scope.ImageDetail == '')
        {
            swal("Uyarı", "Lütfen Resim Seçiniz.",icon="warning");
            return
        }
        let TmpQuery = 
        {
            db: "GENDB_NITROWEB",
            query : "SELECT ISNULL(MAX(SHORT),0)+1 AS SHORT_ID FROM TERP_NITROWEB_IMAGE WHERE CODE= @CODE",
            param :["CODE:string|50"],
            value : [$scope.Code]
        }
          
        let TmpResult = await srv.Execute(TmpQuery)
        for(let i = 0; i < $scope.ImageDetail.files.length; i++)
        {
            TmpSort = TmpResult[0].SHORT_ID + i
            let TmpInsertData = 
            [
                $rootScope.GeneralParamList.MikroId,
                $rootScope.GeneralParamList.MikroId,
                $scope.StokDetay.KODU,
                '',
                TmpSort,
                $scope.StokDetay.KODU+'-'+TmpSort
                
            ]
            let InsertKontrol = await srv.Execute($scope.Firma,'FotografInsert',TmpInsertData);
        }
        $scope.UploadImg($scope.ImageDetail,TmpResult[0].SHORT_ID)
    }
    $scope.ImageGet = function(pImage)
    {
        $scope.ImageDetail = pImage
        $scope.BtnFotografKaydet()
    }
    $scope.SiralamaKaydet = async  function()
    {
        for (let i = 0; i < $scope.SiralamaList.length; i++)
        {
            let TmpQuery = 
            {
                db: "GENDB_NITROWEB",
                query : "UPDATE TERP_NITROWEB_IMAGE SET SHORT = @SHORT WHERE GUID = @GUID",
                param :['SHORT:int','GUID:string|50'],
                value : [(i+1),$scope.SiralamaList[i].GUID]
            }
              
            let TmpResult = await srv.Execute(TmpQuery)
        }
       
    } 
    $scope.UrunAra = async function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT sto_isim AS ADI, sto_kod AS KODU, " +
                        "sto_model_kodu AS MODEL_KODU, " +
                        "ISNULL((SELECT TOP 1 DOC_NAME FROM [GENDB_NITROWEB].dbo.TERP_NITROWEB_IMAGE WHERE CODE = sto_kod COLLATE Turkish_CI_AS ORDER BY SHORT),'image-not-found') AS DOC_NAME, " +
                        "ISNULL((SELECT TOP 1 'VAR' FROM [GENDB_NITROWEB].dbo.TERP_NITROWEB_IMAGE WHERE CODE = sto_kod COLLATE Turkish_CI_AS),'YOK') AS RESIMVAR FROM STOKLAR " +
                        "WHERE " +
                        "( ((UPPER(sto_isim) LIKE UPPER('%' + @TXT_SEARCH + '%')) OR (UPPER(@TXT_SEARCH) = '')) OR " +
                        "((UPPER(sto_kod) LIKE UPPER('%' + @TXT_SEARCH + '%')) OR (UPPER(@TXT_SEARCH) = '')) OR " +
                        "((UPPER(sto_model_kodu) LIKE UPPER('%' + @TXT_SEARCH + '%')) OR (UPPER(@TXT_SEARCH) = '')) ) ",
                param :["TXT_SEARCH:string|150"],
                value : [$scope.TxtSearch]
            }
            let TmpResult = await srv.Execute(TmpQuery)
            $scope.StokListe = TmpResult
            $("#TblStokList").dxDataGrid("instance").option("dataSource", $scope.StokListe); 
        }
    }   
}