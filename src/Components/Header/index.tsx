import React from 'react';
import { Header, Left, Button, Icon, Body, Title, Right } from 'native-base';

interface IHeaderProps {
  goBack?: () => void;
  name: String;
}

const AppHeader = (props: IHeaderProps) => {
  return (
    <Header>
      <Left style={{ flex:1 }}>
        {
          props.goBack &&
          <Button transparent onPress={() => props.goBack!()}>
            <Icon name='arrow-back' />
          </Button>
        }
      </Left>
      <Body style={{ flex:1 }}>
        <Title style={{ alignSelf: "center" }}> { props.name } </Title>
      </Body>
      <Right style={{ flex:1 }} />
    </Header>
  );
}

export default AppHeader;