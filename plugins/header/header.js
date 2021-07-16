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
                    'x-real-ip-log': xRealIp,
                    'x-forwarded-for': xForwardedFor,
                    'remote-addr': req.socket.remoteAddress,
                    'local-addr': req.socket.localAddress,
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