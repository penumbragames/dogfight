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
Map.ENTITIES = [
  {
    position: [10, 5, 10],
    hitboxSize: 10
  },
  {
    position: [20, 2, 20],
    hitboxSize: 4
  }
];
