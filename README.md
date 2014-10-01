# Bedecked

Bedecked converts markdown files to portable html5 presentations. I'm open to
adding support for other templating engines too, right bedecked also supports
jade and vanilla html.

Inspired by [hackynote](https://github.com/thiagofelix/hackynote), I wanted a
simple way to build snazzy presentations from markdown files that I could export
as a single HTML document. Pop those in your public dropbox folder (or S3, or
whatever) and share.

Bedecked looks for consecutive empty lines in your source file to insert slide
breaks, for example:

```
## My first slide

This will be on one slide


## My second slide

This will be on a new slide (notice the two empty lines above the heading)



### Another slide

More than two empty lines  is fine too.
```

Check out our [gh-pages](http://jtrussell.github.io/bedecked) for a basic
example.  The corresponding markdown can be found [there
too](https://github.com/jtrussell/bedecked/tree/gh-pages).

## Installation

Install bedecked globally to get access to the cli with:

```
npm install -g bedecked
```

You can also use bedecked api locally in your app:

```
npm install --save bedecked
```

## Usage

### CLI

After a global install you'll have access to the `bedecked` command:

```
bedecked [options] <file>
```

Where `<file>` is your markdown file. Your html presentation will be written to
stdout so you'll most often be sending that directly to a file:

```
bedecked my_prez.md > my_prez.html
```

Bedecked has built in options to switch the presentation theme, templating
engine, start a live reload server, and more. We're using [reveal.js][reveal]
for presentations and all reveal configuration options can be set with the
bedecked cli.

Run `bedecked --help` for more information on command line usage.

### API

The bedecked module exports a single method:

```javascript
var bedecked = require('bedecked')
  , presentationFile = 'path/to/my/prez.md'
  , opts = {
      engine: 'markdown', // markdown | jade | html
      theme: 'default', // See available themes http://www.cdnjs.com/libraries/reveal.js
      protocol: 'http:', // http: | https: | ''
      title: 'Just Another Bedecked Presentation',
      revealjsVersion: '2.6.2',

      // See https://github.com/hakimel/reveal.js#configuration
      optAutoSlide: 0,
      optAutoSlideStoppable: true,
      optCenter: true,
      optControls: true,
      optEmbedded: false,
      optFragments: true,
      optHideAddressBar: true,
      optHistory: false,
      optKeyboard: true,
      optLoop: false,
      optMouseWheel: false,
      optOverview: true,
      optPreviewLinks: false,
      optProgress: true,
      optRtl: false,
      optSlideNumber: false,
      optTouch: true,
      optViewDistance: 3
    };

// All options are optional ;) as is the opts parameter itself
bedecked(presentationFile, opts, function(err, html) {
  if(err) {
    // Whoops!
  }
  // Do something with HTML
});
```

### Live Reloading

It would be a real pain to have to run `bedecked` whenever you wanted to see
your latest changes. Bedecked ships with a live reload server to support
interactive presentation development. Try `bedecked --server my_prez.md` or view
`bedecked help server` for more information.

## Testing

Test and lint with `grunt`.

Use `grunt watch` to run tests interactively.

## License

MIT

[reveal]: https://github.com/hakimel/reveal.js
