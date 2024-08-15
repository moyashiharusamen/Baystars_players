import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

import styled from 'styled-components';

import PlayersList from './PlayersList';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid;
  text-align: center;
`;
const Th = styled.th`
  padding: 10px;
  background: #eee;
  font-size: 18px;
  border: 1px solid;
  text-align: center;
`;

function Players() {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    const getPlayers = async () => {
      try {
        let {
          data: players,
          error,
          status,
        } = await supabase.from('players').select('*');
        if (error && status !== 406) throw error;
        setPlayers(players);
      } catch (error) {
        setError(error.message);
      }
    };
    getPlayers();
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <Th>背番号</Th>
          <Th>名前</Th>
          <Th>守備位置</Th>
          <Th>投打</Th>
          <Th>生年月日</Th>
          <Th>年齢</Th>
          <Th>年数</Th>
          <Th>身長</Th>
          <Th>体重</Th>
          <Th>出身地</Th>
          <Th>年俸（推定）</Th>
        </tr>
      </thead>

      <tbody>
        <PlayersList players={players} />
      </tbody>
    </Table>
  );
}

export default Players;
