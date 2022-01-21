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
    public class GradController : ControllerBase
    {
        public BookingContext Context {get; set;}
        
        public GradController(BookingContext context)
        {
            Context = context;
        }

        [Route("Preuzmi")]
        [HttpGet]
        public async Task<ActionResult> Preuzmi()
        {
            var gradovi = await Context.Gradovi.Select(p =>
             new
             {
                 ID = p.ID,
                 Naziv = p.Ime
             }
             ).ToListAsync();
            return Ok(gradovi);
        }
    }
}
