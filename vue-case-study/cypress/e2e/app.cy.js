// https://docs.cypress.io/api/introduction/api.html

describe('App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the header', () => {
    cy.get('.header-title').should('have.text', 'dev articles')
  })
  
  it('filters articles by title and author', () => {
    // Filter by Title
    const title = 'QA in 2022'
    cy.get('input[type="text"]').type(title)
    cy.get('.article-title').each(($title) => {
      cy.wrap($title).should('contain', title)
    })

    // By Author name
    const author = 'Max Cypress'
    cy.get('input[type="text"]').clear().type(author)
    cy.get('.card-meta-info h5').each(($author) => {
      cy.wrap($author).should('contain', author)
    })
  })

  it('sorts articles by author', () => {
    cy.get('select').select('Author')
    cy.get('.card-meta-info h5').then(($authors) => {
      const authors = $authors.map((_, el) => el.innerText.trim()).get()
      const sortedAuthors = [...authors].sort()

      expect(authors).to.deep.equal(sortedAuthors)
    })
  })

  it('sorts articles by date (ascending)', () => {
    cy.get('select').select('Date (Ascending)')
    cy.get('.card-body small').then($dates => {
      const dateStrings = $dates.map((_, el) => el.getAttribute('title')).get()
      const sortedDateStrings = [...dateStrings].sort((a, b) => new Date(a) - new Date(b))
      expect(dateStrings).to.deep.equal(sortedDateStrings)
    })
  })

  it('sorts articles by date (descending)', () => {
    cy.get('select').select('Date (Descending)')
    cy.get('.card-body small').then($dates => {
      const dateStrings = $dates.map((_, el) => el.getAttribute('title')).get()
      const sortedDateStrings = [...dateStrings].sort((a, b) => new Date(b) - new Date(a))
      expect(dateStrings).to.deep.equal(sortedDateStrings)
    })
  })

  it('displays only the latest articles when "Latest only" is checked', () => {
    cy.get('input[type="checkbox"]').check()
    cy.get('.card').should('have.length', 1)
    cy.get('.card-body small').each($date => {
      const dateString = $date.attr('title')
      expect(new Date(dateString).getFullYear()).to.equal(new Date().getFullYear())
    })
  })

  it('likes and unlikes an article', () => {
    cy.get('.card-footer .btn').first().click({force: true});
    cy.get('.likes').first().should('contain', '13 likes')
    cy.get('.card-footer .btn').first().should('have.class', 'active');
  
    cy.get('.card-footer .btn').first().click({force: true});
    cy.get('.likes').first().should('contain', '12 likes')
    cy.get('.card-footer .btn').first().should('not.have.class', 'active');
  })
})
