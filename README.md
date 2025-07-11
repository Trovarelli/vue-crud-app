## Desafio

O desafio consiste em construir um sistema simples de cadastro de clientes e associação de produtos. A tela de cadastro de produtos deve conter os campos "nome" e "ativo" (Sim ou Não), enquanto a tela de cadastro de clientes deve conter os campos "nome", "documento", "telefone", "e-mail" e "ativo" (Sim ou Não). Além disso, deve haver uma tela para associar os produtos a um cliente específico.

## Estrutura do Projeto

O projeto está estruturado da seguinte forma:

- **src/components**: Contém os componentes Vue utilizados para compor as telas do sistema.
- **src/store**: Contém a store Vuex utilizada para gerenciar o estado da aplicação.
- **src/types**: Contém as definições de tipos TypeScript utilizadas na aplicação.
- **src/App.vue**: O componente raiz da aplicação.
- **src/main.ts**: Arquivo de entrada do aplicativo Vue.
- **tests/unit**: Contém os testes unitários para os componentes Vue.

## Tecnologias Utilizadas

- **Vue.js**: Framework JavaScript para construção de interfaces de usuário.
- **Vuex**: Biblioteca de gerenciamento de estado para aplicações Vue.js.
- **Vuetify**: Biblioteca de componentes Vue.js com Material Design.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática opcional ao JavaScript.
- **Jest e @vue/test-utils**: Framework de teste e biblioteca de utilidades para testes de componentes Vue.js.
- **vue-the-mask**: Biblioteca que facilita a formatação de valores ao digitar em um campo.
- **vue3-toastify**: Biblioteca para gerar feedbacks para o usuário em caso de sucesso ou erro ao realizar qualquer ação.
- **SCSS**: Pré-processador CSS para estilização dos componentes.

## Como Rodar o Projeto

1. Certifique-se de ter o Node.js instalado na sua máquina.
2. Clone este repositório para o seu ambiente local.
3. No terminal, navegue até o diretório do projeto.
4. Instale as dependências do projeto executando o comando: npm install (yarn)
5. Após a instalação das dependências, inicie o servidor de desenvolvimento com o comando: npm run dev (yarn dev)
6. O servidor de desenvolvimento estará disponível em `http://localhost:8080`.
7. Caso queira ver ele funcionando, o deploy foi feito na plataforma Render: https://vue-crud-app-7e3w.onrender.com/

## Testes Unitários

Os testes unitários podem ser executados com o seguinte comando: npm run test:unit (yarn test:unit)

## Considerações Finais

Durante o desenvolvimento, pude perceber como o Vue evoluiu, especialmente com a introdução do sistema de setup e hooks, que se assemelham mais ao estilo de desenvolvimento do React. Essa mudança não apenas facilitou meu entendimento do código, mas também tornou a experiência de desenvolvimento mais fluída e eficiente.
