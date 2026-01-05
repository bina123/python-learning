// src/components/ColorPicker.jsx
import { useState } from 'react'

function ColorPicker() {
    const [selectedColor, setSelectedColor] = useState('#3498db');

    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };

    return (
        <div>
            <h2>Color Picker</h2>

            {/* Display selected color */}
            <div style={{
                width: '200px',
                height: '200px',
                background: selectedColor,
                borderRadius: '8px',
                marginBottom: '1rem'
            }} />

            <p>Selected: {selectedColor}</p>

            {/* Color buttons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
                {colors.map(color => (
                    <button
                        key={color}
                        onClick={() => handleColorSelect(color)}  // Passing argument
                        style={{
                            width: '50px',
                            height: '50px',
                            background: color,
                            border: selectedColor === color ? '3px solid #000' : 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default ColorPicker;