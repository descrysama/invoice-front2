import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    Input,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Select,
    useDisclosure,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import {
    FiX
} from "react-icons/fi";
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import 'moment/locale/fr';
import { updateCustomer, deleteCustomer } from '../../app/customers/customerActions';

const TableParser = () => {

    const customer = useSelector(state => state.customer);
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
    const [customerToDelete, setCustomerToDelete] = useState("");
    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const [payload, setPayload] = useState({
        id: "",
        firstname: "",
        lastname: "",
        address: "",
        tel: "",
        email: ""
    })

    const removeOne = (customer_id) => {
        dispatch(deleteCustomer(customer_id))
        onCloseDelete()
    }


    const onSubmit = (e) => {
        e.preventDefault();
        if(payload.firstname == "" && payload.lastname == "" && payload.tel == "" || payload.email == "") {
          toast.error("Veuillez renseigner tout les champs.");
            
          } else {
            dispatch(updateCustomer(payload)).then((res) => {
              if(res.payload.error) {
                toast.error(res.payload.error)
              }
            });
        }
        onCloseEdit()
        setPayload({
            firstname: "",
            lastname: "",
            address: "",
            tel: "",
            email: ""
        })
    }

  return (
    customer.customers && customer.customers.length > 0 ?
    <div className='shadow-md w-[95%] m-4 bg-white rounded-md'>
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
    />
        <TableContainer className="m-2 flex" >
            <Table variant='simple'>
                <Thead>
                <Tr>
                    <Th>Prenom</Th>
                    <Th>Nom</Th>
                    <Th>Adresse</Th>
                    <Th>Téléphone</Th>
                    <Th>Email</Th>
                    <Th>Date d'ajout</Th>
                    <Th className='w-[100px]'>Actions</Th>
                </Tr>
                </Thead>
                <Tbody>
                {customer.customers.length > 0 ? customer.customers.map((customer, key) => (
                    <Tr className='hover:bg-gray-100 duration-300 cursor-pointer' key={key} onClick={(e) => {
                        e.stopPropagation() 
                        onOpenEdit()
                        setPayload({
                            id: customer._id,
                            firstname: customer.firstname,
                            lastname: customer.lastname,
                            address: customer.address,
                            tel: customer.tel,
                            email: customer.email
                        })}}>
                        <Td className='truncate'>{customer.firstname}</Td>
                        <Td>{customer.lastname}</Td>
                        <Td className='truncate'>{customer.address ? customer.address : "-"}</Td>
                        <Td>{customer.tel ? customer.tel : "-"}</Td>
                        <Td>{customer.email ? customer.email : "-"}</Td>
                        <Td><Moment format="DD/MM/YYYY" locale="fr">{customer.createdAt}</Moment></Td>
                        <Td className='flex justify-end'>
                        <Button borderRadius="lg" className='bg-[#F7596440] hover:bg-[#f7596379]' variant="" onClick={(e) => {
                                e.stopPropagation()
                                onOpenDelete()
                                setCustomerToDelete(customer._id)
                            }}><FiX color="#f75963" size={22}/><span className="text-[#f75963]">Supprimer</span></Button>
                        </Td>
                    </Tr>
                )) : null}
                </Tbody>
            </Table>
        </TableContainer>
    <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Vous modifiez : <span className='font-light'>{payload.libelle}</span></ModalHeader>
          <ModalCloseButton />
          <form onSubmit={(e) => onSubmit(e)}>
          <ModalBody pb={6}>
              <FormControl className="mb-2">
                <FormLabel>Nom <span className="text-red-400 text-[14px] font-light">obligatoire*</span> :</FormLabel>
                <Input required placeholder='John' value={payload.lastname} onChange={(e) => setPayload({...payload, lastname: e.target.value})}/>
              </FormControl>
              <FormControl className="mb-2">
                <FormLabel>Prénom <span className="text-red-400 text-[14px] font-light">obligatoire*</span> :</FormLabel>
                <Input required placeholder='Doe' value={payload.firstname} onChange={(e) => setPayload({...payload, firstname: e.target.value})}/>
              </FormControl>
              <FormControl className="mb-2">
                <FormLabel>Email :</FormLabel>
                <Input placeholder='johndoe@gmail.com' value={payload.email} onChange={(e) => setPayload({...payload, email: e.target.value})}/>
              </FormControl>
              <FormControl className="mb-2">
                <FormLabel>Numero de téléphone :</FormLabel>
                <Input placeholder='0606060606' value={payload.tel} onChange={(e) => setPayload({...payload, tel: e.target.value})}/>
              </FormControl>
              <FormControl className="mb-2">
                <FormLabel>Adresse :</FormLabel>
                <Input placeholder='1 rue de la république, 69001' value={payload.address} onChange={(e) => setPayload({...payload, address: e.target.value})}/>
              </FormControl>

            </ModalBody>

            <ModalFooter>
                <Button type='submit' colorScheme='blue' mr={3}>
                Confirmer
                </Button>
                <Button onClick={onCloseEdit}>Annuler</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Text>Voulez vous vraiment supprimer ce client ?</Text>
          </ModalBody>
            <ModalFooter>
                <Button onClick={() => {removeOne(customerToDelete)}} type='submit' colorScheme='red' mr={3}>
                Oui supprimer
                </Button>
                <Button onClick={onCloseDelete}>Annuler</Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </div> 

    : <p className='m-2'>Vous n'avez pas encore de clients ajoutez-en ici.</p>
  )
}

export default TableParser