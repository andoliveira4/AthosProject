namespace AthosAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changes1 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Usuarios", "Nome", c => c.String(nullable: false, maxLength: 20));
            AlterColumn("dbo.Usuarios", "SobreNome", c => c.String(nullable: false, maxLength: 150));
            AlterColumn("dbo.Usuarios", "CPF", c => c.String(nullable: false, maxLength: 11));
            AlterColumn("dbo.Usuarios", "Telefone", c => c.String(nullable: false, maxLength: 20));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Usuarios", "Telefone", c => c.String(maxLength: 20));
            AlterColumn("dbo.Usuarios", "CPF", c => c.String(maxLength: 14));
            AlterColumn("dbo.Usuarios", "SobreNome", c => c.String(maxLength: 150));
            AlterColumn("dbo.Usuarios", "Nome", c => c.String(maxLength: 20));
        }
    }
}
