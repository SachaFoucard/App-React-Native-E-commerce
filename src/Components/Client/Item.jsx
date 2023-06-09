import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Text } from "@react-native-material/core";
import { useNavigation } from '@react-navigation/native'


const Item = ({ name, picture, price,id,release_date }) => {
  
  const navigation = useNavigation();

  const ClickImg = () => {
    navigation.navigate('CartItem',{id,picture,name,price,release_date})
  }
  return (
    <View style={styles.box}>
      <TouchableOpacity onPress={() => ClickImg()}>
        <Image
          source={{ uri: picture }}
          style={styles.img} />
      </TouchableOpacity>
      <Text color="gold">New</Text>
      <Text style={styles.nm}>{name}</Text>
      <Text style={styles.price}>$ {price}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    paddingBottom: 40
  },
  img: {
    width: 250,
    height: 300,
    margin: 'auto'
  },
  nm: {
    fontSize: 22,
    maxWidth: 150,
    textAlign: 'center',
    marginTop: 30
  },
  price: {
    fontSize: 20,
    maxWidth: 150,
    textAlign: 'center',
    color: '#524b48',
    lineHeight: 50
  }
})
export default Item