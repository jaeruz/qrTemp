import React, { useState, useEffect } from "react"
import { storage } from "../../config/fbConfig"
import Avatar from "react-avatar"
import { Row, Col, Button } from "react-bootstrap"

function SidePanel({ userProfile, handleShow }) {
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (userProfile && userProfile.fname) {
      console.log(userProfile)
      storage
        .ref(userProfile.fname + "-" + userProfile.lname)
        .child("displaypic")
        .getDownloadURL()
        .then((url) => {
          setImage(url)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [userProfile])

  return (
    <div className="employee-sidepanel">
      {userProfile ? (
        <>
          <div>
            <Row>
              <Col></Col>
              <Col>
                <Avatar
                  size="150"
                  name={userProfile.fname + " " + userProfile.lname}
                  round={true}
                  style={{ margin: "30px" }}
                  src={image ? image : null}
                />
              </Col>
              <Col></Col>
            </Row>
            <div style={{ textAlign: "center" }}>
              <h4>{userProfile.fname + " " + userProfile.lname}</h4>
            </div>
            <hr />
            <p>
              Address: <span>{userProfile.address}</span>
            </p>

            <p>
              Email: <span>{userProfile.email}</span>
            </p>
            <p>
              Age: <span>{userProfile.age}</span>
            </p>
          </div>
          <Button onClick={handleShow} variant="info" block>
            Show Image Logs
          </Button>
        </>
      ) : (
        <p>Loading..</p>
      )}
    </div>
  )
}

export default SidePanel
