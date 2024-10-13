import React, { useState, useEffect } from "react";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  // Fetch all users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/readalluser");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Create a new user
  const createUser = async () => {
    try {
      await axios.post("http://localhost:5000/createuser", newUser);
      fetchUsers(); // Refresh the users list
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Delete a user by ID
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      fetchUsers(); // Refresh the users list
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
   <div className="content">
     <div className="container">
      <h2 className="text-center my-5">User Crud Operation</h2>

     <form
        onSubmit={(e) => {
          e.preventDefault();
          createUser();
        }}
      >
        
        <div className="row justify-content-center">
            
        <div className="col-1 fw-bold"><label for="name">Name :</label></div>
        <div className="col-2">
        <input type="text" name="name" placeholder="Name" value={newUser.name} onChange={handleInputChange} required/>
        </div>

        <div className="col-1 fw-bold">
        <label for="email">Email :</label>
    </div>
    <div className="col-2">
    <input type="email" name="email" placeholder="Email" value={newUser.email}  onChange={handleInputChange} required />
    </div>
         
    </div> 

<div className="row my-5 justify-content-center">
    
<div className="col-1 fw-bold">
<label for="address">Address :</label>
</div>
    <div className="col-2">
      <input
          type="text"
          name="address"
          placeholder="Address"
          value={newUser.address}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="col-1 fw-bold">
<label for="address">Password :</label>
</div>
    <div className="col-2">
    <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleInputChange}
          required
        />
      </div>
</div>
    
        <div className="row text-center">
        <div className="col-12">
        <button className="btn btn-outline-dark px-4 border-radius-5" type="submit">Add User</button>
        </div>
        </div>


      


       
           
    
        
      </form>

     <div className="row justify-content-center mt-5">
     <table className="table table-striped table-hover">
  <thead className="table-dark">
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Address</th>
      <th>Password</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody className="text-start">
    {users.map((user) => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.address}</td>
        <td>{user.password}</td>
        <td>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteUser(user._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

     </div>
    </div>
   </div>
  );
};

export default UserTable;
