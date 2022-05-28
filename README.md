# upload-valid-json-koa
This repository demonstrate how to upload json file using koa and validate that against defined json schema.
It implements the functionality using SOLID principals so that it can be extended later on.

# Steps to use
1. Download or clone it.
2. Go inside directory.
3. Run `npm install`
4. Run `npm run start`
5. It will start koa application on port 3000.

# API to upload json
POST http://localhost:3000/upload-user-file

Sample Curl:

`curl --location --request POST 'http://localhost:3000/upload-user-file' \
--form 'file=@"/Documents/user.json"'`

Sample NodeJS - Axios:
```
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('file', fs.createReadStream('/Documents/user.json'));

var config = {
  method: 'post',
  url: 'http://localhost:3000/upload-user-file',
  headers: { 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```
