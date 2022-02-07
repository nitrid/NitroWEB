function KullaniciAyarlari($scope, srv, $rootScope, $state)
{
    async function InitGrd()
    {
        $("#GrdList").dxDataGrid
        (
            {
                dataSource: $scope.KullaniciList,
                allowColumnResizing: true,
                height: 400,
                width: "40%",
                columnWidth: 100,
                selection: 
                {
                    mode: "single"
                },
                columns :
                [
                    {      
                        caption: "DÜZENLE",
                        width: 90,
                        type: "buttons",
                        buttons: [ {
                            icon: "edit",
                            onClick: async function (e) 
                            {
                                await GetParamList(e.row.data.ACCOUNT)
                                $scope.EditUser(e.row.data.ACCOUNT)
                            }
                        }]
                    },
                    {
                        caption : "KULLANICI",
                        dataField: "ACCOUNT",
                    }, 
                ],
                hoverStateEnabled: true,
                showBorders: true,
                paging: 
                {
                    pageSize: 15
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
                onRowPrepared(e) 
                {
                    e.rowElement.addClass("font-weight-bold")
                },
                onSelectionChanged: function (selectedItems) 
                {
                    SelectionRow = selectedItems.selectedRowsData[0];
                }
            }
        )
    }
    async function GetParamList(pKullanici)
    {
        return new Promise(async resolve => 
        {
            $scope.Data = await srv.Execute($scope.Firm,'GetKullanici',[pKullanici])
            console.log($scope.Data)
            $rootScope.GeneralParamList = 
            {
                // Kullanıcı
                Password : srv.GetParamValue($scope.Data,"Password"),
                // Menü
                ResimYukleme : srv.GetParamValue($scope.Data,"ResimYukleme"),
                StokTanitimi : srv.GetParamValue($scope.Data,"StokTanitimi"),
                SiparisYazdir : srv.GetParamValue($scope.Data,"SiparisYazdir"),
                Siparisstokkontrol : srv.GetParamValue($scope.Data,"Siparisstokkontrol"),
                // Menü Yönetim
                KullaniciAyarlari : srv.GetParamValue($scope.Data,"KullaniciAyarlari"),
                KullaniciEkle : srv.GetParamValue($scope.Data,"KullaniciEkle"),
                UretimSilme : srv.GetParamValue($scope.Data,"UretimSilme"),
                // Parametre
                TasarimYolu : srv.GetParamValue($scope.Data,"TasarimYolu"),
                Tasarim : srv.GetParamValue($scope.Data,"Tasarim"),
                // Sistem
                AcilisSayfasi : srv.GetParamValue($scope.Data,"AcilisSayfasi"),
                Firma : srv.GetParamValue($scope.Data,"Firma"),
                FirmaListe : srv.GetParamValue($scope.Data,"FirmaListe"),
                KiloBaslangic : srv.GetParamValue($scope.Data,"KiloBaslangic"),
                KiloCarpan : srv.GetParamValue($scope.Data,"KiloCarpan"),
                KiloFlag : srv.GetParamValue($scope.Data,"KiloFlag"),
                KiloUzunluk : srv.GetParamValue($scope.Data,"KiloUzunluk"),
                MikroId : srv.GetParamValue($scope.Data,"MikroId"),
                PlasiyerKodu : srv.GetParamValue($scope.Data,"PlasiyerKodu"),
                StokEksiyeDusme : srv.GetParamValue($scope.Data,"StokEksiyeDusme"),
                SatirBirlestir : srv.GetParamValue($scope.Data,"SatirBirlestir"),
            }
            $scope.EditUser()
            resolve()
        });
    }
    async function ParamUpdate(pValue,pTag)
    {
        let UpdateData = 
        [
            pValue[0],
            pTag[0],
            $scope.Kullanici
        ]

        let UpdateControl = await srv.Execute($scope.Firma,'UpdateParam',UpdateData);

        UpdateControl == "" ? true : console.log(UpdateControl)
    }
    $scope.MaliyetDuzenModal= async function() 
    {
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            
            query :  "select sfl_aciklama,sfl_sirano, 0 AS MODEL,CASE sfl_special1 WHEN 1 THEN 'true' else 'false' end  AS DURUM from STOK_SATIS_FIYAT_LISTE_TANIMLARI ",
        }
        $scope.FiyatList = await srv.Execute(TmpQuery)
        $('#MaliyetDuzenModal').modal("show");
    }
    $scope.FiyatListeKayit = async function()
    {
        for (let i = 0; i < $scope.FiyatList.length; i++)
        {
            if($scope.FiyatList[i].DURUM == true)
            {
                let TmpQuery = 
                {
                    db: "{M}." + $scope.Firma,
                    query :  "UPDATE STOK_SATIS_FIYAT_LISTE_TANIMLARI SET sfl_special1 = @sfl_special1 where sfl_sirano =  @sfl_sirano",
                    param :["sfl_special1:string|50",'sfl_sirano:int'],
                    value : [1,$scope.FiyatList[i].sfl_sirano]
                }
            let TmpResult = await srv.Execute(TmpQuery)
            $scope.Init()
            }
            else
            {
                let TmpQuery = 
                {
                    db: "{M}." + $scope.Firma,
                    query :  "UPDATE STOK_SATIS_FIYAT_LISTE_TANIMLARI SET sfl_special1 = @sfl_special1 where sfl_sirano =  @sfl_sirano",
                    param :["sfl_special1:string|50",'sfl_sirano:int'],
                    value : [0,$scope.FiyatList[i].sfl_sirano]
                }
                let TmpResult = await srv.Execute(TmpQuery)
                $scope.Init()
            }
        }
        $('#MaliyetDuzenModal').modal("hide");
    }
    async function ParamInsert(pData)
    {
        let InsertData = 
        [
            $rootScope.GeneralParamList.Account,
            pData[0],
            pData[1],
            pData[2],
            pData[3],
            $scope.Firma
        ]
        let InsertControl = await srv.Execute($scope.Firma,'InsertParam',InsertData);
    }
    function GetTasarimList()
    {
        return new Promise(async resolve => 
        {
            let TasarimList = [];

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
    $scope.EditUser = async function(pKullanici)
    {
        $scope.Kullanici = pKullanici

        $scope.CmbAcilisSayfa =
        {
            datasource : 
            {
                db: "GENDB_NITROWEB",
                query : "SELECT TAG AS TAG,MAX(SPECIAL) AS SPECIAL FROM TERP_NITROWEB_PARAM_KUPPELI WHERE TYPE IN ('1','2','3') GROUP BY TAG ",
            },
            key : "TAG",
            value : "SPECIAL",
            defaultVal : $rootScope.GeneralParamList.AcilisSayfasi,
            selectionMode : "key",
            return : $rootScope.GeneralParamList.AcilisSayfasi,
            onSelected : function(pSelected)
            {
                $rootScope.GeneralParamList.AcilisSayfasi = pSelected
            }
        }
        $scope.CmbTasarimList =
        {
            datasource : 
            {
                data :  await GetTasarimList()
            },
            key : "key",
            value : "value",
            defaultVal : $rootScope.GeneralParamList.Tasarim,
            selectionMode : "value",
            return : $rootScope.GeneralParamList.Tasarim,
            onSelected : function(pSelected)
            {
                $rootScope.GeneralParamList.Tasarim = pSelected
            }
        }

        $("#TbUserEdit").addClass('show active');
        $("#TbUserList").removeClass('show active');
    }
    $scope.BtnBackKullaniciList = function()
    {
        $("#TbUserList").addClass('show active');
        $("#TbUserEdit").removeClass('show active');
    }
    $scope.BtnParamUpdate = async function()
    {
        let Param =
        [
            // Kullanıcı
            {
                Password : $rootScope.GeneralParamList.Password
            },
            {
                Kullanici : $scope.Kullanici
            },
            // Menü
            {
                ResimYukleme : $rootScope.GeneralParamList.ResimYukleme
            },
            {
                StokTanitimi : $rootScope.GeneralParamList.StokTanitimi
            },
            {
                SiparisYazdir : $rootScope.GeneralParamList.SiparisYazdir
            },
            {
                Siparisstokkontrol : $rootScope.GeneralParamList.Siparisstokkontrol
            },
        
            // Menü Yönetim
            {
                KullaniciAyarlari : $rootScope.GeneralParamList.KullaniciAyarlari
            },
            {
                KullaniciEkle : $rootScope.GeneralParamList.KullaniciEkle
            },
            {
                UretimSilme : $rootScope.GeneralParamList.UretimSilme
            },
            // Parametre
           
            {
                TasarimYolu : $rootScope.GeneralParamList.TasarimYolu
            },
            {
                Tasarim : $rootScope.GeneralParamList.Tasarim
            },
            // Sistem
            {
                AcilisSayfasi : $rootScope.GeneralParamList.AcilisSayfasi
            },
            {
                Firma : $rootScope.GeneralParamList.Firma
            },
            {
                FirmaListe : $rootScope.GeneralParamList.FirmaListe
            },
            {
                KiloBaslangic : $rootScope.GeneralParamList.KiloBaslangic
            },
            {
                KiloCarpan : $rootScope.GeneralParamList.KiloCarpan
            },
            {
                KiloFlag : $rootScope.GeneralParamList.KiloFlag
            },
            {
                KiloUzunluk : $rootScope.GeneralParamList.KiloUzunluk
            },
            {
                MikroId : $rootScope.GeneralParamList.MikroId
            },
            {
                PlasiyerKodu : $rootScope.GeneralParamList.PlasiyerKodu
            },
            {
                StokEksiyeDusme : $rootScope.GeneralParamList.StokEksiyeDusme
            },
            {
                SatirBirlestir : $rootScope.GeneralParamList.SatirBirlestir
            },
        ]
        for (let i = 0; i < Param.length; i++) 
        {
            ParamUpdate(Object.values(Param[i]),Object.keys(Param[i]))
        }
        swal("İşlem Başarılı!", "Kullanıcı Güncelleme İşlemi Gerçekleşti.",icon="success");
    }
    $scope.BtnParamInsert = async function()
    {
        $scope.InsertData = 
        [
            // Kullanıcı
            ["Password",$rootScope.GeneralParamList.Password,0,""],
            ["Kullanici",$scope.GeneralParamList.Account,0,""],
            // Menü
            ["ResimYukleme",$rootScope.GeneralParamList.Planlama,1,"ResimYukleme"],
            ["StokTanitimi",$rootScope.GeneralParamList.Planlama,1,"StokTanitimi"],
            ["SiparisYazdir",$rootScope.GeneralParamList.Planlama,1,"SiparisYazdir"],
            ["Siparisstokkontrol",$rootScope.GeneralParamList.Planlama,1,"Siparis Stok Kontrol"],
            
            // Menü Yönetim
            ["KullaniciAyarlari",$rootScope.GeneralParamList.KullaniciAyarlari,2,"Kullanici Ayarları"],
            ["KullaniciEkle",$rootScope.GeneralParamList.KullaniciEkle,2,"Kullanıcı Ekle"],
            ["UretimSilme",$rootScope.GeneralParamList.UretimSilme,2,"Üretim Silme"],
            // Parametre
            ["TasarimYolu",$rootScope.GeneralParamList.TasarimYolu,4,""],
            ["Tasarim",$rootScope.GeneralParamList.Tasarim,4,""],
            // Sistem
            ["AcilisSayfasi",$rootScope.GeneralParamList.AcilisSayfasi,5,""],
            ["Firma",$rootScope.GeneralParamList.Firma,5,""],
            ["FirmaListe",$rootScope.GeneralParamList.FirmaListe,5,""],
            ["KiloBaslangic",$rootScope.GeneralParamList.KiloBaslangic,5,""],
            ["KiloCarpan",$rootScope.GeneralParamList.KiloCarpan,5,""],
            ["KiloFlag",$rootScope.GeneralParamList.KiloFlag,5,""],
            ["KiloUzunluk",$rootScope.GeneralParamList.KiloUzunluk,5,""],
            ["MikroId",$rootScope.GeneralParamList.MikroId,5,""],
            ["PlasiyerKodu",$rootScope.GeneralParamList.PlasiyerKodu,5,""],
            ["StokEksiyeDusme",$rootScope.GeneralParamList.StokEksiyeDusme,5,""],
            ["SatirBirlestir",$rootScope.GeneralParamList.SatirBirlestir,5,""],
        ]

        if($rootScope.GeneralParamList.Account != "")
        {
            let TmpQuery = 
            {
                db: "GENDB_NITROWEB",
                query : "SELECT TOP 1 ACCOUNT FROM TERP_NITROWEB_PARAM_KUPPELI WHERE ACCOUNT = @ACCOUNT",
                param : ['ACCOUNT'],
                type :  ['string|50'],
                value : [$rootScope.GeneralParamList.Account]
            }
            let IsThereAccount = await srv.Execute(TmpQuery)
    
            if(IsThereAccount.length == 0)
            {
                for(let i = 0; i < $scope.InsertData.length; i++)
                {
                    ParamInsert($scope.InsertData[i])
                }
                $state.go("main.KullaniciAyarlari")
            }
            else
            {
                swal("Bu İsimde Kullanıcı Var!", "Lütfen farklı bir kullanıcı adı giriniz.",icon="error");
            }
        }
        else
        {
            swal("Giriş Boş Geçilemez!", "Lütfen giriş bölümüne kullanıcı adı girin.",icon="error");
        }
    }
    $scope.Init = async function(pTip)
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));

        $rootScope.GeneralParamList = {};
      
        let TmpQuery = 
        {
            db: "GENDB_NITROWEB",
            query : "SELECT * FROM TERP_NITROWEB_PARAM_KUPPELI WHERE TYPE = @TYPE AND TAG = 'Password' ",
            param : ['TYPE'],
            type :  ['int'],
            value : ['0']
        }
        $scope.KullaniciList = await srv.Execute(TmpQuery)

        if(pTip == 0)
        {
            $rootScope.PageName = "KULLANICI AYARLARI"
            InitGrd([]);
        }
        else
        {
            $rootScope.PageName = "KULLANICI EKLE"
            $scope.InsertData = []

            $rootScope.GeneralParamList = 
            {
                // Kullanıcı
                Account : "",
                Password : "",
                // Menü
                Planlama : false,
                Operator : false,
                UretimTamamlama : false,
                UretimDashboard : false,
                // Menü Yönetim
                KullaniciAyarlari : false,
                KullaniciEkle : false,
                UretimSilme : false,
                // Parametre
                OperasyonKodu : "",
                IsEmriOnayDurumu : "",
                KapananIsEmri : "",
                TasarimYolu : "",
                Tasarim : "",
                OperasyonSeri : "",
                UrunCikisSeri : "",
                UrunGirisSeri : "",
                // Sistem
                AcilisSayfasi : "",
                Firma : "",
                FirmaListe : "",
                KiloBaslangic : "",
                KiloCarpan : "",
                KiloFlag : "",
                KiloUzunluk : "",
                MikroId : "",
                PlasiyerKodu : "",
                StokEksiyeDusme : false,
                SatirBirlestir : false,
            }
            $scope.CmbAcilisSayfa =
            {
                datasource : 
                {
                    db: "GENDB_NITROWEB",
                    query : "SELECT TAG,SPECIAL,TYPE FROM TERP_NITROWEB_PARAM_KUPPELI WHERE TYPE IN ('1','2','3') GROUP BY TAG,SPECIAL,TYPE ORDER BY TYPE",
                },
                key : "TAG",
                value : "SPECIAL",
                defaultVal : $rootScope.GeneralParamList.AcilisSayfasi,
                selectionMode : "key",
                return : $rootScope.GeneralParamList.AcilisSayfasi,
                onSelected : function(pSelected)
                {
                    $rootScope.GeneralParamList.AcilisSayfasi = pSelected
                }
            }
            $scope.CmbOperasyon =
            {
                datasource : 
                {
                    db: "MikroDB_V16_" + $scope.Firma,
                    query : "SELECT Op_Kodu AS KODU,Op_Aciklama AS ACIKLAMA FROM URETIM_OPERASYONLARI",
                },
                key : "KODU",
                value : "ACIKLAMA",
                defaultVal : $rootScope.GeneralParamList.OperasyonKodu,
                selectionMode : "key",
                return : $rootScope.GeneralParamList.OperasyonKodu,
                onSelected : function(pSelected)
                {
                    $rootScope.GeneralParamList.OperasyonKodu = pSelected
                }
            }
            $scope.CmbIsEmriOnayDurumu =
            {
                datasource : 
                {
                    data :  [{name: "ONAYLI", special: "true"},{name: "ONAYSIZ", special: "false"}] 
                },
                key : "special",
                value : "name",
                defaultVal : $rootScope.GeneralParamList.IsEmriOnayDurumu,
                selectionMode : "key",
                return : $rootScope.GeneralParamList.IsEmriOnayDurumu,
                onSelected : function(pSelected)
                {
                    $rootScope.GeneralParamList.IsEmriOnayDurumu = pSelected
                }
            }
            $scope.CmbKapananIsEmri =
            {
                datasource : 
                {
                    data :  [{name: "GÖSTER", special: "-1"},{name: "GÖSTERME", special: "2"}] 
                },
                key : "special",
                value : "name",
                defaultVal : $rootScope.GeneralParamList.KapananIsEmri,
                selectionMode : "key",
                return : $rootScope.GeneralParamList.KapananIsEmri,
                onSelected : function(pSelected)
                {
                    $rootScope.GeneralParamList.KapananIsEmri = pSelected
                }
            }
            $scope.CmbTasarimList =
            {
                datasource : 
                {
                    data :  await GetTasarimList()
                },
                key : "key",
                value : "value",
                defaultVal : $rootScope.GeneralParamList.Tasarim,
                selectionMode : "key",
                return : $rootScope.GeneralParamList.Tasarim,
                onSelected : function(pSelected)
                {
                    $rootScope.GeneralParamList.Tasarim = pSelected
                }
            }
        }
    }
}