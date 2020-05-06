import React from 'react';
import { Link } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import Layout from '../../Layout';
import {
    FieldLabel,
    ButtonLink,
    FieldGroup,
    FieldRow,
    FieldInput
} from '../../Styles';

const ContactsNewPage = () => {
    const [createContact] = useMutation(
        gql`mutation createContact ($input: ContactInput!) {
            createContact(input: {contact: $input}) {
                clientMutationId
            }
        }`
    );

    return (
        <Layout>
            <h2>Create new contact</h2>

            <Formik
                initialValues={{}}
                onSubmit={(values, actions) => {
                    delete values.__typename;
                    createContact({
                        variables: {
                            input: values
                        }
                    });
                }}
            >
                <Form>
                    <FieldGroup>
                        <FieldRow>
                            <FieldLabel>Email:</FieldLabel>
                            <FieldInput
                                as={Field}
                                type='email'
                                name='email'
                                placeholder='Email'
                            />
                        </FieldRow>
                        <FieldRow>
                            <FieldLabel>Firstname:</FieldLabel>
                            <FieldInput
                                as={Field}
                                name='firstname'
                                placeholder='Firstname'
                            />
                        </FieldRow>
                        <FieldRow>
                            <FieldLabel>Lastname:</FieldLabel>
                            <FieldInput
                                as={Field}
                                name='lastname'
                                placeholder='Lastname'
                            />
                        </FieldRow>
                    </FieldGroup>

                    <ButtonLink as={Link}
                        to='./'
                    >Cancel
                    </ButtonLink>
                    <ButtonLink as='button'
                        type='submit'
                    >Submit
                    </ButtonLink>
                </Form>
            </Formik>
        </Layout>
    );
};

export default ContactsNewPage;
