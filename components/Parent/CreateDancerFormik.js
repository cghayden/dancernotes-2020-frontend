import React, { Component } from "react";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import gql from "graphql-tag";
// import Form from "../styles/Form";
import Error from "../Error";
import { PARENT_USER_QUERY } from "./ParentUserQuery";
import { DancerCardHeaderStyles } from "./DancerCard";

import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

const CREATE_DANCER = gql`
  mutation CREATE_DANCER($firstName: String!, $avatar: String) {
    createDancer(firstName: $firstName, avatar: $avatar) {
      id
      firstName
      avatar
    }
  }
`;

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div className="input-item">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const CreateDancerFormik = () => {
  const [createDancer, { data, loading, error }] = useMutation(CREATE_DANCER, {
    refetchQueries: ["ParentUser"]
  });

  return (
    <>
      <h2>Add a Dancer</h2>
      {/* <DancerCardHeaderStyles>
            <ImageDiv avatar={avatar}>
              {avatar ? (
                <img src={avatar} alt={`dancer's picture`} />
              ) : (
                <p>{firstName && firstName[0]}</p>
              )}
            </ImageDiv>
          </DancerCardHeaderStyles> */}

      <Formik
        initialValues={{
          firstName: ""
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .min(2, "Must be 15 characters or less")
            .required("Required")
        })}
        onSubmit={async (values, { setSubmitting }) => {
          // e.preventDefault();
          // alert(JSON.stringify(values, null, 2));
          await createDancer({ variables: { firstName: values.firstName } });
          // setSubmitting(false);
          // toggleAddDancer(false);
        }}
      >
        <Form>
          <fieldset disabled={loading} aria-busy={loading}>
            <Error error={error} />
            <MyTextInput label="First Name" name="firstName" type="text" />
            <button type="submit">Add Dancer to my Account</button>
            <button type="button" onClick={() => toggleAddDancer(false)}>
              Cancel
            </button>
          </fieldset>
        </Form>
      </Formik>
    </>
  );
};

//same as DancerCard with z-index to put it on top of cardBody(form)
const ImageDiv = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto;
  border-radius: 50%;
  background: ${props => props.theme.gray2};
  position: absolute;
  top: -60px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  border: 5px solid ${props => props.theme.gray0};
  text-align: center;
  z-index: 1;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  p {
    font-size: 5rem;
  }
`;

export default CreateDancerFormik;
