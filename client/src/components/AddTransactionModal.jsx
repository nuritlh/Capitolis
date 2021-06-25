import { css } from '@emotion/css'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import { addTransaction } from '../api/index'
import { Input } from './Input'

function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

export const AddTransactionModal = ({ transactions }) => {
  const classes = useStyles()
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle)
  const [open, setOpen] = React.useState(false)
  const [amount, setAmount] = useState(0)
  const [name, setName] = useState('')

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const add = async () => {
    const result = await addTransaction({ name, amount })
    transactions(result)
    handleClose()
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Add New Transaction</h2>
      <div className={inputs}>
        <Input label="amount" onChange={(amount) => setAmount(amount)} />
        <Input label="Counterparty" onChange={(name) => setName(name)} />
      </div>
      <Button variant="outlined" color="primary" onClick={add}>
        Add
      </Button>
    </div>
  )

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Add New Transactions
      </button>
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
