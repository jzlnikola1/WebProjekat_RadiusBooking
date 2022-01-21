import { Soba } from "./Soba.js";

export class Ponuda{
    constructor(Hotel, listaSoba, cena)
    {
        this.Hotel=Hotel;
        this.listaSoba=listaSoba;
        this.cena=cena;
        this.rezervisiBtn=null;
    }
    crtajPonudu(host, randomColor)
    {
        let ponudaDiv=document.createElement("div");
        ponudaDiv.className="ponudaDiv";
        ponudaDiv.style.backgroundColor= "#" + randomColor;
        host.appendChild(ponudaDiv);

        let leviDeo = document.createElement("div");
        leviDeo.className="LeviDeo";
        ponudaDiv.appendChild(leviDeo);

        let hotelLabel = document.createElement("label");
        hotelLabel.innerHTML= this.Hotel;
        leviDeo.appendChild(hotelLabel);

        this.listaSoba.forEach(s => {
            s.crtajSobu(leviDeo);
        });

        let desniDeo = document.createElement("div");
        desniDeo.className="DesniDeo";
        ponudaDiv.appendChild(desniDeo);

        let cenaLab = document.createElement("label");
        cenaLab.innerHTML= "RSD " + this.cena;
        desniDeo.appendChild(cenaLab);

        this.rezervisiBtn = document.createElement("button");
        this.rezervisiBtn.innerHTML="Rezervisi";
        desniDeo.appendChild(this.rezervisiBtn);

        /*let locirajBtn = document.createElement("button");
        locirajBtn.innerHTML="lociraj";
        desniDeo.appendChild(locirajBtn);*/
    }
}