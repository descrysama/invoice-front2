import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader'
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
          <InvoiceTableHeader />
          <InvoiceTableRow quote={props} />
      </View>
    )
  };
  
  export default InvoiceItemsTable