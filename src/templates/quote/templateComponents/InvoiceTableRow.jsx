import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#F0F1F3'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#F0F1F3',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    description: {
        width: '65%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    amount: {
        width: '20%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });


const InvoiceTableRow = (props) => {
    const rows = props.quote.repairsObjects.map((item, key) => 
        <View style={styles.row} key={key}>
            <Text style={styles.description}>{item.libelle}</Text>
            <Text style={styles.qty}>{props.quote.repairs[key].qty}</Text>
            <Text style={styles.amount}>{item.price.toFixed(2)} €</Text>
            <Text style={styles.amount}>{((item.price / 100) * (100 + props.quote.tva)).toFixed(2)} €</Text>
            <Text style={styles.amount}>{((item.price / 100) * (100 + props.quote.tva) * props.quote.repairs[key].qty).toFixed(2)} €</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
export default InvoiceTableRow