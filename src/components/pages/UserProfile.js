import React, { useContext } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { Col, Container, Row, Button, Modal, Form } from "react-bootstrap"
import { UserContext } from "../../context/UserContext"
import Avatar from "react-avatar"
import { FaRegEdit, FaQrcode } from "react-icons/fa"
import QRCode from "qrcode.react"
import Moment from "react-moment"
import "moment-timezone"
import { Redirect } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { HelmetContext } from "../../context/HelmetContext"
import { storage } from "../../config/fbConfig"

const UserProfile = (props) => {
  const { users, dispatch } = useContext(UserContext)
  const { helmet } = useContext(HelmetContext)
  const [specificUser, setSpecificUser] = useState(null)
  const [QRState, setQRState] = useState(false)
  const { currentUser, userProfile } = useContext(AuthContext)
  const [latestDetections, setLatestDetections] = useState([])
  const [specificUserTemp, setSpecificUserTemp] = useState(null)
  const [image, setImage] = useState(null)

  const downloadQR = (fname, lname) => {
    const canvas = document.getElementById("qr-code")
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream")
    let downloadLink = document.createElement("a")
    downloadLink.href = pngUrl
    downloadLink.download = fname + "-" + lname + ".png"
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }
  useEffect(() => {
    let id = props.match.params.id
    const su = users.filter((u) => id === u.id)
    setSpecificUser(su)
  }, [users])

  useEffect(() => {
    if (specificUser && specificUser.length && helmet && helmet.length) {
      const fullName = specificUser[0].fname + " " + specificUser[0].lname
      console.log(helmet[0].detected)
      const ltTemp = helmet[0].detected.filter((lt) => fullName === lt.name)
      console.log(ltTemp)
      setSpecificUserTemp(ltTemp[0].Temp)
      setLatestDetections(helmet[0].detected)

      storage
        .ref(specificUser[0].fname + "-" + specificUser[0].lname)
        .child("displaypic")
        .getDownloadURL()
        .then((url) => {
          setImage(url)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [specificUser, helmet])
  useEffect(() => {}, [])

  const handleImage = (e) => {
    if (e.target.files[0]) {
      const uploadTask = storage
        .ref(
          specificUser[0].fname + "-" + specificUser[0].lname + "/displaypic"
        )
        .put(e.target.files[0])
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error)
        },
        () => {
          storage
            .ref(specificUser[0].fname + "-" + specificUser[0].lname)
            .child("displaypic")
            .getDownloadURL()
            .then((url) => {
              setImage(url)
            })
        }
      )
    }
  }
  if (userProfile != null) {
    if (Object.entries(userProfile).length != 0) {
      return (
        <Container
          style={{
            padding: "30px 30px 90px 50px",
            marginTop: "8%",
            backgroundColor: "white",
            color: "black",
            borderRadius: "5px",
          }}
        >
          <h3 style={{ paddingTop: "10px", paddingBottom: "30px" }}>Profile</h3>
          <Modal
            show={QRState}
            onHide={() => setQRState(false)}
            dialogClassName="login-modal"
          >
            <div style={{ display: "block", marginTop: "50px" }}>
              {specificUser && specificUser.length ? (
                <>
                  <QRCode
                    value={specificUser[0].id}
                    id="qr-code"
                    style={{
                      display: "block",
                      margin: "0 auto",
                      width: "70%",
                      height: "70%",
                    }}
                  />
                  <Button
                    style={{ display: "block", margin: "30px auto" }}
                    onClick={() => {
                      downloadQR(specificUser[0].fname, specificUser[0].lname)
                    }}
                  >
                    Download
                  </Button>
                </>
              ) : null}
            </div>
          </Modal>

          {specificUser && specificUserTemp !== null ? (
            specificUser.length ? (
              <Row>
                <Col md={1}></Col>
                <Col md={4}>
                  <Avatar
                    size="120"
                    name={specificUser[0].fname + " " + specificUser[0].lname}
                    round={true}
                    style={{ margin: "30px" }}
                    src={image ? image : null}
                  />
                  <Form.Control type="file" onChange={handleImage} />
                </Col>
                <Col md={5}>
                  <h3>{specificUser[0].fname + " " + specificUser[0].lname}</h3>
                  Age: <p>{specificUser[0].age}</p>
                  Email: <p>{specificUser[0].email}</p>
                  Adddress: <p>{specificUser[0].address}</p>
                  Current temperature: <p>{specificUserTemp}</p>
                </Col>
                <Col md={1}>
                  <FaQrcode
                    style={{
                      fontSize: "50px",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => setQRState(true)}
                  />
                </Col>
              </Row>
            ) : (
              <p>loading..</p>
            )
          ) : null}
        </Container>
      )
    }
  } else {
    return <Redirect to="/" />
  }
  return <div></div>
}

export default UserProfile
