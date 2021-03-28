import React, { useState, useContext } from "react"
import $ from "jquery"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import firebase from "../../config/fbConfig"
import { HelmetContext } from "../../context/HelmetContext"
import HelmetData from "./HelmetData"
import { NavLink, Redirect } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

const CreateGroup = () => {
  const { helmet, dispatch } = useContext(HelmetContext)
  const { currentUser, userProfile } = useContext(AuthContext)
  const [personGroup, setPersonGroup] = useState({
    detected: [],
    groupName: null,
    groupID: null,
  })

  const handleChange = (e) => {
    setPersonGroup({
      ...personGroup,
      [e.target.id]: e.target.value,
    })
    // console.log(personGroup)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  if (userProfile != null) {
    if (Object.entries(userProfile).length != 0) {
      return (
        <>
          <Container
            style={{
              marginBottom: "40px",
              marginTop: "40px",
              color: "black",
            }}
          >
            <Row>
              <Col lg={3}>
                <br />
                <Card>
                  <Card.Body>
                    <Card.Title>Controls</Card.Title>
                    <br />
                    <Button
                      variant="primary"
                      to="/qrscan"
                      as={NavLink}
                      style={{
                        height: "10vh",
                        paddingTop: "3vh",
                        fontSize: "1em",
                      }}
                      block
                    >
                      Scan
                    </Button>
                    <br />
                    <Button
                      variant="success"
                      to="/users"
                      as={NavLink}
                      style={{
                        height: "10vh",
                        paddingTop: "3vh",
                        fontSize: "1em",
                      }}
                      block
                    >
                      Employees
                    </Button>
                    <br />
                    <Button
                      variant="danger"
                      to="/logs"
                      as={NavLink}
                      style={{
                        height: "10vh",
                        paddingTop: "3vh",
                        fontSize: "1em",
                      }}
                      block
                    >
                      Logs
                    </Button>
                    <br />
                    {/* <Button
                    variant="info"
                    onClick={() => {
                      // var objShell = new ActiveXObject("shell.application")
                      // objShell.ShellExecute("cmd.exe", "dir", 1)
                    }}
                    // to="/qrscan"
                    // as={NavLink}
                    // style={{
                    //   height: "10vh",
                    //   fontSize: "1em",
                    //   paddingTop: "3vh",
                    // }}
                    block
                  >
                    Settings
                  </Button> */}
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={9}>
                <HelmetData />
              </Col>
            </Row>
          </Container>
        </>
      )
    }
  } else {
    return <Redirect to="/" />
  }
  return <div></div>
}

export default CreateGroup
