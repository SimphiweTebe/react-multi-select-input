import { useEffect, useRef, useState } from 'react'
import styles from './app.module.scss'
import axios from 'axios'
import SuggestionItem from './components/SuggestionItem'
import Pill from './components/Pill'
import MultiSelectInput from './components/MultiSelectInput'

export interface IUserType {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  image: string
}

function App() {

  return (
    <main className={styles.wrapper}>
      <MultiSelectInput />
    </main>
  )
}

export default App
