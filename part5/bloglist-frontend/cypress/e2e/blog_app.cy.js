describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'usertest',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3001')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first()').type('usertest')
      cy.get('input:last()').type('test')
      cy.get('button').click()

      cy.contains('logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input:first()').type('wrong')
      cy.get('input:last()').type('wrong')
      cy.get('button').click()

      cy.contains('Wrong username or password')
    })
  })
})