function StokTanitim($scope,srv,$rootScope,$filter)
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

        $scope.BteAnaGrupAlt = 
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
            }
        }


        // $scope.BteAltGrupAlt2 = 
        // {
        //     title : "Alt Grup",
            
        //     datasource : 
        //     {
        //         db : "{M}." + $scope.Firma,
        //         query : "SELECT [msg_S_0135] AS KODU ,[msg_S_0136] AS ADI,[msg_S_0013] AS ANAGRUP FROM [dbo].[STOK_ALT_GRUPLARI_CHOOSE_2]",
        //     },
        //     selection : "KODU",
           
        //    txt: "",
        //     columns :
        //     [
        //         {
        //             dataField: "KODU",
        //             width: 200
        //         }, 
        //         {
        //             dataField: "ADI",
        //             width: 200
        //         }, 
        //     ],
        //     onClick : function(pCallback)
        //     {                                
        //         pCallback(true)
        //     }
        // }
        $scope.YeniAnaGrupAlt2 = 
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

        $scope.YeniAltGrupAlt2 = 
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

        $scope.BteAnaGrupAlt2 = 
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
            }
        }
        $scope.BteAltGrup2 = 
        {
            title : "Alt Grup2",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT [msg_S_0022] AS KODU ,[msg_S_0023] AS ADI FROM [dbo].[STOK_SEKTORLERI_CHOOSE_2] ",
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
        $scope.BteTedarikci = 
        {
            title : "Tedarikci",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT [cari_kod] AS KODU,[cari_unvan1] AS ADI FROM [dbo].[CARI_HESAPLAR] ORDER BY [cari_kod] ASC",
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
        $scope.BteRaf = 
        {
            title : "Raf",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT msg_S_0020 AS KODU,msg_S_1080 AS ADI from STOK_REYONLARI_CHOOSE_2  ",
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
                query : "select Q1 AS KODU from STOKLAR_USER Group BY Q1 ",
            },
            selection : "KODU",
           txt: "",
            columns :
            [
                {
                    dataField: "KODU",
                    width: 200
                }, 
               
            ],
            onClick : function(pCallback)
            {                                
                pCallback(true)
            }
        }

        $scope.BteKaplama = 
        {
            title : "Kaplama",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "select Q2 AS KODU from STOKLAR_USER Group BY Q2 ",
            },
            selection : "KODU",
           txt: "",
            columns :
            [
                {
                    dataField: "KODU",
                    width: 200
                }, 
            ],
            onClick : function(pCallback)
            {                                
                pCallback(true)
            }
        }
        $scope.BteTas = 
        {
            title : "Tas ",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : " select Q3 AS KODU from STOKLAR_USER Group BY Q3",
            },
            selection : "KODU",
           txt: "",
            columns :
            [
                {
                    dataField: "KODU",
                    width: 200
                }, 
            ],
            onClick : function(pCallback)
            {                                
                pCallback(true)
            }
        }
        $scope.BteTasrengi = 
        {
            title : "Tas Rengi",
            
             
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : " select Q4 AS KODU from STOKLAR_USER Group BY Q4",
            },
            selection : "KODU",
           txt: "",
            columns :
            [
                {
                    dataField: "KODU",
                    width: 200
                }, 
            ],
            onClick : function(pCallback)
            {                                
                pCallback(true)
            }
        }

        $scope.BteZincirSayisi = 
        {
            title : "Zincir Sayisi",
             
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : " select Q5 AS KODU from STOKLAR_USER Group BY Q5",
            },
            selection : "KODU",
           txt: "",
            columns :
            [
                {
                    dataField: "KODU",
                    width: 200
                }, 
            ],
            onClick : function(pCallback)
            {                                
                pCallback(true)
            }
        }

        $scope.BteZinciRengi = 
        {
            title : "Zincir Rengi",
            
             
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : " select Q6 AS KODU from STOKLAR_USER Group BY Q6",
            },
            selection : "KODU",
           txt: "",
            columns :
            [
                {
                    dataField: "KODU",
                    width: 200
                }, 
            ],
            onClick : function(pCallback)
            {                                
                pCallback(true)
            }
        }

        $scope.BteFigur = 
        {
            title : "Figür",
            
             
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : " select Q7 AS KODU from STOKLAR_USER Group BY Q7",
            },
            selection : "KODU",
           txt: "",
            columns :
            [
                {
                    dataField: "KODU",
                    width: 200
                }, 
            ],
            onClick : function(pCallback)
            {                                
                pCallback(true)
            }
        }

        $scope.BteFigurSekli = 
        {
            title : "Figür Sekli",
            
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : " select Q8 AS KODU from STOKLAR_USER Group BY Q8",
            },
            selection : "KODU",
           txt: "",
            columns :
            [
                {
                    dataField: "KODU",
                    width: 200
                }, 
            ],
            onClick : function(pCallback)
            {                                
                pCallback(true)
            }
        }
        $scope.BteFigurRengi = 
        {
            title : "Figür Rengi",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "select Q9 AS KODU from STOKLAR_USER Group BY Q9",
            },
            selection : "KODU",
           
           txt: "",
            columns :
            [
                {
                    dataField: "KODU",
                    width: 200
                }, 
            ],
            onClick : function(pCallback)
            {                                
                pCallback(true)
            }
        }
        
        $scope.BteAnaGrupModel = 
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
                $scope.ModelOlustur()
            }
        }

        $scope.BteAltGrupModel = 
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

        $scope.BteAltGrup2Model = 
        {
            title : "Alt Grup2",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT [msg_S_0022] AS KODU ,[msg_S_0023] AS ADI FROM [dbo].[STOK_SEKTORLERI_CHOOSE_2] ",
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
                $scope.AltGrup2Model = pData.KODU;
                $scope.ModelKodOlustur()
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
        $scope.Modelrenk1='';
        $scope.Modelrenk2='';
        $scope.Modelrenk3='';
        $scope.Modelrenk4='';
        $scope.Modelrenk5='';
        $scope.Modelrenk6='';
        $scope.Modelrenk7='';
        $scope.Modelrenk8='';

        
        $scope.ModelDisable=true;
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            
            query :  "select sfl_aciklama,sfl_sirano, 0 AS MODEL from STOK_SATIS_FIYAT_LISTE_TANIMLARI ",
        }
        $scope.FiyatList = await srv.Execute(TmpQuery)
       
        
       

        InitObj();

        $scope.BteMateryal.txt = "YOK"
        $scope.BteKaplama.txt = "YOK"
        $scope.BteTas.txt = "YOK"
        $scope.BteTasrengi.txt = "YOK"
        $scope.BteZincirSayisi.txt = "YOK"
        $scope.BteZinciRengi.txt = "YOK"
        $scope.BteFigur.txt = "YOK"
        $scope.BteFigurSekli.txt = "YOK"
        $scope.BteFigurRengi.txt = "YOK"
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
    $scope.AltGrupModal = async function()
    {
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            
            query :  "SELECT (MAX(sta_kod) + 1) AS KODU FROM STOK_ALT_GRUPLARI ",
        }
        let TmpResult = await srv.Execute(TmpQuery)
        $scope.AltGrupKodu = TmpResult[0].KODU
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

    $scope.MaliyetDuzenModal=function() {
        $('#MaliyetDuzenModal').modal("show");
        
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
    $scope.ModelKodOlustur =async function()
    {
        let TmpQuery = {
            db: "{M}." + $scope.Firma,
            query :  "SELECT ISNULL(REPLACE(STR(MAX([msg_S_0078]) + 1, 9), SPACE(1), '0'),@mdl_Guid + '001') AS KODU " +
            "FROM [dbo].[STOK_MODEL_TANIMLARI_CHOOSE_2] WHERE [msg_S_0078] LIKE @mdl_Guid + '%' ",
            param :["mdl_Guid:string|50"],
            value : [$scope.AltGrup2Model]
        }
        let TmpResult = await srv.Execute(TmpQuery)
        console.log(TmpResult)
        $scope.YeniModelKodu = TmpResult[0].KODU

    }
    $scope.StokInsert = async function()
    {
        let TmpInsertData = 
        [
            $scope.BteStokKodu.txt,
            $scope.StokAdi,
            $scope.BteTedarikci.txt,
            'Paket',
            ($scope.Paket * -1),
            $scope.BteAltGrup.txt,
            $scope.BteAnaGrup.txt,
            '',     //üreticikod
            $scope.BteAltGrup2.txt,
            $scope.BteRaf.txt,
            $scope.BteAnaGrup.txt,
            $scope.BteModel.txt,
            $scope.BteModel.txt,
            '',
            $scope.Maliyet,          
        ]
        let InsertKontrol = await srv.Execute($scope.Firma,'StokInsert',TmpInsertData);
        await $scope.StokUserInsert()
       await $scope.SatisFiyatInsert(1,$scope.BayiPsf)
       await $scope.SatisFiyatInsert(2,$scope.SubePsf)
       await $scope.SatisFiyatInsert(3,$scope.BayiAlis50)
       await $scope.SatisFiyatInsert(6,$scope.BayiAlis)
       swal("Başarılı", "Stok ve Barkod Oluşturuldu..",icon="success");
       $scope.Init()
      
        
    }



    $scope.AlisFiyatHesap =  function()
    {
        $scope.BayiAlis = ($scope.BayiPsf * 60)  / 100
        $scope.BayiAlis50 = ($scope.BayiPsf * 50)  / 100
    }
    $scope.FiyatDuzenle =  function()
    {
        if($scope.FiyatAktif == true)
        {
            $scope.FiyatDisable = false
        }
        else
        {
            $scope.FiyatDisable = true
        }
    }
    $scope.PaketDuzenle =  function()
    {
        if($scope.PaketAktif == true)
        {
            $scope.PaketDisable = false
        }
        else
        {
            $scope.PaketDisable = true
        }
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
    $scope.StokUserInsert = async function()
    {   
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query :  "SELECT sto_Guid AS GUID FROM STOKLAR WHERE sto_kod = @sto_kod",
            param :["sto_kod:string|50"],
            value : [$scope.BteStokKodu.txt]
        }
        let TmpResult = await srv.Execute(TmpQuery)
        if(TmpResult.length > 0)
        {
            let TmpInsertData = 
            [
                TmpResult[0].GUID,
                $scope.BteMateryal.txt,
                $scope.BteKaplama.txt,
                $scope.BteTas.txt,
                $scope.BteTasrengi.txt,
                $scope.BteZincirSayisi.txt,
                $scope.BteZinciRengi.txt,
                $scope.BteFigur.txt,
                $scope.BteFigurSekli.txt,
                $scope.BteFigurRengi.txt,
                ''            
            ]
            console.log(TmpInsertData)
            let InsertKontrol = await srv.Execute($scope.Firma,'StokUserInsert',TmpInsertData);
            await $scope.BarkodInsert($scope.BteStokKodu.txt,1)
            if($scope.PaketAktif == true)
            {
               

                await $scope.BarkodInsert($scope.PaketBarkod,2)
            }
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
            $scope.AltGrupKodu,
            $scope.YeniAltGrupAdi,
            $scope.BteAnaGrupAlt.txt
                       
        ]
        let InsertKontrol = await srv.Execute($scope.Firma,'AltGruplarInsert',TmpInsertData);
    }


    $scope.AltGruplar2Insert=async function()
    {
        let TmpInsertData = 
        [
            $scope.KoduV2,
            $scope.Adiv2
                       
        ]
        let InsertKontrol = await srv.Execute($scope.Firma,'AltGruplar2Insert',TmpInsertData);
    }

    $scope.ModelInsert=async function()
    {
       
        $scope.ModelAdi = TmpResult[0].KODU
        [
            $scope.ModelKodu,
            $scope.ModelAdi
                       
        ]
        console.log(TmpInsertData)
        let InsertKontrol = await srv.Execute($scope.Firma,'ModelInsert',TmpInsertData);
    }
    
    $scope.ModelRenkInsert=async function() 
    {
        $scope.Modelrenk1,
        $scope.Modelrenk2,
        $scope.Modelrenk3,
        $scope.Modelrenk4,
        $scope.Modelrenk5,
        $scope.Modelrenk6,
        $scope.Modelrenk7,
        $scope.Modelrenk8

        
    }



//BUTONLAR

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
        if($scope.AltGrupKodu == '' || $scope.YeniAltGrupAdi == '' || $scope.BteAnaGrupAlt.txt == '')
        {
            swal("Dikkat", "Lütfen Boş Alanları Doldurun",icon="warning");
        }else{
            $scope.AltGruplarInsert() } 
    }
    $scope.AltGruplar2Kaydet = async function()
    {
        if($scope.YeniAnaGrupAlt2.txt == '' || $scope.YeniAltGrupAlt2 == ''  || $scope.KoduV2 == ''  || $scope.Adiv2 == '')
        {
            swal("Dikkat", "Lütfen Boş Alanları Doldurun",icon="warning");
        }else{
            $scope.AltGruplar2Insert()
        } 
    }


    $scope.Modelkayit = async function()
    {
        if($scope.ModelKodu == '' || $scope.BteAltGrupAlt2 == '' || $scope.BteAltGrupModel.txt == '' || $scope.BteAnaGrupModel.txt == '' || $scope.BteAltGrup2Model.txt == '' || $scope.ModelRenk == '')
        {
            swal("Dikkat", "Lütfen Boş Alanları Doldurun",icon="warning");
        }else{
            $scope.ModelInsert()
        } 
    }

}


