import requests

# API endpoint
print('------------------NORMAL /api?name=alex REQUEST-----------------------')
getUrl = "http://localhost:3000/api?name=alex"
getResponse = requests.get(getUrl)
response_json_GETAPI = getResponse.json()
print(response_json_GETAPI)

print('------------------PUT Request to Save on Server-----------------------')

#put request to server to save it (POST IS DISABLED WITHOUT AUTHENTICATION)
putUrl = "http://localhost:3000/names/alex"
putResponse1 = requests.put(putUrl,json=response_json_GETAPI)
response_json_PUTNAME = putResponse1.content
print(response_json_PUTNAME)

print('------------------GET Request /names to See if Server saved PUT Request-----------------------')

#See if Server saved it(Put works too [Post is only available if you are logged in])
getUrl2 = "http://localhost:3000/names"
getResponse2 = requests.get(getUrl2)
response_json_GETNAMES = getResponse2.json()
print(response_json_GETNAMES)


print('------------------PUT REQUEST, but change age of Alex to 999 -----------------------')

#changing DATA
putUrl2 = "http://localhost:3000/names/alex"
new_data = response_json_GETAPI
new_data['alex']['Agify']['age'] = 999
putResponse2 = requests.put(putUrl2,json=new_data)
response_json_PUTNAME2 = putResponse2.content
print(response_json_PUTNAME2)

print('------------------GET /names To See if Age changed to 999 -----------------------')
#See if AGE changed to 999
getUrl2 = "http://localhost:3000/names"
getResponse2 = requests.get(getUrl2)
response_json_GETNAMES = getResponse2.json()
print(response_json_GETNAMES)