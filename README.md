jquery-mastercheckbox
=====================

This is a simple plugin that allows you to designate a single checkbox in a list
or group of checkboxes to be the the master "select all" or "deselect all" checkbox.

The plugin is written with thhe following features:

* Simple selector - just select any element that wraps a group of checkboxes, and an
  optional selector that indicates which checkbox is the master.
* When the master checkbox is set or reset, all other checkboxes in the group will follow.
* When all non-master checkboxes in a group are selected, or one is not selected, then the
  master checkbox will follow that.
* As many groups as you like are permitted on a page, and each group can use identical
  selectors for simplicity.

Visually, it would look like this:

    [ ] Select/deselect All
    [x] Option 1
    [x] Option 2
    [ ] Option 3 etc.

A demo can be found here:

http://www.acadweb.co.uk/mastercheckbox/

There are lots of tutorials and examples of how to do this, but I could not find a simple
plugin that encapsulated all the best features and supported flexible selectors to make
it simple to use and reuse. This is why the plugin was created.

See index.html for the demo and example syntax.

