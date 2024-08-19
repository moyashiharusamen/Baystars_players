import { useState, useEffect, useLayoutEffect } from 'react';
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
  const TABLE_ROW_LIST = [
    "背番号",
    "名前",
    "守備位置",
    "投打",
    "生年月日",
    "年齢",
    "年数",
    "身長",
    "体重",
    "出身地",
    "年俸（推定）",
  ];

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
          {TABLE_ROW_LIST.map(list => <Th>{list}</Th>)}
        </tr>
      </thead>

      <tbody>
        <PlayersList players={players} />
      </tbody>
    </Table>
  );
}

export default Players;
