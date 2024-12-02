// too granular, switching over to Plot now

import * as d3 from 'd3'
import { useRef, useEffect } from 'react'
import wards from '../data/wards.json'
import precincts from '../data/precincts.json'

interface IPrecinctMapProps { }

export function PrecinctMapD3() {
  const mapRef = useRef<SVGSVGElement>(null)

  // this creates path attributes on the single svg
  const renderMap = (path: d3.GeoPath) => {
    d3.select(mapRef.current)
      .selectAll('path')
      // .data(wards.features)
      .data(precincts.features)
      .enter()
      .append('path')
      // .attr('id', d => `ward-${d.properties['Ward']}`)
      .attr('id', d => `precinct-${d.properties['OBJECTID']}`)
      .attr('d', path as any) // need to fix this type from the projection() result
      .attr('stroke', '#000000')
      .attr('stroke-width', '.5')
      .attr('fill', 'rgb(0, 105, 150)')

    // .attr('fill', (data) => {
    //   // console.log(data)
    //   const wardRaw = data.properties.Ward
    //   const parsedWardNumber = parseInt(wardRaw, 10)
    //   // console.log(parsedWardNumber)
    //   // wardAverages[parsedWardNumber]
    //   return `rgba(0, 0, 255, ${wardAverages[parsedWardNumber]})`
    // })
  }

  useEffect(() => {
    if (mapRef?.current) {
      const height = mapRef.current.clientHeight
      const width = mapRef.current.clientWidth

      // const projection = d3.geoAlbers().fitSize([height, width], wards as any)
      const projection = d3.geoAlbersUsa().fitSize([height, width], precincts as any)
      const pathGenerator = d3.geoPath().projection(projection)

      renderMap(pathGenerator)
    }
  }, [])

  return (
    <div className='wrapper'>
      <svg
        className='precincts-map'
        ref={mapRef}
        height={1000}
        width={1000}
      />
    </div>
  )
}
