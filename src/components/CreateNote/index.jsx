import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  color: green;
`

const Input = styled.input`
  width: 100%;
  color: green;
`

const Button = styled.button`
  background: red;
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
        <Label>Time</Label>
        <Input value={time} onChange={(e) => this.handleTimeChange(e)} />
        <Label>Note</Label>
        <Input value={note} onChange={(e) => this.handleNoteChange(e)} />
        <Button onClick={() => this.handleCreatingNote()}> Create Note</Button>
      </Wrapper>
    )
  }
}

export default CreateNote;