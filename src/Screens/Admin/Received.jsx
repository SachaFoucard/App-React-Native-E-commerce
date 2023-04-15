import { View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { useContext } from 'react'
import { Button, Text } from '@react-native-material/core'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Received = () => {
  const { PurchaseHistory, dateTime,received,setReceived } = useContext(StoreContext)
  const navigation = useNavigation();

  const ToPrepare = (ordNo) => {
    let order = received.find((o) => o.ordNo == ordNo)
    navigation.navigate('Closed', { orderCommand: order })
    setReceived(received.filter((o)=>o != order))
  }
  
  useEffect(() => {
    setReceived(PurchaseHistory)
  }, [])

  return (
    <View>
            <Text style={styles.title}>Received <Ionicons name="send-outline" size={30}></Ionicons></Text>

      {
        received.length == 0 ? <Text style={styles.msgEmpty}>No order has get</Text>
          :
          <FlatList
            data={received}
            renderItem={({ item }) => <TouchableOpacity style={styles.border}>
              <Text style={styles.title}>NEW ORDER +1</Text>
              <View style={styles.block}>
                <Image style={styles.img} source={{ uri: item["0"].picture }} />
                {item.option > 1 ? <Text style={styles.more}>+{item.option - 1}</Text> : ''}
              </View>
              <Text style={styles.details}>Name: Sacha Foucard</Text>
              <Text style={styles.details}>Adresse : mahei yeuda, herzlia</Text>
              <Text style={styles.details}>ORDER NO:{item.ordNo}</Text>
              <Text style={styles.details}>QUANTITY:{item.option}</Text>
              <Text style={styles.details}>SHIPPED DATE:{dateTime()}</Text>
              <Button title="ready to prepare"
                onPress={() => ToPrepare(item.ordNo)}
              />
            </TouchableOpacity>}
            keyExtractor={item => item.id} />
      }
    </View>
  )
}
const styles = StyleSheet.create({
  border: { margin: 10, borderWidth: 0.5, borderColor: 'black', backgroundColor: 'white' },
  img: { width: 80, height: 80 },
  more: { textAlign: 'center', position: 'absolute', left: '50%', top: '50%', fontSize: 20 },
  title: { fontSize: 20, textAlign: 'center' },
  details: { color: 'grey' },
  msgEmpty: { textAlign: 'center', fontSize: 28, paddingTop: 150 }

})
export default Received