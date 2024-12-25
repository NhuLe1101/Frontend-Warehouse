import React, { Fragment, useState } from "react";
import Dropzone from "react-dropzone";
import { FaUpload } from "react-icons/fa";
import BookingService from "../../../api/booking";
import "./BtnAddNewBooking.css";
import Swal from "sweetalert2";
import CloseIcon from "@mui/icons-material/Close";
import Papa from "papaparse";

const BtnAddNewBooking = ({ onClose }) => {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);

  const AlertSuccess = () => {
    Swal.fire({
      icon: "success",
      text: "Thêm Booking thành công!",
    }).then((result) => {
      window.location.reload();
    });
  };

  const AlertFail = (
    message = "Bạn chưa thêm tệp, hãy chọn tệp của bạn trước khi nhấn nút Lưu!"
  ) => {
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

    const reader = new FileReader();
    reader.onload = async (event) => {
      const csvData = event.target.result;
      Papa.parse(csvData, {
        complete: async (results) => {
          const headers = results.meta.fields.map((header) =>
            header.trim().toLowerCase()
          );
          console.log("Headers:", headers);
          const expectedHeaders = [
            "name",
            "type",
            "quantity",
            "weight (g)",
            "checkin date",
            "checkout date",
            "image",
            "useremail",
            "delivery",
          ];

          const isValid = expectedHeaders.every((header) =>
            headers.includes(header)
          );

          if (!isValid) {
            AlertFail("Thêm thất bại, vui lòng kiểm tra lại file");
            return;
          }

          try {
            const message = await BookingService.upload(file);
            AlertSuccess();
          } catch (error) {
            console.error("Có lỗi xảy ra khi lưu tập tin:", error);
          }
        },
        header: true,
      });
    };
    reader.readAsText(file);
  };

  return (
    <div className="btn_add_new_booking">
      <Dropzone
        onDrop={(acceptedFiles) => {
          const uploadedFile = acceptedFiles[0];
          if (uploadedFile && uploadedFile.type === "text/csv") {
            setFile(uploadedFile);
            setFileName(uploadedFile.name);
          } else {
            AlertFail("Tập tin sai định dạng. Hãy chọn file .csv!");
          }
        }}
        accept=".csv"
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <FaUpload size={40} color="#4a90e2" />
              <p>Kéo tập tin vào đây hoặc nhấn để chọn tập tin!</p>
            </div>
          </section>
        )}
      </Dropzone>
      {fileName && <p className="file-name">File: {fileName}</p>}
      <button onClick={handleSubmit} className="submit-button-add-bk">
        Lưu
      </button>
      <button onClick={onClose} className="close-button-add-bk">
        <CloseIcon />
      </button>
    </div>
  );
};

export default BtnAddNewBooking;
