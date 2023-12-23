import React, { useEffect, useState } from "react";
import Modal from "./components/Modal";
import toast from "react-hot-toast";

interface User {
  username: string;
  email: string;
}

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<User>({
    username: "",
    email: "",
  });

  useEffect(() => {
    // Simulate fetching data from an API or database
    setLoading(true);
    setTimeout(() => {
      setUsers([
        { username: "John Doe", email: "john@example.com" },
        { username: "Jane Doe", email: "jane@example.com" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const showToast = (message: string) => {
    toast.success(message, { duration: 2000 });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (editClick && editIndex !== null) {
      await handleEditSubmit();
      showToast("User updated successfully!");
    } else {
      await handleAddSubmit();
      showToast("User added successfully!");
    }
    setLoading(false);
    closeModal();
  };

  const handleAddSubmit = async () => {
    // Simulate API call for adding user
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUsers([...users, data]);
    setData({ username: "", email: "" });
  };

  const handleEditSubmit = async () => {
    // Simulate API call for updating user
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const tempUsers = [...users];
    tempUsers[editIndex!] = data;
    setUsers(tempUsers);
    setEditClick(false);
    setEditIndex(null);
  };

  const handleDelete = async (index: number) => {
    setLoading(true);
    // Simulate API call for deleting user
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const filteredUsers = users.filter((_, i) => i !== index);
    setUsers(filteredUsers);
    showToast("User deleted successfully!");
    setLoading(false);
  };

  const handleEdit = (index: number) => {
    const tempData = users[index];
    setData(tempData);
    setEditClick(true);
    setEditIndex(index);
    openModal();
  };

  const renderTableRows = () => {
    return users.map((user, index) => (
      <tr
        key={index}
        className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"}
      >
        <td className="py-2 px-4">{user.username}</td>
        <td className="py-2 px-4">{user.email}</td>
        <td className="py-2 px-4 space-x-5">
          <button onClick={() => handleEdit(index)}>Edit</button>
          <button onClick={() => handleDelete(index)}>Delete</button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="mt-10">
      <button
        onClick={openModal}
        className="bg-rose-500 hover:bg-rose-600 px-9 py-2 rounded duration-300 select-none"
      >
        Add
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full table-auto mt-10">
          <thead>
            <tr className="bg-gray-800">
              <th className="py-2 px-4">Username</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      )}
      <Modal closeModal={closeModal} isOpen={isOpen}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={data.username}
              onChange={handleChange}
              required
              className="bg-transparent border rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              value={data.email}
              onChange={handleChange}
              className="bg-transparent border rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent mt-10 bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            {editClick ? "Edit" : " Add"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Home;
