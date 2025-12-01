const uswds = require("@uswds/compile");

uswds.settings.version = 3;

uswds.paths.src.projectSass = "./projects/ngx-uswds-component-lib/sass";

uswds.paths.dist.theme = "./projects/ngx-uswds-component-lib/src/sass";
uswds.paths.dist.img = "./projects/ngx-uswds-component-lib/src/assets/uswds/images";
uswds.paths.dist.fonts = "./projects/ngx-uswds-component-lib/src/assets/uswds/fonts";
uswds.paths.dist.js = "./projects/ngx-uswds-component-lib/src/assets/uswds/js";
uswds.paths.dist.css = "./projects/ngx-uswds-component-lib/src/assets/uswds/css";

uswds.paths.src.theme = './node_modules/@uswds/uswds/dist/theme';
uswds.paths.src.fonts = './node_modules/@uswds/uswds/dist/fonts';
uswds.paths.src.img = './node_modules/@uswds/uswds/dist/img';
uswds.paths.src.js = './node_modules/@uswds/uswds/dist/js';

exports.init = uswds.init;
exports.compile = uswds.compile;
exports.watch = uswds.watch;