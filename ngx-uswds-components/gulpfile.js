const uswds = require("@uswds/compile");

uswds.settings.version = 3;

uswds.paths.src.projectSass = "./projects/uswds-component-demo/src/styles/styles.scss";

uswds.paths.dist.theme = "./projects/uswds-component-demo/src/sass";
uswds.paths.dist.img = "./projects/uswds-component-demo/src/assets/uswds/images";
uswds.paths.dist.fonts = "./projects/uswds-component-demo/src/assets/uswds/fonts";
uswds.paths.dist.js = "./projects/uswds-component-demo/src/assets/uswds/js";
uswds.paths.dist.css = "./projects/uswds-component-demo/src/assets/uswds/css";

uswds.paths.src.theme = './node_modules/@uswds/uswds/dist/theme';
uswds.paths.src.fonts = './node_modules/@uswds/uswds/dist/fonts';
uswds.paths.src.img = './node_modules/@uswds/uswds/dist/img';
uswds.paths.src.js = './node_modules/@uswds/uswds/dist/js';

exports.init = uswds.init;
exports.compile = uswds.compile;
exports.watch = uswds.watch;