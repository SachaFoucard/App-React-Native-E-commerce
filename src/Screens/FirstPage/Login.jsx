import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Stack, TextInput, IconButton, Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';

const Login = () => {

    const navigation = useNavigation();

    const [password, setPassword] = useState();
    const [userName, setuserName] = useState();

    const check = () => {
        if (userName && password) {
            if (userName == "Client" && password == "1234") {
                navigation.navigate("ClientInterface")
            }
            else if (userName == "Admin" && password == "5678") {
                navigation.navigate("AdminInterface")
            }
            else {
                alert('Wrong connexion, try again')
            }
        }
        else {
            alert('empty')
        }
    }

    return (
        <View>
            <Text style={{ textAlign: 'center', fontSize: 30, marginTop: '20%' }}>Login</Text>
            <View style={{ paddingTop: '50%' }}>
                <Stack spacing={2} style={{ margin: 16 }}>
                    <TextInput
                        label="UserName"
                        variant="outlined"
                        trailing={props => (
                            <IconButton icon={props => <Icon name="eye" {...props} />} {...props} />
                        )}
                        onChangeText={(e) => setuserName(e)}
                    />
                    <TextInput
                        label="Password"
                        variant="outlined"
                        trailing={props => (
                            <IconButton icon={props => <Icon name="eye" {...props} />} {...props} />
                        )}
                        onChangeText={(e) => setPassword(e)}
                    />
                    <Button
                        title='Login' onPress={() => check()} />
                </Stack>
            </View>
        </View>
    )
}

export default Login