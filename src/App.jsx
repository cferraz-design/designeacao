import React, { useState, useCallback, useEffect } from 'react';
import { Timer, Users, Shuffle, Check, X, Eye, Crown, Gamepad2, Play, Pause, Lock, Unlock, RefreshCw } from 'lucide-react';

// ============================================================================
// CONSTANTS & TYPES
// ============================================================================

const JOGADORES = ['Amanda', 'Ange', 'Este', 'Hane', 'Lele', 'Lu', 'Sara'];
const CATEGORIAS = ['Difícil', 'Pessoas', 'Lazer', 'Mix', 'Objeto', 'Ação', '+A'];
const ADMIN_NAME = 'Cassiana';
const ROUND_DURATION_SECONDS = 60;

const PLUS_A_WORDS = [
  // Pessoas e Lideranças
  'Fagner', 'Cassiana', 'Gustavo Borges', 'Jaqueline', 'Rodrigo Hubner',
  'Squad Design', 'Time Comercial', 'Time Produto', 'PO', 'Tech Lead',
  'Severo', 'Estudante', 'Core',
  
  // Produtos e Plataformas
  'AVALIA', 'Avalia Pro', 'Avalia Forms', 'LXP', 'Artmed', 'Catalogo',
  'Minha Biblioteca', 'Academic Portfolio', 'Sistema Acadêmico', 'Portal do Aluno',
  'Ambiente Virtual', 'Plataforma EAD', 'Trilhas de Aprendizagem',
  'Jaleko', 'Orbita', 'Unidade de aprendizagem', 'Laboratório virtual', 'Objetos imersivos',
  
  // Ferramentas e Tecnologias
  'Figma', 'FigJam', 'Jira', 'Confluence', 'Slack', 'Azure', 'DevOps',
  'GitHub', 'VSCode', 'Design System', 'Component Library', 'Storybook',
  
  // Processos e Metodologias
  'Sprint', 'Daily', 'Retrospectiva', 'Planning', 'Review', 'Refinamento',
  'Backlog', 'User Story', 'Epic', 'Feature', 'Bug', 'Hotfix', 'Deploy',
  'Discovery', 'Squad', 'OKR', 'KPI', 'Roadmap', 'Milestone',
  
  // Cultura e Eventos
  'Cabelo Maluco', 'Pulse', 'Plano de carreira', 'Feedback 360', 'PDI',
  'Happy Hour', 'Festa de fim de ano', 'Aniversário', 'Café com Design',
  'Show and Tell', 'Brown Bag', 'Hackathon', 'Design Critique',
  
  // Jargões e Expressões +A
  'Nada é escrito em pedra', 'Ecossistema', 'Sinergia', 'Alinhamento',
  'Stakeholder', 'Trade-off', 'Benchmark', 'MVP', 'POC', 'Proof of Concept',
  'Go Live', 'Rollout', 'Onboarding', 'Offboarding', 'Handoff',
  
  // Design e UX
  'Wireframe', 'Mockup', 'Protótipo', 'Persona', 'Jornada do Usuário',
  'Card Sorting', 'Teste de Usabilidade', 'Heurística', 'Acessibilidade',
  'Design Thinking', 'Atomic Design', 'Mobile First', 'Responsivo',
  'Microcopy', 'Tone of Voice', 'UI Kit', 'Pattern', 'Guideline',
  
  // Educação e Pedagogia
  'EAD', 'Ensino Híbrido', 'Metodologia Ativa', 'Gamificação',
  'Aprendizagem Adaptativa', 'Curadoria de Conteúdo', 'Sequência Didática',
  'Objeto de Aprendizagem', 'Rubrica', 'Competência', 'Habilidade',
  'BNCC', 'Matriz Curricular', 'Plano de Ensino', 'Atividade Avaliativa',
  
  // Métricas e Análise
  'NPS', 'CSAT', 'Churn', 'Retenção', 'Conversão', 'Engajamento',
  'Taxa de Abandono', 'Funil', 'Analytics', 'Heatmap', 'Session Recording',
  'A/B Test', 'Cohort', 'Dashboard', 'Métrica de Vaidade'
];

