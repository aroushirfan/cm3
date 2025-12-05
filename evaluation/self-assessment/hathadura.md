### Self-Assessment – Hathadura

### Overview

In this coding marathon, I focused on the **Backend API V2 user functionality**. Specifically, I implemented the **user model**, the **user controller**, and tested the user endpoints using **Postman**.

---

### What I Did Well

### 1. Implementing the User Model

I carefully followed the given schema for the user:

- Included all required fields (name, username, password, phone_number, gender, date_of_birth).
- Implemented the nested `address` object properly with `street`, `city`, and `zipCode`.


This shows I can read specifications and translate them into a correct Mongoose model.

### 2. Implementing the User Controller

I wrote the **user controller file** for handling user-related actions in API V2.  
This includes creating new users and handling login logic as required by the assignment. I tried to keep the code readable and organized.

### 3. Testing With Postman

I used **Postman** to:

- Send example request bodies that match the user schema.
- Confirm that the endpoints for user creation (and login, if implemented in the controller) behave as expected.
- Check success cases and adjust the code when something didn’t work as intended.

This helped me understand how the backend behaves from a real client perspective.

### 4. Following the Branching Strategy

I created **two separate branches** for my backend V2 work (one for the user model and one for the user controller).  
This follows the required Git workflow and keeps my changes well organized.


## Challenges I Faced

- Making sure the user schema matched the assignment exactly, especially with the nested 
- Making sure the request body I sent from Postman matched the schema, especially the date and nested object fields.
- Understanding how the controller should respond so that the frontend can later use the data correctly.

I overcame these by:
- Comparing my model with the specification.
- Trying different JSON bodies in Postman.
- Adjusting the controller logic based on the API responses.

## What I Learned

From this work, I learned:

- How to design a more complex Mongoose schema with nested objects.
- How to expose a virtual id field in toJSON to make API responses nicer.
- The importance of using branches to keep features separated and clean.


## Overall Reflection

I am satisfied with my contribution to the backend V2 part.  
Within my responsibility (user model + user controller + Postman testing), I did my best to follow the specification, keep the code clear, and verify that the endpoints work.
