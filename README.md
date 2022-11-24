# 🚀 React-Social

React-Social is a social network web application.

## 📝 Description

✴️ **User Accounts Can Do The Following:**

- Create a new user account.
- Sign in.
- Update their profile.
- Update their password.
- Request a password reset URL if they forgot the password.
- View paginated home feed that includes all posts written by users they are following.
- View their profile and other users' profiles.
- Write, edit, delete posts and comments. Adding images is allowed in posts.
- Like, unlike posts and comments.
- View post and comments were written on it.
- Follow, unfollow other users.
- View their following and followers lists.
- Search users by their names.
- View the suggested list of other users they may follow.

## 💎 Technologies

1. React (create-react-app)
2. CSS (css-modules)

## 🖼️ Screenshots

<img src="/screenshots/sign-up-page.png" alt="Sign up page" width="450"/>
<img src="/screenshots/forgot-password-page.png" alt="Forgot password page" width="450"/>
<img src="/screenshots/home-page.png" alt="Home page" width="450"/>
<img src="/screenshots/profile-page-1.png" alt="Profile page 1" width="450"/>
<img src="/screenshots/edit-profile-page.png" alt="Edit profile page" width="450"/>
<img src="/screenshots/post-page.png" alt="Post page" width="450"/>
<img src="/screenshots/profile-page-2.png" alt="Profile page 2" width="450"/>
<img src="/screenshots/followers-dialog.png" alt="Followers dialog" width="450"/>

## ⚙️ Installation

**Step 1:** Install dependencies.

```shell
npm install
```

**Step 2:** Start the server.

```shell
npm start
```

## 🚥 API Endpoints

### 1. Public Routes

| #   | HTTP Method | URL                                       | Controller     | Status |
| --- | ----------- | ----------------------------------------- | -------------- | ------ |
| 1   | `POST`      | `/api/v1/users/signup`                    | createOneUser  | ✅     |
| 2   | `POST`      | `/api/v1/users/signin`                    | authenUser     | ✅     |
| 3   | `POST`      | `/api/v1/users/forgotPassword`            | forgotPassword | ✅     |
| 4   | `PATCH`     | `/api/v1/users/resetPassword/:resetToken` | resetPassword  | ✅     |

### 2. Private Routes

Notes:

- `userId` refers to:

  - If `/:postId` comes last: the author of the post.
  - If `/:commentId` comes last: the author of the comment.

- For `post`, `patch`, and `delete` requests: `userId` has to be the logged-in user.

#### 2.1. UserId has to be the logged-in user

| #   | HTTP Method | URL                                                             | Controller        | Status |
| --- | ----------- | --------------------------------------------------------------- | ----------------- | ------ |
| 1   | `PATCH`     | `/api/v1/users/:userId`                                         | updateOneUser     | ✅     |
| 2   | `DELETE`    | `/api/v1/users/:userId`                                         | deleteOneUser     | ✅     |
| 3   | `PATCH`     | `/api/v1/users/:userId/updatePassword`                          | updatePassword    | ✅     |
| 4   | `PATCH`     | `/api/v1/users/:userId/follow/:followId`                        | followUser        | ✅     |
| 5   | `GET`       | `/api/v1/users/:userId/explore`                                 | exploreUsers      | ✅     |
| 6   | `POST`      | `/api/v1/users/:userId/posts`                                   | createOnePost     | ✅     |
| 7   | `PATCH`     | `/api/v1/users/:userId/posts/:postId`                           | updateOnePost     | ✅     |
| 8   | `DELETE`    | `/api/v1/users/:userId/posts/:postId`                           | deleteOnePost     | ✅     |
| 9   | `GET`       | `/api/v1/users/:userId/posts/home?skip=num&limit=num`           | requestHomeFeed   | ✅     |
| 10  | `POST`      | `/api/v1/users/:userId/posts/:postId/comments`                  | createOneComment  | ✅     |
| 11  | `PATCH`     | `/api/v1/users/:userId/posts/:postId/comments/:commentId`       | updateOneComment  | ✅     |
| 12  | `DELETE`    | `/api/v1/users/:userId/posts/:postId/comments/:commentId`       | deleteOneComment  | ✅     |
| 13  | `POST`      | `/api/v1/users/:userId/posts/:postId/likes`                     | createPostLike    | ✅     |
| 14  | `POST`      | `/api/v1/users/:userId/posts/:postId/comments/:commentId/likes` | createCommentLike | ✅     |

#### 2.2. UserId could be any user

| #   | HTTP Method | URL                                                               | Controller           | Status |
| --- | ----------- | ----------------------------------------------------------------- | -------------------- | ------ |
| 1   | `GET`       | `/api/v1/users/:userId`                                           | requestOneUser       | ✅     |
| 2   | `GET`       | `/api/v1/users/:userId/following`                                 | requestUserFollowing | ✅     |
| 3   | `GET`       | `/api/v1/users/:userId/followers`                                 | requestUserFollowers | ✅     |
| 4   | `GET`       | `/api/v1/users/search?name=string`                                | searchUsersByName    | ✅     |
| 5   | `GET`       | `/api/v1/users/:userId/posts?skip=num&limit=num`                  | requestAllPosts      | ✅     |
| 6   | `GET`       | `/api/v1/users/:userId/posts/:postId`                             | requestOnePost       | ✅     |
| 7   | `GET`       | `/api/v1/users/:userId/posts/:postId/comments?skip=num&limit=num` | requestAllComments   | ✅     |

### 3. Moderator Only Routes

| #   | HTTP Method | URL             | Controller      | Status |
| --- | ----------- | --------------- | --------------- | ------ |
| 1   | `GET`       | `/api/v1/users` | requestAllUsers |        |
