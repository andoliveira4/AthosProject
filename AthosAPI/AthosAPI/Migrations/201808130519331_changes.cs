namespace AthosAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changes : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Usuarios", "Nome", c => c.String(maxLength: 20));
            AlterColumn("dbo.Usuarios", "SobreNome", c => c.String(maxLength: 150));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Usuarios", "SobreNome", c => c.String());
            AlterColumn("dbo.Usuarios", "Nome", c => c.String());
        }
    }
}
