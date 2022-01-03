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
        $scope.Adıv2="";
        $scope.ModelKodu="";
        $scope.ModelAdi="";

        InitObj();
    }
    $scope.AnaGrupModal = function()
    {
        console.log(1)
        $('#AnaGrupModal').modal("show");
    } 
    $scope.AltGrupModal = function()
    {
        console.log(1)
        $('#AltGrupModal').modal("show");
    } 
    $scope.AltGrupV2Modal = function()
    {
        console.log(1)
        $('#AltGrupV2Modal').modal("show");
    } 
    $scope.ModelModal = function()
    {
        console.log(1)
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

        $scope.BteStokKodu.txt = TmpResult[0].KODU 
    }
    $scope.StokInsert = async function()
    {
        let TmpInsertData = 
        [
            $scope.BteStokKodu.txt,
            $scope.StokAdi,
            $scope.BteTedarikci,
            'Paket',
            $scope.Paket,
            $scope.BteAltGrup.txt,
            $scope.BteAnaGrup.txt,
            '',     //üreticikod
            $scope.BteAltGrup2,
            $scope.BteRaf.txt,
            $scope.BteAnaGrup.txt,
            $scope.BteModel.txt,
            $scope.BteModel.txt,
            '',
            $scope.Maliyet,          
        ]
        let InsertKontrol = await srv.Execute($scope.Firma,'StokInsert',TmpInsertData);
        $scope.StokUserInsert()
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
                $scope.BteTas,
                $scope.BteTasrengi,
                $scope.BteZincirSayisi,
                $scope.BteZinciRengi,
                $scope.BteFigur,
                $scope.BteFigurSekli,
                $scope.BteFigurRengi,
                ''            
            ]
            let InsertKontrol = await srv.Execute($scope.Firma,'StokUserInsert',TmpInsertData);
            $scope.BarkodInsert()
        }
       
    }

    $scope.BarkodInsert = async function()
    {
        let TmpInsertData = 
        [
            $scope.Barkod,
            0
        ]
        let InsertKontrol = await srv.Execute($scope.Firma,'BarkodInsert',TmpInsertData);
    }

    $scope.SatisInsert = async function(pFiyat,pListe)
    {
        let TmpInsertData = 
        [
            $scope.BteStokKodu,
            pFiyat,
            pListe
                       
        ]
        let InsertKontrol = await srv.Execute($scope.Firma,'SatisInsert',TmpInsertData);
    }
}