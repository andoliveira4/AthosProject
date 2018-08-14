namespace AthosAPI.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using AthosAPI.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<AthosAPI.Models.AthosApiDB>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(AthosAPI.Models.AthosApiDB context)
        {
            Usuarios usuario = new Usuarios
            {
                Nome = "João",
                SobreNome = "da Silva",
                CPF = "48021335025",
                Telefone = "44445555"
            };
            context.Usuario.Add(usuario);
            base.Seed(context);
        }
    }
}
