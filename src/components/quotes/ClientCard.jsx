import {
  ListItem,
  Container
} from "@chakra-ui/react"

const ClientCard = ({props}) => {
  return (
    <div className="hover:bg-black/5 cursor-pointer w-full rounded-md p-4 m-1">
        <ListItem className='text-[15px] truncate w-full'>{props.firstname + " " + props.lastname} - <span className='text-[14px]'>{props.email}</span></ListItem>
        <ListItem className='text-[15px] truncate w-full'>{props.tel ? props.tel : "-" - props.address ? props.address : "-"}</ListItem>
    </div>
  )
}

export default ClientCard