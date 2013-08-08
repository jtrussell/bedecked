# Bedecked

Bedecked is a small app that lets you convert markdown files to portable html5
presentations.

Inspired by [hackynote](https://github.com/thiagofelix/hackynote), I wanted a
simple way to build snazzy presentations from markdown files that I could export
as standalone HTML. Pop those guys in your public dropbox folder (or S3, or
whatever) and share.

Right now we're in the "proof of concept" stage. It's working, it does things
that are arguably useful... but only enough for me to pump out a few
presentations for this week :o.

## Installation

To give it a try checkout this repo, `cd` on in and...

```
npm install
bower install
```

## Usage

`prez.md` is your presentation "script", use three or more new lines in a row to
separate slides. This ultimately gets baked into `tmp/prez.html`. We've got a
few helpful grunt tasks to get you there:

  - `grunt` Run without arguments to build a presentation html file
  - `grunt server` Makes your presentation, shows it in a browser, then waits
    for changes so it can show you those too.

Right now the only way to change themes is to modify the files included in the
`cssmin:prep` task.

## Possible future work?

  - `bedecked-cli` markdown file in, prez out

## License

MIT
