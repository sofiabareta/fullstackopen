describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'usertest',
      password: 'test'
    }

    const anotherUser = {
      username: 'anotherusertest',
      password:'test'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', anotherUser)
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('input:first()').type('usertest')
      cy.get('input:last()').type('test')
      cy.get('button').click()
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.contains('Create new blog').click()
        cy.get('input[name=\'title\']').type('Title')
        cy.get('input[name=\'author\']').type('Author')
        cy.get('input[name=\'url\']').type('URL')

        cy.get('button[type="submit"]').click()
      })

      it('it can be liked', function () {
        cy.get('.blog:first()')
          .contains('like')
          .click()
      })

      it('it can be removed', function () {
        cy.get('.blog:first()')
          .contains('Remove')
          .click()
      })

      it('can create another blog, like and sort the list', function(){
        cy.contains('Create new blog').click()
        cy.get('input[name=\'title\']').type('Title2')
        cy.get('input[name=\'author\']').type('Author2')
        cy.get('input[name=\'url\']').type('URL2')

        cy.get('button[type="submit"]').click()

        cy.get('.blog').eq(1).find('#button__like').click()
        cy.get('.blog').eq(0).should('contain', 'Title2')
        cy.get('.blog').eq(1).should('contain', 'Title')
      })
    })
  })

  describe('When having different users', function() {
    beforeEach(function() {
      cy.get('input:first()').type('usertest')
      cy.get('input:last()').type('test')
      cy.get('button').click()
    })

    it('should not allow other user to remove another users`s blog', function () {
      cy.contains('Create new blog').click()
      cy.get('input[name=\'title\']').type('Title')
      cy.get('input[name=\'author\']').type('Author')
      cy.get('input[name=\'url\']').type('URL')

      cy.get('button[type="submit"]').click()

      cy.contains('logout').click()

      cy.get('input:first()').type('anotherusertest')
      cy.get('input:last()').type('test')
      cy.get('button').click()

      cy.get('.blog:first()').contains('Remove').should('not.exist')
    })
  })
})