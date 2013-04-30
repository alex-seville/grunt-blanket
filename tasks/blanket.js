/*
 * grunt-blanket
 * https://github.com/alex-seville/grunt-blanket
 *
 * Copyright (c) 2013 alex-seville
 * Licensed under the MIT license.
 */

'use strict';

var path = require("path");

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('blanket', 'Instrument files with Blanket.js', function() {
    
    // Merge task-specific and/or target-specific options with these defaults.    
    var options = this.options({
      extensions: ['.js']
    });
    var blkt = require("blanket")({
      "data-cover-flags": options,
      "data-cover-only": options["data-cover-only"] || options["pattern"] || "*"
    });

    var done = this.async();

    // Iterate over all specified file groups.
    grunt.util.async.forEachSeries(this.files,function(f,n) {
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
      grunt.util.async.forEachSeries(src,function(filepath,next) {
        grunt.file.recurse(filepath, function(abspath, rootdir, subdir, filename){
          if (options.extensions.indexOf(path.extname(filename)) > -1){
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
    },done);
    
  });

};
