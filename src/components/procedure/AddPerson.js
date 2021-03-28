import React, { useState, useContext, useEffect } from "react"
import { Container, Button, Card, Form } from "react-bootstrap"
// import FileBase  from 'react-file-reader';
import FileBase from "react-file-base64"
import $ from "jquery"
import firebase from "../../config/fbConfig"
import { UserContext } from "../../context/UserContext"
import { Redirect, withRouter } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { HelmetContext } from "../../context/HelmetContext"

const AddPerson = ({ history }) => {
  // const { dispatch } = useContext(UserContext)
  const { dispatch, currentUser, userProfile } = useContext(AuthContext)
  const { helmet } = useContext(HelmetContext)
  const [group, setGroup] = useState([null])
  const [img, setImg] = useState([])
  const [user, setUser] = useState({
    fname: null,
    lname: null,
    address: null,
    age: null,
    password: null,
    email: null,
    isAdmin: false,
  })

  const onSelectImg = (files) => {
    let im = files.map((i) => i.base64)
    setImg(im)
    // document.getElementById('photo-length').innerHTML = files.base64.length + " items"
  }

  const handleGroup = (e) => {
    setGroup(e.target.value)
  }

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      user.fname == null ||
      user.lname == null ||
      user.address == null ||
      user.email == null
    ) {
      alert("Complete Person Details!")
    } else {
      let helm = helmet[0].detected
      let userD = {
        Temp: 0,
        date: new Date(),
        name: user.fname + " " + user.lname,
      }
      const regbtn = document.getElementById("reg-btn")
      regbtn.textContent = "Wait.."

      firebase
        .auth()
        .fetchSignInMethodsForEmail(user.email)
        .then((e) => {
          if (e.length) {
            alert("email exists")
          } else {
            dispatch({ type: "SIGNUP", user })
            firebase
              .firestore()
              .collection("persons")
              .add({
                user,
              })
              .catch((err) => {
                dispatch({ type: "ADD_USER_ERROR", err })
              })
            firebase
              .firestore()
              .collection("helmets")
              .doc("hNh8dbIWxENzzOljNBDA")
              .update({
                detected: [...helm, userD],
              })

            alert("Done!!")
            history.push("/users")
          }
        })
        .catch((err) => console.log(err))
    }
  }
  if (userProfile != null) {
    if (Object.entries(userProfile).length != 0) {
      return (
        <Container style={{ marginBottom: "40px", marginTop: "40px" }}>
          <Card>
            <Card.Body>
              <Card.Title>Add Employee</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="fname">
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="lname">
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="address">
                  <Form.Label>Address:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="age">
                  <Form.Label>Age:</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Age"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group style={{ marginTop: "30px" }}>
                  <Button
                    variant="outline-primary"
                    type="submit"
                    id="reg-btn"
                    block
                  >
                    Register
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      )
    }
  } else {
    return <Redirect to="/" />
  }
  return <div></div>
}

export default withRouter(AddPerson)
