# Teste de acesso ao Portal da transparencia

Este código testa o acesso do portal da transparência do brasil em outros países, usando proxies abertos na internet.

O bloqueio para outros países pode limitar o acesso de cidadãos brasileiros vivendo em território estrangeiro, estrangeiros e, consequentemente veículos de mídia estrangeiros.

## Como rodar

- clone o projeto em sua maquina;
- rode o comando `npm install` para instalar as dependencias;
- rode o comando `npm start` para iniciar o teste usando as configurações padrões.

## Entendendo como o tudo funciona e seu resultado

Antes de mais nada, é importante perceber que proxies são instáveis e podem falhar ao fazer uma requisição. Por isso, quanto mais proxies testarmos, maior a certeza sobre o resultado obtido, mas ao mesmo tempo, maior o tempo de execução.

Passo a passo do algoritmo:

- começamos com uma lista de países; (usando códigos ISO 3166-1 alfa-2)
- a cada país obtemos uma lista de endereços proxies; (existem vários sites que listam, mas por padrão usamos o `proxyscrape.com`)
- a cada url de proxy que obtemos, tentamos fazer uma requisição para o site do portal da transparencia. Se QUALQUER um desses proxies responder, marcamos como acessível para o país.
- caso todos proxies de um determinado país falha, só ai, marcamos como inacessível.
- no final imprimimos a lista com o resultado de todos os países:

# Resultados

Todos os dias, uma action do github é executada, atualizando o arquivo [output.json](./output.json) com os resultados de todos os países.
