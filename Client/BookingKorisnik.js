import { Ponuda } from "./Ponuda.js";
import { Soba } from "./Soba.js";
import { Student } from "./Student.js";

export class BookingKorisnik{

    constructor(listaPredmeta, listaRokova, listaGradova)
    {
        this.listaPredmeta=listaPredmeta;
        this.listaRokova=listaRokova;
        this.kontejner=null;

        this.radiusImg=null;
        this.radius=500;
        this.listaGradova=listaGradova;
        this.selectedX=0;
        this.selectedY=0;

        this.DonjiDeo=null;
        this.gradMulitplajer=0.390;
        this.pointsPosX=[];
        this.pointsPosY=[];
        this.opsegBoja=["0392cf","7bc043","ee4035","35a79c","fe9c8f","fe8a71","7c8784","6497b1","fe4a49","2ab7ca","fed766","e2d810","b20238","c4a35a","77c593","f162ff","619c5a", "9e6d29", "549180"]
    }

    slikaKlik(xPos, yPos, slikeDiv)
    {
        let mapImg = this.kontejner.querySelector(".mapa");
        var clickPosX = (xPos-(document.body.offsetWidth*0.1))/mapImg.offsetWidth;
        var clickPosY = yPos/mapImg.offsetWidth;
        this.selectedX=Math.round(clickPosX*1000);
        this.selectedY=Math.round(clickPosY*1000);
        
        let radiusCentar = this.kontejner.querySelector(".radiusCentar");
        var centarSize = 25 * mapImg.offsetWidth/1600;
        if(this.radiusImg.style.visibility=='hidden')
            {
                this.radiusImg.style.visibility = 'visible';
                radiusCentar.style.visibility = 'visible';
            }

        var radSize = this.gradMulitplajer * mapImg.offsetWidth/1600 * this.radius;
        this.radiusImg.style.height = radSize +"px";
        this.radiusImg.style.width = radSize +"px";
        this.radiusImg.style.left=this.selectedX/1000*mapImg.offsetWidth + document.body.offsetWidth*0.1 - radSize/2 + "px";
        this.radiusImg.style.top=this.selectedY/1000*mapImg.offsetWidth - radSize/2 + "px";

        radiusCentar.style.height = centarSize +"px";
        radiusCentar.style.width = centarSize +"px";
        radiusCentar.style.left=this.selectedX/1000*mapImg.offsetWidth + document.body.offsetWidth*0.1 - centarSize/2 + "px";
        radiusCentar.style.top=this.selectedY/1000*mapImg.offsetWidth - centarSize/2 + "px";
    }

    slikaResize()
    {   
        let mapImg = this.kontejner.querySelector(".mapa");
        if(this.radiusImg!=null) 
        {    
        let radiusCentar = this.kontejner.querySelector(".radiusCentar");
        var radSize = this.gradMulitplajer * mapImg.offsetWidth/1600 * this.radius;
        var centarSize = 25 * mapImg.offsetWidth/1600;
        this.radiusImg.style.height = radSize +"px";
        this.radiusImg.style.width = radSize +"px";
        this.radiusImg.style.left=this.selectedX/1000*mapImg.offsetWidth + document.body.offsetWidth*0.1 - radSize/2 + "px";
        this.radiusImg.style.top=this.selectedY/1000*mapImg.offsetWidth - radSize/2 + "px";

        radiusCentar.style.height = centarSize +"px";
        radiusCentar.style.width = centarSize +"px";
        radiusCentar.style.left=this.selectedX/1000*mapImg.offsetWidth + document.body.offsetWidth*0.1 - centarSize/2 + "px";
        radiusCentar.style.top=this.selectedY/1000*mapImg.offsetWidth - centarSize/2 + "px";
        }

        this.DonjiDeo.style.width = (mapImg.offsetWidth/0.8 + 16) +"px";
        this.DonjiDeo.style.top=(mapImg.offsetWidth)*0.392 +16 +"px";

        let points = this.kontejner.querySelectorAll(".point")
        points.forEach((p, index)=>
            {
                this.promeniLokaciju(this.pointsPosX[index],this.pointsPosY[index], p)
            })
    }

    
    nacrtajLokaciju(x, y, randomColor)
    {
        let mapImg = this.kontejner.querySelector(".mapa");
        console.log(x);
        console.log(y);
        let slikeDiv = this.kontejner.querySelector(".parentSlike");

        let pointImg = document.createElement("div");
        pointImg.className="point";

        var pointSize = 25 * mapImg.offsetWidth/1600;
        pointImg.style.height = pointSize +"px";
        pointImg.style.width = pointSize +"px";
        if(randomColor!=null)
            pointImg.style.backgroundColor= "#" + randomColor;

        pointImg.style.left=x/1000*mapImg.offsetWidth + document.body.offsetWidth*0.1 - pointSize/2 + "px";
        pointImg.style.top=y/1000*mapImg.offsetWidth - pointSize/2 + "px";
        slikeDiv.appendChild(pointImg);
    }

