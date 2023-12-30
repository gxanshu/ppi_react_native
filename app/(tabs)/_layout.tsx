import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Redirect, Tabs } from 'expo-router';
import { Pressable, Text } from 'react-native';
import { useSession } from '@/context/authContext';
import { auth } from '@/utils/firebase';
import Loader from '@/components/Loader';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { session, signIn } = useSession();

  useEffect(()=> {
    onAuthStateChanged(auth, (user) => {
      if (user) signIn(user);
    })
  }, [])

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/auth" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4169e1",
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Link href="/" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color="#000"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
