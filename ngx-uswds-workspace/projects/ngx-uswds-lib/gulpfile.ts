/* gulpfile.js */

/**
* Import uswds-compile
*/
const uswds = require("@uswds/compile");

/**
* USWDS version
* Set the major version of USWDS you're using
* (Current options are the numbers 2 or 3)
*/
uswds.settings.version = 3;

// Source Path Settings
uswds.paths.src.uswds = "";
uswds.paths.src.sass = "";
uswds.paths.src.theme = "";
uswds.paths.src.fonts = "";
uswds.paths.src.img = "";
uswds.paths.src.js = "";
uswds.paths.src.projectSass = "";
uswds.paths.src.projectIcons = "";

// Destination Path Settings
uswds.paths.dist.theme = './sass';
uswds.paths.dist.img = './assets/uswds/images';
uswds.paths.dist.fonts = './assets/uswds/fonts';
uswds.paths.dist.js = './assets/uswds/js';
uswds.paths.dist.css = './assets/uswds/css';

// Export Settings (npx gulp <command>)
exports.init = uswds.init;
exports.compile = uswds.compile;
exports.watch = uswds.watch;
