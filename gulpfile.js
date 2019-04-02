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
						"id": "HideActivity@example.com",
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

function encodeSVG () {
	var svgToMiniDataURI = require('mini-svg-data-uri');
	var svg = "<svg width='18' height='18' viewBox='-40 -100 1100 1100' xmlns='http://www.w3.org/2000/svg'><path fill='#474747' d='M128 960c-35.333 0-65.5-12.5-90.5-37.5S0 867.333 0 832V192c0-35.333 12.5-65.5 37.5-90.5S92.667 64 128 64h256v128H160c-8.667 0-16.167 3.167-22.5 9.5-6.333 6.333-9.5 13.833-9.5 22.5v576c0 8.667 3.167 16.167 9.5 22.5 6.333 6.333 13.833 9.5 22.5 9.5h576c8.667 0 16.167-3.167 22.5-9.5 6.333-6.333 9.5-13.833 9.5-22.5V576h128v256c0 35.333-12.5 65.5-37.5 90.5S803.333 960 768 960H128zM576 64c-18 0-33.167-6.167-45.5-18.5C518.167 33.167 512 18 512 0s6.167-33.167 18.5-45.5C542.833-57.833 558-64 576-64h384c8.667 0 17 1.667 25 5s14.667 8 20 14c6 5.333 10.667 12 14 20s5 16.333 5 25v384c0 18-6.167 33.167-18.5 45.5C993.167 441.833 978 448 960 448s-33.167-6.167-45.5-18.5C902.167 417.167 896 402 896 384V155L617 434c-12.667 12-27.833 18-45.5 18s-32.833-6-45.5-18c-12-12.667-18-27.833-18-45.5s6-32.833 18-45.5L805 64H576z'/></svg>";
	var optimizedSVGDataURI = svgToMiniDataURI(svg);
	console.log(optimizedSVGDataURI);
}

exports.svg = encodeSVG;

exports.manifest = copyManifest;

exports.release = releaseZip;
