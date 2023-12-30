import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { useEffect } from 'react';
import Loader from '@/components/Loader';
import { StatusBar } from 'expo-status-bar';
import { SessionProvider } from '@/context/authContext';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { RootSiblingParent } from 'react-native-root-siblings';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Inter': require('../assets/fonts/Inter-Regular.ttf'),
    'InterBold': require('../assets/fonts/Inter-Bold.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return <Loader />
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {

  return (
    <ThemeProvider value={DefaultTheme}>
      <StatusBar style="dark" backgroundColor='white' />
      <SessionProvider>
        <IconRegistry icons={EvaIconsPack} />
        <RootSiblingParent>
          <ApplicationProvider {...eva} theme={eva.light}>
            <Slot />
          </ApplicationProvider>
        </RootSiblingParent>
      </SessionProvider>
    </ThemeProvider>
  );
}
