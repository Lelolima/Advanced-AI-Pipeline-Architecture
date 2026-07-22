# 🚀 Guia de Implantação (Deploy)

## Pré-requisitos

- Node.js >= 18.x
- npm >= 9.x

## Build Local

### 1. Instalar dependências

```bash
npm install
```

### 2. Executar build

```bash
npm run build
```

### 3. Preview do build

```bash
npm run preview
```

O build gera uma pasta `dist/` com:
- HTML minificado
- JS/CSS bundles otimizados
- Source maps para debugging

## Deploy na Vercel

### Opção 1: Git Integration (Recomendado)

1. Push do código para GitHub/GitLab
2. Acesse [vercel.com](https://vercel.com)
3. Importe o repositório
4. Deploy automático!

### Opção 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Deploy na Netlify

### Opção 1: Netlify Drop

1. Acesse [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arraste a pasta `dist/`
3. Deploy instantâneo!

### Opção 2: Netlify CLI

```bash
npm i -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

### Opção 3: Git Integration

1. Conecte o repositório GitHub
2. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Deploy automático a cada push!

## Deploy no GitHub Pages

### 1. Instalar gh-pages

```bash
npm i -D gh-pages
```

### 2. Adicionar script ao package.json

```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### 3. Deploy

```bash
npm run deploy
```

### 4. Configurar GitHub Pages

1. Acesse Settings > Pages
2. Source: GitHub Actions ou deploy branch
3. URL: `https://seu-usuario.github.io/seu-repo/`

**Nota**: Para GitHub Pages, adicione ao `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/nome-do-repo/',
  // ...resto da configuração
})
```

## Docker Deploy

### Dockerfile

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Build e Run

```bash
docker build -t ai-pipeline-frontend .
docker run -p 80:80 ai-pipeline-frontend
```

### Docker Compose (com Backend)

```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "8000:8000"
```

## AWS Deploy

### S3 + CloudFront

1. **Build**: `npm run build`
2. **Criar bucket S3**
3. **Upload** do conteúdo de `dist/`
4. **Habilitar hosting estático**
5. **CloudFront** para CDN

### Amplify

```bash
npm i -g @aws-amplify/cli
amplify configure
amplify init
amplify publish
```

## Ambiente de Produção

### Variáveis de Ambiente

Crie `.env.production`:

```env
VITE_API_URL=https://api.seudominio.com
VITE_APP_VERSION=1.0.0
VITE_SENTRY_DSN=seu-dsn-sentry
```

### Otimizações

O build já inclui:
- ✅ Minificação com Terser
- ✅ Code splitting automático
- ✅ Tree shaking
- ✅ Compressão de assets

### Performance

- Use lazy loading para rotas grandes
- Implemente Service Worker para offline
- Configure caching headers no servidor

## Monitoramento Pós-Deploy

### Analytics

Adicione ao `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXX-Y"></script>
```

### Error Tracking

```bash
npm install @sentry/react
```

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "seu-dsn",
  environment: "production",
});
```

## CI/CD com GitHub Actions

### .github/workflows/deploy.yml

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Run tests
        run: npm run test:run

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Rollback

### Vercel

```bash
vercel rollback [deployment-url]
```

### Netlify

Acesse o dashboard > Deploys > Selecione versão anterior > "Publish"

## Checklist de Deploy

- [ ] Tests passando
- [ ] Build sem erros
- [ ] ESLint limpo
- [ ] Variáveis de ambiente configuradas
- [ ] URLs de API atualizadas
- [ ] Analytics configurado
- [ ] Error tracking ativo
- [ ] SSL/HTTPS habilitado
- [ ] Backup configurado

## Suporte

Para problemas no deploy:

1. Verifique logs do build
2. Confira variáveis de ambiente
3. Teste build localmente
4. Consulte documentação da plataforma

---

**Ready to deploy! 🚀**