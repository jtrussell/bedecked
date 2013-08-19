# Bedecked

Bedecked lets you convert markdown files to portable html5 presentations.

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

Run `bedecked --help` for more information.

**NOTE**: bedecked looks for three new line (or two blank lines) in a row to
insert slide breaks.

### API

The bedecked module exports a single method:

```javascript
var bedecked = require('bedecked')
  , presentationFile = 'path/to/my/prez.md'
  , opts = {/* ... */}
  , callback = function(err, html) {/* do something with html */};

bedecked(presentationFile, opts, callback);
```

*(additional info coming soon)*

## License

MIT