    promeniLokaciju(x, y, pointImg)
    {
        let mapImg = this.kontejner.querySelector(".mapa");
        var pointSize = 25 * mapImg.offsetWidth/1600;
        pointImg.style.height = pointSize +"px";
        pointImg.style.width = pointSize +"px";

        pointImg.style.left=x/1000*mapImg.offsetWidth + document.body.offsetWidth*0.1 - pointSize/2 + "px";
        pointImg.style.top=y/1000*mapImg.offsetWidth - pointSize/2 + "px";
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

        let mapImg = document.createElement("img");
        mapImg.src = "mapaNisa.jpg";
        mapImg.className = "mapa";
        slikeDiv.appendChild(mapImg);
        mapImg.onclick=(ev)=>this.slikaKlik(x-8 + window.scrollX, y-8 + window.scrollY, slikeDiv);

        this.radiusImg = document.createElement("div");
        this.radiusImg.className="radius";
        slikeDiv.appendChild(this.radiusImg);
        this.radiusImg.onclick=(ev)=>this.slikaKlik(x-8 + window.scrollX, y-8 + window.scrollY, slikeDiv);
        this.radiusImg.style.visibility= 'hidden';

        let radiusCentar = document.createElement("div");
        radiusCentar.className="radiusCentar";
        slikeDiv.appendChild(radiusCentar);
        radiusCentar.onclick=(ev)=>this.slikaKlik(x-8 + window.scrollX, y-8 + window.scrollY, slikeDiv);
        radiusCentar.style.visibility= 'hidden';

        document.body.onresize=(ev)=>this.slikaResize();

        this.DonjiDeo=document.createElement("div");
        this.DonjiDeo.className="DonjiDeo";
        this.kontejner.appendChild(this.DonjiDeo);

        let Displej=document.createElement("div");
        Displej.className="DisplejKontejner";
        this.DonjiDeo.appendChild(Displej);
        this.crtajFormu(Displej);

        this.DonjiDeo.style.width = (mapImg.offsetWidth/0.8 + 16) +"px";
        this.DonjiDeo.style.top=(mapImg.offsetWidth)*0.392 +16 +"px";

        let ponudeDisplay=document.createElement("div");
        ponudeDisplay.className="ponudeDisplay";
        this.DonjiDeo.appendChild(ponudeDisplay);
    }

    promeniRadius(radInput)
    {
        let mapImg = this.kontejner.querySelector(".mapa");
        let gradSel = this.kontejner.querySelector("select");
        var gradId = gradSel.options[gradSel.selectedIndex].value;
        var max=2000;
        if(gradId==2)
            max=4000;
        if(radInput.value>max)
            {
                this.radius=max;
                radInput.value=max;
            }
            else
            {
                if(radInput.value<100)
                {
                    this.radius=100;
                    radInput.value=100;
                }
                else
                    this.radius= radInput.value;
            }

        if(this.radiusImg==null)
        return;
        
        var radSize = this.gradMulitplajer * mapImg.offsetWidth/1600 * this.radius;
        this.radiusImg.style.height = radSize +"px";
        this.radiusImg.style.width = radSize +"px";
        this.radiusImg.style.left=this.selectedX/1000*mapImg.offsetWidth + document.body.offsetWidth*0.1 - radSize/2 + "px";
        this.radiusImg.style.top=this.selectedY/1000*mapImg.offsetWidth - radSize/2 + "px";
    }

