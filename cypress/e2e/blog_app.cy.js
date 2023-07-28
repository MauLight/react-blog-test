describe('login to Blog App', function () {

  beforeEach(function () {

    localStorage.clear()

    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const user = {
      'username': 'Elvira_Shakirova',
      'name': 'Elv',
      'password': 'Elvandmau916.'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')

  })

  it('front page can be opened', function () {
    cy.contains('Blog')
    cy.contains('Blog App, Screenwriters\' Quest 2023')
  })

  it('login form can be opened', function () {
    cy.contains('Log in').click()
  })

  it('user can login', function () {

    cy.login({ 'username': 'Elvira_Shakirova', 'password': 'Elvandmau916.' })

  })

  it('login fails with wrong password', function () {
    cy.contains('Log in').click()
    cy.get('#username').type('Elvira_Shakirova')
    cy.get('#password').type('somenonsense')
    cy.get('#login-btn').click()

    cy.get('#error')
      .should('contain', 'wrong credentials')
      .and('have.css', 'backgroundColor', 'rgb(220, 38, 38)')
  })

})

describe('when logged in to Blog App', function () {

  beforeEach(function () {

    localStorage.clear()

    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      'username': 'Elvira_Shakirova',
      'name': 'Elv',
      'password': 'Elvandmau916.'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

    cy.login({ 'username': 'Elvira_Shakirova', 'password': 'Elvandmau916.' })

  })

  it('a new note can be created', function () {

    // const blog = {
    //   'title': 'The fearsome march of progress',
    //   'author': 'Elvira_Shakirova',
    //   'url': 'www.weregonna die.com',
    // }

    // cy.createBlog(blog)
    cy.get('#open').click()
    cy.get('#title').type('The fearsome march of progress')
    cy.get('#author').type('Elvira_Shakirova')
    cy.get('#url').type('www.weregonnadie.com')
    cy.contains('Add Blog').click()
    cy.contains('The fearsome march of progress by Elvira_Shakirova')
    cy.contains('The fearsome march of progress by Elvira_Shakirova')
  })
})



describe('when adding a new blog, buttons work', function () {

  beforeEach(function () {

    localStorage.clear()

    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const user1 = {
      'username': 'Elvira_Shakirova',
      'name': 'Elv',
      'password': 'Elvandmau916.'
    }

    const user2 = {
      'username': 'Mau_Light',
      'name': 'Mau',
      'password': 'Elvandmau916.'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
    cy.login({ 'username': 'Elvira_Shakirova', 'password': 'Elvandmau916.' })

    cy.get('#open').click()
    cy.get('#title').type('The fearsome march of progress')
    cy.get('#author').type('Elvira_Shakirova')
    cy.get('#url').type('www.weregonnadie.com')
    cy.get('#likes').type(200)
    cy.contains('Add Blog').click()
    cy.contains('The fearsome march of progress by Elvira_Shakirova')
  })

  it('can press like button to add one more like', function () {
    cy.contains('view').click()
    cy.contains('like').click()
  })

  it('can press delete button to delete the post', function () {

    cy.contains('Delete').click()
  })
  it('cannot delete a blog if another user posted it', function () {

    cy.contains('LogOut').click()
    cy.login({ 'username': 'Mau_Light', 'password': 'Elvandmau916.' })
    cy.get('#open').click()
    cy.get('#title').type('The uncertainty of ideas at 1am')
    cy.get('#author').type('Mau_Light')
    cy.get('#url').type('www.weregonnadie.com')
    cy.contains('Add Blog').click()
    cy.contains('LogOut').click()
    cy.login({ 'username': 'Elvira_Shakirova', 'password': 'Elvandmau916.' })
    cy.contains('Delete').should('not.exist')
  })

  it('shows blogs in descending order', function () {
    cy.get('#open').click()
    cy.get('#title').type('The one with the most likes')
    cy.get('#author').type('Elvira_Shakirova')
    cy.get('#url').type('www.weregonnadie.com')
    cy.get('#likes').type(500)
    cy.contains('Add Blog').click()
    cy.get('#open').click()
    cy.get('#title').type('The one with the least likes')
    cy.get('#author').type('Elvira_Shakirova')
    cy.get('#url').type('www.weregonnadie.com')
    cy.get('#likes').type(100)
    cy.contains('Add Blog').click()

    cy.get('.blog').eq(0).should('contain', 'The one with the most likes')
    cy.get('.blog').eq(2).should('contain', 'The one with the least likes')
  })
})