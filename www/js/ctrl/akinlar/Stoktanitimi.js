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
            },
            onSelected : async function(pData)
            {
                $scope.StokGetir(pData.KODU)
                $scope.PreviewImage = "http://kuppeli.shop/upload/product/picture/" + pData.KODU + "-1.jpg";
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
                $scope.AnaGrupAdi = pData.ADI;
               
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
            },
            onSelected : async function(pData)
            {
                $scope.AltGrupAdi = pData.ADI;
               
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
            onSelected : async function(pData)
            {
                $scope.StokAdi = pData.ADI;
                $scope.KaliteAdi = pData.ADI
                $scope.KaliteKodu = pData.KODU
                $scope.StokKodOlustur()
            }
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
               $scope.ModelAd = pData.ADI
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
            },
            onSelected : async function(pData)
            {
                $scope.UreticiAdi = pData.ADI;
               
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
            },
            onSelected : async function(pData)
            {
                $scope.AstarAdi = pData.ADI;
               
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
            },
            onSelected : async function(pData)
            {
                $scope.MateryalAdi = pData.ADI;
                $scope.MateryalKodu = pData.KODU
                $scope.StokKodOlustur()
               
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
            },
            onSelected : async function(pData)
            {
                $scope.RenkAdi = pData.ADI;
                $scope.RenkKodu = pData.KODU
                $scope.StokKodOlustur()
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
            },
            onSelected : async function(pData)
            {
                $scope.TopukAdi = pData.ADI;
               
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
            },
            onSelected : async function(pData)
            {
                $scope.TabanAdi = pData.ADI;
               
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
            },
            onSelected : async function(pData)
            {
                $scope.YilAdi = pData.ADI;
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
        $scope.ModelKodu='';
        $scope.YeniAnagrupKodu='';
        $scope.AltGrupKodu='';
        $scope.AltGrupAdi='';
        $scope.YilAdi = '';
        $scope.AnaGrupAdi = '';
        $scope.AltGrupAdi = '';
        $scope.KaliteAdi = '';
        $scope.ModelAd = '';
        $scope.MateryalAdi = '';
        $scope.RenkAdi = '';
        $scope.TopukAdi = '';
        $scope.KaliteKodu = '';
        $scope.RenkKodu = '';
        $scope.MateryalKodu = '';
        $scope.StokAdi = '';
        $scope.UreticiAdi = '';
        $scope.TabanAdi = '';
        $scope.AstarAdi = '';


        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            
            query :  "select sfl_aciklama,sfl_sirano, 0 AS MODEL from STOK_SATIS_FIYAT_LISTE_TANIMLARI ",
        }
        $scope.FiyatList = await srv.Execute(TmpQuery)
       
        InitObj();
        $scope.CmbTasarimList =
        {
            datasource : 
            {
                data :  await GetTasarimList()
            },
            key : "key",
            value : "value",
            defaultVal : $scope.TasarimValue,
            selectionMode : "key",
            return : $scope.TasarimValue,
            onSelected : function(pSelected)
            {
                $scope.TasarimValue = pSelected
            }
        }
        $scope.StokHesap();
        $scope.FiyatListGetir()
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
        $scope.BteStokKodu.txt = $scope.KaliteKodu+'.'+$scope.MateryalKodu+'.'+$scope.RenkKodu
       
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
            $scope.BteMateryal.txt,  
            $scope.BteModel.txt,
            $scope.BteRenk.txt,
            $scope.BteYilAdi.txt,
            $scope.BteKalite.txt,
            $scope.Maliyet,
        ]
        let InsertKontrol = await srv.Execute($scope.Firma,'StokInsert',TmpInsertData);
       for (let i = 0; i < $scope.FiyatListeleri.length; i++) 
       {
           $scope.SatisFiyatInsert($scope.FiyatListeleri[i].sfl_sirano,$scope.FiyatListeleri[i].MODEL)
       }
       await $scope.BarkodInsert()
       swal("Başarılı", "Stok ve Barkod Oluşturuldu..",icon="success");
    }
    $scope.BarkodGetirKey = async function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT bar_stokkodu FROM BARKOD_TANIMLARI WHERE bar_kodu = @bar_kodu ",
                param : ['bar_kodu:string|50'],
                value : [$scope.Barkod]
            }
            let SeriKontrol = await srv.Execute(TmpQuery)
            if(SeriKontrol.length == 0)
            {
                swal("Dikkat!", "Barkod Bulunamadı.",icon="warning");
            }
            $scope.StokGetir(SeriKontrol[0].bar_stokkodu);
        }
    }
    $scope.EtiketYazdir = async function()
    {
        if($scope.BteStokKodu.txt == '')
        {
            swal("Dikkat!", "Stok Kodu Seçmeden Yazdırma İşlemi Yapılamaz.",icon="warning");
            return
        }
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query : "SELECT sto_isim AS ADI,(SELECT TOP 1 bar_kodu FROM BARKOD_TANIMLARI WHERE bar_stokkodu = sto_kod and bar_birimpntr = 1) AS BARKOD,(SELECT TOP 1 sfiyat_fiyati FROM STOK_SATIS_FIYAT_LISTELERI WHERE sfiyat_stokkod = sto_kod and sfiyat_listesirano = 1 ) AS FIYAT1 FROM STOKLAR WHERE sto_kod = @sto_kod " ,
            param : ['sto_kod'],
            type : ['string|25'],
            value : [$scope.BteStokKodu.txt]
        }
        let TmpResult = await srv.Execute(TmpQuery)

        return new Promise(async resolve => 
        {
                srv.Emit('DevPrint',"{TYPE:'PRINT',PATH:'" + $scope.GeneralParamList.TasarimYolu + "/" + "3LU.repx" + "',DATA:"+ JSON.stringify(TmpResult).split("İ").join("I").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u") +"}",(pResult)=>
                {
                    console.log(pResult)
                })
            
        
            swal("İşlem Başarılı!", "Yazdırma İşlemi Gerçekleştirildi.",icon="success");
            resolve()
        });
    }
    $scope.StokKaydet =  async function()
    {
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query :  "SELECT sto_kod from STOKLAR WHERE sto_kod = @sto_kod " ,
            param :["sto_kod:string|50"],
            value : [$scope.BteStokKodu.txt]
        }
        let tmpdata  = await srv.Execute(TmpQuery)
        if(tmpdata.length > 0 )
        {
            $scope.StokUpdate()
        }
        else
        {
            if($scope.BteStokKodu.txt == '' || $scope.BteAltGrup.txt == '' || $scope.BteUretici.txt == '' || $scope.BteAnaGrup.txt == '' ||  $scope.BteModel.txt == '' || $scope.BteMateryal.txt == '' || $scope.BteKalite.txt == '')
            {
                swal("Dikkat", "Lütfen Boş Alanları Doldurun",icon="warning");
            }
            else
            {
                $scope.StokInsert()
            }
        }
        
    }
    $scope.StokUpdate = async function()
    {
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query :  "UPDATE STOKLAR SET sto_standartmaliyet = @sto_standartmaliyet where sto_kod = @sto_kod " ,
            param :["sto_kod:string|50"],
            value : [$scope.BteStokKodu.txt]
        }
        await srv.Execute(TmpQuery)
        for (let i = 0; i < $scope.FiyatListeleri.length; i++) 
        {
            $scope.SatisFiyatUpdate($scope.FiyatListeleri[i].sfl_sirano,$scope.FiyatListeleri[i].MODEL)
        }
        swal("Başarılı", "Kayıt Edildi..",icon="success");
    }
    $scope.SatisFiyatUpdate = async function(pSira,pFiyat)
    {
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query :  "UPDATE STOK_SATIS_FIYAT_LISTELERI SET sfiyat_fiyati = @sfiyat_fiyati where sfiyat_listesirano = @sfiyat_listesirano and sfiyat_stokkod = @sfiyat_stokkodu " ,
            param :["sfiyat_fiyati:float","sfiyat_listesirano:int","sfiyat_stokkodu:string|50"],
            value : [pFiyat,pSira,$scope.BteStokKodu.txt]
        }
        await srv.Execute(TmpQuery)
    }
    $scope.BarkodInsert = async function()
    {
        let TmpInsertData = 
        [
            $scope.YeniBarkod,
            $scope.BteStokKodu.txt,
            1
        ]
        console.log(TmpInsertData)
        let InsertKontrol = await srv.Execute($scope.Firma,'StokBarkodInsert',TmpInsertData);
    }
    $scope.FiyatListGetir = async function()
    {
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            
            query :  "select sfl_aciklama,sfl_sirano, ISNULL((SELECT TOP 1 sfiyat_fiyati FROM STOK_SATIS_FIYAT_LISTELERI WHERE sfiyat_listesirano = sfl_sirano and sfiyat_stokkod = @sfiyat_stokkod  ),0) AS MODEL from STOK_SATIS_FIYAT_LISTE_TANIMLARI WHERE sfl_special1 = '1' ",
            param :["sfiyat_stokkod:string|50"],
            value : [$scope.BteStokKodu.txt]
        }
        $scope.FiyatListeleri = await srv.Execute(TmpQuery)
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
    $scope.StokHesap=async function()
    {
        let referans = moment(new Date()).format("YYYYMMDD") 
        let length = 4;
        let chars = '0123456789'.split('');
        let AutoStr = "";
        
        if (! length) 
        {
            length = Math.floor(Math.random() * chars.length);
        }
        for (let i = 0; i < length; i++) 
        {
            AutoStr += chars[Math.floor(Math.random() * chars.length)];
        }
        referans = referans + AutoStr
        console.log(referans)
        output = [],
        sNumber = referans.toString();
    
        for (var i = 0, len = sNumber.length; i < len; i += 1) {
            output.push(+sNumber.charAt(i));
        }

        var tek=(output[0]+output[2]+output[4]+output[6]+output[8]+output[10])
        var cift=(output[1]+output[3]+output[5]+output[7]+output[9]+output[11])*3
        var say = tek+cift
        let sonuc = (10 - (say %= 10))
        if(sonuc == 10)
        {
            sonuc = 0
        }
     
        $scope.YeniBarkod = sNumber + sonuc.toString();
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query : "SELECT bar_kodu FROM BARKOD_TANIMLARI WHERE bar_kodu = @bar_kodu ",
            param : ['bar_kodu:string|50'],
            value : [$scope.YeniBarkod]
        }
        let SeriKontrol = await srv.Execute(TmpQuery)
        if(SeriKontrol.length > 0)
         {
            $scope.StokHesap()
         }
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
    $scope.StokGetir = async function(pKodu)
    {
        console.log(pKodu)
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query :  "SELECT sto_anagrup_kod as ANAGRUP, " +
            "sto_altgrup_kod as ALTGRUP, " +
            "sto_kod AS STOKKOD,  " +
            "sto_isim AS STOKADI, " +
            "sto_model_kodu as MODEL, " +
            "sto_sektor_kodu as TABAN, " +
            "sto_sezon_kodu AS RENK , " + 
            "sto_reyon_kodu as TOPUK, " +
            "sto_standartmaliyet AS MALIYET, " +
            "sto_sat_cari_kod AS TEDARIKCI, " +
            "sto_ambalaj_kodu AS ASTAR, " +
            "sto_uretici_kodu AS URETICI, " +
            "sto_kalkon_kodu AS KALITE , " +
            "sto_marka_kodu AS MATERYAL, " +
            "(SELECT TOP 1 bar_kodu from BARKOD_TANIMLARI WHERE bar_stokkodu=sto_kod and bar_birimpntr = 1) AS BARKOD " +
            "FROM STOKLAR WHERE sto_kod = @STOKKODU ",
            param :["STOKKODU:string|50"],
            value : [pKodu]
        }
        let TmpResult = await srv.Execute(TmpQuery)
        if(TmpResult.length > 0)
        {
            $scope.BteMateryal.txt = TmpResult[0].MATERYAL;
            $scope.BteTaban.txt = TmpResult[0].TABAN;
            $scope.BteTopukBoyu.txt = TmpResult[0].TOPUK;
            $scope.BteAstar.txt = TmpResult[0].ASTAR;
            $scope.BteUretici.txt = TmpResult[0].URETICI;
            $scope.BteKalite.txt = TmpResult[0].KALITE;
            $scope.StokAdi =  TmpResult[0].STOKADI;
            $scope.BteAltGrup.txt = TmpResult[0].ALTGRUP;
            $scope.BteAnaGrup.txt = TmpResult[0].ANAGRUP;
            $scope.Maliyet    = TmpResult[0].MALIYET;
            $scope.BteModel.txt =TmpResult[0].MODEL;
            $scope.Barkod = TmpResult[0].BARKOD;
            $scope.BteRenk.txt = TmpResult[0].RENK;
            $scope.BteStokKodu.txt = TmpResult[0].STOKKOD;
            $scope.FiyatListGetir()
        }
        else
        {
            swal("Dikkat", "Stok Bulunamadı..",icon="warning");
        }
    }
    function GetTasarimList()
    {
        return new Promise(async resolve => 
        {
            let TasarimList = [];
    
            console.log(srv)
            srv.Emit('DesingList',"",(pResult)=>
            {
                for (let i = 0; i < pResult.length; i++) 
                {
                    TasarimList.push({key : "key",value : pResult[i]})
                }
            })
            resolve(TasarimList);
        });
    }

}


