using System.Linq;
using System.Web.Http;
using AthosAPI.Models;
using Newtonsoft.Json;
using System.Data.Entity;
using System.Collections.Generic;
using System.Web.Http.Cors;
using System;

namespace AthosAPI.Controllers
{
    [RoutePrefix("api/Usuarios")]
    public class UsuariosController : ApiController
    {
        [HttpPost]
        [Route("ConsultarUsuario")]
        public object ConsultarUsuario([FromBody]object value)
        {
            var Json = JsonConvert.DeserializeObject<Usuarios>(value.ToString());

            using (var _db = new AthosApiDB())
            {
                if(!string.IsNullOrEmpty(Json.Nome) || !string.IsNullOrEmpty(Json.CPF))
                {
                    //var usuarios = _db.Usuario.Where(n => n.Nome.Contains(Json.Nome) || n.CPF == Json.CPF)
                    //var usuarios = _db.Usuario.Where(n => n.CPF == Json.CPF)    
                    var usuarios = _db.Usuario.Where(n => n.Nome.ToUpper().Contains(Json.Nome.ToUpper()) || n.CPF == Json.CPF)
                                 .ToList();
                    return usuarios;
                }
                else
                { 
                    var usuarios = _db.Usuario.ToList();
                    return usuarios;
                }                
            }
        }        

        [HttpPost]
        [Route("CadastrarUsuario")]
        public void CadastrarUsuario([FromBody]object value)
        {
            var Json = JsonConvert.DeserializeObject<Usuarios>(value.ToString());
            using (var _db = new AthosApiDB())
            {
                Usuarios usuario = new Usuarios
                {
                    Nome = Json.Nome,
                    SobreNome = Json.SobreNome,
                    CPF = Json.CPF,
                    Telefone = Json.Telefone
                };
                _db.Usuario.Attach(usuario);
                _db.Entry(usuario).State = EntityState.Added;
                _db.SaveChanges();
            }
        }

        [HttpPost]
        [Route("DeletarUsuario")]
        public void DeletarUsuario([FromBody]object value)
        {
            var Json = JsonConvert.DeserializeObject<Usuarios>(value.ToString());
            using (var _db = new AthosApiDB())
            {
                Usuarios usuario = _db.Usuario.Find(Json.Id);
                if(usuario != null)
                {
                    _db.Usuario.Attach(usuario);
                    _db.Entry(usuario).State = EntityState.Deleted;
                    _db.SaveChanges();
                }
            }
        }

        [HttpPost]
        [Route("AtualizarUsuario")]
        //[EnableCors(origins: "https://localhost:3000", headers: "*", methods: "*")]
        public void AtualizarUsuario2([FromBody]object value)
        {
            var Json = JsonConvert.DeserializeObject<Usuarios>(value.ToString());
            using (var _db = new AthosApiDB())
            {
                Usuarios usuario = _db.Usuario.Find(Json.Id);
                if (usuario != null)
                {
                    usuario.Nome = Json.Nome;
                    usuario.SobreNome = Json.SobreNome;
                    usuario.CPF = Json.CPF;
                    usuario.Telefone = Json.Telefone;

                    _db.Usuario.Attach(usuario);
                    _db.Entry(usuario).State = EntityState.Modified;
                    _db.SaveChanges();
                }
            }
        }

        [HttpPost]
        [Route("CarregaUsuario")]
        public object CarregaUsuario([FromBody]object value)
        {
            var Json = JsonConvert.DeserializeObject<Usuarios>(value.ToString());
            using (var _db = new AthosApiDB())
            {
                Usuarios usuario = _db.Usuario.Find(Json.Id);                
                return usuario;
            }            
        }

        

    }
}
