### Features

- [ ] Login `/login`
- [ ] HRD Dashboard `/app`
  - [ ] Add Employee + handler + password `/app/add/employee`
  - [ ] Add Department `/app/add/department`
  - [ ] List Employee `/app/list/employee`
  - [ ] List Department `/app/list/department`
  - [ ] Employee Information `/app/list/employee/:id`
  - [ ] Department Information `/app/list/department/:id`
  - [ ] Employee Placement `/app/placement` -> `/app/placement/:id` id is department_id
- [ ] Employee Dashboard
  - [ ] Employee Information `/app`
  - [ ] Department Information `/app`

### Documentation: React patterns

Refenrece: https://reactpatterns.com/

- Destructuring

  - Destructuring restProps

    ```
    components/atoms/Greeting/index.js
    import React from "react"
    export const Greeting = ({ name, ...restProps }) => (
      <div {...restProps}>{name}</div>
    )

    components/...
    import { Greeting } from ...

    const Greeting = () => (
      <Greeting name="Fancy Pants" className="fancy-greeting" id="user-greeting" />
    )
    ```

  - Destructuring children

    ```
    components/atoms/Button/index.js
    import React from "react"
    export const Button = ({ children, ...props }) => (
      <button {...props}>{children}</button>
    )

    components/...
    import { Button } from ...

    const Button = () => (
      <Button className="mt-3">Login</Button>
    )
    ```

  - Merge destructured props

    ```
    ...
    export const MyButton = ({className, ...props}) => {
      // let classNames = ["btn", className].join(" ");

      // filter out falsy values
      // better approach: https://www.npmjs.com/package/classnames
      let classNames = ["btn", className].filter(Boolean).join(" ").trim();

      return <button className={classNames} {...props}>
    }
    ```

  - Destructuring array of objects

    ```
    const arrayOfMessageObjects = [
      {
        id: number,
        ...
      }
    ]

    <ul>
      {arrayOfMessageObjects.map(({ id, ...messsage}) => (
        <Message key={id} {...message} />
      ))}
    </ul>
    ```
