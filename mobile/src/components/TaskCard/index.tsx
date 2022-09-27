import { Text, TouchableOpacity, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';

interface TaskCardProps {
  nameTask: string;
}

export function TaskCard({ nameTask }: TaskCardProps) {
  return (
    <View style={styles.container}>
      <BouncyCheckbox onPress={(isChecked: boolean) => {}} />
      <TouchableOpacity style={styles.nameTaskButton}>
        <Text style={styles.nameTask}>{nameTask}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.DetailsButton}>
        <MaterialIcons name="arrow-forward" size={15} color={'#000'} />
      </TouchableOpacity>
    </View>
  );
}
