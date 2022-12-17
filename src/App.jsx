import axios from "axios";
import { useEffect, useState } from "react";
import c from "./App.module.css";



export const Timer = (props) => {
  const [second, setSecond] = useState(props.second)

  useEffect(() => {
    setSecond(props.second)
  }, [props.second])

  useEffect(() => {
    props.onChange(second)

  }, [second])


  useEffect(() => {
    const intervalId= setInterval(() => {
      console.log('tic')
      setSecond((prev) => prev - 1)
    }, 1000)
    return ()=>{clearInterval(intervalId)}
  }, [props.timerKey])

  return (
    <div>{second}</div>
  )
}


export const Search = (props) => {
  //поиск юзеров
  const [tempSearch, setTempSearch] = useState('')
  useEffect(() => {
    setTempSearch(props.value)
  }, [props.value])
  return (
    <div className="">
      <input type="text" value={tempSearch} onChange={(e) => { setTempSearch(e.currentTarget.value) }} />
      <button onClick={() => { props.onSubmit(tempSearch) }}>find</button>
    </div>
  )
}


export const UsersList = (props) => {
  useEffect(() => {
    console.log('sing user')
    axios.get(`https://api.github.com/search/users?q=${props.term}`).then(res => {
      setUsers(res.data.items)
    })
  }, [props.term])
  //получение юзеров
  const [users, setUsers] = useState([])
  return (
    <>
      <ul className="">
        {users.map(u => <li
          className={props.selectedUser === u ? c.selected : ''}
          onClick={() => {
            props.onUserSelected(u)
          }}
          key={u.id}>
          {u.login}
        </li>)}
      </ul>
    </>
  )
}


const UserDetails = (props) => {
  //отображение картички юзера
  const [ditailsUsers, setDetailsUsers] = useState(null)
  const [second, setSecond] = useState(10)

  useEffect(() => {
    if (!!props.user) {
      axios.get(`https://api.github.com/users/${props.user.login}`).then(res => {
        setSecond(10)
        setDetailsUsers(res.data)
      })
    }
  }, [props.user])

  useEffect(() => {
    if (second <= 1) {
      setDetailsUsers(null)
    }
  }, [second])
  return (
    <div className="">
      <div className="">
        {ditailsUsers && <div>
          <Timer second={second} onChange={ setSecond}  timerKey={ditailsUsers.id}/>
          <h2> {ditailsUsers.login}</h2><br />
          <img src={ditailsUsers.avatar_url} alt="user-logo" /><br />
          {ditailsUsers.followers}


        </div>}
      </div>
    </div>

  )

}

function App() {
  //выдклкнный узер
  const [selectedUser, SetSelectedUser] = useState(null)
  //фиксирование запросов 
  const [searchTerm, setSearchTerm] = useState('petbog')


  useEffect(() => {
    if (selectedUser) {
      console.log('selectedUser')
      document.title = selectedUser.login
    }
  }, [selectedUser])


  return (
    <div className={c.userbox} >
      <Search value={searchTerm} onSubmit={(value) => { setSearchTerm(value) }} />
      <div className="">
        <button onClick={() => { setSearchTerm('petbog') }}>reset</button>
        <UsersList term={searchTerm} selectedUser={selectedUser} onUserSelected={(user) => { SetSelectedUser(user) }} />

      </div>
      <UserDetails user={selectedUser} />

    </div>
  );
}

export default App;
