import { defineConfig } from 'astro/config';

// Static output — builds to plain HTML/CSS/JS, ready for GitHub Pages.
// When you're ready to deploy, set `site` to your domain, e.g.
// site: 'https://thinksavvy.co.uk',
export default defineConfig({
  output: 'static',
});
