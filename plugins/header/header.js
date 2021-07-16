export default function () {
    return {
        getHeaderObject (context, server) {
            let headers = {}
            
            if (server) {
                const { req } = context
                const headerMap = (req && req.headers) ? Object.assign({}, req.headers) : {}
                console.log('headerMap: VVV')
                console.log(headerMap)
                const xForwardedFor = headerMap['x-forwarded-for']      
                const xRealIp = headerMap['x-real-ip']
                const cfConnectingIp = headerMap['cf-connecting-ip']
                headers = {
                    'melijn-x-real-ip': xRealIp,
                    'melijn-x-forwarded-for': xForwardedFor,
                    'Melijn-Requester-IP': cfConnectingIp || req.socket.remoteAddress || xRealIp || xForwardedFor || req.socket.localAddress
                }
            } else {
                console.log("client request :)")
            }
            console.log(headers)
            return headers
        }
    }
}