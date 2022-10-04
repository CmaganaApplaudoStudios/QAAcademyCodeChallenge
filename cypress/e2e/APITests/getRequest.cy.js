describe('Suite for API Tests ',()=>{

    it("Get Activities",()=>{

        cy.request('https://fakerestapi.azurewebsites.net/api/v1/Activities').as('activities')

        
        cy.get('@activities').then(res =>{
            expect(res.status).to.eq(200)

           cy.log(res.body)            

           let idArray = []
           for(let i=0; i<res.body.length;i++){
            idArray[i] = res.body[i].id
           }

           for(let i=0;i<idArray.length;i++)
           cy.log("Id extracted from Json response: "+idArray[i])

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

    it.only("POST Activities",()=>{
        for(let i =0;i<5;i++){
            cy.request({
                method: 'POST',
                url: 'https://fakerestapi.azurewebsites.net/api/v1/Activities',
                body: {
                    "id": i,
                    "title": "This is the activity #: "+i,
                    "dueDate": "2022-10-03T22:58:56.481Z",
                    "completed": true
                },
                headers:{
                    'content-type':'application/json'
                }
            }).then((res)=>{
                cy.log("response id: "+res.body.id)
                cy.log("response title: "+res.body.title)
                cy.log("response dueDate: "+res.body.dueDate)
                cy.log("response completed: "+res.body.completed)
            })
        }

    })
})

function generateRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
}