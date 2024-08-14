import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import styled from 'styled-components';

function PlayersListTable() {
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
        setError(error.message);
      }
    };
    getPlayers();
  }, []);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const getAge = (birth) => {
    const birthYear = birth.slice(0, 4);
    const birthMonth = birth.slice(5, 7);
    const birthDay = birth.slice(8, 10);
    const thisYearsBirthday = new Date(currentYear, birthMonth-1, birthDay);
    let age = currentYear - birthYear;

    if (currentDate < thisYearsBirthday ) age--;

    return age;
  };
  const getEnrollment = (joining) => currentYear - joining;

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
  const Td = styled.td`
    border: 1px solid;
    text-align: center;
    padding: 10px;
  `;

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
      {
        players.map(player => (
          <tr key={player.id}>
            <Td>{player.uniform_number}</Td>
            <Td>{player.name}</Td>
            <Td>{player.pitching_batting}</Td>
            <Td>{player.position}</Td>
            <Td>{player.birth}</Td>
            <Td>
              {getAge(player.birth)}歳
            </Td>
            <Td>
              {getEnrollment(player.joining)}年
            </Td>
            <Td>{player.height}</Td>
            <Td>{player.weight}</Td>
            <Td>{player.birthplace}</Td>
            <Td>{Number(player.salary).toLocaleString()}万円</Td>
          </tr>
        ))
      }
      </tbody>
    </Table>
  );
}

export default PlayersListTable;
