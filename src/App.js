import React, { PureComponent } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Notes from './components/Notes';
import CreateNote from './components/CreateNote';
import auth from './static';

const instance = axios.create({
  baseURL: 'https://api.productive.io/api/v2',
  data: {},
  timeout: 10000,
  headers: {
    'content-type': 'application/vnd.api+json',
    'X-Auth-Token': `${auth.authToken}`,
    'X-Organization-Id': `${auth.organizationId}`,
  }
})

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: noWWrap;
  max-width: 1268px;
  height: 100vh;
  max-height: 100vh;
  margin: auto;
  background: #fafcfc;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
`

const Wrapper = styled.div`
  display: flex;
  width: 50%;
  padding: 20px 0 0;
  background: ${props => props.color ? props.color : "inherit"};

  @media only screen and (max-width: 600px) {
    width: 100%;
    height: auto;
  }
`

class App extends PureComponent {
  state = {
    data: [],
    loading: false,
  }

  async componentDidMount() {
    try {
      this.handleGetNotes();
    } catch (e) {
      console.log(e);
    }
  }

  handleGetNotes = async () => {
    try {
      this.setState({ loading: true })
      const data = await instance.get('/time_entries', { data: {} });
      const formatedData = data.data.data.map(({ id, attributes: { date, note, time } }) => {
        return { id, date, note, time };
      });
      this.setState({ data: formatedData, loading: false });
    } catch (e) {
      this.setState({ loading: false })
      console.log(e);
    }
  }

  handleCreateNote = async (time, note) => {
    const newNote = {
      "data": {
        "type": "time_entries",
        "attributes": {
          "note": `${note}`,
          "date": "2020-10-01",
          "time": `${time}`,
        },
        "relationships": {
          "person": {
            "data": {
              "type": "people",
              "id": "22156"
            },
          },
          "service": {
            "data": {
              "type": "services",
              "id": "49700"
            }
          },
          "task": {
            "data": null,
          }
        }
      }
    }

    try {
      this.setState({ loading: true });
      await instance.post('/time_entries', newNote);
      this.handleGetNotes();
    } catch (e) {
      console.log(e);
    }
  }

  handleDeleteNote = async (id) => {
    try {
      this.setState({ loading: true })
      await instance.request({
        url: `/time_entries/${id}`,
        method: 'delete',
        baseURL: 'https://api.productive.io/api/v2',
        data: {},
        timeout: 10000,
        headers: {
          'content-type': 'application/vnd.api+json',
          'X-Auth-Token': `${auth.authToken}`,
          'X-Organization-Id': `${auth.organizationId}`,
        }
      });
      this.handleGetNotes();
    } catch (e) {
      console.log(e)
    }
  }

  render() {

    const { data, loading } = this.state

    return (
      <ContentWrapper>
        <Wrapper>
          <CreateNote createNote={this.handleCreateNote} />
        </Wrapper>
        <Wrapper color='#cfcfcf'>
          <Notes data={data} deleteNote={this.handleDeleteNote} loading={loading} />
        </Wrapper>
      </ContentWrapper>
    );
  }
}

export default App;
