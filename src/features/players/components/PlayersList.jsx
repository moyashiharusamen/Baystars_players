import styled from 'styled-components';

const Td = styled.td`
  border: 1px solid;
  text-align: center;
  padding: 10px;
`;

const PlayersList = ({ players }) => {
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

  return (
    <>
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
    </>
  )
};

export default PlayersList;
