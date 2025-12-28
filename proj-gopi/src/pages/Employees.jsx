import { useState } from "react";
import { useEmployees } from "../contexts/EmployeeContext";

const Employees = () => {
  const { employees, addEmployee, updateEmployee, deleteEmployee } =
    useEmployees();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const initialState = {
    id: null,
    name: "",
    email: "",
    role: "",
    department: "",
  };
  const [currentEmployee, setCurrentEmployee] = useState(initialState);

  const handleOpen = () => {
    setEditMode(false);
    setCurrentEmployee(initialState);
    setOpen(true);
  };

  const handleEdit = (employee) => {
    setEditMode(true);
    setCurrentEmployee(employee);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentEmployee(initialState);
  };

  const handleSubmit = () => {
    const { name, email, role, department } = currentEmployee;
    if (!name || !email || !role || !department)
      return alert("Please fill in all fields");
    editMode ? updateEmployee(currentEmployee) : addEmployee(currentEmployee);
    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      deleteEmployee(id);
    }
  };

  const filteredEmployees = employees.filter((e) =>
    `${e.name} ${e.email} ${e.role} ${e.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Employee Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your team members and their information
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleOpen}>
          Add Employee
        </button>
      </div>

      <div className="card">
        <div className="mb-6">
          <input
            className="input max-w-md"
            placeholder="Search employees by name, email, role, or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td
                    className="px-6 py-12 text-center text-gray-500"
                    colSpan={5}
                  >
                    <div className="font-medium">No employees found</div>
                    <div className="text-sm mt-1">
                      {search
                        ? "Try adjusting your search"
                        : "Add your first employee to get started"}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#5b47db] text-white flex items-center justify-center font-semibold flex-shrink-0">
                          {e.name?.charAt(0) || "E"}
                        </div>
                        <span className="font-medium text-gray-900">
                          {e.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {e.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {e.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {e.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-3">
                        <button
                          className="px-4 py-2 bg-[#5b47db] text-white text-sm font-medium rounded-lg hover:bg-[#4a38ca] transition-all shadow-sm hover:shadow-md"
                          onClick={() => handleEdit(e)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-all shadow-sm hover:shadow-md"
                          onClick={() => handleDelete(e.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editMode ? "Edit Employee" : "Add New Employee"}
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  className="input"
                  placeholder="John Doe"
                  value={currentEmployee.name}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  className="input"
                  placeholder="john@example.com"
                  type="email"
                  value={currentEmployee.email}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <input
                  className="input"
                  placeholder="Software Engineer"
                  value={currentEmployee.role}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      role: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <input
                  className="input"
                  placeholder="Engineering"
                  value={currentEmployee.department}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      department: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button className="btn btn-outline" onClick={handleClose}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                {editMode ? "Update Employee" : "Add Employee"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
