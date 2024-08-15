import React from 'react';
import styled from 'styled-components';

const SectionInner = styled.section`
  max-width: 1024px;
  margin-inline: auto;
`;

const Section = ({ children }) => {
  return (
    <section>
      <SectionInner>
        { children }
      </SectionInner>
    </section>
  )
}

export default Section;
