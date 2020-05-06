import styled from '@emotion/styled';

const FieldLabel = styled.span`
    display: inline-block;
    padding: 0 0.5rem;
    width: 8em;
    text-align: right;
`;

const FieldValue = styled.span`
    display: inline-block;
    font-weight: bold;
`;

const FieldInput = styled.input`
    padding: 0.5rem;
    width: 20em;
    font-size: 1em;
`;

const ButtonLink = styled.a`
    color: #fff;
    background-color: #0074d9;
    border-radius: 3px;
    font-family: "Open Sans", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: .875rem;
    font-weight: 700;
    font-weight: 500;
    cursor: pointer;
    display: inline-block;
    line-height: 1.125rem;
    padding: .5rem 1rem;
    height: auto;
    border: 1px solid transparent;
    vertical-align: middle;
    &:hover {
        box-shadow: inset 0 0 0 20rem rgba(0,0,0,.0625);
        text-decoration: none;
        color: white;
    }
    margin: 0.5rem;
`;

const FieldGroup = styled.ul`
    list-style: none;
    padding: 0.5rem 0;
`;

const FieldRow = styled.li`
    padding: 0.5rem 0;
`;

export {
    FieldLabel,
    FieldValue,
    FieldInput,
    ButtonLink,
    FieldGroup,
    FieldRow
};
