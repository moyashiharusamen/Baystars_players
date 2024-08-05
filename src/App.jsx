import { useState, useEffect } from 'react';
import Section from './components/layouts/Section';
import PlayersListTable from './features/playersList/PlayersListTable'

function App() {
  return (
    <Section>
      <div>
        <h1>DeNAベイスターズの選手一覧</h1>

        <PlayersListTable />
      </div>
    </Section>
  );
}

export default App;
