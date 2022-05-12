import { View, Platform ,StyleSheet } from 'react-native'
import React from 'react'
import {Ionicons} from '@expo/vector-icons'
import { colors } from '../utils'
export default function ReloadIcon({load}) {
    const reloadIconName= Platform.Os=== 'ios' ? 'ios-refresh' : 'md-refresh'
  return (
    <View style= {styles.reloadIcon}>
      <Ionicons onPress={load} name={reloadIconName} size={24} color={colors.PRIMARY_COLOR} />
    </View>
  )
}
const styles = StyleSheet.create({
    reloadIcon:{
        position: 'absolute',
        top: 40,
        right: 20,
    }})