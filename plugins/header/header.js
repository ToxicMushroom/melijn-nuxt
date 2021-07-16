export default function () {
    return {
        getHeaderObject (context, server) {
            let headers = {}
            
            if (server) {
                const { req } = context
                const headerMap = (req && req.headers) ? Object.assign({}, req.headers) : {}
                const xForwardedFor = headerMap['x-forwarded-for']      
                const xRealIp = headerMap['x-real-ip']
                const cfConnectingIp = headerMap['cf-connecting-ip']
                headers = {
                    'Melijn-Requester-IP': cfConnectingIp || req.socket.remoteAddress || xRealIp || xForwardedFor || req.socket.localAddress
                }
                if (xRealIp) headers['melijn-x-real-ip'] = xRealIp
                if (xRealIp) headers['melijn-x-forwarded-for'] = xForwardedFor
            }
            return headers
        }
    }
}