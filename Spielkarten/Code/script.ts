// Browser: Firefox
// Bildschirmauflösung: 1920 x 1080

namespace Endaufgabe {
        window.addEventListener("load", function (): void {

                // Array mit allen Farbwerten
                let alleFarbwerte: string[] = ["rot", "grun", "gelb", "blau"];
                // Array mit allen Zahlenwerten
                let alleZahlenwerte: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
                // leerer Array in den später alle Karten kommen
                let allcards: string[] = [];

                // Farbarray mit Zahlenarray verknüpfen sodass alle Karten entstehen und in das Kartenarray pushen
                for (let i: number = 0; i < alleFarbwerte.length; i++) {
                        for (let j: number = 0; j < alleZahlenwerte.length; j++) {
                                allcards.push(alleFarbwerte[i] + "-" + alleZahlenwerte[j]);
                        }
                }

                // Kartenmischfunktion ausführen für den Kartenarray
                allcards = shuffle(allcards);

                // Funktion, die die Karten mischt
                function shuffle(a: any): any {
                        var j: number, x: number, i: number;
                        for (i = a.length - 1; i > 0; i--) {
                                j = Math.floor(Math.random() * (i + 1));
                                x = a[i];
                                a[i] = a[j];
                                a[j] = x;
                        }
                        return a;
                }

                // Array für die Spielerhandkarten         
                let playercards: string[] = [];
                // Array für die Computerhandkarten
                let pccards: string[] = [];

                // Die letzten 5 Karten aus dem Kartenarray werden in den Spielerkartenarray verschoben
                for (let i: number = 0; i < 5; i++) {
                        let lastcard: string = allcards.pop();
                        playercards.push(lastcard);
                }

                // Die danach letzten 5 Karten aus dem Kartenarray werden in den Computerkartenarray verschoben
                for (let i: number = 0; i < 5; i++) {
                        let lastcard: string = allcards.pop();
                        pccards.push(lastcard);
                }

                // Die danach letzte Karte aus dem Kartenarray wird in die Spielkarte verschoben        
                let opencard: string = allcards.pop();

                // Überprüfen, ob alle Karten in der Konsole richtig verteilt werden
                console.log("alleKarten", allcards);
                console.log("spielerKarten", playercards);
                console.log("computerKarten", pccards);
                console.log("offeneKarten", opencard);
                console.log("alleKartendanach", allcards);

                // Zugriff auf die HTML Div Elemente um Sachen einzufügen        
                let computerspaceDIV: HTMLDivElement = document.querySelector("#computerspace");
                let playspaceDIV: HTMLDivElement = document.querySelector("#playspace");
                let cardspaceDIV: HTMLDivElement = document.querySelector("#cardspace");
                let playerspaceDIV: HTMLDivElement = document.querySelector("#playerspace");
                let newgamebutton: HTMLElement = document.getElementById("newgame");

                // boolean für wer an der Reihe ist
                let spielerZug: boolean = true;

                function spielerReihenfolge (): void {
                        if (spielerZug == true) {
                                console.log("Spieler ist an der Reihe");
                        } else if (spielerZug == false) {
                                console.log("PC ist an der Reihe");
                        }
                }
                
                spielerReihenfolge();

                // Funktion, die die verteilten Karten in HTML anzeigt/die Struktur dafür baut -> Divs erstellen
                function divKartenGenerieren(kartenName: string): HTMLDivElement {
                        // karte + Farbname = z.B. karterot -> die css Eigenschaften für die roten Karten wird für die Karte verwendet
                        let kartenNameTeile: string[] = kartenName.split("-");
                        let karte: HTMLDivElement = document.createElement("div"); // Variable/div "Karte" schließt alle unteren divs ein
                        karte.className = "karte" + kartenNameTeile[0];
                        // cardbox: äußeres Element der Karte
                        let cardbox: HTMLDivElement = document.createElement("div");
                        cardbox.className = "cardbox";
                        karte.appendChild(cardbox);
                        // carddesign: in den Div kommt die Grafik
                        let carddesign: HTMLDivElement = document.createElement("div");
                        carddesign.className = "carddesign";
                        cardbox.appendChild(carddesign);
                        // Kartengrafik: ../Design/karte + Farbname = z.B. karterot -> die Grafik für die rote Karte wird eingefügt
                        let cardimg: HTMLImageElement = new Image();
                        cardimg.src = "../Design/karte" + kartenNameTeile[0] + ".png";
                        carddesign.appendChild(cardimg);
                        // cardnumber zeigt in HTML die Nummer der Karte an
                        let cardnumber: HTMLDivElement = document.createElement("div");
                        cardnumber.className = "cardnumber";
                        cardnumber.innerHTML = kartenNameTeile[1];
                        carddesign.appendChild(cardnumber);
                        // Karte generieren
                        return karte;
                }

                alleKartenAnzeigen();

                // Die generierten Divs auf die Bereiche, in denen Karten sein sollen einfügen 
                function alleKartenAnzeigen(): void {
                        // die offene Spielkarte
                        playspaceDIV.innerHTML = "";
                        let playspaceKarte: HTMLDivElement = divKartenGenerieren(opencard);
                        playspaceDIV.appendChild(playspaceKarte);

                        // der umgedrehte Ziehstapel
                        cardspaceDIV.innerHTML = "";
                        let cardspaceKarte: HTMLDivElement = divKartenGenerieren("grau-");
                        cardspaceDIV.appendChild(cardspaceKarte);

                        // Wenn man auf den Ziehstapel klickt, bekommt man die oberste Karte in seinen Stapel
                        if (spielerZug) {
                                cardspaceKarte.addEventListener("click", function (): void {
                                        console.log(allcards[0] + " wurde gezogen");
                                        let sgplayercard: HTMLDivElement = divKartenGenerieren(allcards[0]);
                                        playerspaceDIV.appendChild(sgplayercard);
                                        playercards.push(allcards[0]);
                                        allcards.splice(0, 1);
                                        console.log("Ziehstapel", allcards);
                                        // Computer ist an der Reihe
                                        spielerZug = false;
                                        spielerReihenfolge();
                                        // Funktion neu aufrufen, dass sie sich nach Kick neu läd und die oberste Ziehkarte
                                        // in der Spielerhand erscheint
                                        alleKartenAnzeigen();
                                });

                        }

                        // die Spielerhandkarten
                        playerspaceDIV.innerHTML = "";
                        for (let i: number = 0; i < playercards.length; i++) {
                                let sgplayercard: HTMLDivElement = divKartenGenerieren(playercards[i]);
                                playerspaceDIV.appendChild(sgplayercard);

                                // Eventlistener für Klick auf Karte
                                if (spielerZug) {
                                        sgplayercard.addEventListener("click", function (): void {
                                                console.log(playercards[i] + " wurde geklickt");
                                                let kartepasst: boolean = passtKarte(playercards[i]);
                                                console.log("Die Karte passt zur offenen Karte: " + kartepasst);
                                                //wenn Karte passt auf offenen Stapel legen und aus Spielerkartenarray entfernen
                                                if (kartepasst === true) {
                                                        opencard = playercards[i];
                                                        console.log("offeneKarte ", opencard);
                                                        playercards.splice(i, 1);
                                                        console.log("spielerKarten", playercards);
                                                        // Computer ist an der Reihe
                                                        spielerZug = false;
                                                        spielerReihenfolge();
                                                        // Funktion neu aufrufen, dass sie sich nach Kick neu läd und die gespielte
                                                        // Karte aus der Spielerhand verschwindet
                                                        alleKartenAnzeigen();
                                                        gameend();
                                                }
                                        });
                                }
                        }
                        pcturn();       
                } 

                // Funktion für die Computeraktion
                function pcturn (): void {
                        // die Computerhandkarten umgedreht
                        computerspaceDIV.innerHTML = "";
                        for (let i: number = 0; i < pccards.length; i++) {
                                let sgpccard: HTMLDivElement = divKartenGenerieren("grau-");
                                computerspaceDIV.appendChild(sgpccard);
                        }

                        for (let i: number = 0; i < pccards.length; i++) {     
                                // das Computerkartenarray wird nach einer passenden Karte überprüft
                                if (spielerZug === false) {
                                        let kartepasst: boolean;
                                        if (passtKarte(pccards[i]) == true) {
                                                kartepasst = true;
                                        }

                                        if (kartepasst === true) {
                                                opencard = pccards[i];
                                                console.log("offene Karte", opencard);
                                                pccards.splice(i, 1);                                                
                                                console.log("pcKarten", pccards); 
                                                spielerZug = true;
                                                spielerReihenfolge();
                                                // Funktion neu aufrufen, dass sie sich nach Aktion neu läd und die gespielte
                                                // Karte aus der Computerhand verschwindet
                                                alleKartenAnzeigen();
                                                gameend();
                                                break;                                              
                                        }    
                                }                              
                        }
                     
                        // wenn das Computerarray keine passende Karte hat, wird eine Karte gezogen
                        if (spielerZug === false) {                      
                                console.log(allcards[0] + " wurde gezogen");                                        
                                pccards.push(allcards[0]);
                                allcards.splice(0, 1);
                                console.log("Ziehstapel", allcards);
                                console.log("pcKarten", pccards);
                                spielerZug = true;
                                spielerReihenfolge();
                                // Funktion neu aufrufen, dass sie sich nach Aktion neu läd und die gezogene
                                // Karte in der Computerhand erscheint       
                                alleKartenAnzeigen();
                                
                        }
                        
                }

                function gameend (): void {
                        // Wenn der Computer keine Karten mehr hat, gewinnt er
                        if (pccards[0] == undefined) {
                                let pcwintext: HTMLParagraphElement = document.createElement("p");
                                playspaceDIV.appendChild(pcwintext);
                                pcwintext.innerHTML = "Computer hat gewonnen!";
                                playerspaceDIV.innerHTML = "";
                                computerspaceDIV.innerHTML = "";
                                cardspaceDIV.innerHTML = "";             
                        }
                        // Wenn der Spieler keine Karten mehr hat, gewinnt er
                        if (playercards[0] == undefined) {
                                let playerwintext: HTMLParagraphElement = document.createElement("p");
                                playspaceDIV.appendChild(playerwintext);
                                playerwintext.innerHTML = "Spieler hat gewonnen!";
                                playerspaceDIV.innerHTML = "";
                                computerspaceDIV.innerHTML = "";
                                cardspaceDIV.innerHTML = "";
                        }
                }



                // herausfinden, ob die geklickte Karte auf die offene Karte passt
                function passtKarte(kartenName: string): boolean {
                        let offeneKarteSplit: string[] = opencard.split("-");
                        let gegebeneKarteSplit: string[] = kartenName.split("-");
                        let farbepasst: boolean = offeneKarteSplit[0] === gegebeneKarteSplit[0];
                        let wertpasst: boolean = offeneKarteSplit[1] === gegebeneKarteSplit[1];
                        let kartepasst: boolean = farbepasst || wertpasst;
                        return kartepasst;
                }


                // Wenn der "Neues Spiel" Button geklickt wird, läd sich die Seite neu, um neue Karten zu generieren
                newgamebutton.addEventListener("click", function (): void {
                        location.reload();
                });
                












        });
}