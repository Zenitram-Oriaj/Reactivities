import { ErrorMessage, Form, Formik } from "formik";
import FormTextInput from "../../app/common/form/form.text.input";
import { Button, Label } from "semantic-ui-react";
import { store } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function LoginForm(): JSX.Element {
  const {userStore} = store;

  return (
    <Formik
      initialValues={{email: '', password: '', error: null}}
      onSubmit={(values, {setErrors}) => userStore.login(values).catch((err: unknown) => setErrors({error: "Invalid Email or Password"}))}
      >
        {({handleSubmit, isSubmitting, errors}) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <FormTextInput placeholder="Email" name="email" type="text"/>
            <FormTextInput placeholder="Password" name="password" type="password"/>
            <ErrorMessage name="error" render={() => <Label style={{marginBottom: 10}} basic color="red" content={errors.error}/>}/>
            <Button loading={isSubmitting} positive content="Login" type="submit" fluid />
          </Form>
        )}
      </Formik>
  );
});
