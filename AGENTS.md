# Repository Guidelines

## Estrutura do projeto

O repositório está em fase inicial. Atualmente, `prd.md` deve concentrar os requisitos do produto e `logo_altar_pultipos.jpeg` é o ativo visual disponível. Ao iniciar a aplicação, mantenha uma estrutura previsível:

- `src/` para o código-fonte;
- `tests/` para testes automatizados;
- `public/` ou `assets/` para imagens e arquivos estáticos;
- `docs/` para decisões técnicas e documentação complementar.

Evite misturar código de aplicação, ativos e arquivos de configuração na raiz.

## Desenvolvimento, build e testes

Ainda não há ferramenta de build, gerenciador de pacotes ou suíte de testes configurados. Não presuma comandos como `npm test` ou `npm run build` até que os arquivos de configuração sejam adicionados.

Quando a stack for definida, documente no `README.md` os comandos oficiais para instalar dependências, rodar localmente, validar estilo e executar testes. Mantenha scripts simples e padronizados, por exemplo `npm run dev`, `npm run lint` e `npm test` para projetos Node.js.

## Estilo de código e nomes

Siga as convenções da linguagem e formate o código automaticamente antes de enviar alterações. Prefira nomes descritivos: `customer-service.ts`, `CreateOrderRequest` e `calculateTotal`. Use um único idioma por camada de código e preserve a terminologia definida no produto.

Ao adicionar uma ferramenta de lint ou formatter, registre a configuração no repositório e inclua o respectivo comando de validação.

## Testes

Crie testes junto à funcionalidade nova, usando nomes que descrevam o comportamento, como `creates_order_when_payload_is_valid`. Cubra regras de negócio, integrações críticas e correções de bugs. Execute toda a suíte antes de abrir um pull request e inclua testes de regressão para defeitos corrigidos.

## Commits e pull requests

Não há histórico de commits para extrair um padrão existente. Use mensagens curtas, no imperativo e com escopo quando útil, por exemplo: `feat: adiciona formulário de pedido` ou `fix: valida telefone do cliente`.

Cada pull request deve explicar o objetivo, resumir as alterações, indicar como validar e vincular a issue relacionada, quando houver. Inclua capturas de tela para mudanças visuais e mantenha o escopo pequeno e revisável.

## Configuração e segredos

Nunca envie credenciais, tokens ou arquivos `.env` com valores reais. Forneça um `.env.example` com chaves fictícias e documente as variáveis necessárias.
