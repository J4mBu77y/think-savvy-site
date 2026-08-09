# Think Savvy — website

## 1. Run it locally

You'll need [Node.js](https://nodejs.org) installed (any recent version). Then, in this folder:

```
npm install
npm run dev
```

Open the URL it gives you (usually `http://localhost:4321`) to view the site. Edit files under
`src/` and it'll update live in the browser.

Key files:
- `src/pages/index.astro` — the whole page, section by section
- `src/components/` — Header, Footer, the duck hero illustration, and the contact form
- `src/styles/global.css` — colours, fonts, and shared styles (all pulled from your logo)

## 2. Before it's ready to go live

The contact form currently has a placeholder in `src/components/ContactForm.astro`:

```
action="PASTE-YOUR-POWER-AUTOMATE-HTTP-URL-HERE"
```

Follow the Power Automate steps below, then paste your flow's HTTP URL in there. Until you do
that, the form won't actually send anywhere — everything else on the site works regardless.

## 3. Deploying — free, via GitHub Pages

1. Create a new repository on your GitHub account (personal account is fine) — call it
   e.g. `think-savvy-site`.
2. Push this folder to it (I can talk you through the exact git commands when you're ready —
   just say the word and give me your GitHub username).
3. In the repo, go to **Settings → Pages**, and set the source to **GitHub Actions** — Astro
   has an official one-click template for this that GitHub will suggest automatically.
4. Once it's deployed, you'll get a free address like `https://<your-username>.github.io/think-savvy-site`.

### Pointing your Namecheap domain at it

You already own `thinksavvy.co.uk` — here's how to connect it once you're happy with the site:

1. In your GitHub repo: **Settings → Pages → Custom domain**, enter `thinksavvy.co.uk`, save.
2. In Namecheap, go to your domain's **Advanced DNS** tab and add:
   - Four **A records** (Host: `@`) pointing to GitHub's IP addresses:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One **CNAME record** (Host: `www`) pointing to `<your-username>.github.io`
3. DNS changes can take anywhere from a few minutes to a few hours to take effect.

No rush on this part — the free GitHub address works fine for reviewing the site in the meantime.

## 4. Power Automate → SharePoint + email, step by step

This replaces "emailing yourself and scraping it" — the form submits straight to a flow that
writes a structured row into SharePoint **and** sends you a clean email, in one step.

1. Go to [make.powerautomate.com](https://make.powerautomate.com) and sign in with your work account.
2. **Create → Instant cloud flow → "When an HTTP request is received"** as the trigger.
3. In that trigger, click **"Use sample payload to generate schema"** and paste this in:
   ```json
   {
     "Name": "Jane Doe",
     "Company": "Example Logistics",
     "Email": "jane@example.com",
     "Phone": "07123 456789",
     "FleetSize": "250 vehicles",
     "ServiceInterestedIn": "Toll Account Management",
     "Message": "We're looking for help with our toll accounts."
   }
   ```
   This generates the schema automatically — you don't need to write it by hand.
4. Add a step: **SharePoint → Create item**.
   - Site address: your `Think_Savvy` site
   - List name: create a new list first (e.g. "Website Enquiries") with columns matching the
     fields above — Name, Company, Email, Phone, FleetSize, ServiceInterestedIn, Message
   - Map each field from the trigger's dynamic content into the matching column
   - Tell me which folder/list you'd like this saved under on the SharePoint site and I can
     help you name and structure it consistently with the rest of the site
5. Add a second step: **Office 365 Outlook → Send an email (V2)**.
   - To: `jamie@thinksavvy.co.uk`
   - Subject: something fixed, e.g. `New website enquiry — [Company]` (use dynamic content for `[Company]`)
   - Body: lay it out as clear labelled lines, e.g.:
     ```
     Name: [Name]
     Company: [Company]
     Email: [Email]
     Phone: [Phone]
     Fleet size: [FleetSize]
     Service: [ServiceInterestedIn]
     Message: [Message]
     ```
6. Save the flow. Click into the trigger step and copy the **HTTP POST URL** it generates.
7. Paste that URL into `src/components/ContactForm.astro`, replacing
   `PASTE-YOUR-POWER-AUTOMATE-HTTP-URL-HERE`.
8. Test it: run the site locally, submit the form once, and check both the SharePoint list and
   your inbox for the test entry.

That's it — every future submission lands in both places automatically, already structured.
