import { useRef, useEffect } from 'react'
import * as Plot from "@observablehq/plot";
import precincts from '../data/precincts.json'
import wards from '../data/wards.json'
import votingData from '../data/voting_data.json'
const electionData = new Map(Object.entries(votingData));

const buildPlot = (fillColor: string) => {
  return Plot.plot({
    aspectRatio: 3 / 4,
    width: 1200,
    color: {
      type: "quantize",
      n: 20,
      domain: [30, 100],
      scheme: "Blues",
      label: "Vote share % - Trump vs Harris",
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
          const { 'Harris 24 %': harris24, 'Trump 24 %': trump24 } = info
          if (typeof harris24 === 'number' && typeof trump24 === 'number') {
            return Math.max(harris24, trump24)
          }
          console.log(info)
          return 0
        },
        tip: true,
        channels: {
          Name: ({ properties }) => {
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
            const total = info?.['24 Total Voters']
            return !total || total < 10 ? 'n/a' : info?.['24 Total Voters']
          }
        }
      }),
      Plot.geo(wards as GeoJSON.FeatureCollection, { stroke: '#0f0f0f' }),
    ]
  })
}

interface IPrecinctMapPlotProps {
  fillColor: string
}

export function PrecinctMapPlot({ fillColor = 'red' }: IPrecinctMapPlotProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const geoPlot = buildPlot(fillColor)
    if (mapRef.current) {
      mapRef.current.append(geoPlot)
    }
    return () => geoPlot.remove();
  }, [fillColor])

  return (
    <div className='wrapper'>
      <div ref={mapRef} />
    </div>
  )
}
