function GunokKullaniciAyarlari($scope, srv, $rootScope, $state)
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

            $rootScope.GeneralParamList = 
            {
                // Kullanıcı
                Password : srv.GetParamValue($scope.Data,"Password"),
                // Menü
                MonoMamulMalKabul : srv.GetParamValue($scope.Data,"MonoMamulMalKabul"),
                MonoYariMamulMalKabul : srv.GetParamValue($scope.Data,"MonoYariMamulMalKabul"),
                MonoBarkodEtiketBasimi : srv.GetParamValue($scope.Data,"MonoBarkodEtiketBasimi"),
                MonoKasaBarkodOlustur : srv.GetParamValue($scope.Data,"MonoKasaBarkodOlustur"),
                MonoFasonGiris : srv.GetParamValue($scope.Data,"MonoFasonGiris"),
                MonoElektrikUretim : srv.GetParamValue($scope.Data,"MonoElektrikUretim"),
                MonoBasarSayarBarkodOlustur : srv.GetParamValue($scope.Data,"MonoBasarSayarBarkodOlustur"),
                MonoUretimDashboard : srv.GetParamValue($scope.Data,"MonoUretimDashboard"),
                // Menü Yönetim
                MonoKullaniciAyarlari : srv.GetParamValue($scope.Data,"MonoKullaniciAyarlari"),
                MonoKullaniciEkle : srv.GetParamValue($scope.Data,"MonoKullaniciEkle"),
                MonoUretimSilme : srv.GetParamValue($scope.Data,"MonoUretimSilme"),
                // Menü Rapor
                MonoDepoTransferRaporu : srv.GetParamValue($scope.Data,"MonoDepoTransferRaporu"),
                MonoStokSeviyeleriRaporu : srv.GetParamValue($scope.Data,"MonoStokSeviyeleriRaporu"),
                MonoStokDepoGirisCikisRaporu : srv.GetParamValue($scope.Data,"MonoStokDepoGirisCikisRaporu"),
                // Parametre
                OperasyonKodu : srv.GetParamValue($scope.Data,"OperasyonKodu"),
                IsEmriOnayDurumu : srv.GetParamValue($scope.Data,"IsEmriOnayDurumu"),
                KapananIsEmri : srv.GetParamValue($scope.Data,"KapananIsEmri"),
                BarkodEtiketSeri : srv.GetParamValue($scope.Data,"BarkodEtiketSeri"),
                OperasyonSeri : srv.GetParamValue($scope.Data,"OperasyonSeri"),
                UrunCikisSeri : srv.GetParamValue($scope.Data,"UrunCikisSeri"),
                UrunGirisSeri : srv.GetParamValue($scope.Data,"UrunGirisSeri"),
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
                SatirBirlestir : srv.GetParamValue($scope.Data,"SatirBirlestir"),
            }
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
    async function ParamInsert(pData)
    {
        let InsertData = 
        [
            $rootScope.GeneralParamList.Account,
            pData[0],
            pData[1],
            pData[2],
            pData[3]
        ]
        let InsertControl = await srv.Execute($scope.Firma,'InsertParam',InsertData);
    }
    $scope.EditUser = async function(pKullanici)
    {
        $scope.Kullanici = pKullanici

        $scope.CmbAcilisSayfa =
        {
            datasource : 
            {
                db: "MikroDB_V16",
                query : "SELECT * FROM TERP_NITROWEB_PARAM_2 WHERE TYPE IN ('1','2','3') ORDER BY TYPE",
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
                data :  [{name: "TÜMÜ", special: "TUMU"},{name: "ONAYLI", special: "true"},{name: "ONAYSIZ", special: "false"}] 
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
                data :  [{name: "GÖSTER", special: "true"},{name: "GÖSTERME", special: "false"}] 
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
                MonoMamulMalKabul : $rootScope.GeneralParamList.MonoMamulMalKabul
            },
            {
                MonoYariMamulMalKabul : $rootScope.GeneralParamList.MonoYariMamulMalKabul
            },
            {
                MonoBarkodEtiketBasimi : $rootScope.GeneralParamList.MonoBarkodEtiketBasimi
            },
            {
                MonoKasaBarkodOlustur : $rootScope.GeneralParamList.MonoKasaBarkodOlustur
            },
            {
                MonoFasonGiris : $rootScope.GeneralParamList.MonoFasonGiris
            },
            {
                MonoElektrikUretim : $rootScope.GeneralParamList.MonoElektrikUretim
            },
            {
                MonoBasarSayarBarkodOlustur : $rootScope.GeneralParamList.MonoBasarSayarBarkodOlustur
            },
            {
                MonoUretimDashboard : $rootScope.GeneralParamList.MonoUretimDashboard
            },
            // Menü Yönetim
            {
                MonoKullaniciAyarlari : $rootScope.GeneralParamList.MonoKullaniciAyarlari
            },
            {
                MonoKullaniciEkle : $rootScope.GeneralParamList.MonoKullaniciEkle
            },
            {
                MonoUretimSilme : $rootScope.GeneralParamList.MonoUretimSilme
            },
            // Menü Rapor
            {
                MonoDepoTransferRaporu : $rootScope.GeneralParamList.MonoDepoTransferRaporu
            },
            {
                MonoStokSeviyeleriRaporu : $rootScope.GeneralParamList.MonoStokSeviyeleriRaporu
            },
            {
                MonoStokDepoGirisCikisRaporu : $rootScope.GeneralParamList.MonoStokDepoGirisCikisRaporu
            },
            // Parametre
            {
                BarkodEtiketSeri : $rootScope.GeneralParamList.BarkodEtiketSeri
            },
            {
                OperasyonSeri : $rootScope.GeneralParamList.OperasyonSeri
            },
            {
                UrunCikisSeri : $rootScope.GeneralParamList.UrunCikisSeri
            },
            {
                UrunGirisSeri : $rootScope.GeneralParamList.UrunGirisSeri
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
            ["MonoMamulMalKabul",$rootScope.GeneralParamList.MonoMamulMalKabul,1,"Mamül Mal Kabul"],
            ["MonoYariMamulMalKabul",$rootScope.GeneralParamList.MonoYariMamulMalKabul,1,"Yarı Mamül Mal Kabul"],
            ["MonoBarkodEtiketBasimi",$rootScope.GeneralParamList.MonoBarkodEtiketBasimi,1,"Barkod Etiket Basımı"],
            ["MonoKasaBarkodOlustur",$rootScope.GeneralParamList.MonoKasaBarkodOlustur,1,"Kasa Barkodu Oluştur"],
            ["MonoFasonGiris",$rootScope.GeneralParamList.MonoFasonGiris,1,"Fason Giriş"],
            ["MonoElektrikUretim",$rootScope.GeneralParamList.MonoElektrikUretim,1,"Elektrik Uretim"],
            ["MonoBasarSayarBarkodOlustur",$rootScope.GeneralParamList.MonoBasarSayarBarkodOlustur,1,"Basar Sayar Barkod Oluştur"],
            ["MonoUretimDashboard",$rootScope.GeneralParamList.MonoUretimDashboard,1,"Üretim Dashboard"],
            // Menü Yönetim
            ["MonoKullaniciAyarlari",$rootScope.GeneralParamList.MonoKullaniciAyarlari,2,"Kullanici Ayarları"],
            ["MonoKullaniciEkle",$rootScope.GeneralParamList.MonoKullaniciEkle,2,"Kullanıcı Ekle"],
            ["MonoUretimSilme",$rootScope.GeneralParamList.MonoUretimSilme,2,"Üretim Silme"],
            // Menü Rapor
            ["MonoDepoTransferRaporu",$rootScope.GeneralParamList.MonoDepoTransferRaporu,3,"Depo Transfer Raporu"],
            ["MonoStokSeviyeleriRaporu",$rootScope.GeneralParamList.MonoStokSeviyeleriRaporu,3,"Stok Seviyeleri Raporu"],
            ["MonoStokDepoGirisCikisRaporu",$rootScope.GeneralParamList.MonoStokDepoGirisCikisRaporu,3,"Depo Giriş Çıkış Raporu"],
            // Parametre
            ["OperasyonKodu",$rootScope.GeneralParamList.OperasyonKodu,4,""],
            ["IsEmriOnayDurumu",$rootScope.GeneralParamList.IsEmriOnayDurumu,4,""],
            ["KapananIsEmri",$rootScope.GeneralParamList.KapananIsEmri,4,""],
            ["BarkodEtiketSeri",$rootScope.GeneralParamList.BarkodEtiketSeri,4,""],
            ["OperasyonSeri",$rootScope.GeneralParamList.OperasyonSeri,4,""],
            ["UrunCikisSeri",$rootScope.GeneralParamList.UrunCikisSeri,4,""],
            ["UrunGirisSeri",$rootScope.GeneralParamList.UrunGirisSeri,4,""],
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
            ["SatirBirlestir",$rootScope.GeneralParamList.SatirBirlestir,5,""],
        ]

        if($rootScope.GeneralParamList.Account != "")
        {
            let TmpQuery = 
            {
                db: "MikroDB_V16",
                query : "SELECT TOP 1 ACCOUNT FROM TERP_NITROWEB_PARAM_2 WHERE ACCOUNT = @ACCOUNT",
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
                $state.go("main.MonoKullaniciAyarlari")
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
            db: "MikroDB_V16",
            query : "SELECT * FROM TERP_NITROWEB_PARAM_2 WHERE TYPE = @TYPE",
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
                MonoMamulMalKabul : false,
                MonoYariMamulMalKabul : false,
                MonoBarkodEtiketBasimi : false,
                MonoKasaBarkodOlustur : false,
                MonoFasonGiris : false,
                MonoElektrikUretim : false,
                MonoBasarSayarBarkodOlustur : false,
                MonoUretimDashboard : false,
                // Menü Yönetim
                MonoKullaniciAyarlari : false,
                MonoKullaniciEkle : false,
                MonoUretimSilme : false,
                // Menü Rapor
                MonoDepoTransferRaporu : false,
                MonoStokSeviyeleriRaporu : false,
                MonoStokDepoGirisCikisRaporu : false,
                // Parametre
                OperasyonKodu : "",
                IsEmriOnayDurumu : "",
                KapananIsEmri : "",
                BarkodEtiketSeri : "",
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
                SatirBirlestir : false,
            }
            $scope.CmbAcilisSayfa =
            {
                datasource : 
                {
                    db: "MikroDB_V16",
                    query : "SELECT TAG,SPECIAL,TYPE FROM TERP_NITROWEB_PARAM_2 WHERE TYPE IN ('1','2','3') GROUP BY TAG,SPECIAL,TYPE ORDER BY TYPE",
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
                    data :  [{name: "TÜMÜ", special: "TUMU"},{name: "ONAYLI", special: "true"},{name: "ONAYSIZ", special: "false"}] 
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
        }
    }
}