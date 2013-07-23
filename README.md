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

Now run `grunt` to turn `prez.md` into `prez.html`. By default we're treating a
string of three newlines as "slide breaks" for presentation purposes. That's it!
Go on and share your presentation html file. Well... almost...

For ease of development that final `prez.html` page references some external
assets. You'll need to create a new folder inside your dropbox's public folder
that looks like this:

```
core/
extensions/
themes/
vendor/
prez.html
```

Copy the contents of `bower_components/decks.js/core`,
`bower_components/decks.js/extensions`, and `bower_components/deck.js/themes`
into their corresponding folder listed above. You'll also need to move
`bower_components/deck.js/jquery-1.7.2.min.js` and
`bower_components/deck.js/modernizr.custom.js` into that `vendor` folder. Whew.
Now, at long last, you can be blowing people away with your sweet presentations.
