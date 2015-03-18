/*
 * Awesome tutorial - http://blog.elenakolevska.com/using-grunt-with-laravel-and-bootstrap/
 */
module.exports = function(grunt) {

  //Initializing the configuration object
  grunt.initConfig({

    // Task configuration
    concat: {
      options: {
        separator: "\n"
      },
      all: {
        src: [
          "./src/*.js"
        ],
        dest: "./dist/models.js"
      }
    },

    // Coming soon
    //less{
      //...
    //},

    uglify: {
      options: {
        mangle: false
      },
      all: {
        files: {
          "dist/models.min.js": [ "dist/models.js" ]
        }
      }
    },

    watch: {
      all: {
        files: [
          './src/*.js'
        ],
        tasks: ['concat:all','uglify:all'],     //tasks to run
        options: {
          livereload: true                        //reloads the browser
        }
      }//,
      //less: {
      //  files: ['./app/assets/stylesheets/*.less'],  //watched files
      //  tasks: ['less'],                          //tasks to run
      //  options: {
      //    livereload: true                        //reloads the browser
      //  }
      //},
      //tests: {
      //  files: ['app/controllers/*.php','app/models/*.php'],  //the task will run only when you save files in this location
      //  tasks: ['phpunit']
      //}
    }

  });

  // // Plugin loading
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Task definition
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['concat:all','uglify:all']);

};