import React, { useCallback, useEffect, useState } from 'react';
import { Button, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Content, View, List, ListItem, Left, Text, Right, Body } from 'native-base';

import AppHeader from '../../Components/Header';
import { IFavorites, IOpenWeatherLocationData } from '../../Services/interfaces';
import OpenWeather from '../../Services/OpenWeather';

const Home = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState<Array<IFavorites>>([]);
  const [results, setResults] = useState<Array<IOpenWeatherLocationData>>([]);

  useEffect(() => {
    retrieveStorage();
    navigation.addListener(
      'focus',
      _ => {
        retrieveStorage();
      }
  );
  }, [])

  const retrieveStorage = useCallback(async () => {
    try {
      const retrievedItem =  await AsyncStorage.getItem('favorites');
      const item = retrievedItem && JSON.parse(retrievedItem);

      if (retrievedItem !== JSON.stringify(favorites) && item) {
        setFavorites(item);
        apiCall(item);
      }
    } catch (error) {}
    return
  }, [])

  const apiCall = useCallback(async (item: Array<IFavorites>) => {
    const ids = item && item.map((e) => item.length > 0 && e.id);
    
    const data = item && await OpenWeather.getMany(ids.join());
    setResults(item && data.list)
  }, [])

  return (
    <Container>
      <AppHeader name='Favoritos' />
      <Content>
        {
          favorites && favorites.length > 0 && results && results.length == favorites.length
          ? <List>
              {
                favorites.map((item: IFavorites, index: number) => 
                  <ListItem
                    noIndent
                    key={index}
                    onPress={() => navigation.navigate('Weather', { id: item.id })}
                    style={{ backgroundColor: index % 2 === 0 ? 'white' : '#fafafa' }}
                  >
                    <Left style={{flex: 4}}>
                      <Text> { item.name } </Text>
                    </Left>
                    <Body style={{flex: 6}}>
                      <Text style={{textTransform: 'capitalize'}}>
                        { results.length > 0 && results[index].weather[0].description }
                      </Text>
                    </Body>
                    <Right style={{flex: 1}}>
                      <Text>
                        { results.length > 0 && Math.round(results[index].main.temp) + 'º' }
                      </Text>
                    </Right>
                  </ListItem>
                )
              }
            </List>
          : <View style={{paddingTop: 40 }}>
              <Text style={{ textAlign: 'center', fontSize: 20 }}> Nenhum Favorito </Text>
            </View>
        }

        <View style={{ width: '50%', alignSelf: 'center', borderRadius: 10, marginTop: 40 }}>
          <Button title='Ver Todas as Cidades' onPress={() => navigation.navigate('Cities')} />
        </View>
      </Content>
    </Container>
  );
}

export default Home;