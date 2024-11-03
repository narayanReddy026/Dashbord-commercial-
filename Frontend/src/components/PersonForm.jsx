import React from "react";

const PersonForm = React.memo(
  ({ onSubmit, formData, onChange, title, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl mb-4">{title}</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              className="w-full border p-2 rounded"
              value={formData.name}
              onChange={(e) => onChange(e, "name")}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Description</label>
            <input
              className="w-full border p-2 rounded"
              value={formData.description}
              onChange={(e) => onChange(e, "description")}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              className="w-full border p-2 rounded"
              value={formData.email}
              onChange={(e) => onChange(e, "email")}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={onSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {title}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
);

export default PersonForm;
