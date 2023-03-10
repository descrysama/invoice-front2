import React, {useState} from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { BlobProvider } from '@react-pdf/renderer';
import { deleteProduct, updateProduct } from '../../app/products/productActions';
import { removeInvoice } from '../../app/stores/storeSlice';
import InvoiceTemplate from '../../templates/invoice/InvoiceTemplate'
import Moment from 'react-moment';
import 'moment/locale/fr';
import { FiX, FiDownload } from 'react-icons/fi';
const TableParser = () => {

    const dispatch = useDispatch();
    const data = useSelector(state => state.store);
    const [invoiceToDelete, setInvoiceToDelete] = useState();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()

    
    return (
        data.invoices && data.invoices.length > 0 ?
        <div className='shadow-md w-[95%] m-4 bg-white rounded-md'>
             <TableContainer className="m-2 flex" >
            <Table variant='simple'>
                <Thead>
                <Tr>
                    <Th>N°Facture</Th>
                    <Th>Date d'ajout</Th>
                    <Th>Client (Téléphone / email)</Th>
                    <Th>Total</Th>
                    <Th className='w-[100px]'>Actions</Th>
                </Tr>
                </Thead>
                <Tbody>
                {data.invoices ? data.invoices.map((invoice, key) => (
                    <Tr className='hover:bg-gray-100 duration-300 cursor-pointer' key={key}>
                        <Td>{invoice.invoiceNumber}</Td>
                        <Td><Moment format="dddd DD MMMM YYYY" locale="fr">{invoice.createdAt}</Moment></Td>
                        {invoice.customer ?
                        <Td>{invoice.customer.email ? invoice.customer.email : invoice.customer.tel}</Td> : <Td>-</Td> }
                        <Td>{invoice.total.toFixed(2)} €</Td>
                        <Td className='flex justify-end'>
                            <PdfLinkProvider className="m-1" invoice={invoice} />
                            <Button onClick={() => {
                                setInvoiceToDelete(invoice._id)
                                onOpenDelete()
                            }} borderRadius="lg" className='bg-[#F7596440] hover:bg-[#f7596379] m-1' variant="" >
                                <FiX color="#f75963" size={22}/><span className="text-[#f75963]">Supprimer</span>
                            </Button>
                        </Td>
                    </Tr>
                )) : null}
                </Tbody>
            </Table>
        </TableContainer>
        <Modal
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
                <Button onClick={() => {
                    dispatch(removeInvoice(invoiceToDelete))
                    onCloseDelete()
                    }} type='submit' colorScheme='red' mr={3}>
                Oui supprimer
                </Button>
                <Button onClick={onCloseDelete}>Annuler</Button>
            </ModalFooter>
        </ModalContent>
      </Modal>

        </div> : <Text className='text-center'>Aucune facture n'a été créée pour le moment.</Text>
    )

};

const PdfLinkProvider = (invoice) => {
    const auth = useSelector(state => state.store);
    return (
        <BlobProvider document={<InvoiceTemplate props={{...invoice, store: auth.store, image: process.env.REACT_APP_API_URL + "/images/" + auth.store.profilePicture}}/>}>
            {({ blob, url, loading, error }) => {
            return (
                <a
                href={url}
                target="_blank"
                rel="noopener noreferrer" className='p-2 px-4 rounded-md bg-[#5cf75940] hover:bg-[#59f75979] m-1' variant="">
                    <span className="text-[#59f76e] font-semibold flex items-center"><FiDownload /> PDF</span>
                </a>
            )
            }}
        </BlobProvider>
    )
}

export default TableParser;