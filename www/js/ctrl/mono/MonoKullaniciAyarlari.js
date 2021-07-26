function MonoKullaniciAyarlari($scope, srv, $rootScope, $state)
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
                            onClick: async function (e) {
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
                BarkodEtiketSeri : srv.GetParamValue($scope.Data,"BarkodEtiketSeri"),
                BasarSayarHasasTeraziIP : srv.GetParamValue($scope.Data,"BasarSayarHasasTeraziIP"),
                BasarSayarHasasTeraziPORT : srv.GetParamValue($scope.Data,"BasarSayarHasasTeraziPORT"),
                BasarSayarKantarIP : srv.GetParamValue($scope.Data,"BasarSayarKantarIP"),
                BasarSayarKantarPORT : srv.GetParamValue($scope.Data,"BasarSayarKantarPORT"),
                BasarSayarSeri : srv.GetParamValue($scope.Data,"BasarSayarSeri"),
                ElektrikUretimEtiketSeri : srv.GetParamValue($scope.Data,"ElektrikUretimEtiketSeri"),
                ElektrikUretimIsEmriFlag : srv.GetParamValue($scope.Data,"ElektrikUretimIsEmriFlag"),
                ElektrikUretimOperasyonSeri : srv.GetParamValue($scope.Data,"ElektrikUretimOperasyonSeri"),
                ElektrikUretimUrunCikisSeri : srv.GetParamValue($scope.Data,"ElektrikUretimUrunCikisSeri"),
                ElektrikUretimUrunGirisSeri : srv.GetParamValue($scope.Data,"ElektrikUretimUrunGirisSeri"),
                FasonCikisSeri : srv.GetParamValue($scope.Data,"FasonCikisSeri"),
                FasonDepo : srv.GetParamValue($scope.Data,"FasonDepo"),
                FasonEtiketSeri : srv.GetParamValue($scope.Data,"FasonEtiketSeri"),
                FasonGirisSeri : srv.GetParamValue($scope.Data,"FasonGirisSeri"),
                KasaBarkodSeri : srv.GetParamValue($scope.Data,"KasaBarkodSeri"),
                MamulEtiketSeri : srv.GetParamValue($scope.Data,"MamulEtiketSeri"),
                MamulMalKabulDepo : srv.GetParamValue($scope.Data,"MamulMalKabulDepo"),
                ElektirikMalKabulDepo : srv.GetParamValue($scope.Data,"ElektirikMalKabulDepo"),
                OperasyonSeri : srv.GetParamValue($scope.Data,"OperasyonSeri"),
                UrunCikisSeri : srv.GetParamValue($scope.Data,"UrunCikisSeri"),
                UrunGirisSeri : srv.GetParamValue($scope.Data,"UrunGirisSeri"),
                YariMamulDepo : srv.GetParamValue($scope.Data,"YariMamulDepo"),
                YariMamulEtiketSeri : srv.GetParamValue($scope.Data,"YariMamulEtiketSeri"),
                YariMamulGramKontrol : srv.GetParamValue($scope.Data,"YariMamulGramKontrol"),
                YariMamulGramYuzde : srv.GetParamValue($scope.Data,"YariMamulGramYuzde"),
                YariMamulIsEmriFlag : srv.GetParamValue($scope.Data,"YariMamulIsEmriFlag"),
                YariMamulManuelGiris : srv.GetParamValue($scope.Data,"YariMamulManuelGiris"),
                YariMamulOperasyonSeri : srv.GetParamValue($scope.Data,"YariMamulOperasyonSeri"),
                YariMamulUrunCikisSeri : srv.GetParamValue($scope.Data,"YariMamulUrunCikisSeri"),
                YariMamulUrunGirisSeri : srv.GetParamValue($scope.Data,"YariMamulUrunGirisSeri"),
                YariMamulMalKabulEtiket : srv.GetParamValue($scope.Data,"YariMamulMalKabulEtiket"),
                ElektrikMalKabulEtiket : srv.GetParamValue($scope.Data,"ElektrikMalKabulEtiket"),
                BarkodBasimiEtiket : srv.GetParamValue($scope.Data,"BarkodBasimiEtiket"),
                MamulMalKabulEtiket : srv.GetParamValue($scope.Data,"MamulMalKabulEtiket"),
                FasonGirisEtiket : srv.GetParamValue($scope.Data,"FasonGirisEtiket"),
                BasarSayarEtiket : srv.GetParamValue($scope.Data,"BasarSayarEtiket"),
                KasaEtiket : srv.GetParamValue($scope.Data,"KasaEtiket"),
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
            pTag[0]
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
                query : "SELECT * FROM TERP_NITROWEB_PARAM WHERE TYPE IN ('1','2','3') ORDER BY TYPE",
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
                BasarSayarHasasTeraziIP : $rootScope.GeneralParamList.BasarSayarHasasTeraziIP
            },
            {
                BasarSayarHasasTeraziPORT : $rootScope.GeneralParamList.BasarSayarHasasTeraziPORT
            },
            {
                BasarSayarKantarIP : $rootScope.GeneralParamList.BasarSayarKantarIP
            },
            {
                BasarSayarKantarPORT : $rootScope.GeneralParamList.BasarSayarKantarPORT
            },
            {
                BasarSayarSeri : $rootScope.GeneralParamList.BasarSayarSeri
            },
            {
                ElektrikUretimEtiketSeri : $rootScope.GeneralParamList.ElektrikUretimEtiketSeri
            },
            {
                ElektrikUretimIsEmriFlag : $rootScope.GeneralParamList.ElektrikUretimIsEmriFlag
            },
            {
                ElektrikUretimOperasyonSeri : $rootScope.GeneralParamList.ElektrikUretimOperasyonSeri
            },
            {
                ElektrikUretimUrunCikisSeri : $rootScope.GeneralParamList.ElektrikUretimUrunCikisSeri
            },
            {
                ElektrikUretimUrunGirisSeri : $rootScope.GeneralParamList.ElektrikUretimUrunGirisSeri
            },
            {
                FasonCikisSeri : $rootScope.GeneralParamList.FasonCikisSeri
            },
            {
                FasonDepo : $rootScope.GeneralParamList.FasonDepo
            },
            {
                FasonEtiketSeri : $rootScope.GeneralParamList.FasonEtiketSeri
            },
            {
                FasonGirisSeri : $rootScope.GeneralParamList.FasonGirisSeri
            },
            {
                KasaBarkodSeri : $rootScope.GeneralParamList.KasaBarkodSeri
            },
            {
                MamulEtiketSeri : $rootScope.GeneralParamList.MamulEtiketSeri
            },
            {
                MamulMalKabulDepo : $rootScope.GeneralParamList.MamulMalKabulDepo
            },
            {
                ElektirikMalKabulDepo : $rootScope.GeneralParamList.ElektirikMalKabulDepo
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
            {
                YariMamulDepo : $rootScope.GeneralParamList.YariMamulDepo
            },
            {
                YariMamulEtiketSeri : $rootScope.GeneralParamList.YariMamulEtiketSeri
            },
            {
                YariMamulGramKontrol : $rootScope.GeneralParamList.YariMamulGramKontrol
            },
            {
                YariMamulGramYuzde : $rootScope.GeneralParamList.YariMamulGramYuzde
            },
            {
                YariMamulIsEmriFlag : $rootScope.GeneralParamList.YariMamulIsEmriFlag
            },
            {
                YariMamulManuelGiris : $rootScope.GeneralParamList.YariMamulManuelGiris
            },
            {
                YariMamulOperasyonSeri : $rootScope.GeneralParamList.YariMamulOperasyonSeri
            },
            {
                YariMamulUrunCikisSeri : $rootScope.GeneralParamList.YariMamulUrunCikisSeri
            },
            {
                YariMamulUrunGirisSeri : $rootScope.GeneralParamList.YariMamulUrunGirisSeri
            },
            {
                YariMamulMalKabulEtiket : $rootScope.GeneralParamList.YariMamulMalKabulEtiket
            },
            {
                ElektrikMalKabulEtiket : $rootScope.GeneralParamList.ElektrikMalKabulEtiket
            },
            {
                BarkodBasimiEtiket : $rootScope.GeneralParamList.BarkodBasimiEtiket
            },
            {
                MamulMalKabulEtiket : $rootScope.GeneralParamList.MamulMalKabulEtiket
            },
            {
                FasonGirisEtiket : $rootScope.GeneralParamList.FasonGirisEtiket
            },
            {
                BasarSayarEtiket : $rootScope.GeneralParamList.BasarSayarEtiket
            },
            {
                KasaEtiket : $rootScope.GeneralParamList.KasaEtiket
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
        console.log(Param)
        for (let i = 0; i < Param.length; i++) 
        {
            ParamUpdate(Object.values(Param[i]),Object.keys(Param[i]))
        }
        swal("İşlem Başarılı!", "Kullanıcı Güncelleme İşlemi Gerçekleşti.",icon="success");
    }
    $scope.BtnParamInsert = async function()
    {
        console.log($rootScope.GeneralParamList.MonoStokDepoGirisCikisRaporu)
        $scope.InsertData = 
        [
            // Kullanıcı
            ["Password",$rootScope.GeneralParamList.Password,0,""],
            // Menü
            ["MonoMamulMalKabul",$rootScope.GeneralParamList.MonoMamulMalKabul,1,"Mamül Mal Kabul"],
            ["MonoYariMamulMalKabul",$rootScope.GeneralParamList.MonoYariMamulMalKabul,1,"Yarı Mamül Mal Kabul"],
            ["MonoBarkodEtiketBasimi",$rootScope.GeneralParamList.MonoBarkodEtiketBasimi,1,"Barkod Etiket Basımı"],
            ["MonoKasaBarkodOlustur",$rootScope.GeneralParamList.MonoKasaBarkodOlustur,1,"Kasa Barkodu Oluştur"],
            ["MonoFasonGiris",$rootScope.GeneralParamList.MonoFasonGiris,1,"Fason Giriş"],
            ["MonoElektrikUretim",$rootScope.GeneralParamList.MonoElektrikUretim,1,"Elektrik  Uretim"],
            ["MonoBasarSayarBarkodOlustur",$rootScope.GeneralParamList.MonoBasarSayarBarkodOlustur,1,"Basar Sayar Barkod Oluştur"],
            ["MonoUretimDashboard",$rootScope.GeneralParamList.MonoUretimDashboard,1,"Üretim Dashboard"],
            // Menü Yönetim
            ["MonoKullaniciAyarlari",$rootScope.GeneralParamList.MonoKullaniciAyarlari,2,"Kullanici Ayarları"],
            ["MonoKullaniciEkle",$rootScope.GeneralParamList.MonoKullaniciEkle,2,"MonoKullaniciEkle"],
            ["MonoUretimSilme",$rootScope.GeneralParamList.MonoUretimSilme,2,"MonoUretimSilme"],
            // Menü Rapor
            ["MonoDepoTransferRaporu",$rootScope.GeneralParamList.MonoDepoTransferRaporu,3,"MonoDepoTransferRaporu"],
            ["MonoStokSeviyeleriRaporu",$rootScope.GeneralParamList.MonoStokSeviyeleriRaporu,3,"MonoStokSeviyeleriRaporu"],
            ["MonoStokDepoGirisCikisRaporu",$rootScope.GeneralParamList.MonoStokDepoGirisCikisRaporu,3,"MonoStokDepoGirisCikisRaporu"],
            // Parametre
            ["BarkodEtiketSeri",$rootScope.GeneralParamList.BarkodEtiketSeri,4,""],
            ["BasarSayarHasasTeraziIP",$rootScope.GeneralParamList.BasarSayarHasasTeraziIP,4,""],
            ["BasarSayarHasasTeraziPORT",$rootScope.GeneralParamList.BasarSayarHasasTeraziPORT,4,""],
            ["BasarSayarKantarIP",$rootScope.GeneralParamList.BasarSayarKantarIP,4,""],
            ["BasarSayarKantarPORT",$rootScope.GeneralParamList.BasarSayarKantarPORT,4,""],
            ["BasarSayarSeri",$rootScope.GeneralParamList.BasarSayarSeri,4,""],
            ["ElektrikUretimEtiketSeri",$rootScope.GeneralParamList.ElektrikUretimEtiketSeri,4,""],
            ["ElektrikUretimIsEmriFlag",$rootScope.GeneralParamList.ElektrikUretimIsEmriFlag,4,""],
            ["ElektrikUretimOperasyonSeri",$rootScope.GeneralParamList.ElektrikUretimOperasyonSeri,4,""],
            ["ElektrikUretimUrunCikisSeri",$rootScope.GeneralParamList.ElektrikUretimUrunCikisSeri,4,""],
            ["ElektrikUretimUrunGirisSeri",$rootScope.GeneralParamList.ElektrikUretimUrunGirisSeri,4,""],
            ["FasonCikisSeri",$rootScope.GeneralParamList.FasonCikisSeri,4,""],
            ["FasonDepo",$rootScope.GeneralParamList.FasonDepo,4,""],
            ["FasonEtiketSeri",$rootScope.GeneralParamList.FasonEtiketSeri,4,""],
            ["FasonGirisSeri",$rootScope.GeneralParamList.FasonGirisSeri,4,""],
            ["KasaBarkodSeri",$rootScope.GeneralParamList.KasaBarkodSeri,4,""],
            ["MamulEtiketSeri",$rootScope.GeneralParamList.MamulEtiketSeri,4,""],
            ["MamulMalKabulDepo",$rootScope.GeneralParamList.MamulMalKabulDepo,4,""],
            ["ElektirikMalKabulDepo",$rootScope.GeneralParamList.ElektirikMalKabulDepo,4,""],
            ["OperasyonSeri",$rootScope.GeneralParamList.OperasyonSeri,4,""],
            ["UrunCikisSeri",$rootScope.GeneralParamList.UrunCikisSeri,4,""],
            ["UrunGirisSeri",$rootScope.GeneralParamList.UrunGirisSeri,4,""],
            ["YariMamulDepo",$rootScope.GeneralParamList.YariMamulDepo,4,""],
            ["YariMamulEtiketSeri",$rootScope.GeneralParamList.YariMamulEtiketSeri,4,""],
            ["YariMamulGramKontrol",$rootScope.GeneralParamList.YariMamulGramKontrol,4,""],
            ["YariMamulGramYuzde",$rootScope.GeneralParamList.YariMamulGramYuzde,4,""],
            ["YariMamulIsEmriFlag",$rootScope.GeneralParamList.YariMamulIsEmriFlag,4,""],
            ["YariMamulManuelGiris",$rootScope.GeneralParamList.YariMamulManuelGiris,4,""],
            ["YariMamulOperasyonSeri",$rootScope.GeneralParamList.YariMamulOperasyonSeri,4,""],
            ["YariMamulUrunCikisSeri",$rootScope.GeneralParamList.YariMamulUrunCikisSeri,4,""],
            ["YariMamulUrunGirisSeri",$rootScope.GeneralParamList.YariMamulUrunGirisSeri,4,""],
            ["YariMamulMalKabulEtiket",$rootScope.GeneralParamList.YariMamulMalKabulEtiket,4,"Yari Mamul Mal Kabul Etiket - 1"],
            ["ElektrikMalKabulEtiket",$rootScope.GeneralParamList.ElektrikMalKabulEtiket,4,"Barkod Etiketi"],
            ["BarkodBasimiEtiket",$rootScope.GeneralParamList.BarkodBasimiEtiket,4,"Barkod Basimi Etiket - 1"],
            ["MamulMalKabulEtiket",$rootScope.GeneralParamList.MamulMalKabulEtiket,4,"Mamul Mal Kabul Etiket - 1"],
            ["FasonGirisEtiket",$rootScope.GeneralParamList.FasonGirisEtiket,4,"Fason Giris Etiket - 1"],
            ["BasarSayarEtiket",$rootScope.GeneralParamList.BasarSayarEtiket,4,"Basar Sayar Etiket - 1"],
            ["KasaEtiket",$rootScope.GeneralParamList.KasaEtiket,4,"Kasa Etiket - 1"],
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

        console.log($scope.InsertData)
        if($rootScope.GeneralParamList.Account != "")
        {
            let TmpQuery = 
            {
                db: "MikroDB_V16",
                query : "SELECT TOP 1 ACCOUNT FROM TERP_NITROWEB_PARAM WHERE ACCOUNT = @ACCOUNT",
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
            query : "SELECT * FROM TERP_NITROWEB_PARAM WHERE TYPE = @TYPE",
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
                BarkodEtiketSeri : "",
                BasarSayarHasasTeraziIP : "",
                BasarSayarHasasTeraziPORT : "",
                BasarSayarKantarIP : "",
                BasarSayarKantarPORT : "",
                BasarSayarSeri : "",
                ElektrikUretimEtiketSeri : "",
                ElektrikUretimIsEmriFlag : "",
                ElektrikUretimOperasyonSeri : "",
                ElektrikUretimUrunCikisSeri : "",
                ElektrikUretimUrunGirisSeri : "",
                FasonCikisSeri : "",
                FasonDepo : "",
                FasonEtiketSeri : "",
                FasonGirisSeri : "",
                KasaBarkodSeri : "",
                MamulEtiketSeri : "",
                MamulMalKabulDepo : "",
                ElektirikMalKabulDepo : "",
                OperasyonSeri : "",
                UrunCikisSeri : "",
                UrunGirisSeri : "",
                YariMamulDepo : "",
                YariMamulEtiketSeri : "",
                YariMamulGramKontrol : false,
                YariMamulGramYuzde : "",
                YariMamulIsEmriFlag : "",
                YariMamulManuelGiris : false,
                YariMamulOperasyonSeri : "",
                YariMamulUrunCikisSeri : "",
                YariMamulUrunGirisSeri : "",
                YariMamulMalKabulEtiket : "",
                ElektrikMalKabulEtiket : "",
                BarkodBasimiEtiket : "",
                MamulMalKabulEtiket : "",
                FasonGirisEtiket : "",
                BasarSayarEtiket : "",
                KasaEtiket : "",
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
            console.log($rootScope.GeneralParamList)

            $scope.CmbAcilisSayfa =
            {
                datasource : 
                {
                    db: "MikroDB_V16",
                    query : "SELECT TAG,SPECIAL,TYPE FROM TERP_NITROWEB_PARAM WHERE TYPE IN ('1','2','3') GROUP BY TAG,SPECIAL,TYPE ORDER BY TYPE",
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
        }
    }
}
