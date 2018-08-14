namespace AthosAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changesnew : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Usuarios", "CPF", c => c.String(maxLength: 14));
            AlterColumn("dbo.Usuarios", "Telefone", c => c.String(maxLength: 20));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Usuarios", "Telefone", c => c.String());
            AlterColumn("dbo.Usuarios", "CPF", c => c.String());
        }
    }
}
