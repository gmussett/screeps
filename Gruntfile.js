module.exports = function(grunt) {
    var config = require('./.secrets.json')

    grunt.loadNpmTasks('grunt-https-proxy');
    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
      screeps: {
          options: {
              email: config.email,
              password: config.password,
              branch: 'simulator',
              ptr: false
          },
          dist: {
              files: [
                  {
                      expand: true,
                      cwd: 'sim/',
                      src: ['**/*.js'],
                      flatten: true
                  }
              ]
          }
      }
    }
  );
}
