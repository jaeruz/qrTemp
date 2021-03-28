import React, { useContext, useEffect, useState } from "react"
import { Col, Container, Row, Modal } from "react-bootstrap"
import { AuthContext } from "../../context/AuthContext"
import Content from "./Content"
import SidePanel from "./SidePanel"
import { storage } from "../../config/fbConfig"
import { Link } from "react-router-dom"

function Employee() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const { currentUser, userProfile } = useContext(AuthContext)
  const [specificImageList, setspecificImageList] = useState([])
  useEffect(() => {
    // console.log(userProfile)

    if (userProfile) {
      storage
        .ref("logs")
        .child(userProfile.fname + "-" + userProfile.lname)
        .listAll()
        .then((res) => {
          // console.log(res)

          let tempList = []
          for (let i = 0; i != res.items.length; i++) {
            let temp = {
              name: "",
              link: "",
            }
            temp["name"] = res.items[i].name
            storage
              .ref("logs")
              .child(
                userProfile.fname +
                  "-" +
                  userProfile.lname +
                  "/" +
                  res.items[i].name
              )
              .getDownloadURL()
              .then((resu) => {
                // console.log(resu)
                temp["link"] = resu
                tempList.push(temp)
              })
          }
          // console.log(tempList)
          setspecificImageList(tempList)
        })
    }
  }, [userProfile])

  useEffect(() => {
    console.log(specificImageList)
  }, [specificImageList])

  return (
    <Container>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-md">
            <h6>Scan Images</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          {specificImageList.length ? (
            specificImageList.map((sil) => {
              return (
                <>
                  <a href={sil.link}>{sil.name}</a>
                  <br />
                </>
              )
            })
          ) : (
            <p>No Result</p>
          )}
        </Modal.Body>
      </Modal>
      <Row>
        <Col lg={4}>
          <SidePanel userProfile={userProfile} handleShow={handleShow} />
        </Col>
        <Col lg={8}>
          <Content userProfile={userProfile} />
        </Col>
      </Row>
    </Container>
  )
}

export default Employee
