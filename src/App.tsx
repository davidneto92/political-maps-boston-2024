import { useState } from 'react';
import './App.css';
import { PrecinctMapPlot } from './components/PrecinctMapPlot/PrecinctMapPlot';
import { TDataSetOptions } from './components/PrecinctMapPlot/getMapOptions';

function App() {
  const [dataSet, setNewDataSet] = useState<TDataSetOptions>('harrisMargin');

  const harrisMarginDataSetHandler = () => {
    setNewDataSet('harrisMargin')
  }
  const gopGainsDataSetHandler = () => {
    setNewDataSet('gopGains')
  }

  return (
    <div className='App'>
      <div>
        <h2>Boston 2024 Presidential election vote shares</h2>
        <div className='dataSet-button-wrapper'>
          <button onClick={harrisMarginDataSetHandler}>Show Harris Margin</button>
          <button onClick={gopGainsDataSetHandler}>Show GOP Gains</button>
        </div>
      </div>
      <PrecinctMapPlot dataSet={dataSet} />
    </div>
  );
}

export default App;
