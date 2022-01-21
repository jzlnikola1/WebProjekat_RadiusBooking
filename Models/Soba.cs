using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Soba")]
    public class Soba
    {
        [Key]
        public int ID { get; set; }
        [Required]
        [MaxLength(50)]
        public string Naziv { get; set; } 
        [Required]
        public int brKreveta { get; set; }
        [Required]
        public int velicina { get; set; }
        [Required]
        public int cenaNocenja { get; set; }

        [JsonIgnore]
        public virtual Hotel Hotel { get; set; }
        
        public virtual List<Rezervacija> Rezervacije { get; set; }
    }
}