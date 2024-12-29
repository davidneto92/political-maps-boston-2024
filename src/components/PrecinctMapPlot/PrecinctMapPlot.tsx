import { useRef, useEffect } from 'react'
import * as Plot from '@observablehq/plot'
import precincts from '../../data/precincts.json'
import wards from '../../data/wards.json'
import { getMapDataSetOptions, TDataSetOptions } from './getMapOptions'

const buildPlot = (dataSet: TDataSetOptions) => {
  const {
    color: dataSetColor,
    fill: dataSetFill,
    channels: dataSetChannels,
  } = getMapDataSetOptions(dataSet)

  return Plot.plot({
    // this aspect ratio is close to the conic projection
    aspectRatio: 58.5 / 80,
    // the projection doesn't like rendering the precincts, need to keep digging
    // projection: {
    //   type: 'conic-conformal',
    //   domain: wards as any,
    //   rotate: [71 + 30 / 60, 0]
    // },
    color: dataSetColor,
    axis: null,
    marks: [
      Plot.geo(precincts as GeoJSON.FeatureCollection, {
        stroke: '#fff',
        strokeWidth: 0.5,
        fill: dataSetFill,
        tip: true,
        channels: {
          Neighborhood: ({ properties }) => {
            return properties.Neighborhood
          },
          Ward: ({ properties }) => {
            return properties.DISTRICT.split('-')[0]
          },
          Precinct: ({ properties }) => {
            return properties.DISTRICT.split('-')[1]
          },
          ...dataSetChannels,
        },
      }),
      Plot.geo(wards as GeoJSON.FeatureCollection, { stroke: '#0f0f0f' }),
    ],
  })
}

interface IPrecinctMapPlotProps {
  dataSet: TDataSetOptions
}

export function PrecinctMapPlot({ dataSet }: IPrecinctMapPlotProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const geoPlot = buildPlot(dataSet)
    if (mapRef.current) {
      mapRef.current.append(geoPlot)
    }
    return () => geoPlot.remove()
  }, [dataSet])

  return (
    <div className="wrapper">
      <div ref={mapRef} />
    </div>
  )
}
