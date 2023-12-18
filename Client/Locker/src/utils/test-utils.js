import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

const AppProviders = ({ children }) => {
  return (
    <BrowserRouter >
      {children}
    </BrowserRouter>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AppProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }