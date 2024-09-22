import SearchBar from './components/SearchBar';
import WeatherForecast from './components/WeatherForecast';
import CityCards from './components/CityCards';
import WeatherDetails from './components/WeatherDetails';
import WeatherInfo from './components/WeatherInfo';

function App() {
  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
        <div>
          <div>
            <WeatherDetails />
          </div>
          <div>
            <WeatherInfo />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        <div>
          <CityCards />
        </div>
        <SearchBar />
        <div>
          <WeatherForecast />
        </div>
      </div>
    </div>
  );
}

export default App;
