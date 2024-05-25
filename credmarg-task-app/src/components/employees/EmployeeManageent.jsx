// components/UserManagementPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';

function EmployeeManageent() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch users data when the component mounts
    fetchAllEmployees();
  }, []);

  const fetchAllEmployees = async () => {
    try {

      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await UserService.getAllEmployees(token);
      //   console.log(response);
      setEmployees(response.employees); // Assuming the list of users is under the key 'ourUsersList'
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  // const deleteUser = async (userId) => {
  //   try {
  //     // Prompt for confirmation before deleting the user
  //     const confirmDelete = window.confirm('Are you sure you want to delete this user?');

  //     const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  //     if (confirmDelete) {
  //       await UserService.deleteUser(userId, token);
  //       // After deleting the user, fetch the updated list of users
  //       fetchUsers();
  //     }
  //   } catch (error) {
  //     console.error('Error deleting user:', error);
  //   }
  // };

  return (
    <div className="user-management-container">
      <h2>Employees</h2>
      <button className='reg-button'> <Link to="/admin/addEmployee">Add Employee</Link></button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            
            <th>Designation</th>
            <th>CTC</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.designation}</td>
              <td>{user.ctc}</td>
              {/* <td>
                <button className='delete-button' onClick={() => deleteUser(user.id)}>Delete</button>
                <button><Link to={`/update-user/${user.id}`}>
                  Update
                </Link>
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeManageent;
