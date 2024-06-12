import { useState } from "react";
import {toast} from "sonner"


export function GuestList() {
  
    const [name, setName] = useState('');
    const [guests, setGuests] =useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [newName, setNewName] = useState('');
    
    const handleChange = (e) => {
        setName(e.target.value);
    }

    const saveGuest= () => {
      if(name.length >= 3) {
        setGuests([...guests, {name, color: getRandomColor()}])
        toast.success(`${name} admis à la soirée`);
      }
    }

    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      console.log(letters.length)
      let color = '#';
      for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }

    const removeGuest = (index) => {
      setGuests(currGuests => currGuests.filter((guest, i) => i !== index));
  }

  
    const startEditing = (index) => {
      setEditingIndex(index);
      setIsEditing(true);
      setNewName(guests[index].name);
    }

    const handleEditChange = (e) => {
      setNewName(e.target.value);
    }

    const saveEditedGuest = () => {
      const updatedGuests = guests.map((guest, i) => 
          i === editingIndex ? { ...guest, name: newName } : guest
      );
      setGuests(updatedGuests);
      setIsEditing(false);
      setEditingIndex(null);
      setNewName('');
    }

    return (
      <div id="div">
            <h1>Guest List</h1>
            <label htmlFor="input">Name:</label>
            <input
                id="input"
                type="text"
                value={name} 
                onChange={handleChange}
            />
            <button disabled={name.length < 3} onClick={saveGuest}>Add a guest</button>
            {guests.map((guest, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", flexDirection: "row", alignItems: "center" }}>
                    <p
                        style={{ backgroundColor: guest.color, cursor: "pointer" }}
                        onClick={() => startEditing(i)}
                    >
                        {guest.name}
                    </p>
                    <i
                        style={{ color: "red", cursor: "pointer" }}
                        className="fa-solid fa-square-minus"
                        onClick={() => removeGuest(i)}
                    ></i>
                </div>
            ))}
            {isEditing && (
                <div>
                    <label htmlFor="editInput">Edit Name:</label>
                    <input
                        id="editInput"
                        type="text"
                        value={newName}
                        onChange={handleEditChange}
                    />
                    <button disabled={newName.length < 3} onClick={saveEditedGuest}>Save</button>
                </div>
            )}
        </div>
      
    );
  }

 