import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

const App = (props) => {
  const notesData = JSON.parse(localStorage.getItem('notes'))
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState(notesData || []);
  const [body, setBody] = useState('');

  useEffect(() => localStorage.setItem('notes', JSON.stringify(notes)))

  const addNote = (event) => {
    // prevent page refresh
    event.preventDefault();

    setNotes([

      ...notes,
      {title,
        body,
        removed: 'no',
      },

    ]);

    // clearning the input forms
    setTitle('');
    setBody('');
    //document.querySelector('#inputText').value = '';
  };

  const removeNote = (noteToRemove) => {
    // setNotes(notes.filter((note) => (note !== noteToRemove)))
    setNotes(notes.map(
        (note) => note.title !== noteToRemove.title ? note : {
          ...note,
          removed: 'yes',
        }));
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <input value={title} id="inputText" onChange={(event) => {
          setTitle(event.target.value);
        }}>
        </input>
        <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>
        <button>Add Note</button>
      </form>
      <h4>{
        notes.map((note, i) => (
          <>
            <p>{note.title}: {note.removed}, body: {note.body}</p>
            {
            <div key={i}> {note.title} 
            <button onClick={() => removeNote(note)}>x</button>
            </div> }

          </>
        ))}</h4>
    </div>
  );
};


ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
