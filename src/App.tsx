import { MagnifyingGlass, MapPin, Drop, Wind } from "@phosphor-icons/react";
import { ChangeEvent, useState } from "react";

interface WeatherData {
  name: string;
  main: {
    temp: string;
    humidity: string;
  };
  wind: {
    speed: string;
  };
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  sys: {
    country: string;
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
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    setWeatherData(data);
    setCity("");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleButtonClick();
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen text-zinc-300 bg-zinc-900">
      <div className="bg-zinc-800 p-4 rounded-xl shadow-md items-center">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Busque por uma cidade:
        </h3>
        <div className="flex items-center mb-4">
          <input
            onKeyDown={handleKeyPress}
            type="text"
            value={city}
            onChange={handleInputChange}
            placeholder="Digite o nome da cidade"
            className="border bg-zinc-700 border-gray-300 px-4 py-1 rounded placeholder:text-zinc-500"
          />
          <button
            type="submit"
            onClick={handleButtonClick}
            className="bg-zinc-700 px-4 py-2 rounded-full ml-2"
            disabled={!city}
          >
            <MagnifyingGlass weight="bold" />
          </button>
        </div>
        {weatherData && (
          <>
            <div className="flex flex-col items-center mb-4">
              <span className="border w-full border-gray-400 mb-4"></span>
              <h2 className="flex items-center mr-4">
                <MapPin size={24} weight="bold" />
                <span className="ml-2 text-2xl">{weatherData.name}</span>
                <img
                  src={`https://flagsapi.com/${weatherData.sys.country}/flat/24.png`}
                  alt="Bandeira do país"
                  className="ml-2"
                />
              </h2>
              <p className="text-3xl font-bold">
                <span className="">{parseInt(weatherData.main.temp)}</span>
                &deg;C
              </p>
            </div>
            <div className="flex justify-center items-center mb-4">
              <p className="mr-2 capitalize">
                {weatherData?.weather[0]?.description}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt="Condições do tempo"
              />
            </div>
            <div className="flex justify-center items-center">
              <p className="mr-4 flex">
                <Drop size={20} weight="bold" />
                <span className="ml-1">{`${weatherData.main.humidity}%`}</span>
              </p>
              <span className="border h-6 border-gray-400"></span>
              <p className="ml-4 flex ">
                <Wind size={20} weight="bold" />
                <span className="ml-1">{`${weatherData.wind.speed}Km/h`}</span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
