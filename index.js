var fs = require('fs-extra');
var path = require('path');
var sass = require('sass');
var scss_filename = './sass/all.scss'

var cssFolderPath = './docs/css';
var cssFileName = 'style.css';
var targetCSSFile = path.join(cssFolderPath, cssFileName);

sass.render({
    file: scss_filename,
    outFile: targetCSSFile
  }, 
  function(err, result) {
    if (!err) {
      console.log(result)
      fs.writeFile(targetCSSFile, result.css, function(err){
        if(!err){
          //file written on disk
          console.log('CSS written:', cssFileName)
          duplicateFolder()
        } else {
          console.error('Error writting css file', cssFileName)
        }
      });
    } else {
      console.error('Sass Error', err)
    }
  });

const duplicateFolder = function () {
  var srcDir = './docs'
  var destTmp = './.tmp/support-center'
  var destDir = './docs/support-center'

  fs.emptyDir(destTmp, err => {
    if (err) return console.error(err)
    fs.emptyDir(destDir, err => {
      if (err) return console.error(err)
      try {
        fs.copySync(srcDir, destTmp)
        console.log('success!')
        try {
          fs.copySync(destTmp, destDir)
        } catch (err) {
          console.error(err)
        }
      } catch (err) {
        console.error(err)
      }
  
      console.log('success!')
    })
  })
}