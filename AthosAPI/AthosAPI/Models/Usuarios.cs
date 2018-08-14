using System.ComponentModel.DataAnnotations;

namespace AthosAPI.Models
{
    public class Usuarios
    {
        
        public int Id { get; set; }
        [Required]
        [StringLength(20, ErrorMessage ="Nome muito Longo")]
        public string Nome { get; set; }
        [Required]
        [StringLength(150, ErrorMessage ="SobreNome muito longo")]
        public string SobreNome { get; set; }
        [Required]
        [StringLength(11,ErrorMessage="CPF Invalido")]
        public string CPF { get; set; }
        [Required]
        [StringLength(20, MinimumLength = 8, ErrorMessage ="Telefone inválido")]
        [RegularExpression(@"^[0-9]*$", ErrorMessage = "Somente números são permitidos para Telefones")]
        public string Telefone { get; set; }
    }
}