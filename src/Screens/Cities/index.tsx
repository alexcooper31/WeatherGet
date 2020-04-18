import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, Text, Content, List, ListItem, Left,  Icon, Right } from 'native-base';

import cityInfo from '../../Services/city.list.json';
import AppHeader from '../../Components/Header';

const Cities = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <AppHeader goBack={() => navigation.goBack()} name='Cidades' />
      <Content>
        <List>
          {
            cityInfo.data.map((item, index) => 
              <ListItem
                noIndent
                key={index}
                onPress={() => navigation.navigate('Weather', { id: item.id })}
                style={{ backgroundColor: index % 2 === 0 ? 'white' : '#fafafa' }}
              >
                <Left>
                  <Text> {item.name} </Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            )
          }
        </List>
      </Content>
    </Container>
  );
}

export default Cities;