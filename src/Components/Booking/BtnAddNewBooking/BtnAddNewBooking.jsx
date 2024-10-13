import React, { Fragment, useState } from 'react'
import Dropzone from 'react-dropzone'
import { FaUpload } from 'react-icons/fa';
import BookingService from '../../../api/booking';
import './BtnAddNewBooking.css'

const BtnAddNewBooking = () => {
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);
    const handleSubmit = async () => {
        if (!file) {
            alert("Please upload a file first!");
            return;
        }

        try {
            const message = await BookingService.upload(file);
            alert(message);
            window.location.reload();
          } catch (error) {
            console.error("Có lỗi xảy ra khi upload dữ liệu:", error);
          }
    };
    return (
        <div className='btn_add_new_booking'>
            <Dropzone onDrop={acceptedFiles => {
                setFile(acceptedFiles[0]);
                setFileName(acceptedFiles[0].name);
            }}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <FaUpload size={40} color="#4a90e2" />
                            <p>Kéo file vào đây hoặc Click để chọn files</p>
                        </div>
                    </section>
                )}
            </Dropzone>
            {fileName && <p className="file-name">File: {fileName}</p>}
            <button onClick={handleSubmit} className="submit-button-add-bk">Lưu</button>
        </div>
    );
}

export default BtnAddNewBooking
