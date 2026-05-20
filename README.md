# Product Grid — Starter

Denne repo er ryddet til en minimal React SPA starter til eksamensprojektet.

Hvad der er implementeret:

- Routing med `react-router-dom` (`src/App.jsx`).
- State & props i siderne (`src/pages/*`).
- Supabase REST CRUD helper: `src/lib/api.js` (brug `VITE_SUPABASE_URL` og `VITE_SUPABASE_APIKEY`).
- Enkel loading/error-håndtering i siderne.
- Genbrugelige komponenter: `src/components/Card.jsx` og `Header.jsx`.

Kør projektet lokalt:

1. Installer dependencies (hvis ikke allerede gjort):

```bash
npm install
```

2. Opret en `.env` i projektroden baseret på `.env.example` og sæt dine Supabase værdier.

3. Start dev-server:

```bash
npm run dev
```

4. Åbn browseren på http://localhost:5176/ (Vite vælger en port automatisk hvis 5173 er optaget).

Notes / næste trin:

- Kør `npm audit` / `npm audit fix` hvis du ønsker at forsøge at rette afhængigheds-sårbarheder.
- Jeg kan committe ændringer, tilføje en `.gitignore` for `.env`, eller udvide UI-komponenter hvis du ønsker det.

Hvis du siger til, kan jeg også opdatere styles eller oprette flere fælles komponenter (Button, Layout osv.).

# RACE 10 - Øvelse: Post App med Forms og CRUD

## 0. Formål

I denne øvelse skal du bygge en lille Post App i React med Supabase som backend.

Fokus er på:

- controlled forms i React
- GET, POST, PATCH og DELETE med `fetch`
- navigation mellem sider
- at få det grundlæggende CRUD-flow til at virke

Målet er ikke at bygge en avanceret app.
Målet er at bygge en CRUD-app, som virker.

## 1. Startprojekt

- Brug dette template repo: [post-app-supabase-template](https://github.com/cederdorff/post-app-supabase-template)
- Opret dit eget repository ud fra templaten
- Hent derefter dit eget repository ned lokalt
- Åbn projektet i VS Code
- Kør:

```bash
npm install
npm run dev
```

> Vigtigt: Projektet fungerer ikke fuldt endnu. Før appen kan hente og gemme data, skal du have et Supabase-projekt, en `posts`-tabel og en korrekt `.env` fil.

## 2. Før du starter

Du skal have:

- et Supabase-projekt
- en tabel med navnet `posts`
- felterne `id`, `image` og `caption`
- testet GET, POST, PATCH og DELETE i Thunder Client

Du må meget gerne bare arbejde videre i det Supabase-projekt, du allerede har fra tidligere.

### Opret `posts`-tabellen i Supabase

Hvis du ikke allerede har en `posts`-tabel, så gør sådan her:

1. Åbn dit eksisterende Supabase-projekt
2. Gå til **Table Editor**
3. Klik på **Create a new table**
4. Giv tabellen navnet `posts`
5. Sørg for at tabellen har disse kolonner:

| column     | type               |
| ---------- | ------------------ |
| id         | int8 (primary key) |
| created_at | timestampz         |
| image      | text               |
| caption    | text               |

6. Gem tabellen

Hvis `id` ikke autogenereres, så sørg for at `id` er sat op som primary key.

`created_at` bliver ofte oprettet automatisk af Supabase. Det er helt fint. Du skal ikke bruge det aktivt i denne øvelse.

### Gør tabellen unrestricted lige nu

For at gøre det nemt at teste i denne øvelse, skal tabellen være åben for requests lige nu.

1. Gå til **Table Editor**
2. Åbn tabellen `posts`
3. Find **Table settings** eller menuen med de tre prikker
4. Gå til policies / security
5. Sæt tabellen til **unrestricted** eller slå RLS fra for `posts`

Det er kun for at gøre det nemt at komme i gang. Senere kan du arbejde med sikkerhed og policies igen.

### Indsæt et par test-data

Det er en god ide at indsætte 2-3 rækker med det samme, så du har noget at vise på forsiden.

Du må gerne tage udgangspunkt i disse eksempler og kun indsætte `image` og `caption` i Supabase:

```json
[
  {
    "caption": "Beautiful sunset at the beach",
    "image": "https://images.unsplash.com/photo-1566241832378-917a0f30db2c?auto=format&fit=crop&w=500&q=80"
  },
  {
    "caption": "Exploring the city streets of Aarhus",
    "image": "https://images.unsplash.com/photo-1559070169-a3077159ee16?auto=format&fit=crop&w=500&q=80"
  },
  {
    "caption": "Delicious food at the restaurant",
    "image": "https://images.unsplash.com/photo-1548940740-204726a19be3?auto=format&fit=crop&w=500&q=80"
  }
]
```

### Test dit endpoint

Når tabellen er klar, så lav lige et par hurtige tests i Thunder Client.

Du skal bruge:

1. URL'en til `posts`
2. din `anon` eller `publishable` API key

Begge dele finder du i Supabase under:

- **Project Settings** -> **API**

Brug denne URL:

```txt
https://dit-project-id.supabase.co/rest/v1/posts
```

I Thunder Client:

1. Åbn Thunder Client i VS Code
2. Opret en ny request
3. Indsæt URL'en
4. Tilføj disse headers:

```txt
apikey: DIN_KEY
Content-Type: application/json
```

Til `PATCH` og `DELETE` kan du bruge:

```txt
https://dit-project-id.supabase.co/rest/v1/posts?id=eq.1
```

Til `POST` og `PATCH` skal du også sende JSON i body, fx:

```json
{
  "image": "https://example.com/photo.jpg",
  "caption": "Mit første post"
}
```

Når det er sat op, så test:

- GET alle posts
- POST et nyt post
- PATCH et eksisterende post
- DELETE et eksisterende post

Du skal:

1. Bruge `useParams()` til at læse `id`
2. Hente et post med querystring: `` `${URL}?id=eq.${id}` ``
3. Gemme resultatet i state
4. Vise `image` og `caption`
5. Lave en delete-knap
6. Bruge `window.confirm(...)`
7. Sende en DELETE-request
8. Navigere tilbage til forsiden
