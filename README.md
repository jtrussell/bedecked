# Bedecked

Bedecked lets you convert markdown files to portable html5 presentations. Other
templating engines can also be supported, right now just `jade` and vanilla
`html`.

Inspired by [hackynote](https://github.com/thiagofelix/hackynote), I wanted a
simple way to build snazzy presentations from markdown files that I could export
as standalone HTML. Pop those guys in your public dropbox folder (or S3, or
whatever) and share.

## Installation

Install bedecked globally to get access to the cli with:

```
npm install -g bedecked
```

You can also use bedecked locally in your app:

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

Bedecked exposes options to switch its theme, transition style, templating engine, 
and more. 

Run `bedecked --help` for more information.

**NOTE**: bedecked looks for three consecutive new lines to insert slide breaks.

### API

The bedecked module exports a single method:

```javascript
var bedecked = require('bedecked')
  , presentationFile = 'path/to/my/prez.md'
  , opts = {
      engine: 'markdown', // markdown | jade | html
      core: {css: [/*styles*/], js: [/*scripts*/]},
      theme: {css: [/*styles*/], js: [/*scripts*/]},
      transition: {css: [/*styles*/], js: [/*scripts*/]},
      extensions: [{name: 'foobar', css: [/*styles*/], js: [/*scripts*/]}],
      vendor: [{name: 'blargus', css: [/*styles*/], js: [/*scripts*/]}],
      cdn: [{name: 'jFoo', css: [/*styles*/], js: [/*scripts*/]}]
    }
  , callback = function(err, html) {/* do something with html */};

// NOTES
// 
//  - engine should be one of 'markdown', 'jade', or 'html' to match your markup
//    file.
//
//  - core, theme, transition: These are for core deck.js scripts, theme styles,
//    and transition styles respectively. Note that you need not specify both
//    the css and js for each. I.e. {css: ['/abc/file1.css', '/abc/file2.css']}
//    is fine.
// 
//  - the extensions array corresponds to css and js files for various deck.js
//    extensions. These are inlined and given a comment header corresponding to
//    their 'name' attribute for easier alterations later if needed.
//
//    Out of the box these extensions are provided:
//     - "goto" (press "g")
//     - "menu" (press "m")
//     - "navigation"
//     - "status"
//     - "hash"
//
//  - vendor is currently used for a special cut of the lovely modernizr
//    library. Items are inlined so you could also make use of this option if
//    you prefer to inline jQuery rather than pull it from a CDN. Similar to the
//    extensions these take a name attribute for identification in the final
//    html file.
//
//  - cdn: files here are referenced by url and not inlined in the presentation.
//    Currently only jQuery is listed here. Note that if you decide to inline
//    jQuery you may experience issues with live reloading.

bedecked(presentationFile, opts, callback);
```

### Live Reloading

It would be a real pain to have to run `bedecked` whenever you wanted to see
your latest changes. Bedecked ships with a live reload server to support
interactive presentation development. Try `bedecked --server my_prez.md` or view
`bedecked help server` for more information.

## Testing

Test and lint with `grunt`.

## License

MIT
