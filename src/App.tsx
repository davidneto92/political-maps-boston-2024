import './App.css';
import { useState } from 'react';
// import { PrecinctData } from './components/PrecinctData';
import { PrecinctMapPlot } from './components/PrecinctMapPlot';

// const getRandomRGBValue = (): number => Math.floor(Math.random() * 256)
// const getNewRandomRGBColor = (): string =>
//   `rgb(${getRandomRGBValue()}, ${getRandomRGBValue()}, ${getRandomRGBValue()})`

function App() {
  const [fillColor, setFillColor] = useState<string>('beige')

  // const getNewFillColorHandler = () => {
  //   const newColor = getNewRandomRGBColor()
  //   setFillColor(newColor)
  // }

  return (
    <div className="App">
      <h1>Boston wards - 2024 Presidential election vote shares</h1>
      <PrecinctMapPlot fillColor={fillColor} />
      {/* <PrecinctData />
      <button onClick={getNewFillColorHandler}>Randomize map fill color</button> */}
    </div>
  );
}

export default App;
