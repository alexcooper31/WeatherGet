import React, { useEffect, useState, useCallback } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Container, Content, Text, Grid, Col, View, Icon, Spinner } from 'native-base';

import AppHeader from '../../Components/Header';
import OpenWeather from '../../Services/OpenWeather';
import { IFavorites, OpenWeatherGetResponse } from '../../Services/interfaces';


const Weather = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();

  const { id } = route.params;
  const [result, setResult] = useState<OpenWeatherGetResponse>();
  const [favorites, setFavorites] = useState<Array<IFavorites>>([]);

  useEffect(() => {
    apiCall();
    retrieveStorage();
  }, [])

  const apiCall = useCallback(async () => {
    const data = await OpenWeather.getById(id);
    setResult(data);
  }, [])

  const retrieveStorage = useCallback(async () => {
    try {
      const retrievedItem =  await AsyncStorage.getItem('favorites');
      const item = retrievedItem && JSON.parse(retrievedItem);
      setFavorites(Array.isArray(item) ? item : []);
    } catch (error) {}
    return
  }, [])

  const saveOnStorage = useCallback(async (item: IFavorites) => {
    const newFavorites = [ ...favorites ];
    newFavorites.push(item);
    setFavorites(newFavorites);

    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {}
  }, [favorites])

  const removeFromStorage = useCallback(async (id: number) => {
    const index = favorites.findIndex((e: IFavorites) => e.id === id);

    if (index >= 0) {
      const newFavorites = [...favorites];
      newFavorites.splice(index, 1);
      setFavorites(newFavorites);
      
      try {
        await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      } catch (error) {}
    }
  }, [favorites])

  return (
    <Container>
      <AppHeader goBack={() => navigation.goBack()} name='Detalhes' />
      {
        result
        ? <Content padder>
            <View style={{ paddingTop: 40, paddingBottom: 60 }}>
              <Text style={{ textAlign: 'center', fontSize: 28, fontWeight: 'bold' }}>
                { result && result.name }
              </Text>
            </View>

            <Grid style={{ display: 'flex', alignItems: 'center', paddingBottom: 60 }}>
              <Col>
                <Text style={{ textAlign: 'center', fontSize: 48, fontWeight: 'bold' }}>
                  { result && result.main.temp }º
                </Text>
              </Col>
              <Col style={{ alignItems: 'center' }}>
                <Image
                  source={{ uri: `http://openweathermap.org/img/wn/${result && result.weather[0].icon}@2x.png`}}
                  style={{height: 100, width: 100}}
                />
                <Text style={{ textAlign: 'center', textTransform: 'capitalize', fontSize: 18, fontWeight: 'bold' }}>
                  { result && result.weather[0].description }
                </Text>
              </Col>
            </Grid>

            <Grid>
              <Col>
                <Text style={{ fontWeight: 'bold', fontSize: 18, paddingBottom: 10, textAlign: 'center' }}>
                  Temperatura mínima:
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
                  Temperatura máxima:
                </Text>
              </Col>
              <Col style={{flex: 0.8}}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, paddingBottom: 10 }}>
                  { result && result.main.temp_min }º
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                  { result && result.main.temp_max }º
                </Text>
              </Col>
            </Grid>

            {
              favorites && favorites.length > 0 && favorites.find((e: IFavorites) => e.id === id)
              ? <View style={{ paddingTop: 40 }}>
                  <Icon name='star' onPress={() => removeFromStorage(id)} style={{ textAlign: 'center', fontSize: 60, color: 'gold' }} />
                  <Text style={{ textAlign: 'center' }}> Desmarcar Favorito </Text>
                </View>
              : <View style={{ paddingTop: 40 }}>
                  <Icon name='star' onPress={() => saveOnStorage({name: result.name, id: id})} style={{ textAlign: 'center', fontSize: 60 }} />
                  <Text style={{ textAlign: 'center' }}> Marcar como Favorito </Text>
                </View>
            }
          </Content>
        : <Spinner color='blue' style={{ paddingTop: 100 }} />
      }
    </Container>
  );
}

export default Weather;