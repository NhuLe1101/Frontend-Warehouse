import React, { useState } from 'react';
import './warehouseview.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const WarehouseView = () => {
    const [selectedView, setSelectedView] = useState('available');

    const handleViewChange = (event) => {
        setSelectedView(event.target.value);
    };
    return (
        <div className="warehouse-view">
            <h3>S.WAREHOUSE</h3>
            <p>Quan 5, TP. HCM</p>

            <h4>Thay đổi giao diện</h4>
            <div className="view-options">
                <RadioGroup
                    aria-label="warehouse-view"
                    value={selectedView}
                    onChange={handleViewChange}
                >
                    <FormControlLabel
                        value="available"
                        control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: '#ffffff' } }} />}
                        label="Available"
                        sx={{ color: 'white' }}
                    />
                    <FormControlLabel
                        value="checkout"
                        control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: '#ffffff' } }} />}
                        label="Checkout"
                        sx={{ color: 'white' }}
                    />
                </RadioGroup>
            </div>
        </div>
    );
};

export default WarehouseView
