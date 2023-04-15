import { View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { useContext } from 'react'
import { Text } from '@react-native-material/core'
import { useNavigation } from '@react-navigation/native'

const ItemProfilCard = () => {
    const { PurchaseHistory, dateTime } = useContext(StoreContext)

    const navigation = useNavigation();

    const seeDetailOrdrs = (ordNo) => {
        navigation.navigate("purchaseHistoryDetails", { ordNo: ordNo })
    }
    return (
        <View>
            {
                PurchaseHistory.length == 0 ? <Text style={styles.msgEmpty}>No order has been completed</Text>
                    :
                    <FlatList
                        data={PurchaseHistory}
                        renderItem={({ item }) => <TouchableOpacity onPress={() => seeDetailOrdrs(item.ordNo)} style={styles.border}>
                            <Text style={styles.title}>On Way ! </Text>
                            <View style={styles.block}>
                                <Image style={styles.img} source={{ uri: item["0"].picture }} />
                                {item.option > 1 ? <Text style={styles.more}>+{item.option - 1}</Text> : ''}
                            </View>
                            <Text style={styles.details}>ORDER NO:{item.ordNo}</Text>
                            <Text style={styles.details}>QUANTITY:{item.option}</Text>
                            <Text style={styles.details}>SHIPPED DATE:{dateTime()}</Text>
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
export default ItemProfilCard