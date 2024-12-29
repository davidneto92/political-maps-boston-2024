import { useState } from 'react';
import './App.css';
import { PrecinctMapPlot } from './components/PrecinctMapPlot/PrecinctMapPlot';
import { TDataSetOptions } from './components/PrecinctMapPlot/getMapOptions';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

function App() {
  const [dataSet, setNewDataSet] = useState<TDataSetOptions>('harrisMargin');
  const hmActiveIndicator = dataSet === 'harrisMargin' ? '🔹' : ''
  const ggActiveIndicator = dataSet === 'gopGains' ? '🔸' : ''

  const harrisMarginDataSetHandler = () => {
    setNewDataSet('harrisMargin')
  }
  const gopGainsDataSetHandler = () => {
    setNewDataSet('gopGains')
  }

  const mapboxUri = `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/-71.010,42.3282,10.4,0/740x443?access_token=${MAPBOX_TOKEN}`

  return (
    <div className='App'>
      <div>
        <h2>Boston 2024 Presidential election vote shares</h2>
        <div className='dataSet-button-wrapper'>
          <button className='dataSet-button' onClick={harrisMarginDataSetHandler}>
            <div className='indicator-container'>{hmActiveIndicator}</div>
            Show Harris Margin
          </button>
          <button className='dataSet-button' onClick={gopGainsDataSetHandler}>
            <div className='indicator-container'>{ggActiveIndicator}</div>
            Show GOP Gains
          </button>
        </div>
      </div>
      {/* <img src={process.env.PUBLIC_URL + '/images.jpg'} alt='ya okay' /> */}
      <div className='container'>
        {/* <img className='map-image' src={mapboxUri} alt='map goes here' /> */}
        <PrecinctMapPlot dataSet={dataSet} />
      </div>
    </div>
  );
}

export default App;
