import { Tabs } from "expo-router";
import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import AuthHandlerPage from "../auth";
import { Icon } from "@ui-kitten/components";

const icon = {
  height: 24,
  width: 24
}

export default function TabLayout() {
  const { user, loading } = useAuth();


  if (loading) {
    return <Loader />;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!user) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <AuthHandlerPage/>
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4169e1"
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Icon style={icon} fill={color} name="home-outline" />,
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: "Statistics",
          tabBarIcon: ({ color }) => <Icon style={icon} fill={color} name="bar-chart-outline" />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color }) => <Icon style={icon} fill={color} name="search-outline" />,
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: "Report",
          tabBarIcon: ({ color }) => <Icon style={icon} fill={color} name="message-square-outline" />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "about",
          tabBarIcon: ({ color }) => <Icon style={icon} fill={color} name="person-outline" />
        }}
      />
    </Tabs>
  );
}