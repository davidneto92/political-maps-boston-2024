import { useRef, useEffect } from 'react'
import * as Plot from "@observablehq/plot";
import precincts from '../data/precincts.json'
import wards from '../data/wards.json'
import votingData from '../data/voting_data.json'
const electionData = new Map(Object.entries(votingData));

const buildPlot = () => {
  return Plot.plot({
    aspectRatio: 3 / 4,
    width: 1200,
    color: {
      type: "quantize",
      domain: [-100, 100],
      n: 10,
      scheme: "RdBu",
      label: "Vote margin % - Trump vs Harris",
      legend: true
    },
    axis: null,
    marks: [
      Plot.geo(precincts as GeoJSON.FeatureCollection, {
        stroke: '#fff',
        strokeWidth: 0.5,
        fill: ({ properties }) => {
          const districtKey: string | undefined = properties?.DISTRICT
          if (!districtKey) {
            return 'n/a'
          }
          const info = electionData.get(districtKey)
          if (!info) {
            return 'white'
          }
          const { 'Harris 24 Margin': marginValue } = info
          return marginValue
        },
        tip: true,
        channels: {
          Neighborhood: ({ properties }) => {
            const districtKey: string | undefined = properties?.DISTRICT
            if (!districtKey) {
              return 'n/a'
            }
            const info = electionData.get(districtKey)
            return info?.Neighborhood
          },
          Ward: ({ properties }) => {
            return properties.DISTRICT.split('-')[0]
          },
          Precinct: ({ properties }) => {
            return properties.DISTRICT.split('-')[1]
          },
          'Total votes': ({ properties }) => {
            const districtKey: string | undefined = properties?.DISTRICT
            if (!districtKey) {
              return 'n/a'
            }
            const info = electionData.get(districtKey)
            return info?.['24 Total Voters'] || 0
          }
        }
      }),
      Plot.geo(wards as GeoJSON.FeatureCollection, { stroke: '#0f0f0f' }),
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
