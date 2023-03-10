import {
  ListItem,
  Container
} from "@chakra-ui/react"

const RepairCard = ({props}) => {
  return (
    <div className="hover:bg-black/5 cursor-pointer w-full rounded-md p-4 m-1">
        <ListItem className='text-[15px] truncate w-full'>{props.libelle} - <span className='text-[14px]'>{props.price}€</span></ListItem>
    </div>
  )
}

export default RepairCard