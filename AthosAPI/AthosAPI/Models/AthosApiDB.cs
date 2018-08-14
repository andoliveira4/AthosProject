using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace AthosAPI.Models
{
    public class AthosApiDB : DbContext
    {
        public AthosApiDB() : base("name=DefaultConnection")
        {
            
        }
        public DbSet<Usuarios> Usuario { get; set; }
    }
}