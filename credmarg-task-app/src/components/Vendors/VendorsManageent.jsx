// components/UserManagementPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';

function VendorsManageent() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    // Fetch users data when the component mounts
    fetchAllEmployees();
  }, []);

  const fetchAllEmployees = async () => {
    try {

      const token = localStorage.getItem('token'); 
      const response = await UserService.getAllVendors(token);
        console.log(response.vendorList);
        if(response.vendorList==null){
          setVendors([]);
        }else{
          setVendors(response.vendorList);
        }
       
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const sendEmails = async () => {

    const token = localStorage.getItem('token'); 

    try {
      await UserService.sendEmailsToVendor(token,vendors);
      alert("Email Sent to Vendor");
    } catch (error) {
      alert(error);
    }
    
 
  }


  

  return (
    <div className="user-management-container">
      <h2>Vendors</h2>
      <div className='gridg'>
      <button className='reg-button'> <Link to="/admin/addVendor">Add Vendor</Link></button>
      <button className='reg-button' onClick={sendEmails}>Send Emais to Vendors</button>
      </div>
    
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
           
            
            <th>UPI</th>
            
          </tr>
        </thead>
        <tbody>
          { vendors.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.upi}</td>
            
              
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VendorsManageent;
