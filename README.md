# Rails Atom Schema

This is a package to show the schema state of each Rails model in Atom. The idea is to improve it to show more amazing things such as displaying a DER of the entire app and relationships between one model and other ones. This first commit is basically a POC to see if doing this is possible. In order to make a single release, each item of the roadmap has to be completed. The goal there is to have good developer UX and enough extensibility to provide further features.

## 0.1 ROADMAP
- [x] TOOLING: Add ESLint with minimal rules mostly focused on preventing errors when writing components and importing/exporting modules.
- [x] UX: Add a caché mechanism so if the `schema.rb` file doesn't change, we can reuse the previous view of the model schema related to a single model. This requires some level of planning and state redesign to make it work. The main reason for this is that calling `rails runner` can be slow depending on the size of the project. (I'm deciding myself against using a long-running server in order to not consume more resources at all times when a one-off process that will only be called when strictly needed is enough.)
- [x] CODE QUALITY: Sort out the code that makes the main dispatches when an editor changes so it lives on its own file.
- [x] UI/UX: Show columns in a pretty and scalable way. (disclaimer: I'm not a designer)
- [x] UX: Allow the user to copy the name of a column to the clipboard.
- [x] UX: Remove ruby's parser and ruby executable dependencies.
- [x] BUG: Model name recognition fails at `Namespace::Model` class names.
- [x] UX: Explictly sort the columns. (id first, timestamps last)
- [x] BUG: Loading/Schema State mess up when changing tabs faster than the ruby script runs.
- [x] CODE QUALITY: Use async action creators instead of the handleEditorChange function. (Used sagas in the end)
- [x] CODE QUALITY: Add jest specs.

## 1.0 ROADMAP
- [x] IDEA: Make the load from rails project functionality evident to the user:
  - [x] Load all the models preemptively when using it for the first time in a given project.
  - [x] Fix issue when abandoning a project for another one when the first one takes a lot of time to load.
  - [x] Serialize the state of the models per project so it's loaded from a local storage instead of loading the data again if the user reo pens the project.
  - [x] Watch for changes in the schema to reflect on the view.
- [ ] Add a button to Reload the schema.
- [ ] Add option to add a mapping between a ruby file and a model. (that will be serialized)

## 1.1 ROADMAP
- [ ] Ensure deserialization works with styles.
- [ ] Ensure it works with multiple rails projects open side by side.

## 1.2 ROADMAP
- [ ] UI: Show columns with indexes.
- [ ] UI: Show extended column attributes (limit, precision, scale, allows null and default).
- [ ] UI: Show associations with links to other files.
