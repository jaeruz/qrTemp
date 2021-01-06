import React,{useContext, useEffect,useState} from 'react'
import { Container, Table,Form } from 'react-bootstrap';
import { HelmetContext } from '../../context/HelmetContext';
import { UserContext } from '../../context/UserContext';
import Moment from 'react-moment';
import 'moment-timezone';

const HelmetData = () => {
    const { helmet, dispatch } = useContext(HelmetContext)
    const { users } = useContext(UserContext)
    const [localUsers, setLocalUsers] = useState(users)
    const [tempList, setTempList] = useState([])
    const [dateList, setDateList] = useState([])
    const [localPersons, setLocalPersons] = useState(null)
    let ctr = 0;
    useEffect(() => {        
        setLocalUsers(users)    
    }, [users])

    useEffect(() => {
        let detectedIds = helmet ? (
            helmet.map(helm => (
                helm.detected ? (helm.detected.map(h => h
                )) : (false)
            ))
        ) : (null) 
        
        detectedIds = detectedIds ? (detectedIds.filter(d => d)) : (null)
        detectedIds = detectedIds[0] //group index (0)
        // console.log(detectedIds)
        let tl = [];
        let localPersonsTemp = [];
        let locTemp = localUsers;
        let dt = [];

        if (detectedIds) {
            for (let i = 0; i != detectedIds.length; i++){
                for (let j = 0; j != locTemp.length; j++){
                    let n = locTemp[j].fname + ' ' + locTemp[j].lname;
                    // console.log(detectedIds[i].name)
                    // console.log(n)
                    if (detectedIds[i].name == n) {
                        tl.push(detectedIds[i].Temp)
                        dt.push(detectedIds[i].date)
                        localPersonsTemp.push(locTemp[j]);
                        // console.log(tl)
                    }
                }
            }
            // console.log(dt)
            setTempList(tl);
            setDateList(dt)
        }        
        setLocalPersons(localPersonsTemp)
    }, [helmet,localUsers])
   
    useEffect(() => {
        // console.log(tempList)
    }, [tempList])

    const handleChange = () => {
        
    }
    return ( 
        <Container>
            <br/>
            <h4>Helmet Data</h4>
            <Form.Control as="select" style={{margin:'30px 0 30px 0'}} onChange={handleChange} value="trygroup" disabled>
                {helmet ? ( helmet.map(helm => {
                    return (
                        <option key={helm.id}>{helm.groupName}</option>
                    )
                })
                ) : (null)}
            </Form.Control>
            <Table size="sm" striped bordered hover>
                <thead>
                    <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Temperature</th>
                    </tr>
                </thead>
                
                <tbody>
                    {localPersons && tempList ? (localPersons.map(loc => (
                        <tr key={loc.id}>
                            <td><Moment>{(new Date(0)).setUTCSeconds(dateList[ctr].seconds)}</Moment></td>
                            <td>{ loc.fname+' '+loc.lname }</td>
                            <td>{tempList[ctr++]}</td>
                        </tr>
                    ))):null
                    }
                    
                </tbody>
                </Table>
        </Container>
     );
}
 
export default HelmetData;