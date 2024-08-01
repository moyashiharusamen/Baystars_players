import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    const getPlayers = async () => {
      let {
        data: players,
        error,
        status,
      } = await supabase.from('players').select('*');
      setPlayers(players);
    };
    getPlayers();
  }, []);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const getAge = (birth) => {
    const birthYear = birth.slice(0, 4);
    return currentYear - birthYear;
  };
  const getEnrollment = (joining) => currentYear - joining;

  return (
    <div>
      <h1>DeNAベイスターズの選手一覧</h1>
      <table>
        <thead>
          <tr>
            <th>背番号</th>
            <th>名前</th>
            <th>守備位置</th>
            <th>投打</th>
            <th>生年月日</th>
            <th>年齢</th>
            <th>年数</th>
            <th>身長</th>
            <th>体重</th>
            <th>出身地</th>
            <th>年俸（推定）</th>
          </tr>
        </thead>

        <tbody>
        {
          players.map(player => (
            <tr key={player.id}>
              <td>{player.uniform_number}</td>
              <td>{player.name}</td>
              <td>{player.pitching_batting}</td>
              <td>{player.position}</td>
              <td>{player.birth}</td>
              <td>
                {getAge(player.birth)}歳
              </td>
              <td>
                {getEnrollment(player.joining)}年
              </td>
              <td>{player.height}</td>
              <td>{player.weight}</td>
              <td>{player.birthplace}</td>
              <td>{player.salary}</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  );
}

export default App;