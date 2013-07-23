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
Go on and share your presentation html file.

NOTE: Want to change themes/transitions? Modify the input for the grunt
`cssmin:prep` task.
