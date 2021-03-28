import React, { useContext, useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Redirect } from "react-router-dom"
import { Container, Image, Spinner } from "react-bootstrap"
import helm from "../../img/motor.jpg"

const Home = ({ setLoginModal, loginModal }) => {
  const { currentUser, userProfile } = useContext(AuthContext)
  useEffect(() => {
    console.log(userProfile)
  }, [userProfile])
  if (userProfile != null) {
    if (Object.entries(userProfile).length != 0 && userProfile.isAdmin) {
      return <Redirect to="/creategroup" />
    } else {
      return <Redirect to="/employee" />
    }
  } else {
    return (
      <Container>
        <div
          style={{
            marginTop: "100px",
            backgroundColor: "white",
            color: "black",
            padding: "50px",
            borderRadius: "20px",
            width: "100%",
          }}
        >
          <h1 style={{ marginBottom: "30px" }}>Welcome!</h1>
          <Image
            src={helm}
            width="20%"
            style={{ float: "left", margin: "0 30px 30px 0" }}
            thumbnail
          />
          <p style={{ fontSize: "1.3em" }}>
            Ninja Van is a technology-enabled express logistics company
            providing trouble-free delivery services to businesses of all sizes
            across Southeast Asia. Launched in 2014, Ninja Van began operations
            in Singapore and has become the region's largest and fastest-growing
            last-mile logistic company, with a network spanning six countries in
            South East Asia-Singapore, Malaysia, Philippines, Indonesia, and
            Thailand.
          </p>

          <div style={{ clear: "both" }}></div>
        </div>
      </Container>
    )
  }
  return (
    <div style={{ paddingTop: "30px", width: "100%" }}>
      <Spinner
        animation="border"
        role="status"
        style={{ display: "block", margin: "0 auto", color: "#FF652F" }}
      />
    </div>
  )
}

export default Home
