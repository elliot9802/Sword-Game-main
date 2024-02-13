//Några konstanter och ett objekt att utgå från
const eu = "europeiskt";
const jpn = "japanskt";
const fantasy = "fantasi";

function Svärd(typ, bild) {
  this.typ = typ;
  this.bild = bild;
}

//Använden den här listan på svärd för godkänt, för VG ska du hämta den större listan via fetch
let allaSvärd = [
  new Svärd(eu, "img/european/1.jpg"),
  new Svärd(eu, "img/european/2.jpg"),
  new Svärd(jpn, "img/japanese/1.jpg"),
  new Svärd(jpn, "img/japanese/2.jpg"),
  new Svärd(fantasy, "img/fantasy/1.jpg"),
  new Svärd(fantasy, "img/fantasy/2.jpg"),
];

//***Låt koden ovanför vara, du får inte ändra på den***

// Hämta DOM-element och tilldela dem variabler för enkel åtkomst
const footer = document.getElementById("footer");
const svarDiv = document.querySelector(".svar");
const svarH2 = svarDiv.querySelector("h2");
const svarOkButton = svarDiv.querySelector(".val");
const svärdbild = document.getElementById("svärdbild");
const knappradDiv = document.querySelector(".knapprad");
const svärdwrapper = document.getElementById("svärdwrapper");
const grattisMeddelande = document.getElementById("grattis");
const euCounter = document.querySelector("#liechtenauer .räknare");
const euLista = document.querySelector("#liechtenauer .lista");
const euButton = document.getElementById("europeiskt");
const jpnCounter = document.querySelector("#musashi .räknare");
const jpnLista = document.querySelector("#musashi .lista");
const jpnButton = document.getElementById("japanskt");
const fantasyButton = document.getElementById("fantasi");

let svärd = 0;
let euCount = 0;
let jpnCount = 0;

// Funktion för att slumpa ett svärd från API:et
async function randomSvärd() {
  const ApiSvärdIds = await fetch("http://127.0.0.1:5500/api/sword/");
  const ids = await ApiSvärdIds.json();
  const randomId = ids[Math.floor(Math.random() * ids.length)];
  const svärdResponse = await fetch(
    `http://127.0.0.1:5500/api/sword/${randomId}`
  );
  svärd = await svärdResponse.json();
  svärdbild.src = svärd.bild;
}

// Första slumpade svärdet som visas vid sidans laddning
randomSvärd();

// /// Identifiera om enheten är en pekskärm
// const isTouchDevice =
//   "ontouchstart" in window ||
//   navigator.maxTouchPoints > 0 ||
//   navigator.msMaxTouchPoints > 0;

// if (isTouchDevice) {
//   // Ersätt 'mouseover' och 'mouseleave' med touchbaserade händelser för pekskärm
//   svärdwrapper.addEventListener(
//     "touchstart",
//     () => {
//       knappradDiv.classList.add("synlig");
//       knappradDiv.classList.remove("osynlig");
//     },
//     { passive: true }
//   );

//   // Du kan behöva hantera 'touchend' på ett annat element beroende på din design
//   // Detta är bara ett exempel på hur man kan göra det
//   document.addEventListener(
//     "touchstart",
//     (event) => {
//       if (!svärdwrapper.contains(event.target)) {
//         knappradDiv.classList.remove("synlig");
//         knappradDiv.classList.add("osynlig");
//       }
//     },
//     { passive: true }
//   );
// } else {
//   // För icke-pekskärmsenheter, använd musbaserade händelser som vanligt
//   svärdwrapper.addEventListener("mouseover", () => {
//     knappradDiv.classList.add("synlig");
//     knappradDiv.classList.remove("osynlig");
//   });

//   svärdwrapper.addEventListener("mouseleave", () => {
//     knappradDiv.classList.remove("synlig");
//     knappradDiv.classList.add("osynlig");
//   });
// }

// Funktion för att kolla om en vinnare har utsetts
function kollaOmVinnare() {
  if (jpnCount > 1 && euCount > 1) {
    grattisMeddelande.classList.remove("osynlig");
  } else {
    svarDiv.classList.remove("osynlig");
  }
}
// Event listener för euButton
euButton.addEventListener("click", () => {
  // Om valda svärdet är av typen "eu"
  if (svärd.typ === eu) {
    // Höj EU räknaren och uppdatera meddelandet
    euCounter.innerHTML = `Liechtenauer har ${++euCount} svärd`;
    // Lägg till en liten bild av svärdet i EU sektionen
    addLitenBild(euLista);
    // Kolla om de finns vinnare
    kollaOmVinnare();
  } else {
    // Om de valda svärdet inte är av typen "eu" välj ett random svärd.
    randomSvärd();
  }
});

// Event listener för jpnButton
jpnButton.addEventListener("click", () => {
  // Om valda svärdet är av typen "jpn"
  if (svärd.typ === jpn) {
    // Höj japan räknaren och uppdatera meddelandet
    jpnCounter.innerHTML = `Musashi har ${++jpnCount} svärd`;
    // Lägg till en liten bild av svärdet i japan sektionen
    addLitenBild(jpnLista);
    // Kolla om de finns vinnare
    kollaOmVinnare();
  } else {
    // Om de valda svärdet inte är av typen "jpn" välj ett random svärd.
    randomSvärd();
  }
});

// Event listener för fantasyButton
fantasyButton.addEventListener("click", () => {
  // Välj ett random svärd när fantasyButton är klickad
  randomSvärd();
});

// Sätt text content för svar Diven på h2
svarH2.textContent = "Du gav till rätt mästare";

// Event listener för "OK" knappen i svar sektionen
svarOkButton.addEventListener("click", () => {
  // Göm svar sektionen när OK är klickad
  svarDiv.classList.add("osynlig");
  // Välj ett random svärd när OK är klickad
  randomSvärd();
});

// Funktion för lägga till liten bild av svärdet i resultatet
function addLitenBild(section) {
  const litenbild = document.createElement("img");
  litenbild.src = svärd.bild;
  litenbild.classList.add("resultat");
  section.appendChild(litenbild);
}
