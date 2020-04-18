import axios, { AxiosInstance, AxiosPromise } from 'axios';

// @ts-ignore
import { OPEN_WEATHER_KEY } from 'react-native-dotenv';
import { OpenWeatherGetResponse, OpenWeatherListResponse } from './interfaces';

const baseParams = {
  'appid': OPEN_WEATHER_KEY,
  'lang': 'pt',
  'units': 'metric'
};

abstract class OpenWeather {
  private static client: AxiosInstance = axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5',
  });

  private static async axiosResponse(promise: AxiosPromise) {
    try {
      const response = await promise;
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  public static getById(id: number): Promise<OpenWeatherGetResponse> {
    return this.axiosResponse(
      this.client.get(`/weather`, {
        params: {
          id,
          ...baseParams,
        },
      }),
    );
  }

  public static getMany(ids: string): Promise<OpenWeatherListResponse> {
    return this.axiosResponse(
      this.client.get(`/group`, {
        params: {
          id: ids,
          ...baseParams,
        },
      }),
    );
  }
}

export default OpenWeather;
