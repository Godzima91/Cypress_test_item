/// <reference types="Cypress" />

describe('Adding product to the cart', () => {
    
    it('SEARCHING THE SAMSUNG PHONE', () => {
        cy.visit('https://rozetka.com.ua')
            .get('[name="search"]').type('Samsung')
            .wait(1000)
            .get('.search-suggest__item-caption').contains(' Мобильные телефоны').trigger('mouseover')
            .click()
    })

    it('EXPECT CORRECT URL', () => {
        cy.url().should('include', '/search/?text=samsung&section_id=80003&redirected=1')
            })  
        
    it('SORTING PHONES', () => {
        cy
            .get('select')
            .should('have.text', ' По релевантности  От дешевых к дорогим  От дорогих к дешевым  По релевантности ')
            .wait(2000)
            .select('2: expensive')
            .url().should('include', '&sort=expensive&text=samsung')
    })

    it('FIND MAX ACTIVE PRICE PHONE', () => {
        // cy.visit('https://rozetka.com.ua/search/?redirected=1&section_id=80003&sort=expensive&text=samsung')
            cy.get('.goods-tile__inner').find('.goods-tile__availability--available')
            .first()
            .wait(2000)
            .get('.buy-button').first()
            .trigger('mouseover')
            .click({multiple: true})
            .wait(2000)
                .should('have.class', 'buy-button_state_in-cart')

        it('ADD TO CART', () => {
          cy.get('.header__button--active').click({ multiple: true })
            .wait(1000)
            .get('.modal__heading').should('have.text', ' Корзина ')
            
        })
            
    })

    it('DELETE PHONE FROM THE CART', () => {
          cy.get('.header__button--active').click()
            .wait(1000)
    })

    it('CHECKING EMPTY CART and Go to main page', () => {
          cy.get('.cart-dummy__heading').should('have.text', ' Корзина пуста ')
            .get('.modal__close').click()
            .get('.header__logo').click()
    })
    
})