    promeniMapu()
    {

        let mapImg = this.kontejner.querySelector(".mapa");
        let ponudeDisplay = this.kontejner.querySelector(".ponudeDisplay")
        this.DonjiDeo.removeChild(ponudeDisplay);

        ponudeDisplay=document.createElement("div");
        ponudeDisplay.className="ponudeDisplay";
        this.DonjiDeo.appendChild(ponudeDisplay);

        let gradSel = this.kontejner.querySelector("select");
        if(gradSel.options.length==0)
        return;
        var gradId = gradSel.options[gradSel.selectedIndex].value;
        var prevId=gradId;
        if(gradId==1)
        {
            mapImg.src="mapaNisa.jpg"
            this.gradMulitplajer=0.390;
            let radInput = this.DonjiDeo.querySelector("input");
            if(radInput.value>2000)
            {
                this.radius=2000;
                radInput.value=2000;
            }
            this.slikaResize()
        }
        else
        {
            mapImg.src="bgmapa.jpg"
            this.gradMulitplajer=0.189;
            this.slikaResize()
        }
        if(prevId==gradId)
        {
            let locImgs = this.kontejner.querySelectorAll(".point");
            if(locImgs.length>0)
            {
                let imgRod = locImgs[0].parentNode;
                locImgs.forEach(i =>{
                    imgRod.removeChild(i);
                });
            }{}
            this.pointsPosX=[];
            this.pointsPosY=[];
        }
    }

    crtajFormu(host)
    {
        let gradDiv = document.createElement("div");
        host.appendChild(gradDiv);

        let gradLab = document.createElement("label");
        gradLab.innerHTML="Odaberite grad: ";
        gradDiv.appendChild(gradLab);

        let gradSe = document.createElement("select");
        gradDiv.appendChild(gradSe);
        gradSe.onchange=(ev)=>this.promeniMapu();

        let opt;
        this.listaGradova.forEach(p=>{
            opt = document.createElement("option");
            opt.innerHTML = p.Naziv;
            opt.value = p.ID;
            gradSe.appendChild(opt);
        });

        let radDiv = document.createElement("div");
        radDiv.className="radClass";
        host.appendChild(radDiv);

        let radLab = document.createElement("label");
        radLab.innerHTML="Odaberite radius u metrima: "
        radDiv.appendChild(radLab);

        let radInput = document.createElement("input");
        radInput.type="number";
        radInput.value=500;
        radInput.className="radInput";
        radInput.step=125;
        radDiv.appendChild(radInput);
        radInput.onchange=(ev)=>this.promeniRadius(radInput);

        let dataDiv = document.createElement("div");
        dataDiv.className="dataDiv";
        host.appendChild(dataDiv);

        let datPLab = document.createElement("label");
        datPLab.innerHTML="Datum prijavljivanja: "
        dataDiv.appendChild(datPLab);

        let datPInput = document.createElement("input");
        datPInput.type="date";
        dataDiv.appendChild(datPInput);

        let datOLab = document.createElement("label");
        datOLab.innerHTML="Datum odjavljivanja: "
        dataDiv.appendChild(datOLab);

        let datOInput = document.createElement("input");
        datOInput.type="date";
        dataDiv.appendChild(datOInput);

        let peopleLab = document.createElement("label");
        peopleLab.innerHTML="Broj kreveta: "
        dataDiv.appendChild(peopleLab);

        let sobeDiv = document.createElement("div");
        sobeDiv.className="sobeDiv";
        dataDiv.appendChild(sobeDiv);

        this.dodajDugme(sobeDiv);

        let dodajBtn = document.createElement("button");
        dodajBtn.innerHTML="+";
        dodajBtn.className="DodajBtn";
        sobeDiv.appendChild(dodajBtn);
        dodajBtn.onclick=(ev)=>this.dodajDugme(sobeDiv);

        let nadjiBtn = document.createElement("button");
        nadjiBtn.innerHTML="nadji"
        nadjiBtn.onclick=(ev)=>this.nadjiSobe(datPInput, datOInput);
        dataDiv.appendChild(nadjiBtn);

        let nadjiRez = document.createElement("button");
        nadjiRez.innerHTML="pretrazi svoje rezervacije";
        nadjiRez.className="nadjiRezBtn";
        nadjiRez.onclick=(ev)=>this.nacrtajdonjiDeoKF();
        host.appendChild(nadjiRez);
    }

