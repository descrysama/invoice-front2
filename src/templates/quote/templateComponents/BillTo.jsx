
import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 36,
        marginBottom: 36
    },
    billTo: {
        marginTop: 0,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
  });


  const BillTo = ({props}) => {
    return(
        <div style={styles.row}>
        <View style={{...styles.headerContainer, textAlign: 'right'}}>
            <Text style={styles.billTo}>Boutique :</Text>
            <Text>{props.store.name}</Text>
            <Text>{props.store.tel}</Text>
            <Text>{props.store.address}</Text>
            <Text>N° TVA : {props.store.tvaNumber}</Text>
        </View>
        <View style={{...styles.headerContainer, textAlign: 'left'}}>
            <Text style={styles.billTo}>Client :</Text>
            <Text>{props.client.firstname} {props.client.lastname}</Text>
            <Text>{props.client.email}</Text>
            <Text>{props.client.tel}</Text>
            <Text>{props.client.address}</Text>
        </View>
    </div>
    )
  };
  
  export default BillTo