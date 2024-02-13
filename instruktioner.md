# Backstory 

Två av historiens största svärdsmästare åkte på cosplay-event, och där lyckades de blanda ihop sina svärd med fantasy-svärden som besökarna hade! Alla svärd finns registrerade, men bara med vilken typ det är och en bild. Som tur är nöjer sig både Liechtenauer och Musashi så länge båda har två svärd var, så vi får gå genom svärden slumpmässigt och ge dem till vardera tills båda har minst två svärd var. Det finns massvis med svärd som ser exakt likadana ut, så två likadan svärd är OK.

# Instruktioner

I zip-filen för examinationen ligger ett gäng filer. Den enda fil du ska rediger är `svärd.js`, och det är den enda filen du ska lämna in. Du kan alltså inte lösa några uppgifter genom att redigera HTML eller CSS.
Du ska öppna `svärd.html` med live server, och det är även så jag kommer att provköra din lösning.

## Krav för godkänt

För att uppnå godkänt behöver du se till så sidan 
1. Du sätter ditt namn i footern längst ned, så blir det lättare för mig att se vems uppgift jag rättar :-)
2. Slumpar fram en bild från listan på svärdsobjekt `allaSvärd` som ligger i svärd.js och visa den i img-taggen "svärdbild" på html-sidan.
3. När man håller musen över "svärdbild"-taggen så ska div:en "knapprad" bli synlig, och håller man inte musen över bilden ska den bli osynlig igen.
4. När man klickar på knapparna för att ge svärdet musashi, liechtenauer, eller ingen så ska koden:
    * kontrollera om man gav svärdet till rätt mästare (liechtenauer gillar bara europeiska svärd, musashi bara japanska)
    * Om man gav det till rätt mästare, så ska H3-taggen med klassen "räknare" uppdateras med antal svärd som den nu har (ger man ett japanskt svärd till Musashi så ska alltså texten ändras från "Musashi har 0 svärd" till "Musashi har 1 svärd)
    * Och ett nytt svärd ska slumpas fram och visas i bildtaggen (som i steg 1 alltså)
5. När både Musashi och Liechtenauer har minst två svärd (den ena kan ha flera, så om leichtenauer har 5 och musashi går från 1 till 2 är villkoret uppfyllt), ska div:en "grattis" bli synlig så man får ett grattismeddelande.
6. Det får inte komma upp några felmeddelande i konsollen medans jag klickar mig fram på sidan. 

## Krav för väl godkänt

För att få väl godkänt ska sidan göra detsamma som för godkänt, men med följande ändringar
1. Du ska inte längre hämta svärdsobjekten från den fördefinierade listan ``allaSvärd``, utan du ska nu hämta svärden via javasripts `fetch` från det simulerade REST-API:t som finns under api.
    * listan på id:n för svärd som finns kan du hitta under `api/sword`
    * varje svärd kan du sedan hitta under `api/sword/{id}` 
    * Exempel: Om du via fetch mot `http://127.0.0.1:5500/vems_svärd_är_det/api/sword/` hittar ett svärd med id "1", så hämtar du detaljerna för det svärdet genom att göra en fetch mot `http://127.0.0.1:5500/vems_svärd_är_det/api/sword/1` så får du ett JSON-objekt som svar.
2. Det finns en div som heter "svar", den ska du låta komma upp med information om resultatet på varje svar i H2-taggen (t.ex. "Musashi accepterade svärdet", "Du gav till rätt mästare", eller motsvarande), och slumpa nytt svärd samt döljas när man trycker på "OK"-knappen.
3. När man gissat rätt på ett svärd, så ska inte bara räknaren på mästaren uppdateras, utan en bild på svärdet ska läggas under section-taggen "lista" på mästaren i fråga. (tips: lägg dit så den träffar CSS:en `div.resultat div 
section img`) 
    

    

