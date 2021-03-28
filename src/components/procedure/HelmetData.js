import React, { useContext, useEffect, useState } from "react"
import { Container, Table, Form, Row, Col } from "react-bootstrap"
import { HelmetContext } from "../../context/HelmetContext"
import { UserContext } from "../../context/UserContext"
import Moment from "react-moment"
import moment from "moment"
import "moment-timezone"
import { LogsContext } from "../../context/LogContext"

const HelmetData = () => {
  const { helmet, dispatch } = useContext(HelmetContext)
  const { users } = useContext(UserContext)
  const [localUsers, setLocalUsers] = useState(users)
  const [tempList, setTempList] = useState([])
  const [dateList, setDateList] = useState([])
  const [localPersons, setLocalPersons] = useState(null)
  const { logs } = useContext(LogsContext)
  const [logsList, setLogsList] = useState(null)
  const [logsLengthToday, setLogsLengthToday] = useState(null)
  let ctr = 0

  useEffect(() => {
    console.log(logs)
    if (logs && logs.length) {
      setLogsList(logs[0].detected)
    }
  }, [logs])
  useEffect(() => {
    const dateNow = new Date(Date.now())
    const dateFmt = moment(dateNow).format("YYYY-MM-DD")
    console.log(dateFmt)
    if (logsList && logsList.length) {
      const filteredLogs = logsList.filter(
        (l) =>
          moment(new Date(0).setUTCSeconds(l.date.seconds)).format(
            "YYYY-MM-DD"
          ) === dateFmt
      )
      console.log(filteredLogs)
      setLogsLengthToday(filteredLogs.length)
    }
  }, [logsList])
  useEffect(() => {
    setLocalUsers(users)
  }, [users])

  useEffect(() => {
    let detectedIds = helmet
      ? helmet.map((helm) =>
          helm.detected ? helm.detected.map((h) => h) : false
        )
      : null

    detectedIds = detectedIds ? detectedIds.filter((d) => d) : null
    detectedIds = detectedIds[0] //group index (0)
    // console.log(detectedIds)
    let tl = []
    let localPersonsTemp = []
    let locTemp = localUsers
    let dt = []

    if (detectedIds) {
      for (let i = 0; i != detectedIds.length; i++) {
        for (let j = 0; j != locTemp.length; j++) {
          let n = locTemp[j].fname + " " + locTemp[j].lname
          // console.log(detectedIds[i].name)
          // console.log(n)
          if (detectedIds[i].name == n) {
            tl.push(detectedIds[i].Temp)
            dt.push(detectedIds[i].date)
            localPersonsTemp.push(locTemp[j])
            // console.log(tl)
          }
        }
      }
      // console.log(dt)
      setTempList(tl)
      setDateList(dt)
    }
    setLocalPersons(localPersonsTemp)
  }, [helmet, localUsers])

  useEffect(() => {
    if (tempList.length) {
      if (document.getElementById((tempList.length - 1).toString())) {
        for (let i = 0; i != tempList.length; i++) {
          if (document.getElementById(i.toString()).textContent > 37) {
            document.getElementById(i.toString()).style.backgroundColor =
              "#ff4541"
          } else if (document.getElementById(i.toString()).textContent == "") {
            document.getElementById(i.toString()).style.backgroundColor =
              "#eaf4f4"
          } else {
            document.getElementById(i.toString()).style.backgroundColor =
              "#4caf50"
          }
        }
      }
    }
  }, [tempList])

  const handleChange = () => {}
  return (
    <Container>
      <br />
      <br />
      <h4>Dashboard</h4>
      <br />
      <Row>
        <Col>
          <div
            className="right-dash"
            style={{
              borderRadius: "0.3em",
              backgroundColor: "red",
              textAlign: "center",
              paddingTop: "5vh",
              paddingBottom: "5vh",
              color: "white",
            }}
          >
            <h3 style={{ fontWeight: "bold" }}>{users ? users.length : "0"}</h3>
            <p>number of employees</p>
          </div>
        </Col>
        <Col>
          <div
            className="left-dash"
            style={{
              borderRadius: "0.3em",
              backgroundColor: "blue",
              textAlign: "center",
              paddingTop: "5vh",
              paddingBottom: "5vh",
              color: "white",
            }}
          >
            <h3 style={{ fontWeight: "bold" }}>
              {logsLengthToday ? logsLengthToday : "0"}
            </h3>
            <p>number of Scan today</p>
          </div>
        </Col>
      </Row>
      <br />
      <hr />
      <br />

      <Table size="sm" striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Temperature</th>
          </tr>
        </thead>

        <tbody>
          {localPersons && tempList
            ? localPersons.map((loc, index) => (
                <tr key={loc.id}>
                  <td>
                    <Moment>
                      {new Date(0).setUTCSeconds(dateList[ctr].seconds)}
                    </Moment>
                  </td>
                  <td>{loc.fname + " " + loc.lname}</td>
                  <td id={index}>{tempList[ctr++]}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    </Container>
  )
}

export default HelmetData
