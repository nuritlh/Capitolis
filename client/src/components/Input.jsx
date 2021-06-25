import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}))

export const Input = ({ label, onChange }) => {
  const classes = useStyles()

  const handelOnChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          label={label}
          id="outlined-size-small"
          defaultValue={0}
          variant="outlined"
          size="small"
          onChange={handelOnChange}
        />
      </div>
    </form>
  )
}
