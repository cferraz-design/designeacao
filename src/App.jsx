import React, { useState, useCallback, useEffect } from 'react';
import { Timer, Users, Shuffle, Check, X, Eye, Crown, Gamepad2, Play, Pause, Lock, Unlock, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, push, update, remove, serverTimestamp } from 'firebase/database';

// ============================================================================
// FIREBASE CONFIG
// ============================================================================

const firebaseConfig = {
  apiKey: "AIzaSyDb8FVRLO-r2Vhn0a_mCpIus3IH2iqe8Oc",
  authDomain: "designeacao-213e6.firebaseapp.com",
  databaseURL: "https://designeacao-213e6-default-rtdb.firebaseio.com",
  projectId: "designeacao-213e6",
  storageBucket: "designeacao-213e6.firebasestorage.app",
  messagingSenderId: "741761433430",
  appId: "1:741761433430:web:48ef895a7a5378126220f7"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ============================================================================
// CONSTANTS & TYPES
// ============================================================================

const JOGADORES = ['Amanda', 'Ange', 'Este', 'Hane', 'Lele', 'Lu', 'Sara'];
const CATEGORIAS = ['Difícil', 'Pessoas', 'Lazer', 'Mix', 'Objeto', 'Ação', '+A'];
const ADMIN_NAME = 'Cassiana';
const ROUND_DURATION_SECONDS = 60;

const PLUS_A_WORDS = [
  'Fagner', 'Cassiana', 'Gustavo Borges', 'Jaqueline', 'Rodrigo Hubner',
  'Squad Design', 'Time Comercial', 'Time Produto', 'PO', 'Tech Lead',
  'Severo', 'Estudante', 'Core',
  'AVALIA', 'Avalia Pro', 'Avalia Forms', 'LXP', 'Artmed', 'Catalogo',
  'Minha Biblioteca', 'Academic Portfolio', 'Sistema Acadêmico', 'Portal do Aluno',
  'Ambiente Virtual', 'Plataforma EAD', 'Trilhas de Aprendizagem',
  'Jaleko', 'Orbita', 'Unidade de aprendizagem', 'Laboratório virtual', 'Objetos imersivos',
  'Figma', 'FigJam', 'Jira', 'Confluence', 'Slack', 'Azure', 'DevOps',
  'GitHub', 'VSCode', 'Design System', 'Component Library', 'Storybook',
  'Sprint', 'Daily', 'Retrospectiva', 'Planning', 'Review', 'Refinamento',
  'Backlog', 'User Story', 'Epic', 'Feature', 'Bug', 'Hotfix', 'Deploy',
  'Discovery', 'Squad', 'OKR', 'KPI', 'Roadmap', 'Milestone',
  'Cabelo Maluco', 'Pulse', 'Plano de carreira', 'Feedback 360', 'PDI',
  'Happy Hour', 'Festa de fim de ano', 'Aniversário', 'Café com Design',
  'Show and Tell', 'Brown Bag', 'Hackathon', 'Design Critique',
  'Nada é escrito em pedra', 'Ecossistema', 'Sinergia', 'Alinhamento',
  'Stakeholder', 'Trade-off', 'Benchmark', 'MVP', 'POC', 'Proof of Concept',
  'Go Live', 'Rollout', 'Onboarding', 'Offboarding', 'Handoff',
  'Wireframe', 'Mockup', 'Protótipo', 'Persona', 'Jornada do Usuário',
  'Card Sorting', 'Teste de Usabilidade', 'Heurística', 'Acessibilidade',
  'Design Thinking', 'Atomic Design', 'Mobile First', 'Responsivo',
  'Microcopy', 'Tone of Voice', 'UI Kit', 'Pattern', 'Guideline',
  'EAD', 'Ensino Híbrido', 'Metodologia Ativa', 'Gamificação',
  'Aprendizagem Adaptativa', 'Curadoria de Conteúdo', 'Sequência Didática',
  'Objeto de Aprendizagem', 'Rubrica', 'Competência', 'Habilidade',
  'BNCC', 'Matriz Curricular', 'Plano de Ensino', 'Atividade Avaliativa',
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
    if (available.length === 0) throw new Error('Lista +A esgotada');
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
          <div className="flex items-center justify-center gap-2 mt-2">
            <Wifi className="w-4 h-4 text-green-600" />
            <span className="text-xs text-green-600 font-medium">Multiplayer Online</span>
          </div>
        </div>

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

        {selectedRole === 'player' && (
          <div className="mb-6 bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
            <h3 className="text-md font-bold text-purple-800 mb-3">
              Quem vai jogar? (pode selecionar mais de um)
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
              <strong>Cassiana</strong>, você terá acesso total ao jogo e verá todos os jogadores online em tempo real!
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

// Online Players Panel
function OnlinePlayersPanel({ players }) {
  if (!players || Object.keys(players).length === 0) {
    return (
      <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
        <div className="flex items-center gap-2 mb-2">
          <WifiOff className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-bold text-slate-600">Jogadores Online</h3>
        </div>
        <p className="text-xs text-slate-500">Nenhum jogador online</p>
      </div>
    );
  }

  const playersList = Object.values(players);

  return (
    <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
      <div className="flex items-center gap-2 mb-3">
        <Wifi className="w-4 h-4 text-green-600 animate-pulse" />
        <h3 className="text-sm font-bold text-green-800">
          Jogadores Online ({playersList.length})
        </h3>
      </div>
      <div className="space-y-2">
        {playersList.map((player, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-green-200"
          >
            <div className="flex items-center gap-2">
              {player.role === 'admin' && <Crown className="w-4 h-4 text-orange-600" />}
              {player.role === 'player' && <Gamepad2 className="w-4 h-4 text-purple-600" />}
              {player.role === 'spectator' && <Eye className="w-4 h-4 text-blue-600" />}
              <span className="text-sm font-medium text-slate-800">
                {player.names?.join(', ') || 'Anônimo'}
              </span>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Timer Component
function Timer60s({ gameState, onToggle }) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!gameState?.timerStartTime || !gameState?.timerRunning) {
      setTimeLeft(gameState?.timerValue || ROUND_DURATION_SECONDS);
      return;
    }

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - gameState.timerStartTime) / 1000);
      const remaining = Math.max(0, ROUND_DURATION_SECONDS - elapsed);
      setTimeLeft(remaining);
    }, 100);

    return () => clearInterval(interval);
  }, [gameState]);

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
              gameState?.timerRunning
                ? 'bg-orange-100 hover:bg-orange-200 text-orange-700'
                : 'bg-green-100 hover:bg-green-200 text-green-700'
            }`}
          >
            {gameState?.timerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <span className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-slate-800'}`}>
            {timeLeft}s
          </span>
        </div>
      </div>
      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-300 ease-linear`}
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

// Card Display
function CardDisplay({ card, userRole, userNames, gameState, onToggleTimer, onRegenerate, onMarkWordAsUsed }) {
  if (!card) return null;

  const canSeeCard = userRole === 'admin' ||
    (userRole === 'player' && card.jogadores?.some(j => userNames?.includes(j)));

  if (!canSeeCard) {
    return (
      <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl shadow-xl p-8 border-2 border-slate-300">
        <div className="text-center">
          <Lock className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-2xl font-black text-slate-600 mb-2">Card Oculto</h3>
          <p className="text-slate-500">
            Apenas {card.jogadores?.join(' e ')} podem ver este card
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <CategoryBadge categoria={card.categoria} />
            <span className="text-sm text-slate-600">
              Jogando: <strong>{card.jogadores?.join(' e ')}</strong>
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
            <p className="text-sm text-slate-600">{card.jogadores?.join(' e ')}</p>
          </div>
        </div>
        <CategoryBadge categoria={card.categoria} />
      </div>

      <div className="bg-white rounded-xl p-6 mb-4 border-2 border-slate-200">
        <div className="text-center space-y-4">
          {card.palavras?.map((palavra, idx) => (
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
            Gerar Nova Palavra
          </button>
        </div>
      )}

      <Timer60s gameState={gameState} onToggle={onToggleTimer} />
    </div>
  );
}

// Game Setup
function GameSetup({ onGenerateCard, allPlayers }) {
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

      {allPlayers.length > 0 && (
        <div className="bg-purple-50 rounded-2xl shadow-lg p-6 mb-6 border-2 border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-bold text-purple-800">Jogadores Ativos</h2>
          </div>
          <p className="text-slate-700">
            <strong>{allPlayers.join(', ')}</strong> podem ver os cards gerados
          </p>
        </div>
      )}

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
            2 palavras
          </button>
        </div>
      </div>

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

// ============================================================================
// MAIN APP
// ============================================================================

export default function ImagemAcaoGame() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userNames, setUserNames] = useState([]);
  const [userId, setUserId] = useState(null);
  const [onlinePlayers, setOnlinePlayers] = useState({});
  const [gameState, setGameState] = useState(null);
  const [allPlayers, setAllPlayers] = useState([]);
  const [usedWords, setUsedWords] = useState({
    'Difícil': [], 'Pessoas': [], 'Lazer': [], 'Mix': [],
    'Objeto': [], 'Ação': [], '+A': []
  });

  // Listen to online players
  useEffect(() => {
    const playersRef = ref(database, 'players');
    const unsubscribe = onValue(playersRef, (snapshot) => {
      const players = snapshot.val() || {};
      setOnlinePlayers(players);

      // Extract all player names
      const names = [];
      Object.values(players).forEach(player => {
        if (player.role === 'player' && player.names) {
          names.push(...player.names);
        }
      });
      setAllPlayers([...new Set(names)]);
    });

    return () => unsubscribe();
  }, []);

  // Listen to game state
  useEffect(() => {
    const gameRef = ref(database, 'gameState');
    const unsubscribe = onValue(gameRef, (snapshot) => {
      const state = snapshot.val();
      if (state) {
        setGameState(state);
        if (state.usedWords) {
          setUsedWords(state.usedWords);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (role, names) => {
    const newUserId = push(ref(database, 'players')).key;
    await set(ref(database, `players/${newUserId}`), {
      role,
      names,
      timestamp: serverTimestamp()
    });

    setUserId(newUserId);
    setUserRole(role);
    setUserNames(names);
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    if (userId) {
      await remove(ref(database, `players/${userId}`));
    }
    setIsLoggedIn(false);
    setUserRole('');
    setUserNames([]);
    setUserId(null);
  };

  const generateCard = useCallback(async (jogadores, categoria, numPalavras) => {
    const palavras = [];
    for (let i = 0; i < numPalavras; i++) {
      const palavra = generateWord(categoria, usedWords[categoria]);
      palavras.push(palavra);
    }

    const pontuacao = generateScore();
    const card_id = generateCardId(categoria, gameState?.round || 1);

    const newCard = {
      timestamp: Date.now(),
      round: (gameState?.round || 0) + 1,
      jogadores,
      categoria,
      palavras,
      palavrasUsadas: {},
      pontuacao,
      card_id,
      admin: ADMIN_NAME,
    };

    const newUsedWords = { ...usedWords };
    palavras.forEach(p => {
      if (!newUsedWords[categoria]) newUsedWords[categoria] = [];
      newUsedWords[categoria].push(p);
    });

    await update(ref(database, 'gameState'), {
      currentCard: newCard,
      round: newCard.round,
      usedWords: newUsedWords,
      timerValue: ROUND_DURATION_SECONDS,
      timerRunning: false,
      timerStartTime: null
    });
  }, [usedWords, gameState]);

  const handleToggleTimer = async () => {
    const newRunning = !gameState?.timerRunning;
    await update(ref(database, 'gameState'), {
      timerRunning: newRunning,
      timerStartTime: newRunning ? Date.now() : null
    });
  };

  const handleRegenerateWord = async () => {
    if (!gameState?.currentCard) return;

    const card = gameState.currentCard;
    const newPalavras = [];

    for (let i = 0; i < card.palavras.length; i++) {
      const palavra = generateWord(card.categoria, usedWords[card.categoria]);
      newPalavras.push(palavra);
    }

    const newPontuacao = generateScore();
    const newCardId = generateCardId(card.categoria, card.round);

    const updatedCard = {
      ...card,
      palavras: newPalavras,
      pontuacao: newPontuacao,
      card_id: newCardId,
      palavrasUsadas: {}
    };

    const newUsedWords = { ...usedWords };
    newPalavras.forEach(p => {
      if (!newUsedWords[card.categoria]) newUsedWords[card.categoria] = [];
      newUsedWords[card.categoria].push(p);
    });

    await update(ref(database, 'gameState'), {
      currentCard: updatedCard,
      usedWords: newUsedWords,
      timerValue: ROUND_DURATION_SECONDS,
      timerRunning: false,
      timerStartTime: null
    });
  };

  const handleMarkWordAsUsed = async (wordIndex) => {
    if (!gameState?.currentCard) return;

    const updatedCard = {
      ...gameState.currentCard,
      palavrasUsadas: {
        ...gameState.currentCard.palavrasUsadas,
        [wordIndex]: !gameState.currentCard.palavrasUsadas?.[wordIndex]
      }
    };

    await update(ref(database, 'gameState/currentCard'), updatedCard);
  };

  const handleFinishRound = async () => {
    await update(ref(database, 'gameState'), {
      currentCard: null,
      timerValue: ROUND_DURATION_SECONDS,
      timerRunning: false,
      timerStartTime: null
    });
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
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

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors"
          >
            Sair
          </button>
        </div>
      </div>

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-[1fr_300px] gap-6">
            <div>
              {!gameState?.currentCard && (userRole === 'admin' || userRole === 'player') && (
                <GameSetup onGenerateCard={generateCard} allPlayers={allPlayers} />
              )}

              {gameState?.currentCard && (
                <div>
                  <CardDisplay
                    card={gameState.currentCard}
                    userRole={userRole}
                    userNames={userNames}
                    gameState={gameState}
                    onToggleTimer={handleToggleTimer}
                    onRegenerate={handleRegenerateWord}
                    onMarkWordAsUsed={handleMarkWordAsUsed}
                  />

                  {(userRole === 'admin' || userRole === 'player') && (
                    <div className="mt-6">
                      <button
                        onClick={handleFinishRound}
                        className="w-full bg-slate-600 hover:bg-slate-700 text-white py-3 rounded-xl font-medium transition-colors"
                      >
                        Finalizar Rodada e Gerar Novo Card
                      </button>
                    </div>
                  )}
                </div>
              )}

              {!gameState?.currentCard && userRole === 'spectator' && (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-slate-200">
                  <Eye className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-700 mb-2">Aguardando próxima rodada</h3>
                  <p className="text-slate-500">Um novo card será gerado em breve</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <OnlinePlayersPanel players={onlinePlayers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
