/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

import { useState } from 'react'
import PropTypes from 'prop-types'

export default function BlogAdd({ createBlog }) {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const submitBlog = (e) => {

    e.preventDefault()

    const newBlog = {
      title,
      author,
      url,
      likes
    }

    createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')

  }



  return (
    <div className='formDiv flex flex-col items-center justify-center my-5'>
      <form onSubmit={submitBlog}>
        <div className="flex flex-col">
          <label className='mr-2' htmlFor='title'>Title*:</label>
          <input className='rounded h-8' type="text" id='title' placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="flex flex-col">
          <label className='mr-2' htmlFor='author'>Author*:</label>
          <input className='rounded h-8' type="text" id='author' placeholder='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div className="flex flex-col">
          <label className='mr-2' htmlFor='url'>Url*:</label>
          <input className='rounded h-8' type="text" id='url' placeholder='url' value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <div className="flex flex-col">
          <label className='mr-2' htmlFor='likes'>Likes:</label>
          <input className='rounded h-8' type="number" id='likes' placeholder='likes' value={likes} onChange={(e) => setLikes(e.target.value)} />
        </div>
        <div className="flex flex-col">
          <button className="w-full h-12 my-5 bg-[#e3e3e3] text-[#242424] hover:bg-[#242424] hover:text-[#e3e3e3] active:bg-[#e3e3e3] active:text-[#242424] transition-all duration-75" type='submit'>Add Blog</button>
        </div>
        <small>(*) fields are obligatory.</small>
      </form>
    </div>
  )
}

BlogAdd.propTypes = {
  createBlog: PropTypes.func.isRequired
}
