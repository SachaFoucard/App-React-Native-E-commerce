import { View, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { useContext } from 'react'
import { Text } from '@react-native-material/core'
import { useRoute } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Packed = () => {
  const { comm } = useRoute().params || {}; //
  const { PurchaseHistory, dateTime,setPacked,packed } = useContext(StoreContext);

  const AddPackedOrder = () => {
    if (comm) { // add a conditional statement to check if orderCommand is not null
      const order = PurchaseHistory.find((o) => o.ordNo == comm);
      if (order) {
        setPacked(prevState => [...prevState, order]);
      }
    }
  };

  useEffect(() => {
    AddPackedOrder();
  }, [comm]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Packed <Ionicons name="cube-outline" size={30} color="black" />
      </Text>

      {packed.length == 0 ? (
        <Text style={styles.msgEmpty}>No orders packed.</Text>
      ) : (
        <FlatList
          data={packed}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.border}>
              <Image style={styles.img} source={{ uri: item[0].picture }} />
              <Text style={styles.title}>{item[0].name}</Text>
              <Text style={styles.details}>{dateTime(item[0].release_date)}</Text>
              <Text style={styles.details}>Order No: {item.ordNo}</Text>
              <Text style={styles.details}>Option: {item.option}</Text>
              <Text style={styles.details}>Price: {item[0].price}</Text>
            </TouchableOpacity>
          )}

        />
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  border: { margin: 10, borderWidth: 0.5, borderColor: 'black', backgroundColor: 'white' },
  img: { width: 80, height: 80 },
  more: { textAlign: 'center', position: 'absolute', left: '50%', top: '50%', fontSize: 20 },
  title: { fontSize: 20, textAlign: 'center' },
  details: { color: 'grey' },
  msgEmpty: { textAlign: 'center', fontSize: 28, paddingTop: 150 },
});

export default Packed