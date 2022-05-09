import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';

const List = ({grocery, removeItems, editItems}) => {
  return (
    <article className='grocery-list'>
      {grocery.map((item) => {
        const { id, title } = item;
        return (
          <div className="grocery-items" key={id}>
            <p className="title">{title}</p>
            <div className="btn-container">
              <button className="edit-btn" type="button" onClick={() => editItems(id)} >
                <FaEdit/>
              </button>
              <button className="delete-btn" type="button" onClick={() => removeItems(id)}>
                <FaTrash/>
              </button>
            </div>
          </div>
        )
      })}
    </article>
  )
}

export default List