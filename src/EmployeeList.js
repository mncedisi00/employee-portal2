import React, { useState } from 'react';
import './App.css'; // Import the CSS for styling

const EmployeeList = ({ employees, updateEmployee, removeEmployee }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    image: '',
    position: '',
    id: ''
  });

  const handleEditClick = (employee) => {
    setIsEditing(employee.id);
    setEditFormData(employee);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditFormData({
          ...editFormData,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateEmployee(editFormData);
    setIsEditing(null);
  };

  return (
    <div>
      <h2>Employee List</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Position</th>
            <th>ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td><img src={employee.image} alt={employee.name} className="employee-image" /></td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.position}</td>
              <td>{employee.id}</td>
              <td>
                {isEditing === employee.id ? (
                  <form onSubmit={handleEditSubmit}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={editFormData.name}
                      onChange={handleEditChange}
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={editFormData.email}
                      onChange={handleEditChange}
                      required
                    />
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      value={editFormData.phone}
                      onChange={handleEditChange}
                      required
                    />
                    <input
                      type="file"
                      name="image"
                      onChange={handleEditFileChange}
                    />
                    <input
                      type="text"
                      name="position"
                      placeholder="Position"
                      value={editFormData.position}
                      onChange={handleEditChange}
                      required
                    />
                    <input
                      type="text"
                      name="id"
                      placeholder="ID"
                      value={editFormData.id}
                      onChange={handleEditChange}
                      required
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setIsEditing(null)}>
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(employee)}>Edit</button>
                    <button onClick={() => removeEmployee(employee.id)}>Remove</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
