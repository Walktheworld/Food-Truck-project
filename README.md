Copyright <YEAR> <COPYRIGHT HOLDER>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



# Phase 3 Project "Belch It"

## Introduction

Welcome to Belch it, where we are building the most extensive brewery database for users to share their favorite breweries. Once a user has registered, they will have the ability to add a new brewery as well as edit, and delete breweries that they have created. All registered users will have the abitlty to leave a review on the breweries in the database.  

So drink it, and "Belch it" to the world!


## User
(has many :breweries)
(has many :reviews)

`user` table
- username
- bio
- image_url

## Brewery
(belongs to :user)
(has many :reviews)

`brewery` table
- name
- phone
- address
- website

## Review
(belongs to :user)
(belongs to :brewery)

`review` table
- post

## Resources

- [create-react-app][]

- [Postman][postman download]

[create-react-app]: https://create-react-app.dev/docs/getting-started
[postman download]: https://www.postman.com/downloads/
[network tab]: https://developer.chrome.com/docs/devtools/network/

