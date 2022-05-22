# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
### Auth
|Function|URL|Method|Args|Token Required|Body|Response|
|-|-|-|-|-|-|-|
|Register|`/api/register`|`POST`|`-`|`False`|`{`<br>`"username": "Magdi",`<br>`"firstName": "Mohamed",`<br>`"lastName": "Magdi"`<br>`"password":"123"`<br>`}`|`{`<br>`"id": 1,`<br>`"username": "Magdi",`<br>`"firstName": "Mohamed",`<br>`"lastName": "Magdi"`<br>`}`|
|Sign in|`/api/sign-in`|`POST`|`-`|`False`|`{`<br>`"username": "Magdi",`<br>`"password":"123"`<br>`}`|`{`<br>`"token": JWTTOKEN,`<br>`}`

#### Products
|Function|URL|Method|Args|Token Required|Body|Response|
|-|-|-|-|-|-|-|
|Index|`/api/products`|`GET`|`-`|`False`|`-`|
|Show|`/api/products/:id`|`GET`|`product id`|`False`|`-`|`[{`<br>`"id": 1,`<br>`"name": "TShirt",`<br>`"price": 10,`<br>`"frequency": 0`<br>`}]`|
|Create|`/api/products`|`POST`|`-`|`True`|`{`<br>`"name": "TShirt"`<br>`,"price": 10`<br>`}`|`{`<br>`"id": 1,`<br>`"name": "TShirt",`<br>`"price": 10,`<br>`"frequency": 0`<br>`}`|
|Top 5 products|`/api/products/top-five`|`GET`|`-`|`False`|`-`|`[{`<br>`"id": 1,`<br>`"name": "TShirt",`<br>`"price": 10,`<br>`"frequency": 4`<br>`},`<br>`{`<br>`"id": 2,`<br>`"name": "POLO",`<br>`"price": 16,`<br>`"frequency": 0`<br>`}]`|

#### Users
|Function|URL|Method|Args|Token Required|Body|Response|
|-|-|-|-|-|-|-|
|Index|`api/users`|`GET`|`-`|`True`|`-`|`[{`<br>`"id": 1,`<br>`"username": "Magdi",`<br>`"firstName": "Mohamed",`<br>`"lastName": "Magdi"`<br>`}]`|
|Show|`api/users/:id`|`GET`|`user id`|`True`|`-`|`{`<br>`"id": 1,`<br>`"username": "Magdi",`<br>`"firstName": "Mohamed",`<br>`"lastName": "Magdi"`<br>`}`|
|Create|`api/users`|`POST`|`-`|`True`|`{`<br>`"username": "Magdi",`<br>`"firstName": "Mohamed",`<br>`"lastName": "Magdi"`<br>`"password":"123"`<br>`}`|`{`<br>`"id": 1,`<br>`"username": "Magdi",`<br>`"firstName": "Mohamed",`<br>`"lastName": "Magdi"`<br>`}`|
|Orders for user|`api/users/:id/orders`|`GET`|`user id`|`True`|`-`|`{`<br>`"id": 1,`<br>`"user_id": "1",`<br>`"status": "active"`<br>`}`

#### Orders
|Function|URL|Method|Args|Token Required|Body|Response|
|-|-|-|-|-|-|-|
|Index|`/api/orders`|`GET`|`-`|`True`|`-`|`[{`<br>`"id": 1,`<br>`"user_id": "1",`<br>`"status": "active"`<br>`}]`|
|Show|`/api/orders/:id`|`GET`|`order id`|`True`|`-`|`{`<br>`"id": 1,`<br>`"user_id": "1",`<br>`"status": "active"`<br>`}`|
|Create|`/api/orders`|`POST`|`-`|`True`|`{`<br>`"status": "active"`<br>`}`|`{`<br>`"id": 1,`<br>`"user_id": "1",`<br>`"status": "active"`<br>`}`|
|Get products in order|`/api/orders/:id/products`|`GET`|`order id`|`True`|`-`|`[{`<br>`"order_id": "1",`<br>`"status": "active",`<br>`"product_id": "1",`<br>`"product_name": "TShirt",`<br>`"product_price": 10,`<br>`"quantity": 1`<br>`}]`|
|Add a product to an order|`/api/orders/:id/products`|`POST`|`order id`|`True`|`{`<br>`"quantity": 1,`<br>`"product_id": 1`<br>`}`|`{`<br>`"id": 1,`<br>`"quantity": 1,`<br>`"order_id": "1",`<br>`"product_id": "1"`<br>`}`|

## Data Shapes
#### Product
- id
- name
- price
- frequency

#### User
- id
- userName
- firstName
- lastName
- password

#### Orders
- id
- user_id
- status (active or complete)

### Order Products
- id
- quantity
- order_id
- product_id

## Database Schema
![database](./.assets/db.png)
