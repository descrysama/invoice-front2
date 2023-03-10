import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#F0F1F3'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#F0F1F3',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
    },
    description: {
        width: '85%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
    },
    total: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });


const InvoiceTableFooter = ({props}) => {
    return(    
        <>
         <View style={styles.row}>
            <Text style={styles.description}>Total (HT)</Text>
            <Text style={styles.total}>{ Number.parseFloat((props.total / (100 + props.tva)) * 100).toFixed(2)} €</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.description}>Total (TVA {props.tva}% incluse)</Text>
            <Text style={styles.total}>{ Number.parseFloat(props.total).toFixed(2)} €</Text>
        </View>
        </>
    )
};
  
  export default InvoiceTableFooter