# Chess Game Frontend

Um jogo de xadrez moderno desenvolvido com React e TypeScript, utilizando as melhores práticas de UX/UI Design.

## Características

- **Interface Moderna**: Design responsivo e intuitivo
- **Tabuleiro Interativo**: Arrastar e soltar peças com validação de movimentos
- **Lógica Completa**: Implementação completa das regras do xadrez
- **Feedback Visual**: Indicações claras de xeque, xeque-mate e movimentos válidos
- **Histórico de Movimentos**: Acompanhe todos os movimentos da partida
- **Peças Capturadas**: Visualização das peças capturadas por cada jogador
- **Controles de Jogo**: Desfazer movimentos e iniciar nova partida

## Tecnologias Utilizadas

- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **react-chessboard** - Componente de tabuleiro de xadrez interativo
- **chess.js** - Biblioteca para lógica e validação do jogo de xadrez
- **CSS3** - Estilização moderna e responsiva

## Funcionalidades Implementadas

### ✅ Funcionalidades Básicas
- [x] Tabuleiro de xadrez interativo
- [x] Movimentação de peças por arrastar e soltar
- [x] Validação de movimentos legais
- [x] Detecção de xeque e xeque-mate
- [x] Alternância de turnos entre jogadores
- [x] Promoção automática de peões (para rainha)

### ✅ Interface de Usuário
- [x] Design responsivo para diferentes tamanhos de tela
- [x] Indicação visual do status do jogo
- [x] Histórico de movimentos em notação algébrica
- [x] Exibição de peças capturadas
- [x] Controles para desfazer movimento e reiniciar jogo

### ✅ Recursos Avançados
- [x] Movimentos especiais (roque, en passant)
- [x] Detecção de empate por material insuficiente
- [x] Interface adaptável para dispositivos móveis

## Como Executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar em modo de desenvolvimento:**
   ```bash
   npm start
   ```

3. **Abrir no navegador:**
   A aplicação será aberta automaticamente em `http://localhost:3000`

## Estrutura do Projeto

```
chess-frontend/
├── public/
│   └── index.html          # Template HTML principal
├── src/
│   ├── App.tsx            # Componente principal da aplicação
│   ├── App.css            # Estilos específicos do App
│   ├── index.tsx          # Ponto de entrada da aplicação
│   └── index.css          # Estilos globais
├── package.json           # Dependências e scripts
└── tsconfig.json         # Configuração do TypeScript
```

## Scripts Disponíveis

- `npm start` - Executa a aplicação em modo de desenvolvimento
- `npm build` - Cria uma versão otimizada para produção
- `npm test` - Executa os testes
- `npm eject` - Remove a abstração do Create React App (irreversível)

## Próximas Melhorias

- [ ] Sistema de tempo por jogada
- [ ] Salvamento e carregamento de partidas
- [ ] Análise de posição
- [ ] Temas personalizáveis
- [ ] Modo multiplayer online
- [ ] Integração com engines de xadrez para análise

## Contribuição

Este projeto foi desenvolvido como uma demonstração de frontend moderno para jogos de xadrez, integrando as melhores práticas de desenvolvimento React com TypeScript.
