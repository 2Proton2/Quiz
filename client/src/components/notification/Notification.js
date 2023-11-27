const Notification = (service ,type, axis, position, message) => {
    if(type === null){
        service(message)
    }
    else{
        service[`${type}`](message, {
            position: service[`${axis}`][`${position}`]
        })
    }
}

export default Notification;