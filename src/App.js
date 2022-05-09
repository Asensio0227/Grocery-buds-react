import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import Alert from './Alert';
import List from './List';

const getLocalStorage= () => {
  return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
}

const App = () => {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    isModalOpen: false,
    type: '',
    msg: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && !isEditing) {
      const newList = { id: new Date().getTime().toString(), title: name };
      setList([...list, newList]);
      setName('');
      showAlert(true, 'success', 'item added')
    } else if (name && isEditing) {
      setList(list.map((item) => {
        if (item.id === editID) {
          item.title = name;
        }
        return item;
      }));
      setName('');
      setIsEditing(false);
      setEditID(null);
      showAlert(true, 'success', 'value changed successfully');
    } else {
      showAlert(true, 'danger', 'please enter value')
    }
  }

  const showAlert = (isModalOpen = false, type = '', msg = '') => {
    setAlert({ isModalOpen, type, msg });
  };

  const editItems = (id) => {
    const newList = list.find((item) => item.id === id);
    setEditID(id);
    setIsEditing(true);
    setName(newList.title);
  }

  const removeItems = (id) => {
    showAlert(true, 'danger', 'item removed');
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  }

  const clearList = () => {
    showAlert(true, 'danger', 'list empty');
    setList([]);
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <>
      <Navbar />
      <section className="section-center">
        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.isModalOpen && <Alert {...alert} removeAlert={showAlert} list={list} />}
          <h2>grocery bud</h2>
          <div className="form-control">
            <input
              type="text"
              placeholder="e.g eggs"
              id="grocery"
              name="grocery"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="submit-btn" type='submit'>
              {isEditing ? 'edit' : 'submit'}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <article className="grocery-container">
            <List grocery={list} removeItems={removeItems} editItems={editItems} />
            <button className="clear-btn" type="button" onClick={clearList}>
              clear items
            </button>
          </article>
        )}
      </section>
    </>
  )
}

export default App
