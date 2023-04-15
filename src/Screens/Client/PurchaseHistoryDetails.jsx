import { View, FlatList, Image, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { StoreContext } from '../../Context/StoreContext';
import { Text } from '@react-native-material/core'

const PurchaseHistoryDetails = () => {

  // Get the route parameter for the order number
  const route = useRoute();
  const { ordNo } = route.params;

  // Get the purchase history from the context
  const { PurchaseHistory } = useContext(StoreContext);

  // Initialize the state for the items in the order
  const [items, setItems] = useState([]);

  // Get the items in the order after clicking on the order
  const getItemFromOrdersAfterClick = () => {
    // Find the order in the purchase history
    let order = PurchaseHistory.find((item) => item.ordNo == ordNo);
    if (!order) {
      return null;
    }
    // Remove unwanted keys from the order object
    let keysToRemove = ['option', 'ordNo'];
    order = Object.fromEntries(Object.entries(order).filter(([key, value]) => !keysToRemove.includes(key)));
    return order;
  }

  // Create an array of items from the order object
  const createObj = async () => {
    let a = await getItemFromOrdersAfterClick()
    let newArray = [];
    for (let i = 0; i < Object.keys(a).length; i++) {
      newArray = a[i]
      setItems((prev) => [...prev, newArray])
    }
  }

  // Call createObj when the component mounts
  useEffect(() => {
    createObj()
  }, []);

  return (
    <View>
      {/* Display the order number */}
      <Text style={styles.title}>Details </Text>
      <Text style={styles.title}> No order: {ordNo}</Text>

      {/* Display the items in the order */}
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>
            <Image source={{ uri: item.picture }} style={styles.img} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  )
}

// Define styles
const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  img: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  list: {
    paddingHorizontal: 10,
  },
  title:{
    textAlign:'center',fontSize:20
  }
});

export default PurchaseHistoryDetails;
