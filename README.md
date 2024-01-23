npm notice 
npm notice New major version of npm available! 9.5.1 -> 10.1.0
npm notice Changelog: https://github.com/npm/cli/releases/tag/v10.1.0
npm notice Run npm install -g npm@10.1.0 to update!
npm notice 

# Collabo Web App
**Goal**: Collabo Web App is to help create more awareness and visiblity for the Code Collabo Community, projects and programs within it.

Work is ongoing in the following areas:
- UI/UX design
- Client development
- API development

#
**Progress:** Follow the development progress through the [Q2 Project Board](https://github.com/orgs/code-collabo/projects/1/views/6).
#

# Server and API

## Connection option 1: Running the development server (mongoDB Atlas)
#### Step 1
change directory into the server folder

#### Step 2
Install dependencies:
````
npm install
````

#### Step 3
- Ensure you have internet connection
- Have a monogDB atlas cluster set up in the cloud
- Get your atlas mongoDB uri string

#### Step 4
- Rename the `.env.example` file to `.env`
- Change `PORT_ATLAS` environment variable to your preferred port number in the .env file
- Add your atlas mongoDB uri string to the `MONGODB_ATLAS_URI` environment variable in the .env file

#### Step 5
Start the automated development server and choose ATLAS connection:
````
npm run dev
````

#### Step 5 (alternative)
You can also use the (manual) development server alternative for connection to mongoDB atlas:
````
npm run dev:atlas
````

## Connection option 2: Running the development server (mongoDB local)
#### Step 1
change directory into the server folder

#### Step 2
Install dependencies:
````
npm install
````

#### Step 3
- Have mongoDB installed and running on your computer
- Get your local mongoDB uri string

#### Step 4
- Rename the `.env.example` file to `.env`
- Change `PORT_LOCAL` environment variable to your preferred port number in the .env file
- Add your local mongoDB uri string to the `MONGODB_LOCAL_URI` environment variable in the .env file

#### Step 5
Start the automated development server and choose LOCAL connection:
````
npm run dev
````

#### Step 6 (alternative)
You can also use the (manual) development server alternative for connection to local mongoDB:
````
npm run dev:local
````

## Automated development server and commands
- `npm run dev` is the command that starts the automated development server. It prompts you to choose your preferred connection setup type the first time you use it, and saves the chosen connection setup type for every other time you come back to use it. It also automatically installs or set up the db and server files for the chosen connection setup type.
- `npm run dev:restore` resets the automated development server back to first time usage condition i.e. it removes your previously saved connection setup type and the development server will now assume that you are a first timer. After using this command, you will now have the option to set your preferred connection type again the next time you start the server with the `npm run dev` command.
- `npm run dev:change` is useful for when you are not a first time user and want to change your connection set up type without restoring the automated development server to first time usage condition. It will prompt you to choose your connection setup type, but it will not install the db and server files for the chosen connection setup type.

#

<br/>
<br/>

##  SOME THINGS TO TAKE NOTE OF:
- I sort of adjusted the response output style a bit.
- I also used the `document-save` style for creating and updating documents.
- I added a new folder in the server folder - sample_test_data - which contains some example data you can test with.
- A new folder named `types` which has the `index.d.ts` file was added to help add extra property to the express request body which can be used during authenticating users.
- due to the previous point, some commands in the package.json file were updated. more info on this can be found fron this [LINK](https://bobbyhadz.com/blog/typescript-property-does-not-exist-on-type-request) 
> I think this can be new features to be added to the api boilerplate as it will add basic setup for authentication and authorization
- Finally I've not been able to solve the error/exception handling matter yet and still on it.
<br/>


## API DESIGN (Basic Authentication Setup and Test)

<br/>

## User Authentication Summary

|METHOD /endpoint|Description|Request body|
|--|--|:--:|
|POST user/auth/signup|Create/register a new user|username, email, password, avatar|
|POST user/auth/signin|authenticate and signs in a registered user|email, password|
|GET /user/get-all|Get all users in the database (no authentication [i.e signing in] required)|No Request Body|
|GET /user/auth/get-profile|Gets a signed-in user profile (authentication requred) |No Request Body|
|PUT /user/auth/update-profile|allows a signed-in user to update all his/her profile properties (authentication requred)|username, email, password, avatar|
|PATCH /user/auth/update-profile-one|allows a signed-in user to update one of his/her profile properties (authentication requred)|propName, value|
|DELETE /user/delete/:userId|Delete a user from the database by ID (no auth is required)|No request body|
|DELETE /user/delete-all|Delete a user from the database by ID (no auth is required)|No request body|

<br/>


## User Authentication API call requests and responses

<details>
<summary>POST /user/auth/signup</summary>
<br/>
    <b>Request body shape</b>
    <br/><br/>
<pre>
{
  "username": "string",
  "email": "string",
  "password": "string",
  "avatar": "string" (not required)
}
</pre>
<br/>
     <b>Successful response shape</b>
    <br/><br/>
<pre>
{
    "success": boolean,
    "data": {
        "user": {
            "_id": "string",
            "username": "string",
            "email": "string",
            "role": "string",
            "avatar": "string",
            "createdAt": "string - date",
            "updatedAt": "string - date"
        },
        "token": "string"
    },
    "message": "string"
}
</pre>
</details>




<details>
<summary>POST /user/auth/signin</summary>
<br/>
    <b>Request body shape</b>
    <br/><br/>
<pre>
{
    "email": "string (required)", 
    "password": "string (required)"
}
</pre>
<br/>
     <b>Successful response shape</b>
    <br/><br/>
<pre>
{
    "success": string,
    "data": {
        "token": "string"
    },
    "message": "string"
}
</pre>
</details>



<details>
<summary>GET /user/get-all</summary>
<br/>
    <b>Request body shape</b>
    <br/><br/>
<pre>
No request body
</pre>
<br/>
     <b>Successful response shape</b>
    <br/><br/>
<pre>
{
    "success": boolean,
    "data": {
        "count": number,
        "users": [
            {
                "_id": "string",
                "username": "string",
                "email": "string",
                "role": "string",
                "avatar": "string",
                "createdAt": "string",
                "updatedAt": "string"
            }
        ]
    },
    "message": "string"
}
</pre>
</details>



<details>
<summary>GET /user/auth/get-profile</summary>
<br/>
    <b>Request body shape</b>
    <br/><br/>
<pre>
No request body
</pre>
<br/>
     <b>Successful response shape</b>
    <br/><br/>
<pre>
{
    "success": boolean,
    "data": {
        "user": {
            "_id": "string",
            "username": "string",
            "email": "string",
            "role": "string",
            "avatar": "string",
            "createdAt": "string",
            "updatedAt": "string"
        }
    },
    "message": "string"
}
</pre>
</details>


<details>
<summary>PUT /user/auth/update-profile</summary>
<br/>
    <b>Request body shape</b>
    <br/><br/>
<pre>
{
    "username": "string",
    "email": "string",
    "password": "string",
    "avatar": "string"
}
NOTE: no property can be ommited
</pre>
<br/>
     <b>Successful response shape</b>
    <br/><br/>
<pre>
{
    "success": boolean,
    "data": {
        "user": {
            "_id": "string",
            "username": "string",
            "email": "string",
            "role": "string",
            "avatar": "string",
            "createdAt": "string",
            "updatedAt": "string"
        }
    },
    "message": "string"
}
</pre>
</details>


<details>
<summary>PATCH /user/auth/update-profile-one</summary>
<br/>
    <b>Request body shape</b>
    <br/><br/>
<pre>
[
    { "propName": "string", "value": "string" }
]
</pre>
<br/>
     <b>Successful response shape</b>
    <br/><br/>
<pre>
{
    "success": boolean,
    "data": {
        "user": {
            "_id": "string",
            "username": "string",
            "email": "string",
            "role": "string",
            "avatar": "string",
            "createdAt": "string",
            "updatedAt": "string"
        }
    },
    "message": "string"
}
</pre>
</details>


<details>
<summary>DELETE /user/delete/:userId</summary>
<br/>
    <b>Request body shape</b>
    <br/><br/>
<pre>
No request body
</pre>
<br/>
     <b>Successful response shape</b>
    <br/><br/>
<pre>
{
    "success": boolean,
    "data": {},
    "message": "string"
}
</pre>
</details>


<details>
<summary>DELETE /user/delete-all</summary>
<br/>
    <b>Request body shape</b>
    <br/><br/>
<pre>
No request body
</pre>
<br/>
     <b>Successful response shape</b>
    <br/><br/>
<pre>
{
    "success": boolean,
    "data": {},
    "message": "string"
}
</pre>
</details>

</br>
<br/>
