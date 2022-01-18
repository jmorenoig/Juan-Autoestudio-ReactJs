import React, { useState } from "react";
import { Formik } from "formik";

const App = () => {
  
    const [formSave, changeFormSave] = useState(false);
    return (
      <div className="App">
        <>
          <Formik 
            initialValues={{
              name: '',
              lastName: '',
              birthday: '',
              phone: '',
              mail: ''

            }}
            validate={(values) =>{
              let error = {}
              if (!values.name){
                error.name='Ingresa un nombre por favor'
              } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)){
                error.name ='El nombre solo puede contener letras y espacios'
              }

              if (!values.lastName){
                error.lastName='Ingresa un apellido por favor'
              } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.lastName)){
                error.lastName ='El apellido solo puede contener letras y espacios'
              }

              if (!values.birthday){
                error.birthday='Ingrese la fecha de nacimiento por favor'
              } 

              if (!values.phone){
                error.phone='Ingrese el numero de telefono por favor'
              } else if(!/^\d{7,10}$/.test(values.phone)){
                error.phone ='El telefono solo puede contener numeros de 7 a 10 digitos'
              }

              if (!values.mail){
                error.mail='Ingresa un correo por favor'
              } else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.mail)){
                error.mail ='El correo con cumple con el formato'
              }
              return error;
            }}
            onSubmit={(values, {resetForm})=>{ 
              resetForm();
              console.log(values);
              console.log('Se envio el formulario')
              changeFormSave(true);
              setTimeout(()=> changeFormSave(false), 3000)
            }}>
            {({handleSubmit, values, errors, touched, handleBlur, handleChange})=>(
              <form action="" onSubmit={handleSubmit} className="form">
                <h4>Formulario</h4>
                  <div>
                      <label htmlFor="name">
                        Nombres
                        <input 
                            className="controls"
                            type="text"
                            name="name"
                            placeholder="Name"
                            id ="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                      </label>
                      {touched.name && errors.name && <div className="error">{errors.name}</div> }
                  </div>

                  <div>
                      <label htmlFor="lastName">Apellidos</label>
                      <input 
                          className="controls"
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          id ="lastName"
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                      {touched.lastName && errors.lastName && <div className="error">{errors.lastName}</div> }
                  </div>

                  <div>
                      <label htmlFor="birthday">Fecha de nacimiento</label>
                      <input 
                          className="controls"
                          type="date"
                          name="birthday"
                          id ="birthday"
                          value={values.birthday}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                      {touched.birthday && errors.birthday && <div className="error">{errors.birthday}</div> }
                  </div>

                  <div>
                      <label htmlFor="phone">Teléfono</label>
                      <input 
                          className="controls"
                          type="text"
                          name="phone"
                          placeholder="Phone"
                          id ="phone"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                      {touched.phone && errors.phone && <div className="error">{errors.phone}</div> }
                  </div>

                  <div>
                      <label htmlFor="mail">Correo</label>
                      <input 
                          className="controls"
                          type="email"
                          name="mail"
                          placeholder="Mail"
                          id ="mail"
                          value={values.mail}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                      {touched.mail && errors.mail && <div className="error">{errors.mail}</div> }
                  </div>
                  <button className="botons" type="submit">Guardar</button>
                  {formSave && <p className="save">Se guardaron los datos</p>}
              </form>
            )}
          </Formik>
        </>
      </div>
    )
}

export default App;
