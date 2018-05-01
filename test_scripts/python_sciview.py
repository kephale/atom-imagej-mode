# @SciViewService svs

# An example script that opens SciView and generates 25 random colored cubes

from java.util import Random
from cleargl import GLVector
from array import array

sv = svs.getOrCreateActiveSciView()

num_points = 25

rng = Random()

points = [ [ rng.nextDouble() * 10, rng.nextDouble() * 10, rng.nextDouble() * 10 ] for k in range(num_points) ]

for point in points:
	box = sv.addBox()
	box.setPosition( GLVector( array( 'f', [point[0], point[1], point[2]] ) ) )
	box.getMaterial().setDiffuse( GLVector( array( 'f', [rng.nextDouble(), rng.nextDouble(), rng.nextDouble()] ) ) )
