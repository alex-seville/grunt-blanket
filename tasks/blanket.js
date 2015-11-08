/*
 * grunt-blanket
 * https://github.com/alex-seville/grunt-blanket
 *
 * Copyright (c) 2013 alex-seville
 * Licensed under the MIT license.
 */

'use strict';

var path = require("path");
var async = require("async");

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('blanket', 'Instrument files with Blanket.js', function() {
    
    // Merge task-specific and/or target-specific options with these defaults.    
    var options = this.options({
      extensions: ['.js']
    });
    var blkt = require("blanket")({
      "data-cover-customVariable": options['data-cover-customVariable'],
      "data-cover-flags": options,
      "data-cover-only": options["data-cover-only"] || options["pattern"] || "*"
    });
    //make sure we'e using the blanket loader (require statements are cached, so it might not be called each time)
    blkt.restoreBlanketLoader();

    var done = this.async();

    // Iterate over all specified file groups.
    async.eachSeries(this.files,function(f,n) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath) || !grunt.file.isDir(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found or is not a directory.');
          return false;
        } else {
          return true;
        }
      });
      async.eachSeries(src,function(filepath,next) {
        grunt.file.recurse(filepath, function(abspath, rootdir, subdir, filename){
          var matchesPattern = (options.pattern === undefined) ||
                               (grunt.file.minimatch(abspath, options.pattern)),
              matchesExtensions = options.extensions.indexOf(path.extname(filename)) > -1;

          if (matchesPattern && matchesExtensions) {
            // Read file source.
            var inFile = grunt.file.read(abspath);
            
            blkt.instrument(
              {
                inputFile: inFile,
                inputFileName: abspath
              },function(instrumented){
                grunt.file.write(path.join(f.dest,(subdir || ""),filename), instrumented);
            });
          }
        });
        next();
      },n);

      // Print a success message.
      grunt.log.writeln('File instrumented.');
    },function () {
      blkt.restoreNormalLoader();
      done();
    });
    
  });

};
