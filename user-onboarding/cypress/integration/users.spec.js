describe("User Board App", () => {
    beforeEach(() => {
        cy.visit('localhost:3000'); 
    })

    const nameInput = () => cy.get('input[name=name]');
    const emailInput = () => cy.get('input[name=email]');
    const passwordInput = () => cy.get('input[name=password]');
    const tosCheckbox = () => cy.get('input[name=tos]');
    const submitBtn = () => cy.get('button[id=submitBtn]');

    it('the Elements are showing at the start of the app', () => {
        nameInput().should('exist');
        emailInput().should('exist');
        passwordInput().should('exist');
        tosCheckbox().should('exist');
        submitBtn().should('exist');
        cy.contains('Sign Up').should('exist');
    })
    
    describe('Fill in the Inputs and checkbox', () => {
        it('can navigate to site', () => {
            cy.url().should('include', 'localhost');
        })

        it('submit button starts disabled', () => {
            submitBtn().should('be.disabled');
        })

        it('starts with an uncheck TOS cehckbox and can be clicked and checked', () => {
            tosCheckbox()
                .should('have.value', 'false')
                .check()
                .should('have.value', 'true')
        })

        it('inputs can be typed into and button is disabled until complete form', () => {
            nameInput()
                .should('have.value', '')
                .type('Pengin')
                .should('have.value', 'Pengin')
            
            submitBtn().should('be.disabled')

            emailInput()
                .should('have.value', '')
                .type('emperor@pengin.com')
                .should('have.value', 'emperor@pengin.com')
            
            submitBtn().should('be.disabled')

            passwordInput()
                .should('have.value', '')
                .type('penginxx')
                .should('have.value', 'penginxx')
            
            submitBtn().should('be.disabled')

            tosCheckbox()
                .should('have.value', 'false')
                .check()
                .should('have.value', 'true')
            
                submitBtn().should('be.enabled')
        })

        it('Inputs a Full form and checks if it was Successfully posted', () => {
            nameInput()
                .type('pengin')
            
            emailInput()
                .type('emperor@pengin.com')
            
            passwordInput()
                .type('somepassword')
            
            tosCheckbox()
                .check()
            
            submitBtn()
                .click()
            
            cy.contains('pengin').should('exist')
        })
    })


})