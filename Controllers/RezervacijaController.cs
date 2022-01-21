using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

namespace Proba.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RezervacijaController : ControllerBase
    {
        public BookingContext Context {get; set;}
        
        public RezervacijaController(BookingContext context)
        {
            Context = context;
        }

        [Route("Preuzmi")]
        [HttpGet]
        public async Task<ActionResult> Preuzmi()
        {
            var rezervacije = await Context.Rezervacije.Select(p =>
             new
             {
                 ID = p.ID,
                 datumP = p.DatumPrijavljivanja,
                 datumO = p.DatumOdjavljivanja
             }
             ).ToListAsync();
            return Ok(rezervacije);
        }

        [Route("Upisi/{mejl}/{datP}/{datO}/{sobeStr}/{ime}/{prezime}")]
        [HttpPost]
        public async Task<ActionResult> Upisi(string mejl, string datP, string datO, string sobeStr, string ime, string prezime)
        {     
            DateTime dPrijavljivanja = DateTime.Parse(datP);
            DateTime dOdjavljivanja = DateTime.Parse(datO);

            int[] sobeIDs = sobeStr.Split('a')
            .Where(x=> int.TryParse(x, out _))
            .Select(int.Parse)
            .ToArray();

                 try
                {
                    Korisnik korisnik = await Context.Korisnici.Where(p => p.Mejl == mejl).FirstOrDefaultAsync();;
                    if(korisnik==null)
                        {
                                korisnik = new Korisnik(){
                                Ime = ime,
                                Prezime = prezime,
                                Mejl=mejl
                            };

                            Context.Korisnici.Add(korisnik);
                            await Context.SaveChangesAsync(); 
                        }
                    var sobe =  await Context.Sobe.Where(p=>sobeIDs.Contains(p.ID)).ToListAsync();

                    Rezervacija rezervacija = new Rezervacija()
                    {
                        Korisnik=korisnik,
                        DatumPrijavljivanja = dPrijavljivanja,
                        DatumOdjavljivanja = dOdjavljivanja,
                        Sobe = sobe
                    };

 

                    Context.Rezervacije.Add(rezervacija);
                    await Context.SaveChangesAsync(); 

                    var rezervacijaInfo = await Context.Rezervacije
                   .Include(p => p.Sobe)
                   .Include(p => p.Korisnik)
                   .Where(p => p.Korisnik.Mejl == mejl)
                   .Select(p=>
                   new{
                        Ime = p.Korisnik.Ime,
                        Prezime = p.Korisnik.Prezime,
                        DatumP = p.DatumPrijavljivanja,
                        DatumO = p.DatumOdjavljivanja,
                        Sobe = p.Sobe.Select(s=>new{
                        naziv = s.Naziv,
                        hotel = s.Hotel.Naziv
                       }),
                        id = p.ID,
                        korisnikId = korisnik.ID
                   }).ToListAsync();

                    return Ok(rezervacijaInfo);
                }
                catch(Exception e)
                {
                    return BadRequest(e.Message);
                }
        }

        [Route("VratiRezervacije/{mejl}")]
        [HttpGet]
        public async Task<ActionResult> VratiRezervacije(string mejl)
        {     
                 try
                {
                    Korisnik korisnik = await Context.Korisnici.Where(p => p.Mejl == mejl).FirstOrDefaultAsync();;
                    if(korisnik==null)
                        {
                                return BadRequest("ovaj korisnik nije nikad nista rezervisao");
                        }

                    var rezervacijaInfo = await Context.Rezervacije
                   .Include(p => p.Sobe)
                   .Include(p => p.Korisnik)
                   .Where(p => p.Korisnik.Mejl == mejl)
                   .Select(p=>
                   new{
                        Ime = p.Korisnik.Ime,
                        Prezime = p.Korisnik.Prezime,
                        DatumP = p.DatumPrijavljivanja,
                        DatumO = p.DatumOdjavljivanja,
                        Sobe = p.Sobe.Select(s=>new{
                        naziv = s.Naziv,
                        hotel = s.Hotel.Naziv
                       }),
                        id = p.ID,
                        korisnikId = korisnik.ID
                   }).ToListAsync();

                    return Ok(rezervacijaInfo);
                }
                catch(Exception e)
                {
                    return BadRequest(e.Message);
                }
        }

        [Route("Izbrisi/{id}/{korisnikID}")]
        [HttpDelete]
        public async Task<ActionResult> Izbrisi(int id, int korisnikID)
        {
             if(id<=0)
                {
                    return BadRequest("Pogresan ID");
                }

             try
                {
                     var rezervacija = await Context.Rezervacije.FindAsync(id);
                     Context.Rezervacije.Remove(rezervacija);
                     await Context.SaveChangesAsync(); 


                     var rezervacijaInfo = await Context.Rezervacije
                   .Include(p => p.Sobe)
                   .Include(p => p.Korisnik)
                   .Where(p => p.ID != id && p.Korisnik.ID==korisnikID)
                   .Select(p=>
                   new{
                        Ime = p.Korisnik.Ime,
                        Prezime = p.Korisnik.Prezime,
                        DatumP = p.DatumPrijavljivanja,
                        DatumO = p.DatumOdjavljivanja,
                        Sobe = p.Sobe.Select(s=>new{
                        naziv = s.Naziv,
                        hotel = s.Hotel.Naziv
                       }),
                       id = p.ID,
                       korisnikId = korisnikID
                   }).ToListAsync();

                    return Ok(rezervacijaInfo);
                }
                catch(Exception e)
                {
                    return BadRequest(e.Message);
                }
        }
    }
}