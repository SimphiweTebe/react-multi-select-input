import React from 'react'
import styles from '../app.module.scss'

function Pill({ title }: { title: string}) {
  return (
    <div className={styles.pill}>{title} &times;</div>
  )
}

export default Pill