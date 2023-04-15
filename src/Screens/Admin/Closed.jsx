import { View, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { Button, Text } from '@react-native-material/core';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Closed = () => {
  const { orderCommand } = useRoute().params || {}; // add a default value of empty object
  const { PurchaseHistory, dateTime,allClosed,setAllClosed } = useContext(StoreContext);
  const navigation = useNavigation();

  const ToSend = (ordNo) => {
    let order = allClosed.find((o) => o.ordNo == ordNo)
    navigation.navigate("Packed", { comm:ordNo })
    setAllClosed(allClosed.filter((o)=>o != order))
  }

  const AddClosedOrder = () => {
    if (orderCommand) { // add a conditional statement to check if orderCommand is not null
      const order = PurchaseHistory.find((o) => o == orderCommand);
      if (order) {
        setAllClosed(prevState => [...prevState, order]);
      }
    }
  };

  useEffect(() => {
    AddClosedOrder();
  }, [orderCommand]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Closed <Ionicons name="archive-outline" size={30}></Ionicons></Text>
      {allClosed.length == 0 ? (
        <Text style={styles.msgEmpty}>No closed orders.</Text>
      ) : (
        <FlatList
          data={allClosed}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.border}>
              <Image style={styles.img} source={{ uri: item[0].picture }} />
              <Text style={styles.title}>{item[0].name}</Text>
              <Text style={styles.details}>{dateTime(item[0].release_date)}</Text>
              <Text style={styles.details}>Order No: {item.ordNo}</Text>
              <Text style={styles.details}>Option: {item.option}</Text>
              <Text style={styles.details}>Price: {item[0].price}</Text>
              <Button title="TO SEND ?"
                onPress={() => ToSend(item.ordNo)}
              />
            </TouchableOpacity>
          )}

        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  border: { margin: 10, borderWidth: 0.5, borderColor: 'black', backgroundColor: 'white' },
  img: { width: 80, height: 80 },
  more: { textAlign: 'center', position: 'absolute', left: '50%', top: '50%', fontSize: 20 },
  title: { fontSize: 20, textAlign: 'center' },
  details: { color: 'grey' },
  msgEmpty: { textAlign: 'center', fontSize: 28, paddingTop: 150 },
});

export default Closed;
