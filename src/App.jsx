import axios from "axios";
import { useEffect, useState } from "react";
import c from "./App.module.css";

function App() {
  //выдклкнный узер
  const [selectedUser, SetSelectedUser] = useState(null)
  //получение юзеров
  const [users, setUsers] = useState([])
  //поиск юзеров
  const [tempSearch, setTempSearch] = useState('petbog')
  //фиксирование запросов 
  const [searchTerm,setSearchTerm]=useState('petbog')

  useEffect(() => {
    if (selectedUser) {
      console.log('selectedUser')
      document.title = selectedUser.login
    }
  }, [selectedUser])

  useEffect(() => {
    console.log('sing user')
    axios.get(`https://api.github.com/search/users?q=${searchTerm}`).then(res => {
      setUsers(res.data.items)
    })
  }, [searchTerm])
  return (
    <div className={c.userbox} >
      <div className="">
        <div className="">
          <input type="text" value={tempSearch} onChange={(e) => { setTempSearch(e.currentTarget.value)} } />
           <button onClick={()=>{setSearchTerm(tempSearch)}}>find</button>
        </div>
        <ul className="">
          {users.map(u => <li
            className={selectedUser === u ? c.selected : ''}
            onClick={() => {
              SetSelectedUser(u)
            }}
            key={u.id}>
            {u.login}
          </li>)}
        </ul>
      </div>
      <div className="">
        <h2>Username</h2>
        <div className="">
          ditails
        </div>
      </div>

    </div>
  );
}

export default App;
