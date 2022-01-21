import { BookingKorisnik } from "./BookingKorisnik.js";
import { Grad } from "./Grad.js";

var listaGradova = [];

fetch("https://localhost:5001/Grad/Preuzmi")
.then(p=>
    {
        p.json().then(gradovi=>
            {
                gradovi.forEach(grad => {
                    var g = new Grad(grad.id, grad.naziv);
                    listaGradova.push(g);
                });
                var b=new BookingKorisnik(listaGradova);
                b.crtaj(document.body);
             });
    });