# Cadastro de Clientes e Associação de Produtos

Este repositório contém a implementação do teste técnico para cadastro de clientes e associação de produtos, utilizando Vue.js.

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

Primeiramente, gostaria de expressar minha gratidão pela oportunidade de demonstrar minhas habilidades por meio deste teste. Sem dúvida, foi um desafio, especialmente considerando o tempo limitado e minha necessidade de me atualizar sobre as práticas mais recentes do Vue.js.

Durante o desenvolvimento, pude perceber como o Vue evoluiu, especialmente com a introdução do sistema de setup e hooks, que se assemelham mais ao estilo de desenvolvimento do React. Essa mudança não apenas facilitou meu entendimento do código, mas também tornou a experiência de desenvolvimento mais fluída e eficiente.

O uso do Vuetify foi crucial para o sucesso deste projeto. Sem ele, certamente teria sido muito mais difícil alcançar os resultados desejados no prazo estipulado. Embora tenha havido desafios na implementação e adaptação às novas funcionalidades, a experiência foi extremamente valiosa e enriquecedora.

Em relação aos testes unitários, reconheço que não pude escrever tantos quanto gostaria. Isso se deveu principalmente às complexidades na integração de componentes externos e à priorização das tarefas de implementação. No entanto, pude compreender a importância e o funcionamento dos testes em um ambiente Vue, e pretendo dedicar mais tempo a essa prática no futuro.

Ao longo do processo, foquei na organização e estruturação do código, visando facilitar sua manutenção e extensibilidade. Acredito que essa abordagem contribuiu significativamente para a qualidade do resultado final.

Em resumo, este projeto representou uma oportunidade de aprendizado e crescimento. Estou confiante de que as funcionalidades implementadas atendem às expectativas e demonstram minhas habilidades e dedicação ao desenvolvimento Vue.js. Estou ansioso para receber feedback e continuar aprimorando minhas habilidades nesta incrível tecnologia.
