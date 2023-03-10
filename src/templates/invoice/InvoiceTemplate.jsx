import React from 'react';
import Moment from 'react-moment';
import { Page, Document, Image, Text, StyleSheet } from '@react-pdf/renderer';
import BillTo from './templateComponents/BillTo'
import InvoiceItemsTable from './templateComponents/InvoiceItemsTable'
import InvoiceTableFooter from './templateComponents/InvoiceTableFooter'
import QuoteItemsTable from './templateComponents/QuoteItemsTable';


const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    }, 
    logo: {
        maxWidth: 300,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
  });
  
  const InvoiceTemplate = ({props}) => {
  const { invoice, image, store } = props;
  return (
    <Document>
        <Page size="A4" style={styles.page}>
            <Image style={styles.logo} src={image} />
            <BillTo props={{client : invoice.customer, store: store}}/>
            {invoice.products.length > 0 ? <InvoiceItemsTable props={invoice} /> : null}
            {invoice.quote ? <QuoteItemsTable props={invoice} /> : null}
            <InvoiceTableFooter props={invoice}/>
            <Text style={{marginTop: 20, textAlign: 'right'}}>{new Date(invoice.createdAt).toLocaleString('fr')}</Text>
        </Page>
    </Document>
  )
  }
  
  export default InvoiceTemplate;
