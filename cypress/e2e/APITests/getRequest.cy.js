/// <reference types="cypress"/>

import Ajv from "ajv"
const ajv= new Ajv()
import CoverPhoto from "./CoverPhoto.js"

describe('Suite for API Tests ',()=>{

    it("Get Activities",()=>{
        //We define an alias for the request that is activities
        cy.request('https://fakerestapi.azurewebsites.net/api/v1/Activities').as('activities')
        //We get that request and make actions after
        cy.get('@activities').then(res =>{
            //we validate the request status is 200
            expect(res.status).to.eq(200)
            //We print the response body
           cy.log(res.body)            
            //We create an array of id
           let idArray = []
           //We iterate through the response body and pushing every single id from the body to the array of id
           for(let i=0; i<res.body.length;i++){
            idArray[i] = res.body[i].id
           }
           //We print all the id's contained by the array
           for(let i=0;i<idArray.length;i++)
           cy.log("Id extracted from Json response: "+idArray[i])
           //We generate a random number max with the lenght of the array because is the max number of id's
           let randomIndex = generateRandomInteger(idArray.length)

           //Making the request with the random number generated and extracting the id from the array of id's from the last request
           cy.request('https://fakerestapi.azurewebsites.net/api/v1/Activities/'+idArray[randomIndex]).as('activityId')
           //accessing the activityId request
           cy.get('@activityId').then(res2=>{
            //Printing the title of the body response
            cy.log("the title from the response is: "+res2.body.title)
        })
    })

})
    //Post request
    it("POST Activities",()=>{
        //We have to do multiple post request to this endpoints we are going to make five requests
        for(let i =0;i<5;i++){
            //We define the request
            cy.request({
                //the verb is POST
                method: 'POST',
                //endpoint of the request
                url: 'https://fakerestapi.azurewebsites.net/api/v1/Activities',
                //the body we are going to send
                body: {
                    "id": i,
                    "title": "This is the activity #: "+i,
                    "dueDate": "2022-10-03T22:58:56.481Z",
                    "completed": true
                },
                //Defining the content type
                headers:{
                    'content-type':'application/json'
                }
            }).then((res)=>{
                //After that we print the response from the endpoint
                cy.log("response id: "+res.body.id)
                cy.log("response title: "+res.body.title)
                cy.log("response dueDate: "+res.body.dueDate)
                cy.log("response completed: "+res.body.completed)
            })
        }

    })

    //Validating the json schema from the response and printing the headers
    it("Validate schema from Books endpoint and printing headers",()=>{
        //Making a request GET to the endpoint
        cy.request('GET','https://fakerestapi.azurewebsites.net/api/v1/Books').then((response)=>{
            //Accessing the fixture bookSchema that contains the schema that will help to validate the response    
            cy.fixture("bookSchema").then((bookSchema)=>{
                    cy.log("Validating JSON Schema")
                    //We use our variable validate with the help of ajv module and pass the schema
                    const validate = ajv.compile(bookSchema)
                    //We validate the body of the response
                    const valid = validate(response.body)
                    //If something went wrong this log will appear
                    if(!valid) cy.log("Fallo la validacion"+validate.errors)
                    //if the validation was successfull this log will appear
                    else cy.log("JSON Schema validated correctly")
                })
    })
        //Defining the request with verb GET
        cy.request({
            method: 'GET',
            //endpoint
            url: 'https://fakerestapi.azurewebsites.net/api/v1/Books',
            headers:{
                'content-type':'application/json'
            }
        }).then((res)=>{
            //Printing the headers from the response extracted from postman
            cy.log("Printing response Headers")
            cy.log(res.headers['api-supported-versions'])
            cy.log(res.headers['content-type'])
            cy.log(res.headers.date)
            cy.log(res.headers.server)
            cy.log(res.headers['transfer-encoding'])
                     
        })

        
    })

    it("Saving response in POJO",()=>{
        //We make a get request to this endpoint with alias coverPhotosEndpoint
        cy.request('https://fakerestapi.azurewebsites.net/api/v1/CoverPhotos').as('coverPhotosEndpoint')
        //we get the request and then
        cy.get('@coverPhotosEndpoint').then((res)=>{
            //create an array that will contain a pojo object defined for the response in each position
            let coverPhotoArray = []

            for(let i=0;i<res.body.length;i++){
                //We create a new pojo of CoverPhoto with the data from the response
                let pojo = new CoverPhoto(res.body[i].id,res.body[i].idBook,res.body[i].url)
                //We push every element in the response to the array
                coverPhotoArray.push(pojo)
            }
            //We print the response in the format sepcified
            for(let i=0;i<coverPhotoArray.length;i++){
                //getting the idbook from the pojo that is contained by the array
                cy.log("IdBook: "+coverPhotoArray[i].idBook)
                //getting the url from the pojo that is contained by the array
                cy.log("Url: "+coverPhotoArray[i].url)
                cy.log('--------------')
            }
        })
    })

})

//Method to generate a random number receives a max that is the max number it can generate
function generateRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
}