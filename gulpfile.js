const { src, dest, series, parallel, watch } = require('gulp');

function releaseZip () {

	const glob = require('glob');
	const fs = require('fs-extra');
	const zip = require('gulp-zip');

	// remove dot files - could make this remove .DS_Store
	glob('Extension/**/.*', {}, function (er, files) {
		for (let file of files) {
			console.log(`Removing: ${file}`);
			fs.unlinkSync(file);
		}
	});

	try { fs.rmdirSync('/tmp/HideActivity') } catch (err) { }
	fs.copySync('Extension', '/tmp/HideActivity');
	try { fs.rmdirSync('/tmp/HideActivity/js/debug.js') } catch (err) { }
	try { fs.rmdirSync(process.env.HOME+'/Desktop/HideActivity.zip') } catch (err) { }

	console.log('Run these commands to check your zip for lice');
	console.log('zip -d ~/Desktop/HideActivity.zip __MACOSX/\*');
	console.log('unzip -vl ~/Desktop/HideActivity.zip');

	return src('/tmp/HideActivity/**/*')
		.pipe(zip('HideActivity.zip'))
		.pipe(dest(process.env.HOME+'/Desktop'));
}

function copyManifest () {

	if (process.argv[process.argv.length-1].includes('fx')) {

		const jeditor = require("gulp-json-editor");

		return src('manifest.json')
			.pipe(jeditor({
				"applications": {
					"gecko": {
						"id": "addon@example.com",
						"strict_min_version": "42.0"
					}
				}
			}))
			.pipe(dest('Extension'));
	} else {
		return src('manifest.json')
			.pipe(dest('Extension'));
	}
}


exports.manifest = copyManifest;

exports.release = releaseZip;