    dodajDugme(host)
    {
        let sobaInput;

        sobaInput = document.createElement("input");
        sobaInput.type="number";
        sobaInput.value= 2;
        sobaInput.className="sobaInput";
        host.appendChild(sobaInput);
        sobaInput.onchange=(ev)=>this.PromenaKreveta(sobaInput);
    }

    PromenaKreveta(SobaInput){
        if(SobaInput.value<=0)
        {
            let rod = this.kontejner.querySelector(".sobeDiv");
            rod.removeChild(SobaInput);
        }
    }

    nacrtajdonjiDeoKF(dataDiv)
    {
        if(dataDiv==null)
            {
                let host = this.kontejner.querySelector(".DisplejKontejner");
                dataDiv = document.createElement("div");
                dataDiv.className="korisnikDiv";
                host.appendChild(dataDiv);
            }
        let emailLab = document.createElement("label");
        emailLab.innerHTML="email: "
        dataDiv.appendChild(emailLab);

        let emailInput = document.createElement("input");
        emailInput.type="email";
        dataDiv.appendChild(emailInput);

        let emailLab2 = document.createElement("label");
        emailLab2.innerHTML="Ponovite email: "
        dataDiv.appendChild(emailLab2);

        let emailInput2 = document.createElement("input");
        emailInput2.type="email";
        dataDiv.appendChild(emailInput2);

        let nadjiRezBtn = this.DonjiDeo.querySelector(".nadjiRezBtn");
        if(nadjiRezBtn!=null)
        {
            let rod = nadjiRezBtn.parentNode;
            rod.removeChild(nadjiRezBtn);
        }

        let nadjiRez = document.createElement("button");
        nadjiRez.innerHTML="pretrazi svoje rezervacije";
        nadjiRez.className="pretraziRezBtn";
        nadjiRez.onclick=(ev)=>this.vratiRezervacije();
        dataDiv.appendChild(nadjiRez);
    }

    nacrtajKorisnikFormu()
    {
        let host = this.kontejner.querySelector(".DisplejKontejner");

        let dataDiv = host.querySelector(".korisnikDiv")
        if(dataDiv!=null)
        {
            let inputPolja = dataDiv.querySelectorAll("input");
            if(inputPolja.length==2)
            {
                host.removeChild(dataDiv);
                dataDiv = document.createElement("div");
                dataDiv.className="korisnikDiv";
                host.appendChild(dataDiv);
            }
            if(inputPolja.length==4)
            {
                return;
            }
        }
        else
        {
            dataDiv = document.createElement("div");
            dataDiv.className="korisnikDiv";
            host.appendChild(dataDiv);
        }

        let imeLab = document.createElement("label");
        imeLab.innerHTML="Ime: "
        dataDiv.appendChild(imeLab);

        let imeInput = document.createElement("input");
        imeInput.type="text";
        dataDiv.appendChild(imeInput);

        let prezLab = document.createElement("label");
        prezLab.innerHTML="Prezime: "
        dataDiv.appendChild(prezLab);

        let prezInput = document.createElement("input");
        prezInput.type="text";
        dataDiv.appendChild(prezInput);    

        this.nacrtajdonjiDeoKF(dataDiv);
    }

