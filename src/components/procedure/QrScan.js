import React, { useState, useContext, useEffect } from "react"
import { Row, Col, Container, Form } from "react-bootstrap"
import Webcam from "react-webcam"
import { UserContext } from "../../context/UserContext"
import axios from "axios"
import { HelmetContext } from "../../context/HelmetContext"
import firebase from "../../config/fbConfig"
import { LogsContext } from "../../context/LogContext"
import { storage } from "../../config/fbConfig"
import helm from "../../img/helm.png"
import FocusLock from "react-focus-lock"
import Moment from "react-moment"

function QrScan() {
  const [qrCode, setQrCode] = useState(null)
  const [specEmployee, setSpecEmployee] = useState(null)
  const { users } = useContext(UserContext)
  const { helmet } = useContext(HelmetContext)
  const { logs, dispatch } = useContext(LogsContext)
  const [tempString, setTempString] = useState(null)
  const [imageFile, setImageFile] = useState(null)

  useEffect(() => {
    const su = users.filter((u) => u.id === qrCode)
    setSpecEmployee(su)
  }, [qrCode])

  useEffect(() => {
    console.log(specEmployee)
    if (specEmployee && specEmployee.length) {
      axios.get("http://localhost:4000").then((data) => {
        setTempString(data.data)
      })
    }
  }, [specEmployee])

  useEffect(() => {
    if (tempString) {
      let helm = helmet[0].detected
      let log = logs[0].detected
      let userD = {
        Temp: tempString,
        date: new Date(),
        name: specEmployee[0].fname + " " + specEmployee[0].lname,
      }
      firebase
        .firestore()
        .collection("helmets")
        .doc("hNh8dbIWxENzzOljNBDA")
        .update({
          detected: [...helm, userD],
        })
        .then(() => {
          firebase
            .firestore()
            .collection("logs")
            .doc("JU3KzPF6Ddd4AtyDK5DW")
            .update({
              detected: [...log, userD],
            })
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
    }
  }, [tempString])

  function dataURItoBlob(dataURI, callback) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(",")[1])

    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length)
    var ia = new Uint8Array(ab)
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }

    // write the ArrayBuffer to a blob, and you're done
    var bb = new Blob([ab])
    return bb
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  useEffect(() => {
    if (specEmployee && specEmployee.length && imageFile) {
      const blobf = dataURItoBlob(imageFile)

      const uploadTask = storage
        .ref(
          "logs/" +
            specEmployee[0].fname +
            "-" +
            specEmployee[0].lname +
            "/" +
            new Date().toString() +
            ".jpg"
        )
        .put(blobf)
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error)
        }
      )
      // console.log(imageFile)
    }
  }, [imageFile, specEmployee])
  let imageSrc = null
  const webcamRef = React.useRef(null)

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  }

  const capture = React.useCallback(() => {
    let d = new Date()
    let barIn = document.getElementById("idQuery")

    if (barIn.value.length == 20) {
      setQrCode(barIn.value)

      let today = new Date()
      let date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate()
      let time =
        today.getHours() +
        ":" +
        today.getMinutes() +
        ":" +
        today.getUTCSeconds()
      // let f = today.get

      imageSrc = webcamRef.current.getScreenshot()
      let im = document.getElementById("ims")
      im.src = imageSrc
      setImageFile(imageSrc)
      barIn.value = ""
      // console.log(imageSrc)

      // navigator.geolocation.getCurrentPosition((position) => {
      //   props.setLocation({
      //     lat: position.coords.latitude,
      //     long: position.coords.longitude,
      //   })
      // })
    }
  }, [webcamRef])
  return (
    <Container>
      <Row>
        <Col
          lg={5}
          style={{
            backgroundColor: "#3d3d3d",
            marginTop: "10vh",
            marginLeft: "1vw",
            padding: "2.5em",
            borderRadius: "5px",
            color: "white",
          }}
          className="qr-panel"
        >
          <h4>QR Scan</h4>
          <br />
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="idQuery">
              <Form.Label>Scan:</Form.Label>
              <FocusLock>
                <Form.Control type="text" onChange={capture} />
              </FocusLock>
            </Form.Group>
          </Form>

          <hr />
          <br />
          <Webcam
            audio={false}
            height={240}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            videoConstraints={videoConstraints}
            mirrored={true}
          />
        </Col>
        <Col
          lg={6}
          style={{
            backgroundColor: "#cae1e1",
            marginTop: "10vh",
            marginLeft: "1vw",
            padding: "2.5em",
            borderRadius: "5px",
          }}
          className="qr-panel"
        >
          <br />
          <div style={{ width: "100%" }}>
            <img
              id="ims"
              width="200vw"
              style={{ marginLeft: "28%", borderRadius: "5px" }}
            />
          </div>
          <br />
          {specEmployee && specEmployee.length ? (
            <ul style={{ listStyle: "none", color: "#3d3d3d" }}>
              <li>
                <span
                  style={{
                    color: "#fe652f",
                    fontSize: "1.3em",
                    fontWeight: "bold",
                  }}
                >
                  {specEmployee[0].fname + " " + specEmployee[0].lname}
                </span>
              </li>
              <li>
                Age: <span>{specEmployee[0].age}</span>
              </li>
              <li>
                Address: <span>{specEmployee[0].address}</span>
              </li>
              <li>
                Email: <span>{specEmployee[0].email}</span>
              </li>
              <li>
                Date:{" "}
                <span>
                  <Moment>{new Date()}</Moment>
                </span>
              </li>
              <li>
                Temperature: <span>{tempString ? tempString : null}</span>
              </li>
            </ul>
          ) : null}
        </Col>
      </Row>
    </Container>
  )
}

export default QrScan
