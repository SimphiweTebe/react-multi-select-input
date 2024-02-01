import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { IUserType } from '../App'
import Pill from './Pill'
import SuggestionItem from './SuggestionItem'
import styles from './components.module.scss'


function MultiSelectInput() {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState<IUserType[]>([])
  const [selectedUsers, setSelectedUsers] = useState<IUserType[]>([])
  const [isDuplicateValue, setIsDuplicateValue] = useState(false)

  const formRef = useRef<HTMLInputElement>(null)

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
    formRef.current && formRef.current.focus()
  }

  const handPillClick = (user: IUserType)=> {
    const filterdUsers = selectedUsers.filter(item => item.email !== user.email)
    setSelectedUsers(filterdUsers)
    formRef.current && formRef.current.focus()
  }

  return (
    <div className={styles.multiSelectWrapper}>
        <div className={styles.multiSelectInput}>
          {
            selectedUsers.map(user => <Pill user={user} key={user.email} onClick={handPillClick} />)
          }
          <input 
            ref={formRef}
            type="text"
            value={searchTerm}
            onChange={(e)=> {
              setIsDuplicateValue(false)
              setSearchTerm(e.target.value)
            }}
            placeholder='Search for a user...'
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
        {isDuplicateValue && <p className={styles.error}>Item is already on the list</p>}
      </div>
  )
}

export default MultiSelectInput