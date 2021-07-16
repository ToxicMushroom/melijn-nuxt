export default function () {
    return {
        getHeaderObject (context, server) {
            let headers = {}
            
            if (server) {
                const { req } = context
                const headerMap = (req && req.headers) ? Object.assign({}, req.headers) : {}
                const xForwardedFor = headerMap['x-forwarded-for']      
                const xRealIp = headerMap['x-real-ip']
                headers = {
                    'Melijn-Requester-IP': req.socket.remoteAddress || xRealIp || xForwardedFor || req.socket.localAddress
                }
            } else {
                console.log("client request :)")
            }
            console.log(headers)
            return headers
        }
    }
}