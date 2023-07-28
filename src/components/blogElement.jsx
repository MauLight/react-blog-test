import { Togglable } from './Togglable'

const InnerElement = ({ elem, handleLikes }) => {

  return (
    <div className="flex mb-2">
      <div className="flex flex-col items-center">
        <p className="ml-2 text-sm">{`${elem.likes} ${elem.likes > 1 ? 'likes' : 'like'}`}</p>
        <p className="ml-2 text-sm">{elem.user.username}</p>
        <a className='text-[12px]' href={elem.url}>{elem.url}</a>
      </div>
      <div className="flex items-center justify-center">
        <button
          className='flex items-center justify-center h-[32px] px-1 mx-2 w-[60px] hover:bg-[#e3e3e3] border-1 border-[#e3e3e3] hover:text-[#242424] transition ease-in-out delay-100 active:bg-[#242424] active:text-[#e3e3e3]'
          onClick={handleLikes}
        >
          like

        </button>
      </div>
    </div>
  )
}

export const BlogElement = ({ elem, handleDelete, handleLikes }) => {

  return (
    <li className='blog' key={elem.title}>
      <div className="flex items-center justify-center">
        <Togglable buttonLabel='view'>
          <InnerElement elem={elem} handleLikes={handleLikes} />
        </Togglable>
        <div className="flex items-center">
          <a className='text-2xl' href={`https://${elem.url}`}>{`${elem.title} - by ${elem.author}`}</a>
          <button
            className='p-1 ml-2 hover:bg-[#e3e3e3] border-1 border-[#e3e3e3] hover:text-[#242424] transition ease-in-out delay-100 active:bg-[#242424] active:text-[#e3e3e3]'
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  )
}