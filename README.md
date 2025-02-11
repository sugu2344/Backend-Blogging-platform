





# Installation

- Install my-project with npm

## project-configurations

#### nodejs project creation

```bash
mkdir server.js

```
```bash
npm init

```

#### Packages to be installed

```bash
npm install body-parser
```
```bash
npm install express
```
```bash
npm install -D nodemon
```
```bash
npm install mongoose
```
```bash
npm install dotenv
```
```bash
npm install express
```
```bash
npm install bcrypt

```
```bash
npm install cors
```
```bash
npm i nodemailer
```
```bash
npm install jsonwebtoken
```
```bash
npm install morgan
```


## API Reference

#### login 

```http
https://backend-blogging-platform.onrender.com
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/user/register` | `post` | **Required** |
| `/user/authenticater` | `post` | **Required**|
| `/user/logout` | `get` | **Required** |
| `/user/profile` | `get` | **Required** |
| `/user/change` | `put` | **Required** |

#### admin dashboard count  

```http
https://backend-blogging-platform.onrender.com
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/user/usercount` | `get` | **Required** |
| `/comment/getTotalCommentCount` | `get` | **Required**|
| `/posts/count` | `get` | **Required** |

#### users 

```http
https://backend-blogging-platform.onrender.com
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/user/getallusers` | `get` | **Required** |
| `/subscription/getall` | `get` | **Required**|
| `/post/user/${userId}` | `get` | **Required** |
| `/subscription/subscribe` | `post` | **Required** |
| `/subscription/unsubscribe/${subscriptionId}` | `delete` | **Required** |
| `/post/user/${userId}` | `get` | **Required** |
| `/post/user/${userId}` | `get` | **Required** |

#### create blogs

```http
https://backend-blogging-platform.onrender.com
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/post/create` | `post` | **Required** |

#### profile

```http
https://backend-blogging-platform.onrender.com
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/post/getprofile` | `post` | **Required** |
| `/user/updateProfile` | `put` | **Required** |

#### post detail

```http
https://backend-blogging-platform.onrender.com
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/post/get/${postId}` | `get` | **Required** |

#### current user

```http
https://backend-blogging-platform.onrender.com
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/post/currentuser` | `get` | **Required** |

#### get all blogs

```http
https://backend-blogging-platform.onrender.com
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/user/profile` | `get` | **Required** |
| `/post/get` | `get` | **Required** |
| `/comment/getCommentsByPost/${post._id}` | `get` | **Required** |
| `/post/post/categories` | `get` | **Required** |
| `/comment/createComment` | `post` | **Required** |
| `/comment/getCommentsByPost/${postId}` | `get` | **Required** |
| `/post/delete/${postId}` | `delete` | **Required** |
| `/post/update/${postId}` | `put` | **Required** |
| `/comment/updateComment/${commentId}` | `put` | **Required** |
| `/comment/deleteComment/${commentId}` | `delete` | **Required** |










## Documentation

[Blogging-Platform.postman_collection.json](https://github.com/user-attachments/files/18747587/Blogging-Platform.postman_collection.json)



## Authors

- [@suganesh](https://github.com/sugu2344)


## Deployment-Url

https://backend-blogging-platform.onrender.com



