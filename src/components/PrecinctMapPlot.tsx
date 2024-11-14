/**
 * Plot is very opinionated, and the Observable docs are not easy to follow. Shelving this approach for now.
 */

import { useRef, useEffect } from 'react'
import * as Plot from "@observablehq/plot";
// import * as topojson from "topojson-client";
import wards from '../data/wards.json'

const buildPlot = () => {
  // const result = topojson.feature('wards', wards.features)

  return Plot.plot({
    width: 800,
    height: 600,
    projection: "identity",
    color: {
      type: "quantize",
      n: 9,
      domain: [1, 10],
      scheme: "BuRd",
      label: "Unemployment rate (%)",
      legend: true
    },
    marks: [
      // Plot.geo(wards.features, Plot.centroid({
      //   fill: d => 'red',
      //   tip: true,
      //   stroke: 'black',
      //   channels: {
      //     // Ward: d => d.properties.WardLabel
      //   }
      // })),
      // Plot.geo(counties, Plot.centroid({
      //   fill: d => unemployment.get(d.id),
      //   tip: true,
      //   channels: {
      //     County: d => d.properties.name,
      //     State: d => statemap.get(d.id.slice(0, 2)).properties.name
      //   }
      // })),
      Plot.geo(wards.features, { stroke: 'purple' })
    ]
  })
}

export function PrecinctMapPlot() {
  const mapRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const geoPlot = buildPlot()

    if (mapRef.current) {
      console.log(geoPlot)
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
