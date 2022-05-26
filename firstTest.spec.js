/// <reference types="Cypress" />
// import { post } from "cypress/types/jquery"
import { mobileReplenishment } from "../support/pages/mobileReplenishment"


describe('headHunter course', () => {
    it('Should', () => {
        cy.visit('https://next.privat24.ua/mobile?lang=en')
            .get('[data-qa-node="amount"]')
            .type('999')
            .wait(2000)
            .should('have.value', 999)
            .and('be.visible')
                // .contains('Go to old version')
                // .wait(2000)
                // .click({force: true})
    }) 
    it('EXPECT', () => {
        cy.visit('https://next.privat24.ua/mobile?lang=en')
            .get('[data-qa-node="amount"]')
            .type('999').then( input => {
                expect(input).to.have.value(999)
            })              
    }) 
    it('deposit', () => {
        cy.visit('https://next.privat24.ua/deposit?lang=en')
           .get('[data-qa-value="UAH"]')
            .should('be.checked')
    })
    it('mouseover check', () => {
        cy.visit('https://next.privat24.ua/deposit?lang=en')
            .contains('Мої депозити')
            .trigger('mouseover')
            .get('#archiveDeposits')
            .should('be.visible')
    })

    it('check attr of button', () => {
        cy.visit('https://next.privat24.ua?lang=en')
            .contains('Show cards')
            .should('have.attr', 'type')
            .and('match', /button/)
    })
    it('check attr of button', () => {
        cy.visit('https://next.privat24.ua?lang=en')
          .url()
          .should('eq', 'https://next.privat24.ua/?lang=en')
    })


    it('Replenishment of Ukrainian mobile phone number', () => {
        cy.visit('https://next.privat24.ua/mobile?lang=en')

        mobileReplenishment.typePhoneNumber('632462537')
        mobileReplenishment.typeAmount('1')
        mobileReplenishment.typeDebitCardData('4552331448138217', '0524', '111')
        
        cy.wait(2000)
        mobileReplenishment.fillFirstName('Ivan')
        mobileReplenishment.fillLastName('Ivanoc')
        
        mobileReplenishment.submitPayment()
        mobileReplenishment.checkDebitCard('4552 **** **** 8217')
        mobileReplenishment.checkDebitAmount('1')
        mobileReplenishment.checkDebitCommission('2')

    
        // cy.request('https://next.privat24.ua')
        //     .then((response) => {
        //         console.log(response);
        //     })
    })


    it('Ex sending GET request', () => {
        cy.request('https://next.privat24.ua')
            .then((response) => {
                console.log('Slava Ukraine :', response);
            })
    })

    it('Ex sending POST request', () => {

        const requestBody = {
            "action":"info",
            "phone":"+380632462537",
            "amount":50,
            "currency":"UAH",
            "cardCvv":"111",
            "card":"4552331448138217",
            "cardExp":"0524",
            "xref":"137f0b7ca2743d1de4aca7b850b36ae5",
            "_":1652963691504
        }

        const headersData = {
            cookie: '_ga=GA1.2.158242902.1652790183; _gid=GA1.2.1645179691.1652790183; pubkey=4bffff68514a7c068c089688e10f337c; _gat_gtag_UA_29683426_11=1; fp=28; lfp=5/17/2022, 3:23:14 PM; pa=1652963646613.28270.6349889951977354next.privat24.ua0.9588809160852663+1'
        }

        cy.request({
            method: "POST",
            url:'https://next.privat24.ua/api/p24/pub/mobipay',
            body: requestBody,
            headers: headersData
        }).then((response) => {
            expect(response).to.have.property('status').to.equal(200)
                console.log(response);
            })
    })

})

