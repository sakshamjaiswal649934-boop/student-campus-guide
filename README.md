# Student Campus Guide — GitHub Pages

## Files
- `index.html` — main webpage
- `style.css` — website styling
- `script.js` — search, filters, directory and Google Maps directions
- `robots.txt` — search-engine crawling rules
- `sitemap.xml` — basic sitemap for Google Search Console

## Publish on GitHub Pages
1. Create a new GitHub repository.
2. Upload all files from this folder to the repository root.
3. Make sure `index.html` is directly in the repository root.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select **main** and **/(root)**, then Save.
7. Wait for GitHub to provide your public Pages URL.

## Important
Before submitting `sitemap.xml` to Google Search Console, replace:
`YOUR-USERNAME` and `YOUR-REPOSITORY`
with your real GitHub username and repository name.

## Campus locations
The original uploaded file did not contain a building database or JavaScript directory data.
The included `script.js` therefore uses editable location entries based on the categories/content already shown by the page. 
For exact navigation, replace the destination text in `LOCATIONS` with the official Google Maps names/addresses of your actual campus buildings.
