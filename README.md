# 🎭 Imagem e Ação - Design +A

Jogo de Imagem e Ação desenvolvido para a festa de fim de ano do time de Design da +A Educação.

## 🎮 Sobre o Jogo

Sistema interativo onde jogadores podem participar de rodadas de Imagem e Ação com controle de tempo, categorias temáticas e sistema de privacidade para cards secretos.

### Funcionalidades

- 🔐 **Sistema de Login**: Jogadores, Admin e Espectadores
- 👥 **Múltiplos Jogadores**: Vários participantes podem se identificar e jogar
- ⏯️ **Controle de Timer**: Play/Pause com contador de 60 segundos
- 🎲 **Categorias Variadas**: Difícil, Pessoas, Lazer, Mix, Objeto, Ação e +A
- 🔄 **Regeneração**: Troca de palavras difíceis durante o jogo
- 👁️ **Privacidade**: Apenas jogadores identificados e admin veem os cards
- 📊 **Dashboard Admin**: Controle completo e histórico de partidas

## 🚀 Deploy

### Vercel (Recomendado)

1. Fork este repositório
2. Acesse [vercel.com](https://vercel.com)
3. Importe o repositório
4. Deploy automático!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SEU-USUARIO/imagem-e-acao)

### Netlify

1. Fork este repositório
2. Acesse [netlify.com](https://netlify.com)
3. Conecte o repositório
4. Deploy!

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/SEU-USUARIO/imagem-e-acao)

## 💻 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📱 Como Usar

### 1. Login
- **Jogadores**: Selecionam seus nomes (podem marcar mais de um)
- **Admin (Cassiana)**: Acesso total e dashboard
- **Espectadores**: Apenas visualizam (sem ver cards)

### 2. Gerando Cards
- Escolha a categoria desejada
- Selecione 1 ou 2 palavras (2 palavras dá opção de escolha)
- Clique em "Gerar Card"

### 3. Durante a Rodada
- Timer inicia pausado
- Clique em ▶️ para começar a contagem
- Pause quando necessário
- Gere nova palavra se achar muito difícil

### 4. Visibilidade
- ✅ Jogadores identificados: Veem todos os cards
- ✅ Admin: Vê tudo + dashboard de controle
- ❌ Espectadores: Veem "Card Oculto"

## 🎯 Categorias

- 🔥 **Difícil**: Palavras complexas (paralelepípedo, otorrinolaringologista...)
- 👥 **Pessoas**: Profissões e tipos de pessoas
- 🎉 **Lazer**: Entretenimento, shows, viagens
- 🎲 **Mix**: Sorteia de qualquer categoria
- 📦 **Objeto**: Itens e objetos do dia a dia
- ⚡ **Ação**: Verbos e ações
- 💜 **+A**: Termos exclusivos da +A Educação (Figma, LXP, AVALIA...)

## 👥 Time

**Jogadores**: Amanda, Ange, Este, Hane, Lele, Lu, Sara  
**Admin**: Cassiana

## 🛠️ Tecnologias

- React 18
- Vite
- Tailwind CSS (via CDN)
- Lucide Icons

## 📄 Licença

Projeto desenvolvido para uso interno da +A Educação.

---

Desenvolvido com 💜 para a festa de fim de ano do time Design +A Educação
