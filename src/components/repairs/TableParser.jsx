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
import { deleteRepair, updateRepair } from '../../app/repairs/repairActions';
import { useEffect } from 'react';

const TableParser = () => {

    const repair = useSelector(state => state.repair);
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
    
    const [repairToDelete, setRepairToDelete] = useState("");
    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const [payload, setPayload] = useState({
        id: "",
        price: 0,
        libelle: "",
        category: ""
    })

    const removeOne = (product_id) => {
        dispatch(deleteRepair(product_id))
        onCloseDelete()
    }


    const onSubmit = (e) => {
        e.preventDefault();
        onCloseEdit()
        dispatch(updateRepair(payload))
    }

  return (
    repair.repairs && repair.repairs.length > 0 ?
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
                    <Th>Nom</Th>
                    <Th>Date d'ajout</Th>
                    <Th>Categorie</Th>
                    <Th>Prix (HT)</Th>
                    <Th className='w-[100px]'>Actions</Th>
                </Tr>
                </Thead>
                <Tbody>
                {repair.repairs ? repair.repairs.map((repair, key) => (
                    <Tr className='hover:bg-gray-100 duration-300 cursor-pointer' key={key} onClick={(e) => {
                        e.stopPropagation() 
                        onOpenEdit()
                        setPayload({
                            id: repair._id,
                            price: repair.price,
                            libelle: repair.libelle,
                            category: repair.category ? repair.category._id : null
                        })}}>
                        <Td>{repair.libelle}</Td>
                        <Td><Moment format="dddd DD MMMM YYYY" locale="fr">{repair.createdAt}</Moment></Td>
                        <Td>{repair.category ? repair.category.libelle : "-"}</Td>
                        <Td>{repair.price} ???</Td>
                        <Td className='flex justify-end'>
                        <Button borderRadius="lg" className='bg-[#F7596440] hover:bg-[#f7596379]' variant="" onClick={(e) => {
                                e.stopPropagation()
                                onOpenDelete()
                                setRepairToDelete(repair._id)
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
                <FormControl>
                <FormLabel>Nom :</FormLabel>
                <Input required ref={initialRef} placeholder='Ecran iphone 12' value={payload.libelle} onChange={(e) => setPayload({...payload, libelle: e.target.value})}/>
                </FormControl>

                <FormControl mt={4}>
                <FormLabel>Cat??gorie :</FormLabel>
                    <Select required placeholder='-' value={payload.category} onChange={(e) => setPayload({...payload, category: e.target.value})}>
                      {category.categories.length > 0 ? category.categories.map((category, key) => (
                      <option key={key} value={category._id}>{category.libelle}</option>
                    )) : null}
                    </Select>
                </FormControl>

                <FormControl mt={4}>
                <FormLabel>Prix (HT)</FormLabel>
                    <NumberInput required precision={2} step={0.2} value={payload.price} onChange={(value) => setPayload({...payload, price: value})}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
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
            <Text>Voulez vous vraiment supprimer cette r??paration ?</Text>
          </ModalBody>
            <ModalFooter>
                <Button onClick={() => {removeOne(repairToDelete)}} type='submit' colorScheme='red' mr={3}>
                Oui supprimer
                </Button>
                <Button onClick={onCloseDelete}>Annuler</Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </div> 

    : <p className='m-2'>Vous n'avez pas encore de r??paration ajoutez-en ici.</p>
  )
}

export default TableParser