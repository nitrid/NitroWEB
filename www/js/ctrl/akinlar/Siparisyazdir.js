function SiparisYazdir($scope,srv,$rootScope,$filter)
{
    function InitObj()
    {
        $scope.BteSiparis = 
        {
            title : "Siparis",
            txt : "",
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT sip_evrakno_seri AS SERI,sip_evrakno_sira AS SIRA FROM SIPARISLER GROUP BY sip_evrakno_seri,sip_evrakno_sira ORDER BY sip_evrakno_seri,sip_evrakno_sira"
            },
            selection : "KODU",
            columns :
            [
                {
                    dataField: "SERI",
                    width: 200
                }, 
                {
                    dataField: "SIRA",
                    width: 200
                }, 
            ],
            onSelected : async function(pData)
            {
                if(typeof pData != 'undefined')
                {                    
                    $scope.Seri = pData.SERI
                    $scope.Sira =  pData.SIRA
                }
            }
        }
    
    }
    $scope.Init = async function()
    {        
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "SiparisYazdir"
        $scope.Seri = '';
        $scope.Sira = 0

        InitObj();
    }
    $scope.BtnYazdir =  async function()
    {
        if($scope.Seri == '' || $scope.Sira == 0)
        {
            swal("Dikkat", "Lütfen Sipariş Seçin ",icon="warning");
        }
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
          query : "SELECT    " +
         " sip_evrakno_seri + '-' + CONVERT(NVARCHAR(20),sip_evrakno_sira) AS EVRAKNO, " +
         " SIPARISLER.sip_stok_kod AS STOK_KOD, SIPARISLER.sip_b_fiyat AS BIRIMF,  " +
         " CASE WHEN BdnHar_BedenNo IS NULL THEN sip_miktar ELSE BdnHar_HarGor END AS MIKTAR,  " +
         " CONVERT(VARCHAR(10),GETDATE(),108)  as SAAT, " +
         "                       CASE WHEN BdnHar_BedenNo IS NULL THEN sip_iskonto_1 ELSE (sip_iskonto_1 / sip_miktar) * BdnHar_HarGor END AS ISKONTO1,  " +
         "                       ISNULL((SELECT cari_per_adi FROM CARI_PERSONEL_TANIMLARI WHERE cari_per_kod = SIPARISLER.sip_satici_kod),'') as SATICI, " +
         "                       SIPARISLER.sip_iskonto_1 * 100 / CASE WHEN SIPARISLER.sip_tutar = 0 THEN 1 ELSE SIPARISLER.sip_tutar END AS ISKONTOY1,  " +
         "                       CASE WHEN BdnHar_BedenNo IS NULL THEN sip_iskonto_1 ELSE (sip_iskonto_1 / sip_miktar) * BdnHar_HarGor END AS ISKONTO1,  " +
         "                       SIPARISLER.sip_iskonto_2 * 100 / CASE WHEN (SIPARISLER.sip_tutar - SIPARISLER.sip_iskonto_1)  " +
         "                       = 0 THEN 1 ELSE (SIPARISLER.sip_tutar - SIPARISLER.sip_iskonto_1) END AS ISKONTOY2, SIPARISLER.sip_create_date AS TARIH,  " +
         "                       SIPARISLER.sip_evrakno_seri AS SERI, SIPARISLER.sip_evrakno_sira AS SIRA, 0 AS EVRAKTIP, SIPARISLER.sip_belgeno AS BELGENO,  " +
         "                       SIPARISLER.sip_aciklama AS ACIKLAMA, SIPARISLER.sip_musteri_kod AS CARIKODU, 0 AS MEBLAG,  " +
         "                       CASE WHEN BdnHar_BedenNo IS NULL THEN sip_vergi ELSE (sip_vergi / sip_miktar) * BdnHar_HarGor END AS KDV,  " +
         "                       CASE WHEN BdnHar_BedenNo IS NULL THEN sip_tutar ELSE (sip_tutar  / sip_miktar) * BdnHar_HarGor END AS TUTAR, " +
         "                       0 AS ARATOPLAM, STOKLAR.sto_isim AS STOK_ADI, CARI_HESAPLAR.cari_unvan1 AS CARIADI,  " +
         "                       CARI_HESAPLAR.cari_unvan2 AS CARIADI2, CARI_HESAP_ADRESLERI.adr_cadde AS CADDE, CARI_HESAP_ADRESLERI.adr_sokak AS SOKAK,  " +
         "                       CARI_HESAP_ADRESLERI.adr_ilce AS ILCE, CARI_HESAP_ADRESLERI.adr_il AS IL, CARI_HESAP_ADRESLERI.adr_tel_bolge_kodu AS BOLGE,  " +
         "                       CARI_HESAP_ADRESLERI.adr_tel_no1 AS TELNO, CARI_HESAPLAR.cari_vdaire_adi AS VDADI, CARI_HESAPLAR.cari_vdaire_no AS VDNO,  " +
         "                       MIN(BARKOD_TANIMLARI.bar_kodu) AS BARKOD, CASE WHEN dbo.fn_VergiYuzde(CONVERT(tinyint, SIPARISLER.sip_vergi_pntr)) = 0 THEN NULL  " +
         "                       ELSE dbo.fn_VergiYuzde(CONVERT(tinyint, SIPARISLER.sip_vergi_pntr)) END AS KDVORAN,  " +
         "                       CASE WHEN SIPARISLER.sip_vergi = 0 THEN (CASE WHEN SIPARISLER.sip_tutar = 0 THEN 1 ELSE SIPARISLER.sip_tutar END - (SIPARISLER.sip_iskonto_1   " +
         "                        + SIPARISLER.sip_iskonto_2)) * dbo.fn_VergiYuzde(CONVERT(tinyint, SIPARISLER.sip_vergi_pntr))   " +
         "                       / 100 ELSE SIPARISLER.sip_vergi END AS sth_vergi, SIPARISLER.sip_iskonto_1 + SIPARISLER.sip_iskonto_2 AS ISK12TOP,  " +
         "                       CASE WHEN iSNULL(ODEME_PLANLARI.odp_adi, 'D') = 'D' THEN 'PESIN' ELSE ODEME_PLANLARI.odp_adi END AS ODEMEPLAN,  " +
         "                           ISNULL((SELECT     dbo.fn_CariHesapBakiye(0, CARI_HESAPLAR.cari_hareket_tipi, CARI_HESAPLAR.cari_kod, N'', N'', 0, 0,0,0,0,0)), 0) AS BAKIYE, " +
         "                           (SELECT     dbo.fn_StokBirimi(SIPARISLER.sip_stok_kod, SIPARISLER.sip_birim_pntr) AS Expr1) AS BIRIM," +
         "                       CASE WHEN BdnHar_BedenNo IS NULL THEN sip_tutar - (sip_iskonto_1 + sip_iskonto_2) + sip_vergi ELSE ((sip_tutar - (sip_iskonto_1 + sip_iskonto_2) + sip_vergi) / sip_miktar) * BdnHar_HarGor END AS GENELTOPLAMA, " +
         "                            SIPARISLER.sip_special1, " +
         "                       [dbo].[fn_beden_kirilimi]([dbo].[fn_bedenharnodan_beden_no_bul] (BdnHar_BedenNo),(SELECT sto_beden_kodu FROM STOKLAR WHERE sto_kod = sip_stok_kod)) AS BEDEN,  " +
         "                       [dbo].[fn_renk_kirilimi]([dbo].[fn_bedenharnodan_renk_no_bul] (BdnHar_BedenNo),(SELECT sto_renk_kodu FROM STOKLAR WHERE sto_kod = sip_stok_kod)) AS RENK, " +
         "                     MAX(sto_uretici_kodu) AS URETICIKODU," +
         "                     MAX(sto_kalkon_kodu) AS KALITEKODU,  " +
         "                     MAX(sto_sezon_kodu) AS RENKKODU, " +
         "                     MAX(sto_marka_kodu) AS MODELKODU, " +
         "                     ISNULL((SELECT mrk_ismi FROM STOK_MARKALARI  WHERE mrk_kod = MAX(sto_marka_kodu)),'') AS MODELADI, " +
         "                     ISNULL((SELECT KKon_ismi FROM STOK_KALITE_KONTROL_TANIMLARI WHERE KKon_kod = MAX(sto_kalkon_kodu)),'') AS KALITEADI, " +
         "                     ISNULL((SELECT ysn_ismi FROM STOK_YILSEZON_TANIMLARI WHERE ysn_kodu = MAX(sto_sezon_kodu)),'') AS SEZONADI, " +
         "                 (SELECT top 1 'https://altinayak.com.tr/upload/product/'+SIP.sip_stok_kod+'-1.jpg' FROM SIPARISLER AS SIP WHERE SIP.sip_stok_kod = SIPARISLER.sip_stok_kod) AS PICTURE  " +
         " FROM         ODEME_PLANLARI RIGHT OUTER JOIN  " +
         "                       SIPARISLER ON ODEME_PLANLARI.odp_no = SIPARISLER.sip_opno LEFT OUTER JOIN  " +
         "                       CARI_HESAPLAR ON SIPARISLER.sip_musteri_kod = CARI_HESAPLAR.cari_kod LEFT OUTER JOIN  " +
         "                       STOKLAR INNER JOIN  " +
         "                       BARKOD_TANIMLARI ON STOKLAR.sto_kod = BARKOD_TANIMLARI.bar_stokkodu ON SIPARISLER.sip_stok_kod = STOKLAR.sto_kod LEFT OUTER JOIN  " +
         "                       CARI_HESAP_ADRESLERI ON SIPARISLER.sip_musteri_kod = CARI_HESAP_ADRESLERI.adr_cari_kod AND   " +
         "                       SIPARISLER.sip_adresno = CARI_HESAP_ADRESLERI.adr_adres_no  " +
         "                       LEFT OUTER JOIN BEDEN_HAREKETLERI AS BEDENHAR ON   " +
         "                       BdnHar_Har_uid = sip_Guid AND BdnHar_Tipi = 9  " +
         " WHERE sip_evrakno_seri = @sip_evrakno_seri AND sip_evrakno_sira = @sip_evrakno_sira  " +
         " GROUP BY SIPARISLER.sip_stok_kod, SIPARISLER.sip_b_fiyat, SIPARISLER.sip_miktar, SIPARISLER.sip_iskonto_1,   " +
         "                       SIPARISLER.sip_iskonto_1 * 100 / CASE WHEN SIPARISLER.sip_tutar = 0 THEN 1 ELSE SIPARISLER.sip_tutar END, SIPARISLER.sip_iskonto_2,   " +
         "                       SIPARISLER.sip_iskonto_2 * 100 / CASE WHEN (SIPARISLER.sip_tutar - SIPARISLER.sip_iskonto_1)   " +
         "                       = 0 THEN 1 ELSE (SIPARISLER.sip_tutar - SIPARISLER.sip_iskonto_1) END, SIPARISLER.sip_create_date, SIPARISLER.sip_evrakno_seri,   " +
         "                       SIPARISLER.sip_evrakno_sira, SIPARISLER.sip_belgeno, SIPARISLER.sip_aciklama, SIPARISLER.sip_musteri_kod, SIPARISLER.sip_vergi,   " +
         "                       SIPARISLER.sip_tutar, STOKLAR.sto_isim, CARI_HESAPLAR.cari_unvan1, CARI_HESAPLAR.cari_unvan2, CARI_HESAP_ADRESLERI.adr_cadde,   " +
         "                       CARI_HESAP_ADRESLERI.adr_sokak, CARI_HESAP_ADRESLERI.adr_ilce, CARI_HESAP_ADRESLERI.adr_il,   " +
         "                       CARI_HESAP_ADRESLERI.adr_tel_bolge_kodu, CARI_HESAP_ADRESLERI.adr_tel_no1, CARI_HESAPLAR.cari_vdaire_adi,   " +
         "                       CARI_HESAPLAR.cari_vdaire_no, SIPARISLER.sip_iskonto_1 + SIPARISLER.sip_iskonto_2,   " +
         "                       SIPARISLER.sip_tutar - (SIPARISLER.sip_iskonto_1 + SIPARISLER.sip_iskonto_2) + SIPARISLER.sip_vergi, SIPARISLER.sip_special1,SIPARISLER.sip_vergi_pntr,ODEME_PLANLARI.odp_adi " +
         " ,CARI_HESAPLAR.cari_kod,SIPARISLER.sip_birim_pntr,SIPARISLER.sip_satici_kod,CARI_HESAPLAR.cari_hareket_tipi,BdnHar_BedenNo,BdnHar_HarGor",
            
            param : ['sip_evrakno_seri','sip_evrakno_sira'],
            type : ['string|25','int'],
            value : [$scope.Seri,$scope.Sira]
        }
        let TmpResult = await srv.Execute(TmpQuery)
        
        return new Promise(async resolve => 
        {
            srv.Emit('DevPrint',"{TYPE:'PRINT',PATH:'" + $scope.GeneralParamList.TasarimYolu + "/" + "RESIMLISIPARIS.repx" + "',DATA:"+ JSON.stringify(TmpResult).split("İ").join("I").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u") +"}",(pResult)=>
            {
                console.log(pResult)
            })
            
        
            swal("İşlem Başarılı!", "Yazdırma İşlemi Gerçekleştirildi.",icon="success");
            resolve()
        });
    }
}