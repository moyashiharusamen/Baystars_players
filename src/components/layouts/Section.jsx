import React from 'react';
import styles from './Section.module.scss';

const Section = ({ children }) => {
  return (
    <section className={ styles.section }>
      <div className={ styles.section__inner }>
        { children }
      </div>
    </section>
  )
}

export default Section;
