# css-zines

This repository includes a setup for generating pure HTML and CSS zines.
I wrote the scripts by hand, to practice some freehand Node, so it's not using
any libraries outside of the standard Node library.

The setup is in the `build` directory.
Usage: `./bin/index.js <filepath> <command>`

Commands:
- `setup` - creates initial directory and files for a zine
- `build` - builds the zine from files in the zine directory
- `watch` - watches for file changes in `partials` and `styles` directories

# plan

- [x] Use an existing Haskell note to write a zine in HTML + CSS
- [x] Repeat the process for another note, to get the commonalities
- [ ] Create partials for common elements
- [ ] Create an initial setup for generating zines
- [ ] Publish a few pages for review (in progress)

## to-dos (~ are nice-haves):
- [x] output: single HTML file, ready for printing
- layout using CSS
    - ~CSS grid?
    - [x] add CSS styles for printing
- [ ] text marked for translation
- [ ] including images
- adding accessibility support:
    - [x] changing fonts (from cute handwritten one to a readable one)
    - [ ] ~increasing text easily
    - [ ] ~dark mode
- [x] use handwritten font
- [ ] ~create a monospace version of the font
- [ ] minimize CSS
- [ ] add CSS variables
- [ ] use CSS partials
- [ ] add variables to HTML partials
- [ ] improve regexp for putting CSS in the `<style>` tag
- [ ] add a `build-all` command for zines in a directory

## resources

[Printing a Book with CSS: Boom!](https://alistapart.com/article/boom/)

[Building books with CSS3](https://alistapart.com/article/building-books-with-css3/)

[Electric Book workflow](https://electricbookworks.github.io/electric-book/)

[Designing for Print with CSS](https://www.smashingmagazine.com/2015/01/designing-for-print-with-css/)

[Living Idea - CSS Books](https://books.idea.whatwg.org/)

[Zine Machine](https://zine-machine.glitch.me/)