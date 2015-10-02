'use strict';

xdescribe('VoxelType', function() {
  it('takes a name', function() {
    var voxelType = new cubed.VoxelType('foo');

    expect(voxelType.name).toEqual('foo');
  });

  it('takes misc data', function() {
    var voxelType = new cubed.VoxelType('foo', {herp: 'derp'});
    expect(voxelType.data).toEqual({herp: 'derp'});
  });
});
