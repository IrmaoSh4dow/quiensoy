import { AmbientBackground } from './components/AmbientBackground.tsx';
import { GameRoom } from './components/GameRoom.tsx';
import { PlayerSelect } from './components/PlayerSelect.tsx';
import { WelcomeScreen } from './components/WelcomeScreen.tsx';
import { partnerOf } from './domain/players.ts';
import { useMatch } from './hooks/useMatch.ts';

export default function App() {
  const match = useMatch();
  const partner = match.session ? partnerOf(match.session.player) : null;

  return (
    <div className="app">
      <AmbientBackground />
      <main className="stage">
        <div key={match.screen} className="screen">
          {match.screen === 'welcome' ? <WelcomeScreen onBegin={match.begin} /> : null}
          {match.screen === 'select' ? (
            <PlayerSelect
              hasSavedCard={match.hasSavedCard}
              onChoose={match.choosePlayer}
              onBack={match.backToWelcome}
            />
          ) : null}
          {match.screen === 'room' && match.session && match.character && partner ? (
            <GameRoom
              player={match.session.player}
              character={match.character}
              phase={match.phase}
              ready={match.session.ready}
              onReroll={match.reroll}
              onReady={match.setReady}
              onLeave={match.leave}
            />
          ) : null}
        </div>
      </main>
    </div>
  );
}
