/**
 * Type shim for @react-navigation/native.
 * The installed version of this package ships no .d.ts files.
 * Full types are available via @react-navigation/native-stack which is already typed.
 */
declare module '@react-navigation/native' {
  export { NavigationContainer } from '@react-navigation/native-stack';

  export interface NavigationProp {
    navigate: (screen: string, params?: Record<string, unknown>) => void;
    replace: (screen: string, params?: Record<string, unknown>) => void;
    goBack: () => void;
    reset: (state: { index: number; routes: { name: string }[] }) => void;
  }
}
