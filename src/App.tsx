import { useState } from 'react';
import './App.css';
import { PrecinctMapPlot } from './components/PrecinctMapPlot/PrecinctMapPlot';
import { TDataSetOptions } from './components/PrecinctMapPlot/getMapOptions';
import { PrecinctData } from './components/PrecinctData';

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

  return (
    <div className='App'>
      <h2>Boston 2024 Presidential election vote shares</h2>
      <div className='map-and-table-container'>
        <div className='map-container'>
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
          <PrecinctMapPlot dataSet={dataSet} />
        </div>
        <div className='table-container'>
          <PrecinctData />
        </div>
      </div>
    </div>
  );
}

export default App;
