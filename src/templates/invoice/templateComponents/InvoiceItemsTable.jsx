import React from 'react';
import {View, StyleSheet, Text } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader'
import InvoiceQuoteTableRow from './InvoiceQuoteTableRow'
import InvoiceTableRow from './InvoiceTableRow'
import InvoiceTableBlankSpace from './InvoiceTableBlankSpace'

const tableRowsCount = 11;

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 6,
        borderWidth: 1,
        borderColor: '#F0F1F3',
    },
});

  const InvoiceItemsTable = ({props}) => {
    return (
      <View style={styles.tableContainer}>
          <Text>Produit(s) : </Text>
          <InvoiceTableHeader />
          <InvoiceTableRow invoice={props} />
      </View>
    )
  };
  
  export default InvoiceItemsTable