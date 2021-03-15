# double-app

This Meteor example was biult to ilustrate how you can run two (or more) apps with the same code base.

Why would you want to do something like this? Well, if your app is suffering trying to handle your connections and your methods on the background, this could help you a lot.


If some simple changes you can an app that handles the Client side, another to handle the jobs, and maybe another to handle heavy methods triggered by a user.

The cool part is that you use the same code, database, connection and integrations without having to much work.

## What this app does

The idea behind these apps is pretty simple. I have two apps, [double-app](https://double-app.meteorapp.com/) and [api.double-app](https://api.double-app.meteorapp.com/). 
The first app is my UI were anyone who is connect to it can se the astronaut moving around from time to time by reading its coordinates from the database. 

My second app is responsable for updating the coordinates in the database from time to time.

## How it's done


### Settings

Let's start with my settings. You can already must that you can have different settings files for different environments, but you can also have different settings for the same environment, and this is basically what will define my diffent apps.

If you look [here](https://github.com/denihs/double-app/tree/master/private/env/) you'll see that I have two settings files, one called settings.json and another one called api-settings.json.

And here is the code inse of each one:

- settings.json
```
{
  "public": {
    "environment": "DEV"
  }
}
```

- api-settings.json
```
settings.json

{
  "public": {
    "environment": "DEV",
    "isAPIModule": true
  }
}
```

The only difference between them is that on the api-settings.json I have the prop `isAPIModule` and I will use this value is certainty parts of my code to decide if run or not a code.

Also it's important to notice that I'm using the `isAPIModule` value inside my `public` object. This is important because you probably will need to check this value on the client side, and Meteor don't provide any settings to the client side unless it's insede the `public` object.
