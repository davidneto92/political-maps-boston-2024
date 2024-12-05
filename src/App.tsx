import './App.css';
// import { PrecinctData } from './components/PrecinctData';
import { PrecinctMapPlot } from './components/PrecinctMapPlot';

function App() {
  return (
    <div className="App">
      <h1>Boston wards - 2024 Presidential election vote shares</h1>
      <PrecinctMapPlot />
      {/* <PrecinctData /> */}
    </div>
  );
}

export default App;
