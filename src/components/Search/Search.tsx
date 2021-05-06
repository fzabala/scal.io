import './Search.scss';
import {useFormik} from 'formik';
import {Button, TextField} from "@material-ui/core";

interface Props {
  onSearch: (value: string) => void;
  disabled: boolean;
}

export const Search = (props: Props) => {
  const initialValues = {
    login: '',
  };

  const formik = useFormik({
    initialValues,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: values => props.onSearch(values.login)
  });

  return (
    <div className='Search'>
      <form onSubmit={formik.handleSubmit} className='Search-form'>
        <TextField
          disabled={props.disabled}
          name="login"
          id="search-login"
          label="Login"
          value={formik.values.login}
          onChange={formik.handleChange} />
        <Button
          disabled={props.disabled}
          className='Search-submit'
          type="submit"
          color="primary"
          variant="contained">
          Search
        </Button>
      </form>
    </div>
  )
}
