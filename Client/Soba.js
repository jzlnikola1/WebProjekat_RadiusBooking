export class Soba{
    constructor(Kolicina, Naziv, brKreveta, Povrsina)
    {
        this.Kolicina=Kolicina;
        this.Naziv=Naziv;
        this.brKreveta=brKreveta;
        this.Povrsina=Povrsina;
    }

    crtajSobu(host){
        let sobaDiv = document.createElement("div");
        sobaDiv.className="sobaDiv";
        host.appendChild(sobaDiv);

        let N = document.createElement("label");
        N.innerHTML= this.Kolicina +"X ";
        sobaDiv.appendChild(N);

        let soba = document.createElement("label");
        soba.innerHTML= this.Naziv +" | ";
        sobaDiv.appendChild(soba);

        let brK = document.createElement("label");
        brK.innerHTML= this.brKreveta + "kreveta | ";
        sobaDiv.appendChild(brK);

        let velicina = document.createElement("label");
        velicina.innerHTML= this.Povrsina + "m² ";
        sobaDiv.appendChild(velicina);
    }
}