import  { useState, useEffect } from 'react';
import Table from '../../components/Table';
import axios from 'axios';

interface Admin {
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  lastLogin: string;
  id: string;
}

interface TableColumn {
  header: string;
  accessor: string;
  type?: "button";
  buttonText?: string;
  buttonAction?: string;
}

const AdminDetails = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);

  // Define table columns for admin view
  const columns: TableColumn[] = [
    {
      header: "Admin Name",
      accessor: "name"
    },
    {
      header: "Email",
      accessor: "email"
    },
    {
      header: "Phone Number",
      accessor: "phoneNumber"
    },
    {
      header: "Created At",
      accessor: "createdAt"
    },
    {
      header: "Last Login",
      accessor: "lastLogin"
    },
    {
      header: "Manage",
      accessor: "actions",
      type: "button",
      buttonText: "Remove Admin",
      buttonAction: `${import.meta.env.VITE_API_URL}/api/admin/delete/` 
    }
  ];


  // Fetch admins from API with JWT token for authorization
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/getAllAdmins`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setAdmins(response.data.data); 
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Management</h2>
      <Table 
        columns={columns}
        data={admins}
        searchable={true}
      />
    </div>
  );
};

export default AdminDetails;
