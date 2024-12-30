// only needed to be run once
const fs = require('fs')
const precincts = require('../data/precincts.json')
const votingData = require('../data/voting_data.json')

precincts.features = precincts.features.map(precinct => {
  const { Neighborhood } = votingData[precinct.properties.DISTRICT] || {}
  return {
    ...precinct,
    properties: {
      ...precinct.properties,
      Neighborhood
    }
  }
})

fs.writeFileSync('src/data/precincts_2.json', JSON.stringify(precincts), (error) => {
  if (error) {
    throw error;
  }
});
