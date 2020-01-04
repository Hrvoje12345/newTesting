import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`

const Paragraph = styled.p`
  color: blue;
  margin: 0;
`

const Button = styled.button`
  background: red;
  width: 50%;
`

const Note = (props) => {
  const items = Object.entries(props);

  return (
    <Wrapper>
      {items.map(([name, item]) => {
        return <Paragraph key={name}>{name}: {item}</Paragraph>;
      })}
      <Button onClick={() => props.deleteNote(props.id)}>Delete note</Button>
    </Wrapper>
  )
}

export default Note;