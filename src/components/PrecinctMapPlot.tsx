import { useRef, useEffect } from 'react'
import * as Plot from "@observablehq/plot";
import precincts from '../data/precincts.json'
import wards from '../data/wards.json'

const buildPlot = () => {
  return Plot.plot({
    aspectRatio: 3 / 4,
    width: 1200,
    // color: {
    //   type: "quantize",
    //   n: 9,
    //   domain: [1, 10],
    //   scheme: "BuRd",
    //   label: "Unemployment rate (%)",
    //   legend: true
    // },
    axis: null,
    marks: [
      Plot.geo(precincts as GeoJSON.FeatureCollection, {
        stroke: 'purple',
        tip: true,
        channels: {
          Stuff: d => 'Nice!'
          // Ward:
          // District
          // total votes
          // Margin?
        }
      }),
      Plot.geo(wards as GeoJSON.FeatureCollection, { stroke: 'orange' }),
    ]
  })
}

export function PrecinctMapPlot() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const geoPlot = buildPlot()
    if (mapRef.current) {
      mapRef.current.append(geoPlot)
    }
    return () => geoPlot.remove();
  }, [])

  return (
    <div className='wrapper'>
      <div ref={mapRef} />
    </div>
  )
}
