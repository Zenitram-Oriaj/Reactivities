import { useField } from 'formik';
import { DropdownItemProps, DropdownProps, Form, Label, Select } from 'semantic-ui-react';

interface Props {
  placeholder: string;
  name: string;
  type?: string;
  label?: string;
  options: DropdownItemProps[];
}

export default function FormSelectInput(props: Props): JSX.Element {
  const [field, meta, helpers] = useField(props.name);
  return (

  <Form.Field error={meta.touched && !!meta.error}>
    <label>{props.label}</label>
    <Select 
      clearable
      options={props.options}
      value={field.value ?? null}
      onChange={(e: React.SyntheticEvent<HTMLElement, Event>, d: DropdownProps) => helpers.setValue(d.value)}
      onBlur={() => helpers.setTouched(true)}
      placeholder={props.placeholder}
    />
    {meta.touched && meta.error ? (
      <Label basic color='red'>{meta.error}</Label>
    ) : null}
  </Form.Field>

  )
}