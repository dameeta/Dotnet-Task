import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import './App.css';

const GET_ITEMS = gql`
  query GetItems {
    items(order: { id: ASC }) {
      id
      name
      type
      quantity
    }
  }
`;

const ADD_ITEM = gql`
  mutation AddItem($name: String!, $type: String!, $quantity: Int!) {
    addItem(name: $name, type: $type, quantity: $quantity) {
      id
      name
      type
      quantity
    }
  }
`;

const DELETE_ITEM = gql`
  mutation DeleteItem($id: Int!) {
    deleteItem(id: $id)
  }
`;

const UPDATE_QUANTITY = gql`
  mutation UpdateQuantity($id: Int!, $quantity: Int!) {
    updateQuantity(id: $id, quantity: $quantity) {
      id
      quantity
    }
  }
`;

function Inventory() {
    const { loading, error, data } = useQuery(GET_ITEMS);
    const [addItem] = useMutation(ADD_ITEM, {
        refetchQueries: [{ query: GET_ITEMS }],
    });
    const [deleteItem] = useMutation(DELETE_ITEM, {
        refetchQueries: [{ query: GET_ITEMS }],
    });
    const [updateQuantity] = useMutation(UPDATE_QUANTITY);

    const [newItem, setNewItem] = useState({ name: '', type: '', quantity: 0 });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        addItem({ variables: { ...newItem, quantity: parseInt(newItem.quantity.toString()) } });
        setNewItem({ name: '', type: '', quantity: 0 });
    };

    return (
        <div className="inventory-container">
            <h1>Inventory Management</h1>

            <form onSubmit={handleAddItem} className="add-item-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Type"
                    value={newItem.type}
                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
                    required
                />
                <button type="submit">Add Item</button>
            </form>

            <div className="item-list">
                {data.items.map((item: any) => (
                    <div key={item.id} className="item-card">
                        <div className="item-details">
                            <h3>{item.name}</h3>
                            <p>Type: {item.type}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                        <div className="item-actions">
                            <button
                                onClick={() => {
                                    const newQty = prompt('Enter new quantity:', item.quantity);
                                    if (newQty !== null) {
                                        updateQuantity({ variables: { id: item.id, quantity: parseInt(newQty) } });
                                    }
                                }}
                            >
                                Update Qty
                            </button>
                            <button className="delete-btn" onClick={() => deleteItem({ variables: { id: item.id } })}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Inventory;
