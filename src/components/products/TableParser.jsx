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
import { deleteProduct, updateProduct } from '../../app/products/productActions';
import Moment from 'react-moment';
import 'moment/locale/fr';

const TableParser = () => {

    const product = useSelector(state => state.product);
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
    const [productToDelete, setProductToDelete] = useState("");
    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const [payload, setPayload] = useState({
        id: "",
        price: 0,
        libelle: "",
        category: ""
    })

    const removeOne = (product_id) => {
        dispatch(deleteProduct(product_id))
        onCloseDelete()
    }


    const onSubmit = (e) => {
        e.preventDefault();
        if(payload.price != "" && payload.libelle != "" && payload.category != "") {
            dispatch(updateProduct(payload)).then((res) => {
                if(res.payload.error) {
                  toast.error(res.payload.error)
                }
              });;
          } else {
            toast.error("Veuillez renseigner tout les champs.")
          }
          onCloseEdit()
        setPayload({
            id: "",
            price: 0,
            libelle: "",
            category: ""
        })
    }

  return (
    product.products && product.products.length > 0 ?
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
                {product.products.length > 0 ? product.products.map((product, key) => (
                    <Tr className='hover:bg-gray-100 duration-300 cursor-pointer' key={key} onClick={(e) => {
                        e.stopPropagation() 
                        onOpenEdit()
                        setPayload({
                            id: product._id,
                            price: product.price,
                            libelle: product.libelle,
                            category: product.category ? product.category._id : null
                        })}}>
                        <Td>{product.libelle}</Td>
                        <Td><Moment format="dddd DD MMMM YYYY" locale="fr">{product.createdAt}</Moment></Td>
                        <Td>{product.category ? product.category.libelle : "-"}</Td>
                        <Td>{product.price} €</Td>
                        <Td className='flex justify-end'>
                        <Button borderRadius="lg" className='bg-[#F7596440] hover:bg-[#f7596379]' variant="" onClick={(e) => {
                                e.stopPropagation()
                                onOpenDelete()
                                setProductToDelete(product._id)
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
                <FormLabel>Catégorie :</FormLabel>
                    <Select required placeholder='-' value={payload.category} onChange={(e) => setPayload({...payload, category: e.target.value})}>
                      {category.categories ? category.categories.map((category, key) => (
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
            <Text>Voulez vous vraiment supprimer ce produit ?</Text>
          </ModalBody>
            <ModalFooter>
                <Button onClick={() => {removeOne(productToDelete)}} type='submit' colorScheme='red' mr={3}>
                Oui supprimer
                </Button>
                <Button onClick={onCloseDelete}>Annuler</Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </div> 

    : <p className='m-2'>Vous n'avez pas encore de produits ajoutez-en ici.</p>
  )
}

export default TableParser