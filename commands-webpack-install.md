npm install --save-dev webpack webpack-cli  // installing webpack which involves 2 packages

//NB: you can -D, instead of --save-dev, as a shortcut. --save-dev tells npm to record the 2 packagaes as development dependencies.

npx webpack // running webpack after filling it with required info (NB: its npx not npm)


npm install --save-dev html-webpack-plugin // installiing html webpack plugin for html, since webpack alone is for js


npm install --save-dev style-loader css-loader // installing the css package (nb, they're not plugins like the html one). NB 2 are needed. css loader imports tje css and stores the result in a string. style-loader adds the js that applies the style to the page.

npm install --save-dev html-loader // for loading images referenced in the html.

// for images refereenced in the css, the css-loader handles that


npm install --save-dev webpack-dev-server // no need to run npx webpack each time as this command auto-refreshes everything to regen a new dist whenever changes are made to files in the src or in the webpack.config.js

npx webpack serve // starts the dev server . this will make our site available at http://localhost:8080/ be default

http://localhost:8080/ 

npm install merge --save-dev webpack-merge // installing webpack merge