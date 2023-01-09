// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="Cypress" />
import { faker } from '@faker-js/faker';

//const cypressConfig = require("../cypress.config");
const url = 'http://127.0.0.1:5500/src/index.html'
const nome = faker.name.firstName()
const sobrenome = faker.name.lastName()
const email = faker.internet.email()
const telefone = faker.phone.number('011#########')
const texto = faker.lorem.paragraph()

describe('Central de Atendimento ao Cliente TAT', function() {    
  beforeEach(function (){
    cy.visit('./src/index.html')
    //cy.visit(url)
  }) 
  
  it('verifica o título da aplicação', function() {        
    
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')    
    })

    it('Preenche campos envia formulario', function() {    
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
      cy.get('.success').should('have.contain','Mensagem enviada com sucesso.')
      
    })
  
    it('Valida erro campos sem preencher', function() {    
      cy.get('#firstName').type(nome)
      cy.get('#email').type(email)      
      cy.get('#phone').type(telefone)
      cy.get('#product').select('youtube')
      cy.get('#support-type > :nth-child(4)').click()
      cy.get('#email-checkbox').click()
      cy.get('#phone-checkbox').click()
      
      cy.get('.button').click()
      cy.get('.error').should('be.visible')
      cy.get('.error > strong', {timeout: 3000}).should('have.text','Valide os campos obrigatórios!')

    })
    
    it('Preenche e limpa campos', () => {
      
      cy.get('#firstName').type(nome).should('have.value',nome).clear()
      cy.get('#lastName').type(sobrenome).should('have.value',sobrenome).clear()
      cy.get('#email').type(email).should('have.value',email).clear()   
      cy.get('#phone').type(telefone).should('have.value',telefone).clear()
      cy.get('.button').click()
      cy.get('.error').should('be.visible')
      cy.get('.error > strong', {timeout: 3000}).should('have.text','Valide os campos obrigatórios!')

    });
  
    it('Seleciona arquivo - função de upload', function() {    

      cy.get('input[type="file"]').selectFile('cypress/fixtures/imagem.jpg')
      cy.get('#file-upload').should(function ($input) {
        expect($input[0].files[0].name).to.eq('imagem.jpg')
      })
   });

   it('Arrasta arquivo - função de dragdrop', function() {    

    cy.get('input[type="file"]').selectFile('cypress/fixtures/imagem.jpg',{action: 'drag-drop'})
    cy.get('#file-upload').should(function ($input) {
      expect($input[0].files[0].name).to.eq('imagem.jpg')
    })
 });

it('seleciona arquivo com alias ', () => {
  cy.fixture('imagem.jpg').as('testeimg')
  cy.get('input[type="file"]').selectFile('@testeimg',{action: 'drag-drop'})
    cy.get('#file-upload').should(function ($input) {
      expect($input[0].files[0].name).to.eq('imagem.jpg')
    })

  
});

it('verifica nova pagina de privacidade', () => {
  cy.get('#privacy a')
    .should('have.attr', 'target', '_blank')
    //.click()  
});

it('valida privacidade abrindo na mesma pagina usando o invoke', () => {
  cy.get('#privacy a').invoke('removeAttr','target').click()
  cy.title('contain','CAC TAT - Política de privacidade')  
  cy.get('#white-background').should('be.visible')
});

it('exibe msg no log', () => {
     console.log('end game')
     //alert(`fim dos teste ${nome} ${sobrenome}`)
   });
  
})  
it('teste pagina privacidade independente', () => {
  
  cy.visit('./src/privacy.html')
    cy.title('contain','CAC TAT - Política de privacidade')
    cy.get('#white-background').should('be.visible')
});