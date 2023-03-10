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
    Container,
    useDisclosure,
    Tag,
    Card,
} from '@chakra-ui/react';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { ToastContainer, toast } from 'react-toastify';
import { BlobProvider } from '@react-pdf/renderer';
import QuoteTemplate from '../../templates/quote/quoteTemplate';
import {
    FiX,
    FiDownload,
    FiSlash
} from "react-icons/fi";
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import 'moment/locale/fr';
import { deleteQuote } from '../../app/quotes/quoteActions';
import { useEffect } from 'react';
import TicketTemplate from '../../templates/tickets/TicketTemplate';

const TableParser = () => {
    const quote = useSelector(state => state.quote);
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
    
    const [quoteToDelete, setQuoteToDelete] = useState("");
    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const [payload, setPayload] = useState({
        id: "",
        total: "",
        customer: "",
        createdAt: ""
    })

    const removeOne = (product_id) => {
        dispatch(deleteQuote(product_id))
        onCloseDelete()
    }


  return (
    quote.quoteList && quote.quoteList.length > 0 ?
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
        <TableContainer className="m-2 flex">
            <Table variant='simple'>
                <Thead>
                <Tr>
                    <Th>Client</Th>
                    <Th>Date d'ajout</Th>
                    <Th>Total</Th>
                    <Th>TVA appliquée (%)</Th>
                    <Th>Status</Th>
                    <Th className='w-[100px]'>Actions</Th>
                </Tr>
                </Thead>
                <Tbody>
                {quote.quoteList ? quote.quoteList.map((quote, key) => (
                    <Tr className='hover:bg-gray-100 duration-300 cursor-pointer' key={key} onClick={(e) => {
                        e.stopPropagation() 
                        onOpenEdit()
                        setPayload({...payload, ...quote})}}>
                        <Td>{quote.customer ? quote.customer.firstname + " " + quote.customer.lastname : "-"}</Td>
                        <Td><Moment format="dddd DD MMMM YYYY" locale="fr">{quote.createdAt}</Moment></Td>
                        <Td>{quote.total.toFixed(2)} €</Td>
                        <Td>{quote.tva}%</Td>
                        <Td>{quote.status ? <Tag colorScheme="green">Payé</Tag> : <Tag colorScheme="yellow">Impayé</Tag>}</Td>
                        <Td className='flex justify-end'>
                            {quote.status == 0 ?
                            <Button borderRadius="lg" className='bg-[#F7596440] hover:bg-[#f7596379]' variant="" onClick={(e) => {
                                e.stopPropagation()
                                onOpenDelete()
                                setQuoteToDelete(quote._id)
                            }}>
                            <FiX color="#f75963" size={22}/><span className="text-[#f75963]">Supprimer</span>
                        </Button>: 
                        <Button borderRadius="lg" className='w-full' variant="outline" disabled={true} onClick={(e) => {
                            e.stopPropagation()
                        }}>
                            <FiSlash size={22}/>
                        </Button>}
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
          <ModalHeader>Détails de la commande : <span className='font-light text-[14px]'>{payload.id}</span></ModalHeader>
          <ModalCloseButton />
            <ModalBody pb={6}>
                <Container className="m-2 flex flex-col items-start w-full">
                    <Tag className="m-2">{payload.customer.firstname} {payload.customer.lastname}</Tag>
                    <Tag className="m-2"><Moment format="dddd DD MMMM YYYY" locale="fr">{payload.createdAt}</Moment></Tag>
                    <Tag className="m-2">TVA : {payload.tva}%</Tag>
                    {payload.repairs ? payload.repairs.map((repair, key) => (
                        <Card className="p-2 w-full m-1" key={key}>
                            <Text className='font-semibold'>{payload.repairsObjects[key].libelle}</Text>
                            <Text className='font-medium'>Prix : {payload.repairsObjects[key].price}€</Text>
                            <Text className='font-medium'>Quantité : {repair.qty}</Text>
                        </Card>
                    )) : null}
                    <Text className='w-full text-right flex items-center justify-end'><span className='uppercase font-semibold'>Total : </span><Tag className="m-2">{Number(payload.total).toFixed(2)}€</Tag></Text>
                    <PdfLinkProvider quote={payload}/>
                    <TicketPrinter quote={payload}/>
                </Container> 
            </ModalBody>
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
            <Text>Voulez vous vraiment supprimer ce devis ?</Text>
          </ModalBody>
            <ModalFooter>
                <Button onClick={() => {removeOne(quoteToDelete)}} type='submit' colorScheme='red' mr={3}>
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


const PdfLinkProvider = (quote) => {
    const auth = useSelector(state => state.store);
    return (
        <BlobProvider document={<QuoteTemplate props={{...quote, store: auth.store, image: process.env.REACT_APP_API_URL + "/images/" + auth.store.profilePicture}}/>}>
            {({ blob, url, loading, error }) => {
            return (
                <a
                href={url}
                target="_blank"
                rel="noopener noreferrer" className='p-2 px-4 rounded-md bg-[#5cf75940] hover:bg-[#59f75979]' variant="">
                    <span className="text-[#59f76e] font-semibold flex items-center"><FiDownload className='m-1'/> PDF</span>
                </a>
            )
            }}
        </BlobProvider>
    )
}

const TicketPrinter = (quote) => {

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

    return (
        <div>
            <button className='p-2 mt-2 px-4 rounded-md bg-[#5998f740] hover:bg-[#599bf779]' onClick={handlePrint}>Imprimer un ticket</button>
            <div className='hidden'>
                <TicketTemplate ref={componentRef} props={quote}/>
            </div>
        </div>
    )
}

export default TableParser
