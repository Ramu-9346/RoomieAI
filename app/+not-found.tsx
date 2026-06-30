import { View, StyleSheet }  from 'react-native';
import { Link }              from 'expo-router';
import { Text }              from '@components/primitives/Text';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text variant="title" align="center">
        Screen not found
      </Text>
      <Link href="/(main)/(tabs)/chat">
        <Text variant="body" align="center">
          Go to Chat
        </Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
});
