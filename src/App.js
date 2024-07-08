import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import './App.css'; // Import the CSS for styling

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/employees');
      setEmployees(response.data);
      localStorage.setItem('employees', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const addEmployee = async (employee) => {
    try {
      const response = await axios.post('http://localhost:5000/employees', employee);
      const newEmployees = [...employees, response.data];
      setEmployees(newEmployees);
      localStorage.setItem('employees', JSON.stringify(newEmployees));
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const updateEmployee = async (updatedEmployee) => {
    try {
      const response = await axios.put(`http://localhost:5000/employees/${updatedEmployee.id}`, updatedEmployee);
      const newEmployees = employees.map((employee) => (employee.id === updatedEmployee.id ? response.data : employee));
      setEmployees(newEmployees);
      localStorage.setItem('employees', JSON.stringify(newEmployees));
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const removeEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/employees/${id}`);
      const newEmployees = employees.filter((employee) => employee.id !== id);
      setEmployees(newEmployees);
      localStorage.setItem('employees', JSON.stringify(newEmployees));
    } catch (error) {
      console.error('Error removing employee:', error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchButtonClick = () => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    const filteredEmployees = storedEmployees.filter((employee) =>
      employee.id.toLowerCase().includes(search.toLowerCase())
    );
    setEmployees(filteredEmployees);
  };

  return (
    <div className="App">
      <h1>Employee Registration Application</h1>
      <input
        type="text"
        placeholder="Search by ID"
        value={search}
        onChange={handleSearch}
      />
      <button onClick={handleSearchButtonClick}>Search</button>
      <EmployeeForm addEmployee={addEmployee} />
      <EmployeeList
        employees={employees}
        updateEmployee={updateEmployee}
        removeEmployee={removeEmployee}
      />
    </div>
  );
};

export default App;
