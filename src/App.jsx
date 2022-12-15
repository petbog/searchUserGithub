import axios from "axios";
import { useEffect, useState } from "react";
import c from "./App.module.css";




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

  useEffect(() => {
    if (!!props.user) {
      axios.get(`https://api.github.com/users/${props.user.login}`).then(res => {
        setDetailsUsers(res.data)
      })
    }
  }, [props.user])

  return (
    <div className="">
      <h2>Username</h2>
      <div className="">
        {ditailsUsers && <div>
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
