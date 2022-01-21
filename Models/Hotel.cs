using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Hotel")]
    public class Hotel
    {
        [Key]
        public int ID { get; set; }
        [Required]
        [Range(0,1000)]
        public int x { get; set; }
        [Required]
        [Range(0,1000)]
        public int y { get; set; }
        [Required]
        [MaxLength(50)]
        public string Naziv { get; set; } 

        [JsonIgnore]
        public virtual Grad Grad { get; set; }
        
        public virtual List<Soba> Sobe { get; set; }

        [Range(0,10)]
        public double ocena { get; set; }
    }
}