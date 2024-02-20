import { render, screen } from '@testing-library/vue'
import { MyComponent } from '..'

/* eslint-disable vue/one-component-per-file */

describe('DrawSignPDF — MyComponent', () => {
  test('renders', async () => {
    render(MyComponent)

    const el = await screen.findByText(/hello world/)

    expect(el).toBeTruthy()
  })
})
