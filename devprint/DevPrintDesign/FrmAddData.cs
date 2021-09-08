using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace DevPrintDesign
{
    public partial class FrmAddData : DevExpress.XtraEditors.XtraForm
    {
        public string JSON = "";
        public FrmAddData(string pJSON)
        {
            InitializeComponent();
            JSON = pJSON;
            TxtJSON.Text = JSON;     
        }
        private void BtnSave_Click(object sender, EventArgs e)
        {
            DialogResult = DialogResult.OK;
            JSON = TxtJSON.Text;
            this.Close();
        }

        private void BtnExit_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
