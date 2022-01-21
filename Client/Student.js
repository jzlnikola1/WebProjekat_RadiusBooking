export class Student{
    constructor(indeks, ime, prezime, predmet, ispitniRok, ocena)
    {
        this.Indeks = indeks;
        this.Ime = ime;
        this.Prezime = prezime;
        this.Predmet = predmet;
        this.IspitniRok = ispitniRok;
        this.Ocena = ocena;
    }

    nacrtajStudenta(roditelj)
    {
        let row = document.createElement("tr");
        roditelj.appendChild(row);
        
        let indeks = document.createElement("td");
        indeks.innerHTML = this.Indeks
        row.appendChild(indeks);

        let ime = document.createElement("td");
        ime.innerHTML = this.Ime
        row.appendChild(ime);

        let prezime = document.createElement("td");
        prezime.innerHTML = this.Prezime
        row.appendChild(prezime);

        let predmet = document.createElement("td");
        predmet.innerHTML = this.Predmet
        row.appendChild(predmet);

        let ispitniRok = document.createElement("td");
        ispitniRok.innerHTML = this.IspitniRok
        row.appendChild(ispitniRok);

        let ocena = document.createElement("td");
        ocena.innerHTML = this.Ocena
        row.appendChild(ocena);
    }
}