import fs from "fs";
import csvParser from "csv-parser";

const padZero = (input) => input < 10 ? `0${input}` : `${input}`

const wardMap = {}

fs.createReadStream("../poli-map-2024/public/boston_2020-2024_comparison.csv")
  .pipe(csvParser({
    mapValues: ({ value }) => {
      const parsed = parseFloat(value.replace(',', ''))
      return isNaN(parsed) ? value : parsed
    }
  }))
  .on("data", ({ Ward, Precinct, ...rest }) => {
    wardMap[`${padZero(Ward)}-${padZero(Precinct)}`] = { Ward, Precinct, ...rest }
  })
  .on("end", () => {
    fs.writeFileSync('src/data/voting_data.json', JSON.stringify(wardMap), (error) => {
      if (error) {
        throw error;
      }
    });
  });
