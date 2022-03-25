using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public string DataEvento { get; set; }
        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "O campo {0} permite intervalo de {2} a {1} caracteres!")]
        public string Tema { get; set; }
        [Range(1, 5000, ErrorMessage = "{0} tem que ser entre {1} e {2}")]
        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        [Display(Name = "Quantidade pessoas")]
        public int QtdPessoas { get; set; }
        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$",
           ErrorMessage = "Formato da imagem invalido. Utiize os formatos validos: .gif .jpg .jpeg .bmp ou .png")]
        public string ImagemURL { get; set; }
        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        [Phone(ErrorMessage = "O campo {0} está com numero inválido")]
        public string Telefone { get; set; }
        [EmailAddress(ErrorMessage = "O campo {0} precisa ser um endereço valido")]
        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        [Display(Name = "e-mail")]
        public string Email { get; set; }
        public IEnumerable<LoteDto> Lotes { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        public IEnumerable<PalestranteDto> Palestrantes { get; set; }
    }
}