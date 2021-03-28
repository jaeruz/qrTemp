import React, { useContext, useEffect, useState } from "react"
import { Table, Row, Col } from "react-bootstrap"
import { LogsContext } from "../../context/LogContext"
import { MDBDataTable } from "mdbreact"
import moment from "moment"
import { HelmetContext } from "../../context/HelmetContext"

function Content({ userProfile }) {
  const { logs, dispatch } = useContext(LogsContext)
  const [logsList, setLogsList] = useState(null)
  const [specLogs, setSpecLogs] = useState(null)
  const { helmet } = useContext(HelmetContext)
  const [lastTemp, setLastTemp] = useState(null)

  useEffect(() => {
    if (helmet && helmet.length && userProfile) {
      const temp = helmet[0].detected.filter(
        (f) => f.name === userProfile.fname + " " + userProfile.lname
      )
      console.log(temp)
      setLastTemp(temp[0].Temp)
    }
  }, [helmet, userProfile])

  useEffect(() => {
    console.log(lastTemp)
  }, [lastTemp])

  const [data, setData] = useState({
    columns: [
      {
        label: "Date",
        field: "date",
        sort: "asc",
        width: 150,
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Temp",
        field: "Temp",
        sort: "asc",
        width: 150,
      },
    ],
    rows: specLogs ? specLogs : null,
  })
  useEffect(() => {
    console.log(logs)
    if (logs && logs.length) {
      setLogsList(logs[0].detected)
    }
  }, [logs])
  useEffect(() => {
    console.log(logsList)
    if (logsList && logsList.length) {
      const specName = userProfile.fname + " " + userProfile.lname
      const filteredLogs = logsList.filter((l) => l.name === specName)
      console.log(filteredLogs)
      const modifiedLogs = []
      for (let i = 0; i != filteredLogs.length; i++) {
        modifiedLogs.push({
          Temp: filteredLogs[i].Temp,
          name: filteredLogs[i].name,
          date: moment(
            new Date(0).setUTCSeconds(filteredLogs[i].date.seconds)
          ).format("M/D/YYYY H:mm"),
        })
      }
      console.log(modifiedLogs)
      setSpecLogs(modifiedLogs)
    }
  }, [logsList])
  useEffect(() => {
    if (specLogs && specLogs.length) {
      setData({ ...data, rows: specLogs })
    }
  }, [specLogs])
  return (
    <div className="employee-content">
      <Row>
        <Col>
          <div
            className="right-dash"
            style={{
              borderRadius: "0.3em",
              backgroundColor: "red",
              textAlign: "center",
              paddingTop: "3vh",
              paddingBottom: "3vh",
            }}
          >
            <h3>{lastTemp ? lastTemp : "0"}</h3>
            <p>Latest Temperature</p>
          </div>
        </Col>
      </Row>
      <br />

      <h3>Activity log</h3>

      <div style={{ overflowX: "scroll" }}>
        <MDBDataTable
          entries={2}
          striped
          bordered
          small
          entriesOptions={[2, 3]}
          striped
          hover
          className="data-style-route"
          data={data}
          sortable={true}
        />
      </div>
    </div>
  )
}

export default Content
