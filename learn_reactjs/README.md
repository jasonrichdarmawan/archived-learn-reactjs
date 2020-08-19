# Task Lists

- [x] Login
- [x] List of Employees
- [x] List of Departments
- [x] Search Widget
    Scope: search from name
    ```
    // type: "employeeList" return employee_primary, "departmentList" return department_primary
    search(type, searchKey, searchValue);

    function search(searchKey, searchValue) {
        for (let i = 0; i < department_primary.length; i++) {
            // department_primary[i][searchKey] is a method to access properties of an object. It's not an Array of Arrays.
            if (department_primary[i][searchKey] === searchValue) {
            return department_primary[i]
            } 
        }
    }
    ```
- [x] View Employee
- [x] View Department
- [x] Add New Employee
    ```
    employee_primary = [
        {
            id: "",
            name: ""
        }
    ];

    // primary_id equals to array[index]
    employee_info = [
        {},
        {}
    ];

    {
        primary_id: "",
        nationalIDNumber: "",
        // YYYY-MM--DD
        birthDate: "",

        // String
        nationality: "",

        // 0 = male, 1 = female
        gender: "",

        address: "",

        // TODO: tax formula table
        tax: {
            idNumber: "",

            // "" === tax handled by employee
            status: ""
        },
        // "" === indifinite
        validityDate: "",

        // String
        extra: {
            religion: "",
            maritalStatus: "",
            education: ""
        }
    }
    ```
- [x] Add New Department
    ```
    department_primary = [
        {
            id: "",
            name: ""
        }
    ];

    // primary_id equals to array[index]
    department_info = [
        {},
        {}
    ];

    {
        primary_id: "",
        // "[1,2,3]"
        employeeList: "[]",
    }
    ```
- [x] Assign Employees to a Department