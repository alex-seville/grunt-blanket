# grunt-blanket

> Instruments files with [Blanket.js](http://blanketjs.org) in the "traditional" manner of creating physical instrumented copies of the files.  Ideal for situations where you'd like to use mocha or browser based test coverage, but don't want to have to use a non-JS solution to instrument your files.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-blanket --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-blanket');
```

## The "blanket" task

### Overview
In your project's Gruntfile, add a section named `blanket` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  blanket: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

Only the data-cover-flags from Blanket are accepted as options.  They may add some needed functionality, but you likely won't need them.


### Usage Examples

#### Default Options
In this example, our source files are contained in 'src' and we want them to be instrumented and then stored in 'src-cov'.

NOTE: The src parameter MUST be a directory.  Patterns like "src/*.js" will fail.  Individual files can be included or excluded via the pattern option.

```js
grunt.initConfig({
  blanket: {
    options: {},
    files: {
      'src-cov/': ['src/'],
    },
  },
})
```

## Test runner
Please update the path in your test runner to point to the instrumented files.  This can be automated through a different grunt task, or coded manually.

Also, the coverage details are only viewable with the mocha reporter, for now.  A copy of the blanket reporter may be made available at a later date.
