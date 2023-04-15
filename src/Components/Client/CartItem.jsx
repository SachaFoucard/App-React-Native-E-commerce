import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Button, Text } from '@react-native-material/core'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { useRoute } from '@react-navigation/native';

const CartItem = () => {
  const { data, setBasket, setNbrsProductbag,nbrsProductsBag,setTotalPrice,totalPrice } = useContext(StoreContext);
  const route = useRoute();
  const { price, picture, name, id, release_date } = route.params;

  const addToCart = (id) => {
    let product = data.find((item) => item.id == id);
    setBasket((prev) => [...prev, product])
    setNbrsProductbag(nbrsProductsBag+1)
    setTotalPrice(totalPrice+product.price)
  }

  return (
    <View style={styles.box}>
      <Image
        source={{ uri: picture }}
        style={styles.img} />
      <Text style={styles.date}> {release_date}</Text>
      <Text color="gold">New</Text>
      <Text style={styles.nm}>{name}</Text>
      <Text style={styles.price}>$ {price}</Text>
      <Button onPress={() => addToCart(id)} variant="contained" title="add"
        trailing={props => <Icon name="basket" {...props} />}
      />
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
    width: 450,
    height: 500,
    margin: 'auto'
  },
  date: {
    fontSize: 10
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

export default CartItem