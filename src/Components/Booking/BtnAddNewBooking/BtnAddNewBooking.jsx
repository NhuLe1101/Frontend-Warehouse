import React, { Fragment, useState } from 'react'
import Dropzone from 'react-dropzone'
import { FaUpload } from 'react-icons/fa';
import BookingService from '../../../api/booking';
import './btnaddnewbooking.css'
import Swal from 'sweetalert2';
import CloseIcon from '@mui/icons-material/Close';

const BtnAddNewBooking = ({ onClose }) => {
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);

    const AlertSuccess = () => {
        Swal.fire({
            icon: "success",
            text: "Thêm Booking thành công!",
        }).then((result) => {
            window.location.reload();
        });
    };

    const AlertFail = (message = "Bạn chưa thêm tệp, hãy chọn tệp của bạn trước khi nhấn nút Lưu!") => {
        Swal.fire({
            icon: "error",
            text: message,
        });
    };

    const handleSubmit = async () => {
        if (!file) {
            AlertFail();
            return;
        }

        try {
            const message = await BookingService.upload(file);
            AlertSuccess();
        } catch (error) {
            console.error("Có lỗi xảy ra khi lưu tập tin:", error);
        }
    };

    return (
        <div className='btn_add_new_booking'>
            <Dropzone onDrop={acceptedFiles => {
                const uploadedFile = acceptedFiles[0];
                if (uploadedFile && uploadedFile.type === 'text/csv') {
                    setFile(uploadedFile);
                    setFileName(uploadedFile.name);
                } else {
                    AlertFail("Vui lòng chỉ chọn tệp CSV.");
                }
            }}
                accept=".csv"
            >
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <FaUpload size={40} color="#4a90e2" />
                            <p>Kéo tập tin vào đây hoặc nhấn để chọn tập tin!</p>
                        </div>
                    </section>
                )}
            </Dropzone>
            {fileName && <p className="file-name">File: {fileName}</p>}
            <button onClick={handleSubmit} className="submit-button-add-bk">Lưu</button>
            <button onClick={onClose} className="close-button-add-bk">
                <CloseIcon />
            </button>
        </div>
    );
}

export default BtnAddNewBooking
