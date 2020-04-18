interface IOpenWeatherLocationData {
  coord: {
    lon: number;
    lat: number;
  };
  
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  
  base: string;

	main: {
    temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
    humidity: number;
  };
  
  visibility: number;
  
	wind: {
		speed: number;
		deg: number;
  };
  
	clouds: {
		all: number;
  };
  
  dt: number;
  
	sys: {
		type: number;
		id: number;
		country: string;
		sunrise: number;
		sunset: number;
  };
  
  timezone: number;
  id: number;
  name: string;
	cod: number;
}

type OpenWeatherGetResponse = IOpenWeatherLocationData;
type OpenWeatherListResponse = {
  cnt: number;
  list: Array<IOpenWeatherLocationData>;
}

interface IWeather {
  icon: string;
  description: string;
}

interface IMainInfo {
  temp: number;
  temp_min: number;
  temp_max: number;
}

interface IResultState {
  name: string;
  weather: IWeather[];
  main: IMainInfo;
}

interface IFavorites {
  name: string;
  id: number;
}

export {
  IResultState,
  IFavorites,
  OpenWeatherGetResponse,
  OpenWeatherListResponse,
  IOpenWeatherLocationData,
}