const WORD_POOLS = {
  'Difícil': [
    'paralelepípedo', 'otorrinolaringologista', 'xilogravura', 'hipotenusa',
    'pneumoultramicroscopicossilicovulcanoconiótico', 'inconstitucionalissimamente',
    'esternocleidomastóideo', 'oftalmologista', 'monocromático', 'pterodáctilo',
    'caleidoscópio', 'psicossomático', 'eletroencefalograma', 'extraordinário',
    'antropomórfico', 'introspectivo', 'procrastinação', 'nostalgia', 'serendipidade', 'efêmero',
    'idiossincrasia', 'paradoxo', 'anacrônico', 'onomatopeia', 'pleonasmo',
    'eufemismo', 'antonomásia', 'hipérbole', 'metáfora', 'metonímia',
    'sinestesia', 'ambiguidade', 'eclesiástico', 'filantropo', 'heterogêneo',
    'hermético', 'inaudito', 'lacônico', 'magnânimo', 'negligência',
    'obsoleto', 'paradigma', 'quimera', 'reticente', 'superfluo',
    'tangível', 'ubíquo', 'verossímil', 'xenofobia', 'zelo'
  ],
  'Pessoas': [
    'médico', 'DJ', 'chefe', 'piloto', 'bibliotecária', 'enfermeiro', 'bombeiro',
    'professor', 'cientista', 'arquiteto', 'cozinheiro', 'policial', 'veterinário',
    'astronauta', 'músico', 'dançarino', 'ator', 'diretor', 'designer', 'programador',
    'advogado', 'juiz', 'presidente', 'prefeito', 'mergulhador', 'surfista',
    'mágico', 'palhaço', 'fotógrafo', 'jornalista', 'engenheiro', 'dentista',
    'psicólogo', 'personal trainer', 'massagista', 'cabeleireiro', 'maquiador',
    'tatuador', 'barista', 'sommelier', 'bartender', 'garçom', 'recepcionista',
    'secretária', 'contador', 'economista', 'administrador', 'gerente', 'supervisor',
    'coordenador', 'analista', 'assistente', 'estagiário', 'consultor', 'auditor',
    'instrutor', 'palestrante', 'coach', 'mentor', 'tutor', 'monitor'
  ],
  'Lazer': [
    'cinema', 'banda', 'artista', 'livro', 'país', 'reality show', 'série', 'filme',
    'teatro', 'musical', 'festival', 'parque', 'praia', 'montanha', 'museu',
    'exposição', 'concerto', 'show', 'karaokê', 'balada', 'restaurante', 'viagem',
    'acampamento', 'piquenique', 'churrasco', 'podcast', 'documentário', 'videogame',
    'esporte', 'yoga', 'spa', 'boliche', 'cinema drive-in', 'escape room',
    'paintball', 'kart', 'trilha', 'rapel', 'escalada', 'surf', 'mergulho',
    'vôlei', 'futebol', 'basquete', 'tênis', 'natação', 'corrida', 'ciclismo',
    'patinação', 'skate', 'dança', 'zumba', 'pilates', 'crossfit', 'academia',
    'leitura', 'pintura', 'artesanato', 'jardinagem', 'culinária', 'fotografia',
    'viagem de carro', 'cruzeiro', 'mochilão', 'camping', 'glamping', 'resort'
  ],
  'Objeto': [
    'escova', 'jarra', 'drone', 'teclado', 'violão', 'cadeira', 'mesa', 'lápis',
    'caneta', 'livro', 'telefone', 'relógio', 'óculos', 'chapéu', 'sapato',
    'mochila', 'garrafa', 'xícara', 'prato', 'colher', 'garfo', 'faca', 'panela',
    'frigideira', 'liquidificador', 'micro-ondas', 'geladeira', 'ventilador',
    'ar-condicionado', 'espelho', 'bola', 'raquete', 'bicicleta', 'patins', 'skate',
    'violino', 'bateria', 'câmera', 'microfone', 'fone de ouvido', 'mouse',
    'mousepad', 'webcam', 'monitor', 'notebook', 'tablet', 'smartwatch',
    'carregador', 'power bank', 'pendrive', 'HD externo', 'caixa de som',
    'aspirador', 'ferro de passar', 'secador', 'chapinha', 'barbeador',
    'escova de dentes', 'pasta de dente', 'sabonete', 'shampoo', 'perfume',
    'desodorante', 'travesseiro', 'cobertor', 'lençol', 'toalha', 'tapete',
    'cortina', 'almofada', 'quadro', 'vaso', 'planta', 'luminária', 'abajur'
  ],
  'Ação': [
    'correr', 'dançar', 'pular', 'escrever', 'desenhar', 'cozinhar', 'nadar',
    'dirigir', 'cantar', 'tocar', 'ler', 'estudar', 'trabalhar', 'dormir',
    'acordar', 'comer', 'beber', 'andar', 'sentar', 'levantar', 'abraçar',
    'beijar', 'sorrir', 'chorar', 'rir', 'gritar', 'sussurrar', 'pensar',
    'sonhar', 'meditar', 'respirar', 'pular corda', 'aplaudir', 'acenar',
    'digitar', 'clicar', 'fotografar', 'filmar', 'pintar', 'limpar', 'varrer',
    'lavar', 'secar', 'pentear', 'barbear', 'maquiar', 'alongar', 'exercitar',
    'pedalar', 'remar', 'escalar', 'mergulhar', 'voar', 'surfar', 'esquiar',
    'patinar', 'deslizar', 'rolar', 'girar', 'balançar', 'empurrar', 'puxar',
    'carregar', 'levantar peso', 'agachar', 'flexionar', 'estender', 'dobrar',
    'torcer', 'apertar', 'soltar', 'jogar', 'chutar', 'arremessar', 'pegar',
    'agarrar', 'segurar', 'largar', 'bater palmas', 'assobiar', 'espirrar',
    'tossir', 'bocejar', 'espreguiçar', 'coçar', 'massagear', 'acariciar'
  ]
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function generateWord(categoria, usedWords) {
  if (categoria === '+A') {
    const available = PLUS_A_WORDS.filter(word => !usedWords.includes(word));
    if (available.length === 0) {
      throw new Error('Lista +A esgotada');
    }
    return available[Math.floor(Math.random() * available.length)];
  }

  if (categoria === 'Mix') {
    const mixCategories = ['Difícil', 'Pessoas', 'Lazer', 'Objeto', 'Ação'];
    const randomCategory = mixCategories[Math.floor(Math.random() * mixCategories.length)];
    return generateWord(randomCategory, usedWords);
  }

  const pool = WORD_POOLS[categoria];
  if (!pool) throw new Error(`Categoria inválida: ${categoria}`);

  const available = pool.filter(word => !usedWords.includes(word));
  if (available.length === 0) {
    throw new Error(`Todas as palavras da categoria "${categoria}" foram usadas`);
  }

  return available[Math.floor(Math.random() * available.length)];
}

function generateCardId(categoria, round) {
  const siglas = {
    'Difícil': 'DIF', 'Pessoas': 'PES', 'Lazer': 'LAZ',
    'Mix': 'MIX', 'Objeto': 'OBJ', 'Ação': 'ACA', '+A': 'PLA'
  };
  const sigla = siglas[categoria] || 'UNK';
  const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  return `CARD-${sigla}-${round}-${random}`;
}

function generateScore() {
  return Math.floor(Math.random() * 6) + 1;
}

// ============================================================================
// COMPONENTS
// ============================================================================

// Login Screen
function LoginScreen({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedNames, setSelectedNames] = useState([]);
  const [showToast, setShowToast] = useState('');

  const handleNameToggle = (name) => {
    if (selectedNames.includes(name)) {
      setSelectedNames(selectedNames.filter(n => n !== name));
    } else {
      setSelectedNames([...selectedNames, name]);
    }
  };

  const handleLogin = () => {
    if (selectedRole === 'admin') {
      onLogin('admin', [ADMIN_NAME]);
      return;
    }

    if (selectedRole === 'player' && selectedNames.length === 0) {
      setShowToast('Selecione pelo menos um jogador');
      setTimeout(() => setShowToast(''), 3000);
      return;
    }

    if (selectedRole === 'player') {
      onLogin('player', selectedNames);
      return;
    }

    if (selectedRole === 'spectator') {
      onLogin('spectator', []);
      return;
    }

    setShowToast('Selecione um papel');
    setTimeout(() => setShowToast(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 flex items-center justify-center p-6">
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-white border-2 border-purple-200 shadow-lg rounded-lg px-6 py-3 z-50">
          <p className="text-sm font-medium text-slate-800">{showToast}</p>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full border-4 border-purple-200">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            🎭 Imagem e Ação
          </h1>
          <p className="text-slate-600">Identifique-se para começar a jogar</p>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-800 mb-3">Selecione seu papel:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => {
                setSelectedRole('player');
                setSelectedNames([]);
              }}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedRole === 'player'
                  ? 'bg-purple-600 text-white border-purple-600 shadow-lg scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300'
              }`}
            >
              <Gamepad2 className="w-6 h-6 mx-auto mb-2" />
              <div className="font-bold">Jogador</div>
              <div className="text-xs opacity-80">Joga a rodada</div>
            </button>

            <button
              onClick={() => {
                setSelectedRole('admin');
                setSelectedNames([]);
              }}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedRole === 'admin'
                  ? 'bg-orange-600 text-white border-orange-600 shadow-lg scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-orange-300'
              }`}
            >
              <Crown className="w-6 h-6 mx-auto mb-2" />
              <div className="font-bold">Admin</div>
              <div className="text-xs opacity-80">Controla o jogo</div>
            </button>

            <button
              onClick={() => {
                setSelectedRole('spectator');
                setSelectedNames([]);
              }}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedRole === 'spectator'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
              }`}
            >
              <Eye className="w-6 h-6 mx-auto mb-2" />
              <div className="font-bold">Espectador</div>
              <div className="text-xs opacity-80">Apenas assiste</div>
            </button>
          </div>
        </div>

        {/* Player Selection (only if role is player) */}
        {selectedRole === 'player' && (
          <div className="mb-6 bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
            <h3 className="text-md font-bold text-purple-800 mb-3">
              Quem vai jogar esta rodada? (pode selecionar mais de um)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {JOGADORES.map(name => (
                <button
                  key={name}
                  onClick={() => handleNameToggle(name)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedNames.includes(name)
                      ? 'bg-purple-600 text-white shadow-md scale-105'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-purple-300'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
            {selectedNames.length > 0 && (
              <div className="mt-3 text-sm text-purple-700">
                <strong>Jogadores selecionados:</strong> {selectedNames.join(', ')}
              </div>
            )}
          </div>
        )}

        {selectedRole === 'admin' && (
          <div className="mb-6 bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
            <p className="text-sm text-orange-800">
              <strong>Cassiana</strong>, você terá acesso total ao jogo: pode ver todos os cards, 
              controlar o timer e gerenciar as rodadas.
            </p>
          </div>
        )}

        {selectedRole === 'spectator' && (
          <div className="mb-6 bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
            <p className="text-sm text-blue-800">
              Como espectador, você verá apenas a tela pública sem revelar os cards secretos.
            </p>
          </div>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
        >
          Entrar no Jogo
        </button>
      </div>
    </div>
  );
}

// Timer Component with Play/Pause
function Timer60s({ isRunning, onToggle, onComplete, timerKey }) {
  const [timeLeft, setTimeLeft] = useState(ROUND_DURATION_SECONDS);

  useEffect(() => {
    setTimeLeft(ROUND_DURATION_SECONDS);
  }, [timerKey]);

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      onComplete?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = Math.max(0, prev - 1);
        if (newTime === 0) onComplete?.();
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isRunning, onComplete]);

  const percentage = (timeLeft / ROUND_DURATION_SECONDS) * 100;
  const color = timeLeft > 30 ? 'bg-green-500' : timeLeft > 10 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-slate-600" />
          <span className="text-sm font-medium text-slate-600">Tempo</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onToggle}
            className={`p-2 rounded-lg transition-all ${
              isRunning 
                ? 'bg-orange-100 hover:bg-orange-200 text-orange-700' 
                : 'bg-green-100 hover:bg-green-200 text-green-700'
            }`}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <span className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-slate-800'}`}>
            {timeLeft}s
          </span>
        </div>
      </div>
      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-1000 ease-linear`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Category Badge
function CategoryBadge({ categoria }) {
  const colors = {
    'Difícil': 'bg-red-100 text-red-700 border-red-200',
    'Pessoas': 'bg-blue-100 text-blue-700 border-blue-200',
    'Lazer': 'bg-green-100 text-green-700 border-green-200',
    'Mix': 'bg-purple-100 text-purple-700 border-purple-200',
    'Objeto': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Ação': 'bg-orange-100 text-orange-700 border-orange-200',
    '+A': 'bg-pink-100 text-pink-700 border-pink-200'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${colors[categoria] || 'bg-gray-100 text-gray-700'}`}>
      {categoria}
    </span>
  );
}

