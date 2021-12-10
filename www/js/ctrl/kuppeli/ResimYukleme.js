function ResimYukleme($scope,srv,$rootScope,$filter)
{
    $(() => {
        $('#file-uploader').dxFileUploader({
          name: 'file',
          accept: 'image/*',
          uploadUrl: 'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/ChunkUpload',
          chunkSize: 200000,
          onUploadStarted,
          onProgress: onUploadProgress,
        });
      });
      
      function onUploadStarted() {
        getChunkPanel().innerHTML = '';
      }
      function onUploadProgress(e) {
        getChunkPanel().appendChild(addChunkInfo(e.segmentSize, e.bytesLoaded, e.bytesTotal));
      }
      
      function addChunkInfo(segmentSize, loaded, total) {
        const result = document.createElement('DIV');
      
        result.appendChild(createSpan('Chunk size:'));
        result.appendChild(createSpan(getValueInKb(segmentSize), 'segment-size'));
        result.appendChild(createSpan(', Uploaded:'));
        result.appendChild(createSpan(getValueInKb(loaded), 'loaded-size'));
        result.appendChild(createSpan('/'));
        result.appendChild(createSpan(getValueInKb(total), 'total-size'));
      
        return result;
      }
      function getValueInKb(value) {
        return `${(value / 1024).toFixed(0)}kb`;
      }
      function createSpan(text, className) {
        const result = document.createElement('SPAN');
        if (className) { result.className = `${className} dx-theme-accent-as-text-color`; }
        result.innerText = text;
        return result;
      }
      function getChunkPanel() {
        return document.querySelector('.chunk-panel');
      }
      
    $(() => {
        $('#file-uploader').dxFileUploader({
          selectButtonText: 'Fotoğrafı Seç',
          labelText: '',
          accept: 'image/*',
          uploadMode: 'useForm',
        });
      
        $('#button').dxButton({
          text: 'Resmi Kaydet',
          type: 'success',
          onClick() {
            DevExpress.ui.dialog.alert('Uncomment the line to enable sending a form to the server.', 'Click Handler');
          },
        });
      });
      $(() => {
        $('#file-uploader-images').dxFileUploader({
          multiple: true,
          uploadMode: 'useButtons',
          uploadUrl: 'https://js.devexpress.com/Demos/NetCore/FileUploader/Upload',
          allowedFileExtensions: ['.jpg', '.jpeg', '.gif', '.png'],
        });
        $('#file-uploader-max-size').dxFileUploader({
          multiple: true,
          uploadMode: 'useButtons',
          uploadUrl: 'https://js.devexpress.com/Demos/NetCore/FileUploader/Upload',
          maxFileSize: 4000000,
        });
      });
      
    $scope.Init = async function () 
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "PDF YUKLEME";

        $scope.ImgSource = {}
        $scope.Code = ''
        $scope.FilePath = "";
        $scope.StokDetay = []

        InitStokListe()
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
    $scope.DetayClick = function(e)
    {
       $scope.StokDetay  = e
       $("#TbResim").addClass('active');
       $("#TbStok"). removeClass('active');
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
                console.log(TmpResult)
        let TmpInsertData = 
        [
            $rootScope.GeneralParamList.MikroId,
            $rootScope.GeneralParamList.MikroId,
            $scope.StokDetay.KODU,
            '',
            TmpResult[0].SHORT_ID,
            $scope.StokDetay.KODU+'-'+TmpResult[0].SHORT_ID
           
        ]
        console.log(TmpInsertData)

        let InsertKontrol = await srv.Execute($scope.Firma,'FotografInsert',TmpInsertData); //ALT İŞ EMİRLERİ LİSTE TABLOSUNA KAYIT EDİLİYOR.                 
    }
    
  }