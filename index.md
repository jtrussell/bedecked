# Hello, Bedecked
## ( &#8594; )


## Bedecked

> 1 - **verb**<br />
>   decorate.<br />
>   "He led us into a room **bedecked** with tinsel"<br />
> <br />
> 2 - **noun**<br ./>
>   awesome presentation generator.<br ./>
>   "I made this presentaion with **bedecked**."


Fancy presentation tools require bulky software or ninja coding and design
skills.

Bedecked does not.

<span class="fragment">But if you have those skills, that's cool too.</span>


Presentations are written as text files, e.g. markdown:

```
# I'm a slide title!

I'm some slide text!
```


Bedecked inserts slide breaks when there are two or more empty lines in a row:

```
 # I'm a slide!

 
 ## I'm another slide!
 
 
 
 ## I'm a third!

 With some text.
```


We're using the awesome reveal.js presentation framework. So you can have sweet
features like basement slides...

## ( &#8595; )


  ... and [lots of other neat stuff](https://github.com/hakimel/reveal.js) too.

  ## ( &#8595; )


  By the way you make basement slides in bedecked by indenting:

  ```
   ## I'm a top level side
   
   
     ## I'm a basement slide
   
   
     ## Yet another basement slide
   
   
   ## Back to the top level
  ```

  ## ( &#8594; )


## Markdown + HTML
Bedecked presentations are just text files. If you know markdown you can make
awesome presentations.

(If you don't [it's super easy](https://daringfireball.net/projects/markdown/basics))


Don't believe me? Check out the markdown for this presentation:

[Clicky.](https://raw.githubusercontent.com/jtrussell/bedecked/gh-pages/index.md)


## Why text files?

- Focus on your *content* while writing, not style.
- Have a text editor? You're ready to start writing.
- Have a browser? You can view a presentation.


Exporting a single HTML file means presentations are easy to share with Dropbox
or S3.

Mobile users can enjoy your presentations too.

> ( Markdown ) &#65515; ( Presentation HTML )


  By the way you don't have to use markdown. Jade and vanilla HTML are fine too.


## Sold. Where can I get it?

- On [npm](https://www.npmjs.org/package/bedecked)
- on [github](https://github.com/jtrussell/bedecked)
