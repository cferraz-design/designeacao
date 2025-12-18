# 🚀 GUIA ULTRA RÁPIDO - GitHub + Deploy

## ⚡ 3 Passos Simples

### 1️⃣ CRIAR REPOSITÓRIO NO GITHUB
```
1. Acesse: https://github.com/new
2. Nome: imagem-e-acao
3. Deixe PÚBLICO (ou privado se preferir)
4. NÃO marque nenhuma opção adicional
5. Clique em "Create repository"
```

### 2️⃣ SUBIR OS ARQUIVOS
```bash
# Extrair o arquivo imagem-acao-github.tar.gz
# Abrir terminal na pasta extraída (github-deploy)

# Executar estes comandos (um por vez):
git init
git add .
git commit -m "Jogo Imagem e Ação - Design +A"
git remote add origin https://github.com/SEU-USUARIO/imagem-e-acao.git
git branch -M main
git push -u origin main
```

**IMPORTANTE**: Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub!

### 3️⃣ FAZER DEPLOY (Escolha UMA opção)

#### OPÇÃO A: Vercel (Mais Fácil) ⭐
```
1. Acesse: https://vercel.com
2. Login com GitHub
3. "New Project" > Selecione seu repositório
4. "Deploy"
5. PRONTO! Pegue a URL e compartilhe
```

#### OPÇÃO B: Netlify
```
1. Acesse: https://app.netlify.com
2. "New site from Git" > GitHub
3. Selecione o repositório
4. Build command: npm run build
5. Publish directory: dist
6. "Deploy site"
```

#### OPÇÃO C: GitHub Pages (Deploy Automático)
```
1. No seu repositório GitHub, vá em "Settings"
2. Menu lateral > "Pages"
3. Source: "GitHub Actions"
4. Aguarde o workflow rodar (aba "Actions")
5. URL estará em Settings > Pages
```

---

## 🎯 Resumo Visual

```
📁 Extrai arquivo
    ↓
💻 Abre terminal na pasta
    ↓
📝 Roda comandos git
    ↓
🚀 Escolhe Vercel/Netlify/GitHub Pages
    ↓
🎉 JOGO NO AR!
```

---

## ✅ Checklist Rápida

- [ ] Extraí o arquivo .tar.gz
- [ ] Criei repositório no GitHub
- [ ] Rodei comandos git (init, add, commit, remote, push)
- [ ] Fiz deploy em Vercel/Netlify/GitHub Pages
- [ ] Recebi a URL do jogo
- [ ] Testei acessando a URL
- [ ] Funcionou! 🎉

---

## 🆘 Comandos Git Não Funcionam?

### Opção Alternativa: GitHub Desktop

1. Baixe: https://desktop.github.com
2. Instale e faça login
3. "Add" > "Add existing repository" > Selecione a pasta
4. "Publish repository"
5. Pronto! Vai pro GitHub automaticamente

Depois só fazer deploy em Vercel/Netlify como acima.

---

## 💡 URLs Finais

Após deploy, você terá algo como:
- Vercel: `https://imagem-e-acao.vercel.app`
- Netlify: `https://imagem-e-acao.netlify.app`
- GitHub Pages: `https://seu-usuario.github.io/imagem-e-acao`

**Compartilhe essa URL com o time!** 📱

---

## 🎮 Testando

1. Abra a URL
2. Clique em "Jogador" e selecione seu nome
3. Gere um card
4. Jogue! 🎭

**Cada pessoa do time deve:**
1. Acessar a mesma URL
2. Se identificar (Jogador/Admin/Espectador)
3. Jogar junto!

---

Dúvidas? Me chama! 💜
