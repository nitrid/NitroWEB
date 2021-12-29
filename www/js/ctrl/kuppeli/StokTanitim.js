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
                query : " ",
            },
            selection : "",
           txt: "",
            columns :
            [
                {
                    dataField: "",
                    width: 200
                }, 
                {
                    dataField: "",
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
                query : " ",
            },
            selection : "",
           
           txt: "",
            columns :
            [
                {
                    dataField: "",
                    width: 200
                }, 
                {
                    dataField: "",
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
                query : " ",
            },
            selection : "",
           txt: "",
            columns :
            [
                {
                    dataField: "",
                    width: 200
                }, 
                {
                    dataField: "",
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
                query : " ",
            },
            selection : "",
           txt: "",
            columns :
            [
                {
                    dataField: "",
                    width: 200
                }, 
                {
                    dataField: "",
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
                query : " ",
            },
            selection : "",
           txt: "",
            columns :
            [
                {
                    dataField: "",
                    width: 200
                }, 
                {
                    dataField: "",
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
                query : " ",
            },
            selection : "",
           
           txt: "",
            columns :
            [
                {
                    dataField: "",
                    width: 200
                }, 
                {
                    dataField: "",
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
                query : " ",
            },
            selection : "",
           
           txt: "",
            columns :
            [
                {
                    dataField: "",
                    width: 200
                }, 
                {
                    dataField: "",
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
                query : " ",
            },
            selection : "",
           
           txt: "",
            columns :
            [
                {
                    dataField: "",
                    width: 200
                }, 
                {
                    dataField: "",
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
                query : " ",
            },
            selection : "",
           
           txt: "",
            columns :
            [
                {
                    dataField: "",
                    width: 200
                }, 
                {
                    dataField: "",
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
        $scope.BasimAdet,
        $scope.Barkod,
        $scope.paket,
        $scope.Maliyet,
        $scope.BayiPsf,
        $scope.Subepsf,
        $scope.BayiAlış,
        $scope.BayiAlış2



        
        
        InitObj();
    }
    $scope.StokKodOlustur =async function()
    {
        console.log($scope.BteStokKodu)
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
}