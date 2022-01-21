import { Ponuda } from "./Ponuda.js";
import { Soba } from "./Soba.js";

export class BookingRadnik{

    constructor(listaHotela, listaGradova)
    {
        this.listaHotela=listaHotela;
        this.listaGradova=listaGradova;
        this.mapImg=null;
        this.pointImg=null;
        this.pointerX=0;
        this.pointerY=0;

        this.selectedX=0;
        this.selectedY=0;
    }

    slikaKlik(xPos, yPos, slikeDiv)
    {
        this.pointerX=xPos/this.mapImg.offsetWidth;
        this.pointerY=yPos/this.mapImg.offsetWidth;

        var postavljanje=0;
        if(this.pointImg==null)
        {
        this.pointImg = document.createElement("img");
        this.pointImg.src = "point.png";
        this.pointImg.className="radius";
        postavljanje=1;
        }
        var pointSize = 25 * this.mapImg.offsetWidth/1600;
        this.pointImg.style.height = pointSize +"px";
        this.pointImg.style.width = pointSize +"px";
        this.pointImg.style.top=this.pointerY*this.mapImg.offsetWidth - pointSize/2 +"px";
        this.pointImg.style.left=this.pointerX*this.mapImg.offsetWidth - pointSize/2 +"px";
        if(postavljanje==1)
            slikeDiv.appendChild(this.pointImg);
        var clickPosX = (xPos-(document.body.offsetWidth*0.1))/this.mapImg.offsetWidth;
        var clickPosY = yPos/this.mapImg.offsetWidth;
        this.selectedX=Math.round(clickPosX*1000);
        this.selectedY=Math.round(clickPosY*1000);
        
        console.log(this.selectedX);
        console.log(this.selectedY);
    }

    slikaResize()
    {        
        if(this.radiusImg==null)
        return;  
        var pointSize = 25 * this.mapImg.offsetWidth/1600;
        this.pointImg.style.height = pointSize +"px";
        this.pointImg.style.width = pointSize +"px";
        this.pointImg.style.top=this.pointerY*this.mapImg.offsetWidth - pointSize/2 +"px";
        this.pointImg.style.left=this.pointerX*this.mapImg.offsetWidth - pointSize/2 +"px";
    }

    crtaj(host)
    {
        var x;
        var y;
        window.addEventListener('mousemove', function(e){
            x=e.x;
            y=e.y;
        });

        this.kontejner = document.createElement("div");
        this.kontejner.className="GlavniDiv";
        host.appendChild(this.kontejner);

        let slikeDiv =  document.createElement("div");
        slikeDiv.className="parentSlike";
        this.kontejner.appendChild(slikeDiv);

        this.mapImg = document.createElement("img");
        this.mapImg.src = "mapaNisa.jpg";
        this.mapImg.className = "mapa";
        slikeDiv.appendChild(this.mapImg);

        this.mapImg.onclick=(ev)=>this.slikaKlik(x-8 + window.scrollX, y-8 + window.scrollY, slikeDiv);
        document.body.onresize=(ev)=>this.slikaResize()

        let Displej=document.createElement("div");
        Displej.className="DisplejKontejner";
        this.kontejner.appendChild(Displej);
        this.crtajFormu(Displej);
    }
    crtajFormu(host)
    {
        let gradDiv = document.createElement("div");
        host.appendChild(gradDiv);

        let gradLab = document.createElement("label");
        gradLab.innerHTML="Odaberite grad: "
        gradDiv.appendChild(gradLab);

        let gradSe = document.createElement("select");
        gradDiv.appendChild(gradSe);
        gradSe.onchange=(ev)=>this.SelektujGrad(hotelSe);

        let opt;
        this.listaGradova.forEach(p=>{
            opt = document.createElement("option");
            opt.innerHTML = p.Naziv;
            opt.value = p.ID;
            gradSe.appendChild(opt);
        });

        let IzmeniBtn = document.createElement("button");
        IzmeniBtn.innerHTML="Postavi lokaciju";
        IzmeniBtn.className="izmeniBtn";
        host.appendChild(IzmeniBtn);
        
        let hotelDiv = document.createElement("div");
        host.appendChild(hotelDiv);

        let hotelLab = document.createElement("label");
        hotelLab.innerHTML="Odaberite hotel: "
        hotelDiv.appendChild(hotelLab);

        let hotelSe = document.createElement("select");
        hotelDiv.appendChild(hotelSe);

        let opt2;
        this.listaHotela.forEach(p=>{
            opt2 = document.createElement("option");
            opt2.innerHTML = p.Naziv;
            opt2.value = p.ID;
            hotelSe.appendChild(opt2);
        });

        IzmeniBtn.onclick=(ev)=>this.upisi();
    }

    SelektujGrad()
    {
        let gradSel = this.kontejner.querySelector("select");
        let hotelSel = this.kontejner.querySelectorAll("select")[1];
        if(gradSel.options.length==0)
        return;
        var gradId = gradSel.options[gradSel.selectedIndex].value;
        if(gradId==1)
        {
            this.mapImg.src="mapaNisa.jpg"
        }
        else
        {
            this.mapImg.src="bgmapa.jpg"
        }
        var listaHotela = [];
        let roditelj = hotelSel.parentNode;
        roditelj.removeChild(hotelSel);

        hotelSel = document.createElement("select");
        roditelj.appendChild(hotelSel);

        let opt;
        fetch("https://localhost:5001/Hotel/Preuzmi/"+ gradId)
                    .then(p=>
                    {
                        p.json().then(hoteli=>
                            {
                                hoteli.forEach(hotel => {
                                    opt = document.createElement("option");
                                    opt.innerHTML = hotel.naziv;
                                    opt.value = hotel.id;
                                    hotelSel.appendChild(opt);
                                });
                            })
                    })
    }

    upisi()
    {
        let hotelSel = this.kontejner.querySelectorAll("select")[1];
        var hotelId = hotelSel.options[hotelSel.selectedIndex].value;

        fetch("https://localhost:5001/Hotel/PozicionirajHotel/" + hotelId + "/" + this.selectedX + "/" +this.selectedY,
        {
            method: "PUT"
        }).then(s =>{
            if(s.ok)
            {
               alert("lokacija je uspesno postavljena");
            }
        });
    }
}