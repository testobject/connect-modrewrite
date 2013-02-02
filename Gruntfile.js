module.exports = function(grunt) {

  var urlRewrite = require('./src/main');

  // Project configuration.
  grunt.initConfig({

    jshint: {
      options: {
        asi: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        camelcase: true,
        unused: true,
        node: true
      },
      globals: {
      },
      files: [
        'src/**/*.js'
      ]
    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: 'example',
          keepalive: true,
          middleware: function(connect, options) {
            return [
              urlRewrite([
                '^/friends$ /index.html',
                '^/friends/(.*)$ /index.html [L]'
              ]),
              connect.static(options.base)
            ]
          }
        }
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'connect']);

};