    nadjiSobe(DatPInput, DatOInput)
    {
        if(this.selectedX==0 && this.selectedY==0)
        {
            alert("odaberite podrucje");
            return;
        }
        let locImgs = this.kontejner.querySelectorAll(".point");
        if(locImgs.length>0)
        {
            let imgRod = locImgs[0].parentNode;
            locImgs.forEach(i =>{
                imgRod.removeChild(i);
            });
        }{}
        this.pointsPosX=[];
        this.pointsPosY=[];

        let rezDisplay = this.kontejner.querySelector(".rezDisplay")
        if(rezDisplay!=null)
            this.DonjiDeo.removeChild(rezDisplay);

        if(DatPInput.value=="" || DatOInput.value=="")
        {
            alert("Unesite informacije");
            return;
        }

        let gradSelektor = this.kontejner.querySelector("select");
        var gradID = gradSelektor.options[gradSelektor.selectedIndex].value;
        console.log(gradID);

        var brojKreveta = "";
        var sobeInput = this.kontejner.querySelectorAll(".sobaInput");
        sobeInput.forEach(p =>{
            if(p.value>0)
                brojKreveta = brojKreveta.concat(p.value,"a")
        });
        console.log(brojKreveta);

        fetch("https://localhost:5001/Hotel/NadjiPonude/"+ gradID +"/"+ DatPInput.value + "/"+ DatOInput.value + "/" + this.selectedX + "/" + this.selectedY + "/" + Math.round(this.radius*0.122*this.gradMulitplajer/0.390) + "/" + brojKreveta,
        {
            method: "GET"
        }).then(s =>{
            if(s.ok)
            {
                s.json().then(data=>
                    {
                        let ponudaDiv = this.kontejner.querySelector(".ponudeDisplay");
                        //if(ponudaDiv!=null)

                        let rod = ponudaDiv.parentNode;
                        rod.removeChild(ponudaDiv);
                        ponudaDiv=document.createElement("div");
                        ponudaDiv.className="ponudeDisplay";
                        rod.appendChild(ponudaDiv);

                        console.log(data);
                        data.hoteliFinal.forEach((hotel, index) =>{

                            var sobaStr = "";
                            let sobe = [];
                            hotel.sobe.forEach(s =>{
                                let soba = new Soba(1, s.naziv, s.brKreveta, s.velicina);
                                sobe.push(soba);
                                sobaStr = sobaStr.concat(s.id,"a")
                            })
                            let ponuda = new Ponuda(hotel.naziv, sobe, data.prices[index]);
                            var randomColor = this.opsegBoja[Math.floor(Math.random() * this.opsegBoja.length)];
                            console.log(randomColor);
                            ponuda.crtajPonudu(ponudaDiv, randomColor);
                            ponuda.rezervisiBtn.onclick=(ev)=>this.rezervisi(DatPInput.value, DatOInput.value, sobaStr);
                            this.nacrtajLokaciju(hotel.x, hotel.y, randomColor);
                            this.pointsPosX[index]=hotel.x;
                            this.pointsPosY[index]=hotel.y;
                        })

                        if(data.prices.length!=0)
                            this.nacrtajKorisnikFormu()
                    });
            }
        });
        console.log("sirina: " + document.body.offsetWidth);
    }
    rezervisi(DatP, DatO, sobaStr){
        let korisnikInput = this.kontejner.querySelector(".korisnikDiv")
        let inputPolja = korisnikInput.querySelectorAll("input");
        console.log(inputPolja[0].value);
        console.log(inputPolja[1].value);
        console.log(inputPolja[2].value);
        console.log(inputPolja[3].value);
        if(inputPolja[0].value === "" || inputPolja[1].value === "" || inputPolja[2].value === "" || inputPolja[3].value === "")
        {
            alert("niste uneli licne podatke")
            return
        }

        if(inputPolja[2].value!=inputPolja[3].value)
        {
            alert("mejlovi u poljima se ne poklapaju");
            return;
        }
        console.log(sobaStr);
        fetch("https://localhost:5001/Rezervacija/Upisi/"+ inputPolja[3].value +"/"+ DatP + "/"+ DatO + "/" + sobaStr + "/"+ inputPolja[0].value + "/" + inputPolja[1].value,
        {
            method: "POST"
        }).then(s =>{
            if(s.ok)
            {
                s.json().then(data=>
                    {
                        let ponudeDisplay = this.kontejner.querySelector(".ponudeDisplay")
                        this.DonjiDeo.removeChild(ponudeDisplay);

                        ponudeDisplay=document.createElement("div");
                        ponudeDisplay.className="ponudeDisplay";
                        this.DonjiDeo.appendChild(ponudeDisplay);

                        let rezDisplay=document.createElement("div");
                        rezDisplay.className="rezDisplay";
                        this.DonjiDeo.appendChild(rezDisplay);

                        let tabela=document.createElement("table");
                        rezDisplay.appendChild(tabela);

                        let th=document.createElement("thead");
                        tabela.appendChild(th);

                        let tb=document.createElement("tbody");
                        tabela.appendChild(tb);

                        let tr;
                        let td;

                        tr=document.createElement("tr");
                        th.appendChild(tr);

                        let hederi = ["Ime","Prezime","Datum prijavljivanja","Datum odjavljivanja","Smestaj"]
                        hederi.forEach(h=>
                        {
                            td=document.createElement("th");
                            td.innerHTML=h;
                            tr.appendChild(td);
                        })

                        data.forEach(r=>{
                            tr=document.createElement("tr");
                            tb.appendChild(tr);
                            
                            td=document.createElement("td");
                            td.innerHTML= r.ime;
                            tr.appendChild(td);

                            td=document.createElement("td");
                            td.innerHTML= r.prezime;
                            tr.appendChild(td);

                            td=document.createElement("td");
                            td.innerHTML= r.datumP;
                            tr.appendChild(td);

                            td=document.createElement("td");
                            td.innerHTML= r.datumO;
                            tr.appendChild(td);

                            var sobeStr = "";
                            r.sobe.forEach((s, index)=>{
                                if(index==0)
                                sobeStr = sobeStr.concat(s.hotel, "- ");

                                sobeStr = sobeStr.concat(s.naziv, "  ");
                            });

                            td=document.createElement("td");
                            td.innerHTML= sobeStr;
                            tr.appendChild(td);

                            td=document.createElement("button");
                            td.innerHTML= "otkazi";
                            td.className="otkaziBtn";
                            tr.appendChild(td);
                            td.onclick=(ev)=>this.otkazi(r.id, r.korisnikId);
                        });
                    });
            }
            else
            {
                
            }
        });
    }

