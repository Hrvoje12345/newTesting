import React, { memo } from 'react';

import Note from './components/Note'

const Notes = ({ data, deleteNote, loading }) => {
  const loadedContent = data.map(el => (<Note {...el} key={el.id} deleteNote={deleteNote} />));
  const content = loading ? <div>Loading...</div> : loadedContent;

  return (
    <div>
      {content}
    </div>
  )
}

export default memo(Notes);