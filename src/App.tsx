import { Input } from "../src/components/ui/input";
import { MagnifyingGlass, MapPin, Drop, Wind } from "@phosphor-icons/react";
import { ChangeEvent, useState } from "react";
import { Button } from "./components/ui/button";
import { Header } from "./components/header";

interface WeatherData {
  dt: number;
  list: {
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[]
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export function App() {
  const apiKey = import.meta.env.VITE_API_KEY as string;
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleButtonClick = async () => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&cnt=10&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    setWeatherData(data);
    setCity("");
    console.log(data);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleButtonClick();
    }
  };
  return (
    <div className="flex flex-col h-screen bg-primary-foreground gap-6 items-center text-foreground">
      <Header />

      <div className="flex-col items-center bg-secondary p-4 rounded-xl text-foreground">
        <h3 className="text-xl font-semibold mb-4 text-center text-foreground">
          Busque por uma cidade:
        </h3>
        <div className="flex items-center mb-4">
          <Input
            onKeyDown={handleKeyPress}
            type="text"
            value={city}
            onChange={handleInputChange}
            placeholder="Digite o nome da cidade"
            className="border bg-muted border-muted-foreground px-4 py-1 rounded placeholder:text-muted-foreground text-muted-foreground"
          />
          <Button
            type="submit"
            onClick={handleButtonClick}
            className="bg-muted text-muted-foreground px-4 py-2 rounded-full ml-2"
            disabled={!city}
          >
            <MagnifyingGlass weight="bold" className="text-foreground" />
          </Button>
        </div>
        {weatherData && (
          <>
            <div className="flex flex-col items-center mb-4">
              <span className="border w-full border-gray-400 mb-4"></span>
              <h2 className="flex items-center mr-4">
                <MapPin size={24} weight="bold" />
                <span className="ml-2 text-2xl">{weatherData.city.name}</span>
                <img
                  src={`https://flagsapi.com/${weatherData.city.country}/flat/24.png`}
                  alt="Bandeira do país"
                  className="ml-2"
                />
              </h2>
              <p className="text-3xl font-bold">
                <span className="">{Math.round(weatherData.list[0].main.temp)}</span>
                &deg;C
              </p>
            </div>
            <div className="flex justify-center items-center mb-4">
              <p className="mr-2 capitalize">
                {weatherData?.list[0].weather[0].description}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}.png`}
                alt="Condições do tempo"
              />
            </div>
            <div className="flex justify-center items-center">
              <p className="mr-4 flex">
                <Drop size={20} weight="bold" />
                <span className="ml-1">{`${weatherData.list[0].main.humidity}%`}</span>
              </p>
              <span className="border h-6 border-gray-400"></span>
              <p className="ml-4 flex ">
                <Wind size={20} weight="bold" />
                <span className="ml-1">{`${weatherData.list[0].wind.speed}Km/h`}</span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
