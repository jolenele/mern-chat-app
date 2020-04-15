import axios from 'axios'


const SERVER = "http://localhost:5000"

export const getChats = async (token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const res = await axios.get(`${SERVER}/api/chat`, config)
        return res.data.data
    }
    catch (err) {
        console.log(err)
    }
}

export const addChat = async (chat, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        const res = await axios.post(`${SERVER}/api/chat`, chat, config)
        return res.data
    }
    catch (err) {
        console.error(err)
    }
}

export const getRoom = async(token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const res = await axios.get(`${SERVER}/api/room`, config)
        return res.data.data
    }
    catch (err) {
        console.error(err)
    }
}

export const addRoom = async(room, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const res = await axios.get(`${SERVER}/api/room`, room, config)
        return res.data
    }
    catch (err) {
        console.error(err)
    }
}

export const getLog = async (token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const res = await axios.get(`${SERVER}/api/log`, config)
        return res.data.data
    }
    catch (err) {
        console.error(err)
    }
}

export const addLog = async (log, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        const res = await axios.post(`${SERVER}/api/log`, log, config)
        return res.data
    }
    catch (err) {
        console.error(err)
    }
}