import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowMedicine = () => {
    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/medicines/all');
            setMedicines(response.data);
        } catch (error) {
            console.error('Error fetching medicines:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center"><u>Medicine List</u></h2>
            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Composition</th>
                        <th>Used For</th>
                        <th>Image</th>
                        <th>Entry date</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map((medicine) => (
                        <tr key={medicine.medicine_id}>
                            <td>{medicine.medicine_id}</td>
                            <td>{medicine.medicine_name}</td>
                            <td>₹{medicine.medicine_price}</td>
                            <td>{medicine.medicine_composition}</td>
                            <td>{medicine.used_for}</td>
                            <td>
                                <img 
                                    src={medicine.medicine_image} 
                                    alt={medicine.medicine_name} 
                                    width="100" 
                                    height="100"
                                />
                            </td>
                            <td>{new Date(medicine.medicine_entry).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShowMedicine;
