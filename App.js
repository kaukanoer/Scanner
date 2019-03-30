'use strict';
import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, Alert, View, Button, Clipboard} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataqr: '',
      status: 'Ready'
    };
  }
  onSuccess(e) {
    this.setState({
      dataqr: e.data,
      status: 'Coba Lagi'
    })
    Alert.alert(
      'QR Code',
      'Code : '+e.data,
      [
        {text: 'OK', onPress:() => console.log('ok')},
      ],
      { cancelable: false }
    )
  }

  copytoClipboard = async ()=> {
    await Clipboard.setString(this.state.dataqr)
  }
  render() {
    return (
     <View style={styles.conMain}>
        <View style={styles.conHeader}>
          <Text style={styles.textHeader}>QR Code</Text>
        </View>
        <View style={{flexDirection: "row"}}>
          <Text>Status: </Text>
          <Button
          onPress={()=>{
            this.scanner.reactivate()
            this.setState({status:'Ready'})
          }}
          title={this.state.status}/>
        </View>
        <View style = {styles.conQR}>
          <QRCodeScanner
          onRead={this.onSuccess.bind(this)}
          ref={(node)=>{this.scanner = node}}
          />
        </View>
          <View style={{flexDirection:'row'}}>
            <Text>Code: {this.state.dataqr}{'  '} </Text>
            <Button onPress={this.copytoClipboard} title="Copy"/>
          </View>
     </View> 
    )
  }
}
const styles = StyleSheet.create({
  conMain : {
    flex:1
  },
  conHeader : {
    flex:1,
    backgroundColor: '#6200EE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textHeader : {
    fontSize: 18,
    color :'white'
  },
  conQR : {
    flex:8,
    // padding: 5
  },
  centerText: {
    fontSize: 12,
    color: '#777',
  }
});