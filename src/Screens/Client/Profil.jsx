import { View, StyleSheet, FlatList } from 'react-native'
import { Avatar, Stack, Text } from "@react-native-material/core";
import ItemProfilCard from '../../Components/Client/ItemProfilCard';

const Profil = () => {

  return (
    <View>
      <View style={{ marginTop: 20 }}>
        <Stack center spacing={6}>
          <Avatar label="Sacha Foucard" color='grey' />
        </Stack>
        <Text style={styles.name}>Sacha Foucard, Herzelia</Text>
        <Text style={styles.name}>Purchase History</Text>
      </View>
      <View>
       <ItemProfilCard/>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  name: {
    textAlign: 'center',
    marginTop: 20
  }
})
export default Profil