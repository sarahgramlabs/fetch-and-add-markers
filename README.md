# Fetch and Create Markers

## Set up and Testing:

Clone the repo and install 
```
git clone https://github.com/sarahgramlabs/fetch-and-add-markers.git
npm install
```

Install PostGIS to use geomtry datatypes and functions: http://postgis.net/install/

Start the server and db connection:
```
npm run start
```
Run this line of SQL in your db to create PostGis extension:
```
CREATE EXTENSION postgis;
``

Seed the db with random markers in the northern hemisphere
```
npm run seed
```

Run tests
```
npm run test
```
