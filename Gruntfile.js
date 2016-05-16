function mixin(destination) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      destination[key] = source[key];
    }
  }
  return destination;
}

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-tslint');
  grunt.loadNpmTasks('grunt-tsconfig');

  var tsconfigContent = grunt.file.read('tsconfig.json');
  var tsconfigFile = JSON.parse(tsconfigContent);
  var tsOptions = mixin({}, tsconfigFile.compilerOptions, {
    failOnTypeErrors: true,
    fast: 'never'
  });

  var packageJson = grunt.file.readJSON('package.json');

  grunt.initConfig({
    name: packageJson.name,
    version: packageJson.version,
    packageJson: packageJson,
    tsconfigFile: tsconfigFile,
    all: [
      "./app/*.ts",
      "./app/**/*.ts",
      "./app/**/**/*.ts",
      "./app/*.tsx",
      "./app/**/*.tsx",
      "./app/**/**/*.tsx",
      "./typings.d.ts"
    ],
    skipTests: ['<%= all %>', '!tests/**/*.ts'],
    staticTestFiles: ['tests/**/*.{html,css,json,xml}'],
    devDirectory: '<%= tsconfigFile.compilerOptions.outDir %>',


    ts: {
      options: tsOptions,
      dev: {
        src: ['<%= all %>']
      },
      dist: {
        options: {
          inlineSourceMap: true,
          inlineSources: true
        },
        outDir: 'dist',
        src: ['<%= skipTests %>']
      }
    },

    tslint: {
      options: {
        configuration: grunt.file.readJSON('tslint.json')
      },
      src: {
        src: [
          '<%= all %>',
          '!typings/*.ts',
          '!typings/**/*.ts',
          '!tests/typings/**/*.ts'
        ]
      }
    },

    tsconfig: {
      make: {
        options: {
          filesGlob: '<%= all %>',
          additionalOptions: {
            compilerOptions: {
              "module": "amd",
              "noImplicitAny": true,
              "outDir": "app",
              "removeComments": false,
              "sourceMap": true,
              "jsx": "react",
              "target": "es5",
              "moduleResolution": "node",
              "isolatedModules": false,
              "experimentalDecorators": true,
              "emitDecoratorMetadata": true,
              "declaration": false,
              "noLib": false,
              "preserveConstEnums": true,
              "suppressImplicitAnyIndexErrors": true
            },
          }

        }
      }
    },

    watch: {
      grunt: {
        options: {
          reload: true
        },
        files: ['Gruntfile.js']
      },
      src: {
        options: {
          atBegin: true
        },
        files: ['<%= all %>', '<%= staticTestFiles %>'],
        tasks: [
          'dev'
        ]
      }
    }
  });

  grunt.registerTask('dev', [
    'tsconfig',
    'tslint',
    'ts:dev'
  ]);

};