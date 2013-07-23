# Bedecked

Inspired by [hackynote](https://github.com/thiagofelix/hackynote), I wanted a
simple way to build snazzy presentations from markdown files that I could export
as standalone HTML. Pop those guys in your public dropbox folder (or S3, or
whatever) and share.

Right now we're in the "proof of concept" stage. It's working, it does things
that are arguably useful... but only enough for me to pump out a few
presentations for this week :o.

To give it a try checkout this repo, `cd` on in and...

```
npm install
bower install
```

Running `grunt` will turn `prez.md` into `prez.html`. By default we're treating a
string of three newlines as "slide breaks" for presentation purposes.

Run `grunt dist` to create a distribution of your presentation. A `dist` folder will
be created in the project's root folder. Inside is a `public` folder with the following
contents:

```
core/
extensions/
themes/
vendor/
prez.html
```

Copy this stuff into your dropbox's public folder and you're ready to go!
