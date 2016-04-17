/**
 * @fileoverview This file contains the locations of the static map objects.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

/**
 * Empty constructor for the Map class.
 */
function Map() {
  throw new Error('Map should not be instantiated!');
}

/**
 * @const
 * @type {Array<Object>}
 */
Map.ENTITIES = [];

Map.randomBox = function() {
  return {
    position: [Util.randRangeInt(-1000, 1000),
               5,
               Util.randRangeInt(-1000, 1000)],
    hitboxSize: Util.randRangeInt(5, 20)
  };
}

if (typeof module === 'object') {
  /**
   * If this is being imported on the server side, then we load this with
   * module.exports.
   */
  module.exports = Map;
} else {
  /**
   * Otherwise, we load it into the global namespace.
   */
  window.Map = Map;
}
