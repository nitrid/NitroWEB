var Query = 
{
    Firma : 
    {
        query : 'SELECT DB_kod AS FIRM FROM VERI_TABANLARI'
    },
    Stok : 
    {
        query : "SELECT * FROM STOKLAR WHERE ((sto_kod = @sto_kod) OR (@sto_kod = ''))",
        param : ['sto_kod'],
        type : ['string|25'] 
    },
    PartiLotInsert :
    {
        query : "INSERT INTO [dbo].[PARTILOT] " +
           "([pl_DBCno] " +
            ",[pl_SpecRECno] " +
            ",[pl_iptal] " +
            ",[pl_fileid] " +
            ",[pl_hidden] " +
            ",[pl_kilitli] " +
            ",[pl_degisti] " +
            ",[pl_checksum] " +
            ",[pl_create_user] " +
            ",[pl_create_date] " +
            ",[pl_lastup_user] " +
            ",[pl_lastup_date] " +
            ",[pl_ozelkod1] " +
            ",[pl_ozelkod2] " +
            ",[pl_ozelkod3] " +
            ",[pl_partikodu] " +
            ",[pl_lotno] " +
            ",[pl_stokkodu] " +
            ",[pl_aciklama] " +
            ",[pl_olckalkdeg_deg1] " +
            ",[pl_olckalkdeg_deg2] " +
            ",[pl_olckalkdeg_deg3] " +
            ",[pl_olckalkdeg_deg4] " +
            ",[pl_olckalkdeg_deg5] " +
            ",[pl_olckalkdeg_deg6] " +
            ",[pl_olckalkdeg_deg7] " +
            ",[pl_olckalkdeg_deg8] " +
            ",[pl_olckalkdeg_deg9] " +
            ",[pl_olckalkdeg_deg10] " +
            ",[pl_olckalkdeg_aciklama1] " +
            ",[pl_olckalkdeg_aciklama2] " +
            ",[pl_olckalkdeg_aciklama3] " +
            ",[pl_olckalkdeg_aciklama4] " +
            ",[pl_olckalkdeg_aciklama5] " +
            ",[pl_olckalkdeg_aciklama6] " +
            ",[pl_olckalkdeg_aciklama7] " +
            ",[pl_olckalkdeg_aciklama8] " +
            ",[pl_olckalkdeg_aciklama9] " +
            ",[pl_olckalkdeg_aciklama10] " +
            ",[pl_son_kullanim_tar] " +
            ",[pl_DaraliKilo] " +
            ",[pl_SafiKilo] " +
            ",[pl_En] " +
            ",[pl_Boy] " +
            ",[pl_Yukseklik] " +
            ",[pl_OzgulAgirlik] " +
            ",[pl_kod1] " +
            ",[pl_kod2] " +
            ",[pl_kod3] " +
            ",[pl_kod4] " +
            ",[pl_kod5] " +
            ",[pl_kod6] " +
            ",[pl_kod7] " +
            ",[pl_kod8] " +
            ",[pl_kod9] " +
            ",[pl_kod10] " +
            ",[pl_uretim_tar]) " +
            "VALUES " +
            "(0 \n" +
            ",0 \n" +
            ",0 \n" +
            ",153 \n" +
            ",0 \n" +
            ",0 \n" +
            ",0 \n" +
            ",0 \n" +
            ",@pl_create_user						--<pl_create_user, smallint,> \n" +
            ",CONVERT(VARCHAR(10),GETDATE(),112)	--<pl_create_date, datetime,> \n" +
            ",@pl_lastup_user						--<pl_lastup_user, smallint,> \n" +
            ",CONVERT(VARCHAR(10),GETDATE(),112)	--<pl_lastup_date, datetime,> \n" +
            ",''									--<pl_ozelkod1, nvarchar(4),> \n" +
            ",''									--<pl_ozelkod2, nvarchar(4),> \n" +
            ",''									--<pl_ozelkod3, nvarchar(4),> \n" +
            ",@pl_partikodu						--<pl_partikodu, nvarchar(25),> \n" +
            ",@pl_lotno							--<pl_lotno, int,> \n" +
            ",@pl_stokkodu						--<pl_stokkodu, nvarchar(25),> \n" +
            ",''								--<pl_aciklama, nvarchar(50),> \n" +
            ",0									--<pl_olckalkdeg_deg1, float,> \n" +
            ",0									--<pl_olckalkdeg_deg2, float,> \n" +
            ",0									--<pl_olckalkdeg_deg3, float,> \n" +
            ",0									--<pl_olckalkdeg_deg4, float,> \n" +
            ",0									--<pl_olckalkdeg_deg5, float,> \n" +
            ",0									--<pl_olckalkdeg_deg6, float,> \n" +
            ",0									--<pl_olckalkdeg_deg7, float,> \n" +
            ",0									--<pl_olckalkdeg_deg8, float,> \n" +
            ",0									--<pl_olckalkdeg_deg9, float,> \n" +
            ",0									--<pl_olckalkdeg_deg10, float,> \n" +
            ",''									--<pl_olckalkdeg_aciklama1, nvarchar(25),> \n" +
            ",''									--<pl_olckalkdeg_aciklama2, nvarchar(25),> \n" +
            ",''									--<pl_olckalkdeg_aciklama3, nvarchar(25),> \n" +
            ",''									--<pl_olckalkdeg_aciklama4, nvarchar(25),> \n" +
            ",''									--<pl_olckalkdeg_aciklama5, nvarchar(25),> \n" +
            ",''									--<pl_olckalkdeg_aciklama6, nvarchar(25),> \n" + 
            ",''									--<pl_olckalkdeg_aciklama7, nvarchar(25),> \n" +
            ",''									--<pl_olckalkdeg_aciklama8, nvarchar(25),> \n" +
            ",''									--<pl_olckalkdeg_aciklama9, nvarchar(25),> \n" +
            ",''									--<pl_olckalkdeg_aciklama10, nvarchar(25),> \n" +
            ",@pl_son_kullanim_tar						--<pl_son_kullanim_tar, datetime,> \n" +
            ",0									--<pl_DaraliKilo, float,> \n" +
            ",0									--<pl_SafiKilo, float,> \n" +
            ",0									--<pl_En, float,> \n" +
            ",0									--<pl_Boy, float,> \n" +
            ",0									--<pl_Yukseklik, float,> \n" +
            ",0									--<pl_OzgulAgirlik, float,> \n" +
            ",''									--<pl_kod1, nvarchar(25),> \n" +
            ",''									--<pl_kod2, nvarchar(25),> \n" +
            ",''									--<pl_kod3, nvarchar(25),> \n" +
            ",''									--<pl_kod4, nvarchar(25),> \n" +
            ",''									--<pl_kod5, nvarchar(25),> \n" +
            ",''									--<pl_kod6, nvarchar(25),> \n" +
            ",''									--<pl_kod7, nvarchar(25),> \n" +
            ",''									--<pl_kod8, nvarchar(25),> \n" +
            ",''									--<pl_kod9, nvarchar(25),> \n" +
            ",''									--<pl_kod10, nvarchar(25),> \n" +
            ",CONVERT(VARCHAR(10),GETDATE(),112)	--<pl_uretim_tar, datetime,> \n" +
            ")",
        param : ['pl_create_user:int','pl_lastup_user:int','pl_partikodu:string|25','pl_lotno:int','pl_stokkodu:string|25','pl_son_kullanim_tar:date']
    },
    MaxPartiLot : 
    {
        query : "SELECT ISNULL(MAX(pl_lotno),0) + 1 AS LOT " +
                "FROM PARTILOT  WHERE pl_partikodu = @pl_partikodu " ,
        param : ['pl_partikodu'],
        type : ['string|25']
    },
    BarkodInsert :
    {
        query : "INSERT INTO [dbo].[BARKOD_TANIMLARI] " +
                "([bar_Guid] " +
                ",[bar_DBCno] " +
                ",[bar_SpecRECno] " +
                ",[bar_iptal] " +
                ",[bar_fileid] " +
                ",[bar_hidden] " +
                ",[bar_kilitli] " +
                ",[bar_degisti] " +
                ",[bar_checksum] " +
                ",[bar_create_user] " +
                ",[bar_create_date] " +
                ",[bar_lastup_user] " +
                ",[bar_lastup_date] " +
                ",[bar_special1] " +
                ",[bar_special2] " +
                ",[bar_special3] " +
                ",[bar_kodu] " +
                ",[bar_stokkodu] " +
                ",[bar_partikodu] " +
                ",[bar_lotno] " +
                ",[bar_serino_veya_bagkodu] " +
                ",[bar_barkodtipi] " +
                ",[bar_icerigi] " +
                ",[bar_birimpntr] " +
                ",[bar_master] " +
                ",[bar_bedenpntr] " +
                ",[bar_renkpntr] " +
                ",[bar_baglantitipi] " +
                ",[bar_har_uid] " +
                ",[bar_asortitanimkodu] " +
                ") VALUES ( " +
                "NEWID()            --<bar_Guid, uniqueidentifier,> \n" +
                ",0                 --<bar_DBCno, smallint,> \n" +
                ",0                 --<bar_SpecRECno, int,> \n" +
                ",0                 --<bar_iptal, bit,> \n" +
                ",0                 --<bar_fileid, smallint,> \n" +
                ",0                 --<bar_hidden, bit,> \n" +
                ",0                 --<bar_kilitli, bit,> \n" +
                ",0                 --<bar_degisti, bit,> \n" +
                ",0                 --<bar_checksum, int,> \n" +
                ",@bar_create_user          --<bar_create_user, smallint,> \n" +
                ",GETDATE()         --<bar_create_date, datetime,> \n" +
                ",@bar_lastup_user  --<bar_lastup_user, smallint,> \n" +
                ",GETDATE()         --<bar_lastup_date, datetime,> \n" +
                ",''                --<bar_special1, nvarchar(4),> \n" +
                ",''                --<bar_special2, nvarchar(4),> \n" +
                ",''                --<bar_special3, nvarchar(4),> \n" +
                ",@bar_kodu         --<bar_kodu, [dbo].[barkod_str],> \n" +
                ",@bar_stokkodu     --<bar_stokkodu, nvarchar(25),> \n" +
                ",@bar_partikodu    --<bar_partikodu, nvarchar(25),> \n" +
                ",@bar_lotno         --<bar_lotno, int,> \n" +
                ",''                --<bar_serino_veya_bagkodu, nvarchar(25),> \n" +
                ",@bar_barkodtipi   --<bar_barkodtipi, tinyint,> \n" +
                ",0                 --<bar_icerigi, tinyint,> \n" + 
                ",@bar_birimpntr    --<bar_birimpntr, tinyint,> \n" +
                ",@bar_master       --<bar_master, bit,> \n" +
                ",0                 --<bar_bedenpntr, tinyint,> \n" +
                ",0                 --<bar_renkpntr, tinyint,> \n" +
                ",@bar_baglantitipi --,<bar_baglantitipi, tinyint,> \n" +
                ",'00000000-0000-0000-0000-000000000000'        --<bar_har_uid, uniqueidentifier,> \n" +
                ",0                 --<bar_asortitanimkodu, nvarchar(25),> \n" +
                ") ",
        param : ['bar_create_user:int','bar_lastup_user:int','bar_kodu:string|25','bar_stokkodu:string|25','bar_partikodu:string|25',
                 'bar_lotno:int','bar_barkodtipi:int','bar_birimpntr:int','bar_master:bit','bar_baglantitipi:int']
    },  
    //Sipariş
    SiparisInsert : 
    {
        query : "DECLARE @UIDTABLE table([sip_Guid] [uniqueidentifier]) " +
                "INSERT INTO [SIPARISLER] " +
                "([sip_DBCno] " +
                ",[sip_SpecRECno] " +
                ",[sip_iptal] " +
                ",[sip_fileid] " +
                ",[sip_hidden] " +
                ",[sip_kilitli] " +
                ",[sip_degisti] " +
                ",[sip_checksum] " +
                ",[sip_create_user] " +
                ",[sip_create_date] " +
                ",[sip_lastup_user] " +
                ",[sip_lastup_date] " +
                ",[sip_special1] " +
                ",[sip_special2] " +
                ",[sip_special3] " +
                ",[sip_firmano] " +
                ",[sip_subeno] " +
                ",[sip_tarih] " +
                ",[sip_teslim_tarih] " +
                ",[sip_tip] " +
                ",[sip_cins] " +
                ",[sip_evrakno_seri] " +
                ",[sip_evrakno_sira] " +
                ",[sip_satirno] " +
                ",[sip_belgeno] " +
                ",[sip_belge_tarih] " +
                ",[sip_satici_kod] " +
                ",[sip_musteri_kod] " +
                ",[sip_stok_kod] " +
                ",[sip_b_fiyat] " +
                ",[sip_miktar] " +
                ",[sip_birim_pntr] " +
                ",[sip_teslim_miktar] " +
                ",[sip_tutar] " +
                ",[sip_iskonto_1] " +
                ",[sip_iskonto_2] " +
                ",[sip_iskonto_3] " +
                ",[sip_iskonto_4] " +
                ",[sip_iskonto_5] " +
                ",[sip_iskonto_6] " +
                ",[sip_masraf_1] " +
                ",[sip_masraf_2] " +
                ",[sip_masraf_3] " +
                ",[sip_masraf_4] " +
                ",[sip_vergi_pntr] " +
                ",[sip_vergi] " +
                ",[sip_masvergi_pntr] " +
                ",[sip_masvergi] " +
                ",[sip_opno] " +
                ",[sip_aciklama] " +
                ",[sip_aciklama2] " +
                ",[sip_depono] " +
                ",[sip_OnaylayanKulNo] " +
                ",[sip_vergisiz_fl] " +
                ",[sip_kapat_fl] " +
                ",[sip_cari_sormerk] " +
                ",[sip_stok_sormerk] " +
                ",[sip_cari_grupno] " +
                ",[sip_doviz_cinsi] " +
                ",[sip_doviz_kuru] " +
                ",[sip_alt_doviz_kuru] " +
                ",[sip_adresno] " +
                ",[sip_teslimturu] " +
                ",[sip_cagrilabilir_fl] " +
                ",[sip_prosip_uid] " +
                ",[sip_iskonto1] " +
                ",[sip_iskonto2] " +
                ",[sip_iskonto3] " +
                ",[sip_iskonto4] " +
                ",[sip_iskonto5] " +
                ",[sip_iskonto6] " +
                ",[sip_masraf1] " +
                ",[sip_masraf2] " +
                ",[sip_masraf3] " +
                ",[sip_masraf4] " +
                ",[sip_isk1] " +
                ",[sip_isk2] " +
                ",[sip_isk3] " +
                ",[sip_isk4] " +
                ",[sip_isk5] " +
                ",[sip_isk6] " +
                ",[sip_mas1] " +
                ",[sip_mas2] " +
                ",[sip_mas3] " +
                ",[sip_mas4] " +
                ",[sip_Exp_Imp_Kodu] " +
                ",[sip_kar_orani] " +
                ",[sip_durumu] " +
                ",[sip_stal_uid] " +
                ",[sip_planlananmiktar] " +
                ",[sip_teklif_uid] " +
                ",[sip_parti_kodu] " +
                ",[sip_lot_no] " +
                ",[sip_projekodu] " +
                ",[sip_fiyat_liste_no] " +
                ",[sip_Otv_Pntr] " +
                ",[sip_Otv_Vergi] " +
                ",[sip_otvtutari] " +
                ",[sip_OtvVergisiz_Fl] " +
                ",[sip_paket_kod] " +
                ",[sip_Rez_uid] " +
                ",[sip_harekettipi] " +
                ",[sip_yetkili_uid] " +
                ",[sip_kapatmanedenkod] " +
                ",[sip_gecerlilik_tarihi] " +
                ",[sip_onodeme_evrak_tip] " +
                ",[sip_onodeme_evrak_seri] " +
                ",[sip_onodeme_evrak_sira] " +
                ",[sip_rezervasyon_miktari] " +
                ",[sip_rezerveden_teslim_edilen] " +
                ",[sip_HareketGrupKodu1] " +
                ",[sip_HareketGrupKodu2] " +
                ",[sip_HareketGrupKodu3] " +
                ") " +
                "OUTPUT INSERTED.[sip_Guid] INTO @UIDTABLE " +
                "VALUES ( " +
                "0							                    --<sip_DBCno, smallint,> \n" +
                ",0							                    --<sip_SpecRECno, int,> \n" +
                ",0							                    --<sip_iptal, bit,> \n" +
                ",21						                    --<sip_fileid, smallint,> \n" +
                ",0							                    --<sip_hidden, bit,> \n" +
                ",0							                    --<sip_kilitli, bit,> \n" +
                ",0							                    --<sip_degisti, bit,> \n" +
                ",0							                    --<sip_checksum, int,> \n" +
                ",@sip_create_user			                    --<sip_create_user, smallint,> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112)		    --<sip_create_date, datetime,> \n" +
                ",@sip_lastup_user			                    --<sip_lastup_user, smallint,> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112)		    --<sip_lastup_date, datetime,> \n" +
                ",''							                --<sip_special1, varchar(4),> \n" +
                ",''							                --<sip_special2, varchar(4),> \n" +
                ",''							                --<sip_special3, varchar(4),> \n" +
                ",@sip_firmano					                --<sip_firmano, int,> \n" +
                ",@sip_subeno						            --<sip_subeno, int,> \n" +
                ",@sip_tarih					                --<sip_tarih, datetime,> \n" +
                ",@sip_teslim_tarih			                    --<sip_teslim_tarih, datetime,> \n" +
                ",@sip_tip					                    --<sip_tip, tinyint,> \n" +
                ",@sip_cins					                    --<sip_cins, tinyint,> \n" +
                ",@sip_evrakno_seri			                    --<sip_evrakno_seri, varchar(4),> \n" +
                ",@sip_evrakno_sira			                    --<sip_evrakno_sira, int,> \n" +
                ",(SELECT ISNULL(MAX(sip_satirno),-1) + 1 AS SATIRNO FROM SIPARISLER WHERE sip_evrakno_seri = @sip_evrakno_seri AND sip_evrakno_sira = @sip_evrakno_sira AND sip_tip = @sip_tip AND sip_cins = @sip_cins)				                    --<sip_satirno, int,> \n" +
                ",@sip_belgeno				                    --<sip_belgeno, varchar(15),> \n" +
                ",@sip_belge_tarih			                    --<sip_belge_tarih, datetime,> \n" +
                ",@sip_satici_kod				                --<sip_satici_kod, varchar(25),> \n" +
                ",@sip_musteri_kod			                    --<sip_musteri_kod, varchar(25),> \n" +
                ",@sip_stok_kod				                    --<sip_stok_kod, varchar(25),> \n" +
                ",@sip_b_fiyat				                    --<sip_b_fiyat, float,> \n" +
                ",@sip_miktar					                --<sip_miktar, float,> \n" +
                ",@sip_birim_pntr				                --<sip_birim_pntr, tinyint,> \n" +
                ",@sip_teslim_miktar			                --<sip_teslim_miktar, float,> \n" +
                ",@sip_tutar					                --<sip_tutar, float,> \n" +
                ",@sip_iskonto_1				                --<sip_iskonto_1, float,> \n" +
                ",@sip_iskonto_2				                --<sip_iskonto_2, float,> \n" +
                ",@sip_iskonto_3				                --<sip_iskonto_3, float,> \n" +
                ",@sip_iskonto_4				                --<sip_iskonto_4, float,> \n" +
                ",@sip_iskonto_5				                --<sip_iskonto_5, float,> \n" +
                ",@sip_iskonto_6				                --<sip_iskonto_6, float,> \n" +
                ",0							                    --<sip_masraf_1, float,> \n" +
                ",0							                    --<sip_masraf_2, float,> \n" +
                ",0							                    --<sip_masraf_3, float,> \n" +
                ",0							                    --<sip_masraf_4, float,> \n" +
                ",@sip_vergi_pntr				                --<sip_vergi_pntr, tinyint,> \n" +
                ",@sip_vergi					                --<sip_vergi, float,> \n" +
                ",0							                    --<sip_masvergi_pntr, tinyint,> \n" +
                ",0							                    --<sip_masvergi, float,> \n" +
                ",@sip_opno					                    --<sip_opno, int,> \n" +
                ",@sip_aciklama				                    --<sip_aciklama, varchar(40),> \n" +
                ",''							                --<sip_aciklama2, varchar(40),> \n" +
                ",@sip_depono					                --<sip_depono, int,> \n" +
                ",@sip_OnaylayanKulNo					        --<sip_OnaylayanKulNo, smallint,> \n" +
                ",0							                    --<sip_vergisiz_fl, bit,> \n" +
                ",0							                    --<sip_kapat_fl, bit,> \n" +
                ",@sip_cari_sormerk			                    --<sip_cari_sormerk, varchar(25),> \n" +
                ",@sip_stok_sormerk			                    --<sip_stok_sormerk, varchar(25),> \n" +
                ",0							                    --<sip_cari_grupno, tinyint,> \n" +
                ",@sip_doviz_cinsi			                    --<sip_doviz_cinsi, tinyint,> \n" +
                ",@sip_doviz_kuru				                --<sip_doviz_kuru, float,> \n" +
                ",@sip_alt_doviz_kuru			                --<sip_alt_doviz_kuru, float,> \n" +
                ",@sip_adresno							        --<sip_adresno, int,> \n" +
                ",''							                --<sip_teslimturu, varchar(4),> \n" +
                ",1							                    --<sip_cagrilabilir_fl, bit,> \n" +
                ",cast(cast(0 as binary) as uniqueidentifier)	--<sip_prosip_uid> \n" +
                ",@sip_iskonto1				                    --<sip_iskonto1, tinyint,> \n" +
                ",@sip_iskonto2				                    --<sip_iskonto2, tinyint,> \n" +
                ",@sip_iskonto3				                    --<sip_iskonto3, tinyint,> \n" +
                ",@sip_iskonto4				                    --<sip_iskonto4, tinyint,> \n" +
                ",@sip_iskonto5				                    --<sip_iskonto5, tinyint,> \n" +
                ",@sip_iskonto6				                    --<sip_iskonto6, tinyint,> \n" +
                ",1							                    --<sip_masraf1, tinyint,> \n" +
                ",1							                    --<sip_masraf2, tinyint,> \n" +
                ",1							                    --<sip_masraf3, tinyint,> \n" +
                ",1							                    --<sip_masraf4, tinyint,> \n" +
                ",@sip_isk1					                    --<sip_isk1, bit,> \n" +
                ",@sip_isk2					                    --<sip_isk2, bit,> \n" +
                ",@sip_isk3					                    --<sip_isk3, bit,> \n" +
                ",@sip_isk4					                    --<sip_isk4, bit,> \n" +
                ",@sip_isk5					                    --<sip_isk5, bit,> \n" +
                ",@sip_isk6					                    --<sip_isk6, bit,> \n" +
                ",0							                    --<sip_mas1, bit,> \n" +
                ",0							                    --<sip_mas2, bit,> \n" +
                ",0							                    --<sip_mas3, bit,> \n" +
                ",0							                    --<sip_mas4, bit,> \n" +
                ",''							                --<sip_Exp_Imp_Kodu, varchar(25),> \n" +
                ",0							                    --<sip_kar_orani, float,> \n" +
                ",0							                    --<sip_durumu, tinyint,> \n" +
                ",cast(cast(0 as binary) as uniqueidentifier)	--<sip_stal_uid> \n" +
                ",0							                    --<sip_planlananmiktar, float,> \n" +
                ",cast(cast(0 as binary) as uniqueidentifier)	--<sip_teklif_uid> \n" +
                ",@sip_parti_kodu					            --<sip_parti_kodu, varchar(25),> \n" +
                ",@sip_lot_no						            --<sip_lot_no, int,> \n" +
                ",@sip_projekodu					            --<sip_projekodu, varchar(25),> \n" +
                ",@sip_fiyat_liste_no					        --<sip_fiyat_liste_no, int,> \n" +
                ",0							                    --<sip_Otv_Pntr, tinyint,> \n" +
                ",0							                    --<sip_Otv_Vergi, float,> \n" +
                ",0							                    --<sip_otvtutari, float,> \n" +
                ",0							                    --<sip_OtvVergisiz_Fl, tinyint,> \n" +
                ",''							                --<sip_paket_kod, varchar(25),> \n" +
                ",cast(cast(0 as binary) as uniqueidentifier)	--<sip_Rez_uid> \n" +
                ",0                                             --<sip_harekettipi, tinyint,> \n" +
                ",cast(cast(0 as binary) as uniqueidentifier)	--<sip_yetkili_uid> \n" +
                ",''							                --<sip_kapatmanedenkod> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112)			--<sip_gecerlilik_tarihi> \n" +
                ",0							                    --<sip_onodeme_evrak_tip> \n" +
                ",''							                --<sip_onodeme_evrak_seri> \n" +
                ",0							                    --<sip_onodeme_evrak_sira> \n" +
                ",@sip_rezervasyon_miktari 				        --<sip_rezervasyon_miktari> \n" +
                ",@sip_rezerveden_teslim_edilen			        --<sip_rezerveden_teslim_edilen> \n" +
                ",''							                --<sip_HareketGrupKodu1> \n" +
                ",''							                --<sip_HareketGrupKodu2> \n" +
                ",''							                --<sip_HareketGrupKodu3> \n" +
                ") " +
                "SELECT [sip_Guid] FROM @UIDTABLE ",
        param : ['sip_create_user:int','sip_lastup_user:int','sip_firmano:int','sip_subeno:int','sip_tarih:date','sip_teslim_tarih:date','sip_tip:int',
                 'sip_cins:int','sip_evrakno_seri:string|4','sip_evrakno_sira:int','sip_belgeno:string|15','sip_belge_tarih:date','sip_satici_kod:string|25',
                 'sip_musteri_kod:string|25','sip_stok_kod:string|25','sip_b_fiyat:float','sip_miktar:float','sip_birim_pntr:int','sip_teslim_miktar:float',
                 'sip_tutar:float','sip_iskonto_1:float','sip_iskonto_2:float','sip_iskonto_3:float','sip_iskonto_4:float','sip_iskonto_5:float',
                 'sip_iskonto_6:float','sip_vergi_pntr:int','sip_vergi:float','sip_opno:int','sip_aciklama:string|40','sip_depono:int','sip_OnaylayanKulNo:int',
                 'sip_cari_sormerk:string|25','sip_stok_sormerk:string|25','sip_doviz_cinsi:int','sip_doviz_kuru:float','sip_alt_doviz_kuru:float',
                 'sip_adresno:int','sip_iskonto1:int','sip_iskonto2:int','sip_iskonto3:int','sip_iskonto4:int','sip_iskonto5:int','sip_iskonto6:int',
                 'sip_isk1:bit','sip_isk2:bit','sip_isk3:bit','sip_isk4:bit','sip_isk5:bit','sip_isk6:bit','sip_parti_kodu:string|25','sip_lot_no:int',
                 'sip_projekodu:string|25','sip_fiyat_liste_no:int','sip_rezervasyon_miktari:float','sip_rezerveden_teslim_edilen:float']
    },
    SiparisGetir:
    {
        query:  "SELECT ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod = sip_stok_kod),'') AS ADI, " +
                "ROUND((sip_tutar / sip_miktar),2) AS FIYAT, " +
                "ROUND(sip_tutar,2) AS TUTAR, " +
                "ROW_NUMBER() OVER(ORDER BY sip_Guid) AS NO, " +
                "(SELECT som_isim FROM SORUMLULUK_MERKEZLERI WHERE som_kod = sip_stok_sormerk) AS SORUMLUMERADI ," +
                "(SELECT cari_per_adi FROM CARI_PERSONEL_TANIMLARI WHERE cari_per_kod = sip_satici_kod) AS PERSONELADI," +
                "(SELECT dbo.fn_VergiYuzde (sip_vergi_pntr)) AS VERGIPNTR, " +
                "(SELECT dbo.fn_StokBirimi(sip_stok_kod,sip_birim_pntr)) AS BIRIMADI, " +
                "(SELECT dbo.fn_StokBirimHesapla(sip_stok_kod,1,sip_miktar,sip_birim_pntr)) AS BIRIM, " +
                "ISNULL((SELECT TOP 1 (SELECT [dbo].fn_bedenharnodan_renk_no_bul(BdnHar_BedenNo)) FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid = sip_Guid AND BdnHar_Tipi = 9),0) AS RENKPNTR , " +
                "ISNULL((SELECT TOP 1 (SELECT [dbo].fn_bedenharnodan_beden_no_bul(BdnHar_BedenNo)) FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid = sip_Guid AND BdnHar_Tipi = 9),0) AS BEDENPNTR , " +
                "* FROM SIPARISLER WHERE sip_evrakno_seri = @sip_evrakno_seri AND " +
                "sip_evrakno_sira = @sip_evrakno_sira and sip_tip = @sip_tip and sip_cins = @sip_cins " +
                "ORDER BY sip_satirno ASC ",
        param:  ['sip_evrakno_seri','sip_evrakno_sira','sip_tip','sip_cins'],
        type:   ['string|20','int','int','int']
    },
    SiparisEvrDelete:
    {
        query:  "DELETE FROM SIPARISLER WHERE sip_evrakno_seri = @sip_evrakno_seri AND " + 
                "sip_evrakno_sira = @sip_evrakno_sira and sip_tip = @sip_tip and sip_cins = @sip_cins",
        param:  ['sip_evrakno_seri','sip_evrakno_sira','sip_tip','sip_cins'],
        type:   ['string|20','int','int','int']
    },
    SiparisSatirDelete:
    {
        query:  "DELETE FROM SIPARISLER WHERE sip_Guid = @sip_Guid",
        param:  ['sip_Guid'],
        type:   ['string|50']
    },
    SiparisUpdate:
    {
        query:  "UPDATE SIPARISLER " +
                "SET sip_b_fiyat=@sip_b_fiyat " + 
                ",sip_miktar=@sip_miktar " +
                ",sip_tutar=@sip_tutar " +
                ",sip_vergi = (@sip_tutar - (@sip_iskonto_1 + @sip_iskonto_2 + @sip_iskonto_3 + @sip_iskonto_4 + @sip_iskonto_5))  * (SELECT [dbo].[fn_VergiYuzde] (@sip_vergi_pntr) / 100) " +
                ",sip_iskonto_1=@sip_iskonto_1 " +
                ",sip_iskonto_2=@sip_iskonto_2 " +
                ",sip_iskonto_3=@sip_iskonto_3 " +
                ",sip_iskonto_4=@sip_iskonto_4 " +
                ",sip_iskonto_5=@sip_iskonto_5 " +
                ",sip_iskonto_6=@sip_iskonto_6 " +
                ",sip_isk1=@sip_isk1 " +
                ",sip_isk2=@sip_isk2 " +
                ",sip_isk3=@sip_isk3 " +
                ",sip_isk4=@sip_isk4 " +
                ",sip_isk5=@sip_isk5 " +
                ",sip_isk6=@sip_isk6 " +
                "WHERE sip_Guid = @sip_Guid",
        param : ['sip_b_fiyat:float','sip_miktar:float','sip_tutar:float','sip_vergi_pntr:int','sip_iskonto_1:float','sip_iskonto_2:float','sip_iskonto_3:float',
        'sip_iskonto_4:float','sip_iskonto_5:float','sip_iskonto_6:float','sip_isk1:bit','sip_isk2:bit','sip_isk3:bit','sip_isk4:bit',
        'sip_isk5:bit','sip_isk6:bit','sip_Guid:string|50']
    },
    MaxSiparisSira : 
    {
        query : "SELECT ISNULL(MAX(sip_evrakno_sira),0) + 1 AS MAXEVRSIRA FROM SIPARISLER " +
                "WHERE sip_evrakno_seri=@sip_evrakno_seri AND sip_tip=@sip_tip AND sip_cins=@sip_cins " ,
        param : ['sip_evrakno_seri','sip_tip','sip_cins'],
        type : ['string|20','int','int']
    },
    //Beden Hareket
    BedenHarInsert :
    {
        query:  "INSERT INTO [BEDEN_HAREKETLERI] ( " +
                "[BdnHar_DBCno] " + 
                ",[BdnHar_Spec_Rec_no] " +
                ",[BdnHar_iptal] " +
                ",[BdnHar_fileid] " +
                ",[BdnHar_hidden] " +
                ",[BdnHar_kilitli] " +
                ",[BdnHar_degisti] " +
                ",[BdnHar_checksum] " +
                ",[BdnHar_create_user] " +
                ",[BdnHar_create_date] " +
                ",[BdnHar_lastup_user] " +
                ",[BdnHar_lastup_date] " +
                ",[BdnHar_special1] " +
                ",[BdnHar_special2] " +
                ",[BdnHar_special3] " +
                ",[BdnHar_Tipi] " +
                ",[BdnHar_Har_uid] " +
                ",[BdnHar_BedenNo] " +
                ",[BdnHar_HarGor] " +
                ",[BdnHar_KnsIsGor] " +
                ",[BdnHar_KnsFat] " +
                ",[BdnHar_TesMik] " +
                ",[BdnHar_rezervasyon_miktari] " +
                ",[BdnHar_rezerveden_teslim_edilen] " +
                ") VALUES ( " +
                "0			 		                    --BdnHar_DBCno,  smallint,> \n" +
                ",0					                    --<BdnHar_Spec_Rec_no, int,> \n" +
                ",0		 			                    --<BdnHar_iptal, bit,> \n" +
                ",113		 		                    --<BdnHar_fileid, smallint,> \n" +
                ",0		 			                    --<BdnHar_hidden, bit,> \n" +
                ",0					                    --<BdnHar_kilitli, bit,> \n" +
                ",0		 			                    --<BdnHar_degisti, bit,> \n" +
                ",0		 			                    --<BdnHar_checksum, int,> \n" +
                ",@BdnHar_create_user 		            --<BdnHar_create_user, smallint,> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112) 	--<BdnHar_create_date, datetime,> \n" +
                ",@BdnHar_lastup_user 		            --<BdnHar_lastup_user, smallint,> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112) 	--<BdnHar_lastup_date, datetime,> \n" +
                ",''		 			                --<BdnHar_special1, varchar(4),> \n" +
                ",''		 			                --<BdnHar_special2, varchar(4),> \n" +
                ",''		 			                --<BdnHar_special3, varchar(4),> \n" +
                ",@BdnHar_Tipi		                    --<BdnHar_Tipi, char(1),> \n" +
                ",@BdnHar_Har_uid    		            --<BdnHar_Har_uid, int,> \n" +
                ",@BdnHar_BedenNo 			            --<BdnHar_BedenNo, smallint,> \n" +
                ",@BdnHar_HarGor 			            --<BdnHar_HarGor, float,> \n" +
                ",0		 			                    --<BdnHar_KnsIsGor, float,> \n" +
                ",0		 			                    --<BdnHar_KnsFat, float,> \n" +
                ",0             	                    --<BdnHar_TesMik, float,> \n" +
                ",@BdnHar_rezervasyon_miktari			--<BdnHar_rezervasyon_miktari, float,>\n" +
                ",@BdnHar_rezerveden_teslim_edilen		--<BdnHar_rezerveden_teslim_edilen, float,>\n" +
                ")",
        param:  ['BdnHar_create_user:int','BdnHar_lastup_user:int','BdnHar_Tipi:int','BdnHar_Har_uid:string|50','BdnHar_BedenNo:int','BdnHar_HarGor:float',
                'BdnHar_rezervasyon_miktari:float','BdnHar_rezerveden_teslim_edilen:float']
    },
    BedenHarUpdate :
    {
        query:  "UPDATE BEDEN_HAREKETLERI " +
                "SET BdnHar_HarGor=@BdnHar_HarGor " +
                ",BdnHar_rezervasyon_miktari=@BdnHar_rezervasyon_miktari " + 
                ",BdnHar_rezerveden_teslim_edilen=@BdnHar_rezerveden_teslim_edilen " +
                "WHERE  BdnHar_Har_uid = @BdnHar_Har_uid AND BdnHar_Tipi = @BdnHar_Tipi AND BdnHar_BedenNo = @BdnHar_BedenNo",
        param:  ['BdnHar_Tipi:int','BdnHar_Har_uid:string|50','BdnHar_BedenNo:int','BdnHar_HarGor:float',
                'BdnHar_rezervasyon_miktari:float','BdnHar_rezerveden_teslim_edilen:float']
    },
    BedenHarDelete : 
    {
        query:  "DELETE BEDEN_HAREKETLERI WHERE BdnHar_Har_uid = @BdnHar_Har_uid AND BdnHar_Tipi = @BdnHar_Tipi",
        param:  ['BdnHar_Har_uid','BdnHar_Tipi'],
        type:   ['string|50','int']
    },
    BedenHarGorUpdate :
    {
        query: "UPDATE BEDEN_HAREKETLERI SET BdnHar_HarGor = BdnHar_HarGor + @BdnHar_HarGor WHERE BdnHar_Guid = @BdnHar_Guid ",
        param: ['BdnHar_HarGor','BdnHar_Guid'],
        type: ['int','string|50']
    },
    //Stok Hareket
    StokHarGetir : 
    {
        query:  "SELECT CONVERT(VARCHAR(10),GETDATE(),112) AS sth_kur_tarihi , " +
                "ISNULL((SELECT sto_isim from STOKLAR WHERE sto_kod=sth_stok_kod),'') AS ADI , " +
                "CASE WHEN sth_tutar <> 0 AND sth_miktar <> 0 THEN ROUND((sth_tutar / sth_miktar),2) ELSE 0 END AS FIYAT, " +
                "(select cari_unvan1 from CARI_HESAPLAR WHERE cari_kod=sth_cari_kodu) AS CARIADI, " +
                "(select som_isim from SORUMLULUK_MERKEZLERI where som_kod=sth_stok_srm_merkezi) AS SORUMLUMERADI, " +
                "(select cari_per_adi from CARI_PERSONEL_TANIMLARI where cari_per_kod=sth_plasiyer_kodu) AS PERSONELADI," +
                "sth_miktar AS MIKTAR , " +
                "sth_miktar2 AS MIKTAR2 , " +
                "ROUND(sth_tutar,2) AS TUTAR, " + 
                "CASE WHEN sth_iskonto1 <> 0 AND sth_tutar <> 0 THEN (100 * sth_iskonto1) / sth_tutar ELSE 0 END AS ISKYUZDE , " +
                "(SELECT dbo.fn_StokBirimi(sth_stok_kod,sth_birim_pntr)) AS BIRIMADI, " +
                "(SELECT dbo.fn_StokBirimHesapla(sth_stok_kod,1,sth_miktar,sth_birim_pntr)) AS BIRIM," +
                "ISNULL((SELECT sto_birim1_ad as ADET FROM STOKLAR WHERE sto_kod = sth_stok_kod),'') AS BIRIM1, " +
                "sth_miktar * (SELECT sto_prim_orani FROM STOKLAR WHERE sto_kod = sth_stok_kod) AS PRIMTOPLAM,  " + 
                "(SELECT sto_prim_orani FROM STOKLAR WHERE sto_kod = sth_stok_kod ) AS PRIMORANI, " + 
                "ROW_NUMBER() OVER(ORDER BY sth_Guid) AS NO, " +
                "(SELECT dbo.fn_VergiYuzde (sth_vergi_pntr)) AS TOPTANVERGI, " +
                "ISNULL((SELECT TOP 1 (SELECT [dbo].fn_bedenharnodan_renk_no_bul(BdnHar_BedenNo)) FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid = sth_Guid AND BdnHar_Tipi = 11),0) AS RENKPNTR , " +
                "ISNULL((SELECT TOP 1 (SELECT [dbo].fn_bedenharnodan_beden_no_bul(BdnHar_BedenNo)) FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid = sth_Guid AND BdnHar_Tipi = 11),0) AS BEDENPNTR , " +
                "ISNULL((SELECT TOP 1 BdnHar_Guid FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid = sth_Guid AND BdnHar_Tipi = 11),'00000000-0000-0000-0000-000000000000') AS BEDENGUID , " +
                "(SELECT dbo.fn_renk_kirilimi(ISNULL((SELECT TOP 1 (SELECT [dbo].fn_bedenharnodan_renk_no_bul(BdnHar_BedenNo)) FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid = sth_Guid AND BdnHar_Tipi = 11),0),(SELECT TOP 1 sto_renk_kodu FROM STOKLAR WHERE sto_kod = sth_stok_kod))) AS RENK ," +
                "(SELECT dbo.fn_beden_kirilimi(ISNULL((SELECT TOP 1 (SELECT [dbo].fn_bedenharnodan_beden_no_bul(BdnHar_BedenNo)) FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid = sth_Guid AND BdnHar_Tipi = 11),0),(SELECT TOP 1 sto_beden_kodu FROM STOKLAR WHERE sto_kod = sth_stok_kod))) AS BEDEN ," +
                "ISNULL((SELECT sip_evrakno_seri from SIPARISLER WHERE sip_Guid = sth_sip_uid),'') AS SIPSERI ," +
                "ISNULL((SELECT sip_evrakno_sira from SIPARISLER WHERE sip_Guid = sth_sip_uid),0) AS SIPSIRA ," +
                "CASE sth_tip WHEN 0 THEN 'GIREN' WHEN 1 THEN 'CIKAN' END AS VIRMANTIP, " +
                "* FROM STOK_HAREKETLERI " +
                "WHERE sth_evrakno_seri=@sth_evrakno_seri AND sth_evrakno_sira=@sth_evrakno_sira AND sth_evraktip=@sth_evraktip ORDER BY sth_satirno desc" ,
        param:   ['sth_evrakno_seri','sth_evrakno_sira','sth_evraktip'],
        type:    ['string|20','int','int']
    },
    StokHarInsert : 
    {
        query : "DECLARE @UIDTABLE table([sth_Guid] [uniqueidentifier]) " +
                "SET @sth_fat_uid = '00000000-0000-0000-0000-000000000000' " +
                "IF (@sth_evraktip=4) " +
                "BEGIN " + 
                "SELECT @sth_fat_uid = cha_Guid FROM CARI_HESAP_HAREKETLERI WHERE cha_evrakno_seri = @sth_evrakno_seri " + 
                "AND cha_evrakno_sira = @sth_evrakno_sira AND cha_evrak_tip = 63 " +
                "END " + 
                "IF (@sth_evraktip=3) " + 
                "BEGIN " +
                "SELECT @sth_fat_uid = cha_Guid FROM CARI_HESAP_HAREKETLERI WHERE cha_evrakno_seri = @sth_evrakno_seri " +
                "AND cha_evrakno_sira = @sth_evrakno_sira AND cha_evrak_tip = 0 " +                
                "END " +
                "INSERT INTO [STOK_HAREKETLERI] " +
                "([sth_DBCno] " +
                ",[sth_SpecRECno] " +
                ",[sth_iptal] " +
                ",[sth_fileid] " +
                ",[sth_hidden] " +
                ",[sth_kilitli] " +
                ",[sth_degisti] " +
                ",[sth_checksum] " +
                ",[sth_create_user] " +
                ",[sth_create_date] " +
                ",[sth_lastup_user] " +
                ",[sth_lastup_date] " +
                ",[sth_special1] " +
                ",[sth_special2] " +
                ",[sth_special3] " +
                ",[sth_firmano] " +
                ",[sth_subeno] " +
                ",[sth_tarih] " +
                ",[sth_tip] " +
                ",[sth_cins] " +
                ",[sth_normal_iade] " +
                ",[sth_evraktip] " +
                ",[sth_evrakno_seri] " +
                ",[sth_evrakno_sira] " +
                ",[sth_satirno] " +
                ",[sth_belge_no] " +
                ",[sth_belge_tarih] " +
                ",[sth_stok_kod] " +
                ",[sth_isk_mas1] " +
                ",[sth_isk_mas2] " +
                ",[sth_isk_mas3] " +
                ",[sth_isk_mas4] " +
                ",[sth_isk_mas5] " +
                ",[sth_isk_mas6] " +
                ",[sth_isk_mas7] " +
                ",[sth_isk_mas8] " +
                ",[sth_isk_mas9] " +
                ",[sth_isk_mas10] " +
                ",[sth_sat_iskmas1] " +
                ",[sth_sat_iskmas2] " +
                ",[sth_sat_iskmas3] " +
                ",[sth_sat_iskmas4] " +
                ",[sth_sat_iskmas5] " +
                ",[sth_sat_iskmas6] " +
                ",[sth_sat_iskmas7] " +
                ",[sth_sat_iskmas8] " +
                ",[sth_sat_iskmas9] " +
                ",[sth_sat_iskmas10] " +
                ",[sth_pos_satis] " +
                ",[sth_promosyon_fl] " +
                ",[sth_cari_cinsi] " +
                ",[sth_cari_kodu] " +
                ",[sth_cari_grup_no] " +
                ",[sth_isemri_gider_kodu] " +
                ",[sth_plasiyer_kodu] " +
                ",[sth_har_doviz_cinsi] " +
                ",[sth_har_doviz_kuru] " +
                ",[sth_alt_doviz_kuru] " +
                ",[sth_stok_doviz_cinsi] " +
                ",[sth_stok_doviz_kuru] " +
                ",[sth_miktar] " +
                ",[sth_miktar2] " +
                ",[sth_birim_pntr] " +
                ",[sth_tutar] " +
                ",[sth_iskonto1] " +
                ",[sth_iskonto2] " +
                ",[sth_iskonto3] " +
                ",[sth_iskonto4] " +
                ",[sth_iskonto5] " +
                ",[sth_iskonto6] " +
                ",[sth_masraf1] " +
                ",[sth_masraf2] " +
                ",[sth_masraf3] " +
                ",[sth_masraf4] " +
                ",[sth_vergi_pntr] " +
                ",[sth_vergi] " +
                ",[sth_masraf_vergi_pntr] " +
                ",[sth_masraf_vergi] " +
                ",[sth_netagirlik] " +
                ",[sth_odeme_op] " +
                ",[sth_aciklama] " +
                ",[sth_sip_uid] " +
                ",[sth_fat_uid] " +
                ",[sth_giris_depo_no] " +
                ",[sth_cikis_depo_no] " +
                ",[sth_malkbl_sevk_tarihi] " +
                ",[sth_cari_srm_merkezi] " +
                ",[sth_stok_srm_merkezi] " +
                ",[sth_fis_tarihi] " +
                ",[sth_fis_sirano] " +
                ",[sth_vergisiz_fl] " +
                ",[sth_maliyet_ana] " +
                ",[sth_maliyet_alternatif] " +
                ",[sth_maliyet_orjinal] " +
                ",[sth_adres_no] " +
                ",[sth_parti_kodu] " +
                ",[sth_lot_no] " +
                ",[sth_kons_uid] " +
                ",[sth_proje_kodu] " +
                ",[sth_exim_kodu] " +
                ",[sth_otv_pntr] " +
                ",[sth_otv_vergi] " +
                ",[sth_brutagirlik] " +
                ",[sth_disticaret_turu] " +
                ",[sth_otvtutari] " +
                ",[sth_otvvergisiz_fl] " +
                ",[sth_oiv_pntr] " +
                ",[sth_oiv_vergi] " +
                ",[sth_oivvergisiz_fl] " +
                ",[sth_fiyat_liste_no] " +
                ",[sth_oivtutari] " +
                ",[sth_Tevkifat_turu] " +
                ",[sth_nakliyedeposu] " +
                ",[sth_nakliyedurumu] " +
                ",[sth_yetkili_uid] " +
                ",[sth_taxfree_fl] " +
                ",[sth_ilave_edilecek_kdv] " + 
                ",[sth_ismerkezi_kodu]  " +
                ",[sth_HareketGrupKodu1] " +
                ",[sth_HareketGrupKodu2] " +
                ",[sth_HareketGrupKodu3]   " +
                ",[sth_Olcu1]   " +
                ",[sth_Olcu2]   " +
                ",[sth_Olcu3]   " +
                ",[sth_Olcu4]   " +
                ",[sth_Olcu5]   " +
                ",[sth_FormulMiktarNo]   " +
                ",[sth_FormulMiktar]   " +
                ",[sth_eirs_senaryo]   " +
                ",[sth_eirs_tipi]   " +
                ",[sth_teslim_tarihi]   " +
                ",[sth_matbu_fl]   " +
                ") " +
                "OUTPUT INSERTED.[sth_Guid] INTO @UIDTABLE " + 
                "VALUES ( " +
                "0					--<sth_DBCno, smallint,> \n" +
                ",0					--<sth_SpecRECno, int,> \n" +
                ",0	 				--<sth_iptal, bit,> \n" +
                ",16			    --<sth_fileid, smallint,> \n" +
                ",0		 			--<sth_hidden, bit,> \n" +
                ",0		 			--<sth_kilitli, bit,> \n" +
                ",0		 			--<sth_degisti, bit,> \n" +
                ",0		 			--<sth_checksum, int,> \n" +
                ",@sth_create_user 			--<sth_create_user, smallint,> \n" +
                ",GETDATE() 			--<sth_create_date, datetime,> \n" +
                ",@sth_lastup_user 			--<sth_lastup_user, smallint,> \n" +
                ",GETDATE() 			    --<sth_lastup_date, datetime,> \n" +
                ",''		 			    --<sth_special1, varchar(4),> \n" +
                ",''		 			    --<sth_special2, varchar(4),> \n" +
                ",''		 			    --<sth_special3, varchar(4),> \n" +
                ",@sth_firmano 			    --<sth_firmano, int,> \n" +
                ",@sth_subeno 			    --<sth_subeno, int,> \n" +
                ",@sth_tarih 				--<sth_tarih, datetime,> \n" +
                ",@sth_tip 				    --<sth_tip, tinyint,> \n" +
                ",@sth_cins 				--<sth_cins, tinyint,> \n" +
                ",@sth_normal_iade 			--<sth_normal_iade, tinyint,> \n" +
                ",@sth_evraktip 			--<sth_evraktip, tinyint,> \n" +
                ",@sth_evrakno_seri 			--<sth_evrakno_seri, varchar(4),> \n" +
                ",@sth_evrakno_sira 			--<sth_evrakno_sira, int,> \n" +
                ",(SELECT ISNULL(MAX(sth_satirno),-1) + 1 AS SATIRNO FROM STOK_HAREKETLERI WHERE sth_evrakno_seri = @sth_evrakno_seri AND sth_evrakno_sira = @sth_evrakno_sira AND sth_evraktip = @sth_evraktip)	--<sip_satirno, int,> \n" +
                ",@sth_belge_no 			--sth_belge_no, varchar(15),> \n" +
                ",@sth_belge_tarih 			--<sth_belge_tarih, datetime,> \n" +
                ",@sth_stok_kod 			--<sth_stok_kod, varchar(25),> \n" +
                ",@sth_isk_mas1 			--<sth_isk_mas1, tinyint,> \n" +
                ",@sth_isk_mas2 			--<sth_isk_mas2, tinyint,> \n" +
                ",@sth_isk_mas3 			--<sth_isk_mas3, tinyint,> \n" +
                ",@sth_isk_mas4 			--<sth_isk_mas4, tinyint,> \n" +
                ",@sth_isk_mas5 			--<sth_isk_mas5, tinyint,> \n" +
                ",@sth_isk_mas6 			--<sth_isk_mas6, tinyint,> \n" +
                ",@sth_isk_mas7 			--<sth_isk_mas7, tinyint,> \n" +
                ",@sth_isk_mas8 			--<sth_isk_mas8, tinyint,> \n" +
                ",@sth_isk_mas9 			--<sth_isk_mas9, tinyint,> \n" +
                ",@sth_isk_mas10 			--<sth_isk_mas10, tinyint,> \n" +
                ",@sth_sat_iskmas1 			--<sth_sat_iskmas1, bit,> \n" +
                ",@sth_sat_iskmas2 			--<sth_sat_iskmas2, bit,> \n" +
                ",@sth_sat_iskmas3 			--<sth_sat_iskmas3, bit,> \n" +
                ",@sth_sat_iskmas4 			--<sth_sat_iskmas4, bit,> \n" +
                ",@sth_sat_iskmas5 			--<sth_sat_iskmas5, bit,> \n" +
                ",@sth_sat_iskmas6 			--<sth_sat_iskmas6, bit,> \n" +
                ",@sth_sat_iskmas7 			--<sth_sat_iskmas7, bit,> \n" +
                ",@sth_sat_iskmas8 			--<sth_sat_iskmas8, bit,> \n" +
                ",@sth_sat_iskmas9 			--<sth_sat_iskmas9, bit,> \n" +
                ",@sth_sat_iskmas10 			--<sth_sat_iskmas10, bit,> \n" +
                ",0					--<sth_pos_satis, bit,> \n" +
                ",0					--<sth_promosyon_fl, bit,> \n" +
                ",@sth_cari_cinsi 			--<sth_cari_cinsi, tinyint,> \n" +
                ",@sth_cari_kodu 			--<sth_cari_kodu, varchar(25),> \n" +
                ",0		 			--<sth_cari_grup_no, tinyint,> \n" +
                ",@sth_isemri_gider_kodu			 		--<sth_isemri_gider_kodu, varchar(25),> \n" +
                ",@sth_plasiyer_kodu 			--<sth_plasiyer_kodu, varchar(25),> \n" +
                ",@sth_har_doviz_cinsi 		--<sth_har_doviz_cinsi, tinyint,> \n" +
                ",@sth_har_doviz_kuru 		--<sth_har_doviz_kuru, float,> \n" +
                ",@sth_alt_doviz_kuru 		--<sth_alt_doviz_kuru, float,> \n" +
                ",@sth_stok_doviz_cinsi 		--<sth_stok_doviz_cinsi, tinyint,> \n" +
                ",@sth_stok_doviz_kuru 		--<sth_stok_doviz_kuru, float,> \n" +
                ",@sth_miktar 			--<sth_miktar, float,> \n" +
                ",@sth_miktar2 			--<sth_miktar2, float,> \n" +
                ",@sth_birim_pntr 			--<sth_birim_pntr, tinyint,> \n" +
                ",@sth_tutar	 			--<sth_tutar, float,> \n" +
                ",@sth_iskonto1 			--<sth_iskonto1, float,> \n" +
                ",@sth_iskonto2 			--<sth_iskonto2, float,> \n" +
                ",@sth_iskonto3 			--<sth_iskonto3, float,> \n" +
                ",@sth_iskonto4 			--<sth_iskonto4, float,> \n" +
                ",@sth_iskonto5 			--<sth_iskonto5, float,> \n" +
                ",@sth_iskonto6 			--<sth_iskonto6, float,> \n" +
                ",@sth_masraf1 			--<sth_masraf1, float,> \n" +
                ",@sth_masraf2 			--<sth_masraf2, float,> \n" +
                ",@sth_masraf3 			--<sth_masraf3, float,> \n" +
                ",@sth_masraf4 			--<sth_masraf4, float,> \n" +
                ",@sth_vergi_pntr 			--<sth_vergi_pntr, tinyint,> \n" +
                ",@sth_vergi 				--<sth_vergi, float,> \n" +
                ",@sth_masraf_vergi_pntr 		--<sth_masraf_vergi_pntr, tinyint,> \n" +
                ",@sth_masraf_vergi 			--<sth_masraf_vergi, float,> \n" +
                ",0		 			--<sth_netagirlik, float,> \n" +
                ",@sth_odeme_op 			--<sth_odeme_op, int,> \n" +
                ",@sth_aciklama 			--<sth_aciklama, varchar(50),> \n" +
                ",CONVERT(NVARCHAR(50),@sth_sip_uid)			 		--<sth_sip_uid, int,> \n" +
                ",CONVERT(NVARCHAR(50),@sth_fat_uid)  		--<sth_fat_uid, int,> \n" +
                ",@sth_giris_depo_no 			--<sth_giris_depo_no, int,> \n" +
                ",@sth_cikis_depo_no 			--<sth_cikis_depo_no, int,> \n" +
                ",@sth_malkbl_sevk_tarihi 		--<sth_malkbl_sevk_tarihi, datetime,> \n" +
                ",@sth_cari_srm_merkezi 		--<sth_cari_srm_merkezi, varchar(25),> \n" +
                ",@sth_stok_srm_merkezi 		--<sth_stok_srm_merkezi, varchar(25),> \n" +
                ",'18991230'	 			--<sth_fis_tarihi, datetime,> \n" +
                ",0		 			--<sth_fis_sirano, int,> \n" +
                ",@sth_vergisiz_fl		 			--<sth_vergisiz_fl, bit,> \n" +
                ",0		 			--<sth_maliyet_ana, float,> \n" +
                ",0			 		--<sth_maliyet_alternatif, float,> \n" +
                ",0			 		--<sth_maliyet_orjinal, float,> \n" +
                ",@sth_adres_no 			--<sth_adres_no, int,> \n" +
                ",@sth_parti_kodu 			--<sth_parti_kodu, varchar(25),> \n" +
                ",@sth_lot_no	 			--<sth_lot_no, int,> \n" +
                ",cast(cast(0 as binary) as uniqueidentifier)						--<sth_kons_uid, smallint,> \n" +
                ",@sth_proje_kodu		--<sth_proje_kodu, varchar(25),> \n" +
                ",@sth_exim_kodu 			--<sth_exim_kodu, varchar(25),> \n" +
                ",0		 			--<sth_otv_pntr, tinyint,> \n" +
                ",0		 			--<sth_otv_vergi, float,> \n" +
                ",0		 			--<sth_brutagirlik, float,> \n" +
                ",@sth_disticaret_turu		--<sth_disticaret_turu, tinyint,> \n" +
                ",0		 			--<sth_otvtutari, float,> \n" +
                ",@sth_otvvergisiz_fl			--<sth_otvvergisiz_fl, bit,> \n" +
                ",0					--<sth_oiv_pntr, tinyint,> \n" +
                ",0		 			--<sth_oiv_vergi, float,> \n" +
                ",@sth_oivvergisiz_fl	 		--<sth_oivvergisiz_fl, bit,> \n" +
                ",@sth_fiyat_liste_no 		--<sth_fiyat_liste_no, int,> \n" +
                ",0			 		--<sth_oivtutari, float,> \n" +
                ",0			 		--<sth_Tevkifat_turu, tinyint,> \n" +
                ",@sth_nakliyedeposu					--<sth_nakliyedeposu, int,> \n" +
                ",@sth_nakliyedurumu					--<sth_nakliyedurumu, tinyint,> \n" +
                ",cast(cast(0 as binary) as uniqueidentifier)					--<sth_yetkili_uid, int,> \n" +
                ",0					--<sth_taxfree_fl, bit,>  \n" +
                ",0					--<sth_ilave_edilecek_kdv,float,> \n" +
                ",@sth_ismerkezi_kodu	--<sth_ismerkezi_kodu> \n" +
                ",''					--<sth_HareketGrupKodu1, varchar(25),> \n" + 
                ",''					--<sth_HareketGrupKodu2, varchar(25),>  \n" +
                ",''					--<sth_HareketGrupKodu3, varchar(25),>  \n" +
                ",0					--<sth_Olcu1, float,> \n" +
                ",0					--<sth_Olcu2, float,> \n" +
                ",0					--<sth_Olcu3, float,> \n" +
                ",0					--<sth_Olcu4, float,> \n" +
                ",0					--<sth_Olcu5, float,> \n" +
                ",0					--<sth_FormulMiktarNo, tinyint,> \n" +
                ",0					--<sth_FormulMiktar, float,> \n" +
                ",0					--<eir_senaryo, float,> \n" +
                ",0					--<eir_tip, float,> \n" +
                ",GETDATE()					--<matbu_tarih, tinyint,> \n" +
                ",0					--<matbu_fl, float,> \n" +
                ") " +
                "SELECT [sth_Guid] FROM @UIDTABLE ",
        param : ['sth_create_user:int','sth_lastup_user:int','sth_firmano:int','sth_subeno:int','sth_tarih:date','sth_tip:int','sth_cins:int',
                 'sth_normal_iade:int','sth_evraktip:int','sth_evrakno_seri:string|25','sth_evrakno_sira:int','sth_belge_no:string|25','sth_belge_tarih:date',
                 'sth_stok_kod:string|25','sth_isk_mas1:int','sth_isk_mas2:int','sth_isk_mas3:int','sth_isk_mas4:int','sth_isk_mas5:int','sth_isk_mas6:int',
                 'sth_isk_mas7:int','sth_isk_mas8:int','sth_isk_mas9:int','sth_isk_mas10:int','sth_sat_iskmas1:bit','sth_sat_iskmas2:bit','sth_sat_iskmas3:bit',
                 'sth_sat_iskmas4:bit','sth_sat_iskmas5:bit','sth_sat_iskmas6:bit','sth_sat_iskmas7:bit','sth_sat_iskmas8:bit','sth_sat_iskmas9:bit',
                 'sth_sat_iskmas10:bit','sth_cari_cinsi:int','sth_cari_kodu:string|50','sth_isemri_gider_kodu:string|50','sth_plasiyer_kodu:string|50',
                 'sth_har_doviz_cinsi:int','sth_har_doviz_kuru:float','sth_alt_doviz_kuru:float','sth_stok_doviz_cinsi:int','sth_stok_doviz_kuru:float',
                 'sth_miktar:float','sth_miktar2:float','sth_birim_pntr:int','sth_tutar:float','sth_iskonto1:float','sth_iskonto2:float','sth_iskonto3:float',
                 'sth_iskonto4:float','sth_iskonto5:float','sth_iskonto6:float','sth_masraf1:float','sth_masraf2:float','sth_masraf3:float','sth_masraf4:float',
                 'sth_vergi_pntr:int','sth_vergi:float','sth_masraf_vergi_pntr:int','sth_masraf_vergi:float','sth_odeme_op:int','sth_aciklama:string|25',
                 'sth_sip_uid:string|50','sth_fat_uid:string|50','sth_giris_depo_no:int','sth_cikis_depo_no:int','sth_malkbl_sevk_tarihi:date','sth_cari_srm_merkezi:string|25',
                 'sth_stok_srm_merkezi:string|25','sth_vergisiz_fl:bit','sth_adres_no:int','sth_parti_kodu:string|25','sth_lot_no:int','sth_proje_kodu:string|25',
                 'sth_exim_kodu:string|25','sth_disticaret_turu:int','sth_otvvergisiz_fl:bit','sth_oivvergisiz_fl:bit','sth_fiyat_liste_no:int','sth_nakliyedeposu:int',
                 'sth_nakliyedurumu:int','sth_ismerkezi_kodu:string|25']
    },
    StokHarEkInsert : 
    {
        query : "INSERT INTO [dbo].[STOK_HAREKETLERI_EK]  " +
           "([sthek_Guid] " +
            ",[sthek_DBCno] " +
           ",[sthek_SpecRECno] " +
           ",[sthek_iptal] " +
           ",[sthek_fileid] " +
           ",[sthek_hidden] " +
           ",[sthek_kilitli] " +
           ",[sthek_degisti] " +
           ",[sthek_checksum] " +
           ",[sthek_create_user] " +
           ",[sthek_create_date] " +
           ",[sthek_lastup_user] " +
           ",[sthek_lastup_date] " +
           ",[sthek_special1] " +
           ",[sthek_special2] " +
           ",[sthek_special3] " +
           ",[sthek_related_uid] " +
           ",[sth_subesip_uid] " +
           ",[sth_bkm_uid] " +
           ",[sth_karsikons_uid] " +
           ",[sth_rez_uid] " +
           ",[sth_optamam_uid] " +
           ",[sth_iadeTlp_uid] " +
           ",[sth_HalSatis_uid] " +
           ",[sth_ciroprim_uid] " +
           ",[sth_iade_evrak_seri] " +
           ",[sth_iade_evrak_sira] " +
           ",[sth_yat_tes_kodu] " +
           ",[sth_ihracat_kredi_kodu] " +
           ",[sth_diib_belge_no] " +
           ",[sth_diib_satir_no] " +
           ",[sth_mensey_ulke_tipi] " +
           ",[sth_mensey_ulke_kodu] " +
           ",[sth_halrehmiktari] " +
           ",[sth_halrehfiyati] " +
           ",[sth_halsandikmiktari] " +
           ",[sth_halsandikfiyati] " +
           ",[sth_halsandikkdvtutari] " +
           ",[sth_HalKomisyonuKdv] " +
           ",[sth_HalRusum] " +
           ",[sth_satistipi] " +
           ",[sth_vardiya_tarihi] " +
           ",[sth_vardiya_no] " +
           ",[sth_direkt_iscilik_1] " +
           ",[sth_direkt_iscilik_2] " +
           ",[sth_direkt_iscilik_3] " +
           ",[sth_direkt_iscilik_4] " +
           ",[sth_direkt_iscilik_5] " +
           ",[sth_genel_uretim_1] " +
           ",[sth_genel_uretim_2] " +
           ",[sth_genel_uretim_3] " +
           ",[sth_genel_uretim_4] " +
           ",[sth_genel_uretim_5] " +
           ",[sth_fis_tarihi2] " +
           ",[sth_fis_sirano2] " +
           ",[sth_fiyfark_esas_evrak_seri] " +
           ",[sth_fiyfark_esas_evrak_sira] " +
           ",[sth_fiyfark_esas_satir_no] " +
           ",[sth_istisna] " +
           ",[sth_otv_tevkifat_turu] " +
           ",[sth_otv_tevkifat_tutari] " +
           ",[sth_servishar_uid] " +
           ",[sth_bakimsarf_uid] " +
           ",[sth_utsbildirimturu] " +
           ",[sth_utshekzayiatturu] " +
           ",[sth_utsimhabertarafgerekcesi] " +
           ",[sth_utsdigergerekceaciklamasi] "  +
           ") " +
            "VALUES " +
           "(NEWID()                    --<sthek_Guid, uniqueidentifier,> \n" +
           ",0                    --<sthek_DBCno, smallint,> \n" +
           ",0                    --<sthek_SpecRECno, int,> \n" +
           ",0                    --<sthek_iptal, bit,> \n" +
           ",590                    --<sthek_fileid, smallint,> \n" +
           ",0                  --<sthek_hidden, bit,> \n" +
           ",0                    --<sthek_kilitli, bit,> \n" +
           ",0                    --<sthek_degisti, bit,> \n" +
           ",0                    --<sthek_checksum, int,> \n" +
           ",@sthek_create_user                    --<sthek_create_user, smallint,> \n" +
           ",GETDATE()                    --<sthek_create_date, datetime,> \n" +
           ",@sthek_lastup_user                    --<sthek_lastup_user, smallint,> \n" +
           ",GETDATE()                    --<sthek_lastup_date, datetime,> \n" +
           ",''                    --<sthek_special1, nvarchar(4),> \n" +
           ",''                    --<sthek_special2, nvarchar(4),> \n" +
           ",''                    --<sthek_special3, nvarchar(4),> \n" +
           ",@sthek_related_uid                    --<sthek_related_uid, uniqueidentifier,> \n" +
           ",@sth_subesip_uid                    --<sth_subesip_uid, uniqueidentifier,> \n" +
           ",'00000000-0000-0000-0000-000000000000'                    --<sth_bkm_uid, uniqueidentifier,> \n" +
           ",'00000000-0000-0000-0000-000000000000'                    --<sth_karsikons_uid, uniqueidentifier,> \n" +
           ",'00000000-0000-0000-0000-000000000000'                    --<sth_rez_uid, uniqueidentifier,> \n" +
           ",'00000000-0000-0000-0000-000000000000'                    --<sth_optamam_uid, uniqueidentifier,> \n" +
           ",'00000000-0000-0000-0000-000000000000'                    --<sth_iadeTlp_uid, uniqueidentifier,> \n" +
           ",'00000000-0000-0000-0000-000000000000'                    --<sth_HalSatis_uid, uniqueidentifier,> \n" +
           ",'00000000-0000-0000-0000-000000000000'                    --<sth_ciroprim_uid, uniqueidentifier,> \n" +
           ",''                    --<sth_iade_evrak_seri, [dbo].[evrakseri_str],> \n" +
           ",0                    --<sth_iade_evrak_sira, int,> \n" +
           ",''                    --<sth_yat_tes_kodu, nvarchar(25),> \n" +
           ",''                    --<sth_ihracat_kredi_kodu, nvarchar(4),> \n" +
           ",''                    --<sth_diib_belge_no, nvarchar(25),> \n" +
           ",0                    --<sth_diib_satir_no, tinyint,> \n" +
           ",0                    --<sth_mensey_ulke_tipi, tinyint,> \n" +
           ",''                    --<sth_mensey_ulke_kodu, nvarchar(4),> \n" +
           ",0                    --<sth_halrehmiktari, float,> \n" +
           ",0                    --<sth_halrehfiyati, float,> \n" +
           ",0                    --<sth_halsandikmiktari, float,> \n" +
           ",0                    --<sth_halsandikfiyati, float,> \n" +
           ",0                    --<sth_halsandikkdvtutari, float,> \n" +
           ",0                    --<sth_HalKomisyonuKdv, float,> \n" +
           ",0                    --<sth_HalRusum, float,> \n" +
           ",0                    --<sth_satistipi, tinyint,> \n" +
           ",'1899-12-30 00:00:00.000'                    --<sth_vardiya_tarihi, datetime,> \n" +
           ",0                    --<sth_vardiya_no, tinyint,> \n" +
           ",0                    --<sth_direkt_iscilik_1, float,> \n" +
           ",0                    --<sth_direkt_iscilik_2, float,> \n" +
           ",0                    --<sth_direkt_iscilik_3, float,> \n" +
           ",0                    --<sth_direkt_iscilik_4, float,> \n" +
           ",0                    --<sth_direkt_iscilik_5, float,> \n" +
           ",0                    --<sth_genel_uretim_1, float,> \n" +
           ",0                    --<sth_genel_uretim_2, float,> \n" +
           ",0                    --<sth_genel_uretim_3, float,> \n" +
           ",0                    --<sth_genel_uretim_4, float,> \n" +
           ",0                    --<sth_genel_uretim_5, float,> \n" +
           ",'1899-12-30 00:00:00.000'                    --<sth_fis_tarihi2, datetime,> \n" +
           ",0                    --<sth_fis_sirano2, int,> \n" +
           ",''                    --<sth_fiyfark_esas_evrak_seri, [dbo].[evrakseri_str],> \n" +
           ",0                    --<sth_fiyfark_esas_evrak_sira, int,> \n" +
           ",0                    --<sth_fiyfark_esas_satir_no, int,> \n" +
           ",''                    --<sth_istisna, nvarchar(5),> \n" +
           ",0                    --<sth_otv_tevkifat_turu, tinyint,> \n" +
           ",0                    --<sth_otv_tevkifat_tutari, float,> \n" +
           ",'00000000-0000-0000-0000-000000000000'                    --<sth_servishar_uid, uniqueidentifier,> \n" +
           ",'00000000-0000-0000-0000-000000000000'                    --<sth_bakimsarf_uid, uniqueidentifier,> \n" +
           ",0                    --<sth_utsbildirimturu, tinyint,> \n" +
           ",0                    --<sth_utshekzayiatturu, tinyint,> \n" +
           ",0                    --<sth_utsimhabertarafgerekcesi, tinyint,> \n" +
           ",''                   --<sth_utsdigergerekceaciklamasi, nvarchar(50),> \n" +
           " ) ",
           param : ['sthek_create_user','sthek_lastup_user','sthek_related_uid','sth_subesip_uid'],
           type : ['int','int','string|50','string|50']
    },                  
    StokHarEvrDelete : 
    {
        query : "DELETE FROM STOK_HAREKETLERI WHERE sth_evrakno_seri = @sth_evrakno_seri AND " +
                "sth_evrakno_sira = @sth_evrakno_sira AND sth_evraktip = @sth_evraktip" ,
        param : ['sth_evrakno_seri','sth_evrakno_sira','sth_evraktip'],
        type : ['string|20','int','int']
    },
    StokHarSatirDelete : 
    {
        query : "DELETE FROM STOK_HAREKETLERI WHERE sth_Guid = @sth_Guid ",
        param : ['sth_Guid'],
        type : ['string|50']
    },
    StokHarUpdate:
    {
        query:  "UPDATE STOK_HAREKETLERI " +
                "SET sth_miktar=@sth_miktar " +
                ",sth_miktar2=@sth_miktar2 " +  
                ",sth_tutar=@sth_tutar " +
                ",sth_vergi= (@sth_tutar - (@sth_iskonto1 + @sth_iskonto2 + @sth_iskonto3 + @sth_iskonto4 + @sth_iskonto5)) *  (SELECT [dbo].[fn_VergiYuzde] (@sth_vergi_pntr) / 100) " +
                ",sth_iskonto1=@sth_iskonto1 " +
                ",sth_iskonto2=@sth_iskonto2 " +
                ",sth_iskonto3=@sth_iskonto3 " +
                ",sth_iskonto4=@sth_iskonto4 " +
                ",sth_iskonto5=@sth_iskonto5 " +
                ",sth_iskonto6=@sth_iskonto6 " +
                ",sth_sat_iskmas1=@sth_sat_iskmas1 " +
                ",sth_sat_iskmas2=@sth_sat_iskmas2 " +
                ",sth_sat_iskmas3=@sth_sat_iskmas3 " +
                ",sth_sat_iskmas4=@sth_sat_iskmas4 " +
                ",sth_sat_iskmas5=@sth_sat_iskmas5 " +
                ",sth_sat_iskmas6=@sth_sat_iskmas6 " +
                " WHERE  sth_Guid = @sth_Guid",
        param : ['sth_miktar:float','sth_miktar2:float','sth_tutar:float','sth_vergi_pntr:int','sth_iskonto1:float','sth_iskonto2:float','sth_iskonto3:float',
        'sth_iskonto4:float','sth_iskonto5:float','sth_iskonto6:float','sth_sat_iskmas1:bit','sth_sat_iskmas2:bit','sth_sat_iskmas3:bit','sth_sat_iskmas4:bit',
        'sth_sat_iskmas5:bit','sth_sat_iskmas6:bit','sth_Guid:string|50']
    },
    MaxStokHarSira :
    {
        query: "SELECT ISNULL(MAX(sth_evrakno_sira),0) + 1 AS MAXEVRSIRA FROM STOK_HAREKETLERI " +
                "WHERE sth_evrakno_seri = @sth_evrakno_seri AND sth_evraktip = @sth_evraktip " ,
        param : ['sth_evrakno_seri','sth_evraktip'],
        type : ['string|25','int']
    },
    //Cari Hareket
    CariHarGetir : 
    {
        query:  "SELECT *, " +
                "(SELECT cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod=cha_kod) AS CARIADI, " +
                "ROUND(cha_meblag,2) AS TUTAR, " +
                "CASE cha_cinsi WHEN 19 THEN ISNULL((SELECT ban_ismi FROM BANKALAR WHERE ban_kod = cha_kasa_hizkod),'') " +
                "ELSE ISNULL((SELECT kas_isim FROM KASALAR WHERE kas_kod = cha_kasa_hizkod),'') END AS KASAADI, " +
                "CONVERT(VARCHAR(10),GETDATE(),112) AS cha_d_kurtar " +
                "FROM CARI_HESAP_HAREKETLERI " +
                "WHERE cha_evrakno_seri=@cha_evrakno_seri AND cha_evrakno_sira=@cha_evrakno_sira " +
                "AND cha_evrak_tip=@cha_evrak_tip" ,
        param:   ['cha_evrakno_seri','cha_evrakno_sira','cha_evrak_tip'],
        type:    ['string|20','int','int']
    },
    CariHarInsert : 
    {
        query:  "DECLARE @cha_satir_no AS INT " + 
                "SET @cha_satir_no = (SELECT ISNULL(MAX(cha_satir_no),-1) + 1 AS SATIRNO FROM CARI_HESAP_HAREKETLERI WHERE cha_evrakno_seri = @cha_evrakno_seri AND cha_evrakno_sira = @cha_evrakno_sira AND cha_evrak_tip = @cha_evrak_tip) " + 
                "INSERT INTO [CARI_HESAP_HAREKETLERI] " +
                "([cha_DBCno] " +
                ",[cha_SpecRecNo] " +
                ",[cha_iptal] " +
                ",[cha_fileid] " +
                ",[cha_hidden] " +
                ",[cha_kilitli] " +
                ",[cha_degisti] " +
                ",[cha_CheckSum] " +
                ",[cha_create_user] " +
                ",[cha_create_date] " +
                ",[cha_lastup_user] " +
                ",[cha_lastup_date] " +
                ",[cha_special1] " +
                ",[cha_special2] " +
                ",[cha_special3] " +
                ",[cha_firmano] " +
                ",[cha_subeno] " +
                ",[cha_evrak_tip] " +
                ",[cha_evrakno_seri] " +
                ",[cha_evrakno_sira] " +
                ",[cha_satir_no] " +
                ",[cha_tarihi] " +
                ",[cha_tip] " +
                ",[cha_cinsi] " +
                ",[cha_normal_Iade] " +
                ",[cha_tpoz] " +
                ",[cha_ticaret_turu] " +
                ",[cha_belge_no] " +
                ",[cha_belge_tarih] " +
                ",[cha_aciklama] " +
                ",[cha_satici_kodu] " +
                ",[cha_EXIMkodu] " +
                ",[cha_projekodu] " +
                ",[cha_yat_tes_kodu] " +
                ",[cha_cari_cins] " +
                ",[cha_kod] " +
                ",[cha_ciro_cari_kodu] " +
                ",[cha_d_cins] " +
                ",[cha_d_kur] " +
                ",[cha_altd_kur] " +
                ",[cha_grupno] " +
                ",[cha_srmrkkodu] " +
                ",[cha_kasa_hizmet] " +
                ",[cha_kasa_hizkod] " +
                ",[cha_karsidcinsi] " +
                ",[cha_karsid_kur] " +
                ",[cha_karsidgrupno] " +
                ",[cha_karsisrmrkkodu] " +
                ",[cha_miktari] " +
                ",[cha_meblag] " +
                ",[cha_aratoplam] " +
                ",[cha_vade] " +
                ",[cha_Vade_Farki_Yuz] " +
                ",[cha_ft_iskonto1] " +
                ",[cha_ft_iskonto2] " +
                ",[cha_ft_iskonto3] " +
                ",[cha_ft_iskonto4] " +
                ",[cha_ft_iskonto5] " +
                ",[cha_ft_iskonto6] " +
                ",[cha_ft_masraf1] " +
                ",[cha_ft_masraf2] " +
                ",[cha_ft_masraf3] " +
                ",[cha_ft_masraf4] " +
                ",[cha_isk_mas1] " +
                ",[cha_isk_mas2] " +
                ",[cha_isk_mas3] " +
                ",[cha_isk_mas4] " +
                ",[cha_isk_mas5] " +
                ",[cha_isk_mas6] " +
                ",[cha_isk_mas7] " +
                ",[cha_isk_mas8] " +
                ",[cha_isk_mas9] " +
                ",[cha_isk_mas10] " +
                ",[cha_sat_iskmas1] " +
                ",[cha_sat_iskmas2] " +
                ",[cha_sat_iskmas3] " +
                ",[cha_sat_iskmas4] " +
                ",[cha_sat_iskmas5] " +
                ",[cha_sat_iskmas6] " +
                ",[cha_sat_iskmas7] " +
                ",[cha_sat_iskmas8] " +
                ",[cha_sat_iskmas9] " +
                ",[cha_sat_iskmas10] " +
                ",[cha_yuvarlama] " +
                ",[cha_StFonPntr] " +
                ",[cha_stopaj] " +
                ",[cha_savsandesfonu] " +
                ",[cha_avansmak_damgapul] " +
                ",[cha_vergipntr] " +
                ",[cha_vergi1] " +
                ",[cha_vergi2] " +
                ",[cha_vergi3] " +
                ",[cha_vergi4] " +
                ",[cha_vergi5] " +
                ",[cha_vergi6] " +
                ",[cha_vergi7] " +
                ",[cha_vergi8] " +
                ",[cha_vergi9] " +
                ",[cha_vergi10] " +
                ",[cha_vergisiz_fl] " +
                ",[cha_otvtutari] " +
                ",[cha_otvvergisiz_fl] " +
                ",[cha_oiv_pntr] " +
                ",[cha_oivtutari] " +
                ",[cha_oiv_vergi] " +
                ",[cha_oivergisiz_fl] " +
                ",[cha_fis_tarih] " +
                ",[cha_fis_sirano] " +
                ",[cha_trefno] " +
                ",[cha_sntck_poz] " +
                ",[cha_reftarihi] " +
                ",[cha_istisnakodu] " +
                ",[cha_pos_hareketi] " +
                ",[cha_meblag_ana_doviz_icin_gecersiz_fl] " +
                ",[cha_meblag_alt_doviz_icin_gecersiz_fl] " +
                ",[cha_meblag_orj_doviz_icin_gecersiz_fl] " +
                ",[cha_sip_uid] " +
                ",[cha_kirahar_uid] " +
                ",[cha_vardiya_tarihi] " +
                ",[cha_vardiya_no] " +
                ",[cha_vardiya_evrak_ti] " +
                ",[cha_ebelge_turu] " +
                ",[cha_tevkifat_toplam] " +
                ",[cha_ilave_edilecek_kdv1] " +
                ",[cha_ilave_edilecek_kdv2] " +
                ",[cha_ilave_edilecek_kdv3] " +
                ",[cha_ilave_edilecek_kdv4] " +
                ",[cha_ilave_edilecek_kdv5] " +
                ",[cha_ilave_edilecek_kdv6] " +
                ",[cha_ilave_edilecek_kdv7] " +
                ",[cha_ilave_edilecek_kdv8] " +
                ",[cha_ilave_edilecek_kdv9] " +
                ",[cha_ilave_edilecek_kdv10] " +
                ",[cha_e_islem_turu] " +
                ",[cha_fatura_belge_turu] " +
                ",[cha_diger_belge_adi] " +
                ",[cha_uuid] " +
                ",[cha_adres_no] " +
                ",[cha_vergifon_toplam] " +
                ",[cha_ilk_belge_tarihi] " +
                ",[cha_ilk_belge_doviz_kuru] " +
                ",[cha_HareketGrupKodu1] " +
                ",[cha_HareketGrupKodu2] " +
                ",[cha_HareketGrupKodu3] " +
                ") " + 
                "VALUES " +
                "(0												--<cha_DBCno, smallint,> \n" + 
                ",0												--<cha_SpecRecNo, int,> \n" + 
                ",0												--<cha_iptal, bit,> \n" + 
                ",51												--<cha_fileid, smallint,> \n" + 
                ",0												--<cha_hidden, bit,> \n" + 
                ",0												--<cha_kilitli, bit,> \n" + 
                ",0												--<cha_degisti, bit,> \n" + 
                ",0												--<cha_CheckSum, int,> \n" + 
                ",@cha_create_user								--<cha_create_user, smallint,> \n" + 
                ",GETDATE()				                        --<cha_create_date, datetime,> \n" + 
                ",@cha_lastup_user								--<cha_lastup_user, smallint,> \n" + 
                ",GETDATE()				                        --<cha_lastup_date, datetime,> \n" + 
                ",''											--<cha_special1, nvarchar(4),> \n" + 
                ",''											--<cha_special2, nvarchar(4),> \n" + 
                ",''											--<cha_special3, nvarchar(4),> \n" + 
                ",@cha_firmano									--<cha_firmano, int,> \n" + 
                ",@cha_subeno									--<cha_subeno, int,> \n" + 
                ",@cha_evrak_tip								--<cha_evrak_tip, tinyint,> \n" + 
                ",@cha_evrakno_seri								--<cha_evrakno_seri, nvarchar_evrakseri,> \n" + 
                ",@cha_evrakno_sira								--<cha_evrakno_sira, int,> \n" + 
                ",@cha_satir_no				--<cha_satir_no, int,> \n" + 
                ",@cha_tarihi									--<cha_tarihi, datetime,> \n" + 
                ",@cha_tip										--<cha_tip, tinyint,> \n" + 
                ",@cha_cinsi									--<cha_cinsi, tinyint,> \n" + 
                ",@cha_normal_Iade								--<cha_normal_Iade, tinyint,> \n" + 
                ",@cha_tpoz										--<cha_tpoz, tinyint,> \n" + 
                ",@cha_ticaret_turu								--<cha_ticaret_turu, tinyint,> \n" + 
                ",@cha_belge_no									--<cha_belge_no, nvarchar_belgeno,> \n" + 
                ",@cha_belge_tarih								--<cha_belge_tarih, datetime,> \n" + 
                ",@cha_aciklama									--<cha_aciklama, nvarchar(40),> \n" + 
                ",@cha_satici_kodu								--<cha_satici_kodu, nvarchar(25),> \n" + 
                ",@cha_EXIMkodu									--<cha_EXIMkodu, nvarchar(25),> \n" + 
                ",@cha_projekodu								--<cha_projekodu, nvarchar(25),> \n" + 
                ",''											--<cha_yat_tes_kodu, nvarchar(25),> \n" + 
                ",@cha_cari_cins								--<cha_cari_cins, tinyint,> \n" + 
                ",@cha_kod										--<cha_kod, nvarchar(25),> \n" + 
                ",@cha_ciro_cari_kodu							--<cha_ciro_cari_kodu, nvarchar(25),> \n" + 
                ",@cha_d_cins									--<cha_d_cins, tinyint,> \n" + 
                ",@cha_d_kur									--<cha_d_kur, float,> \n" + 
                ",@cha_altd_kur									--<cha_altd_kur, float,> \n" + 
                ",@cha_grupno									--<cha_grupno, tinyint,> \n" + 
                ",@cha_srmrkkodu								--<cha_srmrkkodu, nvarchar(25),> \n" + 
                ",@cha_kasa_hizmet								--<cha_kasa_hizmet, tinyint,> \n" + 
                ",@cha_kasa_hizkod								--<cha_kasa_hizkod, nvarchar(25),> \n" + 
                ",@cha_kasaidcinsi												--<cha_karsidcinsi, tinyint,> \n" + 
                ",@cha_kasaid_kur												--<cha_karsid_kur, float,> \n" + 
                ",@cha_karsidgrupno								--<cha_karsidgrupno, tinyint,> \n" + 
                ",@cha_karsisrmrkkodu											--<cha_karsisrmrkkodu, nvarchar(25),> \n" + 
                ",0												--<cha_miktari, float,> \n" + 
                ",@cha_meblag									--<cha_meblag, float,> \n" + 
                ",@cha_aratoplam								--<cha_aratoplam, float,> \n" + 
                ",(SELECT CAST(DATEPART(YYYY,@cha_vade) AS [CHAR](4)) + RIGHT('0' + CAST(DATEPART(M,@cha_vade) AS [VARCHAR](2)),2) + RIGHT('0' + CAST(DATEPART(D,@cha_vade) AS [VARCHAR](2)),2))	--<cha_vade, int,> \n" + 
                ",0												--<cha_Vade_Farki_Yuz, float,> \n" + 
                ",@cha_ft_iskonto1								--<cha_ft_iskonto1, float,> \n" + 
                ",@cha_ft_iskonto2								--<cha_ft_iskonto2, float,> \n" + 
                ",@cha_ft_iskonto3								--<cha_ft_iskonto3, float,> \n" + 
                ",@cha_ft_iskonto4								--<cha_ft_iskonto4, float,> \n" + 
                ",@cha_ft_iskonto5								--<cha_ft_iskonto5, float,> \n" + 
                ",@cha_ft_iskonto6								--<cha_ft_iskonto6, float,> \n" + 
                ",@cha_ft_masraf1								--<cha_ft_masraf1, float,> \n" + 
                ",@cha_ft_masraf2								--<cha_ft_masraf2, float,> \n" + 
                ",@cha_ft_masraf3								--<cha_ft_masraf3, float,> \n" + 
                ",@cha_ft_masraf4								--<cha_ft_masraf4, float,> \n" + 
                ",0												--<cha_isk_mas1, tinyint,> \n" + 
                ",0												--<cha_isk_mas2, tinyint,> \n" + 
                ",0												--<cha_isk_mas3, tinyint,> \n" + 
                ",0												--<cha_isk_mas4, tinyint,> \n" + 
                ",0												--<cha_isk_mas5, tinyint,> \n" + 
                ",0												--<cha_isk_mas6, tinyint,> \n" + 
                ",0												--<cha_isk_mas7, tinyint,> \n" + 
                ",0												--<cha_isk_mas8, tinyint,> \n" + 
                ",0												--<cha_isk_mas9, tinyint,> \n" + 
                ",0												--<cha_isk_mas10, tinyint,> \n" + 
                ",0												--<cha_sat_iskmas1, bit,> \n" + 
                ",0												--<cha_sat_iskmas2, bit,> \n" + 
                ",0												--<cha_sat_iskmas3, bit,> \n" + 
                ",0												--<cha_sat_iskmas4, bit,> \n" + 
                ",0												--<cha_sat_iskmas5, bit,> \n" + 
                ",0												--<cha_sat_iskmas6, bit,> \n" + 
                ",0												--<cha_sat_iskmas7, bit,> \n" + 
                ",0												--<cha_sat_iskmas8, bit,> \n" + 
                ",0												--<cha_sat_iskmas9, bit,> \n" + 
                ",0												--<cha_sat_iskmas10, bit,> \n" + 
                ",0												--<cha_yuvarlama, float,> \n" + 
                ",0												--<cha_StFonPntr, tinyint,> \n" + 
                ",0												--<cha_stopaj, float,> \n" + 
                ",0												--<cha_savsandesfonu, float,> \n" + 
                ",0												--<cha_avansmak_damgapul, float,> \n" + 
                ",@cha_vergipntr								--<cha_vergipntr, tinyint,> \n" + 
                ",@cha_vergi1									--<cha_vergi1, float,> \n" + 
                ",@cha_vergi2									--<cha_vergi2, float,> \n" + 
                ",@cha_vergi3									--<cha_vergi3, float,> \n" + 
                ",@cha_vergi4									--<cha_vergi4, float,> \n" + 
                ",@cha_vergi5									--<cha_vergi5, float,> \n" + 
                ",@cha_vergi6									--<cha_vergi6, float,> \n" + 
                ",@cha_vergi7									--<cha_vergi7, float,> \n" + 
                ",@cha_vergi8									--<cha_vergi8, float,> \n" + 
                ",@cha_vergi9									--<cha_vergi9, float,> \n" + 
                ",@cha_vergi10									--<cha_vergi10, float,> \n" + 
                ",@cha_vergisiz_fl								--<cha_vergisiz_fl, bit,> \n" + 
                ",@cha_otvtutari								--<cha_otvtutari, float,> \n" + 
                ",@cha_otvvergisiz_fl							--<cha_otvvergisiz_fl, bit,> \n" + 
                ",0												--<cha_oiv_pntr, tinyint,> \n" + 
                ",0												--<cha_oivtutari, float,> \n" + 
                ",0												--<cha_oiv_vergi, float,> \n" + 
                ",@cha_oivergisiz_fl							--<cha_oivergisiz_fl, bit,> \n" + 
                ",'18991230'									--<cha_fis_tarih, datetime,> \n" + 
                ",0												--<cha_fis_sirano, int,> \n" + 
                ",@cha_trefno									--<cha_trefno, nvarchar(25),> \n" + 
                ",@cha_sntck_poz								--<cha_sntck_poz, tinyint,> \n" + 
                ",'18991230'									--<cha_reftarihi, datetime,> \n" + 
                ",0												--<cha_istisnakodu, tinyint,> \n" + 
                ",0												--<cha_pos_hareketi, bit,> \n" + 
                ",0												--<cha_meblag_ana_doviz_icin_gecersiz_fl, tinyint,> \n" + 
                ",0												--<cha_meblag_alt_doviz_icin_gecersiz_fl, tinyint,> \n" + 
                ",0												--<cha_meblag_orj_doviz_icin_gecersiz_fl, tinyint,> \n" + 
                ",cast(cast(0 as binary) as uniqueidentifier)	--<cha_sip_uid, int,> \n" + 
                ",cast(cast(0 as binary) as uniqueidentifier)	--<cha_kirahar_recid_recno, int,> \n" + 
                ",'18991230'									--<cha_vardiya_tarihi, datetime,> \n" + 
                ",0												--<cha_vardiya_no, tinyint,> \n" + 
                ",0												--<cha_vardiya_evrak_ti, tinyint,> \n" + 
                ",0                                             --<cha_ebelge_turu,tinyint> \n" + 
                ",0												--<cha_tevkifat_toplam, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv1, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv2, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv3, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv4, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv5, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv6, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv7, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv8, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv9, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv10, float,> \n" + 
                ",@cha_e_islem_turu								--<cha_e_islem_turu, tinyint,> \n" + 
                ",0												--<cha_fatura_belge_turu, tinyint,> \n" + 
                ",''											--<cha_diger_belge_adi, nvarchar(50),> \n" + 
                ",NEWID()									    --<cha_uuid, nvarchar(40),> \n" + 
                ",1												--<cha_adres_no, int,> \n" + 
                ",0												--<cha_vergifon_toplam, float,> \n" + 
                ",'18991230'									--<cha_ilk_belge_tarihi> \n" + 
                ",0												--<cha_ilk_belge_doviz_kuru> \n" + 
                ",''											--<cha_HareketGrupKodu1> \n" + 
                ",''											--<cha_HareketGrupKodu2> \n" + 
                ",''											--<cha_HareketGrupKodu3> \n" + 
                ") " +
                "SELECT cha_Guid FROM CARI_HESAP_HAREKETLERI WHERE cha_evrakno_seri=@cha_evrakno_seri AND cha_evrakno_sira=@cha_evrakno_sira " +
                "AND cha_evrak_tip=@cha_evrak_tip AND cha_satir_no = @cha_satir_no",
        param : ['cha_create_user:int','cha_lastup_user:int','cha_firmano:int','cha_subeno:int','cha_evrak_tip:int','cha_evrakno_seri:string|25','cha_evrakno_sira:int',
                 'cha_tarihi:date','cha_tip:int','cha_cinsi:int','cha_normal_Iade:int','cha_tpoz:int','cha_ticaret_turu:int','cha_belge_no:string|25','cha_belge_tarih:date',
                 'cha_aciklama:string|40','cha_satici_kodu:string|25','cha_EXIMkodu:string|25','cha_projekodu:string|25','cha_cari_cins:int','cha_kod:string|25','cha_ciro_cari_kodu:string|25',
                 'cha_d_cins:int','cha_d_kur:float','cha_altd_kur:float','cha_grupno:int','cha_srmrkkodu:string|25','cha_kasa_hizmet:int','cha_kasa_hizkod:string|25','cha_kasaidcinsi:int','cha_kasaid_kur:float','cha_karsidgrupno:int','cha_karsisrmrkkodu:string|25',
                 'cha_meblag:float','cha_aratoplam:float','cha_vade:string|10','cha_ft_iskonto1:float','cha_ft_iskonto2:float','cha_ft_iskonto3:float','cha_ft_iskonto4:float','cha_ft_iskonto5:float',
                 'cha_ft_iskonto6:float','cha_ft_masraf1:float','cha_ft_masraf2:float','cha_ft_masraf3:float','cha_ft_masraf4:float','cha_vergipntr:int','cha_vergi1:float','cha_vergi2:float',
                 'cha_vergi3:float','cha_vergi4:float','cha_vergi5:float','cha_vergi6:float','cha_vergi7:float','cha_vergi8:float','cha_vergi9:float','cha_vergi10:float','cha_vergisiz_fl:bit',
                 'cha_otvtutari:float','cha_otvvergisiz_fl:bit','cha_oivergisiz_fl:bit','cha_trefno:string|25','cha_sntck_poz:int','cha_e_islem_turu:int']
    },
    CariHarEvrDelete : 
    {
        query : "DELETE FROM CARI_HESAP_HAREKETLERI WHERE cha_evrakno_seri=@cha_evrakno_seri AND cha_evrakno_sira=@cha_evrakno_sira AND cha_evrak_tip=@cha_evrak_tip" ,
        param : ['cha_evrakno_seri','cha_evrakno_sira','cha_evrak_tip'],
        type : ['string|20','int','int']
    },
    CariHarSatirDelete : 
    {
        query : "DELETE FROM CARI_HESAP_HAREKETLERI WHERE cha_Guid=@cha_Guid",
        param : ['cha_Guid'],
        type : ['string|50']
    },
    CariHarUpdate:
    {
        query:  "DECLARE @cha_Guid AS NVARCHAR(50) " +
                "SET @cha_Guid = (SELECT TOP 1 cha_Guid FROM CARI_HESAP_HAREKETLERI WHERE cha_evrakno_seri = @cha_evrakno_seri " +
                "AND cha_evrakno_sira = @cha_evrakno_sira AND cha_evrak_tip = @cha_evrak_tip AND cha_satir_no = @cha_satir_no) " +
                "UPDATE CARI_HESAP_HAREKETLERI " +
                "SET cha_meblag=@cha_meblag " +
                ",cha_aratoplam=@cha_aratoplam " +
                ",cha_vergi1=@cha_vergi1 " +
                ",cha_vergi2=@cha_vergi2 " +
                ",cha_vergi3=@cha_vergi3 " + 
                ",cha_vergi4=@cha_vergi4 " + 
                ",cha_vergi5=@cha_vergi5 " + 
                ",cha_vergi6=@cha_vergi6 " + 
                ",cha_vergi7=@cha_vergi7 " + 
                ",cha_vergi8=@cha_vergi8 " + 
                ",cha_vergi9=@cha_vergi9 " + 
                ",cha_vergi10=@cha_vergi10 " +
                ",cha_ft_iskonto1=@cha_ft_iskonto1 " +
                ",cha_ft_iskonto2=@cha_ft_iskonto2 " +
                ",cha_ft_iskonto3=@cha_ft_iskonto3 " +
                ",cha_ft_iskonto4=@cha_ft_iskonto4 " +
                ",cha_ft_iskonto5=@cha_ft_iskonto5 " +
                ",cha_ft_iskonto6=@cha_ft_iskonto6 " +
                ",cha_otvtutari = @cha_otvtutari " +
                "WHERE  cha_Guid = @cha_Guid ",
        param : ['cha_meblag:float','cha_aratoplam:float','cha_vergi1:float','cha_vergi2:float','cha_vergi3:float','cha_vergi4:float','cha_vergi5:float','cha_vergi6:float',
                 'cha_vergi7:float','cha_vergi8:float','cha_vergi9:float','cha_vergi10:float','cha_ft_iskonto1:float','cha_ft_iskonto2:float','cha_ft_iskonto3:float',
                 'cha_ft_iskonto4:float','cha_ft_iskonto5:float','cha_ft_iskonto6:float','cha_otvtutari:float','cha_evrakno_seri:string|25','cha_evrakno_sira:int',
                 'cha_evrak_tip:int','cha_satir_no:int']
    },
    MaxCariHarSira : 
    {
        query: "SELECT ISNULL(MAX(cha_evrakno_sira),0) + 1 AS MAXEVRSIRA FROM CARI_HESAP_HAREKETLERI WHERE cha_evrakno_seri=@cha_evrakno_seri AND cha_evrak_tip=@cha_evrak_tip" ,
        param : ['cha_evrakno_seri','cha_evrak_tip'],
        type : ['string|25','int']
    },
    //Odeme Emirleri
    CekHarInsert:
    {
        query:  "INSERT INTO [dbo].[ODEME_EMIRLERI] " + 
                "([sck_DBCno] " +
                ",[sck_SpecRECno] " +
                ",[sck_iptal] " +
                ",[sck_fileid] " +
                ",[sck_hidden] " +
                ",[sck_kilitli] " +
                ",[sck_degisti] " +
                ",[sck_checksum] " +
                ",[sck_create_user] " +
                ",[sck_create_date] " +
                ",[sck_lastup_user] " +
                ",[sck_lastup_date] " +
                ",[sck_special1] " +
                ",[sck_special2] " +
                ",[sck_special3] " +
                ",[sck_firmano] " +
                ",[sck_subeno] " +
                ",[sck_tip] " +
                ",[sck_refno] " +
                ",[sck_bankano] " +
                ",[sck_borclu] " +
                ",[sck_vdaire_no] " +
                ",[sck_vade] " +
                ",[sck_tutar] " +
                ",[sck_doviz] " +
                ",[sck_odenen] " +
                ",[sck_degerleme_islendi] " +
                ",[sck_banka_adres1] " +
                ",[sck_sube_adres2] " +
                ",[sck_borclu_tel] " +
                ",[sck_hesapno_sehir] " +
                ",[sck_no] " +
                ",[sck_duzen_tarih] " +
                ",[sck_sahip_cari_cins] " +
                ",[sck_sahip_cari_kodu] " +
                ",[sck_sahip_cari_grupno] " +
                ",[sck_nerede_cari_cins] " +
                ",[sck_nerede_cari_kodu] " +
                ",[sck_nerede_cari_grupno] " +
                ",[sck_ilk_hareket_tarihi] " +
                ",[sck_ilk_evrak_seri] " +
                ",[sck_ilk_evrak_sira_no] " +
                ",[sck_ilk_evrak_satir_no] " +
                ",[sck_son_hareket_tarihi] " +
                ",[sck_doviz_kur] " +
                ",[sck_sonpoz] " +
                ",[sck_imza] " +
                ",[sck_srmmrk] " +
                ",[sck_kesideyeri] " +
                ",[Sck_TCMB_Banka_kodu] " +
                ",[Sck_TCMB_Sube_kodu] " +
                ",[Sck_TCMB_il_kodu] " +
                ",[SckTasra_fl] " +
                ",[sck_projekodu] " +
                ",[sck_masraf1] " +
                ",[sck_masraf1_isleme] " +
                ",[sck_masraf2] " +
                ",[sck_masraf2_isleme] " +
                ",[sck_odul_katkisi_tutari] " +
                ",[sck_servis_komisyon_tutari] " +
                ",[sck_erken_odeme_faiz_tutari] " +
                ",[sck_odul_katkisi_tutari_islendi_fl] " +
                ",[sck_servis_komisyon_tutari_islendi_fl] " +
                ",[sck_erken_odeme_faiz_tutari_islendi_fl] " +
                ",[sck_kredi_karti_tipi] " +
                ",[sck_taksit_sayisi] " +
                ",[sck_kacinci_taksit] " +
                ",[sck_uye_isyeri_no] " +
                ",[sck_kredi_karti_no] " +
                ",[sck_provizyon_kodu]) " +
                "VALUES " +
                "(0                         --<sck_DBCno, smallint,> \n" + 
                ",0                         --<sck_SpecRECno, int,> \n" + 
                ",0                         --<sck_iptal, bit,> \n" + 
                ",54                        --<sck_fileid, smallint,> \n" + 
                ",0                         --<sck_hidden, bit,> \n" + 
                ",0                         --<sck_kilitli, bit,> \n" + 
                ",0                         --<sck_degisti, bit,> \n" + 
                ",0                         --<sck_checksum, int,> \n" + 
                ",@sck_create_user          --<sck_create_user, smallint,> \n" + 
                ",GETDATE()                 --<sck_create_date, datetime,> \n" + 
                ",@sck_lastup_user          --<sck_lastup_user, smallint,> \n" + 
                ",GETDATE()                 --<sck_lastup_date, datetime,> \n" + 
                ",''                        --<sck_special1, nvarchar(4),> \n" + 
                ",''                        --<sck_special2, nvarchar(4),> \n" + 
                ",''                        --<sck_special3, nvarchar(4),> \n" + 
                ",@sck_firmano              --<sck_firmano, int,> \n" + 
                ",@sck_subeno               --<sck_subeno, int,> \n" + 
                ",@sck_tip                  --<sck_tip, tinyint,> \n" + 
                ",@sck_refno                --<sck_refno, nvarchar(25),> \n" + 
                ",''                        --<sck_bankano, nvarchar(25),> \n" + 
                ",@sck_borclu               --<sck_borclu, nvarchar(50),> \n" + 
                ",''                        --<sck_vdaire_no, nvarchar(40),> \n" + 
                ",@sck_vade                 --<sck_vade, datetime,> \n" + 
                ",@sck_tutar                --<sck_tutar, float,> \n" + 
                ",@sck_doviz                --<sck_doviz, tinyint,> \n" + 
                ",@sck_odenen               --<sck_odenen, float,> \n" + 
                ",0                         --<sck_degerleme_islendi, tinyint,> \n" + 
                ",''                        --<sck_banka_adres1, nvarchar(50),> \n" + 
                ",''                        --<sck_sube_adres2, nvarchar(50),> \n" + 
                ",''                        --<sck_borclu_tel, nvarchar(15),> \n" + 
                ",''                        --<sck_hesapno_sehir, nvarchar(30),> \n" + 
                ",''                        --<sck_no, nvarchar(25),> \n" + 
                ",'18991230'                --<sck_duzen_tarih, datetime,> \n" + 
                ",@sck_sahip_cari_cins      --<sck_sahip_cari_cins, tinyint,> \n" + 
                ",@sck_sahip_cari_kodu      --<sck_sahip_cari_kodu, nvarchar(25),> \n" + 
                ",@sck_sahip_cari_grupno    --<sck_sahip_cari_grupno, tinyint,> \n" + 
                ",@sck_nerede_cari_cins     --<sck_nerede_cari_cins, tinyint,> \n" + 
                ",@sck_nerede_cari_kodu     --<sck_nerede_cari_kodu, nvarchar(25),> \n" + 
                ",@sck_nerede_cari_grupno   --<sck_nerede_cari_grupno, tinyint,> \n" + 
                ",@sck_ilk_hareket_tarihi   --<sck_ilk_hareket_tarihi, datetime,> \n" + 
                ",@sck_ilk_evrak_seri       --<sck_ilk_evrak_seri, [dbo].[evrakseri_str],> \n" + 
                ",@sck_ilk_evrak_sira_no    --<sck_ilk_evrak_sira_no, int,> \n" + 
                ",@sck_ilk_evrak_satir_no   --<sck_ilk_evrak_satir_no, int,> \n" +
                ",@sck_son_hareket_tarihi   --<sck_son_hareket_tarihi, datetime,> \n" + 
                ",@sck_doviz_kur            --<sck_doviz_kur, float,> \n" + 
                ",@sck_sonpoz               --<sck_sonpoz, tinyint,> \n" + 
                ",0                         --<sck_imza, tinyint,> \n" + 
                ",@sck_srmmrk               --<sck_srmmrk, nvarchar(25),> \n" + 
                ",''                        --<sck_kesideyeri, nvarchar(14),> \n" + 
                ",''                        --<Sck_TCMB_Banka_kodu, nvarchar(4),> \n" + 
                ",''                        --<Sck_TCMB_Sube_kodu, nvarchar(8),> \n" + 
                ",''                        --<Sck_TCMB_il_kodu, nvarchar(3),> \n" + 
                ",0                         --<SckTasra_fl, bit,> \n" + 
                ",@sck_projekodu            --<sck_projekodu, nvarchar(25),> \n" + 
                ",0                         --<sck_masraf1, float,> \n" + 
                ",0                         --<sck_masraf1_isleme, tinyint,> \n" + 
                ",0                         --<sck_masraf2, float,> \n" + 
                ",0                         --<sck_masraf2_isleme, tinyint,> \n" + 
                ",0                         --<sck_odul_katkisi_tutari, float,> \n" + 
                ",0                         --<sck_servis_komisyon_tutari, float,> \n" + 
                ",0                         --<sck_erken_odeme_faiz_tutari, float,> \n" + 
                ",0                         --<sck_odul_katkisi_tutari_islendi_fl, bit,> \n" + 
                ",0                         --<sck_servis_komisyon_tutari_islendi_fl, bit,> \n" + 
                ",0                         --<sck_erken_odeme_faiz_tutari_islendi_fl, bit,> \n" + 
                ",0                         --<sck_kredi_karti_tipi, tinyint,> \n" + 
                ",0                         --<sck_taksit_sayisi, smallint,> \n" + 
                ",0                         --<sck_kacinci_taksit, smallint,> \n" + 
                ",''                        --<sck_uye_isyeri_no, nvarchar(25),> \n" + 
                ",''                        --<sck_kredi_karti_no, nvarchar(16),> \n" + 
                ",''                        --<sck_provizyon_kodu, nvarchar(10),> \n" + 
                ")",
        param : ['sck_create_user:int','sck_lastup_user:int','sck_firmano:int','sck_subeno:int','sck_tip:int','sck_refno:string|25','sck_borclu:string|25',
                 'sck_vade:date','sck_tutar:float','sck_doviz:int','sck_odenen:float','sck_sahip_cari_cins:int','sck_sahip_cari_kodu:string|25','sck_sahip_cari_grupno:int','sck_nerede_cari_cins:int',
                 'sck_nerede_cari_kodu:string|25','sck_nerede_cari_grupno:int','sck_ilk_hareket_tarihi:date','sck_ilk_evrak_seri:string|25','sck_ilk_evrak_sira_no:int',
                 'sck_ilk_evrak_satir_no:int','sck_son_hareket_tarihi:date','sck_doviz_kur:float','sck_sonpoz:int','sck_srmmrk:string|25','sck_projekodu:string|25']
    },
    CekHarUpdate:
    {
        query:  "UPDATE ODEME_EMIRLERI " +
                "SET sck_tutar = @sck_tutar " +
                "WHERE sck_refno = @sck_refno " ,
        param : ['sck_tutar:float','sck_refno:string|50']
    },
    CekHarDelete:
    {
        query:  "DELETE FROM ODEME_EMIRLERI WHERE sck_ilk_evrak_seri = @sck_ilk_evrak_seri AND sck_ilk_evrak_sira_no = @sck_ilk_evrak_sira_no" ,
        param : ['sck_ilk_evrak_seri','sck_ilk_evrak_sira_no'],
        type : ['string|20','int']
    },
    MaxCekRefNo : 
    {
        query: "SELECT TIP + '-000-000-' + CONVERT(NVARCHAR(20),YEAR(GETDATE())) + '-' +  REPLACE(STR(CONVERT(NVARCHAR(10),ISNULL(REFNO,0)), 8), SPACE(1), '0') AS MAXREFNO " +
                "FROM (SELECT " +
                "CASE @sck_tip WHEN 0 THEN 'MC' WHEN 1 THEN 'MS' WHEN 6 THEN 'MK' END AS TIP, " +
                "MAX(CONVERT(INT,SUBSTRING(sck_refno,17,25))) + 1 AS REFNO " +
                "FROM ODEME_EMIRLERI WHERE sck_tip = @sck_tip ) AS TBL" ,
        param : ['sck_tip'],
        type : ['int']
    },
    //Etiket
    EtiketInsert :
    {  
        query : "INSERT INTO ETIKETBAS " +
                "([Etkb_DBCno], " +
                "[Etkb_SpecRECno], " + 
                "[Etkb_iptal], " +
                "[Etkb_fileid], " +
                "[Etkb_hidden], " + 
                "[Etkb_kilitli], " +
                "[Etkb_degisti], " +
                "[Etkb_checksum], " +
                "[Etkb_create_user], " +
                "[Etkb_create_date], " +
                "[Etkb_lastup_user], " +
                "[Etkb_lastup_date], " +
                "[Etkb_special1], " +
                "[Etkb_special2], " +
                "[Etkb_special3], " +
                "[Etkb_evrakno_seri], " +
                "[Etkb_evrakno_sira], " +
                "[Etkb_evrak_tarihi], " +
                "[Etkb_aciklama], " +
                "[Etkb_satirno], " +
                "[Etkb_belge_no], " +
                "[Etkb_belge_tarih], " +
                "[Etkb_EtiketTip], " +
                "[Etkb_BasimTipi], " +
                "[Etkb_BasimAdet], " +
                "[Etkb_DepoNo], " +
                "[Etkb_StokKodu], " +
                "[Etkb_RenkNo], " +
                "[Etkb_BedenNo], " +
                "[Etkb_Barkodu], " +
                "[Etkb_BasilacakMiktar] " +
                ") VALUES ( " + 
                "0					--<Etkb_DBCno, int,> \n" +
                ",0		 			--<Etkb_SpecRECno, int,> \n" +
                ",0                 --<Etkb_iptal, bit,> \n" +
                ",115                    --<Etkb_fileid, smallint,> \n" +
                ",0                  --<Etkb_hidden, bit,> \n" +
                ",0                  --<Etkb_kilitli, bit,> \n" +
                ",0                  --<Etkb_degisti, bit,> \n" +
                ",0                  --<Etkb_checksum, int,> \n" +
                ",@Etkb_create_user 			--<Etkb_create_user, smallint,> \n" +
                ",GETDATE() 		--<Etkb_create_date, datetime,> \n" +
                ",@Etkb_lastup_user 				--<Etkb_lastup_user, smallint,> \n" +
                ",GETDATE() 		--<Etkb_lastup_date, datetime,> \n" +
                ",@Etkb_special1		 			--<Etkb_special1, varchar(4),> \n" +
                ",''		 			--<Etkb_special2, varchar(4),> \n" +
                ",''		 			--<Etkb_special3, varchar(4),> \n" +
                ",@Etkb_evrakno_seri			--<Etkb_evrakno_seri, varchar(20),> \n" +
                ",@Etkb_evrakno_sira			--<Etkb_evrakno_sira, int,> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112)			--<Etkb_evrak_tarihi, int,> \n" +
                ",@Etkb_aciklama                            --<Etkb_aciklama, varchar(40),> \n" +
                ",(SELECT ISNULL(MAX(Etkb_satirno),-1) + 1 FROM ETIKETBAS WHERE Etkb_evrakno_seri = @Etkb_evrakno_seri AND Etkb_evrakno_sira = @Etkb_evrakno_sira)				                    --<Etkb_satirno, int,> \n" +
                ",@Etkb_belge_no                            --<Etkb_belge_no, varchar(50),> \n " +
                ",CONVERT(VARCHAR(10),GETDATE(),112)       --<Etkb_belge_tarih, datetime,> \n " +
                ",@Etkb_EtiketTip                            --<Etkb_EtiketTip, tinyint,> \n " +
                ",@Etkb_BasimTipi                           --<Etkb_BasimTipi, tinyint,> \n " +
                ",@Etkb_BasimAdet                            --<Etkb_BasimAdet, smallint,> \n " +
                ",@Etkb_DepoNo                              --<Etkb_DepoNo, bit> \n " +
                ",@Etkb_StokKodu                            --<Etkb_StokKodu, varchar(25),> \n " +
                ",@Etkb_RenkNo                              --<Etkb_RenkNo, int,> \n " +
                ",@Etkb_BedenNo                             --<Etkb_BedenNo, int,> \n" +
                ",@Etkb_Barkodu                             --<Etkb_Barkodu, varchar(50),> \n" +
                ",@Etkb_BasilacakMiktar                     --<Etkb_BasilacakMiktar smallint,> \n" + 
                ")",               
            param :['Etkb_create_user:int','Etkb_lastup_user:int','Etkb_special1:string|50','Etkb_evrakno_seri:string|50','Etkb_evrakno_sira:int','Etkb_aciklama:string|50',
                    'Etkb_belge_no:string|50','Etkb_EtiketTip:int','Etkb_BasimTipi:int','Etkb_BasimAdet:int','Etkb_DepoNo:int','Etkb_StokKodu:string|50','Etkb_RenkNo:int','Etkb_BedenNo:int',
                    'Etkb_Barkodu:string|50','Etkb_BasilacakMiktar:int']
    },
    EtiketGetir : 
    {
        query : "SELECT Etkb_evrakno_seri AS SERI, Etkb_evrakno_sira AS SIRA, Etkb_BasilacakMiktar AS BASIMMIKTAR, Etkb_StokKodu AS STOKKODU, Etkb_DepoNo AS DEPONO " +
                "FROM ETIKETBAS WHERE Etkb_evrakno_seri = @Etkb_evrakno_seri AND Etkb_evrakno_sira = @Etkb_evrakno_sira ",
        param : ['Etkb_evrakno_seri:string|50','Etkb_evrakno_sira:int']  
    },
    MaxEtiketSira : 
    {
        query : "SELECT ISNULL(MAX(Etkb_evrakno_sira),0) + 1 AS MAXEVRSIRA FROM ETIKETBAS " +
                "WHERE Etkb_evrakno_seri=@Etkb_evrakno_seri",
        param : ['Etkb_evrakno_seri'],
        type : ['string|50']
    },
    //Üretim Hareketleri
    MaxOperasyonSira : 
    {
        query : "SELECT ISNULL(MAX(OpT_EvrakNoSira),0) + 1 AS MAXEVRSIRA FROM URETIM_OPERASYON_HAREKETLERI WHERE OpT_EvrakNoSeri = @OpT_EvrakNoSeri",
        param : ['OpT_EvrakNoSeri'],
        type : ['string|25']
    },
    OperasyonHareketInsert :
    {  
        query : "INSERT INTO [dbo].[URETIM_OPERASYON_HAREKETLERI]  " +
                "([OpT_DBCno] " +
                ",[OpT_SpecRECNo] " +
                ",[OpT_iptal] " +
                ",[OpT_fileid] " +
                ",[OpT_hidden] " +
                ",[OpT_kilitli] " +
                ",[OpT_degisti] " +
                ",[OpT_CheckSum] " +
                ",[OpT_create_user] " +
                ",[OpT_create_date] " +
                ",[OpT_lastup_user] " +
                ",[OpT_lastup_date] " +
                ",[OpT_special1] " +
                ",[OpT_special2] " +
                ",[OpT_special3] " +
                ",[OpT_firmano] " +
                ",[OpT_subeno] " +
                ",[OpT_EvrakNoSeri] " +
                ",[OpT_EvrakNoSira] " +
                ",[OpT_EvrakSatirNo] " +
                ",[OpT_RotaPlan_uid] " +
                ",[OpT_baslamatarihi] " +
                ",[OpT_bitis_tarihi] " +
                ",[OpT_IsEmriKodu] " +
                ",[OpT_UrunKodu] " +
                ",[OpT_OperasyonSafhaNo] " +
                ",[OpT_OperasyonKodu] " +
                ",[Opt_SonrakiSafhaNo] " +
                ",[OpT_ismerkezi] " +
                ",[OpT_ismerkezi_hizi] " +
                ",[OpT_PersonelKodu] " +
                ",[OpT_TamamlananMiktar] " +
                ",[Opt_TamamlananMiktar2] " +
                ",[Opt_TamamlananMiktar3] " +
                ",[Opt_TamamlananMiktar4] " +
                ",[Opt_BozukMiktar] " +
                ",[Opt_BozukMiktar2] " +
                ",[Opt_BozukMiktar3] " +
                ",[Opt_BozukMiktar4] " +
                ",[Opt_SetupSuresi] " +
                ",[OpT_TamamlananSure] " +
                ",[Opt_Gecikme_suresi] " +
                ",[Opt_iscilik_Maliyet_ana] " +
                ",[Opt_iscilik_Maliyet_Alt] " +
                ",[Opt_iscilik_Maliyet_Orj] " +
                ",[Opt_Genel_uretim_Maliyet_ana] " +
                ",[Opt_Genel_uretim_Maliyet_Alt] " +
                ",[Opt_Genel_uretim_Maliyet_Orj] " +
                ",[Opt_Kapat_fl] " +
                ",[Opt_calisan_adam] " +
                ",[Opt_islenen_alan] " +
                ",[Opt_islenen_hacim] " +
                ",[Opt_islenen_agirlik] " +
                ",[Opt_tuketilen_enerji1] " +
                ",[Opt_tuketilen_enerji2] " +
                ",[Opt_aciklama] " +
                ",[Opt_ufrs_iscilik_maliyet_ana] " +
                ",[Opt_ufrs_iscilik_maliyet_alt] " +
                ",[Opt_ufrs_iscilik_maliyet_orj] " +
                ",[Opt_ufrs_genel_uretim_maliyet_ana] " +
                ",[Opt_ufrs_genel_uretim_maliyet_alt] " +
                ",[Opt_ufrs_genel_uretim_maliyet_orj] " +
                ",[Opt_kalipkodu] " +
                ",[Opt_HazirlikElemanSayisi] " +
                ",[Opt_OperasyonElemanSayisi] " +
                ") VALUES ( " +
                " 0					        --<OpT_DBCno, smallint,> \n" +
                ",0					        --<OpT_SpecRECNo, int,> \n" +
                ",0					        --<OpT_iptal, bit,> \n" +
                ",141					    --<OpT_fileid, smallint,> \n" +
                ",0					        --<OpT_hidden, bit,> \n" +
                ",0					        --<OpT_kilitli, bit,> \n" +
                ",0					        --<OpT_degisti, bit,> \n" +
                ",0					        --<OpT_CheckSum, int,> \n" +
                ",@OpT_create_user	        --<OpT_create_user, smallint,> \n" +
                ",GETDATE()			        --<OpT_create_date, datetime,> \n" +
                ",@OpT_lastup_user	        --<OpT_lastup_user, smallint,> \n" +
                ",GETDATE()			        --<OpT_lastup_date, datetime,> \n" +
                ",''					    --<OpT_special1, nvarchar(4),> \n" +
                ",''					    --<OpT_special2, nvarchar(4),> \n" +
                ",''					    --<OpT_special3, nvarchar(4),> \n" +
                ",@OpT_firmano		        --<OpT_firmano, int,> \n" +
                ",@OpT_subeno			    --<OpT_subeno, int,> \n" +
                ",@OpT_EvrakNoSeri	        --<OpT_EvrakNoSeri, [dbo].[evrakseri_str],> \n" +
                ",@OpT_EvrakNoSira	        --<OpT_EvrakNoSira, int,> \n" +
                ",(SELECT ISNULL(MAX(OpT_EvrakSatirNo),-1) + 1 AS SATIRNO FROM URETIM_OPERASYON_HAREKETLERI WHERE OpT_EvrakNoSeri = @OpT_EvrakNoSeri AND OpT_EvrakNoSira = @OpT_EvrakNoSira)	--<OpT_EvrakSatirNo, int,> \n" +
                ",@OpT_RotaPlan_uid	        --<OpT_RotaPlan_uid, uniqueidentifier,> \n" +
                ",@OpT_baslamatarihi	    --<OpT_baslamatarihi, datetime,> \n" +
                ",@OpT_bitis_tarihi	        --<OpT_bitis_tarihi, datetime,> \n" +
                ",@OpT_IsEmriKodu		    --<OpT_IsEmriKodu, nvarchar(25),> \n" +
                ",@OpT_UrunKodu		        --<OpT_UrunKodu, nvarchar(25),> \n" +
                ",@OpT_OperasyonSafhaNo	    --<OpT_OperasyonSafhaNo, smallint,> \n" +
                ",@OpT_OperasyonKodu		--<OpT_OperasyonKodu, nvarchar(25),> \n" +
                ",0						    --<Opt_SonrakiSafhaNo, smallint,> \n" +
                ",@OpT_ismerkezi			--<OpT_ismerkezi, nvarchar(25),> \n" +
                ",0						    --<OpT_ismerkezi_hizi, float,> \n" +
                ",''						--<OpT_PersonelKodu, nvarchar(25),> \n" +
                ",@OpT_TamamlananMiktar	    --<OpT_TamamlananMiktar, float,> \n" +
                ",@Opt_TamamlananMiktar2	--<Opt_TamamlananMiktar2, float,> \n" +
                ",@Opt_TamamlananMiktar3	--<Opt_TamamlananMiktar3, float,> \n" +
                ",@Opt_TamamlananMiktar4	--<Opt_TamamlananMiktar4, float,> \n" +
                ",0						    --<Opt_BozukMiktar, float,> \n" +
                ",0						    --<Opt_BozukMiktar2, float,> \n" +
                ",0						    --<Opt_BozukMiktar3, float,> \n" +
                ",0						    --<Opt_BozukMiktar4, float,> \n" +
                ",0						    --<Opt_SetupSuresi, int,> \n" +
                ",@OpT_TamamlananSure		--<OpT_TamamlananSure, int,> \n" +
                ",0						    --<Opt_Gecikme_suresi, int,> \n" +
                ",0						    --<Opt_iscilik_Maliyet_ana, float,> \n" +
                ",0						    --<Opt_iscilik_Maliyet_Alt, float,> \n" +
                ",0						    --<Opt_iscilik_Maliyet_Orj, float,> \n" +
                ",0						    --<Opt_Genel_uretim_Maliyet_ana, float,> \n" +
                ",0						    --<Opt_Genel_uretim_Maliyet_Alt, float,> \n" +
                ",0						    --<Opt_Genel_uretim_Maliyet_Orj, float,> \n" +
                ",0						    --<Opt_Kapat_fl, bit,> \n" +
                ",0						    --<Opt_calisan_adam, float,> \n" +
                ",0						    --<Opt_islenen_alan, float,> \n" +
                ",0						    --<Opt_islenen_hacim, float,> \n" +
                ",0						    --<Opt_islenen_agirlik, float,> \n" +
                ",0						    --<Opt_tuketilen_enerji1, float,> \n" +
                ",0						    --<Opt_tuketilen_enerji2, float,> \n" +
                ",''						--<Opt_aciklama, nvarchar(80),> \n" +
                ",0						    --<Opt_ufrs_iscilik_maliyet_ana, float,> \n" +
                ",0						    --<Opt_ufrs_iscilik_maliyet_alt, float,> \n" +
                ",0						    --<Opt_ufrs_iscilik_maliyet_orj, float,> \n" +
                ",0						    --<Opt_ufrs_genel_uretim_maliyet_ana, float,> \n" +
                ",0						    --<Opt_ufrs_genel_uretim_maliyet_alt, float,> \n" +
                ",0						    --<Opt_ufrs_genel_uretim_maliyet_orj, float,> \n" +
                ",''						--<Opt_kalipkodu, nvarchar(25),> \n" +
                ",0						    --<Opt_HazirlikElemanSayisi, float,> \n" +
                ",0						    --<Opt_OperasyonElemanSayisi, float,> \n" +
                ")",               
            param :['OpT_create_user:int','OpT_lastup_user:int','OpT_firmano:int','OpT_subeno:int','OpT_EvrakNoSeri:string|25','OpT_EvrakNoSira:int',
                    'OpT_RotaPlan_uid:string|50','OpT_baslamatarihi:datetime','OpT_bitis_tarihi:datetime','OpT_IsEmriKodu:string|25','OpT_UrunKodu:string|25',
                    'OpT_OperasyonSafhaNo:int','OpT_OperasyonKodu:string|25','OpT_ismerkezi:string|25','OpT_TamamlananMiktar:float','Opt_TamamlananMiktar2:float',
                    'Opt_TamamlananMiktar3:float','Opt_TamamlananMiktar4:float','OpT_TamamlananSure:int']
    },
    //Seri No İşleri
    SeriNoInsert : 
    {
        query : "INSERT INTO [dbo].[STOK_SERINO_TANIMLARI] " +
        "([chz_Guid] " +
        ",[chz_DBCno] " +
        ",[chz_Spec_Rec_no] " +
        ",[chz_iptal] " +
        ",[chz_fileid] " +
        ",[chz_hidden] " +
        ",[chz_kilitli] " +
        ",[chz_degisti] " +
        ",[chz_checksum] " +
        ",[chz_create_user] " +
        ",[chz_create_date] " +
        ",[chz_lastup_user] " +
        ",[chz_lastup_date] " +
        ",[chz_special1] " +
        ",[chz_special2] " +
        ",[chz_special3] " +
        ",[chz_serino] " +
        ",[chz_stok_kodu] " +
        ",[chz_grup_kodu] " +
        ",[chz_Tuktckodu] " +
        ",[chz_GrnBasTarihi] " +
        ",[chz_GrnBitTarihi] " +
        ",[chz_aciklama1] " +
        ",[chz_aciklama2] " +
        ",[chz_aciklama3] " +
        ",[chz_al_tarih] " +
        ",[chz_al_evr_seri] " +
        ",[chz_al_evr_sira] " +
        ",[chz_al_cari_kodu] " +
        ",[chz_al_wd_tarih] " +
        ",[chz_al_wd_evr_seri] " +
        ",[chz_al_wd_evr_sira] " +
        ",[chz_st_tarih] " +
        ",[chz_st_evr_seri] " +
        ",[chz_st_evr_sira] " +
        ",[chz_st_cari_kodu] " +
        ",[chz_st_wd_tarih] " +
        ",[chz_st_wd_evr_seri] " +
        ",[chz_st_wd_evr_sira] " +
        ",[chz_brut_fiati] " +
        ",[chz_al_fiati_ana] " +
        ",[chz_al_fiati_alt] " +
        ",[chz_al_fiati_orj] " +
        ",[chz_st_fiati_ana] " +
        ",[chz_st_fiati_alt] " +
        ",[chz_st_fiati_orj] " +
        ",[chz_parca_garantisi] " +
        ",[chz_parca_serino] " +
        ",[chz_parca_garanti_baslangic] " +
        ",[chz_parca_garanti_bitis] " +
        ",[chz_makina_tipi] " +
        ",[chz_model_yili] " +
        ",[chz_kiraya_acilma_tarihi] " +
        ",[chz_musteri_garanti_baslangic] " +
        ",[chz_musteri_garanti_bitis] " +
        ",[chz_demirbas_kodu] " +
        ",[chz_tescil_tarihi] " +
        ",[chz_bakim_tipi] " +
        ",[chz_bakim_tarihi] " +
        ",[chz_ara_bakim_sayisi] " +
        ",[chz_bakim_peryodu] " +
        ",[chz_sayac_tipi] " +
        ",[chz_son_sayac_degeri] " +
        ",[chz_motor_seri_no] " +
        ",[chz_sase_no] " +
        ",[chz_HGS_fl] " +
        ",[chz_HGS_no] " +
        ",[chz_OGS_fl] " +
        ",[chz_OGS_no] " +
        ",[chz_ruhsat_no] " +
        ",[chz_ruhsat_sahibi] " +
        ",[chz_rehin_fl] " +
        ",[chz_rehin_nedeni] " +
        ",[chz_sifirlama_oncesi_sayac] " +
        ",[chz_devir_servis_sayac] " +
        ",[chz_devir_servis_peryodu] " +
        ")    VALUES     ( " +
        "NEWID()          --<chz_Guid, uniqueidentifier,>  \n " +
        ",0          --<chz_DBCno, smallint,>  \n " +
        ",0          --<chz_Spec_Rec_no, int,>  \n " +
        ",0          --<chz_iptal, bit,>  \n " +
        ",94          --<chz_fileid, smallint,>  \n " +
        ",0          --<chz_hidden, bit,>  \n " +
        ",0          --<chz_kilitli, bit,>  \n " +
        ",0          --<chz_degisti, bit,>  \n " +
        ",0          --<chz_checksum, int,>  \n " +
        ",1          --<chz_create_user, smallint,>  \n " +
        ",GETDATE()          --<chz_create_date, datetime,>  \n " +
        ",1          --<chz_lastup_user, smallint,>  \n " +
        ",GETDATE()          --<chz_lastup_date, datetime,>  \n " +
        ",''          --<chz_special1, nvarchar(4),>  \n " +
        ",''          --<chz_special2, nvarchar(4),>  \n " +
        ",''          --<chz_special3, nvarchar(4),>  \n " +
        ",@SERINO          --<chz_serino, nvarchar(25),>  \n " +
        ",@STOKKODU           --<chz_stok_kodu, nvarchar(25),>  \n " +
        ",''         --<chz_grup_kodu, nvarchar(25),>  \n " +
        ",''          --<chz_Tuktckodu, nvarchar(25),>  \n " +
        ",GETDATE()          --<chz_GrnBasTarihi, datetime,>  \n " +
        ",GETDATE()          --<chz_GrnBitTarihi, datetime,>  \n " +
        ",''          --<chz_aciklama1, nvarchar(80),>  \n " +
        ",''          --<chz_aciklama2, nvarchar(80),>  \n " +
        ",''          --<chz_aciklama3, nvarchar(80),>  \n " +
        ",GETDATE()          --<chz_al_tarih, datetime,>  \n " +
        ",@SERI          --<chz_al_evr_seri, [dbo].[evrakseri_str],>  \n " +
        ",@SIRA          --<chz_al_evr_sira, int,>  \n " +
        ",''          --<chz_al_cari_kodu, nvarchar(25),>  \n " +
        ",GETDATE()          --<chz_al_wd_tarih, datetime,>  \n " +
        ",''          --<chz_al_wd_evr_seri, [dbo].[evrakseri_str],>  \n " +
        ",0          --<chz_al_wd_evr_sira, int,>  \n " +
        ",GETDATE()          --<chz_st_tarih, datetime,>  \n " +
        ",''          --<chz_st_evr_seri, [dbo].[evrakseri_str],>  \n " +
        ",0          --<chz_st_evr_sira, int,>  \n " +
        ",''          --<chz_st_cari_kodu, nvarchar(25),>  \n " +
        ",GETDATE()          --<chz_st_wd_tarih, datetime,>  \n " +
        ",''          --<chz_st_wd_evr_seri, [dbo].[evrakseri_str],>  \n " +
        ",0          --<chz_st_wd_evr_sira, int,>  \n " +
        ",0          --<chz_brut_fiati, float,>  \n " +
        ",0          --<chz_al_fiati_ana, float,>  \n " +
        ",0          --<chz_al_fiati_alt, float,>  \n " +
        ",0          --<chz_al_fiati_orj, float,>  \n " +
        ",0          --<chz_st_fiati_ana, float,>  \n " +
        ",0          --<chz_st_fiati_alt, float,>  \n " +
        ",0          --<chz_st_fiati_orj, float,>  \n " +
        ",0          --<chz_parca_garantisi, bit,>  \n " +
        ",''          --<chz_parca_serino, nvarchar(25),>  \n " +
        ",GETDATE()         --<chz_parca_garanti_baslangic, datetime,>  \n " +
        ",GETDATE()          --<chz_parca_garanti_bitis, datetime,>  \n " +
        ",0          --<chz_makina_tipi, tinyint,>  \n " +
        ",''          --<chz_model_yili, nvarchar(4),>  \n " +
        ",GETDATE()          --<chz_kiraya_acilma_tarihi, datetime,>  \n " +
        ",GETDATE()          --<chz_musteri_garanti_baslangic, datetime,>  \n " +
        ",GETDATE()          --<chz_musteri_garanti_bitis, datetime,>  \n " +
        ",''          --<chz_demirbas_kodu, nvarchar(25),>  \n " +
        ",GETDATE()          --<chz_tescil_tarihi, datetime,>  \n " +
        ",0          --<chz_bakim_tipi, tinyint,>  \n " +
        ",GETDATE()          --<chz_bakim_tarihi, datetime,>  \n " +
        ",0          --<chz_ara_bakim_sayisi, int,>  \n " +
        ",0          --<chz_bakim_peryodu, tinyint,>  \n " +
        ",0          --<chz_sayac_tipi, tinyint,>  \n " +
        ",0          --<chz_son_sayac_degeri, float,>  \n " +
        ",''          --<chz_motor_seri_no, nvarchar(25),>  \n " +
        ",''         --<chz_sase_no, nvarchar(25),>  \n " +
        ",0          --<chz_HGS_fl, bit,>  \n " +
        ",''          --<chz_HGS_no, nvarchar(25),>  \n " +
        ",0          --<chz_OGS_fl, bit,>  \n " +
        ",''          --<chz_OGS_no, nvarchar(25),>  \n " +
        ",''          --<chz_ruhsat_no, nvarchar(25),>  \n " +
        ",''          --<chz_ruhsat_sahibi, nvarchar(50),>  \n " +
        ",0         --<chz_rehin_fl, bit,>  \n " +
        ",''          --<chz_rehin_nedeni, nvarchar(100),>  \n " +
        ",0          --<chz_sifirlama_oncesi_sayac, float,>  \n " +
        ",0          --<chz_devir_servis_sayac, float,>  \n " +
        ",0          --<chz_devir_servis_peryodu, float,>  \n " +
        " ) ",
        param :['SERI:string|25','SIRA:int','SERINO:string|50','STOKKODU:string|50']
    },
    StokGramDegerGetir : 
    {
        query : "SELECT sto_special3 AS REFDEGER FROM STOKLAR WHERE sto_kod =@sto_kod " ,
        param : ['sto_kod'],
        type : ['string|50']
    },
    /* Parametre TYPE
       0 - KULLANICI
       1 - MENU
       2 - MENU YONETIM
       3 - MENU RAPOR
       4 - GENEL
       5 - SISTEM */
    GetParam :
    {
        query : "SELECT * FROM MikroDB_V16.dbo.TERP_NITROWEB_PARAM_2 WHERE TYPE = @TYPE AND ACCOUNT = @ACCOUNT",
        param : ['TYPE','ACCOUNT'],
        type : ['int','string|50'] 
    },
    GetKullanici : 
    {
        query : "SELECT * FROM MikroDB_V16.dbo.TERP_NITROWEB_PARAM_2 WHERE ACCOUNT = @ACCOUNT",
        param : ['ACCOUNT'],
        type : ['string|50'] 
    },
    UpdateParam : 
    {
        query : "UPDATE MikroDB_V16.dbo.TERP_NITROWEB_PARAM_2 SET VALUE = @VALUE WHERE TAG = @TAG",
        param : ['VALUE','TAG'],
        type : ['string|50','string|50']
    },
    InsertParam :
    {
        query : "INSERT INTO MikroDB_V16.[dbo].[TERP_NITROWEB_PARAM_2] " +
                "([ACCOUNT] " +
                ",[TAG] " +
                ",[VALUE] " +
                ",[TYPE] " +
                ",[SPECIAL] " +
                ",[FIRM] " +
                " ) VALUES ( " +
                "@ACCOUNT           --<ACCOUNT, nvarchar(50),> \n " +
                ",@TAG              --<TAG, nvarchar(50),> \n " +
                ",@VALUE            --<VALUE, nvarchar(200),> \n " +
                ",@TYPE             --<TYPE, tinyint,> \n " +
                ",@SPECIAL          --<SPECIAL, nvarchar(200),> \n " +
                ",@FIRM             --<SPECIAL, nvarchar(25),> \n " +
                " )",
        param : ['ACCOUNT','TAG','VALUE','TYPE','SPECIAL','FIRM'],
        type  : ['string|50','string|50','string|200','int','string|200','string|25']
    },
    InsertJson :
    {
        query : "INSERT INTO MikroDB_V16.[dbo].[TERP_NITROWEB_JSONDATA_2] " +
                "([GUID] " +
                ",[KULLANICI] " +
                ",[MENU] " +
                ",[JSON] " +
                ",[DURUM] " +
                " ) VALUES ( " +
                "NEWID()           --<GUID, nvarchar(50),> \n " +
                ",@KULLANICI             --<KULLANICI, nvarchar(50),> \n " +
                ",@MENU            --<MENU, nvarchar(200),> \n " +
                ",@JSON             --<JSON, nvarchar,> \n " +
                ",@DURUM          --<DURUM, bit),> \n " +
                " )",
        param : ['KULLANICI','MENU','JSON','DURUM'],
        type  : ['string|50','string|50','string|max','int']
    },
    //GUNOK
    DeleteIsEmriSira : 
    {
        query : "DELETE FROM MikroDB_V16.[dbo].[TERP_NITROWEB_ISEMRI_LISTESI] WHERE ISEMRI_GUID = @ISEMRI_GUID ",
        param : ['ISEMRI_GUID:string|50']
    },
    MaxIsEmriIstasyonSira : 
    {
        query : "SELECT ISNULL(MAX(CONVERT(int,ISEMRI_ISTASYON_SIRA)),0) + 1 AS MAXISEMRISIRA FROM MikroDB_V16.[dbo].[TERP_NITROWEB_ISEMRI_LISTESI] WHERE SPECIAL = 'ALTISEMRI' AND ISEMRI_ISTASYON_KOD = @ISEMRI_ISTASYON_KOD ",
        param : ['ISEMRI_ISTASYON_KOD:string|25']
    },
    BagliIsEmriGet : 
    {
        query : "SELECT ISM.is_Guid AS GUID,ISM.is_Kod AS KODU,ISM.is_BagliOlduguIsemri AS BAGLIISEMRI,ROTA.RtP_OperasyonKodu AS OPKODU FROM ISEMIRLERI AS ISM " +
                "INNER JOIN URETIM_ROTA_PLANLARI AS ROTA ON ISM.is_Kod = ROTA.RtP_IsEmriKodu " +
                "WHERE ISM.is_BagliOlduguIsemri = @is_BagliOlduguIsemri " ,
        param : ['is_BagliOlduguIsemri'],
        type : ['string|25']
    },
    IsEmriListesiInsert : 
    {
        query : "INSERT INTO MikroDB_V16.[dbo].[TERP_NITROWEB_ISEMRI_LISTESI] " +
                "([ISEMRI_GUID] " +
                ",[ISEMRI_KOD] " +
                ",[ISEMRI_ISTASYON_SIRA] " +
                ",[ISEMRI_BAGLI_IS_EMRI] " +
                ",[ISEMRI_ISTASYON_KOD] " +
                ",[SPECIAL] " +
                ",[ISEMRI_BAS_TARIH] " +
                ",[ISEMRI_BIT_TARIH] " +
                ",[ISEMRI_STATUS] " +
                " ) VALUES ( " +
                "@ISEMRI_GUID                       --<ISEMRI_GUID, uniqueidentifier,> \n " +
                ",@ISEMRI_KOD                       --<ISEMRI_KOD, nvarchar(50),> \n " +
                ",@ISEMRI_ISTASYON_SIRA             --<ISEMRI_ISTASYON_SIRA, nvarchar(50),> \n " +
                ",@ISEMRI_BAGLI_IS_EMRI             --<ISEMRI_BAGLI_IS_EMRI, nvarchar(50),> \n " +
                ",@ISEMRI_ISTASYON_KOD              --<ISEMRI_ISTASYON_KOD, nvarchar(50),> \n " +
                ",@SPECIAL                          --<SPECIAL, nvarchar(50),> \n " +
                ",'1997-02-24 00:00:00.000'         --<ISEMRI_BAS_TARIH, datetime,> \n " +
                ",'1997-02-24 00:00:00.000'         --<ISEMRI_BIT_TARIH, datetime,> \n " +
                ",0                                 --<ISEMRI_STATUS, int,> \n " +
                " )",
        param :['ISEMRI_GUID:string|50','ISEMRI_KOD:string|50','ISEMRI_ISTASYON_SIRA:string|50','ISEMRI_BAGLI_IS_EMRI:string|50','ISEMRI_ISTASYON_KOD:string|50','SPECIAL:string|50']
    },
    UpdateIsEmriSira : 
    {
        query : "UPDATE MikroDB_V16.[dbo].[TERP_NITROWEB_ISEMRI_LISTESI] SET ISEMRI_ISTASYON_SIRA = @ISEMRI_ISTASYON_SIRA WHERE ISEMRI_GUID = @ISEMRI_GUID AND ISEMRI_ISTASYON_KOD = @ISEMRI_ISTASYON_KOD ",
        param : ['ISEMRI_ISTASYON_SIRA:string|25','ISEMRI_GUID:string|50','ISEMRI_ISTASYON_KOD:string|25']
    },
    IsEmriIstasyonlariGet : 
    {
        query : "SELECT " +
                "Op_Aciklama AS ACIKLAMA, " +
                "Op_Kodu AS KODU " +
                "FROM URETIM_ROTA_PLANLARI AS ROTA " +
                "INNER JOIN " +
                "URETIM_OPERASYONLARI AS OP ON ROTA.RtP_OperasyonKodu = OP.Op_Kodu " +
                "WHERE " +
                "RtP_IsEmriKodu = @RtP_IsEmriKodu " ,
        param : ['RtP_IsEmriKodu:string|20']
    },
    YariMamulGet : 
    {
        query : "SELECT upl_kodu,is_Kod FROM ISEMIRLERI AS ISM " +
                "INNER JOIN URETIM_MALZEME_PLANLAMA AS UPL ON ISM.is_Kod =  UPL.upl_isemri " +
                "WHERE ISM.is_BagliOlduguIsemri = @is_BagliOlduguIsemri AND " +
                "(SELECT sto_cins FROM STOKLAR WHERE sto_kod = upl_kodu) = 3 GROUP BY upl_kodu,is_Kod " ,
        param : ['is_BagliOlduguIsemri'],
        type : ['string|25']
    },
    IsEmriBaslat : 
    {
        query : "UPDATE ISEMIRLERI SET is_lastup_date = GETDATE(),is_Emri_AktiflesmeTarihi = CONVERT(nvarchar,GETDATE(),102),is_EmriDurumu = 1 WHERE is_Guid = @is_Guid",
        param : ['is_Guid:string|50']
    },
    IsEmriKapat : 
    {
        query : "UPDATE ISEMIRLERI SET is_lastup_date = GETDATE(),is_KapanisTarihi = CONVERT(nvarchar,GETDATE(),102),is_EmriDurumu = 2 WHERE is_Guid = @is_Guid",
        param : ['is_Guid:string|50']
    },
    UpdateIsEmriDate : 
    {
        query : "UPDATE MikroDB_V16.[dbo].[TERP_NITROWEB_ISEMRI_LISTESI] SET ISEMRI_BAS_TARIH = @ISEMRI_BAS_TARIH,ISEMRI_BIT_TARIH = @ISEMRI_BIT_TARIH,ISEMRI_STATUS = 1 WHERE ISEMRI_GUID = @ISEMRI_GUID AND ISEMRI_ISTASYON_KOD = @ISEMRI_ISTASYON_KOD ",
        param : ['ISEMRI_BAS_TARIH:datetime','ISEMRI_BIT_TARIH:datetime','ISEMRI_GUID:string|50','ISEMRI_ISTASYON_KOD:string|25']
    },
    GetIsEmriDate : 
    {
        query : "SELECT CONVERT(VARCHAR,ISEMRI_BAS_TARIH,120) AS DATE FROM MikroDB_V16.dbo.TERP_NITROWEB_ISEMRI_LISTESI WHERE ISEMRI_KOD = @ISEMRI_KOD AND ISEMRI_ISTASYON_KOD = @ISEMRI_ISTASYON_KOD ",
        param : ["ISEMRI_KOD:string|50","ISEMRI_ISTASYON_KOD:string|25"]
    }
};