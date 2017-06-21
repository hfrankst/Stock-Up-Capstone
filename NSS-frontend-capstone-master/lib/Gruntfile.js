module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        predef: [ "document", "console", "$", "$scope", "L", "window" ],
        esnext: true,
        globalstrict: true,
        globals: {"angular": true, "app": true, "stock_up": true}
      },
      files: ['../app/**/*.js']
    },
    watch: {
      javascripts: {
        files: ['../app/**/*.js'],
        tasks: ['jshint']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['jshint', 'watch']);
};