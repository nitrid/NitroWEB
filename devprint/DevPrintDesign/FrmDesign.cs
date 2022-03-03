using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Converters;

namespace DevPrintDesign
{    
    public partial class FrmDesign : DevExpress.XtraEditors.XtraForm
    {
        DataTable TmpTbl;
        bool Activeted = false;
        public FrmDesign()
        {
            InitializeComponent();
        }
        private void SetJSONReport(string JSON)
        {
            TmpTbl = Newtonsoft.Json.JsonConvert.DeserializeObject<DataTable>(JSON);
            TmpTbl.TableName = "DATA";

            reportDesigner1.ActiveDesignPanel.Report.DataSource = TmpTbl;
            reportDesigner1.ActiveDesignPanel.Report.DataMember = "DATA";
            reportDesigner1.ActiveDesignPanel.Report.DataSourceSchema = JSON;
            reportDesigner1.ActiveDesignPanel.OpenReport(reportDesigner1.ActiveDesignPanel.Report);
        }
        private void BtnAddData_ItemClick(object sender, DevExpress.XtraBars.ItemClickEventArgs e)
        {
            if (reportDesigner1.ActiveDesignPanel != null)
            {                
                FrmAddData Frm = new FrmAddData(reportDesigner1.ActiveDesignPanel.Report.DataSourceSchema);
                if (Frm.ShowDialog() == DialogResult.OK)
                {
                    try
                    {
                        SetJSONReport(Frm.JSON);
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show(ex.Message);
                    }
                }
            }
        }
        private void reportDesigner1_AnyDocumentActivated(object sender, DevExpress.XtraBars.Docking2010.Views.DocumentEventArgs e)
        {
            if (reportDesigner1.ActiveDesignPanel.Report.DataSourceSchema != "" && !Activeted)
            {
                Activeted = true;
                SetJSONReport(reportDesigner1.ActiveDesignPanel.Report.DataSourceSchema);
            }
        }
    }
}
