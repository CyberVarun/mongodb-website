## A simple login page using node JS & MongoDB.

### Dependencies

```
express": "^4.18.2
mongodb": "5.0
```

<hr>

### Installation

```bash
npm install express mongodb@5.0
```

You can add your mongoDB URI in index.js directly

```JS
const uri = "mongodb+srv://username:password@uri"
```

or set and 'URI' environment variable for that as follows

```bash
export URI="mogodb+srv://username:password@uri"
```

This also needs a 'PORT' environment variable you can set it as follows:

```bash
export PORT="port_number"
```

Default port will be 8080. If 'PORT' variable is not present.

Then add your 'DATABASE' and 'COLLECTION' name in index.js as follows

```JS
const database = client.db("Database_name");
const collec = database.collection("Collection_name");
```
You will also need to change uri in src/js/login.js

```JS
sendData("protocol://uri/cred" { data });
```

Done!

You can start you server by running

```bash
node index.js
```

<hr>

<b>NOTE</b>: The index.html uses bootstrap CDN for CSS not bootstrap npm package.

<hr>

### Sample

![login successful image](./src/img/login_successful.png)
