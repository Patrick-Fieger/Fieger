var destination = 'public/';
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
          main: {
          	expand: true,
            dot: true,
            src: 'www/**',
            dest: destination
          },
        },
        jshint: {
            dev: {
                src: [
                    destination+'www/js/custom/*.js',
                    destination+'www/js/angular/**/**.js'
                ]
            }
        },
        uglify: {
              minify: {
                options:{
                  mangle: {
                    except: ['jQuery', 'angular'],
                    mangle:false
                  }
                },
                files: [{
                    expand: true,
                    src: [destination+'www/js/custom/custom.min.js']
                }]
              }
        },
        cssmin: {
          target: {
            files: [{
                expand: true,
                src: [destination+'/www/css/**.css'],
                dest: ''
            }]
          },
          onefile:{
          	files: {
      			'public/www/css/app.css': [
      				'public/www/css/foundation.css',
      				'public/www/css/fonts.css',
					   'public/www/css/spezial.css',
					     'public/www/css/tidy.css',
					'public/www/css/lightbox.css',
          'public/www/css/photoswipe.css',
          'public/www/css/default-skin.css'
      			]
    		}
          }
        },
        imagemin: {                          
            dynamic: {
              files: [{
                expand: true,
                cwd: destination+'/www/img/',
                src: ['**/*.{png,jpg,gif}',destination+'/www/img/**/*.{png,jpg,gif}'],
                dest: destination+'/www/img/'
              }]
            }
        },
        uncss: {
            dist: {
              options: {
                csspath      : '../../css/',
                stylesheets  : ['style.css']
                
              },
              files: {
                'public/www/css/tidy.css': [destination+'www/js/templates/**/**.html']
              }
            }
        },
        htmlmin: {
		      multiple: {
		      	options: {
		          removeComments: true,
		          collapseWhitespace: true
		        },
		        files: [{                            
		          expand: true,
		          cwd: destination+'www/',
		          src: '**/*.html',
		          dest: destination+'/www'
		        }]
		      }
		},
		concat: {
		  all: {
		    files: {
		      'public/www/js/custom/custom.min.js': [
		      	destination+'www/js/custom/events.js',
		      	destination+'www/js/custom/fieger.js'
		      ],
		      'public/www/js/core/core.min.js':[
		      	destination+'www/js/core/angular.min.js',
				    destination+'www/js/core/angular-route.min.js',
				    destination+'www/js/core/angular-animate.js',
				    destination+'www/js/core/angular-sanitize.js',
				    destination+'www/js/core/route.js',
				    destination+'www/js/core/local.js',
				    destination+'www/js/core/jquery.js',
				    destination+'www/js/core/jquery.bxslider.min.js',
				    destination+'www/js/core/lightbox.js',
				    destination+'www/js/core/jquery.vmap.packed.js',
				    destination+'www/js/core/jquery.vmap.world.js',
				    destination+'www/js/core/nprogress.js',
				    destination+'www/js/core/isotope.js',
				    destination+'www/js/core/easing.js',
				    destination+'www/js/core/highlight.js'
		      ]
		    },
		  },
		},
    ngmin: {
      controllers: {
        src: [destination+'www/js/angular/ctrl/*.js'],
        dest: destination+'www/js/angular/all.js'
      }
    },
    autoprefixer: {
      single_file: {
        options: {
          browsers: ['last 2 versions']
        },
        src: destination+'www/css/app.css',
        dest: destination+'www/css/app.css'
      }
    }
    });
    
    grunt.registerTask('build_all', ['copy','uglify','cssmin:target','uncss','cssmin:onefile']);
    // 'htmlmin'
    grunt.registerTask('build', ['copy','cssmin:target','uncss','ngmin','cssmin:onefile','concat','uglify','autoprefixer']);
    grunt.registerTask('linting', ['copy','jshint']);
    grunt.registerTask('css_min', ['copy','cssmin:target','uncss']);
};