# Sito di Laura Montanari

Sito statico costruito con [Astro](https://astro.build). Non ha database né server da mantenere, e i costi fissi si riducono al dominio.

---

## 1. Com'è fatto

```
src/
  data/sito.json          ← testi principali, contatti, frasi ispiratrici
  content/servizi/*.md    ← un file per ogni servizio
  content/pensieri/*.md   ← un file per ogni articolo del blog
  pages/                  ← le pagine (Home, Chi sono, Servizi, Pensieri, Contatti, Privacy)
  components/             ← intestazione e piè di pagina
  styles/global.css       ← colori e caratteri (la palette è in cima al file)
public/
  img/                    ← logo, foto, favicon
  admin/                  ← pannello di modifica per iPad (Sveltia CMS)
```

**Regola d'oro:** per i testi si toccano solo `sito.json` e i file `.md`, mentre il codice resta fermo.

## 2. Lavorare dal PC

Serve Node.js 22 o superiore.

```bash
npm install
npm run dev      # anteprima su http://localhost:4321, si aggiorna mentre scrivi
npm run build    # genera il sito finale in dist/
```

## 3. Mettere online (una volta sola)

1. **GitHub**: crea un repository privato `sito-laura-montanari` e fai il push di questa cartella.
2. **Cloudflare Pages**: vai su *Workers & Pages → Create → Pages → Connect to Git* e scegli il repository.
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Output directory: `dist`
3. Da qui in poi **ogni push su `main` pubblica il sito da solo** in circa un minuto.
4. **Dominio**: acquistalo (anche da Cloudflare stesso), collegalo in *Custom domains* e aggiorna l'indirizzo in `astro.config.mjs`.

## 4. Modificare dall'iPad

Hai due strade, entrambe gratuite.

**A. Pannello `/admin`, comodo e visuale.** Apri `https://tuodominio.it/admin`: trovi moduli con campi in italiano per testi, frasi, servizi e articoli. Ogni salvataggio crea un commit su GitHub, e Cloudflare ripubblica il sito.

Per configurarlo:
- In `public/admin/config.yml` sostituisci `TUO-UTENTE-GITHUB`.
- **Accesso semplice**: crea su GitHub un *fine-grained personal access token* limitato a questo repository, con permesso *Contents: Read and write*. Nel pannello scegli "Accedi con token". Salva il token in un gestore di password.
- **Accesso con pulsante "Accedi con GitHub"** (facoltativo): pubblica il piccolo worker gratuito [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) su Cloudflare e togli il commento a `base_url` nel `config.yml`.
- Dal PC con Chrome o Edge puoi anche aprire il pannello in locale (`npm run dev` → `localhost:4321/admin`) e lavorare direttamente sulla cartella, senza login.

**B. Editor di codice nel browser.** Sulla pagina del repository su GitHub premi il tasto `.`, oppure apri `github.dev/…`: si apre VS Code nel browser e funziona bene anche su iPad con tastiera. In alternativa c'è l'app *Working Copy* (Git completo su iPad).

## 5. Da completare prima di pubblicare ✅

- [ ] In `sito.json`: **numero di iscrizione all'Albo**, telefono, città dello studio, P.IVA.
- [ ] **Servizi**: quelli inseriti sono esempi, da verificare con Laura (nomi, durate, modalità).
- [ ] Testo "Chi sono": è una bozza, da far rileggere a lei.
- [ ] **Privacy**: la pagina è una bozza, da far controllare.
- [ ] Logo: quello attuale è piccolo. Se esiste una versione in alta risoluzione o SVG, sostituisci `public/img/logo.png`.
- [ ] Valuta un'email sul dominio (es. `info@lauramontanari.it`) al posto di Gmail. Cloudflare Email Routing la inoltra gratis alla casella Gmail.

### Attenzione: regole per gli psicologi
La comunicazione degli psicologi segue il Codice deontologico. In sintesi: solo informazione corretta e professionale, **niente recensioni o testimonianze di pazienti**, nessuna promessa di risultati, iscrizione all'Albo sempre indicata. Per i casi dubbi conviene una verifica con l'Ordine regionale.

## 6. Contenuti di tutti i giorni

| Voglio…                       | Dove                                                         |
|-------------------------------|--------------------------------------------------------------|
| cambiare una frase o un contatto | `src/data/sito.json` (o /admin → Testi del sito)          |
| aggiungere un servizio        | nuovo file in `src/content/servizi/` (o /admin → Servizi)    |
| nascondere un servizio        | `pubblicato: false`                                          |
| cambiare l'ordine dei servizi | campo `ordine` (1, 2, 3…)                                     |
| scrivere un articolo          | nuovo file in `src/content/pensieri/`                        |
| cambiare colori o caratteri   | variabili in cima a `src/styles/global.css`                  |
| cambiare la foto              | sostituisci `public/img/laura.jpg`                            |

## 7. Quando arriverà la vendita

- **Servizi a pagamento**: ogni servizio ha già i campi `prezzo` e `linkPagamento`. Crea un *Payment Link* su Stripe, incollalo, e nella pagina del servizio compare il pulsante "Prenota e paga online". Non c'è canone, solo la commissione per transazione.
- **Prenotazioni**: puoi incorporare un calendario Cal.com nella pagina Contatti.
- **Prodotti fisici**: aggiungi una collezione `prodotti` in `src/content.config.ts`, sul modello di `servizi`, e usa Stripe Checkout da una Cloudflare Pages Function.
- **Fiscale**: le prestazioni sanitarie hanno regole proprie (fattura, Sistema Tessera Sanitaria). Stripe incassa ma non fattura, quindi serve un gestionale o il commercialista.

## 8. Manutenzione (pochi minuti al mese)

- `npm outdated` → `npm update` per aggiornare Astro, poi `npm run build` per verificare.
- Puoi attivare **Dependabot** su GitHub (*Settings → Code security*), che propone gli aggiornamenti da solo.
- Il sito è statico: non c'è nulla da "patchare" lato server.
