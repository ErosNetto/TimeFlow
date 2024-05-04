<div align="center">

# Projeto de Agendamento de Horários(TimeFlow)

</div>

##### **Versão: 1.0.0**

## Qual é a ideia?

A ideia do projeto é criar um site para realizar marcação de horários para barbearias e cabeleireiros, afim de proporcionar uma plataforma conveniente e eficiente para que os clientes agendem seus serviços de cuidados pessoais de forma rápida e fácil, enquanto oferece aos profissionais da área uma maneira organizada de gerenciar seus horários e clientes.

## Tecnologias usadas

- **Backend:**
  - JavaScript
  - Node.js
  - Express
- **Frontend:**
  - React
  - JavaScript
- **Banco de dados:**
  - MongoDB Atras

## Instalação e Configuração

Para executar o projeto localmente, siga as etapas abaixo:

1. Clone este repositório.
2. Configure o ambiente de desenvolvimento com as dependências necessárias.
3. Crie o seu arquivo .env com as configurações.
4. Inicie o servidor do Back-End.
5. Execute o Front-End em um ambiente de desenvolvimento.

## Configurações do Arquivo .env

Antes de executar o projeto, é necessário criar um arquivo `.env` dentro da pasta **backend** no diretório do projeto com as configurações adequadas. Siga as etapas abaixo para criar o arquivo `.env`:

1. Na pasta **backend** do projeto, crie um arquivo chamado `.env`.
2. Abra o arquivo `.env` em um editor de texto.
3. Adicione as configurações necessárias no arquivo, seguindo o formato `CHAVE=VALOR`. Arquivo .env:

```dotenv
# Backend rodando na porta
PORT=5000

# Configurando o Cors:
CORS_ORIGIN=http://localhost:5173

# Conexão do banco de dados
DB_USER=usuariodb
DB_PASSWORD=senhadb

# Configuração JWT
JWT_SECRET=suachave
TOKEN_EXPIRES=7d
```

Certifique-se de adicionar as configurações específicas do seu ambiente, como usuário e senha do banco de dados, chave do token de autenticação, Cors e a porta do backend.

4. Salve o arquivo `.env`.

Lembre-se de substituir os valores das configurações de exemplo pelos valores corretos do seu ambiente.

## Diagrama de casos de uso do Cliente

##### (Diagrama em construção)

- Cadastro e login;
- Atualizar informações de cadastro;
- Pesquisar empresas;
- Pesquisar serviços;
- Visualizar perfil da empresa;
- Visualizar serviços da empres;
- Visualizar disponibilidade de horários;
- Agendar horário;
- Gerenciar agendamentos:
  - Visualizar seus agendamentos;
  - Reagendar;
  - Cancelar.

## Diagrama de casos de uso da Empresa

##### (Diagrama em construção)

- Cadastro e login;
- Atualizar informações de cadastro;
- Adicionar serviços;
- Adicinar profissionais;
- Agendar horário (pessoalmente)
- Receber notificações sobre os agendamentos;
- Calendario de agendamentos;

<!-- ## Funções para o Cliente (Usuário)

- **Cadastro de clientes:** Os clientes criam contas na plataforma, inserem suas informações pessoais e de contato, facilitando o processo de agendamento futuro.
- **Agendamento de horários:** Os clientes utilizam uma interface intuitiva para selecionar datas e horários disponíveis para os serviços desejados.
- **Gerenciamento de cancelamentos e reagendamentos:** Os clientes podem cancelar ou reagendar seus horários de forma fácil.

## Funções para a Empresa (Estabelecimento) -->
