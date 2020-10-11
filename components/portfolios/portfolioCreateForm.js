// Render Prop
 import React from 'react';
 import { Formik, Form, Field, ErrorMessage } from 'formik';
 import { Alert, Button } from "reactstrap";
import PortInput from '../form/Portinput';
import PortDate from '../form/PortDate';
import moment from "moment";

const validatedInputs =(values) =>{
    let errors ={};

    Object.entries(values).forEach(([key,value])=>{
     // debugger
         if (
           !values[key]
          ){
           errors[key] = `Fields ${key} Is Required`;
         } 
    });
     const startDate =values.startDate;
     const endDate =values.endDate;
     if (startDate && endDate && moment(endDate).isBefore(startDate)) {
       errors.endDate = "End Date cannot be before start date";
     }

    
 return errors;
    
    
}

 const PortfolioCreateForm = ({ initialValues, onSubmit, error }) => (
   <div>
     <Formik
       initialValues={initialValues}
       validate={validatedInputs}
       onSubmit={onSubmit}
     >
       {({ isSubmitting }) => (
         <Form>
           <Field
             type="text"
             name="title"
             label="Title"
             component={PortInput}
           />
           <Field
             type="text"
             name="company"
             label="Company"
             component={PortInput}
           />
           <Field
             type="text"
             name="location"
             label="Location"
             component={PortInput}
           />

           <Field
             type="text"
             name="position"
             label="Position"
             component={PortInput}
           />
           <Field
             type="textarea"
             name="description"
             label="Description"
             component={PortInput}
           />
           <Field
             initialDate={initialValues.startDate}
             label="Start Date"
             name="startDate"
             component={PortDate}
           />
           <Field
             initialDate={initialValues.endDate}
             label="End Date"
             name="endDate"
             component={PortDate}
           />
           {error && <Alert color="danger">{error}</Alert>}
           <Button
             type="submit"
             size="lg"
             color="success"
             disabled={isSubmitting}
           >
             Create
           </Button>
         </Form>
       )}
     </Formik>
   </div>
 );
 
 export default PortfolioCreateForm;

