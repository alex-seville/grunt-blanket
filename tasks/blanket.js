/*
 * grunt-blanket
 * https://github.com/alex-seville/grunt-blanket
 *
 * Copyright (c) 2013 alex-seville
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('blanket', 'Instrument files with Blanket.js', function() {
    var blkt = require("blanket");
    // Merge task-specific and/or target-specific options with these defaults.    
    var options = this.options();
    blkt.options({ "data-cover-flags": options} );

    var done = this.async();

    // Iterate over all specified file groups.
    grunt.util.async.forEachSeries(this.files,function(f,n) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });
      grunt.util.async.forEachSeries(src,function(filepath,next) {
        // Read file source.
        var inFile = grunt.file.read(filepath);
        
        blkt.instrument(
          {
            inputFile: inFile,
            inputFileName: filepath
          },function(instrumented){
            grunt.file.write(f.dest+filepath, instrumented);
            next();
          });
        
      },n);

      // Print a success message.
      grunt.log.writeln('File instrumented.');
    },done);
    
  });

};
