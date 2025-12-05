### Coding marathon 3

### Contributions – Hathadura

### Overview

In Coding Marathon 3, my main responsibility was working on the **Backend API V2** part related to the **User** resource. I focused on creating the user model and the user controller, and I verified the behavior of the endpoints using Postman.

## Backend V2 Work

### 1. User Model

I implemented the **user model file** based on the given specification:

- Fields:
  - `name`
  - `username`
  - `password`
  - `phone_number`
  - `gender`
  - `date_of_birth`
  - `address.street`
  - `address.city`
    
  This makes the frontend and API responses cleaner and easier to use.

### 2. User Controller

I implemented the **user controller file** for API V2 to handle the **User-related endpoints**, including:
   - This controller is used by the API V2 routes responsible for user registration and login.

###  3. Testing With Postman

-  I tested the user-related endpoints using **Postman**:

- Sent example JSON bodies that match the user schema.
- Confirmed that:
  - New users can be created successfully.
  - Existing users can log in (depending on how the controller is implemented).
  - The API responds with the expected structure and status codes.
- Fixed issues based on Postman responses until the endpoints behaved correctly.

## Git & Branching

I followed the branching strategy required in the assignment:

  - Created two separate branches for my backend V2 work:
  - One for the user model-v2.
  - One for the user controller-v2.
  - Committed my changes with clear messages.
  - Kept the branches as part of the project history (none deleted), as required for evaluation.

## Summary

My main contribution to Coding Marathon 3 was implementing and testing the User model and User controller for API V2, and verifying their behavior using Postman. This work is an important part of enabling authentication for the application and supports the rest of the team in building the frontend and other backend features.
