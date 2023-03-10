import React from 'react';
import Moment from 'react-moment';
import { Page, Document, Image, Text, StyleSheet } from '@react-pdf/renderer';
import BillTo from './templateComponents/BillTo'
import InvoiceItemsTable from './templateComponents/InvoiceItemsTable'
import InvoiceTableFooter from './templateComponents/InvoiceTableFooter'


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
  
  const QuoteTemplate = ({props}) => {
  const { quote, image, store } = props;
  return (
    <Document>
        <Page size="A4" style={styles.page}>
            <Image style={styles.logo} src={image} />
            <BillTo props={{client : quote.customer, store: store}}/>
            <InvoiceItemsTable props={quote} />
            <InvoiceTableFooter props={quote}/>
            <Text style={{marginTop: 20, textAlign: 'right'}}>{new Date().toLocaleString('fr')}</Text>
        </Page>
    </Document>
  )
  }
  
  export default QuoteTemplate;
