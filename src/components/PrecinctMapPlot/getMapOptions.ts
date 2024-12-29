import { MarkOptions, PlotOptions } from '@observablehq/plot'
import votingData from '../../data/voting_data.json'

// need to remove the any and figure out a better type for the jsons!

export type TDataSetOptions = 'harrisMargin' | 'gopGains'

interface IMapOptions extends Pick<MarkOptions, 'fill' | 'channels'> {
  color?: PlotOptions['color']
}

const MAP_OPTION_HARRIS_MARGIN: IMapOptions = {
  color: {
    type: 'quantize',
    domain: [-100, 100],
    n: 10,
    scheme: 'RdBu',
    label: 'Vote margin % - Trump vs Harris',
    legend: true
  },
  fill: ({ properties }) => {
    const districtKey: string | undefined = properties?.DISTRICT
    if (!districtKey) {
      return 'n/a'
    }
    const info = (votingData as any)[districtKey]
    if (!info) {
      return 'white'
    }
    const { 'Harris 24 Margin': marginValue } = info
    return marginValue
  },
  channels: {
    'Total votes': ({ properties }) => {
      const districtKey: string | undefined = properties?.DISTRICT
      if (!districtKey) {
        return 'n/a'
      }
      const info = (votingData as any)[districtKey]
      return info?.['24 Total Voters'] || 0
    },
  },
}

const MAP_OPTION_GOP_GAINS: IMapOptions = {
  color: {
    type: 'quantize',
    domain: [-30, 0, 30],
    n: 10,
    scheme: 'BuRd',
    label: 'GOP % Gains vs 2020',
    legend: true,
  },
  fill: ({ properties }) => {
    const districtKey: string | undefined = properties?.DISTRICT
    if (!districtKey) {
      return 'n/a'
    }
    const info = (votingData as any)[districtKey]
    if (!info) {
      return 'white'
    }
    const { 'GOP Gains': marginValue } = info
    return marginValue
  },
  channels: {
    'Total votes': ({ properties }) => {
      const districtKey: string | undefined = properties?.DISTRICT
      if (!districtKey) {
        return 'n/a'
      }
      const info = (votingData as any)[districtKey]
      return info?.['24 Total Voters'] || 0
    },
  },
}

export const getMapDataSetOptions = (dataSet: TDataSetOptions): IMapOptions => {
  switch (dataSet) {
    case 'harrisMargin':
      return MAP_OPTION_HARRIS_MARGIN
    case 'gopGains':
      return MAP_OPTION_GOP_GAINS
    default:
      return MAP_OPTION_HARRIS_MARGIN
  }
}
