import React, { useState, useEffect } from "react"
import { Card, Button, Row, Col, Modal, Form } from "react-bootstrap"
import Avatar from "react-avatar"
import { FaTrashAlt, FaUserEdit } from "react-icons/fa"
import firebase from "../../config/fbConfig"
const UserList = ({ editState, users, toggleDelete, history }) => {
  //modal
  const [show, setShow] = useState(false)
  const [selectedUser, setSelectedUser] = useState({
    fname: "",
    lname: "",
    age: "",
    address: "",
    email: "",
    id: "",
  })
  const [updateForm, setUpdateForm] = useState({
    fname: "",
    lname: "",
    age: "",
    address: "",
    email: "",
    id: "",
  })
  useEffect(() => {
    console.log(selectedUser)
    if (selectedUser) {
      setUpdateForm({
        fname: selectedUser.fname,
        lname: selectedUser.lname,
        age: selectedUser.age,
        address: selectedUser.address,
        email: selectedUser.email,
        id: selectedUser.id,
      })
    }
  }, [selectedUser])

  const handleClose = () => setShow(false)
  const handleShow = (fname, lname, age, address, email, id) => {
    setSelectedUser({
      fname: fname,
      lname: lname,
      age: age,
      address: address,
      email: email,
      id: id,
    })

    setShow(true)
  }

  //modal
  const handleViewProfile = (id) => {
    history.push("/profile/" + id)
  }

  const deleteUser = (id, personID, group) => {
    toggleDelete(id, personID, group)
  }
  const updateFormChange = (e) => {
    setUpdateForm({
      ...updateForm,
      [e.target.id]: e.target.value,
      id: selectedUser.id,
    })
    console.log(updateForm)
  }
  const updateUser = () => {
    console.log(updateForm.id)

    firebase
      .firestore()
      .collection("persons")
      .doc(updateForm.id)
      .set({
        user: {
          ...updateForm,
        },
      })
      .catch((err) => {
        console.log(err)
        // dispatch({ type: "ADD_USER_ERROR", err })
      })

    handleClose()
  }
  return (
    <div>
      <div className="modal-edit">
        <Modal
          show={show}
          onHide={handleClose}
          animation={false}
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title className="modal-edit-title">
              <h6>Edit Profile </h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-edit-title">
            <Form>
              <Form.Group controlId="fname">
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue={selectedUser.fname}
                  onChange={updateFormChange}
                />
              </Form.Group>
              <Form.Group controlId="lname">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue={selectedUser.lname}
                  onChange={updateFormChange}
                />
              </Form.Group>
              <Form.Group controlId="age">
                <Form.Label>Age:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue={selectedUser.age}
                  onChange={updateFormChange}
                />
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>Address:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue={selectedUser.address}
                  onChange={updateFormChange}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  required
                  type="email"
                  defaultValue={selectedUser.email}
                  onChange={updateFormChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" size="sm" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" size="sm" onClick={() => updateUser()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <p className="grey-text" style={{ textAlign: "center" }}>
        Click to View More
      </p>
      {users.length ? (
        users.map((user) => (
          <Card key={user.id} style={{ marginBottom: "20px" }}>
            <Row style={{ textAlign: "center" }}>
              <Col sm={3} md={3} lg={2}>
                <Avatar
                  size="80"
                  name={user.fname + " " + user.lname}
                  round={true}
                  style={{ margin: "20px" }}
                />
              </Col>
              <Col sm={6} md={7} lg={8}>
                <div style={{ padding: "20px" }}>
                  <h5 className="grey-text">
                    Name: {user.fname + " " + user.lname}
                  </h5>
                  <h5 className="grey-text">Age: {user.age}</h5>
                </div>
              </Col>
              <Col sm={3} md={2} lg={2}>
                {editState ? (
                  <>
                    <Button
                      variant="info"
                      style={{ height: "50%", margin: "1px" }}
                      onClick={() =>
                        handleShow(
                          user.fname,
                          user.lname,
                          user.age,
                          user.address,
                          user.email,
                          user.id
                        )
                      }
                      block
                    >
                      <FaUserEdit style={{ fontSize: "25px" }} />
                    </Button>
                    <Button
                      variant="danger"
                      style={{ height: "50%", margin: "1px" }}
                      onClick={() =>
                        deleteUser(user.id, user.personID, user.email)
                      }
                      block
                    >
                      <FaTrashAlt style={{ fontSize: "25px" }} />
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="info"
                    style={{ height: "100%", margin: "1px", width: "100%" }}
                    onClick={() => handleViewProfile(user.id)}
                    block
                  >
                    View Profile
                  </Button>
                )}
              </Col>
            </Row>
          </Card>
        ))
      ) : (
        <p>no result</p>
      )}
    </div>
  )
}

export default UserList
