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
    public class HotelController : ControllerBase
    {
        public BookingContext Context {get; set;}
        
        public HotelController(BookingContext context)
        {
            Context = context;
        }

        [Route("Preuzmi/{gradID}")]
        [HttpGet]
        public async Task<ActionResult> Preuzmi(int gradID)
        {
            var hoteli = await Context.Hoteli.Where(h=>h.Grad.ID==gradID).Select(p =>
             new
             {
                 ID = p.ID,
                 Naziv = p.Naziv,
             }
             ).ToListAsync();
            return Ok(hoteli);
        }

        [Route("NadjiPonude/{gradID}/{datP}/{datO}/{x}/{y}/{radius}/{brojKreveta}")]
        [HttpGet]
        public async Task<ActionResult> NadjiPonude(int gradID,string datP, string datO, int x, int y, int radius, string brojKreveta)
        {
           DateTime dPrijavljivanja = DateTime.Parse(datP);
            DateTime dOdjavljivanja = DateTime.Parse(datO);
            if(dPrijavljivanja<DateTime.Today)
            {
                return BadRequest("Datumi su lose izabrani");
            }

            if(dOdjavljivanja<=dPrijavljivanja)
            {
                return BadRequest("Datumi su lose izabrani");
            }

            int[] kreveti = brojKreveta.Split('a')
            .Where(x=> int.TryParse(x, out _))
            .Select(int.Parse)
            .ToArray();

            var hoteli = await Context.Hoteli
            .Where(h=>h.Grad.ID==gradID && Math.Sqrt((Math.Pow(x - h.x, 2) + Math.Pow(y - h.y, 2)))<=radius)
            .Include(h=>h.Sobe.Where(q=>kreveti.Contains(q.brKreveta) && !q.Rezervacije.Where(r=>(r.DatumPrijavljivanja < dOdjavljivanja && r.DatumOdjavljivanja > dPrijavljivanja)||
            (r.DatumPrijavljivanja >= dOdjavljivanja && r.DatumOdjavljivanja <= dPrijavljivanja)).Any())).ToListAsync();
            
            List<Hotel> hoteliFinal = new List<Hotel>();
            int numberOfDays=(int)(dOdjavljivanja - dPrijavljivanja).TotalDays;
            List<int> prices = new List<int>();
            foreach(var hotel in hoteli)
            {
                int[] kreveti_=brojKreveta.Split('a')
            .Where(x=> int.TryParse(x, out _))
            .Select(int.Parse)
            .ToArray();;

                for(int i=0; i< kreveti.Length; i++)
                    kreveti_[i]=kreveti[i];
                int counter=0;
                int hotelPrice=0;
                List<Soba> sobeFinal = new List<Soba>();
                foreach(var soba in hotel.Sobe)
                {
                    
                    if(kreveti_.Contains(soba.brKreveta))
                    {
                        counter++;
                        sobeFinal.Add(soba);
                        hotelPrice+=soba.cenaNocenja;
                         for(int i=0; i<kreveti_.Length;i++)
                        {
                            if(kreveti_[i]==soba.brKreveta)
                            {
                                kreveti_[i]=0;
                                break;
                            }
                        }
                    }
                }
                if(counter==kreveti.Length)
                {
                        hotel.Sobe=sobeFinal;
                        hoteliFinal.Add(hotel);
                        hotelPrice*=numberOfDays;
                        prices.Add(hotelPrice);
                }
            }

                return Ok
                (
                    new{
                        Prices=prices,
                        hoteliFinal
                    }
                );    
        }

        [Route("PozicionirajHotel/{hotelID}/{x}/{y}")]
        [HttpPut]
        public async Task<ActionResult> PozicionirajHotel(int hotelID, int x, int y)
        {
                if(x <0 || x >1000)
                {
                    return BadRequest("Pogresan unos x kordinate");
                }
                 if(y <0 || y >392)
                {
                    return BadRequest("Pogresan unos y kordinate");
                }
                
                try
                {
                    var hotel = Context.Hoteli.Where(p=>p.ID==hotelID).FirstOrDefault();   
                    if(hotel!=null)
                    {
                        hotel.x=x;
                        hotel.y=y; 
                        await Context.SaveChangesAsync(); 
                    }
                    return Ok();
                }
                catch(Exception e)
                {
                    return BadRequest(e.Message);
                }
        }
    }
}
