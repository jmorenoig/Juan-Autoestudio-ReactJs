import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => render(<App />))

describe('App Test',()=>{
  it("Render title", ()=>{
    const title = screen.getByText(/Formulario/i);
    expect(title).toBeInTheDocument();
  });
  it("Render name", ()=>{
    const name = screen.getByLabelText(/Nombres/i);
    //const button = screen.getByRole('button', {name: /Guardar/i});
    
    //fireEvent.change(name, {target: {value: ''}})
    //fireEvent.click(button)

    //const errors = await screen.findByText(/El nombre solo puede contener letras y espacios/i)
    
    //screen.debug()
    expect(name).toBeInTheDocument();
    //expect(errors).toBeInTheDocument()    
  });

  it("Render button", ()=>{
    const button = screen.getByRole('button', {name: /Guardar/i});
    expect(button).toBeInTheDocument();
  });
})