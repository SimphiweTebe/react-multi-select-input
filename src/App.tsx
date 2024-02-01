import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import SuggestionItem from './components/SuggestionItem'
import Pill from './components/Pill'
import MultiSelectInput from './components/MultiSelectInput'
import styles from './app.module.scss'

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
      <h1 className={styles.heading}>Useful React UI components <span>(vanilla React)</span></h1>
      <MultiSelectInput />
    </main>
  )
}

export default App
