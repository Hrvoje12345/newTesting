import React, { memo } from 'react';
import styled from 'styled-components';

import Note from './components/Note'

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`

const Heading = styled.h1`
  color: gray;
`

const NotesWrapper = styled.div`
  display: flex;  
  position: relative;
  flex-direction: column;
  overflow: auto;
  width: 100%;
  align-items: center;
`

const Notes = ({ data, deleteNote, loading }) => {
  const loadedContent = data.length > 0
    ? data.map(el => (<Note {...el} key={el.id} deleteNote={deleteNote} />))
    : 'Time entries is empty';
  const content = loading ? <div>Loading...</div> : loadedContent;

  return (
    <Wrapper>
      <Heading>Time entries</Heading>
      <NotesWrapper>
        {content}
      </NotesWrapper>
    </Wrapper>
  )
}

export default memo(Notes);