# Introduction
This Github Project takes the awesome ["Advanced React Example"](https://codesandbox.io/s/fhir-client-react-react-router-context-0q3n8)
 found at the [client-js](https://github.com/smart-on-fhir/client-js) project and extends it in the following ways.

1.  Move the code from the codepensandbox into a stand alone app created via create-react-app and managed with yarn
2.  Extends it to work with multiple servers both open and authenticated.
    1.  Additional servers or patients can be added by extending the config.json file
3.  Upgrades the client-js library to the latest

# Test using the Public Servers

### Step 1

    cp .env .env.local

### Step 2
Start this example app

```shell script
yarn start
```

### Step 3
Open your browser to this example app at `http://localhost:9000` and choose 'smarthealthit' from the pulldown

### Step 4
Open your browser to this example app at `http://localhost:9000` and choose 'publicHapiServer' from the pulldown

# Run Open Servers Locally

## localHapiServer

### Step 1

Run the HAPI server locally (see also https://hub.docker.com/r/smartonfhir/hapi and https://github.com/smart-on-fhir/hapi)
```shell script
docker run -p 8000:8080 smartonfhir/hapi:r2-smart
# .. go get coffee
```

### Step 2
Open your browser to this example app at `http://localhost:9000` and choose 'localHapiServer' from the pulldown

## smartdev

### Step 1

Run the smartdev stack locally (see also https://github.com/smart-on-fhir/smart-dev-sandbox)
```shell script
git clone https://github.com/smart-on-fhir/smart-dev-sandbox.git
cd smart-dev-sandbox 
docker-compose up
# .. go to lunch
```

### Step 2
Open your browser to this example app at `http://localhost:9000` and choose 'smartdev' from the pulldown

# Using Cerner and Epic sandboxes

See `src/config.json` for the JSON configuration per site that is read by this application to populate the selector 
you see when you first browse to this example app.  The Cerner and Epic examples need a little extra configuration 
before they will work correctly.

## Cerner

### Step 1
Create your Cerner Sandbox account at the [Cerner Developer Console][7]

### Step 2
Create an App and Set the redirect URI to `http://localhost:9000/redirect`

### Step 3
Set your APP ID in .env.local you created above

```
REACT_APP_CLIENT_ID_cerner=<Your APP ID>
```

### Step 4
Open your browser to this example app at `http://localhost:9000` and choose cerner from the pulldown

### Step 5
Login in to the Cerner Sandbox with a sample patient

    Sample User: timmysmart
    Password: Cerner01

>**NOTE:** The cerner sample account does not have chart-able observation data
>so you will only see the patient banner after you are redirected back to the app

## Epic

### Step 1
Create your Epic Sandbox account at the [Epic Developer Console][8]

### Step 2
Create an App and Set the redirect URI to `http://localhost:9000/redirect`

>**IMPORTANT:** When creating a new app or any time you change the redirect URI with Epic, 
>you must wait until the next day for the changes to take effect (on occasion even longer..)

### Step 3
Set your APP ID in .env.local you created above

```
REACT_APP_CLIENT_ID_epic=<Your APP ID>
```

### Step 4
Open your browser to this example app at `http://localhost:9000` and choose 'epic' from the pulldown

### Step 5
Login in to the Epic Sandbox with a sample patient

    Sample User: fhirjson
    Password: epicepic1

>**NOTE:** The cerner sample account does not have chart-able observation data
>so you will only see the patient banner after you are redirected back to the app


# References

* [client-js GitHub Project][1]
* [client-js documentation][2]
* [client-js Advanced React Example][3]
* [DockerHub Hapi Images][4]
* [GitHub Repo for HAPI images][5]
* [GitHub repo for Smartdev Sandbox][6]
* [Cerner Developer Console][7]
* [Epic Developer Console][8]

[1]: https://github.com/smart-on-fhir/client-js
[2]: http://docs.smarthealthit.org/client-js/
[3]: https://codesandbox.io/s/fhir-client-react-react-router-context-0q3n8
[4]: https://hub.docker.com/r/smartonfhir/hapi
[5]: https://github.com/smart-on-fhir/hapi
[6]: https://github.com/smart-on-fhir/smart-dev-sandbox
[7]: https://code.cerner.com/developer/smart-on-fhir/apps
[8]: https://fhir.epic.com/Developer/Apps