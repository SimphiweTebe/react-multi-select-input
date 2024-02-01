import React from 'react'
import styles from './components.module.scss'
import { IUserType } from '../App'

function Pill({ user, onClick }: { user: IUserType, onClick(user: IUserType): void}) {
  return (
    <div className={styles.pill} onClick={()=> onClick(user)}>{user.firstName} &times;</div>
  )
}

export default Pill