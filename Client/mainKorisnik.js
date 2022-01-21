import { BookingKorisnik } from "./BookingKorisnik.js";
import { Grad } from "./Grad.js";
import { Predmet } from "./predmet.js";
import { Rok } from "./Rok.js";

var listaPredmeta = [];
var listaRokova = [];
/*
fetch("https://localhost:5001/Predmet/Preuzmi")
.then(p=>
    {
        p.json().then(predmeti=>
            {
                predmeti.forEach(predmet => {
                    var p = new Predmet(predmet.id, predmet.naziv);
                    listaPredmeta.push(p);
                });
                var listaRokova = [];
                fetch("https://localhost:5001/Ispit/Preuzmi")
                .then(p=>
                    {
                        p.json().then(rokovi=>
                            {
                                rokovi.forEach(rok => {
                                    var p = new Rok(rok.id, rok.naziv);
                                    listaRokova.push(p);
                                });
                                var f=new Fakultet(listaPredmeta, listaRokova);
                                f.crtaj(document.body);
                            })
                    })
                     console.log(listaRokova);
            })
    })*/

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
                var b=new BookingKorisnik(listaPredmeta, listaRokova, listaGradova);
                b.crtaj(document.body);
             });
    });