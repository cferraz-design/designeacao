# 🚀 COMANDOS PARA SUBIR NO GITHUB

## Passo 1: Criar repositório no GitHub
1. Acesse: https://github.com/new
2. Nome do repositório: `imagem-e-acao` (ou o que preferir)
3. Descrição: "Jogo Imagem e Ação - Time Design +A"
4. Marque como "Public" ou "Private"
5. NÃO marque "Add a README file"
6. Clique em "Create repository"

## Passo 2: Comandos no Terminal

### Se for a primeira vez com este projeto:

```bash
# Navegar até a pasta do projeto
cd caminho/para/github-deploy

# Inicializar Git (se ainda não foi)
git init

# Adicionar todos os arquivos
git add .

# Fazer o commit inicial
git commit -m "Initial commit - Jogo Imagem e Ação"

# Adicionar o repositório remoto (substitua SEU-USUARIO pelo seu username do GitHub)
git remote add origin https://github.com/SEU-USUARIO/imagem-e-acao.git

# Definir branch principal
git branch -M main

# Fazer push
git push -u origin main
```

### Se já tem o repositório e quer atualizar:

```bash
# Adicionar alterações
git add .

# Commit
git commit -m "Update: melhorias no jogo"

# Push
git push
```

## Passo 3: Deploy Automático

### Opção A: Vercel
1. Acesse: https://vercel.com
2. Clique em "New Project"
3. Importe seu repositório do GitHub
4. Clique em "Deploy"
5. Pronto! URL gerada automaticamente

### Opção B: Netlify
1. Acesse: https://app.netlify.com
2. Clique em "New site from Git"
3. Conecte com GitHub
4. Selecione o repositório
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Clique em "Deploy site"

### Opção C: GitHub Pages
1. No seu repositório, vá em "Settings"
2. Navegue até "Pages"
3. Source: "GitHub Actions"
4. Crie o arquivo `.github/workflows/deploy.yml` (veja abaixo)
5. Push e aguarde o deploy

## Arquivo para GitHub Pages (opcional)

Crie: `.github/workflows/deploy.yml`

```yaml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Upload production-ready build files
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./dist

  deploy:
    name: Deploy
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

## ✅ Checklist

- [ ] Criei repositório no GitHub
- [ ] Executei os comandos git
- [ ] Fiz push para o GitHub
- [ ] Repositório está visível no GitHub
- [ ] Configurei deploy (Vercel/Netlify/GitHub Pages)
- [ ] Site está no ar
- [ ] Testei a URL
- [ ] Compartilhei com o time

## 🆘 Problemas Comuns

**Erro de autenticação no push:**
- Configure suas credenciais do GitHub
- Use Personal Access Token se necessário
- Link: https://github.com/settings/tokens

**Build falhando:**
- Certifique-se que node_modules não está no git
- Verifique se o .gitignore está correto
- Rode `npm install` localmente primeiro

**Site não carrega:**
- Aguarde 2-3 minutos após o deploy
- Verifique se a build completou com sucesso
- Limpe o cache do navegador (Ctrl+Shift+R)

## 📞 Dúvidas?

Se tiver qualquer problema, me avise que eu ajudo!
