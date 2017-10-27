module.exports = function(grunt) {
    var config = require('./.secrets.json')

    grunt.loadNpmTasks('grunt-https-proxy');
    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
      proxy: {
        proxy1: {
    	     options: {
             port: 8080,                 // start proxy server, listening to the port 8050
             target: {                   // make it forward all the requests to localhost:8011
               host: '172.31.193.250',
               port: 8080
             }
          }
        }
      },
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
