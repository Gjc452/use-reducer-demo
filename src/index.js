import React, {useReducer, useContext, useEffect} from 'react'
import ReactDOM from 'react-dom'

const rootElement = document.querySelector('#root')

const store = {
  user: null,
  books: null,
  movies: null
}

function reducer(state, action) {
  if (action.type === 'setUser') {
    return {...state, user: action.user}
  } else if (action.type === 'setBooks') {
    return {...state, books: action.books}
  } else if (action.type === 'setMovies') {
    return {...state, movies: action.movies}
  } else {
    console.error('type error')
  }
}

const Context = React.createContext(null)

function App() {
  const [state, dispatch] = useReducer(reducer, store)
  const api = {state, dispatch}
  return (
    <Context.Provider value={api}>
      <User/>
      <hr/>
      <Books/>
      <Movies/>
    </Context.Provider>
  )
}

const User = () => {
  const {state, dispatch} = useContext(Context)
  useEffect(() => {
    ajax('/user').then(user => {
      dispatch({type: 'setUser', user})
    })
  }, [])
  return (
    <div>
      <h1>个人信息</h1>
      <div>name: {state.user ? state.user.name : ""}</div>
      {console.log(state.user)}
    </div>
  )
}

const Books = () => {
  const {state, dispatch} = useContext(Context)
  useEffect(() => {
    ajax('/books').then(books => {
      dispatch({type: 'setBooks', books})
    })
  }, [])
  return (
    <div>
      <h1>我的书籍</h1>
      <ol>{state.books
        ? state.books.map(book => <li key={book.id}>{book.name}</li>) : '加载中'}</ol>
    </div>
  )
}

const Movies = () => {
  const {state, dispatch} = useContext(Context)
  useEffect(() => {
    ajax('/movies').then(movies => {
      dispatch({type: 'setMovies', movies})
    })
  }, [])
  return (
    <div>
      <h1>我的电影</h1>
      <ol>{state.movies
        ? state.movies.map(movie => <li key={movie.id}>{movie.name}</li>) : '加载中'}</ol>
    </div>
  )
}

const ajax = (path) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (path === '/user') {
        resolve({
          id: 1,
          name: 'Jack'
        })
      } else if (path === '/books') {
        resolve([{
          id: 1,
          name: 'JavaScript 高级程序设计'
        }, {
          id: 2,
          name: 'JavaScript 权威指南'
        }])
      } else if (path === '/movies') {
        resolve([{
          id: 1,
          name: '头文字D'
        }, {
          id: 2,
          name: '星球大战'
        }])
      }
    }, 2000)
  })


}


ReactDOM.render(<App/>, rootElement)

