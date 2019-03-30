## IMPORTANT
I no longer maintain this package, as I no longer use Atom as my editor. If you want to fork it, feel free to do it. If someone wants to take care of the package in the Atom repository, please make an issue about it, so we can get in contact and coordinate.

# Rails Atom Schema

This is a package to show the schema state of each Rails model in Atom, but its architected in a way that it would allow to show more amazing things such as a DER of the entire app and maps of the relationships between models in the future.

![](https://cl.ly/043M1h1J2s18/Screen%20Recording%202017-11-12%20at%2009.12%20PM.gif)

To activate it, use the following command from the command palette: `rails-atom-schema:toggle` or `ctrl-alt-s`.

## About a previous package...

This is a rewrite from scratch of the [Atom Rails Model Schema](https://github.com/juliogarciag/atom-rails-model-schema) package. The approach I used in that package was highly unscalable because at that time, atom panels didn't exist, the file watcher was far from stable (it had random problems when someone ran `rake db:migrate` because of it), and it relied heavily on just regular expressions instead of calling the proper Rails code which has the real source of truth.

So I decided to rewrite it from scratch with the idea of making it as robust and extensible as possible, so it could accomodate new features without really weird fights with regular expressions and unsynchronized watchers.

So, if you're still using [Atom Rails Model Schema](https://github.com/juliogarciag/atom-rails-model-schema), please use this package instead. :wink:

## Contributing

Pull requests are welcome. Just take these points into account:

- This package is basically a React - Redux - Redux Saga application working on a pane, so if you know those technologies, that will help.
- Use Prettier and ESLint to format and lint the code.
- Tests are written with Jest, and they should be always passing.

## Roadmap
A detailed plan of what's next is in the [ROADMAP](ROADMAP.md) file.
