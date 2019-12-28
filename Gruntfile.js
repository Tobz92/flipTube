module.exports = function (grunt) {
    grunt.initConfig({
        cssmin: {
            dist: {
                files: {
                    'dist/css/styles.css': 'css/styles.css'
                }
            }
        },
        terser: {
            dist: {
                files: {
                    'dist/js/mirror.js': 'js/mirror.js'
                }
            }
        },
        copy: {
            dist: {
                files:[
                    {
                        expand: true, src: ['img/*', 'manifest.json'], dest: 'dist/', filter: 'isFile'},
                ]
            }
        },
        zip: {
            dogshit: {
                cwd: 'dist/',
                src: 'dist/**   ',
                dest: '<%= grunt.template.today("yyyy-mm-dd") %>_ft.zip',
            }
        }

});
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-terser');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-zip');

    grunt.registerTask('build', ['cssmin','terser', 'copy', 'zip']);
};