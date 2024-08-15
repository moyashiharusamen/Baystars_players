import Section from './components/layouts/Section';
import Players from './features/players/components/Players'

function App() {
  return (
    <Section>
      <div>
        <h1>DeNAベイスターズの選手一覧</h1>

        <Players />
      </div>
    </Section>
  );
}

export default App;
