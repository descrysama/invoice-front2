import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#F0F1F3',
        backgroundColor: '#F0F1F3',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    description: {
        width: '65%',
    },
    qty: {
        width: '15%',
    },
    amount: {
        width: '20%'
    },
  });

  const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.description}>Nom</Text>
        <Text style={styles.qty}>Quantité</Text>
        <Text style={styles.amount}>Prix(HT)</Text>
        <Text style={styles.amount}>Prix(TTC)</Text>
        <Text style={styles.amount}>Total</Text>
    </View>
  );
  
  export default InvoiceTableHeader