import Editor from '../src/Utils/Editor'

import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from '../../tiptap-extensions'

test('can create editor', () => {
  const editor = new Editor()

  expect(editor).toBeDefined()
})

test('set HTML, get HTML', () => {
  const content = '<p>Lorem <strong>ipsum</strong> dolor sit amet.</p>'

  const editor = new Editor({
    content,
    extensions: [
      new Bold(),
    ],
  })

  expect(editor.getHTML()).toEqual(content)
})

test('set HTML, get JSON', () => {
  const content = '<p>Lorem <strong>ipsum</strong> dolor sit amet.</p>'
  const result = {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Lorem ',
          },
          {
            type: 'text',
            marks: [
              {
                type: 'bold',
              },
            ],
            text: 'ipsum',
          },
          {
            type: 'text',
            text: ' dolor sit amet.',
          },
        ],
      },
    ],
  }

  const editor = new Editor({
    content,
    extensions: [
      new Bold(),
    ],
  })

  expect(editor.getJSON()).toEqual(result)
})

test('set JSON, get JSON', () => {
  const content = {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Lorem ',
          },
          {
            type: 'text',
            marks: [
              {
                type: 'bold',
              },
            ],
            text: 'ipsum',
          },
          {
            type: 'text',
            text: ' dolor sit amet.',
          },
        ],
      },
    ],
  }

  const editor = new Editor({
    content,
    extensions: [
      new Bold(),
    ],
  })

  expect(editor.getJSON()).toEqual(content)
})

test('set JSON, get HTML', () => {
  const content = {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Lorem ',
          },
          {
            type: 'text',
            marks: [
              {
                type: 'bold',
              },
            ],
            text: 'ipsum',
          },
          {
            type: 'text',
            text: ' dolor sit amet.',
          },
        ],
      },
    ],
  }
  const result = '<p>Lorem <strong>ipsum</strong> dolor sit amet.</p>'

  const editor = new Editor({
    content,
    extensions: [
      new Bold(),
    ],
  })

  expect(editor.getHTML()).toEqual(result)
})

test('set content (HTML)', () => {
  const editor = new Editor({
    content: '<p>Foo</p>',
  })

  editor.setContent('<p>Bar</p>')

  expect(editor.getHTML()).toEqual('<p>Bar</p>')
})

test('set content (JSON)', () => {
  const editor = new Editor({
    content: '<p>Foo</p>',
  })

  editor.setContent({
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Bar',
          },
        ],
      },
    ],
  })

  expect(editor.getHTML()).toEqual('<p>Bar</p>')
})

test('clear content', () => {
  const editor = new Editor({
    content: '<p>Foo</p>',
  })

  editor.clearContent()

  expect(editor.getHTML()).toEqual('<p></p>')
})

test('init callback', done => {
  const editor = new Editor({
    content: '<p>Foo</p>',
    onInit: ({ state, view }) => {
      expect(state).toBeDefined()
      expect(view).toBeDefined()
      done()
    },
  })

  editor.destroy()
})

test('update callback', done => {
  const editor = new Editor({
    content: '<p>Foo</p>',
    onUpdate: ({ getHTML, getJSON }) => {
      expect(getHTML()).toEqual('<p>Bar</p>')
      expect(getJSON()).toEqual({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Bar',
              },
            ],
          },
        ],
      })
      done()
    },
  })

  editor.setContent('<p>Bar</p>', true)
})