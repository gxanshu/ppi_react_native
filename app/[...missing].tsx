// import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
