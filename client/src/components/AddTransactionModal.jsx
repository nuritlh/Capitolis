import { css } from '@emotion/css'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import { addTransaction } from '../api/index'
import { Input } from './Input'

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '2rem',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

export const AddTransactionModal = ({ transactions }) => {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState(null)
  const [name, setName] = useState(null)
  const [amountError, setAmountError] = useState(false)
  const [nameError, setNameError] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setAmount(null)
    setName(null)
    setNameError(false)
    setAmountError(false)
    setOpen(false)
  }

  const onChangeAmount = (value) => {
    setAmountError(false)
    if (value !== '' && value !== '0') {
      setAmount(parseInt(value))
    } else {
      setAmountError(true)
    }
  }

  const onChangeName = (value) => {
    setNameError(false)
    if (value !== '') {
      setName(value)
    } else {
      setNameError(true)
    }
  }

  const add = async () => {
    if (amount !== null && name !== null) {
      const result = await addTransaction({ name, amount })
      transactions(result)
      handleClose()
      return
    }
    if (amount === null) setAmountError(true)
    if (name === null) setNameError(true)
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title" className={title}>
        Add New Transaction
      </h2>
      <div className={inputs}>
        <Input
          label="amount"
          onChange={onChangeAmount}
          error={amountError}
          helperText="The amount must be non-zero"
          type="number"
        />
        <Input
          label="Counterparty"
          onChange={onChangeName}
          error={nameError}
          helperText="Please fill in name"
          type="text"
        />
      </div>
      <Button variant="outlined" color="primary" onClick={add}>
        Add
      </Button>
    </div>
  )

  return (
    <div>
      <Button
        type="button"
        color="primary"
        variant="contained"
        onClick={handleOpen}
      >
        Add New Transactions
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  )
}

const inputs = css`
  display: flex;
`

const title = css`
  color: rgb(63, 81, 181);
`
