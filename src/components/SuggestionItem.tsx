import { IUserType } from "../App"

type Props = {
  user: {
    email: string
    firstName: string
    lastName: string
    image: string
  }
  handleClick(user: IUserType): void
}

function SuggestionItem({user, handleClick}: Props) {
  return (
    <li key={user.email} onClick={()=> handleClick(user)}>
      <img src={user.image} alt={user.firstName} />
      <span>{user.firstName} {user.lastName}</span>
    </li>
  )
}

export default SuggestionItem