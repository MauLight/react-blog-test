/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useRef } from 'react'
import { getAll, create, update, deleteBlog, setToken } from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/Form'
import BlogList from './components/BlogList'
import loginService from './services/login'
import './App.css'
import BlogAdd from './components/BlogAdd'
import { Togglable } from './components/Togglable'
import Filter from './components/Filter'
import { Footer } from './components/Footer'

function App() {

  const [user, setUser] = useState(null)

  const [blogs, setBlogs] = useState([])
  const [blogList, setBlogList] = useState([])
  const [filter, setFilter] = useState('')

  const [errorType, setErrorType] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const blogAddRef = useRef()

  const handleLogin = async (logObj) => {
    try {
      const user = await loginService.login(logObj)

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      setToken(user.token)
      setUser(user)
      getAll()
        .then(response => {
          console.log('promise fulfilled!')
          setBlogs(response)
          setBlogList(response)
        })
    }
    catch (expection) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = (id, title) => {
    if (window.confirm(`Do you really want to delete ${title}?`)) {
      console.log(id)
      deleteBlog(id)
        .then(() => {
          setErrorMessage(`${title} was deleted!`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          console.log('Number deleted!')
          getAll()
            .then(response => {
              console.log('promise fulfilled!')
              setBlogs(response)
            })
        })
        .catch(error => {
          console.log(error)
          setErrorType('error')
          setErrorMessage(`'${title}' was already deleted from the server.`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setBlogs(blogs?.filter(elem => elem.id !== id))
        })
    }

  }

  const handleSubmit = (blogObj) => {

    if (blogObj.title === '' || blogObj.author === '' || blogObj.url === '') {
      alert('You need to add a title, author and url before submitting.')
      return -1
    }

    const titleFilter = blogs.filter((elem) => elem.title === blogObj.title)

    if (titleFilter.length > 0) {
      const blog = titleFilter[0]
      if (window.confirm(`${blog.title} by ${blog.author} was added previously, replace it?`)) {
        blogAddRef.current.toggleVisibility()
        update(blog.id, blogObj)
          .then(() => {
            getAll()
              .then(response => {
                console.log('promise fulfilled!')
                setBlogs(response)
                setErrorType('add')
                setErrorMessage(`${blogObj.title} by ${blogObj.author} updated!`)
                setTimeout(() => {
                  setErrorMessage(null)
                  setErrorType('')
                }, 5000)
              })
          })
          .catch(error => {
            setErrorType('error')
            if (error.response.data.error) {
              setErrorMessage(error.response.data.error)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              getAll()
                .then(response => {
                  console.log('promise fulfilled!')
                  setBlogs(response)
                })
            }
            else {
              setErrorMessage(`${blogObj.title} was already deleted from the server.`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              setBlogs(blogs?.filter(elem => elem.id !== blog.id))
            }
          })
      }
      return -1
    }

    blogAddRef.current.toggleVisibility()
    create(blogObj)
      .then(response => {
        console.log('response is: ', response)
        console.log('User is: ', user)
        setBlogs(blogs.concat(response))
        console.log('data added!')
        setErrorType('add')
        setErrorMessage(`${blogObj.title} by ${blogObj.author} added!`)
        setTimeout(() => {
          setErrorMessage(null)
          setErrorType('')
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        console.log(error.response.data.error)
      })

    return 1
  }

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const handleFilter = () => {
    //Filter persons array to search for matching results.
    const aux = blogList.map(elem => elem)
    const filterTitle = aux.filter((elem) => elem.title.toLowerCase().includes(filter) || elem.author.toLowerCase().includes(filter))

    //If filterName length > 0, means the name was already added.
    if (filterTitle.length > 0) {
      setBlogs(filterTitle)
    }
    else {
      setBlogs(blogList)
    }
  }


  // useEffect(() => {
  //   getAll()
  //     .then(response => {
  //       console.log('promise fulfilled!')
  //       setBlogs(response)
  //       setBlogList(response)
  //     })
  // }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (blogs) {
      handleFilter()
    }
  }, [filter])

  return (
    <div className="App">
      <h1 className='mb-10'>
        Blog
      </h1>
      <Notification
        type={errorType}
        message={errorMessage}
      />
      {
        user ?
          <>
            <div className='flex gap-x-20'>
              <div className="text-center">
                <h2 className='text-2xl'>Add a New Blog</h2>
                <Togglable buttonLabel="Add" ref={blogAddRef}>
                  <BlogAdd
                    handleSubmit={handleSubmit}
                    createBlog={handleSubmit}
                  />
                </Togglable>
              </div>
              <div className="text-center">
                <h2 className='text-2xl'>{`${user.name}' Bloglist`}</h2>
                <p></p>
                <Filter filter={filter} setFilter={setFilter} />
                <BlogList
                  bloglist={blogs}
                  user={user}
                  handleDelete={handleDelete}
                  handleSubmit={handleSubmit}
                />
              </div>
            </div>
            <button
              className="w-25 h-12 my-5 bg-[#e3e3e3] text-[#242424] hover:bg-[#242424] hover:text-[#e3e3e3] active:bg-[#e3e3e3] active:text-[#242424] transition-all duration-75"
              onClick={handleLogOut}
            >LogOut</button>
          </>

          :
          <>
            <Togglable buttonLabel="Log in">
              <LoginForm
                handleSubmit={handleLogin}
              />
            </Togglable>
          </>
      }
      <Footer />
    </div>
  )
}

export default App
