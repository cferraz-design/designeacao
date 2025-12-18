#!/bin/bash

echo "🎭 Setup do Jogo Imagem e Ação - GitHub"
echo "========================================"
echo ""

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se está na pasta correta
if [ ! -f "package.json" ]; then
    echo "❌ Execute este script na pasta do projeto!"
    exit 1
fi

echo -e "${BLUE}Passo 1: Inicializando Git...${NC}"
git init
echo -e "${GREEN}✓ Git inicializado${NC}"
echo ""

echo -e "${BLUE}Passo 2: Adicionando arquivos...${NC}"
git add .
echo -e "${GREEN}✓ Arquivos adicionados${NC}"
echo ""

echo -e "${BLUE}Passo 3: Primeiro commit...${NC}"
git commit -m "Initial commit - Jogo Imagem e Ação"
echo -e "${GREEN}✓ Commit realizado${NC}"
echo ""

echo -e "${YELLOW}Agora você precisa:${NC}"
echo ""
echo "1. Criar um repositório no GitHub:"
echo "   https://github.com/new"
echo ""
echo "2. Copiar a URL do repositório (ex: https://github.com/SEU-USUARIO/imagem-e-acao.git)"
echo ""
echo "3. Execute os comandos:"
echo -e "${GREEN}   git remote add origin https://github.com/SEU-USUARIO/imagem-e-acao.git${NC}"
echo -e "${GREEN}   git branch -M main${NC}"
echo -e "${GREEN}   git push -u origin main${NC}"
echo ""
echo "4. Depois faça deploy:"
echo "   • Vercel: https://vercel.com"
echo "   • Netlify: https://netlify.com"
echo "   • GitHub Pages: Ative em Settings > Pages"
echo ""
echo -e "${GREEN}✨ Setup inicial completo!${NC}"
