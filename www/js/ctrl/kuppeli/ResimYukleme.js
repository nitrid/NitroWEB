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
        InitImageGrid()

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
                    width: 200,
                },
                {
                    dataField : "KODU",
                    caption: "KODU",
                    align: "center"
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
            columnAutoWidth: true,
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
            columns: 
            [
                {
                    dataField : "SHORT",
                    caption: "SIRA",
                    align: "center",
                    width: 200,
                },
                {
                  caption: 'RESIM',
                  cellTemplate: function(cellElement, cellInfo) {   
                      $("<div>")
                      .append($("<img>", { "src": "../../../../upload/product/" + cellInfo.row.data.DOC_NAME + ".jpg", "onerror":"this.onerror=null; this.src='../../../../upload/resim_yok.jpg'", "width": "100", "height": "120"}))
                      .appendTo(cellElement);
                  },
                  width : "120",
                },
                {
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
    }
    $scope.StokListeGetir = async function()
    {
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query : "SELECT sto_isim AS ADI, sto_kod AS KODU " +
            " FROM STOKLAR " ,
        }
        let TmpResult = await srv.Execute(TmpQuery)
        $scope.StokListe = TmpResult
        console.log($scope.StokListe)
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
        var reader = new FileReader();

        reader.onload = function(event) 
        {
            $scope.ImgSource.Code = $scope.Code
            $scope.ImgSource.Short = pSira
            $scope.ImgSource[pImg.id] = event.target.result
            $scope.$apply(function($scope) {
                $scope.files = pImg.files;
            });

            srv.Emit("ImgUpload",$scope.ImgSource,function(pData)
            {
                $scope.ImageDetail = ''
                $scope.DetayClick()
            }) 
        }
        reader.readAsDataURL(pImg.files[0]);
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
        let TmpInsertData = 
        [
            $rootScope.GeneralParamList.MikroId,
            $rootScope.GeneralParamList.MikroId,
            $scope.StokDetay.KODU,
            '',
            TmpResult[0].SHORT_ID,
            $scope.StokDetay.KODU+'-'+TmpResult[0].SHORT_ID
           
        ]
        let InsertKontrol = await srv.Execute($scope.Firma,'FotografInsert',TmpInsertData); //ALT İŞ EMİRLERİ LİSTE TABLOSUNA KAYIT EDİLİYOR.
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
  }