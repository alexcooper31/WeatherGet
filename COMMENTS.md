# Weather Get React Native

## Arquitetura e Considerações

Este projeto foi criado usando a biblioteca **Expo** dado a sua facilidade de criação e teste rápido em multiplas plataformas assim como a facilidade de "ejetar" o projeto para ele deixar de depender da blibioteca.

Escolhi usar Typscript em vez de Javascript por ter forte tipagem que ajuda na redução de erros, porém pode não ser uma escolha muito boa para projetos grandes pois o suporte de Typescript em React Native poderia ser melhor.

Decidi usar os componentes da biblioteca **Native Base** pela eficiência de tempo. A escolha da biblioteca visual não foi ruim, porém a escolha poderia ser diferente com requisitos diferentes. Em situações que exigissem uma personalização complexa, usaria uma biblioteca de CSS personalizado e de maior poder como **`styled-components`**.

Para as chamadas de API usei a biblioteca **`axios`** dado a sua simplicidade, eficiência e uso no mercado.

No último momento, revisei os requerimentos do teste e percebi que era pra ser usado o SQLite para persistência dos dados! Como cometi o vacilo de não ler com atenção, usei em vez o **AsyncStorage** - biblioteca do React Native que comunica com as interfaces nativas das plataformas para persistência de dados. A interface do **AsyncStorage** é muito similar ao LocalStorage de navegadores é excelente para persistência de dados básicos localmente em mobile.

Iria fazer os testes de integração e e alterar para o SQLite porém havia marcado uma mudança para este sábado. Dado ao período de 48 horas, infelizmente não tive tempo. Fora isso, acredito que a aplicação esteja em um estado sólido de acordo com o que foi pedido.

**ps.** Outra coisa que gostaria de ter tido mais tempo para realizar: Error handling nos "try/catches".

_Caso o objetivo do uso do **SQLite** seja para demonstrar o conhecimento de SQL, me encontro a disposição para realizar algum outro teste ou compartilhar projetos pessoais nos quais utilizo SQL._

Agradeço a oportunidade.