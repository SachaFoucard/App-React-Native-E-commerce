import { View, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import ItemCard from '../../Components/Client/ItemCard'
import { Text, Button } from "@react-native-material/core";
import Ionicons from 'react-native-vector-icons/Ionicons';



const Card = () => {
  const { basket, totalPrice, setPurchaseHistory, setBasket, setNbrsProductbag, setTotalPrice, setNbrsPurchaseHistory, nbrsProductsBag, dateTime, RandomOrderNumber } = useContext(StoreContext);

  const paiement = () => {
    setPurchaseHistory(prev => [...prev, { ...basket, option: basket.length, ordNo: RandomOrderNumber(100000) }]);
    setBasket([])
    setNbrsProductbag(0) // tab icon = 0
    setTotalPrice(0) // total price text into Card components = 0
    dateTime();
    alert('paiement successfuly')
  }
  return (
    <View>
      {totalPrice == 0 ? '' : <Text style={styles.center}>Total :{totalPrice}</Text>}

      {basket.length != 0 ?
        <View style={styles.pd}>
          <FlatList
            data={basket}
            renderItem={({ item }) => <ItemCard {...item} />}
            keyExtractor={item => item.id}
          />
          <Button
            variant="contained"
            color='primary'
            title="payment"
            style={styles.btn}
            onPress={paiement}
          >
          </Button>
        </View>
        :
        <Text style={styles.msgEmpty}>Empty Bag <Ionicons name="cart" size={30}></Ionicons></Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    fontSize: 20,
    textAlign: 'center'

  },
  btn: {
    padding: 5,
  },

  pd:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  msgEmpty:{textAlign:'center',fontSize:28,paddingTop:250}

})
export default Card
