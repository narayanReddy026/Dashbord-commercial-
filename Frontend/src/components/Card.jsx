import React, { useState, useEffect } from "react";
import PersonForm from "./PersonForm";
const Card = () => {
  const [people, setPeople] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    email: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/myapp/person/");
      const data = await response.json();
      setPeople(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/myapp/person/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      setPeople([...people, data]);
      setFormData({ name: "", description: "", email: "" });
      setShowAddForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/myapp/person/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      setPeople(
        people.map((person) => (person.id === editingId ? data : person))
      );
      setShowEditForm(false);
      setEditingId(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      try {
        await fetch(`http://127.0.0.1:8000/myapp/person/${id}`, {
          method: "DELETE",
        });
        setPeople(people.filter((person) => person.id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const startEdit = (person) => {
    setEditingId(person.id);
    setFormData({
      name: person.name,
      description: person.description,
      email: person.email,
    });
    setShowEditForm(true);
  };

  const handleInputChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  return (
    <div className="p-4">
      {/* Add Person Button */}
      <button
        onClick={() => setShowAddForm(true)}
        className="mb-6 px-4 py-2 bg-purple-800 transform hover:scale-110 transition duration-300 text-white rounded"
      >
        Add Person
      </button>

      {/* Add Form Modal */}
      {showAddForm && (
        <PersonForm
          onSubmit={handleSubmit}
          title="Add Person"
          onClose={() => setShowAddForm(false)}
          onChange={handleInputChange}
          formData={formData}
        />
      )}

      {/* Edit Form Modal */}
      {showEditForm && (
        <PersonForm
          onSubmit={handleEdit}
          title="Edit Person"
          onClose={() => setShowEditForm(false)}
          onChange={handleInputChange}
          formData={formData}
        />
      )}

      {/* Person Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {people.map((person) => (
          <div key={person.id} className="border rounded-lg p-4 bg-purple-400">
            <div className="flex items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">{person.name}</h3>
                <p className="text-gray-600 font-medium">
                  {person.description}
                </p>
                <p className="text-gray-600 font-normal">{person.email}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => startEdit(person)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(person.id)}
                className="px-3 py-1 bg-red-400 hover:bg-red-700 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
