//  qgis_process run qgis:tilesxyzdirectory --PROJECT_PATH=/home/honza/Projects/gamekeeper-report/app/lib/qgis/tiles-test.qgz -- BACKGROUND_COLOR=rgba(0,0,0,0) TILE_FORMAT=0 METATILESIZE=4 TILE_WIDTH=256 TILE_HEIGHT=256 TMS_CONVENTION=False OUTPUT_HTML=TEMPORARY_OUTPUT OUTPUT_DIRECTORY=/tmp/d20211126-15317-18ir29j ZOOM_MIN=8 ZOOM_MAX=8 EXTENT=1586370.051100000,1639167.294200000,6438156.611100000,6480668.676900000 [EPSG:3857]

var mapnik = require("mapnik");
var fs = require("fs");
mapnik.register_default_fonts();
mapnik.register_default_input_plugins();

var width = 512;
var height = 512;
var name = 'map.png';

var map = new mapnik.Map(width, height);
map.load("./data/stylesheet.xml", {}, function(err, map) {
    map.zoomToBox(1586370.051100000,1639167.294200000,6438156.611100000,6480668.676900000);
    var im = new mapnik.Image(width, height);
    map.render(im, function(err, im) {
        im.encode("png", function(err, buffer) {
            fs.writeFile(`tiles/${name}`, buffer, () => {
              console.log('success');
            });
         });
    });
});