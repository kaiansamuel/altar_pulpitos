# Altar Púlpitos

Catálogo de púlpitos e altares com solicitação de orçamento por WhatsApp e painel administrativo.

## Executar localmente

1. Copie `.env.example` para `.env` e ajuste as credenciais e o número do WhatsApp.
2. Execute `docker compose up -d` para iniciar PostgreSQL e MinIO. O console do MinIO estará em `http://localhost:9001`.
3. Execute `npm install` para instalar as dependências.
4. Execute `npm run prisma:generate -w @altar/api`, depois `npm run prisma:migrate -w @altar/api -- --name initial` e `npm run prisma:seed -w @altar/api`.
5. Em dois terminais, use `npm run dev:api` e `npm run dev`. O site estará em `http://localhost:5173` e a API em `http://localhost:3000/api`.

O administrador inicial usa `ADMIN_EMAIL` e `ADMIN_PASSWORD` definidos no arquivo `.env`.

## Validação

- `npm run lint` verifica os tipos TypeScript.
- `npm test` executa os testes unitários.
- `npm run build` gera as versões de produção da API e do site.

## Publicação do frontend na Vercel

Para o lançamento somente do site público, configure no projeto da Vercel a variável de ambiente `VITE_WHATSAPP_NUMBER` com o número completo, incluindo o código do país:

```env
VITE_WHATSAPP_NUMBER=5562981200649
```

Use `npm run build -w @altar/web` como comando de build e `apps/web/dist` como diretório de saída. A rota `/admin` permanece no código para uma etapa posterior e depende da API.

## Variáveis

Não versionar `.env`. Use somente `.env.example` como referência. As variáveis `S3_*` configuram o upload de imagens. No lançamento do frontend, configure `VITE_WHATSAPP_NUMBER` na Vercel; o valor padrão do código também aponta para o número oficial informado.
