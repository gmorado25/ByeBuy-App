import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

type Product = { name: string; price: string };
type Props = {
  products: Product[];
  setProducts: (newProducts: Product[]) => void;
};

const ProductList: React.FC<Props> = ({ products, setProducts }) => {
  const updateProduct = (index: number, field: keyof Product, value: string) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  return (
    <View>
      {products.map((p, i) => (
        <View key={i}>
          <TextInput
            placeholder="Product Name"
            value={p.name}
            onChangeText={(val) => updateProduct(i, 'name', val)}
            style={styles.input}
          />
          <TextInput
            placeholder="Price"
            keyboardType="numeric"
            value={p.price}
            onChangeText={(val) => updateProduct(i, 'price', val)}
            style={styles.input}
          />
        </View>
      ))}
      <Button title="Add Another Product" onPress={() => setProducts([...products, { name: '', price: '' }])} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 8,
    marginBottom: 8,
  },
});

export default ProductList;