    otkazi(rezID, korisnikID)
    {
        console.log(rezID);
        console.log(korisnikID);
        fetch("https://localhost:5001/Rezervacija/Izbrisi/"+ rezID + "/" + korisnikID,
        {
            method: "DELETE"
        }).then(s =>{
            if(s.ok)
            {
                s.json().then(data=>
                    {
                        let rezDisplay = this.kontejner.querySelector(".rezDisplay")
                        this.DonjiDeo.removeChild(rezDisplay);

                        rezDisplay=document.createElement("div");
                        rezDisplay.className="rezDisplay";
                        this.DonjiDeo.appendChild(rezDisplay);

                        let tabela=document.createElement("table");
                        rezDisplay.appendChild(tabela);

                        let th=document.createElement("thead");
                        tabela.appendChild(th);

                        let tb=document.createElement("tbody");
                        tabela.appendChild(tb);

                        let tr;
                        let td;

                        tr=document.createElement("tr");
                        th.appendChild(tr);

                        let hederi = ["Ime","Prezime","Datum prijavljivanja","Datum odjavljivanja","Smestaj"]
                        hederi.forEach(h=>
                        {
                            td=document.createElement("th");
                            td.innerHTML=h;
                            tr.appendChild(td);
                        })

                        data.forEach(r=>{
                            tr=document.createElement("tr");
                            tb.appendChild(tr);
                            
                            td=document.createElement("td");
                            td.innerHTML= r.ime;
                            tr.appendChild(td);

                            td=document.createElement("td");
                            td.innerHTML= r.prezime;
                            tr.appendChild(td);

                            td=document.createElement("td");
                            td.innerHTML= r.datumP;
                            tr.appendChild(td);

                            td=document.createElement("td");
                            td.innerHTML= r.datumO;
                            tr.appendChild(td);

                            var sobeStr = "";
                            r.sobe.forEach((s, index)=>{
                                if(index==0)
                                sobeStr = sobeStr.concat(s.hotel, "- ");
                                
                                sobeStr = sobeStr.concat(s.naziv, "  ");
                            });

                            td=document.createElement("td");
                            td.innerHTML= sobeStr;
                            tr.appendChild(td);

                            td=document.createElement("button");
                            td.innerHTML= "otkazi";
                            td.className="otkaziBtn";
                            tr.appendChild(td);
                            td.onclick=(ev)=>this.otkazi(r.id, r.korisnikId);
                        });
                    });
            }
            else
            {
                
            }
        });
    }

