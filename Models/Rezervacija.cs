using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Rezervacija")]
    public class Rezervacija
    {
        [Key]
        public int ID { get; set; }
        
        [Required]
        [JsonIgnore]
        public List<Soba> Sobe { get; set; }

        [Required]
        public DateTime DatumPrijavljivanja { get; set; }
        [Required]
        public DateTime DatumOdjavljivanja { get; set; } 
        
        public virtual Korisnik Korisnik { get; set; }
    }
}