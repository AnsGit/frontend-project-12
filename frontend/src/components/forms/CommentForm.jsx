import { Formik, Form, Field } from 'formik';

const CommentForm = () => (
  <Formik
    initialValues={{ login: '', passowrd: '' }}
    onSubmit={({ setSubmitting }) => {
      console.log('Form was sent');
      setSubmitting(false);
    }}
  >
    <Form>
      <div className="form-group">
        <Field
          type="text"
          name="comment"
          className="form-control"
          label="Comment"
        />
      </div>

      <button type="submit">Submit</button>
    </Form>
  </Formik>
);

export default CommentForm;
