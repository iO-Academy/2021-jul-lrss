import {Button} from 'react-bootstrap'
import {useHistory} from "react-router-dom";

const LogoutButton = () => {
    const history = useHistory()
    const logOut = () => {
        const url = 'http://localhost:3001/logout'
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }

        fetch(url, requestOptions)
            .then(response => {
                if(response.status === 200) {
                    history.push('/')
                }
            })
    }

    return (
        <Button className="btn-danger" onClick={logOut}>Log out</Button>
    )
}

export default LogoutButton