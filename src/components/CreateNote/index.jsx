import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

const Heading = styled.h1`
  color: gray;
`

const Label = styled.label`
  color: #323636;
  font-size: 26px;
  margin-bottom: 10px;
`

const Input = styled.input`
  width: 250px;
  height: 25px;
  color: #575757;
  margin-bottom: 10px;
  border-radius: 4px;
  font-size: 18px;
`

const Button = styled.button`
  background: #328ba8;
  height: 50px;
  width: 250px;
  font-size: 18px;
  color: #e1e3e3;
  border-color: gray;
  border-radius: 2px;
  margin: 10px 0;
`

class CreateNote extends PureComponent {
  state = {
    time: '',
    note: ''
  }

  handleTimeChange = (e) => {
    const time = e.target.value;
    this.setState({ time });
  }

  handleNoteChange = (e) => {
    const note = e.target.value;
    this.setState({ note });
  }

  handleCreatingNote() {
    const { time, note } = this.state;
    const { createNote } = this.props;

    createNote(time, note);
    this.setState({ time: '', note: '' })
  }

  render() {
    const { time, note } = this.state;

    return (
      <Wrapper>
        <Heading>Create new note</Heading>
        <Label>Time</Label>
        <Input value={time} type='number' step='10' onChange={(e) => this.handleTimeChange(e)} />
        <Label>Note</Label>
        <Input value={note} type='text' onChange={(e) => this.handleNoteChange(e)} />
        <Button onClick={() => this.handleCreatingNote()}> Create Note</Button>
      </Wrapper>
    )
  }
}

export default CreateNote;