# double-app

This Meteor example was built to illustrate how you can run two (or more) apps with the same code base.

Why would you want to do something like this? Well, if your app is suffering trying to handle your connections, and your jobs on the background, this could help you a lot.


With some simple changes you could have an app that handles the Client side, another to handle the jobs, and maybe another to handle heavy methods triggered by a user.

The cool part is that you use the same code, database, and integrations without having too much work.

## What these apps do

The idea behind these apps is pretty simple. I have two apps, [double-app](https://double-app.meteorapp.com/) and [api.double-app](https://api.double-app.meteorapp.com/). 
The first app is my UI where anyone who is connect to it can se the astronaut moving around from time to time by reading its coordinates from the database. 

My second app is responsible for updating the coordinates in the database from time to time.

## How it's done


### Settings

Let's start with my settings. You probably already know that you can have different settings files for different environments, but you can also have different settings for the same environment, and this is basically what will define my different apps on production, for example.

If you look [here](https://github.com/denihs/double-app/tree/master/private/env/) you'll see that I have two settings files, one called settings.json and another one called api-settings.json.

And here is the code inside of each one:

- settings.json
``` json
{
  "public": {
    "environment": "PRODUCTION"
  }
}
```

- api-settings.json
``` json

{
  "public": {
    "environment": "PRODUCTION",
    "isAPIModule": true
  }
}
```

The only difference between them is that on the api-settings.json I have the prop `isAPIModule` and I will use this value is certainty parts of my code to decide if run or not a code.

Also, it's important to notice that I'm using the `isAPIModule` value inside my `public` object. This is important because you probably will need to check this value on the client side, and Meteor don't provide any settings to the client side unless it's inside the `public` object.


### Deploying apps

Now that you have different settings, you can deploy different apps. The apps from this example are deployed on Galaxy.

You can find the command that I'm using [here](https://github.com/denihs/double-app/tree/master/private/env/prod). But they are pretty straightforward.

Command line to deploy the UI app:

```
DEPLOY_HOSTNAME=us-east-1.galaxy-deploy.meteor.com meteor deploy double-app.meteorapp.com --settings settings.json --mongo
```

Command line to deploy the API app:

```
DEPLOY_HOSTNAME=us-east-1.galaxy-deploy.meteor.com meteor deploy api.double-app.meteorapp.com --settings api-settings.json
```

And there you have it, two apps deployed with the same codebase. But it's not done yet. We need to apply this to our code to everything work properly.

### Splitting the content

Everything is basically done, now it comes the easy part, divide the code between API and UI.

[Here](https://github.com/denihs/double-app/blob/master/imports/api/apiModuleCommon.js) I have a helper that helps me to know if the app is the UI or the API.

I'm currently using this function in two places. The first one is on my [cron file](https://github.com/denihs/double-app/blob/master/imports/api/cron.js). In this part of the code I can decide if I should or not run my crons:

``` js
  if (!isAPIModule()) {
    console.warn('** APP: SyncedCron are not started on www instance **');
    console.timeEnd('cron');
    return;
  }
```

And now, just API app can change the coordinates in the database.

The second place is on the [UI](https://github.com/denihs/double-app/blob/master/imports/ui/AppContainer.js):

``` js
import React from 'react';
import { isAPIModule } from '../api/apiModuleCommon';
import { App } from './App';

export const AppContainer = () => {
  if (isAPIModule()) {
    return <div>This is the API</div>;
  }
  return <App />;
};
```

So when you access the [double-app](https://double-app.meteorapp.com/) or [api.double-app](https://api.double-app.meteorapp.com/), you will see different UIs. Honestly this code could be better. For example, you could use [React.lazy](https://reactjs.org/docs/code-splitting.html#reactlazy) to lazy render the module `App` avoiding to load more code than you need. But I'm pretty sure you get the idea here ;).

And as you may notice, I'm using the same database when [updating the coordinates](https://github.com/denihs/double-app/blob/64ff325b3d1ef8f6de0bff757a5c36cbd308dbad/imports/api/PositionsCollection.js#L4) and [reading the coordinates](https://github.com/denihs/double-app/blob/64ff325b3d1ef8f6de0bff757a5c36cbd308dbad/imports/ui/App.js#L36) because again: it's the same codebase. And this should make your life a lot easier.

----

> It's not recommended to store settings with secrets in your GitHub repository, we did this here to make easier to you to understand the example.
