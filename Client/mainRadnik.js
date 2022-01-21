import { BookingRadnik } from "./BookingRadnik.js";
import { Grad } from "./Grad.js";
import { Hotel } from "./Hotel.js";




    var listaGradova = [];
    var listaHotela = [];

    fetch("https://localhost:5001/Grad/Preuzmi")
    .then(p=>
        {
            p.json().then(gradovi=>
                {
                    gradovi.forEach(grad => {
                        var g = new Grad(grad.id, grad.naziv);
                        listaGradova.push(g);
                    });
                    fetch("https://localhost:5001/Hotel/Preuzmi/"+ 1)
                    .then(p=>
                    {
                        p.json().then(hoteli=>
                            {
                                hoteli.forEach(hotel => {
                                var h = new Hotel(hotel.id, hotel.naziv);
                                listaHotela.push(h);
                                });
                                var b= new BookingRadnik(listaHotela, listaGradova);
                                b.crtaj(document.body);
                            })
                    })
                 })
        })
