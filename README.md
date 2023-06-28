# whoami
WEB 23 Project of Team AH 

using 

express

node

## API USES:
- https://agify.io/
- https://genderize.io/
- https://nationalize.io/


### install modules:
**npm install**

### run (live server style):
**npm run start-nodemon**

oder

**nodemon server/server.js localhost 3000**

## ENDPOINTS
- *GET /api?name=example => gives back the Data from the APIs mentioned above*

    in this form: 

```

    "example": {
        "Agify": {
            "age": 46,
            "count": 411442
        },

        "Genderize": {
            "count": 1114390,
            "gender": "male",
            "probability": 0.96
        },

        "Nationalize": {
            "country": [
                {
                    "country_id": "CZ",
                    "probability": 0.082
                },
                {
                    "country_id": "UA",
                    "probability": 0.045
                },
                {
                    "country_id": "RO",
                    "probability": 0.033
                },
                {
                    "country_id": "RU",
                    "probability": 0.031
                },
                {
                    "country_id": "IL",
                    "probability": 0.028
                }
            ]
        }
    }
```
