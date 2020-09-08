### Data Schema

firestore collections `users`

```
user.uid = {
  access: number,
  email: string,
  profileUrl: string,
  displayName: string,
  quotes: string,
  githubUrl: string,
}
```

state

```
userData = {
  uid: number,
  access: number,
  email: string,
  profileUrl: string,
  displayName: string,
  quotes: string,
  githubUrl: string,
}
```

### Features

- [x] Public Routes
  - [x] Login System
  - [ ] Home `list all of students' profile`, `cancelled, only authenticated users can access the db`
- [x] Admin Routes
  - [x] Home `user's profile`, can edit.
  - [ ] Register new student's, `cancelled, student can self-register from the public routes`
  - [x] Edit student's profile
- [x] Student Routes
  - [x] Home `user's profile`, can edit.

### Requirements

- [x] Only use LocalStorage in 1 class / 1 function.
- [x] Pass data only with state & props.
