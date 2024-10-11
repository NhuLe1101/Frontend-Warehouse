import React, { useState, useEffect } from 'react';
import './editbooking.css'; 
import BookingService from '../../../api/booking';

const EditBooking = ({ booking, onClose, onSave }) => {
    const [formData, setFormData] = useState(booking);
    const [saveStatus, setSaveStatus] = useState(null); 


    useEffect(() => {
        setFormData(booking);
    }, [booking]);

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveClick = async () => {
        try {
            //console.log(formData);
            const message = await BookingService.updateBooking(formData); 
            alert(message);
            setSaveStatus('success');
            window.location.reload(); 
        } catch (error) {
            setSaveStatus('error'); 
            console.error("Có lỗi xảy ra khi upload dữ liệu:", error);
        }
    };
    if (!booking) return null; 

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
                            name="customerName"
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
                            name="numberphone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </label>
                    
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
