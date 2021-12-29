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
            columns :
            [
                {
                    dataField: "KODU",
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
            }
        }
        $scope.BteAnagrup = 
        {
           title : "Ana Grup Kodu",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT [msg_S_0135] AS KODU,[msg_S_0136] AS ADI FROM [dbo].[STOK_ANA_GRUPLARI_CHOOSE_2] ORDER BY [msg_S_0135] ASC",
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
            ],
            onClick : function(pCallback)
            {                                
                pCallback(true)
            }
        }

        $scope.Btealtgrup = 
        {
            title : "Alt Grup",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT [msg_S_0135] AS KODU ,[msg_S_0136] AS ADI,[msg_S_0013] AS ANAGRUP FROM [dbo].[STOK_ALT_GRUPLARI_CHOOSE_2]",
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
            ],
            onClick : function(pCallback)
            {                                
                pCallback(true)
            }
        }

        $scope.Btealtgrup2 = 
        {
            title : "Alt Grup2",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT [msg_S_0022] AS KODU ,[msg_S_0023] AS ADI FROM [dbo].[STOK_SEKTORLERI_CHOOSE_2] ",
            },
            selection : "",
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

        $scope.Btemodel = 
        {
            title : "model",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "Select [msg_S_0078] As KODU, [msg_S_0070] As ADI FROM STOK_MODEL_TANIMLARI_CHOOSE_2  ORDER BY  [msg_S_0078] ASC",
            },
            selection : "KODU",
            columns :
            [
                {
                    dataField: "ADI",
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
        $scope.Btetedarikci = 
        {
            title : "Tedarikci",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : " ",
            },
            selection : "",
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

        $scope.Bteraf = 
        {
            title : "Raf",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : " ",
            },
            selection : "",
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

        $scope.Btemateryal = 
        {
            title : "Materyal",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : " ",
            },
            selection : "",
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

        $scope.Btetasrengi = 
        {
            title : "Tas Rengi",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : " ",
            },
            selection : "",
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

        $scope.Btezincirsayisi = 
        {
            title : "Zincir Sayisi",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : " ",
            },
            selection : "",
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

        $scope.Btezincirengi = 
        {
            title : "Zincir Rengi",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : " ",
            },
            selection : "",
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

        $scope.Btefigur = 
        {
            title : "Figür",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : " ",
            },
            selection : "",
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

        $scope.Btefigursekli = 
        {
            title : "Figür Sekli",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : " ",
            },
            selection : "",
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
        $scope.Btefigurrengi = 
        {
            title : "Figür Rengi",
            
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : " ",
            },
            selection : "",
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
}