    vratiRezervacije()
        {
            let imeInput = this.kontejner.querySelector(".korisnikDiv")
            let inputPolja = imeInput.querySelectorAll("input");
            var i=0;
            if(inputPolja.length==2)
                i=2;
            if(inputPolja[2-i].value === "" || inputPolja[3-i].value === "")
            {
                alert("niste uneli mejl")
                return
            }
    
            if(inputPolja[2-i].value!=inputPolja[3-i].value)
            {
                alert("mejlovi u poljima se ne poklapaju");
                return;
            }
            fetch("https://localhost:5001/Rezervacija/VratiRezervacije/"+ inputPolja[3-i].value,
            {
                method: "GET"
            }).then(s =>{
                if(s.ok)
                {
                    s.json().then(data=>
                        {
                            let ponudeDisplay = this.kontejner.querySelector(".ponudeDisplay")
                            this.DonjiDeo.removeChild(ponudeDisplay);
    
                            ponudeDisplay=document.createElement("div");
                            ponudeDisplay.className="ponudeDisplay";
                            this.DonjiDeo.appendChild(ponudeDisplay);

                            let rezDisplay = this.kontejner.querySelector(".rezDisplay")
                            if(rezDisplay!=null)
                                this.DonjiDeo.removeChild(rezDisplay);
    
                            rezDisplay=document.createElement("div");
                            rezDisplay.className="rezDisplay";
                            this.DonjiDeo.appendChild(rezDisplay);
    
                            let tabela=document.createElement("table");
                            rezDisplay.appendChild(tabela);
    
                            let th=document.createElement("thead");
                            tabela.appendChild(th);
    
                            let tb=document.createElement("tbody");
                            tabela.appendChild(tb);
    
                            let tr;
                            let td;
    
                            tr=document.createElement("tr");
                            th.appendChild(tr);
    
                            let hederi = ["Ime","Prezime","Datum prijavljivanja","Datum odjavljivanja","Smestaj"]
                            hederi.forEach(h=>
                            {
                                td=document.createElement("th");
                                td.innerHTML=h;
                                tr.appendChild(td);
                            })
    
                            data.forEach(r=>{
                                tr=document.createElement("tr");
                                tb.appendChild(tr);
                                
                                td=document.createElement("td");
                                td.innerHTML= r.ime;
                                tr.appendChild(td);
    
                                td=document.createElement("td");
                                td.innerHTML= r.prezime;
                                tr.appendChild(td);
    
                                td=document.createElement("td");
                                td.innerHTML= r.datumP;
                                tr.appendChild(td);
    
                                td=document.createElement("td");
                                td.innerHTML= r.datumO;
                                tr.appendChild(td);
    
                                var sobeStr = "";
                                r.sobe.forEach((s, index)=>{
                                    if(index==0)
                                    sobeStr = sobeStr.concat(s.hotel, "- ");
    
                                    sobeStr = sobeStr.concat(s.naziv, "  ");
                                });
    
                                td=document.createElement("td");
                                td.innerHTML= sobeStr;
                                tr.appendChild(td);
    
                                td=document.createElement("button");
                                td.innerHTML= "otkazi";
                                td.className="otkaziBtn";
                                tr.appendChild(td);
                                td.onclick=(ev)=>this.otkazi(r.id, r.korisnikId);
                            });
                        });
                }
                else
                {
                    
                }
            });
        }

        
        
 }
