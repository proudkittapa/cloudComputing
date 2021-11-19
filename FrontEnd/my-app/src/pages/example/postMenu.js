import React, { useState } from 'react'

const PostForm = (props) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('')

  const handleChangeInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    const category = e.target.category

    if (name === 'title') {
      setTitle(value)
    } else{
      setBody(value)
      setCategory(category)
    }
    
  }

  const handleClick = () => {
    const data = { title, body }

    props.addPost(data)
  }

  return (
    <div className='post-form'>
      <form>
        <label>
          <span>Title</span>
          <input type='text' name='title' onChange={handleChangeInput} />
        </label>

        <label>
          <span>Body</span>
          <input type='text' name='body' onChange={handleChangeInput} />
        </label>

        <label>
          <span>Category</span>
          <input type='text' name='category' onChange={handleChangeInput} />
        </label>

        <button onClick={handleClick}>Add</button>
      </form>
    </div>
  )
}

export default PostForm
