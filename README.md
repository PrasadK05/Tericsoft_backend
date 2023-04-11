
# BMI Calculator Server
It is a backend server BMI Calculator web application which is deployed on [Render.com]("https://dashboard.render.com/") 



## Tech Stack

**Server:** Node, Express, Mongoose, JWT, argone2

**Database:** MongoDB


## API Reference

#### Base URL

```http
   https://terisoft.onrender.com/
```

#### Signup api

```http
  POST /user/register
```

| body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**.  |
| `email` | `string` | **Required**.  |
| `password` | `string` | **Required**. |

Responses
```
status:200 (successful)
res={
    status:true,
    messege:"user created successfully"
    }

status:400 (unsuccessful) 
res={
    status:false,
    messege:"user already registered"
    }

res={
    status:false,
    messege:"something went wrong"
    }     
```

#### Login api

```http
  POST /user/login
```

| body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**.  |
| `password` | `string` | **Required**. |

Responses
```
status:200 (successful)
res={
    status:true,
    toekn:"andkfsafkp[@kfkfk255FFF",
    name:""XYZ
    }

status:400 (unsuccessful) 
res={
    status:false,
    messege:"Wrong Password"
    }

res={
    status:false,
    messege:"User not found"
    }     
```

#### Logout api

```http
  POST /user/logout
```

| body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**.  |


Responses
```
status:200 (successful)
res={
    status:true,
    messege: "User logout successfully"
    }

status:400 (unsuccessful) 
res={
    status:false,
    messege: "something went wrong"
    }
```    

#### Calculate BMI

```http
  POST /bmi/calculateBMI
```

| body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `weight` | `string` | **Required**.  |
| `height` | `string` | **Required**. |

| headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**.  |

Responses
```
status:200 (successful)
res={
    status:true,
    result:20.12
    }

status:400 (unsuccessful) 
res={
    status:false,
    messege: "Something went wrong"
    }

status:403 (unsuccessful) 
res={
    status:false,
    messagee: "Unauthorised"
    }

status:401 (unsuccessful) 
res="Operation not allowed."
```    

#### Past BMI Data

```http
  GET /bmi/getCalculationHistory
```

| headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**.  |

Responses
```
status:200 (successful)
res={
    status:true,
    result: [... resposes]
    }

status:400 (unsuccessful) 
res={
    status:false,
    messege: "Something went wrong"
    }

status:403 (unsuccessful) 
res={
    status:false,
    messagee: "Unauthorised"
    }

status:401 (unsuccessful) 
res="Operation not allowed."
```

#### Get Profile

```http
  GET /profile/getProfile
```

| headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**.  |

Responses
```
status:200 (successful)
res={
    status:true,
    result: {...users data}
    }

status:400 (unsuccessful) 
res={
    status:false,
    messege: "bad request"
    }

status:403 (unsuccessful) 
res={
    status:false,
    messagee: "Unauthorised"
    }

status:401 (unsuccessful) 
res="Operation not allowed."
```
## Run Locally

Clone the project

```bash
  git clone https://github.com/PrasadK05/Tericsoft_backend.git
```

Install dependencies

```bash
  npm install
```

Start the server for developement

```bash
  npm run dev
```

Start the server for production

```bash
  npm run start
```

## Related

Checkout our front end

[Frontend_Repo](https://github.com/PrasadK05/Terisoft_frontend)

[Deployed](https://scintillating-stardust-6ed049.netlify.app)

## Authors

- [Prasad Karde](https://github.com/PrasadK05)

