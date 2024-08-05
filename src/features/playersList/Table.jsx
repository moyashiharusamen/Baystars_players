import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import styles from './Table.module.scss';

function App() {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    const getPlayers = async () => {
      try {
        let {
          data: players,
          error,
          status,
        } = await supabase.from('players').select('*');

        if (error && status !== 406) {
          throw error;
        }

        setPlayers(players);
      } catch (error) {
        setError(error.message);  // エラーメッセージをステートに設定
      }
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
    <table className={ styles.table }>
      <thead className={ styles.table__head }>
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

      <tbody className={ styles.table__body }>
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
            <td>{Number(player.salary).toLocaleString()}万円</td>
          </tr>
        ))
      }
      </tbody>
    </table>
  );
}

export default App;
