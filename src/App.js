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

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <WeatherForecast />
          </div>
          <div>
            <SearchBar />
          </div>
          <div>
            <CityCards />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
