import React, { useState } from 'react';
import axios from 'axios';

const AddMedicine = () => {
    const [medicineData, setMedicineData] = useState({
        medicine_name: '',
        medicine_price: '',
        medicine_composition: '',
        used_for: '',
    });

    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [isShow, setIsShow] = useState(false);

    const handleChange = (event) => {
        setMedicineData({ ...medicineData, [event.target.name]: event.target.value });
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImageFile(file);

        if (file) {
            const imagePreview = URL.createObjectURL(file);
            setPreviewImage(imagePreview);
            setIsShow(true);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("medicine_name", medicineData.medicine_name);
        formData.append("medicine_price", medicineData.medicine_price);
        formData.append("medicine_composition", medicineData.medicine_composition);
        formData.append("used_for", medicineData.used_for);
        formData.append("medicine_image", imageFile); 

        axios({
            method: 'POST',
            url: "http://localhost:3000/api/medicines/add",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then((response) => {
            alert(response.data.message);
            setMedicineData({ 
                medicine_name: '',
                medicine_price: '',
                medicine_composition: '',
                used_for: '',
            });
            setImageFile(null);
            setPreviewImage(null);
            setIsShow(false);
        })
        .catch((error) => {
            console.error("Error submitting medicine data:", error); 
            alert("Failed to submit medicine data. Please try again.");
        });
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <header className="modal-header">
                    <h4><u>Add Medicine Information:</u></h4>
                </header>
                <div className="form-group">
                    <label>Medicine Name:</label>
                    <input type="text" name="medicine_name" className="form-control" required onChange={handleChange} value={medicineData.medicine_name} />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input type="number" name="medicine_price" className="form-control" required onChange={handleChange} value={medicineData.medicine_price} />
                </div>
                <div className="form-group">
                    <label>Composition:</label>
                    <input type="text" name="medicine_composition" className="form-control" required onChange={handleChange} value={medicineData.medicine_composition} />
                </div>
                <div className="form-group">
                    <label>Used For:</label>
                    <input type="text" name="used_for" className="form-control" required onChange={handleChange} value={medicineData.used_for} />
                </div>
                <div className="form-group">
                    <label>Upload Image:</label>
                    <input type="file" className="form-control" required onChange={handleImageUpload} />
                    {isShow && <img src={previewImage} alt="Medicine" height="150px" width="150px" />}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default AddMedicine;
