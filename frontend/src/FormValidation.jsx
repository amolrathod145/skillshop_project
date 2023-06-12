import React from 'react'
import { useFormik } from "formik"
import * as yup from "yup"
export default function FormValidation() {
    const formik = useFormik({
        initialValues: {
            firstName: "",
            email: ""
        },
        validationSchema: yup.object({
            firstName: yup.string()
                .min(2, "Too Short")
                .max(5, "Too Large")
                .required("First Name is required"),
            email: yup.string()
                .email("Invalid Email")
                .required("Email required")
        }),
        onSubmit: values => console.warn(values)
    })
    return (
        <div className='container'>
            {
                JSON.stringify(formik.errors)
            }

            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input
                        name='firstName'
                        type="text"
                        className={`
                        form-control 
                        ${formik.touched.firstName
                                && formik.errors.firstName
                                ? "is-invalid" : null
                            }
                        `}
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className='invalid-feedback'>{formik.errors.firstName}</span>
                </div>
                <br />
                <div>
                    <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-control ${formik.touched.email
                                && formik.errors.email
                                ? 'is-invalid' : null
                            }`}
                    />
                    <span className='invalid-feedback'>{formik.errors.email}</span>
                </div>
                <button className='btn btn-success' type='submit'>Signup</button>
            </form>
        </div>
    )
}
