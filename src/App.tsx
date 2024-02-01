import { useEffect, useState } from 'react'
import styles from './app.module.scss'
import axios from 'axios'
import SuggestionItem from './components/SuggestionItem'
import Pill from './components/Pill'

export interface IUserType {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  image: string
}

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState<IUserType[]>([])
  const [selectedUsers, setSelectedUsers] = useState<IUserType[]>([])
  const [isDuplicateValue, setIsDuplicateValue] = useState(false)


  useEffect(()=> {
    const fetchData = async () => {
      if (searchTerm.trim() === "") {
        setSuggestions([])
        return;
      }
  
      try {
        const users = await axios.get(`https://dummyjson.com/users/search?q=${searchTerm}`)
        setSuggestions(users.data.users)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    
  }, [searchTerm])

  const handleUserSelect = (user: IUserType)=> {
    const filterdUsers = selectedUsers.filter(item => item.email !== user.email)
    const hasUserValue = selectedUsers.some((item)=> item.email === user.email)
    hasUserValue && setIsDuplicateValue(true)
    setSelectedUsers([...filterdUsers, user])
    setSearchTerm("")
    setSuggestions([])
  }

  const handPillClick = (user: IUserType)=> {
    const filterdUsers = selectedUsers.filter(item => item.email !== user.email)
    setSelectedUsers(filterdUsers)
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.multiSelectWrapper}>
        <div className={styles.multiSelectInput}>
          {
            selectedUsers.map(user => <Pill user={user} key={user.email} onClick={handPillClick} />)
          }
          <input 
            type="text"
            value={searchTerm}
            onChange={(e)=> {
              setIsDuplicateValue(false)
              setSearchTerm(e.target.value)
            }}
            placeholder='Search for a user'
          />
          
          {
            suggestions.length ? (
              <ul className={styles.suggestionList}>
                {
                  suggestions?.map((user)=> {
                    return <SuggestionItem user={user} key={user.email} handleClick={handleUserSelect}/>
                  })
                }
              </ul>
            ) : null
          }
        </div>
        {isDuplicateValue && <p>User already on the list</p>}
      </div>
    </main>
  )
}

export default App
