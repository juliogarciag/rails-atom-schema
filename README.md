# Rails Atom Schema

This is a package to show the schema state of each Rails model in Atom. The idea is to improve it to show more amazing things such as displaying a DER of the entire app and relationships between one model and other ones. This first commit is basically a POC to see if doing this is possible. In order to make a single release, each item of the roadmap has to be completed. The goal there is to have good developer UX and enough extensibility to provide further features.

## 1.0 ROADMAP
- [x] TOOLING: Add ESLint with minimal rules mostly focused on preventing errors when writing components and importing/exporting modules.
- [x] UX: Add a caché mechanism so if the `schema.rb` file doesn't change, we can reuse the previous view of the model schema related to a single model. This requires some level of planning and state redesign to make it work. The main reason for this is that calling `rails runner` can be slow depending on the size of the project. (I'm deciding myself against using a long-running server in order to not consume more resources at all times when a one-off process that will only be called when strictly needed is enough.)
- [x] REFACTOR: Sort out the code that makes the main dispatches when an editor changes so it lives on its own file.
- [x] UI/UX: Show columns in a pretty and scalable way. (disclaimer: I'm not a designer)
- [x] UX: Allow the user to copy the name of a column to the clipboard.
- [ ] UX: Show extended column attributes (limit, precision, scale, allows null and default) in a tooltip or as a new row under each column row.
- [ ] UX: Show columns with indexes in a special way.
- [ ] UX/REFACTOR: Remove ruby's parser and ruby executable dependencies.
- [ ] UX/REFACTOR: Remove all unneeded dependencies.
- [ ] UX: Test with Rails 4.x and Rails 5.x applications.
- [ ] BUG: Loading/Schema State mess up when changing tabs faster than the ruby script runs.
- [ ] BUG: Model name recognition fails at `Namespace::Model` class names.
- [ ] UX: Explictly sort the columns. (id first, timestamps last)

## 1.1 ROADMAP
- [ ] UI: Show associations with links to other files.
