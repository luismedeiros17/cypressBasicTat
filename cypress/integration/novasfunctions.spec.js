/// <reference types="Cypress" />
import { faker } from '@faker-js/faker';



//const cypressConfig = require("../cypress.config");
const url = 'http://127.0.0.1:5500/src/index.html'
const nome = faker.name.firstName()
const sobrenome = faker.name.lastName()
const email = faker.internet.email()
const telefone = faker.phone.number('011#########')
const texto = faker.lorem.paragraph()
const tempo = 3000
describe('Central de Atendimento ao Cliente TAT', function() {    
  beforeEach(function (){
    cy.visit('./src/index.html')
    //cy.visit(url)
  }) 

    Cypress._.times(3, () => {
        it("submete o formulário com sucesso", () => {
        const customer = {
            firstName: "João",
            lastName: "Silva",
            email: "joaosilva@example.com"
        };
    
        cy.clock()

        cy.get('#firstName').type(nome)
        cy.get('#lastName').type(sobrenome)
        cy.get('#email').type(email)      
        cy.get('#phone').type(telefone)
        cy.get('#product').select('youtube')
        cy.get('#support-type > :nth-child(4)').click()
        cy.get('#email-checkbox').check()
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type(texto, { delay: 0 })

        cy.get('.button').click()
        cy.contains("Forneça o máximo de informações, por favor.")

        cy.get('.success').should('be.visible')
        cy.get('.success').should('have.contain','Mensagem enviada com sucesso.')
        
        cy.tick(tempo)
        cy.get('.success').should('not.be.visible')

        })
    })   

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      }) 

     it('preenche area de texto com invoke val', () => {
        const longText = Cypress._.repeat('0123456', 15)
        const mudaText = Cypress._.replace()
        cy.get('#open-text-area')
            .invoke('val',longText)
            .should('have.value',longText)

     }); 

     it('testa requisição http', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(response){
             const {status, statusText, body } = response
             expect(status).to.equal(200)             
             expect(statusText).to.equal('OK')
             expect(body).to.include('CAC TAT')

             console.log(Response)
        })
        
     });

     it('encontre o gato', () => {
        cy.get('#cat')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
        
        cy.get('#title')
            .invoke('text', 'mudei o nome')
            .should('have.text','mudei o nome')  
        
     });
})
