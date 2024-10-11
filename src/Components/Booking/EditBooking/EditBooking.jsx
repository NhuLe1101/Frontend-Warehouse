import React, { useState, useEffect } from 'react';
import './editbooking.css'; // Assuming you have a CSS file for styling

const EditBooking = ({ booking, onClose, onSave }) => {
    const [formData, setFormData] = useState(booking);
    const [saveStatus, setSaveStatus] = useState(null); // To track save status (null, success, or error)


    useEffect(() => {
        setFormData(booking);
    }, [booking]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveClick = async () => {
        try {
            await onSave(formData); // Save function passed from the parent component
            setSaveStatus('success'); // If save is successful
        } catch (error) {
            setSaveStatus('error'); // If there's an error
        }
    };
    if (!booking) return null; // In case no booking data is provided

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>Edit Booking</h2>
                <form className='formEditBk'>
                    <label>
                        ID:
                        <input
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={handleInputChange}
                            readOnly
                        />
                    </label>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="customerEmail"
                            value={formData.customerEmail}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Phone:
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </label>
                    {/* Add more fields here as needed */}
                </form>
                <div className="popup-actions">
                    <button className='btn-save-edit-bk' onClick={handleSaveClick}>Save</button>
                    <button className='btn-cancel-edit-bk' onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditBooking;
