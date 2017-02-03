module.exports = {
    express: {
        files: ['src/server/server.js', 'grunt/**/*.js'],
        tasks: ['express'],
        options: {
            spawn: false,
            livereload: 35731
        }
    },
    scripts: {
        files: ['src/js/**/*.js'],
        options: {
            spawn: false,
            livereload: 35731
        }
    },
    html: {
        files: ['src/**/*.html', 'src/js/**/*.js', 'src/css/**/*.css'],
        options: {
            spawn: false,
            livereload: 35731
        }
    },
    less: {
        files: 'src/css/less/**/*.less',
        tasks: ['recess:less']
    }
};
