import './Paginator.scss';
import {Button, ButtonGroup} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

interface Props{
  page: number;
  total: number;
  perPage: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  disabled: boolean;
  error?: string;
}

export const Paginator = (props: Props) => {
  return (
    <div className='Paginator'>
      <p>Mostrando {props.perPage * (props.page - 1) + 1} - {props.perPage * props.page} de {props.total}</p>
      <ButtonGroup color='primary' className='Results-pagination-buttons'>
        <Button
          disabled={props.disabled || props.page === 1}
          onClick={props.onPrevPage}>
          Prev
        </Button>
        <Button
          disabled={props.disabled || props.page === Math.ceil(props.total / props.perPage)}
          onClick={props.onNextPage}>
          Next
        </Button>
      </ButtonGroup>
      {props.error && <Alert severity="error">{props.error}</Alert>}
    </div>
  )
}
