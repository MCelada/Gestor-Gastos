import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

// 1. Definimos la interfaz EXACTA del backend (TypeScript Strict)
interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
}

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Función para llamar al Backend
  const fetchExpenses = async () => {
    try {
      // IMPORTANTE:
      // Si usas Android Emulator usa: 'http://10.0.2.2:8080/expenses'
      // Si usas iOS Simulator usa: 'http://localhost:8080/expenses'
      // Si usas tu celular físico: Usa la IP de tu PC ej: 'http://192.168.1.X:8080/expenses'

      const response = await fetch('http://10.0.2.2:8080/expenses'); 
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis Gastos (Sezzle Demo)</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.category}>{item.category}</Text>
              </View>
              <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
            </View>
          )}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', paddingTop: 50, paddingHorizontal: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  card: { 
    backgroundColor: 'white', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 10, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3
  },
  title: { fontSize: 16, fontWeight: '600' },
  category: { fontSize: 12, color: '#888', marginTop: 4 },
  amount: { fontSize: 18, fontWeight: 'bold', color: '#2ecc71' }
});