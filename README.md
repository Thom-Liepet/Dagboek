# Moment

Een rustige online dagboek-app waarin je dagelijks drie korte reflectievragen beantwoordt. De data wordt opgeslagen in Supabase, zonder verplichte login.

## 1. Installeren

Open deze map in Visual Studio Code en open een terminal:

```bash
npm install
```

## 2. Supabase-project maken

1. Ga naar [supabase.com](https://supabase.com) en maak een account aan.
2. Klik op **New project**, kies een organisatie en geef je project een naam.
3. Kies een sterk databasewachtwoord en een regio dichtbij jou.
4. Wacht tot het project klaar is.

## 3. URL en anon key vinden

Open in Supabase links onderin **Project Settings** (tandwiel) en daarna **API**.

- **Project URL** is de waarde voor `VITE_SUPABASE_URL`.
- **Project API keys > anon public** is de waarde voor `VITE_SUPABASE_ANON_KEY`.

De anon key mag in een frontend-app staan. Gebruik nooit de `service_role` key in deze app.

## 4. Omgevingsbestand maken

Kopieer `.env.example` naar een nieuw bestand met exact de naam `.env` en vul beide waarden in:

```env
VITE_SUPABASE_URL=https://jouw-project.supabase.co
VITE_SUPABASE_ANON_KEY=jouw-anon-public-key
```

Herstart de ontwikkelserver na wijzigingen aan `.env`. Het `.env`-bestand staat in `.gitignore` en hoort niet in Git te worden gezet.

## 5. Tabel en RLS instellen

1. Open in Supabase **SQL Editor**.
2. Klik op **New query**.
3. Open `supabase/schema.sql` uit dit project, kopieer alles en plak het in de editor.
4. Klik op **Run**.

Dit maakt `journal_entries`, een unieke regel per datum, indexes en vier Row Level Security (RLS) policies aan. Omdat deze versie geen login gebruikt, zijn de policies bewust publiek: bezoekers kunnen entries lezen, toevoegen, wijzigen en verwijderen. Gebruik deze variant alleen voor een persoonlijke of lokale dagboekomgeving. Voor meerdere gebruikers met privédata is de eerdere authenticatievariant nodig.

## 6. Lokaal starten

```bash
npm run dev
```

Open daarna de URL die Vite toont, meestal `http://localhost:5173`.

Voor een productiecheck:

```bash
npm run build
npm run preview
```

## 7. Controleren of data wordt opgeslagen

1. Open Moment.
2. Schrijf een entry en klik op **Entry opslaan**.
3. Open in Supabase **Table Editor > journal_entries**.
4. Je ziet daar de entry met een UUID als `id`.
5. Test dat een entry na opnieuw laden nog zichtbaar is en dat een tweede entry voor dezelfde datum wordt geweigerd.

## Deployen naar Vercel

Importeer de repository in Vercel, gebruik de standaard Vite-instellingen en voeg onder **Settings > Environment Variables** dezelfde twee variabelen toe. Vercel voert het build-commando `npm run build` uit. Voeg in Supabase eventueel je Vercel-domein toe via **Authentication > URL Configuration** als je e-mailbevestigingen op productie gebruikt.

## Structuur

```text
src/
  components/       Herbruikbare auth-, editor-, detail- en kalendercomponenten
  lib/              Supabase-client
  services/         Database-acties voor journal entries
  types.ts          Gedeelde types, vragen en stemmingen
  App.tsx           Sessies, navigatie en schermstatus
  styles.css        Responsive visuele stijl
supabase/schema.sql Tabellen en RLS policies
```