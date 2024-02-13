//Några konstanter och ett objekt att utgå från
const eu = "europeiskt";
const jpn = "japanskt";
const fantasy = "fantasi";
const speladeGånger = 0;

function Svärd(typ, bild) {
  this.typ = typ;
  this.bild = bild;
}

class SwordGame {
  constructor() {
    this.eu = "europeiskt";
    this.jpn = "japanskt";
    this.fantasy = "fantasi";
    this.allaSvärd = [
      new Svärd(this.eu, "img/european/1.jpg"),
      new Svärd(this.eu, "img/european/2.jpg"),
      new Svärd(this.jpn, "img/japanese/1.jpg"),
      new Svärd(this.jpn, "img/japanese/1.jpg"),
      new Svärd(this.fantasy, "img/fantasy/1.jpg"),
      new Svärd(this.fantasy, "img/fantasy/1.jpg"),
    ];
    this.svärd = 0;
    this.euCount = 0;
    this.jpnCount = 0;
    this.speladeGånger = 1;
    this.initUI();
    this.bindEvents();
    this.randomSvärd();
    this.isGameActive(false);
  }

  initUI() {
    this.footer = document.getElementById("footer");
    footer.textContent = "Svärdspelet";
    this.svarDiv = document.querySelector(".svar");
    this.svarH2 = this.svarDiv.querySelector("h2");
    this.svarOkButton = this.svarDiv.querySelector(".val");
    this.svärdbild = document.getElementById("svärdbild");
    this.knappradDiv = document.querySelector(".knapprad");
    this.svärdwrapper = document.getElementById("svärdwrapper");
    this.grattisMeddelande = document.getElementById("grattis");
    this.euCounter = document.querySelector("#liechtenauer .räknare");
    this.euLista = document.querySelector("#liechtenauer .lista");
    this.euButton = document.getElementById("europeiskt");
    this.jpnCounter = document.querySelector("#musashi .räknare");
    this.jpnLista = document.querySelector("#musashi .lista");
    this.jpnButton = document.getElementById("japanskt");
    this.fantasyButton = document.getElementById("fantasi");
    this.svarH2.textContent = "Du gav till rätt mästare";
    this.statsDiv = document.getElementById("stats"); // Anta att du har ett element för att visa statistik
    this.resetButton = document.createElement("button");
    this.resetButton.className = "spela-igen-btn"; // Lägg till klassnamnet för styling
    this.resetButton.innerText = "Spela igen";
    this.resetButton.addEventListener("click", () => this.resetGame(true));
    this.grattisMeddelande.appendChild(this.resetButton); // Lägger till knappen i grattis-meddelandet
    this.felGissningar = 0;
    this.updateStatsDisplay();
  }

  bindEvents() {
    this.svärdwrapper.addEventListener(
      "mouseover",
      this.showButtons.bind(this)
    );
    this.svärdwrapper.addEventListener(
      "mouseleave",
      this.hideButtons.bind(this)
    );
    this.euButton.addEventListener("click", this.handleEuClick.bind(this));
    this.jpnButton.addEventListener("click", this.handleJpnClick.bind(this));
    this.fantasyButton.addEventListener(
      "click",
      this.handleFantasyClick.bind(this)
    );
    this.resetButton.addEventListener("click", () => this.resetGame());
    this.svarOkButton.addEventListener("click", () => {
      this.svarDiv.classList.add("osynlig");
      this.randomSvärd();
    });
  }

  async randomSvärd() {
    try {
      const ApiSvärdIds = await fetch("http://127.0.0.1:5500/api/sword/");
      const ids = await ApiSvärdIds.json();
      const randomId = ids[Math.floor(Math.random() * ids.length)];
      const svärdResponse = await fetch(
        `http://127.0.0.1:5500/api/sword/${randomId}`
      );
      this.svärd = await svärdResponse.json();
      this.svärdbild.src = this.svärd.bild;
    } catch (error) {
      console.error("Fel vid hämtning av svärd:", error);
    }
  }

  showButtons() {
    this.knappradDiv.classList.add("synlig");
    this.knappradDiv.classList.remove("osynlig");
  }

  hideButtons() {
    this.knappradDiv.classList.add("osynlig");
    this.knappradDiv.classList.remove("synlig");
  }

  updateCounterAndImage(section, counter, count) {
    counter.innerHTML = `Musashi har ${count} svärd`;
    this.addLitenBild(section);
    this.kollaOmVinnare();
  }

  handleEuClick() {
    if (this.svärd.typ === this.eu) {
      this.euCounter.innerHTML = `Liechtenauer har ${++this.euCount} svärd`;
      this.addLitenBild(this.euLista);
      this.kollaOmVinnare();
    } else {
      this.markeraFelVal();
      this.felGissningar++;
      this.randomSvärd();
    }
    this.updateStatsDisplay();
  }

  handleJpnClick() {
    if (this.svärd.typ === this.jpn) {
      this.jpnCounter.innerHTML = `Musashi har ${++this.jpnCount} svärd`;
      this.addLitenBild(this.jpnLista);
      this.kollaOmVinnare();
    } else {
      this.markeraFelVal();
      this.felGissningar++;
      this.randomSvärd();
    }
    this.updateStatsDisplay();
  }

  handleFantasyClick() {
    if (this.svärd.typ !== this.fantasy) {
      this.felGissningar++;
      this.randomSvärd();
      this.updateStatsDisplay();
      this.markeraFelVal();
    } else {
      this.randomSvärd();
    }
  }

  markeraFelVal() {
    const spelContainer = document.getElementById("svärdwrapper"); // Eller vilket element du vill markera
    spelContainer.classList.add("fel-val");

    // Alternativt, lägga till skakande animation
    spelContainer.style.animation = "shake 0.5s";

    // Ta bort klassen eller återställ animationen efter att den är klar
    setTimeout(() => {
      spelContainer.classList.remove("fel-val");
      spelContainer.style.animation = ""; // Återställ animationen
    }, 500); // Tidsintervall bör matcha animationens längd
  }

  kollaOmVinnare() {
    if (this.jpnCount > 1 && this.euCount > 1) {
      this.grattisMeddelande.classList.remove("osynlig");
      this.isGameActive = false;
    } else {
      this.svarDiv.classList.remove("osynlig");
    }
  }

  addLitenBild(section) {
    const litenbild = document.createElement("img");
    litenbild.src = this.svärd.bild;
    litenbild.classList.add("resultat");
    section.appendChild(litenbild);
  }

  resetGame(isNewGame = false) {
    if (isNewGame && !this.isGameActive) {
      this.speladeGånger++;
    }
    this.euCount = 0;
    this.jpnCount = 0;

    this.euCounter.innerHTML = `Liechtenauer har ${this.euCount} svärd`;
    this.jpnCounter.innerHTML = `Musashi har ${this.jpnCount} svärd`;

    this.euLista.innerHTML = "";
    this.jpnLista.innerHTML = "";

    this.randomSvärd();

    this.grattisMeddelande.classList.add("osynlig");
  }

  updateStatsDisplay() {
    if (this.statsDiv) {
      this.statsDiv.innerHTML = `Spelade gånger: ${this.speladeGånger} <br> Fel gissningar: ${this.felGissningar}`;
    }
  }
}

// Initiera spelet när sidan har laddats
document.addEventListener("DOMContentLoaded", () => new SwordGame());
