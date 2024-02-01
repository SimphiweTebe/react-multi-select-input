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

  const [selectUserSet, setSelectedUserSet] = useState<Set<IUserType[]>>(new Set())

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
   setSelectedUsers([...selectedUsers, user])
  //  setSelectedUserSet([...selectUserSet, user.email])
   setSearchTerm("")
   setSuggestions([])
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.multiSelectWrapper}>
        <div className={styles.multiSelectInput}>
          {/* Pill component */}
          {
            selectedUsers.map(user => <Pill title={user.firstName} key={user.email}/>)
          }
          {/* input component */}
          <input 
            type="text"
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
            placeholder='Search for a user'
          />

          {/* suggestion list */}
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
      </div>
    </main>
  )
}

export default App
