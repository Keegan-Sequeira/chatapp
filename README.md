# ChatLink
Assignment for 3813ICT Software Frameworks. Developed by Keegan Sequeira (s5254954).
## Git Repository
The version control for this project uses Git. GitHub is also used to keep a copy of the project remotely. As both a personal and lab computer is being used to develop this project, it is important for the Git repository to be kept in a neat and logical way. While working on the project there were many commits being made, mainly after any moderate change is made, if everything works well, the source code will be committed and pushed to GitHub. As this project involves both the Angular frontend, and Node backend, The backend source code is in a directory within the Angular project, this makes it easier to keep all the files in one repository. Branching is being used when there is a major change taking place, which may only be finished after multiple commits. Once the change has been successfully made, the branch will be merged back with main and closed.
## Data Structures
For submission one, there is no database being used. To store data and create a persistent application, JSON files are being used. The data being stored in these JSON files are arrays of objects, the objects in each file all follow the same data model to keep it consistent. The backend Express API reads and writes to these JSON files when there is a HTTP request. The application uses the following data models:
| Class | Variables |
|--|--|
| User | id: number<br>username: string<br>password: string<br>email: string<br>roles: string[]<br>groups: number[] |
| Group | id: number<br>name: string<br>channels: string[] |
## Angular Architecture
An Angular application is built using components, services, and routes instead of standard HTML and JavaScript. This Angular application consists of the following components:

 - Home: Displays the home page of the application.
 - Login: Displays the login page of the application. Sends HTTP request to validate user login and adds data to local storage.
 - Signup: Displays the signup page. Sends HTTP request to create a new user and adds data to local storage.
 - Logout: Clears data in local storage and redirects user to home page.
 - Group Manager: Displays a list of groups the logged in user is able to manage.
 - Group Page: Allows the user to manage the selected group. On this page the user can add and delete channels, and add and remove users from the group.
 - User Manager: Allows the logged in super admin to promote users to group admins, and group admins to super admins.
 - Chat: Displays the main page where the user can chat in the selected channel.
 - Channels: Allows the user to select a channel to join after joining the group.

The following services are used in this Angular application:

 - API Service: Used by the componenets to send HTTP requests to the Node server.

The Angular router component is used to route the user to different components of the application. The application has the following routes:

 - "/" &rarr; Home Component
 - "/login" &rarr; Login Component
 - "/signup" &rarr; Signup Component
 - "/logout" &rarr; Logout Component
 - "/manage/groups" &rarr; Group Manager Component
 - "/manage/group/:id" &rarr; Group Component
 - "/manage/users" &rarr; User Manager Component
 - "/chat" &rarr; Chat Component

## Node Server Architecture
The NodeJS server uses Express as a minimal API, the express server takes requests from the Angular application and provides (will also modify for submission 2) data when an end point is requested. The Node server allows for Cross Origin Resource Sharing by using the [CORS](https://www.npmjs.com/package/cors) module as middleware. As first submission does not use a database, the JSON data is stored within the server directory for easy access for the Express server. Each function that is called by the Express API is exported from it's separated JS file in order to keep the code more clean and minimal. There are not many global variables stored within any of the JS files except for the port number and the exported files.
### Express Routes/Endpoints
 **1. "/api/auth/login" POST**
    
 This route is used to authenticate a user. The Node server will check the data submitted in the POST request and return an object with the user information if valid, else it will return invalid.
 ```
 Parameters: 
	- username: string
	- password: string
Returns:
	// If Valid:
	response = {
		valid:  boolean,
		username:  string,
		email:  string,
		id:  number,
		groups:  number[],
		roles:  string[]
	};
```

 **2. "/api/signup" POST**

This route is used to create a new user. The server will first check if there is an existing username. If not the account will be created successfully and return the user data.
```
Parameters:
  - email: string
  - username: string
  - password: string
Returns:
  // If username already exists:
  response = { valid: boolean };
  // If username is unique:
	response = {
		valid:  boolean,
		username:  string,
		email:  string,
		id:  number,
		groups:  number[],
		roles:  string[]
	};
```

**3. "/api/user/info" POST**

This route is used to return an object containing user data of a given user.
```
Parameters:
  - id: number
Returns:
	response = {
		valid:  boolean,
		username:  string,
		email:  string,
		id:  number,
		groups:  number[],
		roles:  string[]
	};
```

**4. "/api/user/groups" POST**

This route returns a list of group objects for a given list of groups.
```
Parameters:
  - groups: number[]
Returns:
  response = { groups: object[] };
```

**5. "/api/groups/create" POST**

This route allows the creation of a new group on a new request. The function adds a new group to the groups JSON file, and also updates the groups array for the super admins and the creator to ensure they have access to the group.
```
Parameters:
  - name: string
  - user: number
Returns:
  response = { successful: boolean };
```

**6. "/api/groups/info" POST**

This route sends all the data for a given group.
```
Parameters:
  - groupID: number
Returns:
  response = {
    id: number,
    name: string,
    channels: string[]
  };
```

**7. "/api/groups/channel/create" POST**

This route allows the creation of a new channel within a group.
```
Parameters:
  - name: string
  - groupID: number
Returns:
  response = { successful: boolean };
```

**8. "/api/groups/channel/delete" POST**

This route allows the deletion of a channel of a group.
```
Parameters:
  - name: string
  - groupID: number
Returns:
  response = { successful: boolean };
```

**9. "/api/user/list" GET**

This route returns a list of all users with the system.

```
Parameters:
  null
Returns:
  response = {
    GA: object[],
    US: object[]
  }
```

**10. "/api/user/promote" POST**

This route allows a super admin to promote a user to a group admin or a group admin to a super admin. The route also allows for demotions of group admins to users.

```
Parameters:
  - userID: number
  - rank: string
Returns:
  response = { successful: boolean };
```

**11. "/api/groups/getusers" POST**

This route gets all users that have and don't have to a specific group.

```
Parameters:
  - groupID: number
Returns:
  response = {
    in: string[],
    out: string[]
  }
```

**12. "/api/groups/removeuser" POST**

This route removes a user's access to a specific group.

```
Parameters:
  - username: string
  - groupID: number
Returns:
  response = { successful: boolean };
```

**13. "/api/groups/adduser" POST**

This route gives a user access to a specific group.

```
Parameters:
  - username: string
  - groupID: number
Returns:
  response = { successful: boolean };
```

## Interaction Between Client and Server
There will be an interaction between the client sided Angular app, and the Node server whenever there needs to be an exchange of information. If the Angular app needs to verify data, get data, or modify data, the client will send a HTTP request to the Node server which will appropriately fulfill the request.

For Example:

![Imgur](https://i.imgur.com/giPp6A0.png)
