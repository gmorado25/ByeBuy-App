import { UserProvider } from '@/contexts/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function TabLayout() {
  return (
    <UserProvider>
      <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#3B82F6' }}>
        <Tabs.Screen
          name="SummaryTab"
          options={{
            title: 'Summary',
            tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="WorkCalculatorTab"
          options={{
            title: 'Work Calc',
            tabBarIcon: ({ color, size }) => <Ionicons name="calculator" size={size} color={color} />,
          }}
        />
        {/* <Tabs.Screen
        name="InvestmentSimulatorTab"
        options={{
          title: 'Invest',
          tabBarIcon: ({ color, size }) => <Ionicons name="stats-chart" size={size} color={color} />,
        }}
      />
       */}
        <Tabs.Screen
          name="Settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
          }}
        />
      </Tabs>
      <Toast />
    </UserProvider>
  );
}