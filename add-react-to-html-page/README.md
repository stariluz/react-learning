## Information retribution

|Usage or file|Source|
|-|-|
|<span id="react-in-html-resource">Implementation of react to a HTML website</span>|[Add React to a Website](https://reactjs.org/docs/add-react-to-a-website.html)|
|<span id="minification-resource">minification.md</span>|[How to Set Up Minification](https://gist.github.com/gaearon/42a2ffa41b8319948f9be4076286e1f3) [(@gaearon)](https://gist.github.com/gaearon):|

# Minification
(Section extracted from <a href="#react-in-html-resource">minification.md</a>)

In production, it is recommended to minify any JavaScript code that is included with your application. **Minification can help your website load several times faster,** especially as the size of your JavaScript source code grows.

Here's one way to set it up:

1. [Install Node.js](https://nodejs.org/)
2. Run `npm init -y` in your project folder (**don't skip this step!**)
3. Run `npm install terser`

Now, to minify a file called `like_button.js`, run in the terminal:

```bash
npx terser -c -m -o like_button.min.js -- like_button.js
```

This will produce a file called `like_button.min.js` with the minified code in the same directory. If you're typing this often, you can [create an npm script](https://medium.freecodecamp.org/introduction-to-npm-scripts-1dbb2ae01633) to give this command a name.

# Use of JSX in the project
(Section extracted from <a href="#react-in-html-resource">Implementation of react to a HTML website</a>)

## Add JSX to a Project
Adding JSX to a project doesn’t require complicated tools like a bundler or a development server. Essentially, adding JSX is a lot like adding a CSS preprocessor. The only requirement is to have Node.js installed on your computer.

Go to your project folder in the terminal, and paste these two commands:

- Step 1: Run `npm init -y` (if it fails, [here’s a fix](https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d))
- Step 2: Run `npm install babel-cli@6 babel-preset-react-app@3`
## Run JSX Preprocessor
Create a folder called src and run this terminal command:
```bash
npx babel --watch src --out-dir . --presets react-app/prod
```
Don’t wait for it to finish — this command starts an automated watcher for JSX.

If you now create a file called src/like_button.js with this JSX starter code, the watcher will create a preprocessed like_button.js with the plain JavaScript code suitable for the browser. When you edit the source file with JSX, the transform will re-run automatically.

As a bonus, this also lets you use modern JavaScript syntax features like classes without worrying about breaking older browsers. The tool we just used is called Babel, and you can learn more about it from [its documentation](https://babeljs.io/docs/en/babel-cli/).