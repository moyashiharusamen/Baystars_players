import { useState, useEffect } from 'react';
import Section from './components/layouts/Section';
import Table from './features/playersList/Table'

function App() {
  return (
    <Section>
      <div>
        <h1>DeNAベイスターズの選手一覧</h1>

        <Table />
      </div>
    </Section>
  );
}

export default App;
