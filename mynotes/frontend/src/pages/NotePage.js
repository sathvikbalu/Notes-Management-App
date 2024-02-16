import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';

const NotePage = ({ match }) => {
  let { id } = useParams();
  let [note, setNote] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    getNote();
  }, [id]);

  let getNote = async () => {
    if (id === 'new') return;
    let response = await fetch(`/api/notes/${id}`);
    let data = await response.json();
    setNote(data);
  };

  let createNote = async () => {
    await fetch(`/api/notes/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
  };

  let updateNote = async () => {
    await fetch(`/api/notes/${id}/update/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
  };

  let deleteNote = async () => {
    await fetch(`/api/notes/${id}/delete/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    navigate('/');
  };

  let handleSubmit = () => {
    if (id !== 'new' && note.body === '') {
      deleteNote();
    } else if (id !== 'new') {
      updateNote();
    } else if (id === 'new' && note.body !== null) {
      createNote();
    }
    navigate('/');
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {id !== 'new' ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
