//
//  Constants.swift
//  ParkInn
//
//  Created by Kyle Aquino on 4/8/20.
//  Copyright © 2020 ParkInn. All rights reserved.
//

import Foundation


struct ProductionServer {
    static let baseURL = "http://192.168.0.97:8000"
}

struct Auth0Info {
    static let openIDScope = "openid profile"
    static let audience = "http://localhost:8000"
}

enum HTTPHeaderField: String {
    case authentication = "Authorization"
    case contentType = "Content-Type"
    case acceptType = "Accept"
    case acceptEncoding = "Accept-Encoding"
}

enum ContentType: String {
    case json = "application/json"
}
