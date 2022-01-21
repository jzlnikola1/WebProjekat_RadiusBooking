using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class BookingContext : DbContext
    {
        public DbSet<Grad> Gradovi {get; set;}
        public DbSet<Hotel> Hoteli { get; set; }
        public DbSet<Soba> Sobe { get; set; }
        public DbSet<Rezervacija> Rezervacije { get; set; }
         public DbSet<Korisnik> Korisnici { get; set; }

        public BookingContext(DbContextOptions options) : base(options)
        {

        }
    }
}