import React, { useEffect, useContext, useState } from "react"
import { Container, Table } from "react-bootstrap"
import { LogsContext } from "../../context/LogContext"
import Moment from "react-moment"
import "moment-timezone"
import moment from "moment"
import { MDBDataTable } from "mdbreact"

function Logs() {
  const { logs, dispatch } = useContext(LogsContext)
  const [logsList, setLogsList] = useState([])
  const [logFinal, setLogFinal] = useState([])
  const [toggle, setToggle] = useState(false)

  function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.Temp
    const bandB = b.Temp
    let comparison = 0
    if (toggle) {
      if (bandA > bandB) {
        comparison = 1
      } else if (bandA < bandB) {
        comparison = -1
      }
    } else {
      if (bandA > bandB) {
        comparison = -1
      } else if (bandA < bandB) {
        comparison = 1
      }
    }

    return comparison
  }
  useEffect(() => {
    handleSort()
  }, [toggle])

  const handleSort = () => {
    console.log(logsList)
    let templog = logsList
    templog = templog.sort(compare)
    let tempWhole = []
    for (let i = 0; i != templog.length; i++) {
      tempWhole.push({
        date: moment(new Date(0).setUTCSeconds(templog[i].date.seconds)).format(
          "M/D/YYYY H:mm"
        ),
        name: templog[i].name,
        Temp:
          templog[i].Temp > 37 ? (
            <div style={{ backgroundColor: "#ff4541" }}>{templog[i].Temp}</div>
          ) : (
            <div style={{ backgroundColor: "#4caf50" }}>{templog[i].Temp}</div>
          ),
        clickEvent: () => {
          setToggle(!toggle)
        },
      })
    }

    console.log(tempWhole)
    // setLogFinal([templog])
    setData({ ...data, rows: tempWhole })
  }

  useEffect(() => {
    if (logs && logs.length) {
      console.log(logs)
      let logsTemp = []
      logsTemp = logs[0].detected.reverse()
      setLogsList(logsTemp)
    }
  }, [logs])

  useEffect(() => {
    if (logFinal.length) {
      console.log(logFinal)
      setData({ ...data, rows: logFinal[0] })
    }
  }, [logFinal])

  useEffect(() => {
    console.log(logsList)
    let tempDate = []
    let tempName = []
    let tempTemp = []
    let tempWhole = []
    if (logsList.length) {
      for (let i = 0; i != logsList.length; i++) {
        // console.log(i)
        // setLogFinal([
        //   ...logFinal,
        //   {
        //     date: moment(
        //       new Date(0).setUTCSeconds(logsList[i].date.seconds)
        //     ).format("M/D/YYYY H:mm"),
        //     name: logsList[i].name,
        //     Temp: (
        //       <div style={{ backgroundColor: "#ff4541" }}>
        //         {logsList[i].Temp}
        //       </div>
        //     ),
        //   },
        // ])
        tempWhole.push({
          date: moment(
            new Date(0).setUTCSeconds(logsList[i].date.seconds)
          ).format("M/D/YYYY H:mm"),
          name: logsList[i].name,
          Temp:
            logsList[i].Temp >= 37.5 ? (
              <div style={{ backgroundColor: "#ff4541" }}>
                {logsList[i].Temp}
              </div>
            ) : (
              <div style={{ backgroundColor: "#4caf50" }}>
                {logsList[i].Temp}
              </div>
            ),
          clickEvent: () => {
            handleSort()
          },
        })
        // tempDate.push({
        //   date: (
        //     <Moment>
        //       {new Date(0).setUTCSeconds(logsList[i].date.seconds)}
        //     </Moment>
        //   ),

        // })
        // tempName.push({
        //   name: logsList[i].Name,
        // })
        // tempTemp.push({
        //   Temp:
        //     logsList.Temp > 37 ? (
        //       <div style={{ backgroundColor: "#ff4541" }}>
        //         {logsList[i].Temp}
        //       </div>
        //     ) : (
        //       <div style={{ backgroundColor: "#eaf4f4" }}>
        //         {logsList[i].Temp}
        //       </div>
        //     ),
        // })

        // if (document.getElementById(i.toString()).textContent > 37) {
        //   document.getElementById(i.toString()).style.backgroundColor =
        //     "#ff4541"
        // } else if (document.getElementById(i.toString()).textContent == "") {
        //   document.getElementById(i.toString()).style.backgroundColor =
        //     "#eaf4f4"
        // } else {
        //   document.getElementById(i.toString()).style.backgroundColor =
        //     "#4caf50"
        // }
      }
      setLogFinal([...logFinal, tempWhole])
    }
  }, [logsList])

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
    rows: logFinal[0],
  })

  return (
    <div>
      <br />
      <br />

      <Container>
        <h2 style={{ color: "black" }}>Logs</h2>
        <br />
        {/* <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Temp</th>
            </tr>
          </thead>
          <tbody>
            {logs ? (
              logs.length ? (
                logsList.map((l, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Moment>
                          {new Date(0).setUTCSeconds(l.date.seconds)}
                        </Moment>
                      </td>
                      <td>{l.name}</td>
                      <td id={index}>{l.Temp}</td>
                    </tr>
                  )
                })
              ) : (
                <p>No Results</p>
              )
            ) : null}
          </tbody>
        </Table> */}

        <MDBDataTable
          entries={8}
          striped
          bordered
          small
          entriesOptions={[10, 20, 30, 50]}
          striped
          hover
          className="data-style-route"
          data={data}
          sortable={true}
        />
      </Container>
    </div>
  )
}

export default Logs
