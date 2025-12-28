import { createContext, useContext, useState } from "react";

const EmployeeContext = createContext();

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployees must be used within an EmployeeProvider");
  }
  return context;
};

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Gopika",
      email: "gopika@example.com",
      role: "Software Engineer",
      department: "Engineering",
    },
    {
      id: 2,
      name: "Kichu",
      email: "kichu@example.com",
      role: "UI/UX Designer",
      department: "Design",
    },
    {
      id: 3,
      name: "Suvetha",
      email: "suvetha@example.com",
      role: "QA Engineer",
      department: "Quality Assurance",
    },
    {
      id: 4,
      name: "Kishore",
      email: "kishore@example.com",
      role: "Project Manager",
      department: "Management",
    },
    {
      id: 5,
      name: "Pooja",
      email: "pooja@example.com",
      role: "HR Executive",
      department: "HR",
    },
    {
      id: 6,
      name: "Dhanya",
      email: "dhanya@example.com",
      role: "Marketing Executive",
      department: "Marketing",
    },
  ]);

  const addEmployee = (employee) => {
    setEmployees([...employees, { ...employee, id: Date.now() }]);
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const getEmployeeById = (id) => {
    return employees.find((emp) => emp.id === id);
  };

  const value = {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};
