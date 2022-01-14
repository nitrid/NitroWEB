function StokTanitimi($scope,srv,$rootScope,$filter)
{
    function InitObj()
    {
        $scope.BteStokKodu = 
        {
            title : "Stok Kodu",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT sto_kod AS KODU, sto_isim AS ADI FROM STOKLAR",
            },
            selection : "KODU",
            
           txt: "",
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
            ],
            onClick : function(pCallback)
            {                                
                pCallback(true)
            }
        }
        $scope.BteAnaGrup = 
        {
           title : "Ana Grup Kodu",
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT [msg_S_0135] AS KODU,[msg_S_0136] AS ADI FROM [dbo].[STOK_ANA_GRUPLARI_CHOOSE_2] ORDER BY [msg_S_0135] ASC",
            },
            selection : "KODU",
           
           txt: "",
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
            ],
            onClick : function(pCallback)
            {                                
                pCallback(true)
            },
            onSelected : async function(pData)
            {
                console.log(pData)
                $scope.AnaGrup= pData.KODU;
                $scope.StokKodOlustur()
            }
        }
        $scope.BteAltGrup = 
        {
            title : "Alt Grup",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT [msg_S_0135] AS KODU ,[msg_S_0136] AS ADI,[msg_S_0013] AS ANAGRUP FROM [dbo].[STOK_ALT_GRUPLARI_CHOOSE_2]",
            },
            selection : "KODU",
           
           txt: "",
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
            ],
            onClick : function(pCallback)
            {                                
                pCallback(true)
            }
        }
        $scope.BteKalite = 
        {
            title : "Kalite Seçimi",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT [msg_S_0078] AS KODU, [msg_S_0870] AS ADI FROM STOK_KALITE_KONTROL_TANIMLARI_CHOOSE_2 ",
            },
            selection : "KODU",
           
           txt: "",
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
            ],
            onClick : function(pCallback)
            {                                
                pCallback(true)
            },
            
        }

        $scope.BteModel = 
        {
            title : "Model Kodu",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "Select [msg_S_0078] As KODU, [msg_S_0070] As ADI FROM STOK_MODEL_TANIMLARI_CHOOSE_2  ORDER BY  [msg_S_0078] ASC",
            },
            selection : "KODU",
           
           txt: "",
            columns :
            [
                {
                    dataField: "ADI",
                    width: 200
                }, 
                {
                    dataField: "KODU",
                    width: 200
                }, 
            ],
            onClick : function(pCallback)
            {                                
                pCallback(true)
            },
            onSelected : async function(pData)
            {
                console.log(pData)
                $scope.StokAdi = pData.ADI;
            }
        } 
        $scope.BteUretici = 
        {
            title : "Üretici Seçimi",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT [msg_S_0018] AS KODU, [msg_S_0019] AS ADI FROM STOK_URETICILERI_CHOOSE_2",
            },
            selection : "KODU",
            txt: "",
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
            ],
            onClick : function(pCallback)
            {                                
                pCallback(true)
            }
        }
        $scope.BteAstar = 
        {
            title : "Astar Seçimi",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT [msg_S_0078] AS KODU, [msg_S_0070] AS ADI FROM STOK_AMBALAJLARI_CHOOSE_2 ORDER BY  [msg_S_0078] ASC  ",
            },
            selection : "KODU",
           txt: "",
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
            ],
            onClick : function(pCallback)
            {                                
                pCallback(true)
            }
        }

        $scope.BteMateryal = 
        {
            title : "Materyal",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT mrk_kod AS KODU, mrk_ismi AS ADI FROM STOK_MARKALARI ",
            },
            selection : "KODU",
           txt: "",
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
               
            ],
            onClick : function(pCallback)
            {                                
                pCallback(true)
            }
        }

        $scope.BteRenk = 
        {
            title : "Renk Seçimi",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT [msg_S_0078] AS KODU, [msg_S_0070] AS ADI FROM STOK_YILSEZON_TANIMLARI_CHOOSE_2 ",
            },
            selection : "KODU",
           txt: "",
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
            ],
            onClick : function(pCallback)
            {                                
                pCallback(true)
            }
        }
        $scope.BteTopukBoyu = 
        {
            title : "Topuk Boyu Seçimi ",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : " SELECT [msg_S_0020] AS KODU,[msg_S_1080] AS ADI FROM STOK_REYONLARI_CHOOSE_2 ORDER BY  [msg_S_0020] ASC",
            },
            selection : "KODU",
           txt: "",
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
            ],
            onClick : function(pCallback)
            {                                
                pCallback(true)
            }
        }
        $scope.BteTaban = 
        {
            title : "Taban Seçimi",
            
             
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : " SELECT [msg_S_0022] AS KODU, [msg_S_0023] AS ADI FROM STOK_SEKTORLERI_CHOOSE_2 ORDER BY  [msg_S_0022] ASC",
            },
            selection : "KODU",
           txt: "",
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
            ],
            onClick : function(pCallback)
            {                                
                pCallback(true)
            }
        }

        $scope.BteYilAdi = 
        {
            title : "Yıl Seçimi",
             
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT ahm_kodu AS KODU,ahm_ismi AS ADI FROM STOK_ANAHAMMADDELERI ORDER BY ahm_kodu ASC",
            },
            selection : "KODU",
           txt: "",
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
            ],
            onClick : function(pCallback)
            {                                
                pCallback(true)
            }
        }
    }
    $scope.Init = async function()
    {        
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "StokTanitim"
        $scope.BasimAdet = 1;
        $scope.Barkod = "";
        $scope.Paket = 1;
        $scope.Maliyet = 0;
        $scope.BayiPsf = 0;
        $scope.Subepsf = 0;
        $scope.BayiAlis = 0;
        $scope.BayiAlis50 = 0;
        $scope.YeniAnagrupKodu="";
        $scope.YeniAltGrupKodu="";
        $scope.AltGrupKodu="";
        $scope.AltGrupAdi="";
        $scope.AnaGrupAdi="";
        $scope.AnaGrupAdiV2="";
        $scope.AltGrupKoduv2="";
        $scope.KoduV2="";
        $scope.Adiv2="";
        $scope.ModelKodu="";
        $scope.ModelAdi="";
        $scope.PaketBarkod = '';
        $scope.PaketAktif = false;
        $scope.FiyatDisable = true;
        $scope.FiyatAktif = false;
        $scope.PaketAktif = false;
        $scope.PaketDisable =true;
        $scope.SubePsf=0;
        $scope.ModelAdi='';
        $scope.ModelKodu='';
        $scope.YeniAnagrupKodu='';
        $scope.AltGrupKodu='';
        $scope.AltGrupAdi='';
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            
            query :  "select sfl_aciklama,sfl_sirano, 0 AS MODEL from STOK_SATIS_FIYAT_LISTE_TANIMLARI ",
        }
        $scope.FiyatList = await srv.Execute(TmpQuery)
       

        InitObj();

    }
    $scope.AnaGrupModal = async  function()
    {
        
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            
            query :  "SELECT (MAX(san_kod) + 1) AS KODU FROM STOK_ANA_GRUPLARI ",
        }
        let TmpResult = await srv.Execute(TmpQuery)
        $scope.YeniAnagrupKodu = TmpResult[0].KODU
        $('#AnaGrupModal').modal("show");
    } 
    $scope.AltGrupModal = function()
    {
        $('#AltGrupModal').modal("show");
    } 
    $scope.AltGrupV2Modal = function()
    {
        $('#AltGrupV2Modal').modal("show");
    } 
    $scope.ModelModal = function()
    {
        
        $('#ModelModal').modal("show");
    } 
    $scope.StokKodOlustur =async function()
    {
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query :  "SELECT ISNULL(REPLACE(STR(MAX(SUBSTRING(sto_kod,0,8)) + 1, 7), SPACE(1), '0'), @BASKODU + '000001') AS KODU FROM STOKLAR WHERE sto_kod LIKE @BASKODU + '%' AND sto_anagrup_kod = @BASKODU",
            param :["BASKODU:string|50"],
            value : [$scope.AnaGrup]
        }
        let TmpResult = await srv.Execute(TmpQuery)

        await $scope.StokHesap(TmpResult[0].KODU)
        await $scope.StokPaketHesap(TmpResult[0].KODU)
    }
    $scope.StokInsert = async function()
    {
        let TmpInsertData = 
        [
            $scope.BteStokKodu.txt,
            $scope.StokAdi,
            $scope.BteAltGrup.txt,
            $scope.BteAnaGrup.txt,
            $scope.BteUretici.txt,
            $scope.BteTaban.txt,
            $scope.BteTopukBoyu.txt,
            $scope.BteAstar.txt,   
            $scope.BteModel.txt,
            $scope.BteKalite.txt,
            $scope.BteRenk.txt,
            $scope.BteYilAdi.txt,
            $scope.Maliyet,
        ]
        let InsertKontrol = await srv.Execute($scope.Firma,'StokInsert',TmpInsertData);
    
       swal("Başarılı", "Stok ve Barkod Oluşturuldu..",icon="success");
       $scope.Init()
      
        
    }
    $scope.StokKaydet =  function()
    {
        if($scope.BteStokKodu.txt == '' || $scope.BteAltGrup.txt == '' || $scope.BteAltGrup2.txt == '' || $scope.BteAnaGrup.txt == '' ||  $scope.BteModel.txt == '' || $scope.BteTedarikci.txt == '' || $scope.BteRaf.txt == '')
            {
                swal("Dikkat", "Lütfen Boş Alanları Doldurun",icon="warning");
            }else{
                $scope.StokInsert()
            }
    }
    $scope.BarkodInsert = async function(pbarkod,pbirim)
    {
        let TmpInsertData = 
        [
            pbarkod,
            $scope.BteStokKodu.txt,
            pbirim
        ]
        console.log(TmpInsertData)
        let InsertKontrol = await srv.Execute($scope.Firma,'StokBarkodInsert',TmpInsertData);
    }

    $scope.SatisFiyatInsert = async function(pFiyat,pListe)
    {
        let TmpInsertData = 
        [
            $scope.BteStokKodu.txt,
            pListe,
            pFiyat
                       
        ]
        console.log(TmpInsertData)
        let InsertKontrol = await srv.Execute($scope.Firma,'SatisFiyatInsert',TmpInsertData);
    }
    $scope.StokHesap=async function(number)
    {
        
        output = [],
        sNumber = number.toString();
    
        for (var i = 0, len = sNumber.length; i < len; i += 1) {
            output.push(+sNumber.charAt(i));
        }

        var tek=(output[0]+output[2]+output[4]+output[6])*3
        var cift=output[1]+output[3]+output[5]
        var say = tek+cift
        let sonuc = (10 - (say %= 10))
     
       $scope.BteStokKodu.txt = sNumber + sonuc.toString();
    }
    $scope.StokPaketHesap=async function(number)
    {
        number = parseFloat(number) + 100000
        output = [],
        sNumber = number.toString();
    
        for (var i = 0, len = sNumber.length; i < len; i += 1) {
            output.push(+sNumber.charAt(i));
        }

        var tek=(output[0]+output[2]+output[4]+output[6])*3
        var cift=output[1]+output[3]+output[5]
        var say = tek+cift
        let sonuc = (10 - (say %= 10))
        if(sonuc == 10)
        {
            sonuc = 0
        }
       $scope.PaketBarkod = sNumber + sonuc.toString();
      
    }
    $scope.AnaGruplarInsert=async function()
    {
        let TmpInsertData=
        [
            $scope.YeniAnagrupKodu,
            $scope.YeniAnaGrupAdi
                       
        ]
        let InsertKontrol = await srv.Execute($scope.Firma,'AnaGruplarInsert',TmpInsertData);
        swal("Başarılı", "Kayıt Başarılı",icon="success");
        $('#AnaGrupModal').modal("hide");
    }



    $scope.AltGruplarInsert=async function()
    {
        let TmpInsertData = 
        [
            $scope.AnaGrupAdi,
            $scope.AltGrupKodu,
            $scope.AltGrupAdi,
                       
        ]
        let InsertKontrol = await srv.Execute($scope.Firma,'AltGruplarInsert',TmpInsertData);
    }



    $scope.ModelInsert=async function()
    {

        let TmpInsertData = 
        [
            $scope.ModelKodu,
            $scope.ModelAdi
                       
        ]
        console.log(TmpInsertData)
        let InsertKontrol = await srv.Execute($scope.Firma,'ModelInsert',TmpInsertData);
    }
    





    $scope.AnaGruplarKaydet = async function()
    {
        if($scope.YeniAnagrupKodu == '' || $scope.YeniAnaGrupAdi == '')
        {
            swal("Dikkat", "Lütfen Boş Alanları Doldurun",icon="warning");
        }else{
            $scope.AnaGruplarInsert()  }
    }

    $scope.AltGruplarKaydet = async function()
    {
        if($scope.AnaGrupAdi == '' || $scope.AltGrupKodu == '' || $scope.AltGrupAdi == '')
        {
            swal("Dikkat", "Lütfen Boş Alanları Doldurun",icon="warning");
        }else{
            $scope.AltGruplarInsert() } 
    }
    $scope.AltGruplar2Kaydet = async function()
    {
        if($scope.AnaGrupAdiV2 == '' || $scope.AltGrupKoduv2 == ''  || $scope.KoduV2 == ''  || $scope.Adiv2 == '')
        {
            swal("Dikkat", "Lütfen Boş Alanları Doldurun",icon="warning");
        }else{
            $scope.AltGruplar2Kaydet()
        } 
    }



    $scope.Modelkayit = async function()
    {
        if($scope.ModelKodu == '' || $scope.ModelAdi == '' )
        {
            swal("Dikkat", "Lütfen Boş Alanları Doldurun",icon="warning");
        }
        else
        {
            $scope.ModelInsert()
        } 
    }
    $scope.Test = function()
    {
        console.log($scope.FiyatList)
    }

}


