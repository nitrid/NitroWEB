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
                            $scope.DetayClick(e.row.data)
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
                {
                    dataField : "PDF",
                    caption: "PDF",
                    align: "center"
                },
                {
                    dataField : "TARIH",
                    caption: "TARIH",
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
            ],
          
        });
    }
    $scope.StokListeGetir = async function()
    {
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query : "SELECT sto_isim AS ADI, sto_kod AS KODU,ISNULL((SELECT 'VAR' FROM [GENDB_NITROWEB].dbo.TERP_NITROWEB_PDF where STOK_KOD = sto_kod COLLATE Turkish_CI_AS),'YOK') AS PDF, " +
            " (SELECT CONVERT(varchar,UPDATE_DATE,104) FROM [GENDB_NITROWEB].dbo.TERP_NITROWEB_PDF where STOK_KOD = sto_kod COLLATE Turkish_CI_AS) AS TARIH FROM STOKLAR " ,
        }
        let TmpResult = await srv.Execute(TmpQuery)
        $scope.StokListe = TmpResult
        console.log($scope.StokListe)
        $("#TblStokList").dxDataGrid("instance").option("dataSource", $scope.StokListe); 
    }
    $scope.DetayClick = async function(e)
    {
       let TmpQuery = 
      {
          db: "GENDB_NITROWEB",
          query : "SELECT CODE AS CODE ,SHORT AS SHORT, DOC_NAME AS DOC_NAME,URL AS URL, GUID AS GUID FROM  TERP_NITROWEB_IMAGE WHERE CODE =@CODE ",
          param :["CODE:string|50"],
          value : [$scope.Code]
      }
      let TmpResult = await srv.Execute(TmpQuery)
      $scope.ImageList = TmpResult
      InitImageGrid()
       $scope.StokDetay  = e
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

            console.log($scope.ImgSource)
            srv.Emit("ImgUpload",$scope.ImgSource,function(pData)
            {
               
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
        console.log(TmpResult[0].SHORT_ID)
        $scope.UploadImg($scope.ImageDetail,TmpResult[0].SHORT_ID)
                         
    }
    $scope.ImageGet = function(pImage)
    {
      $scope.ImageDetail = pImage
    }    
  }