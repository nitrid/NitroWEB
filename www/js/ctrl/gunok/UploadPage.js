function UploadPage($scope,srv,$rootScope,$filter)
{
    $scope.Init = async function () 
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "PDF YUKLEME";

        $scope.ImgSource = {}
        $scope.Code = ''
        $scope.FilePath = "";
      


        InitStokListe()
        $scope.StokListeGetir()
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
                            $scope.DetayClick()
                        }
                    }]
                },
                
                {
                    width: 200,
                    dataField : "KODU",
                    caption: "KODU",
                    align: "left"
                    
                },
                {
                    dataField : "ADI",
                    caption: "ADI",
                    align: "left",
                    width: 500,
                },
                {
                    width: 50,
                    dataField : "PDF",
                    caption: "PDF",
                    align: "left"
                },
                {
                    width: 100,
                    dataField : "TARIH",
                    caption: "TARIH",
                    align: "left"
                },
                {
                    width: 200,
                    dataField : "[DOSYA_YOL]",
                    caption: "[DOSYA_YOL]",
                    align: "left"
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
            " (SELECT CONVERT(varchar,UPDATE_DATE,104) FROM [GENDB_NITROWEB].dbo.TERP_NITROWEB_PDF where STOK_KOD = sto_kod COLLATE Turkish_CI_AS) AS TARIH FROM STOKLAR WHERE sto_cins <> 1" ,
        }
        let TmpResult = await srv.Execute(TmpQuery)
        $scope.StokListe = TmpResult
        $("#TblStokList").dxDataGrid("instance").option("dataSource", $scope.StokListe); 
    }
    $scope.DetayClick = function()
    {
        $('#MdlDetay').modal('show')
    }
    $scope.UploadImg = async function(pImg,pSira) 
    {
        var reader = new FileReader();

        reader.onload = function(event) 
        {
            console.log(12313)
            $scope.ImgSource.Code = $scope.Code
            $scope.ImgSource[pImg.id] = event.target.result
            $scope.$apply(function($scope) {
                $scope.files = pImg.files;
                console.log(13213)
            });

            srv.Emit("ImgUpload",$scope.ImgSource,async function(pData)
            { let TmpQuery = 
                {
                    db: "GENDB_NITROWEB",
                    query : "SELECT * FROM [TERP_NITROWEB_PDF] WHERE STOK_KOD = @STOK_KOD",
                    param :["STOK_KOD:string|50"],
                    value : [$scope.Code]
                }
                let TmpResult = await srv.Execute(TmpQuery)
                console.log(TmpResult)
                if(TmpResult.length > 0 )
                {
                    let updateQuery = 
                    {
                        db: "GENDB_NITROWEB",
                        query : "UPDATE [TERP_NITROWEB_PDF] SET [UPDATE_DATE] = GETDATE() WHERE [STOK_KOD] = @STOK_KOD ",
                        param :["STOK_KOD:string|50"],
                        value : [$scope.Code]
                    }
                    await srv.Execute(updateQuery)
                    $('#MdlDetay').modal('hide')
                    swal("Başarılı", "PDF başarıyla Güncellendi.",icon="success");
                }
                else
                {
                    
                    let updateQuery = 
                    {
                        db: "GENDB_NITROWEB",
                    query : "INSERT INTO [dbo].[TERP_NITROWEB_PDF] " +
                    "   ([GUID]  " +
                    "   ,[CREATE_DATE]  " +
                    "   ,[UPDATE_DATE]  " +
                    "   ,[STOK_KOD]  " +
                    "   ,[DOSYA_YOL]  " +
                    "   ,[DOSYA_ADI])  " +
                    "    VALUES  " +
                    "(NEWID()      --<GUID, uniqueidentifier,>   \n" +
                    ",GETDATE()      --<CREATE_DATE, datetime,>  \n" +
                    ",GETDATE()      --<UPDATE_DATE, datetime,>  \n" +
                    ",@STOK_KOD      --<STOK_KOD, nvarchar(50),>  \n" +
                    ",@DOSYA_YOL      --<DOSYA_YOL, nvarchar(50),>  \n" +
                    ",@DOSYA_ADI      --<DOSYA_ADI, nvarchar(50),>  \n" +
                    " ) ",
                    param : ["STOK_KOD:string|50","DOSYA_YOL:string|50","DOSYA_ADI:string|50"],
                    value : [$scope.Code,'www/upload/',$scope.Code + "-" + 1 + ".pdf"]
                    }
                    await srv.Execute(updateQuery)
                  //  let InsertKontrol = await srv.Execute($scope.Firma,'PdfInsert',[$scope.Code,'www/upload/',$scope.Code + "-" + 1 + ".pdf"]); //ANA İŞ EMRİ LİSTE TABLOSUNA KAYIT EDİLİYOR.
                    $('#MdlDetay').modal('hide')
                    swal("Başarılı", "PDF başarıyla Kayıt Edildi.",icon="success");
                }
            }) 
        }
        reader.readAsDataURL(pImg.files[0]);
    }
}