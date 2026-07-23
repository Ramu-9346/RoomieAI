/**
 * ErrorBoundary — root-level class component error catcher.
 *
 * Catches any unhandled render errors in the component tree and
 * shows a minimal fallback UI instead of a blank screen or crash.
 *
 * Must be a class component — React has no functional equivalent for
 * componentDidCatch / getDerivedStateFromError.
 *
 * Usage:
 *   <ErrorBoundary>
 *     <App />
 *   </ErrorBoundary>
 */

import React, { Component, type ReactNode } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Future: send to Sentry / Crashlytics
    console.error('[ErrorBoundary] Unhandled render error:', error.message, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <View style={styles.gap} />
          <Text style={styles.message}>
            {this.state.error?.message ?? 'An unexpected error occurred.'}
          </Text>
          <View style={styles.gap} />
          <Pressable
            onPress={this.handleReset}
            style={styles.btn}
            accessibilityRole="button"
            accessibilityLabel="Try again"
          >
            <Text style={styles.btnText}>Try Again</Text>
          </Pressable>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBF7F0',
    paddingHorizontal: 32,
  },
  gap: {
    height: 16,
  },
  title: {
    fontFamily: 'Fraunces_500Medium',
    fontSize: 24,
    color: '#1A1713',
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Geist_400Regular',
    fontSize: 15,
    color: '#44403B',
    textAlign: 'center',
    lineHeight: 22,
  },
  btn: {
    marginTop: 8,
    backgroundColor: '#1A1713',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  btnText: {
    fontFamily: 'Geist_500Medium',
    fontSize: 14,
    color: '#FBF7F0',
    textAlign: 'center',
  },
});