// Card Display - Shows different views based on role
function CardDisplay({ card, userRole, userNames, isTimerRunning, onToggleTimer, timerKey, onRegenerate, onMarkWordAsUsed }) {
  const canSeeCard = userRole === 'admin' || 
                     (userRole === 'player' && card.jogadores.some(j => userNames.includes(j)));

  if (!canSeeCard) {
    return (
      <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl shadow-xl p-8 border-2 border-slate-300">
        <div className="text-center">
          <Lock className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-2xl font-black text-slate-600 mb-2">Card Oculto</h3>
          <p className="text-slate-500">
            Apenas {card.jogadores.join(' e ')} {card.jogadores.length > 1 ? 'podem' : 'pode'} ver este card
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <CategoryBadge categoria={card.categoria} />
            <span className="text-sm text-slate-600">
              Jogando: <strong>{card.jogadores.join(' e ')}</strong>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8 border-2 border-purple-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Unlock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800">Card Revelado</h3>
            <p className="text-sm text-slate-600">{card.jogadores.join(' e ')}</p>
          </div>
        </div>
        <CategoryBadge categoria={card.categoria} />
      </div>

      <div className="bg-white rounded-xl p-6 mb-4 border-2 border-slate-200">
        <div className="text-center space-y-4">
          {card.palavras.map((palavra, idx) => (
            <div key={idx} className="relative">
              <div className={`text-5xl font-black transition-all ${
                card.palavrasUsadas?.[idx] 
                  ? 'text-slate-300 line-through' 
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600'
              }`}>
                {palavra}
              </div>
              {card.palavras.length > 1 && (
                <div className="text-xs text-slate-500 mt-1">Opção {idx + 1}</div>
              )}
              {/* Botão para marcar palavra como usada */}
              {(userRole === 'admin' || userRole === 'player') && (
                <button
                  onClick={() => onMarkWordAsUsed(idx)}
                  className={`mt-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    card.palavrasUsadas?.[idx]
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-300'
                  }`}
                >
                  {card.palavrasUsadas?.[idx] ? '✓ Palavra Usada' : 'Marcar como Usada'}
                </button>
              )}
            </div>
          ))}
          
          <div className="inline-flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full border-2 border-yellow-200 mt-4">
            <span className="text-2xl">⭐</span>
            <span className="text-2xl font-bold text-yellow-700">{card.pontuacao} pontos</span>
          </div>
        </div>
      </div>

      {(userRole === 'admin' || userRole === 'player') && (
        <div className="mb-4">
          <button
            onClick={onRegenerate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Gerar Nova Palavra (se estiver difícil)
          </button>
        </div>
      )}

      <Timer60s 
        isRunning={isTimerRunning} 
        onToggle={onToggleTimer}
        timerKey={timerKey}
      />
    </div>
  );
}

// Game Setup - Category Selection Only
function GameSetup({ onGenerateCard, userRole, allPlayers }) {
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [numPalavras, setNumPalavras] = useState(1);
  const [showToast, setShowToast] = useState('');

  const handleGenerate = () => {
    if (!selectedCategoria) {
      setShowToast('Selecione uma categoria');
      setTimeout(() => setShowToast(''), 3000);
      return;
    }

    try {
      onGenerateCard(allPlayers, selectedCategoria, numPalavras);
      setShowToast('Card gerado! 🎉');
      setTimeout(() => setShowToast(''), 3000);
    } catch (error) {
      setShowToast(error.message);
      setTimeout(() => setShowToast(''), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6">
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-white border-2 border-purple-200 shadow-lg rounded-lg px-6 py-3 z-50">
          <p className="text-sm font-medium text-slate-800">{showToast}</p>
        </div>
      )}

      {/* Current Players Info */}
      {allPlayers.length > 0 && (
        <div className="bg-purple-50 rounded-2xl shadow-lg p-6 mb-6 border-2 border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-bold text-purple-800">Jogadores Ativos</h2>
          </div>
          <p className="text-slate-700">
            <strong>{allPlayers.join(', ')}</strong> {allPlayers.length > 1 ? 'podem' : 'pode'} ver os cards gerados
          </p>
          <p className="text-sm text-slate-600 mt-2">
            💡 Espectadores não conseguem ver os cards revelados
          </p>
        </div>
      )}

      {/* Category Selection */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Selecionar Categoria</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CATEGORIAS.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategoria(cat)}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                selectedCategoria === cat
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md scale-105'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Number of Words */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Quantas palavras no card?</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setNumPalavras(1)}
            className={`px-4 py-3 rounded-lg font-medium transition-all ${
              numPalavras === 1
                ? 'bg-purple-600 text-white shadow-md scale-105'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            1 palavra
          </button>
          <button
            onClick={() => setNumPalavras(2)}
            className={`px-4 py-3 rounded-lg font-medium transition-all ${
              numPalavras === 2
                ? 'bg-purple-600 text-white shadow-md scale-105'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            2 palavras (para escolher)
          </button>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!selectedCategoria}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        🎲 Gerar Card
      </button>
    </div>
  );
}

// Admin Dashboard
function AdminDashboard({ cards, onMarkAsUsed, onReshuffle, onViewCard }) {
  const [filter, setFilter] = useState('all');

  const filteredCards = cards.filter(card => {
    if (filter === 'used') return card.usado;
    if (filter === 'unused') return !card.usado;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex gap-3 mb-6">
        {[
          { value: 'all', label: 'Todos' },
          { value: 'unused', label: 'Não Usados' },
          { value: 'used', label: 'Usados' }
        ].map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === value
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-orange-300'
            }`}
          >
            {label}
          </button>
        ))}
        <div className="ml-auto text-slate-600 font-medium">
          Total: {cards.length} cards
        </div>
      </div>

      <div className="grid gap-4">
        {filteredCards.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border-2 border-slate-200">
            <p className="text-slate-500 text-lg">Nenhum card encontrado</p>
          </div>
        ) : (
          filteredCards.map(card => (
            <div
              key={card.card_id}
              className={`bg-white rounded-xl p-6 border-2 shadow-md transition-all ${
                card.usado ? 'border-slate-300 opacity-60' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <CategoryBadge categoria={card.categoria} />
                    <span className="text-sm text-slate-500">{card.card_id}</span>
                    {card.usado && (
                      <span className="px-2 py-1 bg-slate-200 text-slate-600 rounded text-xs font-medium">
                        ✓ Usado
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Jogadores</p>
                      <p className="font-semibold text-slate-800">{card.jogadores.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Palavras</p>
                      <p className="font-semibold text-slate-800">{card.palavras.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Pontuação</p>
                      <p className="font-semibold text-slate-800">{card.pontuacao} pontos</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Round</p>
                      <p className="font-semibold text-slate-800">#{card.round}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => onViewCard(card)}
                    className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                    title="Visualizar"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onMarkAsUsed(card.card_id)}
                    className="p-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors"
                    title={card.usado ? 'Marcar como não usado' : 'Marcar como usado'}
                  >
                    {card.usado ? <X className="w-5 h-5" /> : <Check className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => onReshuffle(card.card_id)}
                    className="p-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg transition-colors"
                    title="Re-sortear"
                  >
                    <Shuffle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ============================================================================
// MAIN APP
// ============================================================================

export default function ImagemAcaoGame() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userNames, setUserNames] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]); // Lista de todos os jogadores identificados
  const [screen, setScreen] = useState('game');
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [usedWords, setUsedWords] = useState({
    'Difícil': [], 'Pessoas': [], 'Lazer': [], 'Mix': [],
    'Objeto': [], 'Ação': [], '+A': []
  });
  const [timerKey, setTimerKey] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [round, setRound] = useState(1);

  const handleLogin = (role, names) => {
    setUserRole(role);
    setUserNames(names);
    setIsLoggedIn(true);
    
    // Se for jogador, adiciona à lista de jogadores ativos
    if (role === 'player') {
      setAllPlayers(prev => {
        const newPlayers = [...prev];
        names.forEach(name => {
          if (!newPlayers.includes(name)) {
            newPlayers.push(name);
          }
        });
        return newPlayers;
      });
    }
  };

  const handleLogout = () => {
    // Remove jogadores que estão fazendo logout
    if (userRole === 'player') {
      setAllPlayers(prev => prev.filter(p => !userNames.includes(p)));
    }
    
    setIsLoggedIn(false);
    setUserRole('');
    setUserNames([]);
    setScreen('game');
  };

  const generateCard = useCallback((jogadores, categoria, numPalavras) => {
    const palavras = [];
    for (let i = 0; i < numPalavras; i++) {
      const palavra = generateWord(categoria, usedWords[categoria]);
      palavras.push(palavra);
      setUsedWords(prev => ({
        ...prev,
        [categoria]: [...prev[categoria], palavra]
      }));
    }

    const pontuacao = generateScore();
    const card_id = generateCardId(categoria, round);

    const newCard = {
      timestamp: new Date().toISOString(),
      round,
      jogadores,
      categoria,
      palavras,
      palavrasUsadas: {}, // Inicializa objeto para rastrear palavras usadas
      pontuacao,
      card_id,
      admin: ADMIN_NAME,
      usado: false,
      duracao_segundos: ROUND_DURATION_SECONDS,
    };

    setCards(prev => [...prev, newCard]);
    setCurrentCard(newCard);
    setTimerKey(prev => prev + 1);
    setIsTimerRunning(false);
    setRound(prev => prev + 1);
  }, [usedWords, round]);

  const handleRegenerateWord = useCallback(() => {
    if (!currentCard) return;

    // Remove old words from used list
    currentCard.palavras.forEach(palavra => {
      setUsedWords(prev => ({
        ...prev,
        [currentCard.categoria]: prev[currentCard.categoria].filter(w => w !== palavra)
      }));
    });

    // Generate new words
    const newPalavras = [];
    for (let i = 0; i < currentCard.palavras.length; i++) {
      const palavra = generateWord(currentCard.categoria, usedWords[currentCard.categoria]);
      newPalavras.push(palavra);
      setUsedWords(prev => ({
        ...prev,
        [currentCard.categoria]: [...prev[currentCard.categoria], palavra]
      }));
    }

    const newPontuacao = generateScore();
    const newCardId = generateCardId(currentCard.categoria, currentCard.round);

    const updatedCard = {
      ...currentCard,
      palavras: newPalavras,
      pontuacao: newPontuacao,
      card_id: newCardId,
      palavrasUsadas: {}, // Reset palavras usadas
    };

    setCards(prev =>
      prev.map(c => c.card_id === currentCard.card_id ? updatedCard : c)
    );
    setCurrentCard(updatedCard);
    setTimerKey(prev => prev + 1);
    setIsTimerRunning(false);
  }, [currentCard, usedWords]);

  const handleMarkWordAsUsed = useCallback((wordIndex) => {
    if (!currentCard) return;

    const updatedCard = {
      ...currentCard,
      palavrasUsadas: {
        ...currentCard.palavrasUsadas,
        [wordIndex]: !currentCard.palavrasUsadas[wordIndex]
      }
    };

    setCards(prev =>
      prev.map(c => c.card_id === currentCard.card_id ? updatedCard : c)
    );
    setCurrentCard(updatedCard);
  }, [currentCard]);

  const handleMarkAsUsed = useCallback((cardId) => {
    setCards(prev =>
      prev.map(c => c.card_id === cardId ? { ...c, usado: !c.usado } : c)
    );
    if (currentCard?.card_id === cardId) {
      setCurrentCard(prev => prev ? { ...prev, usado: !prev.usado } : null);
    }
  }, [currentCard]);

  const handleReshuffle = useCallback((cardId) => {
    const card = cards.find(c => c.card_id === cardId);
    if (!card) return;

    card.palavras.forEach(palavra => {
      setUsedWords(prev => ({
        ...prev,
        [card.categoria]: prev[card.categoria].filter(w => w !== palavra)
      }));
    });

    const newPalavras = [];
    for (let i = 0; i < card.palavras.length; i++) {
      const palavra = generateWord(card.categoria, usedWords[card.categoria]);
      newPalavras.push(palavra);
      setUsedWords(prev => ({
        ...prev,
        [card.categoria]: [...prev[card.categoria], palavra]
      }));
    }

    const newPontuacao = generateScore();
    const newCardId = generateCardId(card.categoria, card.round);

    const updatedCard = {
      ...card,
      palavras: newPalavras,
      pontuacao: newPontuacao,
      card_id: newCardId,
      usado: false,
      palavrasUsadas: {} // Reset palavras usadas no reshuffle
    };

    setCards(prev =>
      prev.map(c => c.card_id === cardId ? updatedCard : c)
    );

    if (currentCard?.card_id === cardId) {
      setCurrentCard(updatedCard);
      setTimerKey(prev => prev + 1);
    }
  }, [cards, currentCard, usedWords]);

  const handleViewCard = useCallback((card) => {
    setCurrentCard(card);
    setScreen('game');
  }, []);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b-2 border-slate-200 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🎭 Imagem e Ação
            </h1>
            <div className="flex items-center gap-2">
              {userRole === 'admin' && (
                <div className="bg-orange-100 px-3 py-1 rounded-full flex items-center gap-1">
                  <Crown className="w-4 h-4 text-orange-700" />
                  <span className="text-sm text-orange-700 font-semibold">Admin</span>
                </div>
              )}
              {userRole === 'player' && (
                <div className="bg-purple-100 px-3 py-1 rounded-full flex items-center gap-1">
                  <Gamepad2 className="w-4 h-4 text-purple-700" />
                  <span className="text-sm text-purple-700 font-semibold">{userNames.join(', ')}</span>
                </div>
              )}
              {userRole === 'spectator' && (
                <div className="bg-blue-100 px-3 py-1 rounded-full flex items-center gap-1">
                  <Eye className="w-4 h-4 text-blue-700" />
                  <span className="text-sm text-blue-700 font-semibold">Espectador</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            {userRole === 'admin' && (
              <>
                <button
                  onClick={() => setScreen('game')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    screen === 'game'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-purple-300'
                  }`}
                >
                  <Gamepad2 className="w-4 h-4" />
                  Jogo
                </button>
                <button
                  onClick={() => setScreen('admin')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    screen === 'admin'
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-orange-300'
                  }`}
                >
                  <Crown className="w-4 h-4" />
                  Dashboard
                </button>
              </>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8">
        {screen === 'game' ? (
          <div className="space-y-6">
            {!currentCard && (userRole === 'admin' || userRole === 'player') && (
              <GameSetup onGenerateCard={generateCard} userRole={userRole} allPlayers={allPlayers} />
            )}

            {currentCard && (
              <div className="max-w-4xl mx-auto px-6">
                <CardDisplay
                  card={currentCard}
                  userRole={userRole}
                  userNames={userNames}
                  isTimerRunning={isTimerRunning}
                  onToggleTimer={() => setIsTimerRunning(!isTimerRunning)}
                  timerKey={timerKey}
                  onRegenerate={handleRegenerateWord}
                  onMarkWordAsUsed={handleMarkWordAsUsed}
                />

                {(userRole === 'admin' || userRole === 'player') && (
                  <div className="mt-6">
                    <button
                      onClick={() => setCurrentCard(null)}
                      className="w-full bg-slate-600 hover:bg-slate-700 text-white py-3 rounded-xl font-medium transition-colors"
                    >
                      Finalizar Rodada e Gerar Novo Card
                    </button>
                  </div>
                )}
              </div>
            )}

            {!currentCard && userRole === 'spectator' && (
              <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-slate-200">
                  <Eye className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-700 mb-2">Aguardando próxima rodada</h3>
                  <p className="text-slate-500">Um novo card será gerado em breve</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <AdminDashboard
            cards={cards}
            onMarkAsUsed={handleMarkAsUsed}
            onReshuffle={handleReshuffle}
            onViewCard={handleViewCard}
          />
        )}
      </div>
    </div>
  );
}
