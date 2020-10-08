# Auth0 ♥️ Angular Workshop Code

## Workshop Overview
This workshop will follow 8 steps:

**Step 1:** Install the Auth0 SDK and create the application in Auth0.  
**Step 2:** Configure the SDK in the app.    
**Step 3:** Add a log in button.  
**Step 4:** Add a log out button.  
**Step 5:** Display profile information.  
**Step 6:** Protect the profile page with a guard.  
**Step 7:** Set up an API in Auth0 and configure the server and Angular app.  
**Step 8:** Call a protected endpoint using an `HttpInterceptor`.

Each step has a corresponding branch with the finished code for that step. If you get behind, you can always skip ahead by checking out the next branch. 

Feel free to [follow along with the slides](http://a0.to/angular-workshop-slides) as well.

*This workshop material was adapted from code and instructions created by [Dan Arias](https://auth0.com/blog/authors/dan-arias/). Thanks Dan!*

## About this App
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.7. It also includes a tiny Express server for testing a public and a protected endpoint.

To get started with the workshop, first run npm install:

```bash
npm install
```

The server relies on the existence of a `.env` file, so go ahead and make a copy of `.env.example` at the root of the project and remove `.example` from it. We'll update the values in it later.

You can then start both the client and server in development mode with one command:

```bash
npm start
```

## Sign up for Auth0
 If you haven't already, [sign up for a free Auth0 account](https://auth0.com/signup), which offers you:

* 7,000 [free active users and unlimited logins](https://auth0.com/pricing/).
* A [centralized, ready-to-ship login page](https://auth0.com/universal-login) for Web, iOS & Android.
* Up to 2 [social identity providers](https://auth0.com/docs/connections/identity-providers-social) like Google and Facebook login.
* Unlimited [serverless Rules](https://auth0.com/docs/rules/current) to customize and extend Auth0's capabilities.

During the sign-up process, you create something called an [Auth0 Tenant](https://auth0.com/docs/getting-started/the-basics#account-and-tenants), which is a container that Auth0 uses to store your identity service configuration and your users in isolation. No other Auth0 customer can peek into or access your tenant.

## For Step 1: Create the Client Application in Auth0
Once you sign in, Auth0 takes you to the [Dashboard](https://manage.auth0.com/), where you can manage and configure your identity services. In the left sidebar menu, click on ["Applications"](https://manage.auth0.com/#/applications).

Then, click the "Create Application" button. A modal opens up with a form to provide a name for the application and choose its type.

**Name:** Auth0 Angular Workshop  
**Application Type:** Single Page Web Applications

Click the "Create" button to complete the process. Your Auth0 application page loads up.

We need now need to help Angular and Auth0 communicate using configuration data from that page.

Click on the "Settings" tab of your Auth0 Application page and fill in the following values:

**Allowed Callback URL:** http://localhost:4200

After your users successfully log in, Auth0 can only redirect them to any of the URLs you list here.

**Allowed Logout URL:** http://localhost:4200

After your users log out, Auth0 can only redirect them to any of the URLs you list here.

**Allowed Web Origins:** http://localhost:4200

Using the Auth0 Angular SDK, your Angular application will make requests under the hood to an Auth0 URL to handle authentication requests. As such, you need to add your Angular application origin URL to avoid Cross-Origin Resource Sharing (CORS) issues.

Scroll down and click the "Save Changes" button.

Don't close this page yet as you'll need some of its information in the next section.

### Add the Auth0 configuration variables to Angular
From the Auth0 Application Settings page, you need the Auth0 Domain and Client ID values to allow your Angular application to use the communication bridge you just created.

The client uses the `auth_config.json` file. Duplicate `auth_config.json.example` and remove the `.example`. Replace the `domain` and `clientId` values for now. You'll replace the `audience` value in step 7 when we set up the API.

## For Step 7: Set up the API in Auth0
This process is similar to how you connected Angular with Auth0.

Head to [the APIs section in the Auth0 Dashboard](https://manage.auth0.com/#/apis), and hit the "Create API" button.

Then, in the form that Auth0 shows you can add a name and create an identifier. You can pick whatever you'd like or you can use these values:

**Name:** Angular Workshop API  
**Identifier:** https://angular-workshop-api  

Leave the signing algorithm as RS256 as it's the best option from a security standpoint.

Identifiers are unique strings that help Auth0 differentiate between your different APIs. We recommend using URLs to create unique identifiers predictably; however, Auth0 never calls these URLs.

With these values in place, hit the "Create" button.

### Add the Auth0 configuration variables to Express
Now, click on the "Quick Start" tab of your Auth0 API page. This page presents instructions on how to set up different APIs. From the code box, choose "Node.js". Keep this page open as you'll be using the values next.

The server config uses a `.env` file at the root of the project.

Head back to the "Node.js" code snippet from the Auth0 API "Quick Start" page. Locate the definition of `jwtCheck`:

```js
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://<TENANT-NAME>.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://angular-workshop-api", // 👈 AUTH0_AUDIENCE value
  issuer: "https://<TENANT-NAME>.auth0.com/", // 👈 AUTH0_ISSUER_URL value
  algorithms: ["RS256"],
});
```

Look at the object that the jwt function takes as an argument and use the following properties to complete the values of your `.env` file:

The value of `AUTH0_AUDIENCE` is the value of its `audience` property.

The value of `AUTH0_ISSUER` is the value of its `issuer` property.

Do not include the quotes, only the string value.

### Configure Angular to connect with the Express API
Head back to the `src` project directory that stores the Angular application.

Locate the `auth_config.json` file and replace the `audience` property with the same one you just added to the `.env` file for the Express server.

In the next steps of the workshop, you'll use those values in the `environment.ts` file and work on calling public and private endpoints.