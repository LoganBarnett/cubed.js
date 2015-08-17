# cubed.js #
------------

## ** WARNING: HERE BE DRAGONS ** ##

A library for handling voxel graphics in a 3d environment.

Some example usage:

```javascript
var voxels = [
    {position: {x: 0, y: 0, z: 0}, voxel: 'foo'}
  , {position: {x: 1, y: 0, z: 0}, voxel: 'foo'}
  , {position: {x: 0, y: 1, z: 0}, voxel: 'foo'}
];
// create a grid of voxels that's 3x3x3 (27 total voxels)
var grid = cubed.grid.create({size: {x: 3, y: 3, z: 3}, values: voxels});
// each chunk is 16x16x16 voxels - limits imposed by 3d hardware
var chunks = cubed.grid.generate(grid, {x: 16, y: 16, z: 16}, 1, []);

// do stuff with chunks which contain mesh data
```

## TODO: ##
* [ ] Make sure the interface for generating a grid of chunks is nailed down as documented.
* [ ] Need to account for voxel information - which voxel type is in this cell? Does cubed.js manage a voxel type legend or does the consumer?
* [ ] Account for UV data for texture atlasing.