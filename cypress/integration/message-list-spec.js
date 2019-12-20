import MessageList from '../../components/MessageList.vue'
const mountVue = require('../..')

// common utils for MessageList
const getItems = () => cy.get('ul li')

/* eslint-env mocha */
describe('MessageList', () => {
  beforeEach(mountVue(MessageList))

  it('shows no messages', () => {
    getItems().should('not.exist')
  })

  it('shows messages', () => {
    Cypress.$vue.setProps({messages: ['one', 'two']}) // using vue-test-utils

    getItems().should('have.length', 2)
    cy.then(() => {
      Cypress.vue.messages.push('three') // using the prop directly
      getItems().should('have.length', 3)
    })
  })
})

describe('MessageList with props', () => {
  const template = `
    <div>
      <MessageList :messages="messages"/>
    </div>
  `

  const data = () => ({ messages: ['uno', 'dos'] })

  const components = {
    MessageList
  }

  beforeEach(mountVue({ template, data, components }))

  it('shows two items at the start', () => {
    getItems().should('have.length', 2)
  })
})

describe('MessageList under message-list name', () => {
  const template = `
    <div>
      <message-list :messages="messages"/>
    </div>
  `

  const data = () => ({ messages: ['uno', 'dos'] })

  const components = {
    'message-list': MessageList
  }

  beforeEach(mountVue({ template, data, components }))

  it('starts with two items', () => {
    expect(Cypress.vue.messages).to.deep.equal(['uno', 'dos'])
  })

  it('shows two items at the start', () => {
    getItems().should('have.length', 2)
  })
})
