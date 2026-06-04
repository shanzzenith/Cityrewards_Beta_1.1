import { Redirect } from 'expo-router';

// Entry point: redirect to sign-up (auth flow)
// In production, check session token and redirect to (tabs) if logged in
export default function Index() {
  return <Redirect href="/(auth)/sign-up" />;
}
