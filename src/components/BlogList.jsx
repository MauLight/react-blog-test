/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

import { Togglable } from './Togglable'
import PropTypes from 'prop-types'

const BlogElement = ({ elem, submit, handleDelete, user }) => {

  return (
    <li className='blog' key={elem.title}>
      <div className="flex items-center justify-center">
        <Togglable buttonLabel='view'>
          <div className="flex mb-2">
            <div className="flex flex-col items-center">
              <p className="ml-2 text-sm">{`${elem.likes} ${elem.likes > 1 ? 'likes' : 'like'}`}</p>
              <p className="ml-2 text-sm">{elem.user.username}</p>
              <a className='text-[12px]' href={elem.url}>{elem.url}</a>
            </div>
            <div className="flex items-center justify-center">
              <button
                className='flex items-center justify-center h-[32px] px-1 mx-2 w-[60px] hover:bg-[#e3e3e3] border-1 border-[#e3e3e3] hover:text-[#242424] transition ease-in-out delay-100 active:bg-[#242424] active:text-[#e3e3e3]'
                onClick={() => submit({ title: elem.title, author: elem.author, url: elem.url, likes: elem.likes + 1 })}
              >
                Like

              </button>
            </div>
          </div>
        </Togglable>
        <div className="flex items-center">
          <a className='text-2xl' href={`https://${elem.url}`}>{`${elem.title} - by ${elem.author}`}</a>
          {
            elem.user === user.id &&
            <button
              className='p-1 ml-2 hover:bg-[#e3e3e3] border-1 border-[#e3e3e3] hover:text-[#242424] transition ease-in-out delay-100 active:bg-[#242424] active:text-[#e3e3e3]'
              onClick={() => handleDelete(elem.id, elem.title)}
            >
              Delete
            </button>
          }
        </div>
      </div>
    </li>
  )
}

export default function BlogList({ bloglist, handleDelete, handleSubmit, user }) {

  const sortedList = bloglist?.sort((a, b) => a.likes < b.likes ? 1 : -1)

  const submitLike = (likeObj) => {
    handleSubmit(likeObj)
  }

  return (
    <ul className='my-5'>
      {
        sortedList && sortedList.map((elem) =>
          <BlogElement key={elem.id} elem={elem} submit={submitLike} handleDelete={handleDelete} user={user} />)
      }
    </ul>
  )
}

BlogList.propTypes = {
  user: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}
