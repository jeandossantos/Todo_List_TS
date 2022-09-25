import React, { ReactNode } from 'react';
import { View } from 'react-native';

import { styles } from './styles';

interface BackgroundProps {
  children: ReactNode;
}
export function Background({ children }: BackgroundProps) {
  return <View style={styles.container}>{children}</View>;
}
