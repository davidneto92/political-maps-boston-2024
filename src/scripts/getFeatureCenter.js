// reads a GeoJSON and gets the center coordinates
import { center } from '@turf/center'
import wards from '../data/wards.json' with { type: 'json' }

const result = center(wards)
console.log(result)
