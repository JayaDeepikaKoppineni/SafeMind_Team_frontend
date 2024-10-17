import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
const StartScreen = ({navigation, handleLogin}) => {
  const {width} = Dimensions.get('window');
  const {height} = Dimensions.get('window');

  const works = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center', backgroundColor: '#99ff99'}}>
        <View
          style={{
            width: width * 0.95,
            padding: 0,
            marginBottom: 15,
            marginTop: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 25, fontWeight: '800', color: '#000'}}>
              SafeMind
            </Text>
            <View>
              <Text>Register ?</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{alignItems: 'center', marginTop:10}}>
        <View
          style={{
            width: width * 0.95,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor:'#b3ecff'
            
          }}>
          <TouchableOpacity style={[styles.header,{borderRadius:20,backgroundColor:'#cccccc'}]}>
            <View>
              <Text>Medition</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.header}>
            <View>
              <Text>Journaling</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* <View style={{alignItems:'center'}}>
      
        <TouchableOpacity style={{marginTop:20}} >
          <View>
            <Text style={{fontSize:18,color:'blue',fontWeight:'600',textDecorationLine:'underline'}}>How it Works!</Text>
          </View>
        </TouchableOpacity>

      </View>
    */}
    </SafeAreaView>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dottedLine: {
    width: 1, // Thickness of the line
    height: 20, // Height of the dotted line
    borderStyle: 'dotted', // Makes the line dotted
    borderWidth: 1, // Thickness of the dots
    borderColor: '#000', // Color of the dots
    borderRadius: 1, // Adjust this for round dots
  },
  header: {
    width: width * 0.45,
    // backgroundColor: 'blue',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
