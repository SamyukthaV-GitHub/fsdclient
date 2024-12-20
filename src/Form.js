import React from 'react';
import {Formik,Field,Form} from 'formik';
import validator from 'validator';

function EmployeeForm(){
    
    const validateform=(values)=>{
        const errors={}

        if(!values.firstName){
            errors.firstName='Required'
        }

        if(!values.lastName){
            errors.lastName='Required'
        }

        if(!values.employeeId){
            errors.employeeId='Required'
        }else if(!/^[a-zA-Z0-9]{10}$/.test(values.employeeId)){
            errors.employeeId='Invalid Employee ID'
        }

        if(!values.email){
            errors.email='Required'
        }
        else if(!validator.isEmail(values.email)){
            errors.email='Email is not valid'
        }

        if(!values.phone){
            errors.phone='Required'
        }else if(!validator.isMobilePhone(values.phone,'en-IN')){
            errors.phone='Invalid Phone number'
        }

        if(!values.department){
            errors.department='Required'
        }

        if(!values.role){
            errors.role='Required'
        }

        if(!values.doj){
            errors.doj='Required'
        }else if(!validator.isDate(values.doj)){
            errors.doj='Invalid dateofJoing'
        }else if(new Date(values.doj)>new Date()){
            errors.doj='Future dates not allowed'
        }

        return errors;        
    };

    const handleSubmit=async(values)=>{
        try{
            const response=await fetch('https://fsdserver-k1o0.onrender.com/submit-form',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(values)
            });
            const result=await response.json();
            if(response.ok){
                alert('Form submitted successfully');
            }else{
                alert('Error: '+result.error);
            }
        }
        catch(error){
            alert('Failed to submit form: ',error);
        }
    };

    return (
        <div className="container container-fluid">
            <div className="row wrapper d-flex p-2">
                <div className="col-20 col-lg-5 d-flex p-2">
                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            employeeId:'',
                            email:'',
                            phone:'',
                            department:'',
                            doj:'',
                            role:''
                        }}
                        validate={validateform}
                        onSubmit={handleSubmit}
                    >
                        {(formik) => (
                            <Form className='pt-2 pb-5 px-5 shadow-lg'>
                                <h1 className="mb-4">
                                    Employee Form
                                </h1>

                                {/* firstName and Lastname */}
                                <div className="form-group mt-4 d-flex">
                                    <div className="me-3">
                                        <label htmlFor="firstName">FirstName</label>
                                        <Field
                                            name='firstName'
                                            type='text'
                                            className={
                                                formik.touched.firstName && formik.errors.firstName
                                                ? 'form-control is-invalid': 'form-control'
                                            }
                                        />
                                        {formik.touched.firstName && formik.errors.firstName && (
                                            <div className="invalid-feedback">{formik.errors.firstName}</div>
                                        )}
                                    </div>

                                    <div className="me-3">
                                        <label htmlFor="lastName">LastName</label>
                                        <Field
                                            name='lastName'
                                            type='text'
                                            className={
                                                formik.touched.lastName && formik.errors.lastName
                                                ? 'form-control is-invalid': 'form-control'
                                            }
                                        />
                                        {formik.touched.lastName && formik.errors.lastName && (
                                            <div className="invalid-feedback">{formik.errors.lastName}</div>
                                        )}
                                    </div>
                                </div>

                                {/* EmployeeId */}
                                <div className="form-group mt-4">
                                    <label htmlFor="employeeId">EmployeeId</label>
                                    <Field
                                        name='employeeId'
                                        type='text'
                                        className={
                                            formik.touched.employeeId && formik.errors.employeeId
                                            ? 'form-control is-invalid': 'form-control'
                                        }
                                    />
                                    {formik.touched.employeeId && formik.errors.employeeId && (
                                        <div className="invalid-feedback">{formik.errors.employeeId}</div>
                                    )}
                                </div>

                                {/* email */}
                                <div className="form-group mt-4">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        name='email'
                                        type='email'
                                        className={
                                            formik.touched.email && formik.errors.email
                                            ? 'form-control is-invalid': 'form-control'
                                        }
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <div className="invalid-feedback">{formik.errors.email}</div>
                                    )}
                                </div>

                                {/* phone number */}
                                <div className="form-group mt-4">
                                    <label htmlFor="phone">Phone Number</label>
                                    <Field
                                        name='phone'
                                        type='text'
                                        className={
                                            formik.touched.phone && formik.errors.phone
                                            ? 'form-control is-invalid': 'form-control'
                                        }
                                    />
                                    {formik.touched.phone && formik.errors.phone && (
                                        <div className="invalid-feedback">{formik.errors.phone}</div>
                                    )}
                                </div>

                                {/* department */}
                                <div className="form-group mt-4">
                                    <label htmlFor="department">Department</label>
                                    <Field
                                        name='department'
                                        as='select'
                                        className={
                                            formik.touched.department && formik.errors.department
                                            ? 'form-control is-invalid': 'form-control'
                                        }
                                    >
                                        <option value="">Select Department</option>
                                        <option value="HR">HR</option>
                                        <option value="manager">Manager</option>
                                        <option value="finance">Finance</option>
                                        <option value="marketing">Marketing</option>
                                        <option value="intern">Intern</option>

                                    </Field>
                                    {formik.touched.department && formik.errors.department && (
                                        <div className="invalid-feedback">{formik.errors.department}</div>
                                    )}
                                </div>

                                {/* doj */}
                                <div className="form-group mt-4">
                                    <label htmlFor="doj">Date of Joining</label>
                                    <Field
                                        name='doj'
                                        type='date'
                                        className={
                                            formik.touched.doj && formik.errors.doj
                                            ? 'form-control is-invalid': 'form-control'
                                        }
                                    />
                                    {formik.touched.doj && formik.errors.doj && (
                                        <div className="invalid-feedback">{formik.errors.doj}</div>
                                    )}
                                </div>

                                {/* role */}
                                <div className="form-group mt-4">
                                    <label htmlFor="role">Role</label>
                                    <Field
                                        name='role'
                                        type='text'
                                        className={
                                            formik.touched.role && formik.errors.role
                                            ? 'form-control is-invalid': 'form-control'
                                        }
                                    />
                                    {formik.touched.role && formik.errors.role && (
                                        <div className="invalid-feedback">{formik.errors.role}</div>
                                    )}
                                </div>

                                {/* buttons */}
                                <div className="form-group mt-4 d-flex justify-content-between">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                                <button
                                    type="reset"
                                    className="btn btn-secondary"
                                    onClick={() => formik.resetForm()}
                                >
                                    Reset
                                </button>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default EmployeeForm;