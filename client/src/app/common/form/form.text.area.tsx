import { useField } from 'formik';
import { Form, Label } from 'semantic-ui-react';

interface Props {
  placeholder: string;
  name: string;
  type?: string;
  label?: string;
  rows: number;
}

export default function FormTextArea(props: Props): JSX.Element {
  const [field, meta] = useField(props.name);
  return (

  <Form.Field error={meta.touched && !!meta.error}>
    <label>{props.label}</label>
    <textarea {...field} {...props}/>
    {meta.touched && meta.error ? (
      <Label basic color='red'>{meta.error}</Label>
    ) : null}
  </Form.Field>

  )
}