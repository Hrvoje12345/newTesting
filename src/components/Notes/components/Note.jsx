import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid;
  border-color: gray;
  height: 150px;
  max-width: 300px;
  margin-bottom: 5px;
  border-radius: 5px;
  background: #ebe8e8;
  justify-content: space-between;
`

const Paragraph = styled.p`
  color: #575757;
  font-size: 18px;
  margin: 0;
  font-weight: 600;
`

const Button = styled.button`
  background: #a12f2f;
  height: 50px;
  width: 250px;
  font-size: 18px;
  color: #e1e3e3;
  border-color: gray;
  border-radius: 2px;
`

const Note = (props) => {
  const items = Object.entries(props);

  return (
    <Wrapper>
      {items.map(([name, item]) => {
        if (name === 'deleteNote') return null;
        return <Paragraph key={name}>{name}: {item}</Paragraph>;
      })}
      <Button onClick={() => props.deleteNote(props.id)}>Delete note</Button>
    </Wrapper>
  )
}

export default Note;