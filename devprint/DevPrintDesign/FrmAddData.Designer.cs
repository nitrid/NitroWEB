namespace DevPrintDesign
{
    partial class FrmAddData
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.BtnSave = new DevExpress.XtraEditors.SimpleButton();
            this.BtnExit = new DevExpress.XtraEditors.SimpleButton();
            this.TxtJSON = new DevExpress.XtraEditors.MemoEdit();
            this.LblTitleJSON = new DevExpress.XtraEditors.LabelControl();
            this.LookFeel = new DevExpress.LookAndFeel.DefaultLookAndFeel(this.components);
            ((System.ComponentModel.ISupportInitialize)(this.TxtJSON.Properties)).BeginInit();
            this.SuspendLayout();
            // 
            // BtnSave
            // 
            this.BtnSave.Location = new System.Drawing.Point(311, 394);
            this.BtnSave.Name = "BtnSave";
            this.BtnSave.Size = new System.Drawing.Size(84, 23);
            this.BtnSave.TabIndex = 16;
            this.BtnSave.Text = "Save";
            this.BtnSave.Click += new System.EventHandler(this.BtnSave_Click);
            // 
            // BtnExit
            // 
            this.BtnExit.Location = new System.Drawing.Point(401, 394);
            this.BtnExit.Name = "BtnExit";
            this.BtnExit.Size = new System.Drawing.Size(84, 23);
            this.BtnExit.TabIndex = 15;
            this.BtnExit.Text = "Exit";
            this.BtnExit.Click += new System.EventHandler(this.BtnExit_Click);
            // 
            // TxtJSON
            // 
            this.TxtJSON.Location = new System.Drawing.Point(82, 12);
            this.TxtJSON.Name = "TxtJSON";
            this.TxtJSON.Size = new System.Drawing.Size(403, 376);
            this.TxtJSON.TabIndex = 14;
            // 
            // LblTitleJSON
            // 
            this.LblTitleJSON.Appearance.Options.UseTextOptions = true;
            this.LblTitleJSON.Appearance.TextOptions.HAlignment = DevExpress.Utils.HorzAlignment.Far;
            this.LblTitleJSON.AutoSizeMode = DevExpress.XtraEditors.LabelAutoSizeMode.None;
            this.LblTitleJSON.Location = new System.Drawing.Point(14, 16);
            this.LblTitleJSON.Name = "LblTitleJSON";
            this.LblTitleJSON.Size = new System.Drawing.Size(62, 13);
            this.LblTitleJSON.TabIndex = 13;
            this.LblTitleJSON.Text = "JSON :";
            // 
            // LookFeel
            // 
            this.LookFeel.LookAndFeel.Style = DevExpress.LookAndFeel.LookAndFeelStyle.Flat;
            // 
            // FrmAddData
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(495, 429);
            this.Controls.Add(this.BtnSave);
            this.Controls.Add(this.BtnExit);
            this.Controls.Add(this.TxtJSON);
            this.Controls.Add(this.LblTitleJSON);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "FrmAddData";
            this.Text = "Add Data";
            ((System.ComponentModel.ISupportInitialize)(this.TxtJSON.Properties)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        internal DevExpress.XtraEditors.SimpleButton BtnSave;
        internal DevExpress.XtraEditors.SimpleButton BtnExit;
        internal DevExpress.XtraEditors.MemoEdit TxtJSON;
        internal DevExpress.XtraEditors.LabelControl LblTitleJSON;
        private DevExpress.LookAndFeel.DefaultLookAndFeel LookFeel;
    }
}