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

  const QuoteItemsTable = ({props}) => {
    return (
      <View style={styles.tableContainer}>
          <Text>Réparation(s) : </Text>
          <InvoiceTableHeader />
          <InvoiceQuoteTableRow props={props} />
      </View>
    )
  };
  
  export default QuoteItemsTable