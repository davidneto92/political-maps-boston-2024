import './App.css';
import { PrecinctData } from './components/PrecinctData';
import { PrecinctMapD3 } from './components/PrecinctMapD3';
import { PrecinctMapPlot } from './components/PrecinctMapPlot';

// const getRandomRGBValue = (): number => Math.floor(Math.random() * 256)
// const getNewColorHandler = (): string =>
//   `rgb(${getRandomRGBValue()}, ${getRandomRGBValue()}, ${getRandomRGBValue()})`

function App() {
  return (
    <div className="App">
      <h1>Boston wards - 2024 Presidential election margins</h1>
      {/* <PrecinctMapD3 /> */}
      <PrecinctMapPlot />
      <PrecinctData />
    </div>
  );
}

export default App;
