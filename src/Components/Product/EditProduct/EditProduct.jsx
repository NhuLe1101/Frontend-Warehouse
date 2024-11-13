import React, { useState, useEffect } from "react";
import "./editproduct.css";
import ProductService from "../../../api/product";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const EditProduct = ({ product, onClose }) => {
  const [formData, setFormData] = useState(product);
  const [saveStatus, setSaveStatus] = useState(null);

  const [showReferenceNo, setShowReferenceNo] = useState(false);
  const [deliveryValue, setDeliveryValue] = useState("");

  const toggleDeliveryVisibility = () => {
    setShowReferenceNo(!showReferenceNo);
  };

  useEffect(() => {
    setFormData(product);
  }, [product]);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const AlertSuccess = () => {
    Swal.fire({
      icon: "success",
      text: "Cập nhật thành công!",
    }).then((result) => {
      window.location.reload();
    });
  };

  const handleSaveClick = async () => {
    try {
      console.log(formData);
      const message = await ProductService.updateProduct(formData);
      //alert(message);
      setSaveStatus("success");
      //window.location.reload();
      AlertSuccess();
    } catch (error) {
      setSaveStatus("error");
      console.error("Có lỗi xảy ra khi upload dữ liệu:", error);
    }
  };
  if (!product) return null;

  function formatId(id) {
    if (id < 10) {
      return "SP000" + id;
    } else if (id < 100) {
      return "SP00" + id;
    } else if (id < 1000) {
      return "SP0" + id;
    } else {
      return "SP" + id;
    }
  }

  return (
    <div className="popup-pd">
      <div className="popup-content">
        <h2>THÔNG TIN SẢN PHẨM</h2>
        <form className="formEditPd">
          <label>
            ID:
            <input
              type="text"
              name="stt"
              value={formatId(formData.itemId)}
              readOnly
              disabled
              style={{ border: "none" }}
            />
          </label>
          <label>
            Booking:
            <input
              type="text"
              name="booking"
              value={formData.booking.id}
              readOnly
              disabled
              style={{ border: "none" }}
            />
          </label>
          <label>
            Hình ảnh:
            <img src={formData.image} alt="" width={50} />
          </label>
          <label>
            Tên:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Số lượng:
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Trạng thái:
            {/* <select name="status" id="" onChange={handleInputChange} disabled>
              <option value="Đang lưu kho">Đang lưu kho</option>
              <option value="Đã xuất kho">Đã xuất kho</option>
              <option value="Đã huỷ">Đã huỷ</option>
            </select> */}
            <input type="text" name="status" value={formData.status} disabled />
          </label>
          <label>
            Ngày xuất:
            <input
              type="date"
              name="checkout"
              value={formData.checkout}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Ngày nhập:
            <input
              type="date"
              name="checkin"
              value={formData.checkin}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Cân nặng (g):
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Vận chuyển:
            <input
              type="text"
              name="delivery"
              value={formData.delivery}
              onChange={handleInputChange}
              readOnly
            />
          </label>
          <label></label>
          <label>
            Mã xác nhận:
            <input
              type={showReferenceNo ? "text" : "password"}
              name="referenceNo"
              value={formData.booking.referenceNo}
              readOnly
              disabled
            />
            <span
              style={{ position: "absolute", right: "40px" }}
              className="input-group-text"
              onClick={toggleDeliveryVisibility}
            >
              <FontAwesomeIcon icon={showReferenceNo ? faEyeSlash : faEye} />
            </span>
          </label>
        </form>
        <div className="popup-actions">
          <button className="btn-save-edit-bk" onClick={handleSaveClick}>
            Lưu
          </button>
          <button className="btn-cancel-edit-bk" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
