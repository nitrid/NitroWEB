function MonoUretimParcalama($scope,srv, $rootScope)
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
                        caption : "KODU",
                        dataField: "sth_stok_kod",
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
                        caption : "TIP",
                        dataField: "VIRMANTIP",
                        width: 150
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
            selection : "KODU",
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
        $scope.BteDepo = 
        {
            title : "Depo Seçim",
            txt : "",
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT " +
                        "dep_no AS KODU,dep_adi AS ADI " +
                        "FROM DEPOLAR order by dep_no "
            },
            selection : "KODU",
            columns :
            [
                {
                    dataField: "KODU",
                    width: 200
                }, 
                {
                    dataField: "ADI",
                    width: 500
                }, 
            ],
            onSelected : async function(pData)
            {
                if(typeof pData != 'undefined')
                {                    
                    
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
        
    }
    async function Ekle(pStok,pMiktar,pDepo)
    {
       

        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query : "SELECT msg_S_0078 AS KODU, msg_S_0083 AS MIKTAR FROM fn_Stok_Recetesi(@STOK)", 
            param : ['STOK:string|50'],
            value : [pStok]
        }
        let Detay = await srv.Execute(TmpQuery)  
        if(Detay.length > 0)
        {
            await StokHarKaydet(pStok,pMiktar,pDepo,1)
            for (let i = 0; i < Detay.length; i++) 
            {
                await StokHarKaydet(Detay[i].KODU,(Detay[i].MIKTAR * pMiktar),pDepo,0)    
               
            }
            let TmpResult = await srv.Execute($scope.Firma,'StokHarGetir',[$scope.SthGSeri,$scope.SthGSira,6]);
            InitGrd(TmpResult)
        }
        else
        {
            swal("Dikkat", "Stok Reçetesi Bulunamadı  .",icon="warning");
            return
        }
    }
     $scope.Ekle = async function(pMiktar)
    {

        if(typeof pMiktar == 'undefined')
        {
            pMiktar = $scope.TxtMiktar
        }
        if(  $scope.BteIsEmri.txt == "" || $scope.BteDepo.txt == "")
        {
            swal("Dikkat", "Lütfen Stok ve Depo seçmeden geçmeyin.",icon="warning");
            return;
        }

        Ekle($scope.BteIsEmri.txt,$scope.TxtMiktar,$scope.BteDepo.txt);
    }
    function 
    
    
    StokHarKaydet(TmpKodu,TmpMiktar,TmpDepo,TmpGiris)
    {
        return new Promise(async resolve => 
        {

            let TmpTip = 0
            if(TmpGiris == 1)
            {
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
                3,
                0,
                6,
                $scope.SthGSeri,
                $scope.SthGSira,
                '', //BELGE NO
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
                '', //CARI KODU,
                '', //İŞEMRİKODU
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
                '00000000-0000-0000-0000-000000000000', //sth_sip_uid
                '00000000-0000-0000-0000-000000000000', //sth_fat_uid,
                TmpDepo, //GİRİSDEPONO
                TmpDepo, //CİKİSDEPONO
                moment(new Date()).format("DD.MM.YYYY"), //MALKABULSEVKTARİHİ
                '', // CARİSORUMLULUKMERKEZİ
                '', // STOKSORUMLULUKMERKEZİ
                0,  // VERGİSİZFL
                1,  // ADRESNO
                '', 
                0,
                '', // PROJE KODU
                '', // EXİMKODU
                0, // DİSTİCARETTURU
                0, // OTVVERGİSİZFL
                0, // OİVVERGİSİZ
                0, //FIYAT LISTE NO
                0, //NAKLİYEDEPO
                0, // NAKLİYEDURUMU
                ''
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
    $scope.Init = async function()
    {        
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "ÜRETİM PARÇALAMA"

        $scope.Data = {};
        $scope.Data.UMP = [];
        $scope.Data.URP = [];
        $scope.Data.DATA = [];
        $scope.Data.BARKODLIST = [];

        $scope.TxtBasimAdet = 1;
        $scope.EtiketMiktar = 0;
        $scope.TxtEvrakno = "";
        $scope.LblBarkod = '';
        $scope.LblStokKodu = '';
        $scope.LblStokAdi = '';
        $scope.TxtMiktar = 0;

        $scope.SthGSeri = $rootScope.GeneralParamList.ElektrikUretimUrunGirisSeri;
        $scope.SthGSira = await MaxSthSira($scope.SthGSeri,6)

        // if($rootScope.GeneralParamList.MonoMalKabul != "true")
        // {
        //     swal("Dikkat", "Bu Sayfaya Giriş Yetkiniz Bulunmamaktadır..",icon="warning");
        //     var url = "index.html";
        //     window.location.href = url;
        //     event.preventDefault();        
        // }

        InitObj();
        InitGrd([]);
       
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
    $scope.YeniEvrak = function()
    {
        $scope.Init()
    }
    $scope.BtnIptal = async function()
    {
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query : "DELETE FROM STOK_HAREKETLERI WHERE sth_evrakno_seri = @SERI and sth_evrakno_sira = @SIRA and sth_evraktip = @TIP", 
            param : ['SERI:string|50','SIRA:int','TIP:int'],
            value : [$scope.SthGSeri,$scope.SthGSira,6]
        }
        let pQuery = await srv.Execute(TmpQuery)  
        swal("İşlem Başarılı!", "Silme İşlemi Gerçekleştirildi.",icon="success");
        let TmpResult = await srv.Execute($scope.Firma,'StokHarGetir',[$scope.SthGSeri,$scope.SthGSira,6]);
        InitGrd(TmpResult)
    }
}