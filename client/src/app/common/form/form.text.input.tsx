import { useField } from 'formik';
import { Form, Label } from 'semantic-ui-react';

interface Props {
  placeholder: string;
  name: string;
  type?: string;
  label?: string;
}

export default function FormTextInput(props: Props): JSX.Element {
  const [field, meta] = useField(props.name);
  return (

  <Form.Field error={meta.touched && !!meta.error}>
    <label>{props.label}</label>
    <input {...field} {...props}/>
    {meta.touched && meta.error ? (
      <Label basic color='red'>{meta.error}</Label>
    ) : null}
  </Form.Field>

  )
}