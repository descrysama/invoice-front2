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
    useDisclosure,
} from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import {
    FiX,
} from "react-icons/fi";
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, updateCategory } from '../../app/categories/categoryActions';
import Moment from 'react-moment';
import 'moment/locale/fr';

const TableParser = () => {

    const category = useSelector(state => state.category);
    const dispatch = useDispatch();
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
    const [categoryToDelete, setCategoryToDelete] = useState("");
    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const [payload, setPayload] = useState({
        id: "",
        libelle: ""
    });

    const removeOne = (category_id) => {
        dispatch(deleteCategory(category_id))
        onCloseDelete()
    }


    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(updateCategory(payload))
        onCloseEdit()
    }

  return (
    category.categories && category.categories.length > 0 ?
    <div className='shadow-md w-[75%] m-4 bg-white rounded-md'>
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
                    <Th className='w-[100px]'>Actions</Th>
                </Tr>
                </Thead>
                <Tbody>
                {category.categories.map((category, key) => (
                    <Tr className='hover:bg-gray-100 duration-300 cursor-pointer' key={key} onClick={(e) => {
                        e.stopPropagation() 
                        onOpenEdit()
                        setPayload({
                            id: category._id,
                            libelle: category.libelle
                        })}}>
                        <Td>{category.libelle}</Td>
                        <Td><Moment format="dddd DD MMMM YYYY" locale="fr">{category.createdAt}</Moment></Td>
                        <Td className='flex'>
                            <Button borderRadius="lg" className='bg-[#F7596440] hover:bg-[#f7596379]' variant="" onClick={(e) => {
                                e.stopPropagation()
                                onOpenDelete()
                                setCategoryToDelete(category._id)
                            }}><FiX color="#f75963" size={22}/><span className="text-[#f75963]">Supprimer</span></Button>
                        </Td>
                    </Tr>
                ))}
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
            <Text>Voulez vous vraiment supprimer cette catégorie ?</Text>
          </ModalBody>
            <ModalFooter>
                <Button onClick={() => {removeOne(categoryToDelete)}} type='submit' colorScheme='red' mr={3}>
                Oui supprimer
                </Button>
                <Button onClick={onCloseDelete}>Annuler</Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </div> 

    : <p className='m-2'>Vous n'avez pas encore de catégorie ajoutez-en ici.</p>
  )
}

export default TableParser