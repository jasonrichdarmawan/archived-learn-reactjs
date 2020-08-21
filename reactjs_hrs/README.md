This branch is a refactored code for branch [`hrs-mockup`](https://github.com/kidfrom/bc_g2_learn_reactjs/tree/hrs-mockup/learn_reactjs) with BLoC pattern.

This is a private repository used for learning and not intended for public consumption. The project is not intended for production.

# Usage

Store employee information.

# Task Lists

- [x] Data Schema

    Data is stored as JSON in array.
    ```
    data = [
        {
            id: "",
            fk_id: "",
        },
        {
            id: "",
            fk_id: ""
        }
    ];
    ```

    An employee can work in one or more than one department.
    ```
    employees = [
        {
            id: "",
            departments_id: "[]"
        },
        {
            id: "",
            departments_id: "[]"
        }
    ];
    departments = [
        {
            id: "",
            employees_id: "[]"
        },
        {
            id: "",
            employees_id: "[]"
        }
    ];
    ```

    Where to store private information?
    ```
    employees_information = [
        {
            employees_id: "",
            key: value
        },
        {
            employees_id: ""
            key: value
        }
    ];
    departments_information = [
        {
            departments_id: "",
            key: value
        },
        {
            deparments_id: ""
            key: value
        }
    ];
    ```
- [ ] Login
- [ ] Employees List
- [ ] Departments List
- [ ] View Employee Information
- [ ] View Department Information