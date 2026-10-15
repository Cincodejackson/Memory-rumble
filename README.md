# BuildLab — PC Builder & Hardware Explorer

BuildLab is a beginner-friendly, one-page PC component explorer. Choose a processor, graphics card, memory kit, and SSD to see a sample parts estimate update instantly. The page also explains each component and checks whether the selected RAM generation matches the processor's stated memory support.

## Run it on your computer

1. Download or open this folder.
2. Double-click `index.html` to open the website in a browser.
3. Change the four menus. The parts list, estimate, and compatibility note update automatically.

There is no installation, account, or build step. The Google Fonts import improves the typography when you are online; the page still works if that service is unavailable.

## How the files fit together

- `index.html` contains the page sections and the menus, totals, and messages that JavaScript updates.
- `styles.css` controls the colors, spacing, responsive layout, and visual details. The media queries near the bottom adapt it to phone and tablet screens.
- `script.js` contains the sample parts data and the interactions. `populateSelects()` fills the menus, `updateBuild()` recalculates the estimate, and `updateCompatibility()` checks memory generation and shows a motherboard socket reminder.

To try a change, edit a part name, price, or description in the `parts` object near the top of `script.js`, save, and refresh the page. Prices are learning examples, not current store listings. The compatibility check is intentionally basic: a real build also needs a matching motherboard, case, power supply, and cooling, and should be checked against manufacturer specifications before buying.

## Publish free with GitHub Pages

1. Sign in to [GitHub](https://github.com/) and create a new **public** repository, such as `buildlab-pc-builder`.
2. Add the contents of this folder to the repository's top level. Make sure `index.html`, `styles.css`, and `script.js` are at the top level, not hidden inside an extra folder.
   - On GitHub, choose **Add file → Upload files**, drag in the three website files, and also include this README.
   - Enter a short commit message such as `Add BuildLab website`, then choose **Commit changes**.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**. Select the `main` branch and the `/ (root)` folder, then save.
5. Wait for GitHub Pages to finish publishing. The Pages panel will show the site address, usually `https://YOUR-USERNAME.github.io/buildlab-pc-builder/`.
6. Open that address and try the component menus. To make changes later, edit the files on GitHub and commit the changes; Pages republishes the site.

If you prefer, GitHub Desktop can publish the folder: create a repository from the project folder, commit the files, publish the repository, and then follow steps 3–6.

## Good next improvements

- Add motherboard, power supply, and case choices.
- Add a filter for a target budget or use case.
- Replace sample estimates with researched prices and a “last checked” date.
- Expand compatibility checks using current manufacturer specifications.
- Add a shareable build link or save the current choices in the browser.
