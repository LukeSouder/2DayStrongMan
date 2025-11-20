# 2Day StrongMan

school project for web developement
This is a workout app made using MERN

1. Signup

```
curl -X POST http://localhost:3001/api/users/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"im@luke.souder","password":"password123"}'
```

```
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "im@luke.souder"
  }
}
```

2. Login

```
curl -X POST http://localhost:3001/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"im@luke.souder","password":"password123"}'
```

```
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "im@luke.souder"
  }
}
```

3. Get User by ID

```
curl http://localhost:3001/api/users/507f1f77bcf86cd799439011
```

```
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "im@luke.souder",
    "password": "password123"
  }
}
```

4. Get All Workouts for User

```
curl http://localhost:3001/api/workouts/user/507f1f77bcf86cd799439011
```

```
{
  "workouts": [
    {
      "_id": "507f191e810c19729de860ea",
      "userId": "507f1f77bcf86cd799439011",
      "dayNumber": 1,
      "exercises": [
        {
          "name": "Squat 4x8",
          "currentWeight": 45,
          "hasPassFail": true
        },
        {
          "name": "Bench Press 4x8",
          "currentWeight": 45,
          "hasPassFail": true
        },
        {
          "name": "Rows 3x12",
          "currentWeight": 45,
          "hasPassFail": true
        },
        {
          "name": "Pushups 3x15",
          "currentWeight": 45,
          "hasPassFail": true
        },
        {
          "name": "Abs 3x15",
          "currentWeight": null,
          "hasPassFail": false
        }
      ]
    },
    {
      "_id": "507f191e810c19729de860eb",
      "userId": "507f1f77bcf86cd799439011",
      "dayNumber": 2,
      "exercises": [
        {
          "name": "Squat 4x8",
          "currentWeight": 45,
          "hasPassFail": true
        },
        {
          "name": "Overhead Press 4x8",
          "currentWeight": 45,
          "hasPassFail": true
        },
        {
          "name": "Deadlift 3x5",
          "currentWeight": 95,
          "hasPassFail": true
        },
        {
          "name": "Chin-Ups 3x15",
          "currentWeight": 0,
          "hasPassFail": true
        },
        {
          "name": "Abs 3x15",
          "currentWeight": null,
          "hasPassFail": false
        }
      ]
    }
  ]
}
```

5. Get Specific Day Workout

```
curl http://localhost:3001/api/workouts/user/507f1f77bcf86cd799439011/day/1
```

```
{
  "workout": {
    "id": "507f191e810c19729de860ea",
    "_id": "507f191e810c19729de860ea",
    "userId": "507f1f77bcf86cd799439011",
    "dayNumber": 1,
    "exercises": [
      {
        "name": "Squat 4x8",
        "currentWeight": 45,
        "hasPassFail": true
      },
      {
        "name": "Bench Press 4x8",
        "currentWeight": 45,
        "hasPassFail": true
      },
      {
        "name": "Rows 3x12",
        "currentWeight": 45,
        "hasPassFail": true
      },
      {
        "name": "Pushups 3x15",
        "currentWeight": 45,
        "hasPassFail": true
      },
      {
        "name": "Abs 3x15",
        "currentWeight": null,
        "hasPassFail": false
      }
    ]
  }
}
```

6. Update Exercise Weight (Pass)

```
curl -X PUT http://localhost:3001/api/workouts/507f191e810c19729de860ea/exercise/Squat%204x8 \
  -H "Content-Type: application/json" \
  -d '{"passed":true}'
```

```
{
  "workout": {
    "_id": "507f191e810c19729de860ea",
    "userId": "507f1f77bcf86cd799439011",
    "dayNumber": 1,
    "exercises": [
      {
        "name": "Squat 4x8",
        "currentWeight": 50,
        "hasPassFail": true
      },
      {
        "name": "Bench Press 4x8",
        "currentWeight": 45,
        "hasPassFail": true
      },
      {
        "name": "Rows 3x12",
        "currentWeight": 45,
        "hasPassFail": true
      },
      {
        "name": "Pushups 3x15",
        "currentWeight": 45,
        "hasPassFail": true
      },
      {
        "name": "Abs 3x15",
        "currentWeight": null,
        "hasPassFail": false
      }
    ]
  }
}
```

7. Update Exercise Weight (Fail)

```
curl -X PUT http://localhost:3001/api/workouts/507f191e810c19729de860ea/exercise/Squat%204x8 \
  -H "Content-Type: application/json" \
  -d '{"passed":false}'
```

```
{
  "workout": {
    "_id": "507f191e810c19729de860ea",
    "userId": "507f1f77bcf86cd799439011",
    "dayNumber": 1,
    "exercises": [
      {
        "name": "Squat 4x8",
        "currentWeight": 40,
        "hasPassFail": true
      },
      {
        "name": "Bench Press 4x8",
        "currentWeight": 45,
        "hasPassFail": true
      },
      {
        "name": "Rows 3x12",
        "currentWeight": 45,
        "hasPassFail": true
      },
      {
        "name": "Pushups 3x15",
        "currentWeight": 45,
        "hasPassFail": true
      },
      {
        "name": "Abs 3x15",
        "currentWeight": null,
        "hasPassFail": false
      }
    ]
  }
}
```
